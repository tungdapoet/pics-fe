// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  admin: getIcon('ic_admin'),
  home: getIcon('ic_home'),
  pic: getIcon('ic_pic'),
  settings: getIcon('ic_settings'),
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'home', path: PATH_DASHBOARD.general.home, icon: ICONS.home },
      {
        title: 'pic',
        path: PATH_DASHBOARD.general.pin.detail,
        icon: ICONS.pic,
        children: [
          { title: 'create', path: PATH_DASHBOARD.general.pin.create, icon: ICONS.ecommerce },
        ]
      },
      {
        title: 'profile',
        path: PATH_DASHBOARD.general.profile.detail,
        icon: ICONS.user,
        children: [
          { title: 'detail', path: PATH_DASHBOARD.general.profile.detail, icon: ICONS.dashboard },
          { title: 'edit', path: PATH_DASHBOARD.general.profile.edit, icon: ICONS.ecommerce },
        ]
      },
      { title: 'settings', path: PATH_DASHBOARD.general.settings, icon: ICONS.settings },
    ],
  },
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Management',
    items: [
      {
        title: 'admin',
        path: PATH_DASHBOARD.general.management.report,
        icon: ICONS.admin,
        children: [
          { title: 'reports', path: PATH_DASHBOARD.general.management.report, icon: ICONS.dashboard },
          { title: 'users', path: PATH_DASHBOARD.general.management.user, icon: ICONS.dashboard },
          { title: 'pics', path: PATH_DASHBOARD.general.management.pic, icon: ICONS.ecommerce },
        ]
      },
    ],
  },
];

export default navConfig;
