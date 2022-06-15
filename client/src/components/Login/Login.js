import React, { useState } from 'react'
import Field from './Field'
import styles from './styles'
import cssStyles from './Login.module.css'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { signup, signin } from '../../actions/auth-actions'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createCompany } from '../../actions/company-actions'
import { useSnackbar } from 'react-simple-snackbar'
import CircularProgress from '@mui/material/CircularProgress'
import jwt_decode from 'jwt-decode'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePicture: '',
  bio: '',
}

const Login = () => {
  const [formData, setFormData] = useState(initialState)
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signup(formData, openSnackbar, setLoading, navigate))
    } else {
      dispatch(signin(formData, openSnackbar, setLoading, navigate))
    }
    setLoading(true)
  }

  const switchMode = () => {
    setIsSignup((prevState) => !prevState)
  }

  // TODO: why is this not in the auth actions?
  const googleSuccess = async (res) => {
    const result = jwt_decode(res?.credential)
    const token = res?.credential
    dispatch(
      createCompany({
        name: result?.name,
        email: result?.email,
        userId: result?.sub,
        phoneNumber: '',
        businessName: '',
        contactAddress: '',
        logo: result?.picture,
        website: '',
      })
    )

    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  const googleError = (error) => {
    console.log(error)
    console.log('Google Sign In was unseccassful. Try again later')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={styles.paper} elevation={2}>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form style={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Field
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Field
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Field
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Field
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Field
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <div className={cssStyles.buttons}>
            <div>
              {/* <button className={cssStyles.submitBtn}> { isSignup ? 'Sign Up' : 'Sign In' }</button> */}
              {/* <ProgressButton>{ isSignup ? 'Sign Up' : 'Sign In' }</ProgressButton> */}
              {loading ? (
                <CircularProgress />
              ) : (
                <button className={cssStyles.loginBtn}>
                  {isSignup ? 'Sign Up' : 'Sign In'}
                </button>
              )}
            </div>
            <div>
              <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
            </div>
          </div>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
          <Link to="forgot">
            <p
              style={{
                textAlign: 'center',
                color: '#1d7dd6',
                marginTop: '20px',
              }}
            >
              Forgotten Password?
            </p>
          </Link>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
