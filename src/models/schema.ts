import { Schema, model } from "mongoose";
import {Driver, Customer} from "../../types"

// Schema
const schema = new Schema<Driver>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location:{ type: String, required: true },
  password: { type: String, required: true },
  vehicleType:{ type: String, required: true },
  isActive:{ type: Boolean, required: false },
  requests:{ type: Array, default: [] },
  approved:{ type: Array, default: [] },
});

const schema2 = new Schema<Customer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location:{ type: String, required: true },
  password: { type: String, required: true },
  rideStatus: { type: String, default:"inactive" },
  rideHistory: { type: Array, default:[] },
});


const Driver = model("Driver", schema);
const Customer = model("Customer", schema2);


export { Driver, Customer };
