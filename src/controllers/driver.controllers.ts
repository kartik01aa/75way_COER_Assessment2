import { RequestHandler } from "express";
import { Driver } from "../models/schema";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import Jwt from "jsonwebtoken";

export const registerDriver: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, location, password, vehicleType } = req.body;

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const pass: RegExp =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    // check input for correctness
    if (!pass.test(password.toString()))
      return res.status(400).json({
        msg: "Enter valid password with uppercase, lowercase, number , @",
      });
    if (!expression.test(email.toString()))
      return res.status(400).json({
        msg: "Enter valid Email",
      });

    // checking if user already exist
    const existinguser = await Driver.findOne({ email });

    if (existinguser) {
      return res.status(400).json({
        msg: "Email already exists.",
      });
    }
    // password hashing and inserting data in Database
    const salt = genSaltSync(10);
    const hashPassword = hashSync(password.toString(), salt);
    await new Driver({
      name,
      email,
      location,
      password: hashPassword,
      vehicleType,
      isActive: true,
    }).save();

    return res.status(200).json({ msg: "New Driver registered" });
  } catch (error) {
    next(error);
  }
};

export const loginDriver: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const existinguser = await Driver.findOne({ email });
    //if user is not found
    if (!existinguser) {
      return res.status(407).json({ message: "Driver does not Exist" });
    }
    const isMatch = compareSync(
      password.toString(),
      existinguser?.password as string
    );
    //if password doens't match
    if (!isMatch) {
      return res.status(407).json({ message: "Password not match" });
    }

    const id = existinguser._id;
    let refereshToken = "",
      AccessToken = "";
    let payload = { id: "1" };
    refereshToken = await Jwt.sign(
      { payload, id },
      process.env.JWT_REFRESH_SECRET_KEY!,
      {
        expiresIn: "2h",
        noTimestamp: true,
      }
    );

    AccessToken = await Jwt.sign({ payload, id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "30m",
      noTimestamp: true,
    });
    res.cookie("authToken", AccessToken, { httpOnly: true });
    res.cookie("refreshToken", refereshToken, { httpOnly: true });

    res.status(200).json({
      refereshToken,
      AccessToken,
      existinguser,
      message: "Driver logged in successfully",
    });
  } catch (err) {
    return res.status(407).json({ message: err });
  }
};

export const logoutDriver: RequestHandler = (req, res, next) => {
  try {
    res.clearCookie("authToken");
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .json({ ok: true, message: "User has been logged out" });
  } catch (err) {
    next(err);
  }
};
export const getDriver: RequestHandler = async (req, res, next) => {
  try {
    const { location } = req.body;
    console.log("yyyyyy", location);
    const driver = await Driver.find({ location }).exec();
    return res.status(200).json(driver);
  } catch (err) {
    return res.status(407).json({ message: err });
  }
};
export const updateDriver: RequestHandler = async (req, res, next) => {
  try {
    const { location, id } = req.body;
    await Driver.findByIdAndUpdate(
      { _id: id },
      {
        location: location,
      }
    );

    return res
      .status(200)
      .json({ ok: true, message: "Driver location has been updated" });
  } catch (err) {
    next(err);
  }
};

export const changeDriverStatus: RequestHandler = async (req, res, next) => {
  try {
    const { isActive, name } = req.body;
    console.log(name, isActive);
    const driver = await Driver.findOne({ name });
    console.log("hhhh", driver);
    if (isActive === true) {
      await Driver.findByIdAndUpdate(
        { _id: driver?._id },
        {
          isActive: !isActive,
          location: "",
        }
      );
    } else {
      await Driver.findByIdAndUpdate(
        { _id: driver?._id },
        {
          isActive: !isActive,
        }
      );
    }

    return res
      .status(200)
      .json({ ok: true, message: "Driver status has been updated" });
  } catch (err) {
    next(err);
  }
};

export const requestForDriver: RequestHandler = async (req, res) => {
  try {
    const { location, customerId, driverId } = req.body;

    const driver = await Driver.findOne({ _id: driverId });
    if (!driver) {
      return res.status(400).json({ msg: "driver not found!" });
    }
    driver.requests.push({ customerId, location });
    await driver.save();

    return res
      .status(200)
      .json({ ok: true, message: "Driver location has been updated" });
  } catch (err) {
    console.log(err);
  }
};
export const customerRequestAccepted: RequestHandler = async (req, res) => {
  try {
    const { customerId, location, driverId } = req.body;

    const driver = await Driver.findOne({ _id: driverId });
    if (!driver) {
      return res.status(400).json({ msg: "driver not found!" });
    }
    let i;
    for (i = 0; i < driver.requests.length; i++) {
      if (driver.requests[i].customerId === customerId) break;
    }
   
    driver.requests.splice(i, 1);
    driver.approved.push({ customerId, location });

    await driver.save();

    return res
      .status(200)
      .json({ ok: true, message: "Driver location has been updated" });
  } catch (err) {
    console.log(err);
  }
};
export const removeApprovedRequest: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    console.log(req.params)
    const driver = await Driver.findOne({ _id: id });
    if (!driver) {
      return res.status(400).json({ msg: "driver not found!" });
    }

    driver.approved = [];
    console.log("Driver pop")

    await driver.save();

    return res
      .status(200)
      .json({ ok: true, message: "Driver approved list is emptied." });
  } catch (err) {
    console.log(err);
  }
};
export const getCustomerRequest: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findOne({ _id: id });

    return res
      .status(200)
      .json({
        ok: true,
        message: "Driver information retrived successfully.",
        driver,
      });
  } catch (err) {
    console.log(err);
  }
};
