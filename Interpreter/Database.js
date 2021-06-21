const DBDdb = require("dbdjs.db");
module.exports = async d => {
const Database = new DBDdb.Database({
  
  path: "./Database/",
  tables: [
    {
      name: "main",
    },
  ],
  maxFileData: 10000,
  cacheMaxSize: 10000,
  saveTime: 3,
  getTime: 1,
  allTime: 2,
  deleteTime: 4,
})
  Database.once("ready", () => {
    console.log(`Database ready!`);
  });

  Database.connect();
}