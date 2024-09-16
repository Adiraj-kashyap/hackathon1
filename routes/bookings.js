 
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { user_id, venue_id, event_name, start_time, end_time } = req.body;
    const newBooking = await pool.query(
      'INSERT INTO bookings (user_id, venue_id, event_name, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, venue_id, event_name, start_time, end_time]
    );
    res.json(newBooking.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const allBookings = await pool.query('SELECT * FROM bookings');
    res.json(allBookings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific booking
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    if (booking.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a booking
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { event_name, start_time, end_time } = req.body;
    const updateBooking = await pool.query(
      'UPDATE bookings SET event_name = $1, start_time = $2, end_time = $3 WHERE id = $4 RETURNING *',
      [event_name, start_time, end_time, id]
    );
    if (updateBooking.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(updateBooking.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBooking = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
    if (deleteBooking.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;