const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// IMPORTANT FIX 👇 prevents overwrite error
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);