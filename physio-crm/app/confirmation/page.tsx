'use client';

import Link from 'next/link';

export default function Confirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-3xl font-bold text-green-600 mb-3">Appointment Confirmed!</h1>
        <p className="text-gray-600 mb-2">Your appointment has been successfully booked.</p>
        <p className="text-gray-600 mb-8">We will send you a confirmation email shortly.</p>

        <div className="space-y-3">
          <Link
            href="/book"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Book Another Appointment
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
