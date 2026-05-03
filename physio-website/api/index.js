const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const serverless = require('serverless-http');

const app = express();
const PORT = 3002;
const ADMIN_PASSWORD = 'physio@123';
const ADMIN_COOKIE = 'physio_admin_session';
const adminSessions = new Set();
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const viewsDir = path.join(rootDir, 'views');
const dataDir = path.join(rootDir, 'data');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicDir));
app.set('view engine', 'ejs');
app.set('views', viewsDir);

// Data file paths
const appointmentsFile = path.join(dataDir, 'appointments.json');

// Initialize data directory and file
function initializeData() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(appointmentsFile)) {
    fs.writeFileSync(appointmentsFile, JSON.stringify([], null, 2));
  }
}

initializeData();

function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((acc, pair) => {
    const [key, ...rest] = pair.trim().split('=');
    if (!key) return acc;
    acc[key] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});
}

function requireAdmin(req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[ADMIN_COOKIE];
  if (token && adminSessions.has(token)) {
    return next();
  }
  return res.redirect('/admin');
}

const pageMeta = {
  home: {
    title: 'Virtual and In-Home Physiotherapy in Ottawa | Virtual Physio.ca',
    description: 'Book virtual physiotherapy, in-home treatment in Ottawa, home clinic room visits, pelvic floor care, pain relief and rehabilitation with Virtual Physio.ca.',
    canonical: 'https://virtualphysio.ca/',
    keywords: 'virtual physiotherapy Ottawa, in home treatment in Ottawa, physiotherapy Ottawa, in-home physiotherapy Ottawa, home clinic physiotherapy, pelvic floor physiotherapy, post surgery rehab, sports injury physio',
    ogTitle: 'Virtual and In-Home Physiotherapy in Ottawa | Virtual Physio.ca',
    ogDescription: 'Evidence-based virtual care, in-home treatment in Ottawa, pain management, pelvic floor care and person-to-person physiotherapy.',
    ogType: 'website',
  },
  about: {
    title: 'About Drashti Chauhan | Virtual Physiotherapist Ottawa',
    description: 'Meet Drashti Chauhan, physiotherapist at Virtual Physio.ca. Learn about her virtual rehab, pelvic floor, TMJ, sports injury and patient-first care approach.',
    canonical: 'https://virtualphysio.ca/about',
    keywords: 'physiotherapist Ottawa, Drashti Chauhan physiotherapist, virtual physiotherapy clinic',
    ogTitle: 'About Drashti Chauhan | Virtual Physio.ca',
    ogDescription: 'Patient-first virtual physiotherapy, pelvic floor care, TMJ support, sports injury rehab and recovery planning.',
    ogType: 'profile',
  },
  services: {
    title: 'Physiotherapy Services Ottawa | Virtual, In-Home and Clinic Room Care',
    description: 'Explore physiotherapy services in Ottawa: virtual care, in-home treatment in Ottawa, home clinic room visits, pain management, pelvic floor physio and rehab.',
    canonical: 'https://virtualphysio.ca/services',
    keywords: 'physiotherapy services Ottawa, sports injury physio, post surgery rehab, pelvic floor physiotherapy',
    ogTitle: 'Physiotherapy Services in Ottawa',
    ogDescription: 'Virtual physiotherapy, in-home treatment in Ottawa, home clinic room care, pelvic floor care, post-surgery rehab and pain relief.',
    ogType: 'website',
  },
  booking: {
    title: 'Book Online Physiotherapy Appointment | Virtual Physio.ca',
    description: 'Book virtual physiotherapy, in-home treatment in Ottawa, home clinic room care, pelvic floor care, pain relief or rehab with Virtual Physio.ca.',
    canonical: 'https://virtualphysio.ca/booking',
    keywords: 'book physiotherapy Ottawa, virtual physiotherapy Ottawa, in home treatment in Ottawa, home physiotherapy Ottawa, pelvic floor physiotherapy booking',
    ogTitle: 'Book Online Physiotherapy Appointment',
    ogDescription: 'Fast booking for virtual physiotherapy, pain management, rehab and pelvic floor care.',
    ogType: 'website',
  },
  contact: {
    title: 'Contact Virtual Physio.ca | Book Online Physiotherapy',
    description: 'Contact Virtual Physio.ca to book virtual physiotherapy, in-home treatment in Ottawa, home clinic room care, pelvic floor care, pain management or rehab.',
    canonical: 'https://virtualphysio.ca/contact',
    keywords: 'contact physiotherapist Ottawa, physiotherapy near me, book physio Ottawa',
    ogTitle: 'Contact Virtual Physio.ca',
    ogDescription: 'Book online physiotherapy by form, call or WhatsApp.',
    ogType: 'website',
  },
  blog: {
    title: 'Virtual Physio.ca Blog | Physiotherapy Recovery Guides',
    description: 'Read practical physiotherapy guides for back pain, sports injuries, pelvic floor care and recovery planning.',
    canonical: 'https://virtualphysio.ca/blog',
    keywords: 'physiotherapy blog Ottawa, virtual physiotherapy guides, injury recovery tips',
    ogTitle: 'Virtual Physio.ca Blog',
    ogDescription: 'Evidence-based tips for pain relief, rehab and confident movement.',
    ogType: 'website',
  },
};

