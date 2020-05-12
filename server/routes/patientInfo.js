import { db } from '../db.js';
// import { handlePatient } from './patientList.js';

const PATIENT_INFO_VIEW = 'patientInfo';
const data = { name: 'Majo' };

export function patientInfo(req, res) {
  if (req.user) {
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
