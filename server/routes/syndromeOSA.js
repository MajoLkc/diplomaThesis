import { db } from '../db.js';

const SYNDROME_OSA = 'syndromeOSA';

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
