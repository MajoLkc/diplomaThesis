import { encryptString } from '../utils/crypto.js';

const LOGIN_VIEW = 'login';

export function login(req, res) {
  const context = {
    pageTitle: 'Prihlásenie',
    noLogout: true,
    wrongLogin: 'none'
  };
  res.render(LOGIN_VIEW, context);
  console.log(res.statusCode);
}

export function handleLogin(req, res) {
  const data = req.body;
  console.log(data);
  if (data.name === 'Doktor' && data.password === '123') {
    res.cookie('auth', encryptString(JSON.stringify({ name: data.name, createdAt: Date.now() })), { expires: new Date(Date.now() + (60 * 60 * 8 * 1000)) });
    res.json({});
  } else {
    res.sendStatus(401);
  }
}

export function handleLogout(req, res) {
  req.logOut();
  req.cookie.destroy(function () {
    res.redirect('/login');
  });
  res.cookie.set('auth', { expires: Date.now() });
}
