import 'date-fns';
import React from 'react';
import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MaterialUIPickers({ setSelectedDate, selectedDate }) {
  // The first commit of Material-UI


  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString());
  };

  return (
    <Grid container justifyContent="space-around" style={{ width: '97%', paddingLeft: '10px', paddingBottom: '15px' }}>
      <DatePicker
        fullWidth
        disableToolbar
        variant="outline"
        label="Date paid"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </Grid>
  );
}
