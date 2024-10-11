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
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-lg">NIFTY Movers</h1>
  
      {/* Gainers Section */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8 transition transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-green-700 mb-4">Top Gainers</h2>
        {gainers.length === 0 ? (
          <p className="text-center text-gray-600">No gainers data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-green-50 rounded-lg">
              <thead className="bg-green-300">
                <tr>
                  <th className="px-4 py-2 border">Company Name</th>
                  <th className="px-4 py-2 border">Symbol</th>
                  <th className="px-4 py-2 border">Open</th>
                  <th className="px-4 py-2 border">Close</th>
                  <th className="px-4 py-2 border">High</th>
                  <th className="px-4 py-2 border">Low</th>
                  <th className="px-4 py-2 border">Change</th>
                  <th className="px-4 py-2 border">Percentage</th>
                  <th className="px-4 py-2 border">Market Cap</th>
                  <th className="px-4 py-2 border">Volume</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {gainers.map((stock) => (
                  <tr key={stock.id} className="hover:bg-green-100">
                    <td className="px-4 py-2 border">{stock.comp_name}</td>
                    <td className="px-4 py-2 border">{stock.symbol}</td>
                    <td className="px-4 py-2 border">₹{stock.open}</td>
                    <td className="px-4 py-2 border">₹{stock.close}</td>
                    <td className="px-4 py-2 border">₹{stock.high}</td>
                    <td className="px-4 py-2 border">₹{stock.low}</td>
                    <td className={`px-4 py-2 border ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stock.change}</td>
                    <td className="px-4 py-2 border">{stock.percent.toFixed(2)}%</td>
                    <td className="px-4 py-2 border">₹{stock.mcap.toLocaleString()}</td>
                    <td className="px-4 py-2 border">{stock.volume.toLocaleString()}</td>
                    <td className="px-4 py-2 border">{new Date(stock.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  
      {/* Losers Section */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8 transition transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-red-700 mb-4">Top Losers</h2>
        {losers.length === 0 ? (
          <p className="text-center text-gray-600">No losers data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-red-50 rounded-lg">
              <thead className="bg-red-300">
                <tr>
                  <th className="px-4 py-2 border">Company Name</th>
                  <th className="px-4 py-2 border">Symbol</th>
                  <th className="px-4 py-2 border">Open</th>
                  <th className="px-4 py-2 border">Close</th>
                  <th className="px-4 py-2 border">High</th>
                  <th className="px-4 py-2 border">Low</th>
                  <th className="px-4 py-2 border">Change</th>
                  <th className="px-4 py-2 border">Percentage</th>
                  <th className="px-4 py-2 border">Market Cap</th>
                  <th className="px-4 py-2 border">Volume</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {losers.map((stock) => (
                  <tr key={stock.id} className="hover:bg-red-100">
                    <td className="px-4 py-2 border">{stock.comp_name}</td>
                    <td className="px-4 py-2 border">{stock.symbol}</td>
                    <td className="px-4 py-2 border">₹{stock.open}</td>
                    <td className="px-4 py-2 border">₹{stock.close}</td>
                    <td className="px-4 py-2 border">₹{stock.high}</td>
                    <td className="px-4 py-2 border">₹{stock.low}</td>
                    <td className={`px-4 py-2 border ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stock.change}</td>
                    <td className="px-4 py-2 border">{stock.percent.toFixed(2)}%</td>
                    <td className="px-4 py-2 border">₹{stock.mcap.toLocaleString()}</td>
                    <td className="px-4 py-2 border">{stock.volume.toLocaleString()}</td>
                    <td className="px-4 py-2 border">{new Date(stock.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  
      {/* Volume Movers Section */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8 transition transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Top Volume Movers</h2>
        {volumeMovers.length === 0 ? (
          <p className="text-center text-gray-600">No volume movers data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-indigo-50 rounded-lg">
              <thead className="bg-indigo-300">
                <tr>
                  <th className="px-4 py-2 border">Company Name</th>
                  <th className="px-4 py-2 border">Symbol</th>
                  <th className="px-4 py-2 border">Open</th>
                  <th className="px-4 py-2 border">Close</th>
                  <th className="px-4 py-2 border">High</th>
                  <th className="px-4 py-2 border">Low</th>
                  <th className="px-4 py-2 border">Change</th>
                  <th className="px-4 py-2 border">Percentage</th>
                  <th className="px-4 py-2 border">Market Cap</th>
                  <th className="px-4 py-2 border">Volume</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {volumeMovers.map((stock) => (
                  <tr key={stock.id} className="hover:bg-indigo-100">
                    <td className="px-4 py-2 border">{stock.comp_name}</td>
                    <td className="px-4 py-2 border">{stock.symbol}</td>
                    <td className="px-4 py-2 border">₹{stock.open}</td>
                    <td className="px-4 py-2 border">₹{stock.close}</td>
                    <td className="px-4 py-2 border">₹{stock.high}</td>
                    <td className="px-4 py-2 border">₹{stock.low}</td>
                    <td className={`px-4 py-2 border ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stock.change}</td>
                    <td className="px-4 py-2 border">{stock.percent.toFixed(2)}%</td>
                    <td className="px-4 py-2 border">₹{stock.mcap.toLocaleString()}</td>
                    <td className="px-4 py-2 border">{stock.volume.toLocaleString()}</td>
                    <td className="px-4 py-2 border">{new Date(stock.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NiftyMovers;
