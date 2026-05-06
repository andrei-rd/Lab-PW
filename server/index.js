const express = require('express');
const mongoose = require('mongoose');
const Project = require('./models/Project');

const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dashboard')
  .then(() => console.log('Conectat la MongoDB!'))
  .catch(err => console.error('Eroare conectare MongoDB:', err));

app.get('/', function(req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', async function(req, res) {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects/:id', async function(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Proiectul nu a fost gasit' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stats', async function(req, res) {
  try {
    const projects = await Project.find();
    const stats = {
      total: projects.length,
      done: projects.filter(p => p.done === true).length,
      inProgress: projects.filter(p => p.done === false).length
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async function(req, res) {
  try {
    const newProject = new Project({
      title: req.body.title,
      tech: req.body.tech,
      done: req.body.done || false
    });
    
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async function(req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Proiectul nu a fost gasit pentru stergere' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', async function(req, res) {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );
    if (!updatedProject) {
      return res.status(404).json({ error: 'Proiectul nu a fost gasit pentru actualizare' });
    }
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});