const { Router } = require("express");
const getPokemons = require("../controllers/getPokemons");
const getPokemonByName = require("../controllers/getPokemonByName");
const getPokemonById = require("../controllers/getPokemonById");
const createPokemon = require("../controllers/createPokemon");
const getType = require("../controllers/getType");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
//esta ruta puede ser usada con query param name para buscar un pokemon en particular
router.get("/pokemons", getPokemons);

router.get("/pokemons/:name", getPokemonByName);

router.get("/pokemons/id/:id", getPokemonById);

//ruta para crear pokemons
router.post("/pokemons", createPokemon);

//trae todos los tipos de pokemons
router.get("/types", getType);

module.exports = router;
