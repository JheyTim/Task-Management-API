const router = require('express').Router();
const {
  userLogin,
  userRegistration,
} = require('../controllers/authController');

router.post('/auth/register', userRegistration);
router.post('/auth/login', userLogin);

module.exports = router;
