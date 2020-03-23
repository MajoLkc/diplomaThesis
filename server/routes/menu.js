const MENU_VIEW = 'menu';
const NEW_PATIENT_VIEW = 'newPatient';
const PATIENT_LIST_VIEW = 'patientList';

export function menu(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Menu',
      noLogout: false,
    };
    res.render(MENU_VIEW, context);
  }
}

export function newPatient(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Registrácia pacienta',
      noLogout: false,
    };
    res.render(NEW_PATIENT_VIEW, context);
  }
}

export function patientList(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Zoznam pacientov',
      noLogout: false,
    };
    res.render(PATIENT_LIST_VIEW, context);
  }
}
