const MENU_VIEW = 'menu';
const PATIENT_LIST_VIEW = 'patientList';
const FORM_SELECTION_VIEW = 'formSelection';


export function menu(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Menu',
      noLogout: false,
    };
    res.render(MENU_VIEW, context);
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

export function formSelection(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Výber dotazníka',
      noLogout: false
    };
    res.render(FORM_SELECTION_VIEW, context);
  }
}
