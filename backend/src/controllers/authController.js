import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user
  const newUser = await User.create({
  name,
  email,
  password: hashedPassword,
});

  res.status(201).json({
    message: "User Registered Successfully",
    user: newUser,
  });

  
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are filled
  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  // Find user by email
  const user = await User.findOne({ email });
  // User not found
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(400).json({
    message: "Invalid Password",
  });
}
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
res.cookie("token", token, {
  httpOnly: true,
});

res.json({
  message: "Login Successfully",
});
}