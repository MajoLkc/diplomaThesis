import { db } from '../db.js';

const SHOW_QUESTIONAIRE_VIEW = 'showQuestionaire';


export function showQuestionaire(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const param = url.split('=');
    const data = { id: param[1] };
    let noCsq;
    let noOsas;
    let noEss;
    let noMq;
    let i;
    const numberOfCsq = [];
    const numberOfOsas = [];
    const numberOfEss = [];
    const numberOfMq = [];
    db.collection('patients').findOne(data, (err, doc) => {
      if (err) throw err;
      noCsq = null;
      noOsas = null;
      noEss = null;
      noMq = null;
      if (!doc.CsqForm.length) {
        noCsq = 'unclicable'
      } else {
        for (i = 0; i < doc.CsqForm.length; i++) {
          numberOfCsq.push(doc.CsqForm[i][58]);
        }
      }
      if (!doc.OsasForm.length) {
        noOsas = 'unclicable';
      } else {
        for (i = 0; i < doc.OsasForm.length; i++) {
          numberOfOsas.push(doc.OsasForm[i][17]);
        }
      }
      if (!doc.EssForm.length) {
        noEss = 'unclicable';
      } else {
        for (i = 0; i < doc.EssForm.length; i++) {
          numberOfEss.push(doc.EssForm[i][9]);
        }
      }
      if (!doc.MqForm.length) {
        noMq = 'unclicable';
      } else {
        for (i = 0; i < doc.MqForm.length; i++) {
          numberOfMq.push(doc.MqForm[i][7]);
        }
      }
      const context = {
        pageTitle: 'Zoznam dotazníkov pacienta',
        csqDisabled: noCsq,
        osasDisabled: noOsas,
        essDisabled: noEss,
        mqDisabled: noMq,
        numOfCsq: numberOfCsq,
        numOfOsas: numberOfOsas,
        numOfEss: numberOfEss,
        numOfMq: numberOfMq,
        noLogout: false
      };
      res.render(SHOW_QUESTIONAIRE_VIEW, context);
    });
  }
}
