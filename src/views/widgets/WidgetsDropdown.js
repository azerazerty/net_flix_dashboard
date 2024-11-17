import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CSpinner,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cilArrowBottom,
  cilArrowTop,
  cilOptions,
  cilMoney,
  cilUser,
  cilSim,
  cilFaceDead,
  cilReload,
  cibNetflix,
} from '@coreui/icons'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CPlaceholder,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react-pro'
import { getCurrentUser } from '../../Redux/features/Auth/authSlice'
import { useSelector } from 'react-redux'
import { useHomeQuery } from '../../Redux/features/Home/homeApi'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const MySwal = withReactContent(Swal)

const WidgetsDropdown = (props) => {
  const user = useSelector(getCurrentUser)
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const { data: homeData, isLoading, isError, isSuccess } = useHomeQuery(user)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <>
      <CRow className="justify-content-center " xs={{ gutter: 4 }}>
        {!isLoading && !isError && homeData && (
          <>
            <CCol sm={6} xl={6}>
              <CWidgetStatsA
                color="info"
                value={
                  <>
                    <CRow>
                      <CCol xs sm={12} md>
                        <CIcon icon={cibNetflix} height={64} />
                      </CCol>
                      <CCol>
                        <h5 className="fw-bold text-nowrap mb-3">
                          {' '}
                          Total 1 Month Netflix Memberships
                        </h5>
                        <h3 className="fw-bold text-nowrap mb-3">
                          <CBadge color="light" textColor="secondary">
                            {`${Intl.NumberFormat().format(parseFloat(`${homeData.data.total_1_month}`)) || '0'} `}
                          </CBadge>
                        </h3>
                      </CCol>
                    </CRow>
                  </>
                }
              />
            </CCol>
            <CCol sm={6} xl={6}>
              <CWidgetStatsA
                color="warning"
                value={
                  <>
                    <CRow>
                      <CCol xs sm={12} md>
                        <CIcon icon={cibNetflix} height={64} />
                      </CCol>
                      <CCol>
                        <h5 className="fw-bold text-nowrap mb-3">
                          {' '}
                          Total 3 Months Netflix Memberships
                        </h5>
                        <h3 className="fw-bold text-nowrap mb-3">
                          <CBadge color="light" textColor="secondary">
                            {`${Intl.NumberFormat().format(parseFloat(`${homeData.data.total_3_months}`)) || '0'} `}
                          </CBadge>
                        </h3>
                      </CCol>
                    </CRow>
                  </>
                }
              />
            </CCol>
            <CCol sm={6} xl={6}>
              <CWidgetStatsA
                color="danger"
                value={
                  <>
                    <CRow>
                      <CCol xs sm={12} md>
                        <CIcon icon={cibNetflix} height={64} />
                      </CCol>
                      <CCol>
                        <h5 className="fw-bold text-nowrap mb-3">
                          {' '}
                          Total 6 Months Netflix Memberships
                        </h5>
                        <h3 className="fw-bold text-nowrap mb-3">
                          <CBadge color="light" textColor="secondary">
                            {`${Intl.NumberFormat().format(parseFloat(`${homeData.data.total_6_months}`)) || '0'} `}
                          </CBadge>
                        </h3>
                      </CCol>
                    </CRow>
                  </>
                }
              />
            </CCol>
            <CCol sm={6} xl={6}>
              <CWidgetStatsA
                color="success"
                value={
                  <>
                    <CRow>
                      <CCol xs sm={12} md>
                        <CIcon icon={cibNetflix} height={64} />
                      </CCol>
                      <CCol>
                        <h5 className="fw-bold text-nowrap mb-3">
                          {' '}
                          Total 1 Year Netflix Memberships
                        </h5>
                        <h3 className="fw-bold text-nowrap mb-3">
                          <CBadge color="light" textColor="secondary">
                            {`${Intl.NumberFormat().format(parseFloat(`${homeData.data.total_12_months}`)) || '0'} `}
                          </CBadge>
                        </h3>
                      </CCol>
                    </CRow>
                  </>
                }
              />
            </CCol>
            {/* <CCol sm={6} xl={3} xxl={3}> */}
          </>
        )}
        {isLoading && !isError && <CSpinner color="primary" />}
        {isError && (
          <>
            <h4 className="fw-bold text-secondary text-center ">Error While Fetching The Data</h4>
            <CIcon className="text-secondary" height={64} icon={cilFaceDead} />
          </>
        )}
      </CRow>
    </>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
