export interface Customer {
  name: string;
  email: string;
  location: string;
  password: string;
  rideStatus:string;
  rideHistory:Array;
}

type Vehicle = "Two-wheel" | "four-wheel";

export interface Driver {
  name: string;
  email: string;
  location: string;
  password: string;
  vehicleType: Vehicle;
  isActive:boolean;
  requests:Array;
  approved:Array;
}
