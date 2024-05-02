const axios = require("axios");
const { Pokemon, Type } = require("../db.js");
const { parsePokemonAPI, parsePokemonsDB } = require("../utils.js");

const getPokemonById = async (req, res) => {
  //me traigo el param name
  const id = req.params.id;
  const origin = req.params.origin;

  let pokemon;

  if (origin === "API") {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
      const search = await axios(url);
      pokemon = parsePokemonAPI(search);
      results.push(pokemonAPI);
    } catch (error) {}
  }

  if (origin === "DB") {
    pokemon = await Pokemon.findOne({
      where: { id },
      include: { model: Type },
    });
    if (pokemon) {
      pokemon = parsePokemonsDB([pokemon])[0];
    }
  }

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json("not found");
  }
};

module.exports = getPokemonById;
