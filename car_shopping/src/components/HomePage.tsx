import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CarList from './CarList';
import { searchCars } from '../services/api';
import { Car } from '../types/car';

const HomePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchCars(query);
      setCars(results);
    } catch (err) {
      setError('Failed to search cars. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="text-center w-full max-w-xl px-4 py-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Searching...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {!loading && !error && cars.length > 0 && (
          <CarList cars={cars} />
        )}

        {!loading && !error && cars.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No cars found. Try searching for a different make or model.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
