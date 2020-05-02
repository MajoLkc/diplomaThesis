//import { db } from '../db.js';

const MORNING_QUESTIONAIRE = 'morningQuestionaire';

export function morningQuestionaire(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Ranný dotazník',
      noLogout: false
    };
    res.render(MORNING_QUESTIONAIRE, context);
  }
}
