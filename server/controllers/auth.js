const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

// register
const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    imageUrl,
    location,
    occupation,
  } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath: imageUrl,
      occupation,
      location,
    });

    delete newUser.password;
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credential!" });
    }

    const isValidUser = await bcrypt.compare(password, user.password);
    if (!isValidUser) {
      return res.status(404).json({ message: "Invalid credentoals!" });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    console.log(user, token);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
