const http = require("http");
const app = require("./app");
const envConfig = require("./env/config/envConfig");

const port = envConfig.PORT || 4200;

console.log(envConfig);

const server = http.createServer(app);

server.listen(port);
