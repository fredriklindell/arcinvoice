import React from 'react';
import { TextField, Grid } from '@mui/material';

const Input = ({ name, handleChange, label, half, autoFocus, type, value, multiline, sx, rows }) => (
  <Grid item sx={sx} xs={12} sm={half ? 6 : 12}>
    <TextField
      value={value}
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      multiline={multiline}
      rows={rows}
    />
  </Grid>
);

export default Input;
