import { db } from '../db.js';

const PATIENT_UPDATE_VIEW = 'patientUpdate';

export function updatePatient(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const param = url.split('=');
    const data = { id: param[1] };
    db.collection('patients').findOne(data, (err, doc) => {
      if (err) throw err;
      const context = {
        pageTitle: 'Úprava pacienta',
        noLogout: false,
        patientName: doc.name,
        patientSurname: doc.surname,
        patientBirthDate: doc.birthDate,
        patientHeight: doc.height,
        patientWeight: doc.weight,
        patientNeckCircuit: doc.neckCircuit
      };
      res.render(PATIENT_UPDATE_VIEW, context);
    });
  }
}

export function handlePatientUpdate(req, res) {
  if (req.user) {
    const updatedPatient = {
      name: req.body.name,
      surname: req.body.surname,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      height: req.body.height,
      weight: req.body.weight,
      neckCircuit: req.body.neckCircuit
    };
    const url = req.originalUrl;
    const param = url.split('=');
    const data = { id: param[1] };
    db.collection('patients').findOneAndUpdate(data, { $set: updatedPatient }, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.json(data);
    });
  }
}
