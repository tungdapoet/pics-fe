// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    home: path(ROOTS_DASHBOARD, '/home'),
    pin: {
      root: path(ROOTS_DASHBOARD, '/pin'),
      detail: path(ROOTS_DASHBOARD, '/pin/detail'),
      create: path(ROOTS_DASHBOARD, '/pin/create'),
    },
    profile: {
      root: path(ROOTS_DASHBOARD, '/profile'),
      detail: path(ROOTS_DASHBOARD, '/profile/detail'),
      user: path(ROOTS_DASHBOARD, '/profile/user'),
      edit: path(ROOTS_DASHBOARD, '/profile/edit'),
    },
    management: {
      root: path(ROOTS_DASHBOARD, '/management'),
      report: path(ROOTS_DASHBOARD, '/management/report'),
      user: path(ROOTS_DASHBOARD, '/management/user'),
      pic: path(ROOTS_DASHBOARD, '/management/pic'),
    },
    settings: path(ROOTS_DASHBOARD, '/settings'),
  },
};

