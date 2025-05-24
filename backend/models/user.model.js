import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },

    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    zip: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
      default: null,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
