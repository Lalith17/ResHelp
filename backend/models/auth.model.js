import mongoose from "mongoose";

const authSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["local", "google", "github", "linkedin"],
      default: "local",
    },
    github: {
      accessToken: { type: String },
      username: { type: String },
    },
    linkedin: {
      accessToken: { type: String },
      linkedinId: { type: String }, // LinkedIn user ID
      firstName: { type: String },
      lastName: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
