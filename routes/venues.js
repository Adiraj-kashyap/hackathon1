 
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all venues
router.get('/', async (req, res) => {
  try {
    const allVenues = await pool.query('SELECT * FROM venues');
    res.json(allVenues.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific venue
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await pool.query('SELECT * FROM venues WHERE id = $1', [id]);
    if (venue.rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    res.json(venue.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new venue
router.post('/', async (req, res) => {
  try {
    const { name, capacity, description } = req.body;
    const newVenue = await pool.query(
      'INSERT INTO venues (name, capacity, description) VALUES ($1, $2, $3) RETURNING *',
      [name, capacity, description]
    );
    res.json(newVenue.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a venue
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacity, description } = req.body;
    const updateVenue = await pool.query(
      'UPDATE venues SET name = $1, capacity = $2, description = $3 WHERE id = $4 RETURNING *',
      [name, capacity, description, id]
    );
    if (updateVenue.rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    res.json(updateVenue.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a venue
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVenue = await pool.query('DELETE FROM venues WHERE id = $1 RETURNING *', [id]);
    if (deleteVenue.rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    res.json({ message: 'Venue deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;