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
import { createCompany, updateCompany } from '../../../actions/company-actions'
import { useSnackbar } from 'react-simple-snackbar'

const stylesOld = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#1976D2',
    marginLeft: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  },
})

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

const AddCompany = ({ setOpen, open, currentId, setCurrentId }) => {
  const location = useLocation()
  const [companyData, setCompanyData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    userId: '',
  })
  const { user } = useSelector((state) => state?.auth)
  const dispatch = useDispatch()
  const company = useSelector((state) =>
    currentId
      ? state.companies.companies.find((c) => c._id === currentId)
      : null
  )
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar()

  useEffect(() => {
    if (company) {
      setCompanyData(company)
    }
  }, [company])

  useEffect(() => {
    var checkId = user?._id
    if (checkId !== undefined) {
      setCompanyData({ ...companyData, userId: [checkId] })
    } else {
      setCompanyData({ ...companyData, userId: [user?.googleId] })
    }
  }, [location])

  const handleSubmitCompany = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updateCompany(currentId, companyData, openSnackbar))
    } else {
      dispatch(createCompany(companyData, openSnackbar))
    }

    clear()
    handleClose()
  }

  const clear = () => {
    setCurrentId(null)
    setCompanyData({ name: '', email: '', phone: '', address: '', userId: [] })
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
              {currentId ? 'Edit Company' : 'Add new Company'}
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
                  setCompanyData({ ...companyData, name: e.target.value })
                }
                value={companyData.name}
              />

              <input
                placeholder="Email"
                style={inputStyle}
                name="email"
                type="text"
                onChange={(e) =>
                  setCompanyData({ ...companyData, email: e.target.value })
                }
                value={companyData.email}
              />

              <input
                placeholder="Phone"
                style={inputStyle}
                name="phone"
                type="text"
                onChange={(e) =>
                  setCompanyData({ ...companyData, phone: e.target.value })
                }
                value={companyData.phone}
              />

              <input
                placeholder="Address"
                style={inputStyle}
                name="address"
                type="text"
                onChange={(e) =>
                  setCompanyData({ ...companyData, address: e.target.value })
                }
                value={companyData.address}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitCompany} variant="contained">
              Save Company
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}

export default AddCompany
