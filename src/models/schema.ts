import { Schema, model } from "mongoose";
import {Driver, Customer} from "../../types"

// Schema
const schema = new Schema<Driver>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location:{ type: String, required: true },
  password: { type: String, required: true },
  vehicleType:{ type: String, required: true },
});

const schema2 = new Schema<Customer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location:{ type: String, required: true },
  password: { type: String, required: true },
});


const Driver = model("Driver", schema);
const Customer = model("Customer", schema2);


export { Driver, Customer };
