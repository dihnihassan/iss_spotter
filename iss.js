const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    // console.log(callback);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('http://ipwho.is/' + ip, (error, response, body) => {
    // console.log("This is for response", Object.keys(response));

    // console.log("This is for body", response.toJSON());
    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);
    // console.log(data);
    if (!data.success) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(msg), null);
      return;

    }
    // console.log(data.latitude);

    const objCoords = { latitude: data.latitude, longitude: data.longitude };

    // console.log(objCoords);

    callback(null, objCoords);

  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    // console.log(body);

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const data2 = JSON.parse(body).response;
    // console.log("This is for Data", data2);
    // console.log("THIS IS THE FLYOVER TIME", data2.response);
    callback(null, data2);


  });


};


const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {

    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(data, (error, passTimes) => {
        if (error) {
          return callback(error, null);

        }
        callback(null, passTimes);

      });


    });

  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};