import { Router } from "express";
import {
  loginCustomer,
  registerCustomer,
  logoutCustomer,
  getCustomerHistory,
  getCustomerData,
  updateCustomer,
  changeCustomerStatus,
} from "../controllers/customer.controllers";

const customerRouter = Router();

customerRouter.post("/registerCustomer", registerCustomer);
customerRouter.post("/loginCustomer", loginCustomer);
customerRouter.post("/updateCustomer", updateCustomer);
customerRouter.post("/changeCustomerStatus", changeCustomerStatus);
customerRouter.get("/logoutCustomer", logoutCustomer);
customerRouter.post("/getCustomerData", getCustomerData);
customerRouter.post("/getCustomerHistory", getCustomerHistory);

export default customerRouter;
