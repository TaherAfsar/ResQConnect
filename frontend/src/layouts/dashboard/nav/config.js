// component
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User List',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Display Current Disaster',
    path: '/dashboard/disasterpage',
    icon: <VisibilityIcon />,
  },
  {
    title: 'Display Shelter List',
    path: '/dashboard/shelterlistpage',
    icon: <VisibilityIcon />,
  },
  {
    title: 'View Reports Page',
    path: '/dashboard/viewReportsPage',
    icon: <VisibilityIcon />,
  },
  {
    title: 'Add Upcoming Disaster Reports',
    path: '/addUpcomingDisaster',
    icon: <AddIcon />,
  },
  {
    title: 'Add Shelter',
    path: '/dashboard/addShelter',
    icon: <HomeIcon />,
  },
  // {
  //   title: 'Users List',
  //   path: '/user',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'Add Category',
  //   path: '/AddCategory',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'Procurer Login',
  //   path: '/procurerlogin',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Procurer Home',
  //   path: '/procurerhome',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
