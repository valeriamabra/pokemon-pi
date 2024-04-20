const axios = require("axios");

const { Pokemon } = require("../db.js");

const getPokemons = async (req, res) => {
  let results = { api: [], db: [] };

  //me traigo la query param NAME
  const name = req.query.name;

  //si llego la query param NAME
  if (name) {
    //definimos la ruta base q vamos a usar en la llamada http con axios a la pokeapi
    let url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`; //toLowerCase devuelve el name en miniscula

    try {
      // Solicitud HTTP a la PokeAPI para obtener información detallada del Pokémon
      const { data: pokemonAPI } = await axios(url);
      results.api.push(pokemonAPI);
    } catch (error) {}

    const pokemonDB = await Pokemon.findOne({
      where: { name },
    });

    if (pokemonDB) results.api.push(pokemonDB);
  } else {
    //definimos la ruta base q vamos a usar en la llamada http con axios a la pokeapi
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`;
    try {
      const {
        data: { results: pokemonsAPI },
      } = await axios(url);
      results.api.push(...pokemonsAPI);
    } catch (error) {}

    const pokemonsDB = await Pokemon.findAll();
    results.db.push(...pokemonsDB);
  }

  res.json(results);
};

module.exports = getPokemons;
