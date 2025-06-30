// routes/person.js
const express = require('express');
const router  = express.Router();
const Person  = require('../models/person');  

// GET    /person           → all people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    console.log('Data fetched');
    res.status(200).json(people);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST   /person           → create a new person
router.post('/', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const saved = await newPerson.save();
    console.log('Data saved');
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET    /person/:workType → filter by work type
router.get('/:workType', async (req, res) => {
  try {
    const { workType } = req.params;
    if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
      const response = await Person.find({ work: workType });
      console.log('Response Fetched');
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid work type' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
