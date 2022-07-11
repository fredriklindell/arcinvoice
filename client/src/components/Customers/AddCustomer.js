/* eslint-disable */
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

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
  form: {
    padding: 0,
  },
}

//const AddCustomer = ({ setOpen, open, currentCustomer, setCurrentCustomer }) => {
//  const location = useLocation()
//  //  const [customerData, setCustomerData] = useState({
//  //    name: '',
//  //    email: '',
//  //    phone: '',
//  //    address: '',
//  //    userId: '',
//  //  })
//  const { user } = useSelector((state) => state?.auth)
//  const dispatch = useDispatch()
//  const customer = useSelector((state) =>
//    currentId
//      ? state.customers.customers.find((c) => c._id === currentId)
//      : null
//  )
//  const { control, handleSubmit } = useForm({
//    defaultValues: {
//      name: customer?.name || '',
//      email: customer?.email || '',
//      phone: customer?.phone || '',
//      address: customer?.address || '',
//      userId: customer?.user?._id || user?._id || user?.googleId || '',
//    },
//  })
//
//  // eslint-disable-next-line
//  const [openSnackbar, closeSnackbar] = useSnackbar()
//
//  //  useEffect(() => {
//  //    if (customer) {
//  //      setCustomerData(customer)
//  //    }
//  //  }, [customer])
//
//  //  useEffect(() => {
//  //    var checkId = user?._id
//  //    if (checkId !== undefined) {
//  //      setCustomerData({ ...customerData, userId: [checkId] })
//  //    } else {
//  //      setCustomerData({ ...customerData, userId: [user?.googleId] })
//  //    }
//  //  }, [location])
//
//  const handleSubmitCustomer = (customerData) => {
//    if (currentId) {
//      dispatch(updateCustomer(currentId, customerData, openSnackbar))
//    } else {
//      dispatch(createCustomer(customerData, openSnackbar))
//    }
//
//    //    clear()
//    handleClose()
//  }
//
//  //  const clear = () => {
//  //    if (setCurrentId) {
//  //      setCurrentId(null)
//  //    }
//  //    // setCustomerData({ name: '', email: '', phone: '', address: '', userId: [] })
//  //  }
//
//  const handleClose = () => {
//    setOpen(false)
//  }
//
//  const inputStyle = {
//    display: 'block',
//    padding: '1.4rem 0.75rem',
//    width: '100%',
//    fontSize: '0.8rem',
//    lineHeight: 1.25,
//    color: '#55595c',
//    backgroundColor: '#fff',
//    backgroundImage: 'none',
//    backgroundClip: 'padding-box',
//    borderTop: '0',
//    borderRight: '0',
//    borderBottom: '1px solid #eee',
//    borderLeft: '0',
//    borderRadius: '3px',
//    transition: 'all 0.25s cubic-bezier(0.4, 0, 1, 1)',
//  }
//
//  return (
//    <div>
//      <Dialog
//        onClose={handleClose}
//        aria-labelledby="customized-dialog-title"
//        open={open}
//        fullWidth
//      >
//        <form style={styles.form} onSubmit={handleSubmit(handleSubmitCustomer)}>
//          <DialogTitle
//            id="customized-dialog-title"
//            onClose={handleClose}
//            sx={styles.root}
//          >
//            <Typography>
//              {currentId ? 'Edit Customer' : 'Add new Customer'}
//            </Typography>
//            <IconButton
//              aria-label="close"
//              sx={styles.closeButton}
//              onClick={handleClose}
//              size="large"
//            >
//              <CloseIcon />
//            </IconButton>
//          </DialogTitle>
//          <DialogContent dividers>
//            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//              <Controller
//                name="name"
//                control={control}
//                render={({ field, fieldState }) => {
//                  return (
//                    <TextField
//                      disabled={currentId !== undefined}
//                      sx={{ mt: 4, mb: 4 }}
//                      {...field}
//                      error={fieldState.error !== undefined}
//                      helperText={
//                        fieldState.error ? fieldState.error?.message : ''
//                      }
//                      variant="standard"
//                      label="Name"
//                    />
//                  )
//                }}
//                rules={{
//                  required: {
//                    message: 'This field can not be empty',
//                    value: true,
//                  },
//                }}
//              />
//
//              <Controller
//                name="email"
//                control={control}
//                render={({ field, fieldState }) => {
//                  return (
//                    <TextField
//                      sx={{ mb: 4 }}
//                      {...field}
//                      error={fieldState.error !== undefined}
//                      helperText={
//                        fieldState.error ? fieldState.error?.message : ''
//                      }
//                      variant="standard"
//                      label="Email"
//                    />
//                  )
//                }}
//                rules={{
//                  required: {
//                    message: 'This field can not be empty',
//                    value: true,
//                  },
//                }}
//              />
//
//              <Controller
//                name="phone"
//                control={control}
//                render={({ field, fieldState }) => {
//                  return (
//                    <TextField
//                      sx={{ mb: 4 }}
//                      {...field}
//                      error={fieldState.error !== undefined}
//                      helperText={
//                        fieldState.error ? fieldState.error?.message : ''
//                      }
//                      variant="standard"
//                      label="Phone"
//                    />
//                  )
//                }}
//                rules={{
//                  required: {
//                    message: 'This field can not be empty',
//                    value: true,
//                  },
//                }}
//              />
//
//              <Controller
//                name="address"
//                control={control}
//                render={({ field, fieldState }) => {
//                  return (
//                    <TextField
//                      sx={{ mb: 4 }}
//                      {...field}
//                      error={fieldState.error !== undefined}
//                      helperText={
//                        fieldState.error ? fieldState.error?.message : ''
//                      }
//                      variant="standard"
//                      label="Address"
//                    />
//                  )
//                }}
//                rules={{
//                  required: {
//                    message: 'This field can not be empty',
//                    value: true,
//                  },
//                }}
//              />
//            </Box>
//
//            {/*<div className="customInputs">
//              <input
//                placeholder="Name"
//                style={inputStyle}
//                name="name"
//                type="text"
//                onChange={(e) =>
//                  setCustomerData({ ...customerData, name: e.target.value })
//                }
//                value={customerData.name}
//              />
//
//              <input
//                placeholder="Email"
//                style={inputStyle}
//                name="email"
//                type="text"
//                onChange={(e) =>
//                  setCustomerData({ ...customerData, email: e.target.value })
//                }
//                value={customerData.email}
//              />
//
//              <input
//                placeholder="Phone"
//                style={inputStyle}
//                name="phone"
//                type="text"
//                onChange={(e) =>
//                  setCustomerData({ ...customerData, phone: e.target.value })
//                }
//                value={customerData.phone}
//              />
//
//              <input
//                placeholder="Address"
//                style={inputStyle}
//                name="address"
//                type="text"
//                onChange={(e) =>
//                  setCustomerData({ ...customerData, address: e.target.value })
//                }
//                value={customerData.address}
//              />
//            </div>*/}
//          </DialogContent>
//          <DialogActions>
//            <Button type="submit" variant="contained">
//              Save Customer
//            </Button>
//          </DialogActions>
//        </form>
//      </Dialog>
//    </div>
//  )
//}
//
//export default AddCustomer

