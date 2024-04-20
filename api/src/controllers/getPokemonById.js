const axios = require("axios");
const { Pokemon } = require("../db.js");

const getPokemonById = async (req, res) => {
  //me traigo el param idPokemon
  const id = req.params.idPokemon;
  const results = [];

  try {
    //hago una http request a la pokeapi para traerme el pokemon
    const { data: pokemonAPI } = await axios(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    results.push(pokemonAPI);
  } catch (error) {}

  const pokemonDB = await Pokemon.findOne({
    where: { id },
  });

  if (pokemonDB) results.push(pokemonDB);
  return res.json(results);
};

module.exports = getPokemonById;
