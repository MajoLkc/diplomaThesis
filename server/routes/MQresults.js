import { db } from '../db.js';

const MQ_RESULTS_VIEW = 'MQresults';

function splitStr(str) {
  // Function to split string
  return str.split('=');
}

export function MQresults(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const id = splitStr(url);
    const data = { id: id[1] };
    db.collection('patients').findOne(data, (err, doc) => {
      const context = {
        patientName: doc.name,
        patientSurname: doc.surname,
        creationDate: doc.MQ_creationDate,
        creator: doc.MQ_creator,
        answer1: doc.MQ_answer_1,
        answer2: doc.MQ_answer_2,
        answer3: doc.MQ_answer_3,
        answer4: doc.MQ_answer_4,
        answer5: doc.MQ_answer_5,
        answer6: doc.MQ_answer_6,
        pageTitle: 'Ranný dotazník',
        noLogout: false
      };
      res.render(MQ_RESULTS_VIEW, context);
    });
  }
}
