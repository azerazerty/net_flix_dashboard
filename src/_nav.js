import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSim,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilTransfer,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { CBadge } from '@coreui/react-pro'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'MEMBERSHIPS',
  },
  {
    component: CNavItem,
    name: 'Netflix Memberships',
    to: '/netflix-memberships',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
]
const _admin_nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'MEMBERSHIPS',
  },
  {
    component: CNavItem,
    name: 'Netflix Memberships',
    to: '/netflix-memberships',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
]

export default { _nav, _admin_nav }
