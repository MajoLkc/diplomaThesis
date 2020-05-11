import { db } from '../db.js';

const PATIENT_LIST_VIEW = 'patientList';
const PATIENT_INFO_VIEW = 'patientInfo';
const info = [];
let index;

// export function patientList(req, res) {
//   if (req.user) {
//     db.collection('patients').find().forEach(function (doc, err) {
//       if(err) throw err;
//       if(doc.name ==! null) resultData.push(doc.name);
//       console.log(resultData);
//     });
//     const context = {
//       pageTitle: 'Zoznam pacientov',
//       noLogout: false,
//     };
//     res.render(PATIENT_LIST_VIEW, context);
//   }
// }

export function patientList(req, res) {
  if (req.user) {
    db.collection('patients').find().toArray((err, result) => {
      for (index = 0; index < result.length; index++) {
        if (result[index].name === undefined);
        else {
          info.push({
            name: result[index].name,
            surname: result[index].surname,
            birthDate: result[index].birthDate
          });
        }
      }
      const context = {
        pageTitle: 'Zoznam pacientov',
        noLogout: false,
        informations: info
      };
      res.render(PATIENT_LIST_VIEW, context);
    });
  }
}

export function handlePatient(req, res) {
  if (req.user) {
    const data = req.body;
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
