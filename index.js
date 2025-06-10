const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/recipes', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/random',
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          number: req.query.number || 3,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении рецептов' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
