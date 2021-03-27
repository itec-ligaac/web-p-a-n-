const catchAsync = require('../utils/catchAsync');
const amadeus = require('../utils/amadeus');

exports.getOffer = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const offer = await amadeus.shopping.hotelOffer(id).get();

  res.status(200).json({ status: "success", data: { offer: offer } });
});