import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

const getJwtSecret = () => process.env.JWT_SECRET;

const signUserToken = (user) =>
  jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: "user"
    },
    getJwtSecret(),
    { expiresIn: "7d" }
  );

const buildUserResponse = (user) => {
  const plainUser = user.toObject();
  delete plainUser.password;
  return { ...plainUser, role: "user" };
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required."
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      address: address ? address.trim() : ""
    });

    return res.status(201).json({
      message: "Account created successfully.",
      token: signUserToken(user),
      user: buildUserResponse(user)
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create account."
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    return res.json({
      message: "Login successful.",
      token: signUserToken(user),
      user: buildUserResponse(user)
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to login."
    });
  }
};
