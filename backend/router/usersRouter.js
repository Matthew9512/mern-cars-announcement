const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController');
const verifyJwt = require('../middleware/verifyJwt');
const refreshJwt = require('../utils/refreshJwt');

router.post('/register', users.register);
router.post('/login', users.login);
router.post('/refresh', refreshJwt);
router.get('/seller/:id', users.getSellerInfo);
router.get('/:id', verifyJwt, users.getUser);
router.delete('/delete/:id', verifyJwt, users.deleteAcc);
router.patch('/update-user/:id', verifyJwt, users.updateUserInfo);
router.get('/logout/:id', verifyJwt, users.logout);
router.post('/remove-offer', verifyJwt, users.removeOffer);
router.post('/deactivate-offer', verifyJwt, users.deactivateOffer);
router.post('/activate-offer', verifyJwt, users.activateOffer);

module.exports = router;
