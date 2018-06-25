const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
// const records = require('./build/records.json')

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();
const dev = app.get('env') !== 'production';

function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
      if(err) {
        callback(err);
        return;
      }
      try {
        callback(null, JSON.parse(data));
      } catch(exception) {
        callback(exception);
      }
    });
  }


if(!dev){


    console.log("Running in production");
    app.disable('x-powered-by');
    app.use(compression());
    app.use(morgan('common'));
    app.use(bodyParser.json());

    app.use(express.static(path.resolve(__dirname, 'build')));

    app.get('/get-records', (req, res) => {
        console.log("Fetching records");
        readJSONFile('./build/records.json', function (err, json) {
            if(err) { throw err; }
            res.json(json);
          });
    })

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });

    app.post('/save-records', (req, res) => {
        saveRecords(req.body, function(err) {
            if (err) {
              res.status(404).send('Records not saved');
              return;
            }
        
            console.log("Saving records");
            res.end();
        });
    });
}else{
    console.log("Running in dev");
    app.use(morgan('common'));
    app.use(bodyParser.json());

    app.use(express.static(path.resolve(__dirname, 'public')));

    app.get('/get-records', (req, res) => {
        console.log("Fetching records");
        readJSONFile('./build/records.json', function (err, json) {
            if(err) { throw err; }
            res.json(json);
          });
    })

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });

    app.post('/save-records', (req, res) => {
        saveRecords(req.body, function(err) {
            if (err) {
              res.status(404).send('Records not saved');
              return;
            }
        
            console.log("Saving records");
            res.end();
        });
    });
}

function saveRecords(data, callback) {
    fs.writeFile('./build/records.json', JSON.stringify(data, null, 2), callback);
}
  
if(dev){
    app.use(morgan('dev'));
}

const server = createServer(app);

server.listen(PORT, err => {
    if(err) throw err;

    console.log('Server started!');
});