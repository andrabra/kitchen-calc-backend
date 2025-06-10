const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: [
    'https://andrabra.github.io',
    'http://localhost:5173'
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Эндпоинт для случайных рецептов
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

// Новый эндпоинт для поиска рецептов
app.get('/api/recipes/search', async (req, res) => {
  const { query, number, offset, diet, cuisine, type } = req.query;

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        query: query || '',
        number: number || 10,
        offset: offset || 0,
        diet: diet || '',
        cuisine: cuisine || '',
        type: type || '',
        instructionsRequired: true,
        addRecipeInformation: true
      },
    });

    res.json({ results: response.data.results, totalResults: response.data.totalResults });
  } catch (error) {
    console.error('Ошибка при поиске рецептов:', error.message);
    res.status(500).json({ error: 'Ошибка при поиске рецептов' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});