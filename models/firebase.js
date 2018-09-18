const db =require("./../database");
// Este es modulo que se comporta como un "orm" para firebase

module.exports= class FbCollection{

    constructor(){
        
        this.fbcollection =null 
        this.subColl=[]
    }
    setCollection(name){
        this.fbcollection=db.collection(name)
    }
    getCollection(){
        return this.fbcollection
    }
    setSubcoll(name,docId){
        let subco=this.fbcollection.doc(docId).collection(name)
        this.subColl.push({subco:subco,
                            name:name})
        return this.subColl.length-1      
    }     
    getSubcoll(index){
        return this.subColl[index]
    }

    async fetchAll(){        
           
        let respuesta= await this.getCollection().get();
        
        let resultado={};

        respuesta.forEach((doc)=>{
            resultado[doc.id]=doc.data()            
        })          
        return resultado  
    }
   
    async find(key,value){    

        let response= await this.fbcollection.where(key, "==",value).get()
        if(response._size==0){
            return false
        }
        return response[0]   
    }

    async delete(doc){

        await this.fbcollection.doc(doc.id).delete()      
     
        return `Document ${doc.id} delete `               
    }

    async set(doc,newdata){        
           
        await this.fbcollection.doc(doc.id).set(newdata)         
 
        return `Document ${doc.id} set `        
    }

    async add(data){  

        
        let r = await this.fbcollection.add(data)       
 
        return r         
    }

    async addDocToNewSubColl(docId,subCollName,data){
      let index= this.setSubcoll(subCollName,docId)
      
      r = await this.subColl[index].add(data)
      return r
       
    }
    async addDoctoSubColl(docId,subCollName,data){
        let r =await this.getCollection().doc(docId).collection(subCollName).add(data)
        return r
    }


    async update(docID,changeData){  
    
        await this.fbcollection.doc(docId).update(changeData)       

        return `Docs id:${id} succesfully update `         
    }
    
    async get(where,orderby,limit){  
        
        let result
        let collec= this.fbcollection
        if(where&&orderby&&limit)
            result=await collec.where((where.key,where.comp,where.value)).orderby(orderby.key,orderby.doa).limit(limit).get()

        if(where&&orderby&&!limit)
            result=await collec.where(where.key,where.comp,where.value).orderby(orderby.key,orderby.doa).get()

        if(where&&!orderby&&!limit)
            result=await collec.where(where.key,where.comp,where.value).get()

        if(!where&&!orderby&&!limit)
            result=await collec.get()
           

        return result         
    }
    
    
        
}
    
  