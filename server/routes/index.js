import express from 'express';
import * as apiData from './apiData.js';
import { login, handleLogin, handleLogout } from './auth.js';
import { menu } from './menu.js';
import { formSelection } from './formSelection.js';
import { newPatient, handleCreatePatient/*, isPatientPresent*/ } from './patient.js';
import { childrenSleepingQuestionnaire, handleCHSQ } from './CSQ.js';
import { morningQuestionaire, handleMorningQuestionaire } from './MQ.js';
import { patientList, generateExcel } from './patientList.js';
import { epworthSleepingScale, handleEpworthSleepingScale } from './ESS';
import { syndromeOSA, handleSyndromeOSA } from './OSAS.js';
import { patientInfo } from './patientInfo.js';
import { updatePatient, handlePatientUpdate } from './patientUpdate';
import { showQuestionaire } from './showQuestionaire.js';
import { CSQresults } from './CSQresults.js';
import { ESSresults } from './ESSresults.js';
import { MQresults } from './MQresults.js';
import { OSASresults } from './OSASresults.js';

const router = express.Router();

// Basic rendering ----------------------------
router.get('/login', login);
router.get('/logout', handleLogout);
router.post('/login', handleLogin);
router.get('/menu', menu);
router.get('/registracia_pacienta', newPatient);
//router.post('/registracia_pacienta', isPatientPresent);
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
router.post('/generuj_excel', generateExcel);
router.get('/informacie_o_pacientovi', patientInfo);
router.get('/uprava_pacienta', updatePatient);
router.post('/uprava_pacienta', handlePatientUpdate);
router.get('/zoznam_dotaznikov_pacienta', showQuestionaire);
router.get('/zoznam_dotaznikov_pacienta/detsky_spankovy_dotaznik', CSQresults);
router.get('/zoznam_dotaznikov_pacienta/epworthska_skala_spavosti', ESSresults);
router.get('/zoznam_dotaznikov_pacienta/ranny_dotaznik', MQresults);
router.get('/zoznam_dotaznikov_pacienta/syndrom_OSA', OSASresults);

//---------------------------------------------

// Rendering data from API --------------------
router.get('/users/:username/repos', apiData.repos);
//---------------------------------------------

export default router;
