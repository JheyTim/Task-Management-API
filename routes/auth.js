const router = require('express').Router();
const { check } = require('express-validator');
const {
  userLogin,
  userRegistration,
  refreshToken,
} = require('../controllers/authController');
const { loginLimiter } = require('../utils/rateLimiter');

router.post(
  '/auth/register',
  [
    check('password', 'Password must be at least 8 characters long').isLength({
      min: 8,
    }),
    check('email', 'Invalid email').isEmail(),
  ],
  userRegistration
);
router.post('/auth/login', loginLimiter, userLogin);

router.post('/auth/refresh', refreshToken);

module.exports = router;
