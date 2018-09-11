const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/typewriter'));

app.get('/*', function(req,res) {
    console.log('test');
    res.sendFile(path.join(__dirname+'/dist/typewriter/index.html'));
});

// Start the app by listening on the default Heroku port
var port = process.env.PORT || 8000;
app.listen(port);