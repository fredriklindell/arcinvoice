/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'react-simple-snackbar'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Avatar, Box, Button, Paper, Grid, Container } from '@mui/material'
import Uploader from './Uploader'
import { getProfileByUser, updateProfile } from '../../../actions/profile'
import styles from './styles'
import Input from './Input'
import ProfileDetail from './Profile'

const Form = () => {
  const { user } = useSelector((state) => state?.auth)
  const initialState = {
    name: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    contactAddress: '',
    logo: '',
    paymentDetails: '',
  }

  const [form, setForm] = useState(initialState)
  const location = useLocation()
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.profiles)
  const [switchEdit, setSwitchEdit] = useState(0)

  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar()

  useEffect(() => {
    if (switchEdit === 1) {
      setForm(profile)
    }
  }, [switchEdit])

  useEffect(() => {
    dispatch(getProfileByUser({ search: user?._id || user?.googleId }))
  }, [location, switchEdit])

  localStorage.setItem('profileDetail', JSON.stringify({ ...profile }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateProfile(profile?._id, form, openSnackbar))
    setSwitchEdit(0)
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  if (profile === null) {
    return null
  }

  return (
    <div>
      {switchEdit === 0 && (
        <Container component="main" maxWidth="sm">
          <Paper sx={styles.paper} elevation={0}>
            <ProfileDetail profile={profile} />
            <Button
              variant="outlined"
              sx={{ margin: '30px', padding: '15px 30px' }}
              onClick={() => setSwitchEdit(1)}
            >
              Edit Profile
            </Button>
          </Paper>
        </Container>
      )}

      {switchEdit === 1 && (
        <Container component="main" maxWidth="sm">
          <Paper sx={styles.paper} elevation={1}>
            <Box sx={styles.avatarContainer}>
              <Avatar
                src={profile?.logo}
                alt=""
                sx={{ width: '100px', height: '100px', ...styles.avatar }}
              />
            </Box>
            <form style={styles.form} onSubmit={handleSubmit}>
              <Grid sx={{ mt: 0 }} container spacing={2}>
                <Uploader form={form} setForm={setForm} />
                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
                  half
                  value={form?.email}
                />
                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  handleChange={handleChange}
                  type="text"
                  half
                  value={form?.phoneNumber}
                />
                <Input
                  name="businessName"
                  label="Business Name"
                  handleChange={handleChange}
                  type="text"
                  value={form?.businessName}
                />
                <Input
                  name="contactAddress"
                  label="Contact Address"
                  handleChange={handleChange}
                  type="text"
                  value={form?.contactAddress}
                />
                <Input
                  name="paymentDetails"
                  label="Payment Details/Notes"
                  handleChange={handleChange}
                  type="text"
                  multiline
                  rows="4"
                  value={form?.paymentDetails}
                />
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ marginTop: '30px', padding: '15px 30px' }}
              >
                Update Settings
              </Button>
            </form>
          </Paper>
        </Container>
      )}
    </div>
  )
}

export default Form
