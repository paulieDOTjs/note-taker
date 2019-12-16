const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

let notes = [];

app.use(express.static('public'))

//Home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

//Notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

//Gets the notes from the db.json file
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../../db/db.json"));
});

//saves the information on the page to the db.json file (still working on this)
app.post("/api/notes", function(req, res) {
    jsonFile = path.join(__dirname, "../../../db/db.json");
    newNote = req;
    console.log(newNote);

    //gets the JSON file and saves it to the "notes variable"
   function getJsonFile(){
       fs.readFile(jsonFile, "utf8", function(error, response) {
           if (error) {
               console.log(error);
            }
            notes = JSON.parse(response)
            // notes.push(newNote)
            writeJsonFile();
        });
    } getJsonFile()

    //re-writes the db.json file with the notes variable
    function writeJsonFile(){
        fs.writeFile(jsonFile, JSON.stringify(notes), function(err) {

            if (err) {
              return console.log(err);
            }
          
            console.log("Success!");
          
          });
          
    }
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});