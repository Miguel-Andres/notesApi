const { response } = require("express")
const notas = require("../../datos/datos.json")





const apiController ={

    allNotes : (req,res)=>{
      res.json(notas)
    },

    create : (req,res) =>{
        res.send("creada")
    },

    findNotes: (req,res)=>{
        const id= Number(req.params.id)
        
       let note = notas.find(nota=> nota.id == id ) 
        
      note? res.json(note).status(200) : res.status(404).end()
    } ,

    delete : (req,res)=>{
        const id= Number(req.params.id)
        notas.filter(nota=>nota.id === id)

        res.status(204).end()
    }


}

module.exports = apiController