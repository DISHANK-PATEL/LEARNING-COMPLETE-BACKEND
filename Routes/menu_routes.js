// routes/menu.js
const express   = require('express');
const router    = express.Router();
const MenuItem  = require('../models/menu');

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    const newMenu = new MenuItem(req.body);
    const saved    = await newMenu.save();
    console.log('Menu item saved');
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    console.log('Menu items fetched');
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
