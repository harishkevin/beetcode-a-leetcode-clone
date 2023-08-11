const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User, Problem, Admin } = require("../db");
const router = express.Router();
const jwt = require('jsonwebtoken');
const {runUserScript} = require('./executeCode')

  router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
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
  
  router.post('/problems/:problemId', authenticateJwt, async (req, res) => {
    const problem = await Problem.findById(req.params.problemId);
    console.log(problem);
    if (problem) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.solvedProblem.push(problem);
        await user.save();
        res.json({ message: 'problem solved successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'problem not found' });
    }
  });
  
  router.get('/solvedProblems', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('solvedProblem');
    if (user) {
      res.json({ solvedProblem: user.solvedProblem || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });

  router.post('/execute', authenticateJwt, async (req, res) => {
    try{
      const code = req.body.code;
      const result = await runUserScript(code)
      res.json({output: result})
  } catch (error) {
    res.status(400).json({error : error.message})
  }
  })

  
  module.exports = router