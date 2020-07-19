'use strict';

const axios = require('axios'),
  qs = require('querystring'),
  API_URL = 'https://www.google.com/recaptcha/api/siteverify',
  API_KEY = process.env.RECAPTCHA_SECRET;

function confirmToken(token) {
  return axios.post(API_URL, qs.stringify({
    secret: API_KEY,
    response: token,
  }),{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    return res && res.data && res.data.success;
  }).catch(e => {
    console.log(e);
    return false;
  });  
}

module.exports.confirmToken = confirmToken;
