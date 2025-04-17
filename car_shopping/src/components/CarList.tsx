import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types/car';

interface CarListProps {
  cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget;
    const car = cars.find(c => c.imageUrl === img.src);
    if (car) {
      // Create a canvas to generate a placeholder image with text
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Create a gradient background
        const gradient = ctx.createLinearGradient(0, 0, 300, 200);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#3498db');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 200);

        // Add text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${car.Make_Name}`, 150, 80);
        ctx.font = '20px Arial';
        ctx.fillText(`${car.Model_Name}`, 150, 120);
      }
      img.src = canvas.toDataURL();
    }
    // Remove the error handler to prevent infinite loops
    img.onerror = null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cars.map((car) => (
        <Link
          key={car.Model_ID}
          to={`/car/${car.Model_ID}`}
          className="block bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="relative aspect-w-16 aspect-h-9">
            <img
              src={car.imageUrl || `https://via.placeholder.com/300x200?text=${car.Make_Name}+${car.Model_Name}`}
              alt={`${car.Make_Name} ${car.Model_Name}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">{car.Make_Name} {car.Model_Name}</h3>
            {car.year && <p className="text-gray-600">Year: {car.year}</p>}
            {car.price && (
              <p className="text-lg font-bold text-blue-600 mt-2">
                ${car.price.toLocaleString()}
              </p>
            )}
            {car.specifications && (
              <div className="mt-2 text-sm text-gray-600">
                {car.specifications.engine && <p>Engine: {car.specifications.engine}</p>}
                {car.specifications.horsepower && <p>Power: {car.specifications.horsepower} HP</p>}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CarList; 