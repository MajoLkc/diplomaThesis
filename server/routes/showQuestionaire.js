import { db } from '../db.js';

const SHOW_QUESTIONAIRE_VIEW = 'showQuestionaire';
let noCSQ;
let noOSAS;
let noESS;
let noMQ;

export function showQuestionaire(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const param = url.split('=');
    const data = { id: param[1] };
    db.collection('patients').findOne(data, (err, doc) => {
      if (err) throw err;
      noCSQ = null;
      noOSAS = null;
      noESS = null;
      noMQ = null;
      if (doc.CSQ_creationDate === undefined) noCSQ = 'disabled';
      if (doc.OSAS_creationDate === undefined) noOSAS = 'disabled';
      if (doc.ESS_creationDate === undefined) noESS = 'disabled';
      if (doc.MQ_creationDate === undefined) noMQ = 'disabled';
      const context = {
        pageTitle: 'Zoznam dotazníkov pacienta',
        CSQ: noCSQ,
        OSAS: noOSAS,
        ESS: noESS,
        MQ: noMQ,
        noLogout: false
      };
      res.render(SHOW_QUESTIONAIRE_VIEW, context);
    });
  }
}
