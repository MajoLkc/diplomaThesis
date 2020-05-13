import { db } from '../db.js';

const PATIENT_LIST_VIEW = 'patientList';
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
            birthDate: result[index].birthDate,
            ID: result[index].id
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

// export function filterPatient(req, res) {
//   const data = req.body;
//   // console.log(data);
//   db.collection('patients').find(data).toArray((err, result) => {
//     for (index = 0; index < result.length; index++) {
//       if (result[index].name === undefined);
//       else {
//         info.push({
//           name: result[index].name,
//           surname: result[index].surname,
//           birthDate: result[index].birthDate,
//           ID: result[index].id
//         });
//       }
//     }
//     const context = {
//       pageTitle: 'Zoznam pacientov',
//       noLogout: false,
//       informations: info
//     };
//     res.render(PATIENT_LIST_VIEW, context);
//   });
// }

// export function handlePatient(req, res) {
//   const data = req.body;
//   db.collection('patients').insertOne(data, (err) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(500);
//       return; //aby to nepokracovalo
//     }
//     res.json(data);
//   });
// }
