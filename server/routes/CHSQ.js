import { db } from '../db.js';

const CHILDREN_SLEEPING_QUESTIONNAIRE = 'childrenSleepingQuestionnaire';

export function childrenSleepingQuestionnaire(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Detský spánkový dotazník',
      noLogout: false
    };
    res.render(CHILDREN_SLEEPING_QUESTIONNAIRE, context);
  }
}

export function handleCHSQ(req, res) {
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
