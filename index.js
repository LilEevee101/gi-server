var express = require("express");
var fs = require('fs');
var app = express();
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});
app.get('/api/characters', (req, res) => {
    fs.readFile('characters.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});
app.get('/api/weapons', (req, res) => {
    fs.readFile('weapons.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});
app.get('/api/elements', (req, res) => {
    fs.readFile('elements.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});
app.get('/api/builds', (req, res) => {
    fs.readFile('builds.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});
app.get('/api/artifacts', (req, res) => {
    fs.readFile('artifacts.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});
app.listen(3000, () => {
 console.log("Server running on port 3000");
});