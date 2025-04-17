import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  features: string[];
}

interface CarDetailProps {
  car: Car;
}

const CarDetail: React.FC<CarDetailProps> = ({ car }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">
            {car.make} {car.model}
          </h1>
          <p className="text-gray-600 text-xl mb-4">Year: {car.year}</p>
          <p className="text-blue-600 text-2xl font-semibold mb-6">
            ${car.price.toLocaleString()}
          </p>
          <p className="text-gray-700 mb-6">{car.description}</p>
          <h2 className="text-xl font-semibold mb-3">Features</h2>
          <ul className="list-disc list-inside mb-6">
            {car.features.map((feature, index) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
          <Link
            to="/"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarDetail; 