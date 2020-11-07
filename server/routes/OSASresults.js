import { db } from '../db.js';

const OSAS_RESULTS_VIEW = 'OSASresults';

function splitStrAndGetValue(str) {
  return str.split('=')[1];
}

export function OSASresults(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const patientUrl = url.split('&')[0];
    const formUrl = url.split('&')[1];
    const patientId = splitStrAndGetValue(patientUrl);
    const formId = splitStrAndGetValue(formUrl);
    const data = { id: patientId };
    db.collection('patients').findOne(data, (err, doc) => {
      if (err) throw err;
      const context = {
        patientName: doc.name,
        patientSurname: doc.surname,
        creationDate: doc.OsasForm[formId][17],
        creator: doc.OsasForm[formId][0],
        answer1: doc.OsasForm[formId][1],
        answer2: doc.OsasForm[formId][2],
        answer3: doc.OsasForm[formId][3],
        answer4: doc.OsasForm[formId][4],
        answer5: doc.OsasForm[formId][5],
        answer6: doc.OsasForm[formId][6],
        answer7: doc.OsasForm[formId][7],
        answer8: doc.OsasForm[formId][8],
        answer9: doc.OsasForm[formId][9],
        answer10: doc.OsasForm[formId][10],
        answer11: doc.OsasForm[formId][11],
        answer12: doc.OsasForm[formId][12],
        answer13: doc.OsasForm[formId][13],
        answer14: doc.OsasForm[formId][14],
        answer15: doc.OsasForm[formId][15],
        answer16: doc.OsasForm[formId][16],
        pageTitle: 'Syndróm OSA',
        noLogout: false
      };
      res.render(OSAS_RESULTS_VIEW, context);
    });
  }
}
