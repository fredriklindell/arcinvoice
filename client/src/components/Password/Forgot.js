import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Paper, Typography, Container, Grid } from '@mui/material'
import styles from './styles'
import Field from '../Login/Field'
import { forgot } from '../../actions/auth-actions'
import cssStyles from './Password.module.css'

const Forgot = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState('')
  const [step, setStep] = useState(0)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state?.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(forgot({ email: form }))
    window.navigator.onLine ? setStep(1) : setStep(2)
  }

  const handleChange = (e) => setForm(e.target.value)

  if (user) navigate('/dashboard')

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <Container component="main" maxWidth="xs">
        <Paper sx={styles.paper} variant="outlined">
          {step === 0 && (
            <div>
              <Typography variant="h6" gutter="5">
                Please enter your email address
              </Typography>
              <form
                sx={styles.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Field
                    name="email"
                    label="Email Address"
                    handleChange={handleChange}
                    type="email"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={styles.submit}
                  >
                    {' '}
                    Submit{' '}
                  </Button>
                </Grid>
              </form>
            </div>
          )}

          {step === 1 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {' '}
                <i
                  className="fas fa-check-circle"
                  style={{ fontSize: '55px', color: '#3e6947' }}
                ></i>
              </div>
              <br />
              <p>
                A password reset link has been sent to your email. Please follow
                the link to reset your password
              </p>
              <div className={cssStyles.buttons}>
                <button
                  className={cssStyles.button}
                  onClick={() => navigate('/')}
                >
                  Back to home
                </button>
                <button className={cssStyles.button} onClick={() => setStep(0)}>
                  Resend link
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {' '}
                <i
                  className="fas fa-check-circle"
                  style={{ fontSize: '55px', color: '#3e6947' }}
                ></i>
              </div>
              <br />
              <p>Please check your internet connection and try again</p>
              <div className={cssStyles.buttons}>
                <button
                  className={cssStyles.button}
                  onClick={() => navigate('/')}
                >
                  Back to home
                </button>
                <button className={cssStyles.button} onClick={() => setStep(0)}>
                  Resend link
                </button>
              </div>
            </div>
          )}
        </Paper>
      </Container>
    </div>
  )
}

export default Forgot
