const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000; // Render definirá a PORT, mas o 3000 é um fallback para ambiente local

app.get('/repos/csharp', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/orgs/takenet/repos', {
      params: {
        sort: 'created',
        direction: 'asc',
        per_page: 100,
      },
    });

    const csharpRepos = response.data.filter(repo => repo.language === 'C#');
    const oldestFiveRepos = csharpRepos.slice(0, 5);

    const carouselData = oldestFiveRepos.map(repo => ({
      title: repo.full_name,
      subtitle: repo.description,
      image: 'https://avatars.githubusercontent.com/u/4369522?v=4',
      buttons: [],
    }));

    res.json(carouselData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar repositórios do GitHub' });
  }
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
