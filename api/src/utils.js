const parsePokemonAPI = (data) => {
  const hpStat = data.data.stats.find((stat) => stat.stat.name === "hp");
  const attackStat = data.data.stats.find(
    (stat) => stat.stat.name === "attack"
  );
  const defenseStat = data.data.stats.find(
    (stat) => stat.stat.name === "defense"
  );
  const speedStat = data.data.stats.find((stat) => stat.stat.name === "speed");
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
    origin: "API",
  };
};

const parsePokemonsDB = (data) => {
  data = data.map((obj) => obj.get({ plain: true }));
  data = data.map((obj) => {
    return { ...obj, origin: "DB", types: obj["types"].map((e) => e.name) };
  });
  return data;
};

module.exports = {
  parsePokemonAPI,
  parsePokemonsDB,
};
