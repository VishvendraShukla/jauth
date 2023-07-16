const http = require("http");
const app = require("./app");
const envConfig = require("./env/config/envConfig");
const mongoose = require("mongoose");

// Waiting for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  console.log("Connecting Mongo DB at " + envConfig.DB_URL);
  await mongoose.connect(envConfig.DB_URL);
  console.log("Connected");
}

const server = http.createServer(app);

server.listen(envConfig.PORT);
