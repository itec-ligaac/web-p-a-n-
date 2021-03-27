const { Router } = require('express');
const hotelController = require('../controllers/hotelController');
const router = new Router();

router.route('/').get(hotelController.getHotels);

router.route('/:id').get(hotelController.getHotel);

module.exports = router;