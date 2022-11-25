// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);

// });


// fetchCoordsByIP("184.147.46.231", (error, data) => {
//   console.log(error, data)});
const myCoords = { latitude: '43.9109352', longitude: '-78.7884468' };
const myCallback = (error, data) => {
  console.log(error, data);
};


fetchISSFlyOverTimes(myCoords, myCallback);

