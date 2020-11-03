import { db } from '../db.js'

const FORM_SELECTION_VIEW = 'formSelection';

export function formSelection(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const param = url.split('=');
    const data = { id: param[1] };
    db.collection('patients').findOne(data, (err, doc) => {
      if (err) return err;
      const context = {
        patientName: doc.name,
        patientSurname: doc.surname,
        pageTitle: 'Výber dotazníka',
        noLogout: false
      };
      res.render(FORM_SELECTION_VIEW, context);
    });
  }
}
