const axios = require("axios");
const { Pokemon, Type } = require("../db.js");
const { parsePokemonAPI, parsePokemonsDB } = require("../utils.js");

const getPokemonById = async (req, res) => {
  let pokemon;
  //me traigo el param name
  const id = req.params.id;
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const search = await axios(url);
    pokemon = parsePokemonAPI(search);
    results.push(pokemonAPI);
  } catch (error) {}

  if (!pokemon) {
    pokemon = await Pokemon.findOne({
      where: { id },
      include: { model: Type },
    });

    if (pokemon) {
      // console.log(pokemonDB);
      pokemon = parsePokemonsDB([pokemon]);
    }
  }
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json("not found");
  }
};

module.exports = getPokemonById;
