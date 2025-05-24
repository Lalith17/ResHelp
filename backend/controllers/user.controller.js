import User from "../models/user.model.js";
export const createUser = async (req, res) => {
  const { fname, email, phone } = req.body;
  if (!fname || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "First name, email, and phone are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkOnboarding = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  try {
    const userProfile = await User.findOne({ authId: id });
    if (!userProfile) {
      return res
        .status(200)
        .json({ success: false, data: null, message: "User not found" });
    }
    res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// This code defines a set of functions for managing users in a MongoDB database using Mongoose.
