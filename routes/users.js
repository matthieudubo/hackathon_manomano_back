const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', (req, res) => {
  const { language } = req.query;
  User.findMany({ filters: { language } })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving users from database');
    });
});

usersRouter.get('/:id', (req, res) => {
  User.findOne(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((err) => {
      res.status(500).send('Error retrieving user from database');
  });
});

usersRouter.post('/', (req, res) => {
  const { email } = req.body;
  let validationErrors = null;
  User.findEmail(email)
    .then((email) => {
      if (email) return Promise.reject('DUPLICATE_EMAIL');
      validationErrors = User.validate(req.body);
      if (validationErrors) return Promise.reject('INVALID_DATA');
      return User.create(req.body);
    })
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      console.error(err);
      if (err === 'DUPLICATE_EMAIL')
        res.status(409).json({ message: 'This email is already used' });
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors });
      else res.status(500).send('Error saving the user');
    });
});

usersRouter.put('/:id', (req, res) => {
  let existingUser = null;
  let validationErrors = null;
  Promise.all([
    User.findOne(req.params.id),
    User.findEmail(req.body.email, req.params.id)
  ])
  .then(([user, OtherUserWithEmail]) => {
    existingUser = user;
    if (!existingUser) return Promise.reject('RECORD_NOT_FOUND');
    if (OtherUserWithEmail) return Promise.reject('DUPLICATE_EMAIL');
    validationErrors = User.validate(req.body);
    if (validationErrors) return Promise.reject('INVALID_DATA');
    return User.update(req.params.id, req.body);
  })
  .then(() => {
    res.status(200).json({ ...existingUser, ...req.body });
  })
  .catch((err) => {
    console.error(err);
    if (err === "RECORD_NOT_FOUND")
      res.status(404).send(`User with id ${userId} not found.`);
    if (err === "DUPLICATE_EMAIL")
      res.status(409).json({ message: "This email is already used" });
    else if (err === "INVALID_DATA")
      res.status(422).json({ validationErrors });
    else res.status(500).send("Error updating an user");
  });
});

usersRouter.delete('/:id', (req, res) => {
  User.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send('🎉 User deleted!');
      else res.status(404).send('User not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting an user');
    });
});

module.exports = usersRouter;