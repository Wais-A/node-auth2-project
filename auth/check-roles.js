function CheckRole (role) {
  return function (req, res, next) {
    if (req.decodedJwt.role && req.decodedJwt.role === role) {
      next()
    } else {
      res.status(403).json({ you: 'do not have proper permission' })
    }
  }
}

module.exports = CheckRole
