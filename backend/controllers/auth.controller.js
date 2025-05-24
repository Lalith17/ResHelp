import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Auth.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Auth({ email, password: hashedPassword });
  try {
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await Auth.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await Auth.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updatePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await Auth.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Current password is incorrect" });

    // Hash and update the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
