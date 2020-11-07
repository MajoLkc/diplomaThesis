import { db } from '../db.js';

const MQ_RESULTS_VIEW = 'MQresults';

function splitStrAndGetValue(str) {
  // Function to split string
  return str.split('=')[1];
}

export function MQresults(req, res) {
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
        creationDate: doc.MqForm[formId][7],
        creator: doc.MqForm[formId][0],
        answer1: doc.MqForm[formId][1],
        answer2: doc.MqForm[formId][2],
        answer3: doc.MqForm[formId][3],
        answer4: doc.MqForm[formId][4],
        answer5: doc.MqForm[formId][5],
        answer6: doc.MqForm[formId][6],
        pageTitle: 'Ranný dotazník',
        noLogout: false
      };
      res.render(MQ_RESULTS_VIEW, context);
    });
  }
}
