import express from 'express';
import * as apiData from './apiData.js';
import { login, handleLogin } from './auth.js';
import { menu, patientList, formSelection, childrenSleepingQuestionnaire } from './menu.js';
import { newPatient, handleCreatePatient } from './patient.js';

const router = express.Router();

router.get('/ping', (req, res) => res.json({ message: 'pong' }));

// Basic rendering ----------------------------
router.get('/login', login);
router.post('/login', handleLogin);
router.get('/menu', menu);
router.get('/registracia_pacienta', newPatient);
router.post('/registracia_pacienta', handleCreatePatient);
router.get('/zoznam_pacientov', patientList);
router.get('/vyber_dotaznika', formSelection);
router.get('/vyber_dotaznika/detsky_spankovy_dotaznik', childrenSleepingQuestionnaire);
//---------------------------------------------

// Rendering data from API --------------------
router.get('/users/:username/repos', apiData.repos);
//---------------------------------------------

export default router;
