const dotenv = require("dotenv");

const envFound = dotenv.config({ path: ".env" });
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  appName: "node_test",
  port: 4000,
  dbURI: "mongodb://localhost:27017/node_test",
  jwtSecret: "3p48-94i1u08qfhdj489135u0t9324i=2r02jf449u130",
  tokenType: "Bearer",
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: process.env.API_PREFIX,
  },
};
