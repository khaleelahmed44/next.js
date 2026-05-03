import React, { useState } from 'react';

interface HealthcareWebsiteProps {}

export default function HealthcareWebsite({}: HealthcareWebsiteProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-100">
      {/* Navigation Bar */}
      <nav className="backdrop-blur-md bg-white/30 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-gray-800">MediCare</span>
            </div>
            
            {/* Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Services</a>
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Departments</a>
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Contact</a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
            
            {/* CTA Button - Hidden on mobile */}
            <button className="hidden md:block bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300">
              Book Appointment
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors py-2">Home</a>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors py-2">Services</a>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors py-2">Departments</a>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors py-2">About</a>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors py-2">Contact</a>
                <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 w-fit">
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Premium Healthcare Services for Your Well-being
              </h1>
              <p className="text-base sm:text-lg text-gray-500 max-w-lg">
                Experience compassionate care with our expert medical team. State-of-the-art facilities and personalized treatment plans for optimal health outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300">
                  Get Started
                </button>
                <button className="border-2 border-teal-400 text-teal-600 px-8 py-3 rounded-full hover:bg-teal-50 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop" 
                  alt="Healthcare Professional" 
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-500/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Card - Floating */}
      <div className="relative -mt-16 z-30 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/40 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Book Your Appointment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
              />
              <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Departments</h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              Comprehensive medical services across various specialties with expert healthcare professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-8 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cardiology</h3>
              <p className="text-gray-600">Advanced heart care with cutting-edge diagnostic and treatment options</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-8 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Neurology</h3>
              <p className="text-gray-600">Expert diagnosis and treatment for neurological conditions and disorders</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-8 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Orthopedics</h3>
              <p className="text-gray-600">Comprehensive bone and joint care with advanced surgical techniques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">Featured Services</h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              Premium medical services designed to meet your healthcare needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop" 
                alt="Emergency Care" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Care</h3>
                <p className="text-gray-600">24/7 emergency medical services with rapid response and critical care</p>
              </div>
            </div>
            
            {/* Service Card 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop" 
                alt="Surgery" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Surgery</h3>
                <p className="text-gray-600">Minimally invasive surgical procedures with latest technology</p>
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551888875-6ec85a2e0e47?w=400&h=250&fit=crop" 
                alt="Rehabilitation" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Rehabilitation</h3>
                <p className="text-gray-600">Comprehensive rehabilitation programs for optimal recovery</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
