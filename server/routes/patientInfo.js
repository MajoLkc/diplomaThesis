import { db } from '../db.js';

const PATIENT_INFO_VIEW = 'patientInfo';

function splitStr(str) {
  // Function to split string
  return str.split('=');
}

function date(dateObject) {
  const d = new Date(dateObject);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const date = day + '.' + month + '.' + year;
  return date;
}

function calculateAge(birthday) {
  const splitToday = date(Date.now()).split('.');
  const splitBirthday = date(birthday).split('.');
  const age = splitToday[2] - splitBirthday[2];
  if (Number(splitToday[1]) < Number(splitBirthday[1])) {
    return age - 1;
  } else if (Number(splitToday[0]) < Number(splitBirthday[0])) {
    return age - 1;
  }
  return age;
}

function calculateBMI(weight, height) {
  const BMI = (weight / (height * height)) * 10000;
  const roundedBMI = BMI.toFixed(2);
  return roundedBMI;
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
        patientGender: doc.gender,
        patientBirthDate: date(doc.birthDate),
        patientAge: calculateAge(doc.birthDate),
        patientHeight: doc.height,
        patientWeight: doc.weight,
        patientBMI: calculateBMI(doc.weight, doc.height),
        patientNeckCircuit: doc.neckCircuit
      };
      res.render(PATIENT_INFO_VIEW, context);
    });
  }
}
