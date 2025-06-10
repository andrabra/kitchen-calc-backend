const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/recipes', async (req, res) => {
  const { number } = req.query;

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/random', {
      params: {
        number: number || 3,
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    });

    res.json({ recipes: response.data.recipes });
  } catch (error) {
    console.error('Ошибка при получении рецептов:', error.message);
    res.status(500).json({ error: 'Ошибка при получении рецептов' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
