import { RequestHandler } from "express";
import { Customer } from "../models/schema";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import Jwt from "jsonwebtoken";

export const registerCustomer: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, location, password } = req.body;
    console.log(req.body);

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
    const existinguser = await Customer.findOne({ email });

    if (existinguser) {
      return res.status(400).json({
        msg: "Email already exists.",
      });
    }
    // password hashing and inserting data in Database
    const salt = genSaltSync(10);
    const hashPassword = hashSync(password.toString(), salt);
    await new Customer({
      name,
      email,
      location,
      password: hashPassword,
    }).save();

    return res.status(200).json({ msg: "New Customer registered" });
  } catch (error) {
    next(error);
  }
};

export const loginCustomer: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const existinguser = await Customer.findOne({ email });
    console.log(existinguser);
    //if user is not found
    if (!existinguser) {
      return res.status(407).json({ message: "Customer does not Exist" });
    }
    console.log("pass1");
    const isMatch = compareSync(
      "" + password,
      existinguser.password.toString()
    );
    //if password doens't match
    if (!isMatch) {
      return res.status(407).json({ message: "Password not match" });
    }
    console.log("pass2");

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
      message: "Customer logged in successfully",
    });
  } catch (err) {
    return res.status(407).json({ message: err });
  }
};

export const logoutCustomer: RequestHandler = (req, res, next) => {
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
export const updateCustomer: RequestHandler = async (req, res, next) => {
  try {
    const { location, id } = req.body;
    await Customer.findByIdAndUpdate(
      { _id: id },
      {
        location: location,
      }
    );

    return res
      .status(200)
      .json({ ok: true, message: "Customer location has been updated" });
  } catch (err) {
    next(err);
  }
};
export const changeCustomerStatus: RequestHandler = async (req, res, next) => {
  try {
    const { name, rideStatus } = req.body;
    const customer = await Customer.findOne({ name });
    if (!customer) return res.status(400).json({ msg: "Customer not found." });
    customer.rideStatus = rideStatus;
    customer.save();

    return res
      .status(200)
      .json({ ok: true, message: "Customer status has been updated" });
  } catch (err) {
    next(err);
  }
};
export const getCustomerData: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const customer = await Customer.findOne({ name });

    return res.status(200).json({
      ok: true,
      message: "Customer information retrived successfully.",
      customer,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getCustomerHistory: RequestHandler = async (req, res) => {
  try {
    const { name, driverId, dest } = req.body;
    const customer = await Customer.findOne({ name });
 
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found." });
    }
    console.log("pass1");
    const request = {
      name,
      driverId,
      dest,
    };
    customer.rideHistory.push(request);
    console.log("pass2");
    console.log("customer :-", customer);
    await customer.save();

    return res.status(200).json({
      ok: true,
      message: "Customer information retrived successfully.",
      customer,
    });
  } catch (err) {
    console.log(err);
  }
};
