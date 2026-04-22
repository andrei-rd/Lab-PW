const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const projects = [
  { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
  { id: 2, title: "Calculator Buget", tech: "JS", done: true },
  { id: 3, title: "Dashboard React", tech: "React", done: false },
  { id: 4, title: "API Meteo", tech: "React, API", done: false }
];

app.get('/', function(req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', function(req, res) {
  res.json(projects);
});

app.get('/api/projects/:id', function(req, res) {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Proiectul nu a fost gasit' });
  }
});

app.get('/api/stats', function(req, res) {
  const stats = {
    total: projects.length,
    done: projects.filter(p => p.done === true).length,
    inProgress: projects.filter(p => p.done === false).length
  };
  res.json(stats);
});

app.post('/api/projects', function(req, res) {
  const newProject = {
    id: projects.length + 1, 
    title: req.body.title,   
    tech: req.body.tech,     
    done: req.body.done || false 
  };
  
  projects.push(newProject); 
  res.status(201).json(newProject); 
});

app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});