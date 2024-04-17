const { Pokemon, Type } = require("../db.js");

const createPokemon = async (req, res) => {
  try {
    // me traigo todos los campos recibidos en los body params
    const { name, image, hp, attack, defense, speed, height, weight, types } =
      req.body;

    // chequeo de que ninguno este vacio
    if (
      !name ||
      !image ||
      !hp ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weight ||
      !types ||
      types.length < 2
    ) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // chequeo que los types recibidos existan
    //En este bucle for, estamos verificando si cada tipo recibido en la solicitud
    //existe en la base de datos. Utilizamos Type.findOne para buscar el tipo por su nombre y
    //si no lo encontramos, respondemos con un código de estado 400 y un mensaje de error.
    for (const typeName of types) {
      const typeFound = await Type.findOne({ where: { name: typeName } });
      if (!typeFound) {
        return res
          .status(400)
          .json({ error: `El tipo '${typeName}' no es válido` });
      }
    }

    // Crear el Pokémon en la base de datos
    //Aquí estamos creando un nuevo Pokémon en la base de datos utilizando el método findOrCreate de Sequelize.
    // Si ya existe un Pokémon con el mismo id, lo encontrará y lo devolverá.
    //De lo contrario, creará un nuevo Pokémon con los datos proporcionados.
    const newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    //Después de crear el Pokémon, buscamos todos los tipos que recibimos en la solicitud y
    //los asociamos al Pokémon recién creado utilizando el método setTypes.
    const foundTypes = await Type.findAll({ where: { name: types } });

    // Después de crear el Pokémon, asociar los tipos al Pokémon creado
    foundTypes.forEach(async (type) => {
      await newPokemon.addType(type);
    });

    //respondemos con un código de estado 201 (creado exitosamente) y el nuevo Pokémon en formato JSON.
    return res.status(201).json(newPokemon);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = createPokemon;
