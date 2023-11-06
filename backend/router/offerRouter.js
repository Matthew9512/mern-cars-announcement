const express = require('express');
const router = express.Router();
const offers = require('../controllers/offersController');
const verifyJwt = require('../middleware/verifyJwt');

router.post('/new-offer', verifyJwt, offers.addNewOffer);
router.get('/features', offers.getFeaturesOffer);
router.get('/:id', offers.getOffer);

module.exports = router;
