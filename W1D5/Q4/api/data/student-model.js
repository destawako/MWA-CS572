var mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: Number,
  grade: Number,
  courses: [courseSchema],
});

mongoose.model("Student", studentSchema, "Students");
