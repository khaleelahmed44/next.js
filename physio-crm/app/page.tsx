import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#f8fafc_40%,_#e2e8f0)]">
      {/* Navigation */}
      <nav className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Virtual Physio.ca</h1>
          <Link
            href="/admin"
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 font-semibold"
          >
            Admin
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
              Virtual and in-home physiotherapy in Ottawa
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Premium care for pain relief and confident recovery.
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Book one-on-one virtual physiotherapy, in-home treatment in Ottawa,
              pelvic floor support, and rehabilitation plans that fit real life.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition duration-200 text-lg"
              >
                Book an Appointment
              </Link>
              <a href="tel:+13432040699" className="inline-block rounded-xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-100">
                Call +1 343 204 0699
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-slate-900">Why patients choose us</h3>
                <p className="text-slate-600">A modern physiotherapy experience with clinical depth and personal support.</p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-2xl mr-3 text-emerald-600">✓</span>
                  <span className="text-slate-700">One-on-one licensed physiotherapist care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3 text-emerald-600">✓</span>
                  <span className="text-slate-700">Virtual, in-home, and person-to-person options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3 text-emerald-600">✓</span>
                  <span className="text-slate-700">Simple booking and practical progress tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3 text-emerald-600">✓</span>
                  <span className="text-slate-700">Monday-Saturday availability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Featured Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Virtual Physiotherapy Assessment', desc: 'Movement screening and guided exercise for pain and stiffness.' },
              { title: 'In-Home Treatment in Ottawa', desc: 'Hands-on support and care in your own space by request.' },
              { title: 'Post-Surgery Rehabilitation', desc: 'Structured recovery pathways and confidence-building progressions.' },
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-md p-6 hover:shadow-lg transition">
                <h4 className="text-xl font-semibold text-slate-800 mb-3">{service.title}</h4>
                <p className="text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Book Your Appointment?</h3>
          <p className="text-lg text-blue-100 mb-8">Fast, secure booking for virtual and in-home physiotherapy.</p>
          <Link
            href="/book"
            className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-200"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">&copy; 2026 Virtual Physio.ca. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
