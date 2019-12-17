const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 3000;

let notes = [];

//Lets express start working
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

//Home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Gets the notes from the db.json file
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//saves the information on the page to the db.json file (still working on this)
app.post("/api/notes", function (req, res) {
    jsonFile = path.join(__dirname, "/db/db.json");
    newNote = req.body;

    //gets the JSON file and saves it to the "notes variable"
    function getJsonFile() {
        fs.readFile(jsonFile, "utf8", function (error, response) {
            if (error) {
                console.log(error);
            }
            notes = JSON.parse(response)
            writeJsonFile();
        });
    } getJsonFile()

    //re-writes the db.json file with the notes variable
    function writeJsonFile() {
        notes.push(newNote)
        for (let i = 0; i < notes.length; i++) {
            note = notes[i]
            note.id = i + 1
        }
        fs.writeFile(jsonFile, JSON.stringify(notes), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("ADDED NEW NOTE!");
        });

    }
    res.sendFile(path.join(__dirname, "/db/db.json"));

});

//Deletes a note when that note is clicked on
app.delete("/api/notes/:id", function (req, res) {

    id = (req.params.id)

    jsonFile = path.join(__dirname, "/db/db.json");
    function getJsonFile() {
        fs.readFile(jsonFile, "utf8", function (error, response) {
            if (error) {
                console.log(error);
            }
            notes = JSON.parse(response)
            deleteJsonFile();
        });
    } getJsonFile()

    function deleteJsonFile() {
        notes.splice(id - 1, 1);
        writeFile();
    }

    //Rewrites file with note now deleted.
    function writeFile() {
        for (let i = 0; i < notes.length; i++) {
            note = notes[i]
            note.id = i + 1
        }
        fs.writeFile(jsonFile, JSON.stringify(notes), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("REWRITING FILE");
        });
    }
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});