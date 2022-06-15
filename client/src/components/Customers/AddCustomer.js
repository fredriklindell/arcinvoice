/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import withStyles from '@mui/styles/withStyles'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

import { useDispatch, useSelector } from 'react-redux'
import { createCustomer, updateCustomer } from '../../actions/customer-actions'
import { useSnackbar } from 'react-simple-snackbar'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    p: 1,
    pl: 2,
    backgroundColor: '#1976D2',
    marginLeft: 0,
    color: 'white',
  },
  closeButton: {
    color: 'white',
  },
}

const AddCustomer = ({ setOpen, open, currentId, setCurrentId }) => {
  const location = useLocation()
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    userId: '',
  })
  const { user } = useSelector((state) => state?.auth)
  const dispatch = useDispatch()
  const customer = useSelector((state) =>
    currentId
      ? state.customers.customers.find((c) => c._id === currentId)
      : null
  )
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar()

  useEffect(() => {
    if (customer) {
      setCustomerData(customer)
    }
  }, [customer])

  useEffect(() => {
    var checkId = user?._id
    if (checkId !== undefined) {
      setCustomerData({ ...customerData, userId: [checkId] })
    } else {
      setCustomerData({ ...customerData, userId: [user?.googleId] })
    }
  }, [location])

  const handleSubmitCustomer = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updateCustomer(currentId, customerData, openSnackbar))
    } else {
      dispatch(createCustomer(customerData, openSnackbar))
    }

    clear()
    handleClose()
  }

  const clear = () => {
    setCurrentId(null)
    setCustomerData({ name: '', email: '', phone: '', address: '', userId: [] })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const inputStyle = {
    display: 'block',
    padding: '1.4rem 0.75rem',
    width: '100%',
    fontSize: '0.8rem',
    lineHeight: 1.25,
    color: '#55595c',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    backgroundClip: 'padding-box',
    borderTop: '0',
    borderRight: '0',
    borderBottom: '1px solid #eee',
    borderLeft: '0',
    borderRadius: '3px',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 1, 1)',
  }

  return (
    <div>
      <form>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            sx={styles.root}
          >
            <Typography>
              {currentId ? 'Edit Customer' : 'Add new Customer'}
            </Typography>
            <IconButton
              aria-label="close"
              sx={styles.closeButton}
              onClick={handleClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <div className="customInputs">
              <input
                placeholder="Name"
                style={inputStyle}
                name="name"
                type="text"
                onChange={(e) =>
                  setCustomerData({ ...customerData, name: e.target.value })
                }
                value={customerData.name}
              />

              <input
                placeholder="Email"
                style={inputStyle}
                name="email"
                type="text"
                onChange={(e) =>
                  setCustomerData({ ...customerData, email: e.target.value })
                }
                value={customerData.email}
              />

              <input
                placeholder="Phone"
                style={inputStyle}
                name="phone"
                type="text"
                onChange={(e) =>
                  setCustomerData({ ...customerData, phone: e.target.value })
                }
                value={customerData.phone}
              />

              <input
                placeholder="Address"
                style={inputStyle}
                name="address"
                type="text"
                onChange={(e) =>
                  setCustomerData({ ...customerData, address: e.target.value })
                }
                value={customerData.address}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitCustomer} variant="contained">
              Save Customer
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}

export default AddCustomer
