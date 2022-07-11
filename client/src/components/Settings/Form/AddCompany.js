/* eslint-disable */
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import {
  Autocomplete,
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
import { createCompany, updateCompany } from '../../../actions/company-actions'
import { useSnackbar } from 'react-simple-snackbar'
import DropzoneField from './DropzoneField'

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

//  name: String,
//  address: String,
//  zip: String,
//  city: String,
//  country: String,
//  phoneNumber: String,
//  email: {
//    type: String,
//    required: true,
//    unique: true,
//  },
//  logo: String,
//  invoiceDetails: String,
//  swish: String,
//  businessRegistrationNumber: {
//    type: String,
//    required: true,
//  },
//  website: String,
//  vatRegistrationNumber: String,
//  plusGiro: String,
//  bankGiro: String,
//  placeOfBusiness: String,
//  swift: String,
//  iban: String,
//  extraInfo: String,
//  bankName: String,
//  accountNumber: String,
//  overduePaymentInterest: Number,
//  termsOfPaymentDays: Number,
//  references: [
//    {
//      type: mongoose.Schema.Types.ObjectId,
//      ref: 'CompanyReference',
//    },
//  ],
//  user: {
//    type: mongoose.Schema.Types.ObjectId,
//    ref: 'User',
//  },

const AddCompany = ({ setOpen, open, currentCompany, setCurrentCompany }) => {
  const { user } = useSelector((state) => state?.auth)
  const { users } = useSelector((state) => state?.users)
  const dispatch = useDispatch()
  const company = useSelector((state) =>
    currentCompany
      ? state.companies.companies.find((c) => c._id === currentCompany._id)
      : null
  )
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: company?.name || '',
      address: company?.address || '',
      zip: company?.zip || '',
      city: company?.city || '',
      country: company?.country || '',
      phoneNumber: company?.phoneNumber || '',
      email: company?.email || '',
      logo: company?.logo || '',
      invoiceDetails: company?.invoiceDetails || '',
      swish: company?.swish || '',
      businessRegistrationNumber: company?.businessRegistrationNumber || '',
      website: company?.website || '',
      vatRegistrationNumber: company?.vatRegistrationNumber || '',
      plusGiro: company?.plusGiro || '',
      bankGiro: company?.bankGiro || '',
      placeOfBusiness: company?.placeOfBusiness || '',
      swift: company?.swift || '',
      iban: company?.iban || '',
      extraInfo: company?.extraInfo || '',
      bankName: company?.bankName || '',
      accountNumber: company?.accountNumber || '',
      overduePaymentInterest: company?.overduePaymentInterest || '',
      termsOfPaymentDays: company?.termsOfPaymentDays || '',
      references: company?.references || [], // TODO: Fix
      users: company?.users || [user] || [], // TODO: send whole user or only userId?
      isDefault: company?.isDefault || false,
    },
  })

  // eslint-disable-next-line
  const [openSnackbar] = useSnackbar()

  const handleSubmitCompany = (companyData) => {
    if (currentCompany !== undefined && currentCompany !== null) {
      dispatch(
        updateCompany(
          currentCompany._id,
          { ...companyData, users: companyData.users.map((user) => user._id) },
          openSnackbar
        )
      )
    } else {
      dispatch(
        createCompany(
          { ...companyData, users: companyData.users.map((user) => user._id) },
          openSnackbar
        )
      )
    }

    clear()
    handleClose()
  }

  const clear = () => {
    if (setCurrentCompany) {
      // TOOD: reactivate
      // setCurrentCompany(null)
      setOpen(null)
    }
    // setCompanyData({ name: '', email: '', phone: '', address: '', userId: [] })
  }

  const handleClose = () => {
    // setOpen(false)
    setOpen(null)
  }

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

  return (
    <Dialog
      PaperProps={{
        component: 'form',
        onSubmit: (e) => {
          e.preventDefault()
          handleSubmit(handleSubmitCompany)()
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
          {currentCompany?._id ? 'Edit Company' : 'Add new Company'}
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
          <DropzoneField name="logo" control={control} />

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  disabled={currentCompany?._id !== undefined}
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

          {/*<Controller
            name="logo"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Logo"
                />
              )
            }}
          />*/}

          <Controller
            name="invoiceDetails"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Invoice details"
                />
              )
            }}
          />

          <Controller
            name="swish"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Swish"
                />
              )
            }}
          />

          <Controller
            name="businessRegistrationNumber"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  disabled={currentCompany?._id !== undefined}
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
            name="website"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Website"
                />
              )
            }}
          />

          <Controller
            name="vatRegistrationNumber"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Vat Registration Number"
                />
              )
            }}
          />

          <Controller
            name="plusGiro"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Plusgrio"
                />
              )
            }}
          />

          <Controller
            name="bankGiro"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Bankgiro"
                />
              )
            }}
          />

          <Controller
            name="placeOfBusiness"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Place of Business"
                />
              )
            }}
          />

          <Controller
            name="swift"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="SWIFT"
                />
              )
            }}
          />

          <Controller
            name="iban"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="IBAN"
                />
              )
            }}
          />

          <Controller
            name="extraInfo"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Extra info"
                />
              )
            }}
          />

          <Controller
            name="bankName"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Bank name"
                />
              )
            }}
          />

          <Controller
            name="accountNumber"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  label="Account number"
                />
              )
            }}
          />

          <Controller
            name="overduePaymentInterest"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  type="number"
                  label="Overdue Payment Interest"
                />
              )
            }}
          />

          <Controller
            name="termsOfPaymentDays"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  sx={{ mb: 4 }}
                  {...field}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error ? fieldState.error?.message : ''}
                  variant="standard"
                  type="number"
                  label="Terms Of Payment Days"
                />
              )
            }}
          />

          <Controller
            name="users"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'You must select a User',
              },
            }}
            render={({ field: { onChange, value }, fieldState }) => {
              return (
                <Autocomplete
                  sx={{ mb: 4 }}
                  id="company-users-autocomplete"
                  disabled={currentCompany?._id === undefined}
                  options={users}
                  value={value}
                  onChange={(_, newValue) => {
                    onChange(newValue)
                  }}
                  getOptionLabel={(option) => {
                    return option.name
                  }}
                  isOptionEqualToValue={(option, value) => {
                    return option._id === value._id
                  }}
                  disableClearable
                  filterSelectedOptions
                  multiple
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Users"
                      error={fieldState.error !== undefined}
                      helperText={
                        fieldState.error ? fieldState.error?.message : ''
                      }
                    />
                  )}
                />
              )
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

export default AddCompany
