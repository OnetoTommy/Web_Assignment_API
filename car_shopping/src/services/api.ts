import axios, { AxiosResponse } from 'axios';
import { Car, CarDetails, CarSearchResponse } from '../types/car';

interface CarImageResponse {
  data: Array<{
    url: string;
  }>;
}

interface CarDetailsResponse {
  data: Array<{
    year: number;
    description: string;
    price: {
      base: string;
    };
    features: string[];
  }>;
}

const NHTSA_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';
const CAR_IMAGES_API_KEY = 'your_api_key'; // 需要替换为实际的 API key
const CAR_IMAGES_BASE_URL = 'https://api.carapi.app/api';

export const searchCars = async (query: string): Promise<Car[]> => {
  try {
    const response = await axios.get<CarSearchResponse>(
      `${NHTSA_BASE_URL}/getmodelsformake/${encodeURIComponent(query)}?format=json`
    );

    // 为每个车型获取图片
    const carsWithImages = await Promise.all(
      response.data.Results.map(async (car) => {
        try {
          const imageResponse = await axios.get<CarImageResponse>(
            `${CAR_IMAGES_BASE_URL}/images`, {
              params: {
                make: car.Make_Name,
                model: car.Model_Name,
                year: new Date().getFullYear(),
                angle: 'front',
              },
              headers: {
                'Authorization': `Bearer ${CAR_IMAGES_API_KEY}`
              }
            }
          );

          return {
            ...car,
            imageUrl: imageResponse.data.data[0]?.url || getDefaultCarImage(car.Make_Name, car.Model_Name)
          };
        } catch (error) {
          console.error('Error fetching car image:', error);
          return {
            ...car,
            imageUrl: getDefaultCarImage(car.Make_Name, car.Model_Name)
          };
        }
      })
    );

    return carsWithImages;
  } catch (error) {
    console.error('Error searching cars:', error);
    throw error;
  }
};

export const getCarDetails = async (make: string, model: string): Promise<CarDetails> => {
  try {
    // 获取基本车辆信息
    const response = await axios.get<CarSearchResponse>(
      `${NHTSA_BASE_URL}/getmodelsformake/${encodeURIComponent(make)}?format=json`
    );
    
    const car = response.data.Results.find(c => c.Model_Name.toLowerCase() === model.toLowerCase());
    
    if (!car) {
      throw new Error('Car not found');
    }

    // 获取车辆图片
    const imageResponse = await axios.get<CarImageResponse>(
      `${CAR_IMAGES_BASE_URL}/images`, {
        params: {
          make: car.Make_Name,
          model: car.Model_Name,
          year: new Date().getFullYear(),
          angle: 'front',
        },
        headers: {
          'Authorization': `Bearer ${CAR_IMAGES_API_KEY}`
        }
      }
    );

    // 获取车辆详细信息
    const detailsResponse = await axios.get<CarDetailsResponse>(
      `${CAR_IMAGES_BASE_URL}/cars`, {
        params: {
          make: car.Make_Name,
          model: car.Model_Name,
          year: new Date().getFullYear(),
        },
        headers: {
          'Authorization': `Bearer ${CAR_IMAGES_API_KEY}`
        }
      }
    );

    const carDetails = detailsResponse.data.data[0];

    const details: CarDetails = {
      ...car,
      VehicleTypeName: car.VehicleTypeName || 'Unknown',
      VehicleTypeId: car.VehicleTypeId || 0,
      Year: carDetails?.year || new Date().getFullYear(),
      Description: carDetails?.description || `The ${car.Make_Name} ${car.Model_Name} is a premium vehicle known for its quality and performance.`,
      ImageUrl: imageResponse.data.data[0]?.url || getDefaultCarImage(car.Make_Name, car.Model_Name),
      Price: carDetails?.price?.base || '$30,000 - $50,000',
      Features: carDetails?.features || [
        'Advanced Safety Features',
        'Premium Audio System',
        'Leather Interior',
        'Navigation System'
      ]
    };

    return details;
  } catch (error) {
    console.error('Error fetching car details:', error);
    throw error;
  }
};

// 备用图片获取函数
const getDefaultCarImage = (make: string, model: string): string => {
  // 使用 Unsplash API 作为备用图片源
  return `https://source.unsplash.com/800x450/?${encodeURIComponent(make)}+${encodeURIComponent(model)}+car`;
}; 