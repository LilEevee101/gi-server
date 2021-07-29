var express = require("express");
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://genshinapp:ApfeFqtS@genshincluster.nbsqi.mongodb.net/GenshinDB?retryWrites=true&w=majority";
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
        let characters = db.collection('characters').find().toArray()
        .then(results => {
          res.json(results);
        })
        .catch(error => console.error(error))
    })
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
app.listen(3000, () => {
 console.log("Server running on port 3000");
});