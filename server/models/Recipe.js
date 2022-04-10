const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This title is required",
  },
  description: {
    type: String,
    required: "This field is required",
  },
  email: {
    type: String,
    required: "This file is required",
  },
  ingredients: {
    type: Array,
    required: "This file is required",
  },
  category: {
    type: String,
    enum: ["Thai", "American", "Chinese", "Mexican", "Indian"],
    required: "This file is required",
  },
  image: {
    type: String,
    required: "This file is required",
  },
});

recipeSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Recipe", recipeSchema);
