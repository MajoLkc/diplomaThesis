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
