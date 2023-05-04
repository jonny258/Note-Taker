const express = require('express');
const app = express();

const noteData = require('./db/db.json')

const PORT = 3001;

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

app.listen(PORT, () =>{
    console.log(`Site is live at http://localhost:${PORT}`)
})