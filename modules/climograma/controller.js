const EstacionClimatica=require("./../../models/index.js")

const fetchAll = async (request, reply)=>{
      
        try {
            let dia = new EstacionClimatica
            
           
        } catch (err) {
            return err//Boom.badRequest(err.sqlMessage);
        }       
    
}

   

module.exports={"fetchAll":fetchAll, "findDate":findDate,"filtrar":filtrar,"agregar":agregar,"eliminar":eliminar, "editar":editar}
