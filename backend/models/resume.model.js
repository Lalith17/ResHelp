import mongoose from "mongoose";
const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  link: String,
});

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  startYear: Number,
  feild: String,
  endYear: Number,
  grade: String,
  order: Number,
});
const resumeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summary: {
      type: String,
      required: false,
    },
    skills: {
      type: [String],
      required: false,
    },
    languages: {
      type: [String],
      required: false,
    },
    intrests: {
      type: [String],
      required: false,
    },
    links: {
      type: [String],
      required: false,
    },
    education: [educationSchema],
    achievement: [achievementSchema],
  },
  {
    timestamps: true,
  }
);

resumeSchema.index({ userId: 1 });

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
