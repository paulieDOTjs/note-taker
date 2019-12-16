const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

let notes = [];

app.use(express.static('public'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../../db/db.json"));
});

app.post("/api/notes", function(req, res) {
    notes 

    fs.readFile("../../../db/db.json", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
        console.log(data);
      
      });
      

    console.log(notes);





    // notes.push(newNote)
    // console.log(notes)




    // fs.writeFile(path.join(__dirname, "../../../db/db.json"), `${JSON.parse(notes)}`, function (err) {

    //     if (err) {
    //         return console.log(err);
    //     }
    
    //     console.log("Success!");
    
    // });
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});