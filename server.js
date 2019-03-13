'use strict';

const express = require('express');
const compression = require('compression');
const paths = require('./config/paths');
const app = express();

app.use(compression());
app.use(express.static(paths.appBuild));


app.get('*', (req, res) => {
  res.sendFile(`${paths.appBuild}/index.html`);
});

app.listen(process.env.PORT || 8080);
