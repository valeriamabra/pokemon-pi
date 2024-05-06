const axios = require("axios");
const { Pokemon, Type } = require("../db.js");
const { parsePokemonAPI, parsePokemonsDB } = require("../utils.js");

const getPokemonByName = async (req, res) => {
  const results = [];
  //me traigo el param name
  const name = req.params.name;
  let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
    const search = await axios(url);
    const pokemonAPI = parsePokemonAPI(search);
    results.push(pokemonAPI);
  } catch (error) {}

  let pokemonDB = await Pokemon.findOne({
    where: { name },
    include: { model: Type },
  });

  if (pokemonDB) {
    // console.log(pokemonDB);
    pokemonDB = parsePokemonsDB([pokemonDB]);
    results.push(...pokemonDB);
  }

  if (results.length === 0) {
    res.status(404).send("Not found");
  } else {
    res.json(results);
  }
};

module.exports = getPokemonByName;
