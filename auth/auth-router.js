const bcryptjs = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

const Users = require('../users/user-model')
const { isValid } = require('../users/user-services')

router.post('/register', (req, res) => {
  const credentials = req.body
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcryptjs.hashSync(credentials.password, rounds)
    credentials.password = hash

    Users.add(credentials)
      .then(user => {
        const token = generateToken(user)
        res.status(201).json({ data: user, token })
      })
      .catch(error => {
        res.status(500).json(console.log(error))
      })
  } else {
    res.status(400).json({
      message: 'please provide a username and password, the password should be alphanumeric'
    })
  }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user)
          res.status(200).json({ message: 'Welcome to our API', token })
        } else {
          res.status(401).json({ message: 'Invalid credentials' })
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(400).json({
      message: 'please provide username and password and the password should be alphanumeric'
    })
  }
})

function generateToken (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }
  const options = {
    expiresIn: '2h'
  }
  return jwt.sign(payload, secrets.jwtSecrets, options)
}
module.exports = router
