const PATIENT_LIST_VIEW = 'patientList';

export function patientList(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Zoznam pacientov',
      noLogout: false,
    };
    res.render(PATIENT_LIST_VIEW, context);
  }
}
