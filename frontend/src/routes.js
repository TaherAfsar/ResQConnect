import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DisasterPage from './pages/DisasterPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AddUpcomingDisaster from './pages/AddUpcomingDisaster';
import ViewReportsPage from './pages/ViewReportsPage';
import AddCategory from './pages/AddCategory';
import ShelterListPage from './pages/ShelterList';
import AddShelter from './pages/AddShelter';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'disasterpage', element: <DisasterPage /> },
        { path: 'shelterlistpage', element: <ShelterListPage /> },
        { path: 'viewReportsPage', element: <ViewReportsPage /> },
        { path: 'addShelter', element: <AddShelter /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'addUpcomingDisaster',
      element: <AddUpcomingDisaster />,
    },
    {
      path: 'addCategory',
      element: <AddCategory />,
    },
    {
      path: 'user',
      element: <UserPage />,
    },
  ]);

  return routes;
}
