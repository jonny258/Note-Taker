//Getting the required packages
const express = require('express');
const app = express();
const fs = require('fs')
const uuid = require('./helpers/uuid')

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

const PORT = process.env.PORT || 3001;

//Paths to the different pages and api
app.get('/notes', (req, res) => {
    res.sendFile('./public/notes.html', { root: __dirname })
})

app.get('/api/notes', (req, res) => {
    res.sendFile('./db/db.json', { root: __dirname }) // the database gets sent to a URL so that fetch requests can work with it on the fornt end
})

//
app.post('/api/notes', (req, res) => {

    console.log('Post request has been sent')

    if (req.body.title && req.body.text) {  //Validation to check if the 2 required fields are filled out 
        const { title, text } = req.body
        const note = {
            title: title,
            text: text,
            id: uuid()
        }

        res.status(201).json(note);


        fs.readFile('./db/db.json', 'utf8', (err, data) => { //on every post request the data base is read 
            if (err) {
                console.log(err)
            } else {
                baseData = JSON.parse(data) //turn in to a javascript array
                baseData.unshift(note) //Adding the new note to the top of that array
                fs.writeFile('./db/db.json', JSON.stringify(baseData), (err) => { //rewiting the database with the new array that includes the note at the top
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

app.delete('/api/notes/:id', (req, res) => { //Gets called every time that the delete button on a note is pressed, the paramiter is the id of that note
    const id = req.params.id; //save the paramiter in a variable
    fs.readFile('./db/db.json', 'utf8', (err, data) => { //read the data base
        if (err) {
            console.log(err)
        } else {
            baseData = JSON.parse(data) //turn in to a java script array
            const remove =  baseData.filter(item => item.id !== id) //filters through that array and returns all the values that do not have equal ids

            fs.writeFile('./db/db.json', JSON.stringify(remove), (err) =>{ //rewrites the database with the new file that has the removed item
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


app.listen(PORT, () => { //creates a port to listen to 
    console.log(`Site is live at http://localhost:${PORT}`) //Gives you a way to click on the port
})