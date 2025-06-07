import mongoose from "mongoose";

const basicsSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  links: [String],
  summary: String,
});

const educationSchema = new mongoose.Schema({
  degree: String,
  field: String,
  institution: String,
  startYear: Number,
  endYear: Number,
  grade: String,
  order: Number,
});

const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const volunteerSchema = new mongoose.Schema({
  organization: String,
  position: String,
  startDate: Date,
  endDate: Date,
  description: String,
  order: Number,
});

const languagesSchema = new mongoose.Schema({
  language: String,
  level: String,
});

const skillsSchema = new mongoose.Schema({
  skillsName: String,
  level: String,
  technologies: [String],
});

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    basics: basicsSchema,
    skills: [skillsSchema],
    languages: [languagesSchema],
    education: [educationSchema],
    achievements: [achievementSchema],
    volunteer: [volunteerSchema],
  },
  {
    timestamps: true,
  }
);

resumeSchema.index({ userId: 1 });

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
