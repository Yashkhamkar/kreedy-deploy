const express = require("express");
const User = require("../../backend/model/userModel");
const { generateToken } = require("../utils/generateToken");
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const registerUser = async (req, res) => {
  const { name, email, pass } = req.body;
  console.log(req.body);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404).json(0);
  }

  const user = await User.create({
    name,
    email,
    pass,
  });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
    // res.cookie("jwt", token, { httpOnly: true, maxAge: 5 * 60 * 1000 });
  }
};
const authUser = async (req, res) => {
  const { email, pass } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(pass))) {
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(401).json(0);
  }
};

module.exports = { registerUser, authUser, getUserById };
