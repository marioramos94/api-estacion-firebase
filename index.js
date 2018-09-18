const config  =require("./config/config.dev.json");

const Server =require("./Server");

(async function main(){
  await Server(config.server);  //se le pasa como parametro la configuración
})();
