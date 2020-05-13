import express from 'express';
import * as apiData from './apiData.js';
import { login, handleLogin } from './auth.js';
import { menu, formSelection } from './menu.js';
import { newPatient, handleCreatePatient } from './patient.js';
import { childrenSleepingQuestionnaire, handleCHSQ } from './CHSQ.js';
import { morningQuestionaire, handleMorningQuestionaire } from './morningQuestionaire.js';
import { patientList } from './patientList.js';
import { epworthSleepingScale, handleEpworthSleepingScale } from './epworthSleepingScale';
import { syndromeOSA, handleSyndromeOSA } from './syndromeOSA.js';
import { patientInfo } from './patientInfo.js';
import { updatePatient, handlePatientUpdate } from './patientUpdate';

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
router.post('/vyber_dotaznika/detsky_spankovy_dotaznik', handleCHSQ);
router.get('/vyber_dotaznika/ranny_dotaznik', morningQuestionaire);
router.post('/vyber_dotaznika/ranny_dotaznik', handleMorningQuestionaire);
router.get('/vyber_dotaznika/epworthska_skala_spavosti', epworthSleepingScale);
router.post('/vyber_dotaznika/epworthska_skala_spavosti', handleEpworthSleepingScale);
router.get('/vyber_dotaznika/syndrom_OSA', syndromeOSA);
router.post('/vyber_dotaznika/syndrom_OSA', handleSyndromeOSA);
// router.post('/zoznam_pacientov', handlePatient);
// router.post('/zoznam_pacientov', filterPatient);
router.get('/informacie_o_pacientovi', patientInfo);
router.get('/uprava_pacienta', updatePatient);
router.post('/uprava_pacienta', handlePatientUpdate);

//---------------------------------------------

// Rendering data from API --------------------
router.get('/users/:username/repos', apiData.repos);
//---------------------------------------------

export default router;
