import { db } from '../db.js';

const SHOW_QUESTIONAIRE_VIEW = 'showQuestionaire';
let noCSQ = null;
let noOSAS = null;
let noESS = null;
let noMQ = null;

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
      if (doc.CSQcreationDate === undefined) noCSQ = 'notAllowed';
      if (doc.OSAScreationDate === undefined) noOSAS = 'notAllowed';
      if (doc.ESScreationDate === undefined) noESS = 'notAllowed';
      if (doc.MQcreationDate === undefined) noMQ = 'notAllowed';
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
