export interface Car {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
  VehicleTypeName?: string;
  VehicleTypeId?: number;
}

export interface CarDetails {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
  VehicleTypeName: string;
  VehicleTypeId: number;
  Year: number;
  Description?: string;
  ImageUrl?: string;
  Price?: string;
  Features?: string[];
}

export interface CarSearchResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Car[];
} 