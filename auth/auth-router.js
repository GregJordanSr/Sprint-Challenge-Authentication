const Users = require('./authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../config/secret');

const router = require('express').Router();


router.post('/register', (req, res) => {
    let user = req.body;
    const hash =  bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.addUsers(user)
        .then(addedUser => {
            res.status(201).json(addedUser);
        })
        .catch(err => {
            res.status(500).json({message: "You can't pass!!!!"});
        })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    Users.findByUser({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = getToken(user);
                res.status(200).json({message: `Welcome ${user.username }!!!`, token});
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            };
        }).catch(err => {
            res.status(500).json({ message: 'Error with server'});
        })
});

function getToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        jwtid: user.id
    };
    const options = {
        expiresIn: '3h',
    };
    return jwt.sign(payload, secret.secret, options);
}

module.exports = router;
