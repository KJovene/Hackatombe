import express from 'express';
import dbConnect from '../DB/dbconnect.js';

const router = express.Router();

router.post('/hello', async (req, res) => {
  const message = req.body.message;
  try {
    const [result] = await dbConnect.query(
      'INSERT INTO hellos (message) VALUES (?)',
      [message]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;