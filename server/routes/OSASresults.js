import { db } from '../db.js';

const OSAS_RESULTS_VIEW = 'OSASresults';

function splitStr(str) {
  // Function to split string
  return str.split('=');
}

export function OSASresults(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const id = splitStr(url);
    const data = { id: id[1] };
    db.collection('patients').findOne(data, (err, doc) => {
      const context = {
        patientName: doc.name,
        patientSurname: doc.surname,
        creationDate: doc.OSAS_creationDate,
        creator: doc.OSAS_creator,
        answer1: doc.OSAS_answer_1,
        answer2: doc.OSAS_answer_2,
        answer3: doc.OSAS_answer_3,
        answer4: doc.OSAS_answer_4,
        answer5: doc.OSAS_answer_5,
        answer6: doc.OSAS_answer_6,
        answer7: doc.OSAS_answer_7,
        answer8: doc.OSAS_answer_8,
        answer9: doc.OSAS_answer_9,
        answer10: doc.OSAS_answer_10,
        answer11: doc.OSAS_answer_11,
        answer12: doc.OSAS_answer_12,
        answer13: doc.OSAS_answer_13,
        answer14: doc.OSAS_answer_14,
        answer15: doc.OSAS_answer_15,
        answer16: doc.OSAS_answer_16,
        pageTitle: 'Syndróm OSA',
        noLogout: false
      };
      res.render(OSAS_RESULTS_VIEW, context);
    });
  }
}
