import React from 'react'
import { CFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibGithub } from '@coreui/icons'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Ferhat Netflix
        </a>
        <span className="ms-1">&copy; {`${new Date().getFullYear()}`}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <span>
          <CIcon icon={cibGithub} />
        </span>

        <a
          href="https://github.com/azerazerty"
          target="_blank"
          style={{ textDecoration: 'none' }}
        >{` @azerazerty`}</a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
