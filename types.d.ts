export interface Customer {
  name: string;
  email: string;
  location: string;
  password: string;
}

type Vehicle = "Two-wheel" | "four-wheel";

export interface Driver {
  name: string;
  email: string;
  location: string;
  password: string;
  vehicleType: Vehicle;
}
