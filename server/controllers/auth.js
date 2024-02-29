const User = require("../models/auth.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with email already exists",
      });
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Occurred");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("Incorrect Email");
    }
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return res.send("Incorrect Password");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWTPRIVATEKEY
    );
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    const currentUser = {
      userName: user.username,
      email: user.email,
      _id: user._id,
    };

    res.status(201).json({ currentUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Occurred");
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie('token', '', { expires: new Date(0) });
    res.status(204).send('Logout successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
}
};
