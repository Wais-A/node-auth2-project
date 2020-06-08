const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      jwt.verify(token, secrets.jwtSecrets, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ you: "can't touch this" })
        } else {
          req.decodedJwt = decodedToken
          next()
        }
      })
    } else {
      throw new Error('invalid auth data')
    }
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}
