const mongoose = require("mongoose");
// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    solvedProblem: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }]
  });
  
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
const problemSchema = new mongoose.Schema({
    title: String,
    description: String,
    example: Array,
    testcase: Array,
    solutions: Array
  });

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Problem = mongoose.model('Problem', problemSchema);
  
  module.exports = {
    User,
    Admin,
    Problem
  }