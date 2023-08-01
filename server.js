// Set Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
// Set express App
const app = express();
const PORT = process.env.PORT || 3001;

const existingNotes = require('./db/db.json')
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// these requests come from the address bar
// localhost:3001/
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


// localhost:3001/notes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    );


// these requests come from fetches
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedNotes = JSON.parse(data);

            res.status(200).json(parsedNotes);
        }
    });
    
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text){
        const newNote = {
            title,
            text
        };
        // access existing notes
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            } else{
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);
                existingNotes.push(newNote)
                //Write updated notes back to the file
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Notes have been updated')
                );
                res.status(200).json("Success")
            }
        });
    };
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);