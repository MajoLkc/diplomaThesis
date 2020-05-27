import unless from 'express-unless';

import { HTTP_CODES } from '../config/config.js';

import { decryptString } from '../utils/crypto.js';

const LOGIN_VIEW = 'login';
const { HTTP_INVALID_COOKIE, HTTP_NOT_AUTHORIZED } = HTTP_CODES;

function validateCookie(cookie, req) {
  if (!cookie) return false;

  try {
    const decryptedCookie = JSON.parse(decryptString(cookie));
    // console.log(decryptedCookie);
    if (decryptedCookie.name === 'Doktor') {
      req.user = decryptedCookie;
      return true;
    }
    return false;
  } catch (e) {
    // console.log(e);
    return false;
  }
}

function middleware(req, res, next) {
  const cookie = req.cookies.auth;
  if (!cookie) {
    res.redirect(302, '/login');
    return;
  }

  try {
    // Authorize the user to see if s/he can access our resources
    if (!validateCookie(cookie, req)) {
      res.redirect(302, '/login');
      return;
    }

    next(); // To move to next middleware
  } catch (err) {
    next(err); // To move to next error middleware
  }
}

middleware.unless = unless;

export default middleware;
