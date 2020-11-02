import { encryptString } from '../utils/crypto.js';

const LOGIN_VIEW = 'login';

export function login(req, res) {
  const context = {
    pageTitle: 'Prihlásenie',
    noLogout: true
  };
  res.render(LOGIN_VIEW, context);
}

export function handleLogin(req, res) {
  const data = req.body;
  if (data.name === 'Doktor' && data.password === '123') {
    res.cookie('auth', encryptString(JSON.stringify({ name: data.name, createdAt: Date.now() })), { expires: new Date(Date.now() + (60 * 60 * 8 * 1000)) });
    res.json({});
  } else {
    res.sendStatus(401);
  }
}

export function handleLogout(req, res) {
  res.cookie('auth', '', { maxAge: 0 });
  res.redirect(302, '/login');
}
