# Virtual Physiotherapy Website

A professional full-stack virtual physiotherapy booking system built with Node.js + Express.

## Features

✅ **Patient Booking System** - Easy online appointment scheduling
✅ **Professional UI** - Modern, responsive design with healthcare color scheme
✅ **Therapist Profiles** - Complete team information with credentials
✅ **Service Listings** - Detailed description of all services offered
✅ **Virtual Physio Info** - Education on online physiotherapy
✅ **Admin Dashboard** - Manage all appointments with status updates
✅ **FAQ Section** - Common questions and answers
✅ **Contact Page** - Multiple contact options

## Technology Stack

- **Backend**: Node.js + Express.js
- **Frontend**: HTML, CSS, JavaScript (EJS templates)
- **Data Storage**: JSON file (can be upgraded to MongoDB)
- **Styling**: Custom CSS with responsive design

## Installation

1. Navigate to the project directory:
```bash
cd physio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and go to:
```
http://localhost:3002
```

## Pages

### Public Pages
- **Home** - Hero section with testimonials and benefits
- **About** - Clinic mission and team information
- **Services** - Available services and pricing packages
- **Therapists** - Professional team profiles with credentials
- **Virtual Physio** - Information about online treatment
- **Booking** - Appointment scheduling form
- **Contact** - Contact information and inquiry form
- **FAQ** - Frequently asked questions

### Admin Section
- **Admin Login** - Password protected dashboard access
- **Dashboard** - View, update, and manage all appointments

## Admin Credentials

- **Password**: `physio@123`
- **Access**: http://localhost:3002/admin

## File Structure

```
physio-website/
├── public/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── script.js          # Client-side JavaScript
│   └── images/                # Image assets
├── views/
│   ├── layout.ejs             # Main layout template
│   ├── index.ejs              # Homepage
│   ├── about.ejs              # About page
│   ├── services.ejs           # Services page
│   ├── therapists.ejs         # Team page
│   ├── virtual-physio.ejs     # Virtual physio info
│   ├── booking.ejs            # Booking form
│   ├── contact.ejs            # Contact page
│   ├── faq.ejs                # FAQ page
│   ├── admin-login.ejs        # Admin login
│   └── admin-dashboard.ejs    # Admin dashboard
├── routes/                    # API routes (future expansion)
├── data/
│   └── appointments.json      # Appointment storage
├── server.js                  # Express server configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## API Endpoints

### Booking
- `POST /api/book-appointment` - Create new appointment

### Admin
- `GET /api/appointments` - Get all appointments
- `POST /api/update-appointment` - Update appointment status
- `POST /api/delete-appointment` - Delete appointment

## Features in Detail

### Appointment Booking
- Simple form with patient information
- Service type selection
- Date and time picker
- Automatic confirmation email (ready for email integration)

### Admin Dashboard
- Real-time appointment updates
- Status management (pending, confirmed, completed, cancelled)
- Appointment statistics
- Delete appointments

### Doctor Profiles
- Professional avatar placeholders
- Qualifications and certifications
- Specializations displayed as badges
- Multiple therapist profiles

### Responsive Design
- Mobile-first approach
- Works on desktop, tablet, and mobile
- Smooth animations and transitions
- Professional healthcare color scheme

## Customization

### Change Admin Password
Edit `server.js` and change:
```javascript
if (password === 'physio@123') {
```

### Modify Pricing
Edit `views/services.ejs` to update package prices.

### Update Team Information
Edit `views/about.ejs` and `views/therapists.ejs` to add/modify therapist profiles.

### Add Real Doctor Images
Replace placeholder avatars with real images in `public/images/`.

## Future Enhancements

- Email notifications
- Video call integration (Zoom/Jitsi)
- Payment processing (Stripe)
- SMS notifications
- MongoDB integration
- Email receipts
- Patient portal
- Appointment reminders

## Support

For questions or issues, please contact info@virtualphysio.com

## License

Licensed for commercial use.
