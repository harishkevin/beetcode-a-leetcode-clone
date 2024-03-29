const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User, Problem, Admin } = require("../db");
const router = express.Router();
const jwt = require('jsonwebtoken');
const {runUserScript} = require('./executeCode')
const {exec, spawn} = require('child_process')
const Docker = require('dockerode');


const docker = new Docker();

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

  router.get('/me', authenticateJwt, async (req, res) => {
    const user = await User.findOne({username : req.user.username})
    if (!user) {
      res.status(403).json({message : "User doesn't exist"})
    }
    res.json({
      username : user.username
    })
  })
  
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

  router.post('/execute2', async (req, res) => {
    const userCode = req.body.code;
  
    // Create a Docker container
    const container = await docker.createContainer({
      Image: 'node:14', // Use an appropriate Node.js version
      Cmd: ['node', '-e', userCode],
      Tty: false, // Use false to disable TTY allocation
    });
  
    // Start the container
    await container.start();
  
    // Attach to the container's output
    const logsStream = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
    });
  
    // Collect the container's output as a string
    let logs = '';
    logsStream.on('data', (chunk) => {
      logs += chunk.toString();
    });

    console.log('log::' + logs)
  
    // When the stream ends, send the logs as a JSON response
    logsStream.on('end', () => {
      const responseJSON = { logs: logs };
      console.log(responseJSON)
      res.json(responseJSON);
    });
  
    // Cleanup after the container finishes
    await container.wait();
    await container.remove();
  });

  
  module.exports = router