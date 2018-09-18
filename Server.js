const hapi = require("hapi");
const path =require("path");
const {promisify, format} =require("util");
const fs =require("fs");
const ngrok=require("ngrok")
 const HapiSwagger  = require('hapi-swagger');
 const Swagger = require("./Swagger");
 const Inert = require("inert");
 const Vision = require("vision");

//import * as Joi from "joi";

//import  validatefn from "./Auth";

const readDirAsync = promisify(fs.readdir);   //como esta constante se usa en un método asincrono debo enviar una promesa

//se exporta init y init será llamada desde el index y este a su vez debe esperar a que el servidor se levante
module.exports = async function init(config){
  let server = new hapi.Server({
    port: config.port,
    host: config.host 
  });
  const url = await ngrok.connect(config.port)


  
   await server.register([
        Vision,
        Inert,
        //Jwt
    ]);
    await server.register({
      plugin: HapiSwagger,
      options: Swagger
    });
/*
    //los parametros son el nombre de la estrategia y el provider
    //ese nombre es el que le pongo a las rutas
    //validatefn es un callback que se va a implementar en otro archivo
    server.auth.strategy('jwt', 'jwt',{
      key : config.jwtSecret,
      validate: validatefn,
      verifyOptions : {
        //ignoreExpiration: true,   // the token never expire
        algorithms: ['HS256']       // specified your secure algorithm
      }
    });

    server.auth.default('jwt');  //automaticamente todas las rutas las pone como seguras para eso el auth : false en el options
*/
    
  //cargar dinamicamente los módulos de la aplicacion
  //para cada modulo debe existir un index dentro

  let modulesPath = path.join(__dirname, "modules");
  let directories  = await readDirAsync(modulesPath);
  directories.forEach((dirName, index)=>{
    let dirPath = path.join(modulesPath, dirName);
    if(fs.statSync(dirPath).isDirectory()){
      let dir= require(dirPath)
      dir(server,config);  //con esto se importa el modulo, se le pasa el server y el config la configuracion es util para pasarle parámetros como rutas por ejemplo
    }
  })


  await server.start(); //just to start the server
  console.log(`URL DE LA API: ${url}`)

}
