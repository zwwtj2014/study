const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.listen(3000, () => {
  console.log('Server Starting... at port 3000');
});
