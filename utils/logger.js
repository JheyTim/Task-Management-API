const winston = require('winston');

exports.logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'logs/security.log' })],
});
