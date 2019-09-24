const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/project-pdsa'));


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/project-pdsa/index.html'));
  });

  app.listen(process.env.PORT || 3000);
