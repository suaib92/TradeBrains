// components/StockSearch.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const StockSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // For keyboard navigation
  const router = useRouter();

  useEffect(() => {
    const fetchStocks = async () => {
      if (keyword.length > 2) { // Only fetch if keyword length is greater than 2
        try {
          const response = await axios.get(`https://portal.tradebrains.in/api/assignment/search?keyword=${keyword}&length=10`);
          setResults(response.data || []); // Update based on your API's response structure
        } catch (error) {
          console.error("Error fetching stock data:", error);
          setResults([]); // Clear results on error
        }
      } else {
        setResults([]); // Clear results if the keyword is too short
      }
    };

    const handler = setTimeout(() => {
      fetchStocks();
    }, 300); // Debouncing delay

    return () => clearTimeout(handler); // Cleanup function
  }, [keyword]);

  const handleSelectStock = (stock) => {
    router.push(`/stocks/${stock.symbol}`); // Navigate to stock details page
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        handleSelectStock(results[selectedIndex]);
      }
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          setSelectedIndex(-1); // Reset selected index on input change
        }}
        onKeyDown={handleKeyDown} // Handle keyboard navigation
        placeholder="Search for a stock..."
        className="border text-black border-gray-300 rounded-lg py-2 px-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
      />
      {results.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto shadow-lg z-10">
          {results.map((stock, index) => (
            <li
              key={stock.symbol}
              onClick={() => handleSelectStock(stock)}
              className={`p-3 cursor-pointer text-black hover:bg-blue-300 transition duration-200 ease-in-out ${selectedIndex === index ? 'bg-blue-200' : ''}`}
            >
              {stock.name} ({stock.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockSearch;
