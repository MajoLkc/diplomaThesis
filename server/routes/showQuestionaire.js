import { db } from '../db.js';

const SHOW_QUESTIONAIRE_VIEW = 'showQuestionaire';


export function showQuestionaire(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const param = url.split('=');
    const data = { id: param[1] };
    let csq;
    let osas;
    let ess;
    let mq;
    db.collection('patients').findOne(data, (err, doc) => {
      if (err) throw err;
      csq = null;
      osas = null;
      ess = null;
      mq = null;
      if (!doc.CsqForm.length) csq = 'disabled';
      if (!doc.OsasForm.length) osas = 'disabled';
      if (!doc.EssForm.length) ess = 'disabled';
      if (!doc.MqForm.length) mq = 'disabled';
      const context = {
        pageTitle: 'Zoznam dotazníkov pacienta',
        csqDisabled: csq,
        osasDisabled: osas,
        essDisabled: ess,
        mqDisabled: mq,
        noLogout: false
      };
      res.render(SHOW_QUESTIONAIRE_VIEW, context);
    });
  }
}
