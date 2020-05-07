import { db } from '../db.js';

const EPWORTH_SLEEPING_SCALE = 'epworthSleepingScale';

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
  const data = req.body;
  db.collection('patients').insertOne(data, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.json(data);
  });
}
