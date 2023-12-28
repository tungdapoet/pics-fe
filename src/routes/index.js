import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'home', element: <HomePage /> },
        {
          path: 'pin',
          children: [
            { element: <Navigate to="/dashboard/pin/detail" replace />, index: true },
            { path: 'detail/:id', element: <PinDetail /> },
            { path: 'create', element: <CreatePin /> },
          ]
        },
        {
          path: 'profile',
          children: [
            { element: <Navigate to="/dashboard/profile/detail" replace />, index: true },
            { path: 'detail', element: <ProfileDetail /> },
            { path: 'user/:id', element: <UserProfile /> },
            { path: 'edit', element: <EditProfile /> },
          ]
        },
        {
          path: 'management',
          children: [
            { element: <Navigate to="/dashboard/management/report" replace />, index: true },
            { path: 'report', element: <ManageReport /> },
            { path: 'user', element: <ManageUser /> },
            { path: 'pic', element: <ManagePin /> },
          ]
        },
        { path: 'settings', element: <Settings /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" replace />, index: true },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true }
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// HOME
const HomePage = Loadable(lazy(() => import('../pages/dashboard/general/Home')));

// PIN
const PinDetail = Loadable(lazy(() => import('../pages/dashboard/pin/PinDetail')));
const CreatePin = Loadable(lazy(() => import('../pages/dashboard/pin/CreatePin')));

// PROFILE
const ProfileDetail = Loadable(lazy(() => import('../pages/dashboard/profile/Profile')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/profile/UserProfile')));
const EditProfile = Loadable(lazy(() => import('../pages/dashboard/profile/EditProfile')));

// Admin
const ManagePin = Loadable(lazy(() => import('../pages/dashboard/admin/ManagePin')));
const ManageUser = Loadable(lazy(() => import('../pages/dashboard/admin/ManageUser')));
const ManageReport = Loadable(lazy(() => import('../pages/dashboard/admin/Report')));

// SETTINGS
const Settings = Loadable(lazy(() => import('../pages/dashboard/Settings')));

// MAIN
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
