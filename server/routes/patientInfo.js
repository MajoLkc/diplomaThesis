import { db } from '../db.js';

const PATIENT_INFO_VIEW = 'patientInfo';

export function patientInfo(req, res) {
  if (req.user) {
    const data = req.json(data);
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
