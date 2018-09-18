let FbCollection = require("./firebase.js") ;

module.exports= class EstacionClimatica extends FbCollection {
    constructor(){// CONSTRUCTOR   
        super()
        this.setCollection("estacionclimatica")//buenas practicas para colleciones???
        this.key="id"
    }
    async agregarEstacion(estacion){

       let response =  await this.add(estacion)
       
       return response
    }
    agregarAño(estacionId,año){

       let response = this.setSubcoll(estacionId,año)       
        
        return response 
     }
     async agregarlectura(estacionId,año,data){

       let response = await this.addDoctoSubColl(estacionId,año,data)
       
       
        
        return `Lectura añadida en el documento con identificador :${response.id}`
     }
    
}
   
    
  