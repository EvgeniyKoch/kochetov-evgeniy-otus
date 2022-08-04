import jwt from 'jsonwebtoken';

import config from '../config.js';

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, config.secret, {expiresIn: "24h"});
};

export default generateAccessToken;
