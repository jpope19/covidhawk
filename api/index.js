const express = require('express'),
  app = express(),
  elastic = require('../elasticsearch'),
  geolocation = require('./helpers/geolocation');

app.get('/', (req, res) => {
  res.json({ it: 'works!' });
});

app.post('/covid', (req, res, next) => {

});

app.post('/covid', 
  (req, res, next) => {
    geolocation.makeSureBodyHasLocation(req.body);
    next();
  },
  (req, res, next) => {
    elastic.postCovid(req.body).then(body => {
      res.json(body);
    }).catch(next);
  }
);

module.exports = {
   path: '/api',
   handler: app
}
