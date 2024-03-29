import { db } from '../db.js';

const PATIENT_INFO_VIEW = 'patientInfo';

function date(dateObject) {
  const d = new Date(dateObject);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const date = `${day}.${month}.${year}`;
  return date;
}

function calculateAge(birthday) {
  const splitToday = date(Date.now()).split('.');
  const splitBirthday = birthday.split('.');
  const birthdayYear = Number(splitBirthday[2]);
  const birthdayMonth = Number(splitBirthday[1]);
  const birthdayDay = Number(splitBirthday[0]);
  const todayYear = Number(splitToday[2]);
  const todayMonth = Number(splitToday[1]);
  const todayDay = Number(splitToday[0]);
  const age = todayYear - birthdayYear;

  if (todayMonth < birthdayMonth) {
    return age - 1;
  } else if (todayMonth === birthdayMonth) {
    if (todayDay < birthdayDay) {
      return age - 1;
    }
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
    const id = url.split('=');
    const data = { id: id[1] };
    let i;
    const informations = [];
    db.collection('patients').findOne(data, (err, doc) => {
      if (err) throw err;
      for (i = 0; i < doc.informations.length; i++) {
        informations.push({
          date: doc.informations[i][3],
          height: doc.informations[i][0],
          weight: doc.informations[i][1],
          bmi: calculateBMI(doc.informations[i][1], doc.informations[i][0]),
          neckCircuit: doc.informations[i][2],
          numberOfVisit: i + 1
        });
      }
      const context = {
        pageTitle: 'Informácie o pacientovi',
        noLogout: false,
        patientName: doc.name,
        patientSurname: doc.surname,
        patientGender: doc.gender,
        patientBirthDate: doc.birthDate,
        patientAge: calculateAge(doc.birthDate),
        infos: informations
      };
      res.render(PATIENT_INFO_VIEW, context);
    });
  }
}
