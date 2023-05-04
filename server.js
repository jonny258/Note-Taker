const express = require('express');
const app = express();
const fs = require('fs')
const noteData = require('./db/db.json')

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) =>{
    console.log("you are on root")
});

app.get('/notes', (req, res) =>{
    res.sendFile('./public/notes.html', {root: __dirname})
})

app.get('/api/notes', (req, res) => {
    res.json(noteData)
})

app.post('/api/notes', (req, res) =>{

    console.log('Post request has been sent')

    if(req.body.title && req.body.text ){
        const { title, text} = req.body
        const note = {
            title: title,
            text: text
        }

        res.status(201).json(note);


        fs.writeFile('./db/db.json', JSON.stringify(note), (err) =>{
            if(err){
                console.log(err)
            }else{
                console.log('this worked')
            }
        })


    }else{
        res.status(500).json("There was an Error")
    }
})

app.listen(PORT, () =>{
    console.log(`Site is live at http://localhost:${PORT}`)
})