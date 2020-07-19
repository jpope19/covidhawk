const usZips = require('us-zips');

/**
 * sometimes we only get passed a zipcode. make sure we have lat/lon
 * @param {Object} body
 * @param {Object} body.location
 * @param {string} body.location.zipcode
 * @param {Object} body.location.coords
 * @param {number} body.location.coords.lat
 * @param {number} body.location.coords.lon
 * @returns {Object}
 */
function makeSureBodyHasLocation(body) {
  // if we somehow got a request without a location, wtf, idk.
  if (body && body.location && body.location.coords) {
    if (body.location.zipcode && !(body.location.coords.lat || body.location.coords.lon)) {
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
  const latLon = usZips[zip] || {latitude: null, longitude: null };

  return { lat: latLon.latitude, lon: latLon.longitude };
}

module.exports.makeSureBodyHasLocation = makeSureBodyHasLocation;
module.exports.zipToLatLon = zipToLatLon;
