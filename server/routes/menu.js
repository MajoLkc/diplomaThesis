const MENU_VIEW = 'menu';
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

export function formSelection(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Výber dotazníka',
      noLogout: false
    };
    res.render(FORM_SELECTION_VIEW, context);
  }
}
