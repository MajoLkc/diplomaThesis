import express from 'express';
import * as basic from './basic.js';
import * as apiData from './apiData.js';
import { login, handleLogin } from './login.js';

const router = express.Router();

router.get('/ping', (req, res) => res.json({ message: 'pong' }));

// Basic rendering ----------------------------
router.get('/login', login);
router.post('/login', handleLogin);
router.get('/home', basic.home);
router.get('/homeWithPartials', basic.homeWithPartials);
//---------------------------------------------

// Rendering data from API --------------------
router.get('/users/:username/repos', apiData.repos);
//---------------------------------------------

export default router;
