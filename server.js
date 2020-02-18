const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

let db;
let port = 3000;
const app = express();

app.set('view engine', 'ejs');

MongoClient.connect('mongodb://add:pass@ds059722.mlab.com:59722/tutorialdb', (err,database) => {
    // start the server
    if(err) {
        return console.log(err);
    }
    db = database;
    app.listen(port, () => {
        console.log('listening on ' + port);
    });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    /* Static html file sending
  res.sendFile(__dirname + '/index.html')
  let cursor = db.collection('quotes').find().toArray((err, results) => {
      console.log(results);
  })*/
  db.collection('scores').find().sort({score: -1}).toArray((err, result) => {
      if (err) {
          return console.log(err);
      }
      // render the index.ejs
      res.render('game.ejs', {scores: result})
  })
})


app.get('/mfst', (req, res) => {
    /* Static html file sending
  res.sendFile(__dirname + '/index.html')
  let cursor = db.collection('quotes').find().toArray((err, results) => {
      console.log(results);
  })*/
  db.collection('scores').find().sort({score: -1}).toArray((err, result) => {
      if (err) {
          return console.log(err);
      }
      // render the index.ejs
      res.render('game.ejs', {scores: result})
  })
})

app.get('/minesweeper', (req, res) => {
    // Static html file sending
  res.sendFile(__dirname + '/public/Minesweeper/minesweeper.html');

})


app.post('/scores', (req, res) => {
    db.collection('scores').save(req.body, (err, result) => {
        if(err) {
            return console.log(err);
        }
        console.log('saved to database');
        res.redirect('/');
    })
  console.log(req.body)
})

app.put('/scores', (req, res) => {
  db.collection('scores').findOneAndUpdate({name: 'asd087vi234'}, {
    $set: {
      name: req.body.name,
      score: req.body.score
    }
  }, {
    sort: {_id: -1},
    upsert: true
  },
  (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/scores', (req, res) => {
  db.collection('scores').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: ''})
  })
})
