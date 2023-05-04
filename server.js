const express = require('express');
const app = express();
const fs = require('fs')


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
    res.sendFile('./db/db.json', {root: __dirname})
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


        fs.readFile('./db/db.json', 'utf8', (err, data) =>{
            if(err){
                console.log(err)
            }else{
                baseData = JSON.parse(data)
                baseData.push(note)
                console.log(baseData)
                fs.writeFile('./db/db.json', JSON.stringify(baseData), (err) =>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log('This Worked')
                    }
                })
            }
        })


    }else{
        res.status(500).json("There was an Error")
    }
})

app.listen(PORT, () =>{
    console.log(`Site is live at http://localhost:${PORT}`)
})