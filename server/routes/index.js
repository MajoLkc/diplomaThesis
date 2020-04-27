import express from 'express';
import * as basic from './basic.js';
import * as apiData from './apiData.js';
import { login, handleLogin } from './auth.js';
import { menu, newPatient, patientList, formSelection, childrenSleepingQuestionnaire } from './menu.js';

const router = express.Router();

router.get('/ping', (req, res) => res.json({ message: 'pong' }));

// Basic rendering ----------------------------
router.get('/login', login);
router.post('/login', handleLogin);
router.get('/menu', menu);
router.get('/registracia_pacienta', newPatient);
router.get('/zoznam_pacientov', patientList);
router.get('/vyber_dotaznika', formSelection);
router.get('/vyber_dotaznika/detsky_spankovy_dotaznik', childrenSleepingQuestionnaire);
//---------------------------------------------

// Rendering data from API --------------------
router.get('/users/:username/repos', apiData.repos);
//---------------------------------------------

export default router;
