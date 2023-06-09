const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const home = require('./modules/home')
const todos = require('./modules/todo')
const users = require('./modules/user')

router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/', authenticator, home)


module.exports = router