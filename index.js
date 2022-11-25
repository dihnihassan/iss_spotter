// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);

// });


// fetchCoordsByIP("184.147.46.231", (error, data) => {
//   console.log(error, data)});
// const myCoords = { latitude: '43.9109352', longitude: '-78.7884468' };
// const myCallback = (error, data) => {
//   console.log(error, data);
// };


// fetchISSFlyOverTimes(myCoords, myCallback);
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconsd!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // console.log(passTimes);

  printPassTimes(passTimes);
});


// nextISSTimesForMyLocation();