//Getting the required packages
const express = require('express');
const app = express();
const fs = require('fs')
const uuid = require('./helpers/uuid')

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

const PORT = 3001;

//Paths to the different pages and api
app.get('/notes', (req, res) => {
    res.sendFile('./public/notes.html', { root: __dirname })
})

app.get('/api/notes', (req, res) => {
    res.sendFile('./db/db.json', { root: __dirname })
})

app.post('/api/notes', (req, res) => {

    console.log('Post request has been sent')

    if (req.body.title && req.body.text) {
        const { title, text } = req.body
        const note = {
            title: title,
            text: text,
            id: uuid()
        }

        res.status(201).json(note);


        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                baseData = JSON.parse(data)
                baseData.unshift(note)
                fs.writeFile('./db/db.json', JSON.stringify(baseData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('This Worked')
                    }
                })
            }
        })


    } else {
        res.status(500).json("There was an Error")
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            baseData = JSON.parse(data)
            const remove =  baseData.filter(item => item.id !== id)

            fs.writeFile('./db/db.json', JSON.stringify(remove), (err) =>{
                if(err){
                    console.log(err)
                }else{
                    res.json(remove)
                    console.log('delete worked')
                }
            })
        }
    })
})


app.listen(PORT, () => {
    console.log(`Site is live at http://localhost:${PORT}`)
})