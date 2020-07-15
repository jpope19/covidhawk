const express = require('express'),
  app = express(),
  elastic = require('../elasticsearch');

app.get('/', (req, res) => {
  res.json({ it: 'works!' });
});

app.post('/covid', (req, res, next) => {
  elastic.postCovid(req.body).then(body => {
    res.json(body);
  }).catch(next);
});

module.exports = {
   path: '/api',
   handler: app
}
