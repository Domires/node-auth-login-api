const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

let users = []

async function signup(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = { email: req.body.email, password: hashedPassword }
        users.push(newUser)
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ server_error: err })
    }
}

async function signin(req, res) {
    const user = users.find(user => user.email === req.body.email)
    await bcrypt.compare(req.body.password, user.password, (err, bool) => {
        if(bool) {
            console.log('success bcrypt password compare')
        }
        if(!bool || err) return res.status(500).send('error, not sucess bcrypt password compare')
    })
    const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '30s' })
    res.header('auth-token', token).status(200).json({ token: token })
}

function dashboard(req, res) {
    console.log(req.user)
    res.status(200).json(`Logado: ${req.user.email}`)
}

module.exports = {
    signup,
    signin,
    dashboard
}