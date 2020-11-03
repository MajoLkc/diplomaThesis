import { db } from '../db.js';

const EPWORTH_SLEEPING_SCALE = 'ESS';

export function epworthSleepingScale(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Epworthská škála spavosti',
      noLogout: false
    };
    res.render(EPWORTH_SLEEPING_SCALE, context);
  }
}

export function handleEpworthSleepingScale(req, res) {
  const formValues = req.body;
  const url = req.originalUrl;
  const param = url.split('=');
  const data = { id: param[1] };
  db.collection('patients').findOneAndUpdate(data, { $push: { EssForm: formValues } }, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.json(data);
  });
}
