const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./dist/'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index/index.html'));
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});