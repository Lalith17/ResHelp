import mongoose from "mongoose";

const certificateSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    issuedBy: {
      type: String,
      required: false,
    },
    issuedDate: {
      type: Date,
      required: false,
    },
    expirationDate: {
      type: Date,
      required: false,
    },
    skills: {
      type: [String],
      required: false,
    },
    keywords: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
certificateSchema.index({ userId: 1 });

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