// Custom render function to handle layout + page content
function renderPage(res, pageName, pageKey = 'home') {
  const pageContent = fs.readFileSync(path.join(viewsDir, pageName + '.ejs'), 'utf-8');
  const layoutContent = fs.readFileSync(path.join(viewsDir, 'layout.ejs'), 'utf-8');
  const meta = pageMeta[pageKey] || pageMeta.home;
  const ogImage = 'https://virtualphysio.ca/images/drashti-chauhan-virtual-physiotherapist.png';
  const finalContent = layoutContent
    .replace('<%- body %>', pageContent)
    .replaceAll('__PAGE_TITLE__', meta.title)
    .replaceAll('__PAGE_DESCRIPTION__', meta.description)
    .replaceAll('__PAGE_KEYWORDS__', meta.keywords || '')
    .replaceAll('__PAGE_CANONICAL__', meta.canonical)
    .replaceAll('__OG_TYPE__', meta.ogType || 'website')
    .replaceAll('__OG_TITLE__', meta.ogTitle || meta.title)
    .replaceAll('__OG_DESCRIPTION__', meta.ogDescription || meta.description)
    .replaceAll('__OG_IMAGE__', ogImage)
    .replaceAll('__OG_URL__', meta.canonical)
    .replaceAll('__TWITTER_TITLE__', meta.title)
    .replaceAll('__TWITTER_DESCRIPTION__', meta.description)
    .replaceAll('__TWITTER_IMAGE__', ogImage);
  res.type('text/html').send(finalContent);
}

// Routes
app.get('/', (req, res) => {
  renderPage(res, 'index', 'home');
});

app.get('/about', (req, res) => {
  renderPage(res, 'about', 'about');
});

app.get('/services', (req, res) => {
  renderPage(res, 'services', 'services');
});

app.get('/blog', (req, res) => {
  renderPage(res, 'blog', 'blog');
});

app.get('/therapists', (req, res) => {
  renderPage(res, 'therapists', 'about');
});

app.get('/virtual-physio', (req, res) => {
  renderPage(res, 'virtual-physio', 'services');
});

app.get('/booking', (req, res) => {
  renderPage(res, 'booking', 'booking');
});

app.get('/contact', (req, res) => {
  renderPage(res, 'contact', 'contact');
});

app.get('/faq', (req, res) => {
  renderPage(res, 'faq', 'home');
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://virtualphysio.ca/sitemap.xml`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://virtualphysio.ca/</loc><priority>1.0</priority><lastmod>2026-05-01</lastmod></url>
  <url><loc>https://virtualphysio.ca/about</loc><priority>0.8</priority><lastmod>2026-05-01</lastmod></url>
  <url><loc>https://virtualphysio.ca/services</loc><priority>0.9</priority><lastmod>2026-05-01</lastmod></url>
  <url><loc>https://virtualphysio.ca/blog</loc><priority>0.7</priority><lastmod>2026-05-01</lastmod></url>
  <url><loc>https://virtualphysio.ca/contact</loc><priority>0.9</priority><lastmod>2026-05-01</lastmod></url>
  <url><loc>https://virtualphysio.ca/booking</loc><priority>0.95</priority><lastmod>2026-05-01</lastmod></url>
</urlset>`);
});

// Admin Dashboard
app.get('/admin', (req, res) => {
  res.render('admin-login');
});

app.post('/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    adminSessions.add(token);
    res.cookie(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8,
    });
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post('/admin/logout', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[ADMIN_COOKIE];
  if (token) {
    adminSessions.delete(token);
  }
  res.clearCookie(ADMIN_COOKIE);
  res.json({ success: true });
});

app.get('/admin/dashboard', requireAdmin, (req, res) => {
  res.render('admin-dashboard');
});

// API Routes
app.post('/api/book-appointment', (req, res) => {
  try {
    const { name, email, phone, service, date, time, message } = req.body;

    if (!name || !phone || !service || !date || !time) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    const appointment = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      service,
      date,
      time,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const appointments = JSON.parse(fs.readFileSync(appointmentsFile, 'utf-8'));
    appointments.push(appointment);
    fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));

    res.json({ success: true, message: 'Appointment booked successfully!', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.json({ success: false, message: 'Error booking appointment' });
  }
});

app.post('/api/update-appointment', (req, res) => {
  try {
    const { id, status } = req.body;
    const appointments = JSON.parse(fs.readFileSync(appointmentsFile, 'utf-8'));
    const index = appointments.findIndex(apt => apt.id === id);

    if (index === -1) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    appointments[index].status = status;
    fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));
    res.json({ success: true, message: 'Appointment updated' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.json({ success: false, message: 'Error updating appointment' });
  }
});

app.post('/api/delete-appointment', (req, res) => {
  try {
    const { id } = req.body;
    const appointments = JSON.parse(fs.readFileSync(appointmentsFile, 'utf-8'));
    const filtered = appointments.filter(apt => apt.id !== id);

    if (filtered.length === appointments.length) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    fs.writeFileSync(appointmentsFile, JSON.stringify(filtered, null, 2));
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.json({ success: false, message: 'Error deleting appointment' });
  }
});

app.get('/api/appointments', (req, res) => {
  try {
    const appointments = JSON.parse(fs.readFileSync(appointmentsFile, 'utf-8'));
    res.json(appointments);
  } catch (error) {
    res.json([]);
  }
});

if (require.main === module && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = serverless(app);
