import { db } from '../db.js';

const ESS_RESULTS_VIEW = 'ESSresults';

function splitStrAndGetValue(str) {
  // Function to split string
  return str.split('=')[1];
}

export function ESSresults(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const patientUrl = url.split('&')[0];
    const formUrl = url.split('&')[1];
    const patientId = splitStrAndGetValue(patientUrl);
    const formId = splitStrAndGetValue(formUrl);
    const data = { id: patientId };
    db.collection('patients').findOne(data, (err, doc) => {
      if (err) throw err;
      const sum = Number(doc.EssForm[formId][1]) + Number(doc.EssForm[formId][2]) + Number(doc.EssForm[formId][3]) + Number(doc.EssForm[formId][4]) + Number(doc.EssForm[formId][5]) + Number(doc.EssForm[formId][6]) + Number(doc.EssForm[formId][7]) + Number(doc.EssForm[formId][8]);
      const context = {
        patientName: doc.name,
        patientSurname: doc.surname,
        creationDate: doc.EssForm[formId][9],
        creator: doc.EssForm[formId][0],
        answer1: doc.EssForm[formId][1],
        answer2: doc.EssForm[formId][2],
        answer3: doc.EssForm[formId][3],
        answer4: doc.EssForm[formId][4],
        answer5: doc.EssForm[formId][5],
        answer6: doc.EssForm[formId][6],
        answer7: doc.EssForm[formId][7],
        answer8: doc.EssForm[formId][8],
        result: sum,
        pageTitle: 'Epworthská škála spavosti',
        noLogout: false
      };
      res.render(ESS_RESULTS_VIEW, context);
    });
  }
}
