import mongoose from "mongoose";
const experienceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    description: {
      type: [String],
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
experienceSchema.index({ userId: 1 });

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
