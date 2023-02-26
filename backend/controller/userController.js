const express = require("express");
const User = require("../../backend/model/userModel");
const { generateToken } = require("../utils/generateToken");
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
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
};
const authUser = async (req, res) => {
  const { email, pass } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(pass))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json(0);
  }
};

module.exports = { registerUser, authUser };
