const moongose = require("mongoose")
const {initialNotes} =require ("./helpers")
const supertest = require("supertest")


const { app, server } = require("../index")
const Note = require("../models/Note")

const api = supertest(app)



// se tiene que cololar las notas pordefecto priemro 
beforeEach(async () => {
    await Note.deleteMany({})

   //sequential
   for(const note of initialNotes){
       const noteObject = new Note(note)
       await noteObject.save()
   }
})

test("notes are returned json", async () => {
    await api
        .get("/api/notes")
        .expect(200)
        .expect("Content-Type", /application\/json/)

})
test("there are two notes", async () => {
    const res = await api.get("/api/notes")

    expect(res.body).toHaveLength(initialNotes.length)

})
test("there First note is about Miguel andres", async () => {
    const res = await api.get("/api/notes")

    const contents = res.body.map(note => note.content)

    expect(contents).toContain("es la primera nota de MIguel andres")

})

// test de POST 
test("add new notes ", async () => {

    const newNote = {
        content: "nota creada de test ",
        import: true,
    }

    await api
        .post("/api/notes")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/)

        const res = await api.get("/api/notes")
        const contents = res.body.map(note=>note.content)

        expect(contents).toContain(newNote.content)
        expect(res.body).toHaveLength(initialNotes.length + 1)

})

test("new note whitout content is not added", async()=>{
    const newNote ={
        important : false
    }

    await api
    .post("/api/notes")
    .send(newNote)
    .expect(400)

    const res = await api.get("/api/notes")
    expect(res.body).toHaveLength(initialNotes.length)
})


test("Cuando una nota no existe no puede ser borrada" , async ()=>{

        await api
    .delete(`/api/notes/2443`)
    .expect(400)

    

    const res = await api.get("/api/notes")
    
    expect(res.body).toHaveLength(initialNotes.length)
   

})

afterAll(() => {
    moongose.connection.close()
    server.close()
})