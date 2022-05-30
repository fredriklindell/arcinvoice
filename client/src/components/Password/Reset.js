import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Typography, Container, Grid } from '@mui/material';
import styles from './styles';
import Field from '../Login/Field';
import { useParams, useNavigate } from 'react-router-dom'

import { reset } from '../../actions/auth';

const Reset = () => {
  const [form, setForm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { token } = useParams()
  const user = JSON.parse(localStorage.getItem('profile'))

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(reset({ password: form, token: token }, navigate))
  }

  const handleChange = (e) => setForm(e.target.value);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);


  if (user) navigate('/dashboard')

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <Container component="main" maxWidth="xs">
        <Paper sx={styles.paper} variant="outlined">
          <Typography variant="h6" gutter="5">Please enter your new password</Typography>

          <form className={styles.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Field name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              <Button type="submit" fullWidth variant="contained" color="primary" sx={styles.submit}>
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>

  );
}

export default Reset
