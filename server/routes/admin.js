const mongoose = require("mongoose");
const express = require('express');
const { User, Problem, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.post('/addProblem', authenticateJwt, async (req, res) => {
    const problem = new Problem(req.body);
    await problem.save();
    res.json({ message: 'Problem created successfully', problemId: problem.id });
  });
  
  router.put('/problems/:problemId', authenticateJwt, async (req, res) => {
    const problem = await Problem.findByIdAndUpdate(req.params.problemId, req.body, { new: true });
    if (problem) {
      res.json({ message: 'Problem updated successfully' });
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  });
  
  router.get('/problems', authenticateJwt, async (req, res) => {
    const problems = await Problem.find({});
    res.json({ problems });
  });
  
  router.get('/problem/:problemId', authenticateJwt, async (req, res) => {
    const problemId = req.params.problemId;
    const problem = await Problem.findById(problemId);
    res.json({ problem });
  });

  module.exports = router