import { db } from '../db.js';

const ESS_RESULTS_VIEW = 'ESSresults';

function splitStr(str) {
  // Function to split string
  return str.split('=');
}

export function ESSresults(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const id = splitStr(url);
    const data = { id: id[1] };
    db.collection('patients').findOne(data, (err, doc) => {
      const context = {
        patientName: doc.name,
        patientSurname: doc.surname,
        creationDate: doc.ESS_creationDate,
        creator: doc.ESS_creator,
        answer1: doc.ESS_answer_1,
        answer2: doc.ESS_answer_2,
        answer3: doc.ESS_answer_3,
        answer4: doc.ESS_answer_4,
        answer5: doc.ESS_answer_5,
        answer6: doc.ESS_answer_6,
        answer7: doc.ESS_answer_7,
        answer8: doc.ESS_answer_8,
        // eslint-disable-next-line max-len
        result: Number(doc.ESS_answer_1) + Number(doc.ESS_answer_2) + Number(doc.ESS_answer_3) + Number(doc.ESS_answer_4) + Number(doc.ESS_answer_5) + Number(doc.ESS_answer_6) + Number(doc.ESS_answer_7) + Number(doc.ESS_answer_8),
        pageTitle: 'Epworthská škála spavosti',
        noLogout: false
      };
      res.render(ESS_RESULTS_VIEW, context);
    });
  }
}
