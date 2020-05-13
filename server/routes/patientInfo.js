import { db } from '../db.js';

const PATIENT_INFO_VIEW = 'patientInfo';

function splitStr(str) {
  // Function to split string
  return str.split('=');
}

export function patientInfo(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const id = splitStr(url);
    const data = { id: id[1] };
    db.collection('patients').findOne(data, (err, doc) => {
      if (err) throw err;
      const context = {
        pageTitle: 'Informácie o pacientovi',
        noLogout: false,
        patientName: doc.name,
        patientSurname: doc.surname,
        patientBirthDate: doc.birthDate,
        patientHeight: doc.height,
        patientWeight: doc.weight,
        patientNeckCircuit: doc.neckCircuit
      };
      res.render(PATIENT_INFO_VIEW, context);
    });
  }
}
