const routes = require('express').Router()
const UserController = require('./../controllers/UserController')
const authMiddleware = require('./../middlewares/auth')

// cadastrar
routes.post('/signup', UserController.signup)
// login
routes.post('/signin', UserController.signin)
// dashboard
routes.post('/dashboard', authMiddleware, UserController.dashboard)

module.exports = routes
