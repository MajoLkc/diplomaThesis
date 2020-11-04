import { db } from '../db.js';

const SYNDROME_OSA = 'OSAS';

export function syndromeOSA(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Syndróm OSA',
      noLogout: false
    };
    res.render(SYNDROME_OSA, context);
  }
}

export function handleSyndromeOSA(req, res) {
  const formValues = req.body;
  const url = req.originalUrl;
  const param = url.split('=');
  const data = { id: param[1] };
  db.collection('patients').findOneAndUpdate(data, { $push: { OsasForm: formValues } }, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.json(data);
  });
}
