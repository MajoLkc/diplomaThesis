import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';

const NEW_PATIENT_VIEW = 'patient';

export function newPatient(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Registrácia pacienta',
      noLogout: false,
    };
    res.render(NEW_PATIENT_VIEW, context);
  }
}

export function handleCreatePatient(req, res) {
  const data = req.body; //ulozi data z formularu do premennej data
  data.id = uuidv4();
  db.collection('patients').insertOne(data, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return; //aby to nepokracovalo
    }
    res.json(data);
  });
}

/* This function isPatientPresent, we need to add to function handleCreatePatient
if patient is present -> redirect to patient update page or add new informations about patient to DB
*/

export function isPatientPresent(req, res) {
  const data = req.body;
  db.collection('patients').findOne({ 'name': data.name, 'surname': data.surname, 'birthDate': data.birthDate }, (error, exist) => {
    if (exist && !error) {
      console.log(exist.informations[3])

      res.jsonp({ success: true, patientRegistered: exist.informations[3] })
    }
  })
}
