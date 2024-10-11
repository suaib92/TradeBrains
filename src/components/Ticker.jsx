import { useEffect, useState } from 'react';
import axios from 'axios';

const Ticker = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [volumeMovers, setVolumeMovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickerData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://portal.tradebrains.in/api/assignment/index/NIFTY/movers/');
        if (response.data) {
          setGainers(response.data.gainers || []);
          setLosers(response.data.losers || []);
          setVolumeMovers(response.data.volume_movers || []);
        }
      } catch (error) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickerData();
    const intervalId = setInterval(fetchTickerData, 60000); // Refresh every 60 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 shadow-lg">
      {loading ? (
        <span className="text-lg font-semibold animate-pulse">Loading...</span>
      ) : error ? (
        <span className="text-red-500 font-semibold">{error}</span>
      ) : (
        <div className="ticker-wrapper relative overflow-hidden">
          <div className="ticker-content animate-scroll whitespace-nowrap">
            {gainers.length > 0 && (
              <span className="mx-4 text-green-300 font-semibold">
                <strong>Gainers:</strong>{" "}
                {gainers.map((stock) => (
                  <span key={stock.id} className="mx-2">
                    <strong>{stock.symbol}</strong> {" "}
                    (₹{stock.close}){" "}
                    {stock.percent && (
                      <span className="text-gray-400">
                        [+{stock.percent.toFixed(2)}%]
                      </span>
                    )}
                  </span>
                ))}
              </span>
            )}
            {losers.length > 0 && (
              <span className="mx-4 text-red-300 font-semibold">
                <strong>Losers:</strong>{" "}
                {losers.map((stock) => (
                  <span key={stock.id} className="mx-2">
                    <strong>{stock.symbol}</strong> {" "}
                    (₹{stock.close}){" "}
                    {stock.percent && (
                      <span className="text-gray-400">
                        [{stock.percent.toFixed(2)}%]
                      </span>
                    )}
                  </span>
                ))}
              </span>
            )}
            {volumeMovers.length > 0 && (
              <span className="mx-4 text-yellow-300 font-semibold">
                <strong>Volume Movers:</strong>{" "}
                {volumeMovers.map((stock) => (
                  <span key={stock.id} className="mx-2">
                    <strong>{stock.symbol}</strong> {" "}
                    (₹{stock.close}){" "}
                    {stock.percent && (
                      <span className="text-gray-400">
                        [+{stock.percent.toFixed(2)}%]
                      </span>
                    )}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticker;
