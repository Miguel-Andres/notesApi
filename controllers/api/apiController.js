const notas = require("../../datos/datos.json")


const apiController = {

        allNotes: (req, res) => {
        res.json(notas)
    },

    create: (req, res) => {
        const datoform = req.body

        //validamos si hay datos 
        if(!notas || !datoform.content){
            return res.status(400).json({
                error :" No hay dato"
            })
        }


        const ids = notas.map(nota=>nota.id)
        // podemos usar uuid para las ids
        const maxId = Math.max(...ids)
        
        
        const newNote={  
           
            id  :   maxId + 1 ,
            content: datoform.content ,
            important :typeof datoform.important !== "undefined" ? datoform.important : false ,
            date : new Date().toISOString()
        }
       
    
     

        res.status(201).json([newNote] )
    },

    findNotes: (req, res) => {
        const id = Number(req.params.id)

        let note = notas.find(nota => nota.id == id)

        note ? res.json(note).status(200) : res.status(404).end()
    },

    delete: (req, res) => {
        const id = Number(req.params.id)
        notas.filter(nota => nota.id !== id)

        res.status(204).end()
    }


}

module.exports = apiController