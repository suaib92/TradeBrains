// pages/index.js
import StockSearch from '../components/SearchBar';
import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Ticker /> {/* Add Ticker component here */}

      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-indigo-600 to-pink-500 py-16 text-center text-white">
        <h1 className="text-6xl font-extrabold animate-bounce">Stock Market Insights</h1>
        <p className="text-gray-200 mt-4 mb-8 text-lg">
          Search and track your favorite stocks in real-time.
        </p>

        <div className="max-w-lg mx-auto mt-10">
          <div className="bg-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition duration-300">
            <StockSearch />
          </div>
        </div>
      </div>

      {/* Stock Movers Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">NIFTY Movers</h2>
          <p className="text-gray-600 mb-6">
            Check out the latest stock price changes and trends in the NIFTY Index.
          </p>
          <Link 
            href="/movers" 
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
            View NIFTY Movers
          </Link>
        </div>
      </div>

    
    </div>
  );
}
