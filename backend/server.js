const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const natural = require('natural');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)`);
  db.run(`CREATE TABLE assessments (id INTEGER PRIMARY KEY, userId INTEGER, question TEXT)`);
  db.run(`CREATE TABLE responses (id INTEGER PRIMARY KEY, assessmentId INTEGER, answer INTEGER)`);
});

const SECRET_KEY = 'your-secret-key';

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    res.json({ user, token });
  });
});

app.get('/api/assessment', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    jwt.verify(token, SECRET_KEY);
    const questions = [
      { id: 1, text: 'I am aware of my emotions as they arise.' },
      { id: 2, text: 'I can empathize with my teammates’ Feelings.' },
      { id: 3, text: 'I communicate effectively in team settings.' }
    ];
    res.json({ questions });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.post('/api/assessment/submit', (req, res) => {
  const { answers } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    jwt.verify(token, SECRET_KEY);
    const score = answers.reduce((sum, a) => sum + parseInt(a), 0) / answers.length;
    const feedback = {
      message: `Your EI score is ${score.toFixed(2)}.`,
      recommendations: score < 3 
        ? ['Practice active listening.', 'Reflect on your emotions daily.']
        : ['Continue fostering empathy.', 'Lead team discussions.']
    };
    res.json(feedback);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.post('/api/integration/slack', (req, res) => {
  const { message } = req.body;
  const classifier = new natural.BayesClassifier();
  classifier.addDocument('I’m frustrated with this task', 'negative');
  classifier.addDocument('Great job, team!', 'positive');
  classifier.train();
  const sentiment = classifier.classify(message);
  res.json({ sentiment });
});

app.listen(3001, () => console.log('Server running on port 3001'));