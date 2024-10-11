import React from 'react';
import Link from 'next/link';

const Stocks = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Page Under Maintenance
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          We&apos;re working hard to bring this page to you. Please check back soon!
        </p>
        
        <div className="flex justify-center">
          <Link 
            href="/" 
            className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Stocks;
