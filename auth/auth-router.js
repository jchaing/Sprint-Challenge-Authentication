const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('./auth-model.js');
const secrets = require('../config/secrets.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Auth.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error registering user', err });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Auth.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          token: token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error logging in', err });
    });
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1h'
  };

  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

module.exports = router;
