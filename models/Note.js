const mongoose = require("mongoose")




// Creamos schemma

const noteSchema = new mongoose.Schema({
    content : String ,
    date : Date ,
    important : Boolean
})

// podemos transformar los datos que nos llegan : eliminamos _id , __v , y colocamos id

noteSchema.set("toJSON",{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//creamos Modelos 

const Note = mongoose.model("Note" , noteSchema)




// cremos una nota

/*const note = new Note({
    content : "primera nota",
    date : new Date() ,
    important : true

})

note.save()
.then(result =>{
    console.log(result)
    mongoose.connection.close()
}).catch(err=>{
    console.log(err)
}) */


// buscamos una Nota

// Note.find({}).then(result=>{
//     console.log(result)
//     mongoose.connection.close()
// })









module.exports = Note