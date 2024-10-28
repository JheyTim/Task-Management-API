const router = require('express').Router();
const { check } = require('express-validator');
const {
  userLogin,
  userRegistration,
  refreshToken,
  setup2fa,
  verify2fa,
} = require('../controllers/authController');
const { loginLimiter } = require('../utils/rateLimiter');
const authenticateJWT = require('../middleware/authMiddleware');

router.post(
  '/auth/register',
  [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  userRegistration
);
router.post('/auth/login', loginLimiter, userLogin);

router.post('/auth/refresh', refreshToken);

router.post('/auth/setup-2fa', authenticateJWT, setup2fa);

router.post('/auth/verify-2fa', authenticateJWT, verify2fa);

module.exports = router;
