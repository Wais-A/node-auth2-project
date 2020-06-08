const router = require('express').Router()

const Users = require('./user-model')
const restricted = require('../auth/restricted')

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.send(err))
})

module.exports = router
