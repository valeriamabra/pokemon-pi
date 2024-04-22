const axios = require("axios");

const { Pokemon, Type } = require("../db.js");
const { parsePokemonAPI, parsePokemonsDB } = require("../utils.js");

const getPokemons = async (req, res) => {
  let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=46`;

  const search = await axios(url);

  try {
    // Busca en la API const search await axios.get(URL_PATH_AP1);
    let pokemonsAPI = await Promise.all(
      search.data.results.map(async (pokemon) => {
        const data = await axios.get(pokemon.url);
        return parsePokemonAPI(data);
      })
    );

    // Busca en la base de datos
    let pokemonsDB = await Pokemon.findAll({
      include: { model: Type },
    });
    if (pokemonsDB.length !== 0) {
      pokemonsDB = parsePokemonsDB(pokemonsDB);
    }

    let pokemons = [...pokemonsAPI, ...pokemonsDB];
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getPokemons;
