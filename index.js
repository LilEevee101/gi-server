var express = require("express");
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGO;
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
const transporter = nodemailer.createTransport({
    port: 587,               // true for 465, false for other ports
    host: "smtp-relay.sendinblue.com",
    secureConnection: false,
    auth: {
        user: process.env.FROM,
        pass: process.env.SMTP,
    },
        tls: {
        ciphers:'SSLv3'
    }
    // secure: true,
});
app.post("/",  urlencodedParser,(req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200); 
    //res.send('welcome, ' + req.body.contactname)
    const mailData = {
        from: process.env.FROM,  // sender address
        to: process.env.TO,   // list of receivers
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
    };
    transporter.sendMail(mailData, (error, info) =>  {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({message:"mail send", message_id:info.messageId});
    });
}); 
app.listen(3000, () => {
 console.log("Server running on port 3000");
 console.log (process.env);
});