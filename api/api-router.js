const router = require('express').Router()
const authRouter = require('../auth/auth-router')
const userRouter = require('../users/user-router')
const restricted = require('../auth/restricted')

router.use('/auth', authRouter)
router.use('/users', restricted, userRouter)

module.exports = router