import { db } from '../db.js';

const MORNING_QUESTIONAIRE = 'morningQuestionaire';

export function morningQuestionaire(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Ranný dotazník',
      noLogout: false
    };
    res.render(MORNING_QUESTIONAIRE, context);
  }
}

export function handleMorningQuestionaire(req, res) {
  const updatedPatient = req.body;
  const url = req.originalUrl;
  const param = url.split('=');
  const data = { id: param[1] };
  db.collection('patients').findOneAndUpdate(data, { $set: updatedPatient }, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.json(data);
  });
}
