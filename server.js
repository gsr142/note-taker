// Set Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
// Set express App
const app = express();
const PORT = 3001;
//const dbFilePath = path.join(__dirname, 'db', 'db.json');
const existingNotes = require('./db/db.json')
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

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

app.post('api/notes', (req, res) => {
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
            }
        });
    };
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);