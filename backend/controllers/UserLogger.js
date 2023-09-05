const individualTraineeModel = require("../models/individualTrainee");
const corporateTraineeModel = require("../models/corporateTrainee");
const instructorModel = require("../models/instructors");
const adminModel = require("../models/administrators");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
  return jwt.sign({ name }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

const signUp = async (req, res) => {
  const { username, email, password, firstname, lastname, gender, country } =
    req.body;
  try {
    if (
      !username ||
      !email ||
      !password ||
      !firstname ||
      !lastname ||
      !gender
    ) {
      throw Error("Marked fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email not Valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }
    const exsits = await individualTraineeModel.findOne({ email });
    if (exsits) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await individualTraineeModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      country: country,
    });
    const token = createToken(user.username);

    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await adminModel.findOne({ username });
    if (!user) {
      throw error("Incorrect user");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw error("Incorrect password");
    } else {
      const token = createToken(user.username);
      res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginIndividualTrainee = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await individualTraineeModel.findOne({ username });
    if (!user) {
      throw error("Incorrect user");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw error("Incorrect password");
    } else {
      const token = createToken(user.username);
      res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginCorporateTrainee = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await corporateTraineeModel.findOne({ username });
    if (!user) {
      throw error("Incorrect username");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw error("Incorrect password");
    } else {
      const token = createToken(user.username);
      res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logininstructor = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await instructorModel.findOne({ username });
    if (!user) {
      throw error("Incorrect user");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw error("Incorrect password");
    } else {
      const token = createToken(user.username);
      res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  // TODO Logout the user
  res.cookie("jwt", "", { httpOnly: false, maxAge: 1 });
  res.status(200).json("logged out succcessfully");
};

const getUsers = async (req, res) => {
  const users = await individualTraineeModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

const activeUser = async (req, res) => { };
module.exports = {
  signUp,
  logout,
  getUsers,
  loginIndividualTrainee,
  loginCorporateTrainee,
  logininstructor,
  activeUser,
  loginAdmin,
};
