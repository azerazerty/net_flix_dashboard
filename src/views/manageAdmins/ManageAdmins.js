import {
  cilFaceDead,
  cilMoney,
  cilPencil,
  cilPlus,
  cilReload,
  cilTrash,
  cilNoteAdd,
  cilZoom,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CBadge,
  CAvatar,
  CSmartTable,
  CRow,
  CCol,
  CButton,
  CCollapse,
  CCardBody,
  CCard,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormInput,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CSpinner,
  CFormSelect,
  CFormCheck,
  CButtonGroup,
  CDateRangePicker,
} from '@coreui/react-pro'
import { useEffect, useRef, useState } from 'react'

import {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} from '../../Redux/features/Admins/adminsApi'

import { getCurrentUser } from '../../Redux/features/Auth/authSlice'
import { useSelector } from 'react-redux'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CFormSwitch } from '@coreui/react'
import { addMonths, format } from 'date-fns'

const MySwal = withReactContent(Swal)

const ManageAdmins = () => {
  const user = useSelector(getCurrentUser)
  const { data: UsersData, isLoading, isSuccess, isError } = useGetUsersQuery(user)
  // const { data: SimData, ...GetNumbersQueryResult } = useGetNumbersQuery(user)
  const [ffusers, setFfusers] = useState()

  const [CreateUser, createUserResult] = useCreateUserMutation()
  const [EditUser, editUserResult] = useEditUserMutation()
  const [DeleteUser, deleteUserResult] = useDeleteUserMutation()

  const [showInfoModel, setShowInfoModel] = useState(false)
  const [showCreateModel, setShowCreateModel] = useState(false)

  const [toast, addToast] = useState(0)

  const [selectedUser, setSelectedUser] = useState()
  const [newUser, setNewUser] = useState()

  const toaster = useRef()

  const columns = [
    // {
    //   key: 'avatar',
    //   label: '',
    //   filter: false,
    //   sorter: false,
    // },
    //
    {
      key: 'id',
    },
    {
      key: 'email',
      label: 'Email',
      _style: { width: '15%', whiteSpace: 'nowrap' },
    },
    {
      key: 'name',
      label: 'Client',
      _style: { width: '10%', whiteSpace: 'nowrap' },
    },
    {
      key: 'start_date',
      label: 'Start Date',
      _style: { width: '20%', whiteSpace: 'nowrap' },
    },
    {
      key: 'end_date',
      label: 'End Date',
      _style: { width: '20%', whiteSpace: 'nowrap' },
    },
    {
      key: 'status',
      label: 'Status',
      _style: { width: '10%', whiteSpace: 'nowrap' },
    },
    {
      key: 'membership',
      label: 'Membership',
      _style: { width: '25%', whiteSpace: 'nowrap' },
    },
    {
      key: 'action',
      label: '',
      filter: false,
      sorter: false,
    },
  ]

  const UsersTableData = UsersData?.subscriptions || null

  const successToast = (successMessage) => (
    <CToast
      autohide={true}
      visible={true}
      color="success"
      className="text-white align-items-center"
    >
      <div className="d-flex">
        <CToastBody>{successMessage}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
  const failedToast = (errorMessage) => (
    <CToast autohide={true} visible={true} color="danger" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>{errorMessage}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
  const getBadge = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'expired':
        return 'danger'
      default:
        return 'primary'
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const data = await CreateUser({
        credentials: user,
        User: selectedUser,
      }).unwrap()
      if (data.status !== 'success') {
        addToast(failedToast(data.message))
        throw new Error(data.message)
      }
      setShowCreateModel(false)
      addToast(successToast('Membership Created Successfully.'))
    } catch (error) {
      let errorMsg = ''
      error?.message
        ? (errorMsg = error.message)
        : (errorMsg = 'Error While Creating Membership, Please Try Again Later.')
      addToast(failedToast(`${errorMsg}`))
    }
  }
  const handleUpdateUser = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const data = await EditUser({
        credentials: user,
        User: selectedUser,
      }).unwrap()
      if (data.status !== 'success') {
        addToast(failedToast(data.message))
        throw new Error(data.message)
      }
      setShowInfoModel(false)
      addToast(successToast('Membership Updated Successfully.'))
    } catch (error) {
      let errorMsg = ''
      error?.message
        ? (errorMsg = error.message)
        : (errorMsg = 'Error While Updating Membership, Please Try Again Later.')
      addToast(failedToast(`${errorMsg}`))
    }
  }
  const handleDeleteUser = (user) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deleteUser(user)
        } catch (e) {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          throw e
        }
      },
      allowOutsideClick: () => !MySwal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        setShowInfoModel(false)
        MySwal.fire({
          title: 'Deleted!',
          text: 'Membership has been deleted.',
          icon: 'success',
        })
      }
    })
  }
  const deleteUser = async (User) => {
    let toReturn
    try {
      const data = await DeleteUser({
        credentials: user,
        User: { email: User.email },
      }).unwrap()

      if (data.status !== 'success') {
        addToast(failedToast(data.message))
        throw new Error(data.message)
      }

      addToast(successToast('Membership Deleted Successfully.'))
      toReturn = data
    } catch (error) {
      let errorMsg = error?.message || 'Error While Deleting Membership, Please Try Again Later.'
      addToast(failedToast(`${errorMsg}`))
      throw error // Re-throw the original error instead of creating a new one
    }
    return toReturn
  }

  // Function to calculate the end date
  const calculateEndDate = (monthsToAdd) => {
    const currentDate =
      (selectedUser?.start_date && new Date(selectedUser?.start_date)) || new Date()
    const calculatedDate = addMonths(currentDate, monthsToAdd)

    // Format the date to yyyy-MM-dd
    const formattedDate = format(calculatedDate, 'yyyy-MM-dd')
    return new String(formattedDate)
  }

  useEffect(() => {
    // const fetchFFusers = () => {
    //   fetch('https://fftopup.store/Flexy/getffusers.php', {
    //     body: JSON.stringify({
    //       ...user,
    //     }),
    //     method: 'POST',
    //   })
    //     .then(async (r) => await r.json())
    //     .then((response) => {
    //       if (response.users.length > 0) {
    //         let to_return = []
    //         response.users.map((user) => {
    //           to_return.push(user.user)
    //         })
    //         setFfusers(to_return)
    //         console.log(to_return)
    //         console.log(to_return[Object.keys(to_return)[0]] || 'not found')
    //         setFfusers(to_return)
    //       } else {
    //         setFfusers(response.users)
    //       }
    //     })
    //     .catch((e) => {
    //       //show toast
    //       setFfusers(null)
    //     })
    // }
    // fetchFFusers()

    setFfusers([
      {
        id: 0,
        plan: '1 Month Subscription',
      },
      {
        id: 1,
        plan: '3 Months Subscription',
      },
      {
        id: 2,
        plan: '6 Months Subscription',
      },
      {
        id: 3,
        plan: '1 Year Subscription',
      },
    ])
  }, [])

  return (
    <>
      <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />

      <CModal visible={showInfoModel} onClose={() => setShowInfoModel(false)}>
        <CModalHeader>
          <CModalTitle>Membership Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm noValidate>
            <CFormInput
              className="mb-3"
              id="email"
              placeholder="Email"
              label="Email"
              value={selectedUser?.email || ''}
              disabled
              readOnly
            />
            <CFormInput
              onChange={(e) =>
                setSelectedUser((prev) => {
                  return {
                    ...prev,
                    name: `${e.target.value}`,
                  }
                })
              }
              className="mb-3"
              id="name"
              placeholder="Full Name"
              label="Client Name"
              value={selectedUser?.name || ''}
            />
            <CFormSelect
              defaultValue={selectedUser?.membership}
              onChange={(e) =>
                setSelectedUser((prev) => {
                  return {
                    ...prev,
                    membership: `${e.target.value}`,
                    start_date: selectedUser?.start_date || format(Date.now(), 'yyyy-MM-dd'),
                    end_date: () => {
                      let addedMonths = [1, 3, 6, 12]
                      return calculateEndDate(addedMonths[e.target.value] || 1)
                    },
                  }
                })
              }
              className="mb-3"
              id="plan"
              label="Membership Plan"
              required
              aria-label="plan"
            >
              <option disabled>Select Plan</option>
              {ffusers &&
                ffusers.length > 0 &&
                ffusers?.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.plan}
                  </option>
                ))}
            </CFormSelect>
            <CRow className=" mb-3">
              <CCol xs lg={4} className="d-flex flex-column justify-content-center mb-3 mb-lg-0">
                <CFormSwitch
                  onChange={(e) =>
                    setSelectedUser((prev) => {
                      return {
                        ...prev,
                        status: selectedUser?.status === 'active' ? 'expired' : 'active',
                      }
                    })
                  }
                  id="status"
                  label="Membership Active/Expired"
                  defaultChecked={selectedUser?.status === 'active'}
                />
              </CCol>
              <CCol xs="auto" lg={8}>
                <CDateRangePicker
                  style={{
                    '--cui-date-picker-zindex': '50000',
                    'date-picker-zindex': '50000',
                    zIndex: 50000,
                  }}
                  className="mb-3"
                  disabled={selectedUser?.status === 'expired' || false}
                  onStartDateChange={(date) =>
                    setSelectedUser((prev) => {
                      return {
                        ...prev,
                        start_date: format(date, 'yyyy-MM-dd'),
                      }
                    })
                  }
                  onEndDateChange={(date) =>
                    setSelectedUser((prev) => {
                      return {
                        ...prev,
                        end_date: format(date, 'yyyy-MM-dd'),
                      }
                    })
                  }
                  endDate={selectedUser?.end_date || format(Date.now(), 'yyyy-MM-dd')}
                  startDate={selectedUser?.start_date || format(Date.now(), 'yyyy-MM-dd')}
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <CButton
                  onClick={async (e) => await handleUpdateUser(e)}
                  disabled={editUserResult.isLoading}
                  className="mb-3 text-light"
                  type="submit"
                  color="success"
                >
                  <CIcon icon={cilPencil} height={16}></CIcon>
                  {` ${editUserResult.isLoading ? 'Loading ...' : 'Edit Membership'}`}
                </CButton>
              </CCol>
              <CCol>
                <CButton
                  onClick={(e) => handleDeleteUser(selectedUser)}
                  disabled={deleteUserResult.isLoading}
                  className="mb-3 text-light float-end"
                  type="submit"
                  color="danger"
                >
                  <CIcon icon={cilTrash} height={16}></CIcon>

                  {` ${deleteUserResult.isLoading ? 'Loading ...' : 'Delete Membership'}`}
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>
      <CModal visible={showCreateModel} onClose={() => setShowCreateModel(false)}>
        <CModalHeader>
          <CModalTitle>Membership Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm noValidate onSubmit={handleCreateUser}>
            <CFormInput
              onChange={(e) =>
                setSelectedUser((prev) => {
                  return {
                    ...prev,
                    email: `${e.target.value}`,
                  }
                })
              }
              className="mb-3"
              id="email"
              placeholder="Email"
              label="Email"
              value={selectedUser?.email || ''}
            />
            <CFormInput
              onChange={(e) =>
                setSelectedUser((prev) => {
                  return {
                    ...prev,
                    name: `${e.target.value}`,
                  }
                })
              }
              className="mb-3"
              id="name"
              placeholder="Full Name"
              label="Client Name"
              value={selectedUser?.name || ''}
            />
            <CFormSelect
              defaultValue={selectedUser?.membership}
              onChange={(e) =>
                setSelectedUser((prev) => {
                  return {
                    ...prev,
                    membership: `${e.target.value}`,
                    start_date: selectedUser?.start_date || format(Date.now(), 'yyyy-MM-dd'),
                    end_date: () => {
                      let addedMonths = [1, 3, 6, 12]
                      return calculateEndDate(addedMonths[e.target.value] || 1)
                    },
                  }
                })
              }
              className="mb-3"
              id="plan"
              label="Membership Plan"
              required
              aria-label="plan"
            >
              <option disabled>Select Plan</option>
              {ffusers &&
                ffusers.length > 0 &&
                ffusers?.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.plan}
                  </option>
                ))}
            </CFormSelect>
            <CDateRangePicker
              style={{ '--cui-date-picker-zindex': '10000' }}
              className="mb-3"
              label="Subscription Period"
              disabled={selectedUser?.status === 'expired' || false}
              inputDateParse={(date) => {
                if (date.length !== 10) return
                return new Date(date)
              }}
              inputDateFormat={(date) => format(new Date(date), 'yyyy-MM-dd')}
              onStartDateChange={(date) =>
                setSelectedUser((prev) => {
                  return {
                    ...prev,
                    start_date: format(date, 'yyyy-MM-dd'),
                  }
                })
              }
              onEndDateChange={(date) =>
                setSelectedUser((prev) => {
                  return {
                    ...prev,
                    end_date: format(date, 'yyyy-MM-dd'),
                  }
                })
              }
              endDate={
                selectedUser?.end_date || calculateEndDate(0) || format(Date.now(), 'yyyy-MM-dd')
              }
              startDate={selectedUser?.start_date || format(Date.now(), 'yyyy-MM-dd')}
            />

            <CButton
              disabled={createUserResult.isLoading}
              className="mb-3 float-end"
              type="submit"
              color="primary"
            >
              <CIcon icon={cilNoteAdd} />
              {`${createUserResult.isLoading ? ' Creating ...' : ' Create Membership'}`}
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>

      {!isLoading && !isError && (
        <>
          <CCard>
            <CCardHeader>Memberships Manager</CCardHeader>
            <CCardBody>
              <CButton
                onClick={() => {
                  setSelectedUser({
                    start_date: format(Date.now(), 'yyyy-MM-dd'),
                    end_date: calculateEndDate(1),
                    status: 'active',
                    membership: 0,
                  })

                  setShowCreateModel(true)
                }}
                color="primary float-end  mx-3"
              >
                <CIcon icon={cilNoteAdd} height={16}></CIcon>
                {` Create New Membership`}
              </CButton>
              <CRow className="mt-5">
                <CCol>
                  <CSmartTable
                    activePage={1}
                    cleaner
                    clickableRows
                    columns={columns}
                    columnSorter
                    //   footer
                    items={UsersTableData}
                    // items={rows}
                    itemsPerPageSelect
                    itemsPerPage={10}
                    pagination
                    //   selectable
                    tableFilter
                    tableProps={{
                      className: 'add-this-class',
                      responsive: true,
                      striped: true,
                      hover: true,
                      // bordered: true,
                    }}
                    tableBodyProps={{
                      className: 'align-middle',
                    }}
                    scopedColumns={{
                      action: (item) => (
                        <td>
                          <CButton
                            className="d-flex align-items-center gap-2"
                            disabled={editUserResult.isLoading}
                            onClick={() => {
                              setSelectedUser({
                                email: item.email,
                                name: item.name,
                                membership: item.membership,
                                start_date: item.start_date,
                                end_date: item.end_date,
                                status: item.status,
                              })
                              setShowInfoModel(true)
                            }}
                            variant="outline"
                            color="primary"
                          >
                            {editUserResult.isLoading ? (
                              <CSpinner color="primary" />
                            ) : (
                              <>
                                <CIcon icon={cilZoom} height={24}></CIcon>
                                {`Show`}
                              </>
                            )}
                          </CButton>
                        </td>
                      ),
                      status: (item) => (
                        <td>
                          <CBadge color={getBadge(item.status)}>{item.status.toUpperCase()}</CBadge>
                        </td>
                      ),
                      membership: (item) => (
                        <td>{ffusers[item.membership].plan || 'Uknown Membership'}</td>
                      ),
                      // amount_rest_topay: (item) => (
                      //   <td className=" fw-bold px-3">
                      //     <CBadge
                      //       color="danger"
                      //       className="fs-6 fw-bold text-nowrap"
                      //       textColor="light"
                      //     >
                      //       {`${Intl.NumberFormat().format(parseFloat(`${item.amount_rest_topay}`)) || '0'} `}
                      //       <sub>DA</sub>
                      //     </CBadge>
                      //   </td>
                      // ),
                      // paid_amount: (item) => (
                      //   <td className=" fw-bold px-3">
                      //     <CBadge
                      //       color="success"
                      //       className="fs-6 fw-bold text-nowrap"
                      //       textColor="light"
                      //     >
                      //       {`${Intl.NumberFormat().format(parseFloat(`${item.paid_amount}`)) || '0'} `}
                      //       <sub>DA</sub>
                      //     </CBadge>
                      //   </td>
                      // ),
                      // flexy_amount: (item) => (
                      //   <td className=" fw-bold px-3">
                      //     <CBadge
                      //       color="secondary"
                      //       className="fs-6 fw-bold text-nowrap"
                      //       textColor="light"
                      //     >
                      //       {`${Intl.NumberFormat().format(parseFloat(`${item.flexy_amount}`)) || '0'} `}
                      //       <sub>DA</sub>
                      //     </CBadge>
                      //   </td>
                      // ),
                      // amount_topay: (item) => (
                      //   <td className=" fw-bold px-3">
                      //     <CBadge
                      //       color="secondary"
                      //       className="fs-6 fw-bold text-nowrap"
                      //       textColor="light"
                      //     >
                      //       {`${Intl.NumberFormat().format(parseFloat(`${item.amount_topay}`)) || '0'} `}
                      //       <sub>DA</sub>
                      //     </CBadge>
                      //   </td>
                      // ),
                      // percentage: (item) => (
                      //   <td className=" fw-bold px-3">{`${item.percentage} %`}</td>
                      // ),
                    }}
                    sorterValue={{
                      column: 'id',
                      state: 'desc',
                    }}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </>
      )}
      {isLoading && !isError && <CSpinner color="primary" />}
      {isError && (
        <>
          <CRow className="align-items-center justify-content-center">
            <h4 className="fw-bold text-secondary text-center ">Error While Fetching The Data</h4>
            <CIcon className="text-secondary text-center" height={64} icon={cilFaceDead} />
          </CRow>
        </>
      )}
    </>
  )
}
export default ManageAdmins
