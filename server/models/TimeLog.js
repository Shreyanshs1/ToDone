import mongoose from "mongoose";

const timeLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      default: null, // This is how we know a timer is active
    },
    // Store duration in seconds for easy frontend calculations
    duration: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const TimeLog = mongoose.model("TimeLog", timeLogSchema);
export default TimeLog;