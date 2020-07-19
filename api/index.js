const express = require('express'),
  app = express(),
  elastic = require('../elasticsearch'),
  geolocation = require('./helpers/geolocation'),
  recaptcha = require('./helpers/recaptcha');

app.get('/', (req, res) => {
  res.json({ it: 'works!' });
});

app.post('/covid',
  (req, res, next) => {
    recaptcha.confirmToken(req.body.recaptcha).then(bool => {
      if (bool) return next();
      else res.status(500).send('Trouble validating reCAPTCHA');
    });
  },
  (req, res, next) => {
    if (geolocation.makeSureBodyHasLocation(req.body.covid)) next();
    else res.status(500).send('Trouble validating location');
  },
  (req, res, next) => {
    elastic.postCovid(req.body.covid).then(body => {
      res.json(body);
    }).catch(e => {
      console.log(e);
      res.status(500).send('Trouble posting to Elasticsearch');
    });
  }
);

module.exports = {
   path: '/api',
   handler: app
}
