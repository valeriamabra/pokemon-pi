//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Type } = require("./src/db.js");

const axios = require("axios");

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(async () => {
    // cuando se terminan de crear las tablas segun los modelos que definimos
    // traigo de la pokeapi todos los types y los guardo en mi base de datos
    const {
      data: { results },
    } = await axios(`https://pokeapi.co/api/v2/type`);

    // recorro todos los types que me vinieron de la pokeapi
    // y 1 a 1 los guardo en mi base de datos
    results.forEach(async (type) => {
      await Type.create({
        name: type.name,
      });
    });
  })
  .then(() => {
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  });
