const { Type } = require("../db.js");

const getTypes = async (req, res) => {
  const typesDB = await Type.findAll();

  return res.json(typesDB);
};

module.exports = getTypes;
