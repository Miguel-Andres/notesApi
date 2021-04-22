const mongoose = require("mongoose")


const Note = require("../../models/Note")


const apiController = {

        allNotes: async (req, res) => {
             
       try{
           const result =   await Note.find({})
             res.json(result)

       }catch (error){
           console.log(error)
       }
    },

    create:async (req, res) => {
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
       
        try {
            const savedNewNote = await   newNote.save({})
              res.status(201).json(savedNewNote)
        } catch (error) {
            console.log(err)
        }
          
              
           
     

       
    },

    findNotes: async (req, res, next) => {
       

        // Aca explican como es el correcto manejo de errores https://fullstackopen.com/es/part3/guardando_datos_en_mongo_db
        const id = req.params.id

       Note.findById(id)
       .then(result=>{
            //si va 404 no existe el id pero si es el formato 
         result ?res.json(result).status(200) : res.status(404).end()            
         
        }).catch(error=>{
            console.log(error)
            res.status(400).send({error: 'malformatted id' })
        })

    },

    delete: (req, res) => {
        const {id} = req.params
        Note.findByIdAndDelete(id).then((result)=>{
          result? res.status(204).end() : res.status(404).end()
        }).catch(err=>{
            console.log(err)
            res.status(400).send({error: 'malformatted id' })
        })

        
    } ,

    update : (req,res)=>{
        const {id} = req.params
        const note = req.body

        const newNoteInfo ={
            content : note.content ,
            important : note.important
        }
            // {new : true } para que nos muestre los datos actualizados , 
        Note.findByIdAndUpdate(id,newNoteInfo ,{new :true})
        .then(result =>{
            res.json(result)
        })

    }
}

module.exports = apiController