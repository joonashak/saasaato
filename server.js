
const express = require('express');
const path = require('path');

const app = express();

// Force HTTPS
app.use(function(req, res, next) {
  var fwdProto = req.get('X-Forwarded-Proto');
  var fwdPort = req.get('X-Forwarded-Port');

  if (fwdProto != 'https' && fwdPort != '443' && req.hostname != 'localhost') {
    res.redirect('https://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static(__dirname + '/dist'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8080);
