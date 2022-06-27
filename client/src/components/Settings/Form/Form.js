/* eslint-disable */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { useSnackbar } from 'react-simple-snackbar'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import AddCompany from './AddCompany'
import {
  getCompaniesByUser,
//  updateCompany,
} from '../../../actions/company-actions'
import { getUsers } from '../../../actions/user-actions'
import Empty from '../../svgIcons/Empty'
import CompanyDetails from './CompanyDetails'
import ProfileDetails from './ProfileDetails'

const Form = () => {
  const { user } = useSelector((state) => state?.auth)
//  const [form, setForm] = useState(initialState)
  const location = useLocation()
  const dispatch = useDispatch()
  const { companies } = useSelector((state) => state.companies)
//  const [switchEdit, setSwitchEdit] = useState(0)
  //  const [companyDialogOpen, setCompanyDialogOpen] = useState(false)
  const [currentCompany, setCurrentCompany] = useState(null)

  // eslint-disable-next-line
  // const [openSnackbar, closeSnackbar] = useSnackbar()
  const [expanded, setExpanded] = useState(false)

  // TODO: update
  const initialState = {
    name: '',
    email: '',
    phoneNumber: '',
    name: '',
    contactAddress: '',
    logo: '',
    paymentDetails: '',
  }

  //  useEffect(() => {
  //    if (switchEdit === 1) {
  //      setForm(companies[0])
  //    }
  //  }, [switchEdit])

  useEffect(() => {
    dispatch(getCompaniesByUser({ search: user?._id || user?.googleId }))
    dispatch(getUsers())
    //  }, [location, switchEdit])
  }, [location])

  const handleAccordionChange = (panel) => (_, isExpanded) =>{
    setExpanded(isExpanded ? panel : false)
  }

  // localStorage.setItem('profileDetail', JSON.stringify({ ...companies[0] }))

  //  const handleSubmit = async (e) => {
  //    e.preventDefault()
  //    dispatch(updateCompany(companies[0]?._id, form, openSnackbar))
  //    setSwitchEdit(0)
  //  }
  //
  //  const handleChange = (e) =>
  //    setForm({ ...form, [e.target.name]: e.target.value })

  if (companies?.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingTop: '20px',
        }}
      >
        <Empty />
        <p style={{ color: 'gray' }}>
          Nothing to display. Click the plus icon to start creating
        </p>
      </Box>
    )
  }

  return (
    <>
      {currentCompany !== null ? (
        <AddCompany
          currentCompany={currentCompany}
          open={currentCompany !== null}
          setOpen={setCurrentCompany}
        />
      ) : null}
      <Container component="main" maxWidth="sm">
        <ProfileDetails user={user} />
      </Container>
      <Container component="main" maxWidth="sm">
        {companies.map((company, index) => (
          <CompanyDetails
            key={`company-details-key-${index}`}
            company={company}
            expanded={expanded}
            handleAccordionChange={handleAccordionChange}
            panelName={`panel${index}`}
            setCurrentCompany={setCurrentCompany}
          />
        ))}
      </Container>
    </>
  )
}

export default Form
