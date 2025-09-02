// routes/predict.js 
const express = require('express'); 
const router = express.Router();
const { trainUserModel, predictBestLocation } = require("../routes/locationPredictor")
const { protect } = require("../middleware/authMiddleware");

router.post('/train', async (req, res) => {
  try {
    const userId = req.user.id; 
    const result = await trainUserModel(userId);

    if (!result) return res.status(400).json({ message: 'No data to train on for this user.' });
    res.json({ message: 'Model trained successfully', ...result });
  } catch (err) {
    console.error('Training error:', err);
    res.status(500).json({ error: 'Training failed' });
  }
});

router.get('/predict', async (req, res) => {
  try {
    const userId = req.user.id; // from auth
    const { activity = 'General', date, duration } = req.query;

    if (!date || !duration) {
      return res.status(400).json({ error: 'Missing required query params: date, duration' });
    }

    const targetDate = new Date(date);
    const parsedDuration = Number(duration);
    if (Number.isNaN(parsedDuration)) {
      return res.status(400).json({ error: 'duration must be a number (minutes)' });
    }

    const result = await predictBestLocation(userId, activity, targetDate, parsedDuration);
    res.json(result);
  } catch (err) {
    console.error('Prediction error:', err);
    res.status(500).json({ error: err.message || 'Prediction failed' });
  }
});

module.exports = router; 