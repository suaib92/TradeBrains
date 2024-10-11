import { useEffect, useState } from 'react';
import axios from 'axios';

const NiftyMovers = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [volumeMovers, setVolumeMovers] = useState([]);

  useEffect(() => {
    const fetchMovers = async () => {
      try {
        const response = await axios.get('https://portal.tradebrains.in/api/assignment/index/NIFTY/movers/');
        if (response.data) {
          setGainers(response.data.gainers || []);
          setLosers(response.data.losers || []);
          setVolumeMovers(response.data.volume_movers || []);
        }
      } catch (error) {
        console.error('Error fetching NIFTY movers:', error);
        setGainers([]);
        setLosers([]);
        setVolumeMovers([]);
      }
    };
    fetchMovers();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">NIFTY Movers</h1>

      {/* Gainers Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 transition transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-green-700 mb-4">Top Gainers</h2>
        {gainers.length === 0 ? (
          <p className="text-center text-gray-600">No gainers data available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gainers.map((stock) => (
              <div key={stock.id} className="border rounded-lg p-4 shadow-lg bg-green-50 hover:bg-green-100 transition">
                <strong className="text-lg text-green-800">{stock.comp_name} ({stock.symbol})</strong>
                <p className="text-gray-600">Close: ₹{stock.close} | Open: ₹{stock.open} | High: ₹{stock.high} | Low: ₹{stock.low}</p>
                <p>Change: <span className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>{stock.change}</span></p>
                <p className="text-gray-600">Percentage Change: {stock.percent.toFixed(2)}% | Market Cap: ₹{stock.mcap.toLocaleString()} | Volume: {stock.volume.toLocaleString()}</p>
                <em className="text-gray-500">Date: {new Date(stock.date).toLocaleString()}</em>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Losers Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 transition transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-red-700 mb-4">Top Losers</h2>
        {losers.length === 0 ? (
          <p className="text-center text-gray-600">No losers data available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {losers.map((stock) => (
              <div key={stock.id} className="border rounded-lg p-4 shadow-lg bg-red-50 hover:bg-red-100 transition">
                <strong className="text-lg text-red-800">{stock.comp_name} ({stock.symbol})</strong>
                <p className="text-gray-600">Close: ₹{stock.close} | Open: ₹{stock.open} | High: ₹{stock.high} | Low: ₹{stock.low}</p>
                <p>Change: <span className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>{stock.change}</span></p>
                <p className="text-gray-600">Percentage Change: {stock.percent.toFixed(2)}% | Market Cap: ₹{stock.mcap.toLocaleString()} | Volume: {stock.volume.toLocaleString()}</p>
                <em className="text-gray-500">Date: {new Date(stock.date).toLocaleString()}</em>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Volume Movers Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 transition transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Top Volume Movers</h2>
        {volumeMovers.length === 0 ? (
          <p className="text-center text-gray-600">No volume movers data available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {volumeMovers.map((stock) => (
              <div key={stock.id} className="border rounded-lg p-4 shadow-lg bg-indigo-50 hover:bg-indigo-100 transition">
                <strong className="text-lg text-indigo-800">{stock.comp_name} ({stock.symbol})</strong>
                <p className="text-gray-600">Close: ₹{stock.close} | Open: ₹{stock.open} | High: ₹{stock.high} | Low: ₹{stock.low}</p>
                <p>Change: <span className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>{stock.change}</span></p>
                <p className="text-gray-600">Percentage Change: {stock.percent.toFixed(2)}% | Market Cap: ₹{stock.mcap.toLocaleString()} | Volume: {stock.volume.toLocaleString()}</p>
                <em className="text-gray-500">Date: {new Date(stock.date).toLocaleString()}</em>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NiftyMovers;
