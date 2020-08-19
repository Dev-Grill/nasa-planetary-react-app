var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

const path = require('path');
// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

