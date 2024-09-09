//Este middleware manejará la generación del token y verificación.
const jwt = require('jsonwebtoken');
const secret = require('../crypto/config').hashedSecret;



module.exports = verifyToken;
