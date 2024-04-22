const axios = require("axios");

const { Pokemon, Type } = require("../db.js");

const getPokemons = async (req, res) => {
  let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;

  const search = await axios(url);

  try {
    // Busca en la API const search await axios.get(URL_PATH_AP1);
    let pokemons_api = await Promise.all(
      search.data.results.map(async (pokemon) => {
        const data = await axios.get(pokemon.url);
        const hpStat = data.data.stats.find((stat) => stat.stat.name === "hp");
        const attackStat = data.data.stats.find(
          (stat) => stat.stat.name === "attack"
        );
        const defenseStat = data.data.stats.find(
          (stat) => stat.stat.name === "defense"
        );
        const speedStat = data.data.stats.find(
          (stat) => stat.stat.name === "speed"
        );
        const typeNames = data.data.types.map((type) => type.type.name);

        const {
          id,
          name,
          sprites: {
            other: {
              "official-artwork": { front_default: image },
            },
          },
          height,
          weight,
        } = data.data;

        return {
          id,
          name,
          image,
          hp: hpStat ? hpStat.base_stat : null,
          // Para manejar el caso cuando no hay datos
          attack: attackStat ? attackStat.base_stat : null,
          defense: defenseStat ? defenseStat.base_stat : null,
          speed: speedStat ? speedStat.base_stat : null,
          height,
          weight,
          types: typeNames,
        };
      })
    );

    // Busca en la base de datos
    let pokemons_db_search = await Pokemon.findAll({
      include: { model: Type },
    });
    if (pokemons_db_search.length !== 0) {
      pokemons_db_search = pokemons_db_search.map((obj) =>
        obj.get({ plain: true })
      );
      pokemons_db_search = pokemons_db_search.map((obj) => {
        console.log("@@@@@@@@@@@@@@@@@@@@@");
        console.log(JSON.stringify(obj["types"]));
        console.log(obj["types"].map((e) => e.name).join(", "));
        console.log("@@@@@@@@@@@@@@@@@@@@@");
        return { ...obj, types: obj["types"].map((e) => e.name) };
      });
    }

    let pokemons = [...pokemons_api, ...pokemons_db_search];
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getPokemons;
