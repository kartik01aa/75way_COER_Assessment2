import { Router } from "express";
import {
  loginDriver,
  registerDriver,
  getCustomerRequest,
  removeApprovedRequest,
  logoutDriver,
  customerRequestAccepted,
  getDriver,
  updateDriver,
  changeDriverStatus,
  requestForDriver,
} from "../controllers/driver.controllers";

const driverRouter = Router();

driverRouter.post("/registerDriver", registerDriver);
driverRouter.post("/loginDriver", loginDriver);
driverRouter.post("/updateDriver", updateDriver);
driverRouter.get("/logoutDriver", logoutDriver);
driverRouter.post("/getDriver", getDriver);
driverRouter.post("/changeDriverStatus", changeDriverStatus);
driverRouter.post("/requestForDriver", requestForDriver);
driverRouter.post("/customerRequestAccepted", customerRequestAccepted);
driverRouter.get("/getCustomerRequest/:id", getCustomerRequest);
driverRouter.get("/removeApprovedRequest/:id", removeApprovedRequest);

export default driverRouter;
