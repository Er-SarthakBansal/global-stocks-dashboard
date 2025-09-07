require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/quote',async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) {
    return res.status(400).json({ error: 'Missing symbol query parameter' });
  }
  try {
    const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: {
        symbol: symbol,
        token: process.env.API_KEY
      }
    });
    return res.json(response.data);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});