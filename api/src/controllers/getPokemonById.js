const axios = require("axios");

const getPokemonById = async (req, res) => {
  //me traigo el param idPokemon
  const id = req.params.idPokemon;

  try {
    //hago una http request a la pokeapi para traerme el pokemon
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
};

module.exports = getPokemonById;
