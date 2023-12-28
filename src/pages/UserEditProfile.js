import React from 'react'
import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// hooks
import useSettings from '../hooks/useSettings';
import useAuth from '../hooks/useAuth';
import useTabs from '../hooks/useTabs';
// _mock_
import { _userAbout, _userFeeds, _userGallery, _userFollowers, _userList } from '../_mock';
// components
import Page from '../components/Page';
import { MotionContainer } from '../components/animate';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import UserNewEditForm from '../sections/@dashboard/user/UserNewEditForm'

// sections
import {
  Profile,
  ProfileCover,
  ProfileGallery,
  ProfileFollowers,
} from '../sections/@dashboard/user/profile';

import {
  AccountGeneral,
  AccountChangePassword,
  AccountNotifications,
} from '../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserEditProfile() {
  const { themeStretch } = useSettings()
  const { user } = useAuth()
  const { currentTab, onChangeTab } = useTabs('profile');
  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds} />,
    },
    {
        value: 'followers',
        icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
        component: <ProfileFollowers followers={_userFollowers} />,
      },
    {
        value: 'gallery',
        icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
        component: <ProfileGallery gallery={_userGallery} />,
      },
    ];

      const { pathname } = useLocation();

      const { name = '' } = useParams();

      const isEdit = pathname.includes('edit');

      const currentUser = _userList.find((user) => paramCase(user.name) === name);
  return(
    <Page title="Edit Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card
          sx={{
            mb: 3,
              height: 280,
              position: 'relative',
          }}
        >
        <ProfileCover myProfile={_userAbout} />
        </Card>
        <AccountGeneral />
        <AccountChangePassword />
        <AccountNotifications />
      </Container>
    </Page>
  );
}
