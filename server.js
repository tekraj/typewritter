const express = require('express');
const path = require('path');
const request = require('request');
const app = express();
const fs = require('fs');
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/typewriter'));

app.get('/get-settings', (req,res)=>{
    let settingDirectory = __dirname+'/settings';
    let allFiles = [];
    let settingFiles = fs.readdirSync(settingDirectory).forEach(file => {
        allFiles.push(file);
    });
    let totalFilesLength = allFiles.length;
    let randomFile =  Math.floor(Math.random() * totalFilesLength);
    let randomFileName = settingDirectory+'/'+allFiles[randomFile];
    var data = fs.readFileSync(randomFileName,'utf8');
    res.send(data);
    
});
app.get('/get-data', (req,res)=>{

    let baseUrl = 'http://mms.pphlinz.at/mms_flash_get_v15.php?';
    let query = req.query;
    let queryArray = [];
    for(let i in query){
        queryArray .push( i+'='+query[i]);
    }
    let queryString = queryArray.join('&');
    request(baseUrl+queryString, function (error, response, body) {
        res.send(body);
    });

});
app.get('/*', function(req,res) {
    console.log('test');
    res.sendFile(path.join(__dirname+'/dist/typewriter/index.html'));
});

// Start the app by listening on the default Heroku port
var port = process.env.PORT || 8000;
app.listen(port);