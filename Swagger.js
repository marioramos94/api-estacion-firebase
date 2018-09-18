const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require('hapi-swagger');


module.exports={
  documentationPath: '/doc',
  basePath : '/api/',
  info: {
          title: 'API',
          description: "API para el calculo del Confort Climatico",
          version: "1.0.0",
          contact :{
            name: 'Mario Sergio Ramos',
            email: 'mariosergio@gmail.com'
          }
  },
 /* securityDefinitions: {
    'jwt': {
      'type': 'apiKey',
      'name': 'Authorization',
      'in': 'header'
    }
  },*/
  grouping: 'tags',
  sortEndpoints: 'ordered'
}



//esto permite que en la GUI de swager aparezca la opción del token