//  customerNumber: Number,
//  name: String,
//  address: String,
//  zip: String,
//  city: String,
//  country: String,
//  businessRegistrationNumber: String,
//  // TODO: should below two be on the reference person instead?
//  phoneNumber: String,
//  email: String,
//  company: [
//    {
//      type: mongoose.Schema.Types.ObjectId,
//      ref: 'Company',
//    },
//  ],
//  references: [
//    {
//      type: mongoose.Schema.Types.ObjectId,
//      ref: 'CustomerReference',
//    },
//  ],
//  createdBy: {
//    type: mongoose.Schema.Types.ObjectId,
//    ref: 'User',
//  },
//  createdAt: {
//    type: Date,
//    default: new Date(),
//  },
//  updatedAt: {
//    type: Date,
//    default: new Date(),
//  },

const AddCustomer = ({
  setOpen,
  open,
  currentCustomer,
  setCurrentCustomer,
}) => {
  const { company } = useSelector((state) => state?.auth)
  //  const { users } = useSelector((state) => state?.users) // TODO: references
  const dispatch = useDispatch()
  const customer = useSelector((state) =>
    currentCustomer
      ? state.customers.customers.find((c) => c._id === currentCustomer._id)
      : null
  )

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: customer?.name || '',
      address: customer?.address || '',
      zip: customer?.zip || '',
      city: customer?.city || '',
      country: customer?.country || '',
      businessRegistrationNumber: customer?.businessRegistrationNumber || '',
      phoneNumber: customer?.phoneNumber || '',
      email: customer?.email || '',
      references: customer?.references || [], // TODO: Fix
      company: customer?.company._id || company._id,
    },
  })

  // eslint-disable-next-line
  const [openSnackbar] = useSnackbar()

  const handleSubmitCustomer = (customerData) => {
    if (currentCustomer !== undefined && currentCustomer !== null) {
      dispatch(
        updateCustomer(currentCustomer._id, customerData, openSnackbar)
      )
    } else {
      dispatch(
        createCustomer(customerData, openSnackbar)
      )
    }

    clear()
    handleClose()
  }

  const clear = () => {
    if (setCurrentCustomer) {
      // TOOD: reactivate
      // setCurrentCustomer(null)
      setOpen(null)
    }
  }

  const handleClose = () => {
    // setOpen(false)
    setOpen(null)
  }

  return (
    <Dialog
      PaperProps={{
        component: 'form',
        onSubmit: (e) => {
          e.preventDefault()
          handleSubmit(handleSubmitCustomer)()
        },
      }}
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
          {currentCustomer?._id ? 'Edit Customer' : 'Add new Customer'}
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  disabled={currentCustomer?._id !== undefined}
                  sx={{ mt: 4, mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Name"
                />
              )
            }}
            rules={{
              required: {
                message: 'This field can not be empty',
                value: true,
              },
            }}
          />

          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Address"
                />
              )
            }}
            rules={{
              required: {
                message: 'This field can not be empty',
                value: true,
              },
            }}
          />

          <Controller
            name="zip"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Zip"
                />
              )
            }}
            rules={{
              required: {
                message: 'This field can not be empty',
                value: true,
              },
            }}
          />

          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="City"
                />
              )
            }}
            rules={{
              required: {
                message: 'This field can not be empty',
                value: true,
              },
            }}
          />

          <Controller
            name="country"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Country"
                />
              )
            }}
            rules={{
              required: {
                message: 'This field can not be empty',
                value: true,
              },
            }}
          />

          <Controller
            name="businessRegistrationNumber"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  disabled={currentCustomer?._id !== undefined}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Business registration number"
                />
              )
            }}
            rules={{
              required: {
                message: 'This field can not be empty',
                value: true,
              },
            }}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Phone number"
                />
              )
            }}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Email"
                />
              )
            }}
            rules={{
              required: {
                message: 'This field can not be empty',
                value: true,
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCustomer
