const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const { validationResult } = require('express-validator');
const { User } = require('../models');
const { generateTokens } = require('../utils/generateTokens');
const { logger } = require('../utils/logger');

// User registration route
exports.userRegistration = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login route
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshToken = refreshToken;

    await user.save();

    logger.info(`Login successful for user: ${user.email}`);

    res
      .status(200)
      .json({ message: 'Login successful', token: accessToken, refreshToken });
  } catch (error) {
    logger.error(`Failed login attempt for email: ${req.body.email}`);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: 'Invalid refresh token.' });
    }

    const { accessToken } = generateTokens(user);

    logger.info(`User successful for refreshToken: ${user.email}`);

    res.json({ token: accessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

exports.setup2fa = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({ length: 20 });
    const user = await User.findByPk(req.user.id);

    user.twoFactorSecret = secret.base32;

    await user.save();
    res.json({ secret: secret.otpauth_url }); // For user to scan
  } catch (error) {
    res.status(500).json({ error: 'Setup 2FA failed.' });
  }
};

exports.verify2fa = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    const isVerified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
    });

    if (!isVerified) {
      return res.status(400).json({ error: 'Invalid 2FA token' });
    }
    return res.status(200).json({ message: '2FA verified' });
  } catch (error) {
    res.status(500).json({ error: 'Verify 2FA failed.' });
  }
};
