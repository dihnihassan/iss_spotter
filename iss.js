const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // console.log(callback);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IPD: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};


module.exports = { fetchMyIP };