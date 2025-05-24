import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
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
    description: {
      type: [String],
      required: false,
    },
    languages: {
      type: [String],
      required: false,
    },
    repoLink: {
      type: String,
      required: false,
    },
    deployedLink: {
      type: String,
      required: false,
    },
    tags: {
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

// ✅ Add index on userId for efficient queries
projectSchema.index({ userId: 1 });

const Project = mongoose.model("Project", projectSchema);
export default Project;
