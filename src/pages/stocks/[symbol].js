// pages/stocks/[symbol].js
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const StockDetails = () => {
  const router = useRouter();
  const { symbol } = router.query; // Get stock symbol from the URL
  const [stockData, setStockData] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (symbol) {
      const fetchStockData = async () => {
        setLoading(true);
        try {
          // Fetch stock details
          const response = await axios.get(`https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=1&type=INTRADAY&limit=1`);
          const data = response.data[0]; // Access the first element in the array
          setStockData(data);

          // Fetch historical price data for the chart
          const historicalResponse = await axios.get(`https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=30&type=INTRADAY`);
          setPriceData(historicalResponse.data); // Assuming this returns an array of price data

        } catch (error) {
          console.error("Error fetching stock details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStockData();
    }
  }, [symbol]);

  // Prepare data for the line chart (closing prices)
  const lineChartData = {
    labels: priceData.map(item => new Date(item.date).toLocaleDateString()), // Assuming priceData has a date field
    datasets: [
      {
        label: `${symbol} Closing Price`,
        data: priceData.map(item => item.close), // Assuming priceData has a close price field
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  // Prepare data for the bar chart (volume)
  const barChartData = {
    labels: priceData.map(item => new Date(item.date).toLocaleDateString()), // Same labels
    datasets: [
      {
        label: 'Volume',
        data: priceData.map(item => item.volume), // Assuming priceData has a volume field
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Prepare data for the pie chart (price distribution)
  const pieChartData = {
    labels: ['Open', 'Close', 'High', 'Low'],
    datasets: [
      {
        label: 'Price Distribution',
        data: [
          stockData?.open || 0,
          stockData?.close || 0,
          stockData?.high || 0,
          stockData?.low || 0,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      {loading ? (
        <p className="text-center text-lg text-white">Loading...</p>
      ) : stockData ? (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
          <h1 className="text-3xl font-bold text-center text-gray-800">{symbol} Stock Details</h1>

          {/* First Row: Stock Details and Pie Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Stock Details */}
            <div className="bg-black shadow-lg p-6 rounded-lg transition duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-200 pb-2">Stock Details</h2>
              <p className="text-gray-700"><strong>Current Price:</strong> <span className="text-green-600 font-bold">₹{stockData.close}</span></p>
              <p className="text-gray-700"><strong>Open:</strong> <span className="text-blue-600 font-bold">₹{stockData.open}</span></p>
              <p className="text-gray-700"><strong>High:</strong> <span className="text-red-600 font-bold">₹{stockData.high}</span></p>
              <p className="text-gray-700"><strong>Low:</strong> <span className="text-red-600 font-bold">₹{stockData.low}</span></p>
              <p className="text-gray-700"><strong>Previous Close:</strong> <span className="text-gray-500">₹{stockData.prev_close}</span></p>
              <p className="text-gray-700"><strong>Change:</strong> <span className={`font-bold ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{stockData.change ? stockData.change.toFixed(2) : 'N/A'} ({stockData.percent ? stockData.percent : 'N/A'}%)
              </span></p>
              <p className="text-gray-700"><strong>Volume:</strong> <span className="text-gray-500">{stockData.volume ? stockData.volume : 'N/A'}</span></p>
              <p className="text-gray-700"><strong>Market Value:</strong> <span className="text-gray-500">₹{stockData.value ? stockData.value.toLocaleString() : 'N/A'}</span></p>
              <p className="text-gray-700"><strong>Date:</strong> <span className="text-gray-500">{stockData.date ? new Date(stockData.date).toLocaleString() : 'N/A'}</span></p>
            </div>

            {/* Pie Chart (Smaller Size) */}
            <div className="bg-black p-4 rounded-lg transition duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-center text-white">Price Distribution</h2>
              <div className="flex justify-center">
                <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} height={200} width={200} />
              </div>
            </div>
          </div>

          {/* Second Row: Line and Bar Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {/* Line Chart */}
            <div className="h-60 md:h-96 bg-black rounded-lg p-4 transition duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-center text-white">Price Trend</h2>
              <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
            </div>

            {/* Bar Chart */}
            <div className="h-60 md:h-96 bg-black rounded-lg p-4 transition duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-center text-white">Volume Trend</h2>
              <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-white">No data found for this stock.</p>
      )}
    </div>
  );
};

export default StockDetails;
