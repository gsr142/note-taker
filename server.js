const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const noteData = require('./db/db.json')
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Visit http:// localhost:3001/api/'));

app.get((req, res) => {
    res.json(noteData)
    //console.log(noteData)
})



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);