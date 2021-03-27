const { Router } = require('express');
const offerController = require('../controllers/offerController');
const router = new Router();

router.route('/:id').get(offerController.getOffer);

module.exports = router;