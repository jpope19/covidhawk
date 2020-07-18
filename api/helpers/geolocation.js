const usZips = require('us-zips');

/**
 * 
 * @param {Object} body
 * @param {Object} body.location
 * @param {string} body.location.zipcode
 * @param {Object} body.location.coords
 * @param {number} body.location.coords.latitude
 * @param {number} body.location.coords.longitude
 * @returns {Object}
 */
function makeSureBodyHasLocation(body) {
  // if we somehow got a request without a location, wtf, idk.
  if (body && body.location && body.location.coords) {
    if (body.location.zipcode && !(body.location.coords.latitude || body.location.coords.longitude)) {
      body.location.coords = zipToLatLon(body.location.zipcode);
    }
  }

  return body;
}

/**
 * TODO: move to use Google Geocoding API if we don't get good results
 * @param {string} zip
 * @returns {Object}
 */
function zipToLatLon(zip) {
  return usZips[zip] || { latitude: null, longitude: null };
}

module.exports.makeSureBodyHasLocation = makeSureBodyHasLocation;
module.exports.zipToLatLon = zipToLatLon;
