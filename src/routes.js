import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// const ManageSim = React.lazy(() => import('./views/manageSim/ManageSim'))
// const ManageUsers = React.lazy(() => import('./views/manageUsers/ManageUsers'))
const ManageAdmins = React.lazy(() => import('./views/manageAdmins/ManageAdmins'))

// const UsersOperations = React.lazy(() => import('./views/usersOperations/UsersOperations'))
// const AdminOperations = React.lazy(() => import('./views/adminOperations/AdminOperations'))
// const Invoices = React.lazy(() => import('./views/invoices/Invoices'))
// const TotalFlexy = React.lazy(() => import('./views/totalFlexy/TotalFlexy'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/netflix-memberships', name: 'NetflixMemberships', element: ManageAdmins },
]
const admin_Routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/netflix-memberships', name: 'NetflixMemberships', element: ManageAdmins },
]

export default { routes, admin_Routes }
