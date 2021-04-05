const mongoose = require("mongoose")


const Note = require("../../models/Note")


const apiController = {

        allNotes: (req, res) => {
        Note.find({})
        .then(result=>{

             res.json(result)
           

        }).catch(err=>{
            console.log(err)
        })
    },

    create: (req, res) => {
        const datoform = req.body

        //validamos si hay datos 
        if(!datoform.content){
            return res.status(400).json({
                error :" No hay dato"
            })
        } 
        
        const newNote= new Note({             
            content: datoform.content ,
            important :typeof datoform.important !== "undefined" ? datoform.important : false ,
            date : new Date().toISOString()
        })
       
            newNote.save({})
            .then(result=>{
                 res.status(201).json(result)
            }).catch(err=>{
                console.log(err)
            })
     

       
    },

    findNotes: (req, res, next) => {
       

        // Aca explican como es el correcto manejo de errores https://fullstackopen.com/es/part3/guardando_datos_en_mongo_db
        const id = req.params.id

       Note.findById(id)
       .then(result=>{
         if( result) {
             res.json(result).status(200) 
         } else{
             res.status(404).end()
         } 
        }).catch(error=>{
            console.log(error)
            res.status(400).send({error: 'malformatted id' })
        })

    },

    delete: (req, res) => {
        const id = Number(req.params.id)
        Note.filter(nota => nota.id !== id)

        res.status(204).end()
    }


}

module.exports = apiController