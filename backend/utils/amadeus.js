var Amadeus = require('amadeus');

var amadeus = new Amadeus({
  clientId: `${process.env.AMADEUS_API_KEY}`,
  clientSecret: `${process.env.AMADEUS_SECRET}`
});

module.exports = amadeus;