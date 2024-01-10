import express from 'express';
import bcrypt from 'bcryptjs';
import moment from 'moment';

import auth from '../middlewares/auth.mdw.js';
import userModel from '../models/user.model.js';

const router = express.Router();

router.get('/register', async function (req, res) {
  res.render('vwAccount/register');
});

router.post('/register', async function (req, res) {
  const rawPassword = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(rawPassword, salt);

  const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

  const user = {
    username: req.body.username,
    password: hash,
    dob: dob,
    name: req.body.name,
    email: req.body.email,
    permission:'ADMIN'
  }

  await userModel.add(user);
  res.render('vwAccount/register');
});

router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.findByUsername(username);
  if (user === null) {
    return res.json(true);
  }

  res.json(false);
});

router.get('/login', async function (req, res) {
  res.render('vwAccount/login', {
    layout: false
  });
});

router.post('/login', async function (req, res) {
  const user = await userModel.findByUsername(req.body.username);
  if (user === null) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid username or password.'
    });
  }

  const ret = bcrypt.compareSync(req.body.password, user.password);
  if (ret === false) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid username or password.'
    });
  }

  delete user.password;

  req.session.auth = true;
  req.session.authUser = user;


  const url = req.session.retUrl || '/';
  res.redirect(url);
});

router.post('/logout', async function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;
  req.session.cart = [];

  const url = req.headers.referer || '/';
  res.redirect(url);
});


router.get('/profile', auth, async function (req, res) {
  res.render('vwAccount/profile');
});

export default router;
