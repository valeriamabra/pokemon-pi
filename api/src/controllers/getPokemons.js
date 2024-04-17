const axios = require("axios");

const { Pokemon } = require("../db.js");

const getPokemons = async (req, res) => {
  let results = [];

  //me traigo la query param NAME
  const name = req.query.name;

  //si llego la query param NAME
  if (name) {
    //definimos la ruta base q vamos a usar en la llamada http con axios a la pokeapi
    let url = `https://pokeapi.co/api/v2/pokemon`;

    //voy a modificar la ruta para concatenarle /name
    url = url + "/" + name.toLowerCase();

    try {
      const { data: pokemonAPI } = await axios(url);
      results.push(pokemonAPI);
    } catch (error) {}

    const pokemonDB = await Pokemon.findOne({
      where: { name },
    });

    if (pokemonDB) results.push(pokemonDB);
  } else {
    //definimos la ruta base q vamos a usar en la llamada http con axios a la pokeapi
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`;
    try {
      const {
        data: { results: pokemonsAPI },
      } = await axios(url);
      results.push(...pokemonsAPI);
    } catch (error) {}

    const pokemonsDB = await Pokemon.findAll();
    results.push(...pokemonsDB);
  }

  res.json(results);
};

module.exports = getPokemons;
