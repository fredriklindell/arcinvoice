import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    m: 1,
    minWidth: '120px',
  },
};

const InvoiceType = ({ type, setType }) => {
  const [open, setOpen] = React.useState(false);


  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p style={{ paddingLeft: '8px', paddingTop: '10px', color: 'gray' }}>Select type</p>
      <Button sx={{ lineSpacing: 1, fontSize: 35, fontWeight: 700, color: 'black' }} onClick={handleClickOpen}>{type ? type : 'Invoice'}</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        {/* <DialogTitle>Fill the form</DialogTitle> */}
        <DialogContent>
          <div className={styles.container}>
            <FormControl sx={styles.formControl}>
              <InputLabel id="demo-dialog-select-label">Select Tpye</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={type}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                <MenuItem value="Invoice">Invoice</MenuItem>
                <MenuItem value="Receipt">Receipt</MenuItem>
                <MenuItem value="Estimate">Estimate</MenuItem>
                <MenuItem value="Bill">Bill</MenuItem>
                <MenuItem value="Quotation">Quotation</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InvoiceType
