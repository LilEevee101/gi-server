var express = require("express");
var bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://vercel:NowbyFR5zToFLgtL@genshincluster.nbsqi.mongodb.net/GenshinDB?retryWrites=true&w=majority";
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
    // fs.readFile('characters.json', (err, json) => {
    //     let obj = JSON.parse(json);
    //     res.json(obj);
    // });
    MongoClient.connect (uri, (err, client) => {
        if (err) return console.error(err);
        let db = client.db("genshinartifacts");
        let characters = db.collection('characters').find().sort( { "name": 1} ).toArray()
        .then(results => {
          res.json(results);
        })
        .catch(error => console.error(error))
    })
});
app.get('/api/weapons', (req, res) => {
    let weapons = [
        "Sword",
        "Claymore",
        "Catalyst",
        "Bow",
        "Polearm"
    ];
    res.json (weapons);
    // fs.readFile('weapons.json', (err, json) => {
    //     let obj = JSON.parse(json);
    //     res.json(obj);
    // });
});
app.get('/api/elements', (req, res) => {
    let elements = [
        "Anemo",
        "Cryo",
        "Hydro",
        "Pyro",
        "Electro",
        "Geo",
        "Dendro"
    ];
    res.json (elements);
    // fs.readFile('elements.json', (err, json) => {
    //     let obj = JSON.parse(json);
    //     res.json(obj);
    // });
});
app.get('/api/builds', (req, res) => {
    let builds = [
        "Main DPS (Elemental)",
        "Main DPS (Physical)",
        "Sub/Burst DPS",
        "Support (Heal)",
        "Support (Buff)",
        "Support (Shield)"
    ];
    res.json (builds);
    // fs.readFile('builds.json', (err, json) => {
    //     let obj = JSON.parse(json);
    //     res.json(obj);
    // });
});
app.get('/api/artifacts', (req, res) => {
    // fs.readFile('artifacts.json', (err, json) => {
    //     let obj = JSON.parse(json);
    //     res.json(obj);
    // });
    MongoClient.connect (uri, (err, client) => {
        if (err) return console.error(err);
        let db = client.db("genshinartifacts");
        let artifacts = db.collection('artifacts').find().toArray()
        .then(results => {
          res.json(results);
        })
        .catch(error => console.error(error))
    })
});
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post("/",  urlencodedParser,(req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200); 
    //res.send('welcome, ' + req.body.contactname)
});
app.listen(3000, () => {
 console.log("Server running on port 3000");
});