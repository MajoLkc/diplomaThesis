const MENU_VIEW = 'menu';

export function menu(req, res) {
  if (req.user) {
    const context = {
      pageTitle: 'Menu',
      noLogout: false,
    };
    res.render(MENU_VIEW, context);
  }
}
