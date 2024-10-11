// components/FavoriteStocks.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaTrashAlt } from 'react-icons/fa'; // Importing icons
import Navbar from '@/components/Navbar';

const FavoriteStocks = () => {
  const [favoriteStocks, setFavoriteStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteStocks(favorites);
    setLoading(false);
  }, []);

  const goToStockDetails = (symbol) => {
    router.push(`/stocks/${symbol}`);
  };

  const removeStock = (symbol) => {
    const updatedFavorites = favoriteStocks.filter(stock => stock !== symbol);
    setFavoriteStocks(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <><Navbar/>
    <div className="bg-gradient-to-br from-blue-400 to-purple-500 min-h-screen py-10">
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl max-w-lg mx-auto mt-10 transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">Favorite Stocks</h2>
        {loading ? (
          <p className="text-gray-600 text-center text-lg animate-pulse">Loading...</p>
        ) : favoriteStocks.length > 0 ? (
          <ul className="space-y-4">
            {favoriteStocks.map((stock, index) => (
              <li
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 cursor-pointer hover:shadow-xl flex justify-between items-center"
                onClick={() => goToStockDetails(stock)}
              >
                <span className="text-xl font-bold text-gray-800" title={`Symbol: ${stock}`}>
                  {stock}
                </span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToStockDetails(stock);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center px-4 py-2 rounded-full shadow transition duration-300 transform hover:scale-105"
                  >
                    <FaEye className="mr-1" /> View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeStock(stock);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium flex items-center px-4 py-2 rounded-full shadow transition duration-300 transform hover:scale-105"
                  >
                    <FaTrashAlt className="mr-1" /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center text-lg">No favorite stocks added yet. Start adding some!</p>
        )}
      </div>
    </div>
    </>
  );
};

export default FavoriteStocks;
