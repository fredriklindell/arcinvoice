import React, { useState, useEffect } from 'react'
import cssStyles from './Invoice.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { toCommas } from '../../utils/utils'

import IconButton from '@mui/material/IconButton'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  Avatar,
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { initialState } from '../../initialState'
import currencies from '../../currencies.json'
import {
  createInvoice,
  getInvoice,
  updateInvoice,
} from '../../actions/invoice-actions'
import { getCustomersByCompany } from '../../actions/customer-actions'
import { getCompanyByUser } from '../../actions/company-actions'
// import AddCustomer from './AddCustomer'
import AddCustomer from './../Customers/AddCustomer'
import InvoiceType from './InvoiceType'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const styles = {
  root: {
    display: 'flex',
    '& > *': {
      m: 1,
    },
  },
  large: {
    width: 100,
    height: 100,
  },
  table: {
    minWidth: '650px',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    pt: 1,
    pl: 5,
    pr: 1,
    pb: 1,
  },
}

const Invoice = () => {
  const location = useLocation()
  const [invoiceData, setInvoiceData] = useState(initialState)
  const [rates, setRates] = useState(0)
  const [vat, setVat] = useState(0)
  const [currency, setCurrency] = useState(currencies[0].value)
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(
    today.getTime() + 7 * 24 * 60 * 60 * 1000
  )
  const [customer, setCustomer] = useState(null)
  const [type, setType] = useState('Invoice')
  const [status, setStatus] = useState('')
  const { id } = useParams()
  const { customers } = useSelector((state) => state.customers)
  const { company } = useSelector((state) => state.companies)
  const { invoice } = useSelector((state) => state.invoices)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state?.auth)

  useEffect(() => {
    getTotalCount()
    // eslint-disable-next-line
  }, [location])

  const getTotalCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/invoices/count?searchQuery=${user?._id}`
      )
      //   console.log(response.data);
      //Get total count of invoice from the server and increment by one to serialized numbering of invoice
      console.log('FIDDE: Invoice: response: ', response)
      setInvoiceData({
        ...invoiceData,
        invoiceNumber: (Number(response.data) + 1).toString().padStart(3, '0'),
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(getInvoice(id))
    }
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    //    dispatch(getCustomersByCompany({ search: user?._id || user?.googleId }))
    // TODO: this should not be necessary
    dispatch(getCompanyByUser({ search: user?._id || user?.googleId }))
    // eslint-disable-next-line
  }, [dispatch])

  useEffect(() => {
    if (invoice) {
      //Automatically set the default invoice values as the ones in the invoice to be updated
      setInvoiceData(invoice)
      setRates(invoice.rates)
      setCustomer(invoice.customer)
      setType(invoice.type)
      setStatus(invoice.status)
      setSelectedDate(invoice.dueDate)
    }
  }, [invoice])

  useEffect(() => {
    if (type === 'Receipt') {
      setStatus('Paid')
    } else {
      setStatus('Unpaid')
    }
  }, [type])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleRates = (e) => {
    setRates(e.target.value)
    setInvoiceData((prevState) => ({ ...prevState, tax: e.target.value }))
  }

  // console.log(invoiceData)
  // Change handler for dynamically added input field
  const handleChange = (index, e) => {
    const values = [...invoiceData.items]
    values[index][e.target.name] = e.target.value
    setInvoiceData({ ...invoiceData, items: values })
  }

  useEffect(() => {
    //Get the subtotal
    const subTotal = () => {
      var arr = document.getElementsByName('amount')
      var subtotal = 0
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value) {
          subtotal += +arr[i].value
        }
        // document.getElementById("subtotal").value = subtotal;
        setSubTotal(subtotal)
      }
    }

    subTotal()
  }, [invoiceData])

  useEffect(() => {
    const total = () => {
      //Tax rate is calculated as (input / 100 ) * subtotal + subtotal
      const overallSum = (rates / 100) * subTotal + subTotal
      //VAT is calculated as tax rates /100 * subtotal
      setVat((rates / 100) * subTotal)
      setTotal(overallSum)
    }
    total()
  }, [invoiceData, rates, subTotal])

  const handleAddField = (e) => {
    e.preventDefault()
    setInvoiceData((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { itemName: '', unitPrice: '', quantity: '', discount: '', amount: '' },
      ],
    }))
  }

  const handleRemoveField = (index) => {
    const values = invoiceData.items
    values.splice(index, 1)
    setInvoiceData((prevState) => ({ ...prevState, values }))
    // console.log(values)
  }

  const handleSubmit = async (e) => {
    console.log('FIDDE: Invoice: handleSubmit: invoice', invoice)
    e.preventDefault()
    if (invoice) {
      dispatch(
        updateInvoice(invoice._id, {
          ...invoiceData,
          subTotal: subTotal,
          total: total,
          vat: vat,
          rates: rates,
          currency: currency,
          dueDate: selectedDate,
          customer,
          type: type,
          status: status,
        })
      )
      navigate(`/invoice/${invoice._id}`)
    } else {
      dispatch(
        createInvoice(
          {
            ...invoiceData,
            subTotal: subTotal,
            total: total,
            vat: vat,
            rates: rates,
            currency: currency,
            dueDate: selectedDate,
            invoiceNumber: `${invoiceData.invoiceNumber < 100
              ? Number(invoiceData.invoiceNumber).toString().padStart(3, '0')
              : Number(invoiceData.invoiceNumber)
              }`,
            customer,
            type: type,
            status: status,
            paymentRecords: [],
            creator: [user?._id || user?.googleId],
          },
          navigate
        )
      )
    }

    // setInvoiceData(initialState)
  }

  const [open, setOpen] = useState(false)

  const CustomPaper = (props) => {
    return <Paper elevation={3} {...props} />
  }

  return (
    <div className={cssStyles.invoiceLayout}>
      <form onSubmit={handleSubmit} className="mu-form">
        <AddCustomer setOpen={setOpen} open={open} />
        <Container sx={styles.headerContainer}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {company && (
                <Avatar
                  alt="Logo"
                  variant="square"
                  src={company?.logo}
                  sx={styles.large}
                />
              )}
            </Grid>
            <Grid item>
              <InvoiceType type={type} setType={setType} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  pl: 1,
                }}
              >
                <Typography sx={{ mr: 1 }}>Invoice #:</Typography>
                <Box
                  sx={{
                    width: '100px',
                    p: 1,
                    display: 'inline-block',
                    backgroundColor: '#f4f4f4',
                    outline: '0px solid transparent',
                  }}
                  onInput={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      invoiceNumber: e.currentTarget.textContent,
                    })
                  }
                >
                  <span
                    style={{
                      width: '40px',
                      color: 'black',
                      padding: '15px',
                    }}
                  >
                    {' '}
                    {invoiceData.invoiceNumber}
                  </span>
                  <br />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <Container>
          <Grid
            container
            justifyContent="space-between"
            style={{ marginTop: '40px' }}
          >
            <Grid item style={{ width: '50%' }}>
              <Container>
                <Typography
                  variant="overline"
                  style={{ color: 'gray', paddingRight: '3px' }}
                  gutterBottom
                >
                  Bill to
                </Typography>

                {customer && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      {customer.name}
                    </Typography>
                    <Typography variant="body2">{customer.email}</Typography>
                    <Typography variant="body2">{customer.phone}</Typography>
                    <Typography variant="body2">{customer.address}</Typography>
                    <Button
                      color="primary"
                      size="small"
                      style={{ textTransform: 'none' }}
                      onClick={() => setCustomer(null)}
                    >
                      Change
                    </Button>
                  </>
                )}
                <div
                  style={customer ? { display: 'none' } : { display: 'block' }}
                >
                  <Autocomplete
                    options={customers || []}
                    getOptionLabel={(option) => option.name}
                    PaperComponent={CustomPaper}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required={true}
                        label="Select Customer"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                    value={customer?.name}
                    onChange={(_, value) => setCustomer(value)}
                  />
                </div>
                {!customer && (
                  <>
                    <Grid item style={{ paddingBottom: '10px' }}>
                      <Chip
                        avatar={<Avatar>+</Avatar>}
                        label="New Customer"
                        onClick={() => setOpen(true)}
                        variant="outlined"
                      />
                    </Grid>
                  </>
                )}
              </Container>
            </Grid>

            <Grid item style={{ marginRight: 20, textAlign: 'right' }}>
              <Typography
                variant="overline"
                style={{ color: 'gray' }}
                gutterBottom
              >
                Status
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: type === 'Receipt' ? 'green' : 'red' }}
              >
                {type === 'Receipt' ? 'Paid' : 'Unpaid'}
              </Typography>
              <Typography
                variant="overline"
                style={{ color: 'gray' }}
                gutterBottom
              >
                Date
              </Typography>
              <Typography variant="body2" gutterBottom>
                {moment().format('MMM Do YYYY')}
              </Typography>
              <Typography
                variant="overline"
                style={{ color: 'gray' }}
                gutterBottom
              >
                Due Date
              </Typography>
              <Typography variant="body2" gutterBottom>
                {selectedDate
                  ? moment(selectedDate).format('MMM Do YYYY')
                  : '27th Sep 2021'}
              </Typography>
              <Typography variant="overline" gutterBottom>
                Amount
              </Typography>
              <Typography variant="h6" gutterBottom>
                {currency} {toCommas(total)}
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <div>
          <TableContainer component={Paper} className="tb-container">
            <Table sx={styles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Disc(%)</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceData.items.map((itemField, index) => (
                  <TableRow key={index}>
                    <TableCell scope="row" style={{ width: '40%' }}>
                      {' '}
                      <InputBase
                        style={{ width: '100%' }}
                        outline="none"
                        sx={{ ml: 1, flex: 1 }}
                        type="text"
                        name="itemName"
                        onChange={(e) => handleChange(index, e)}
                        value={itemField.itemName}
                        placeholder="Item name or description"
                      />{' '}
                    </TableCell>
                    <TableCell align="right">
                      {' '}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="quantity"
                        onChange={(e) => handleChange(index, e)}
                        value={itemField.quantity}
                        placeholder="0"
                      />{' '}
                    </TableCell>
                    <TableCell align="right">
                      {' '}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="unitPrice"
                        onChange={(e) => handleChange(index, e)}
                        value={itemField.unitPrice}
                        placeholder="0"
                      />{' '}
                    </TableCell>
                    <TableCell align="right">
                      {' '}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="discount"
                        onChange={(e) => handleChange(index, e)}
                        value={itemField.discount}
                        placeholder="0"
                      />{' '}
                    </TableCell>
                    <TableCell align="right">
                      {' '}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="amount"
                        onChange={(e) => handleChange(index, e)}
                        value={
                          itemField.quantity * itemField.unitPrice -
                          (itemField.quantity *
                            itemField.unitPrice *
                            itemField.discount) /
                          100
                        }
                        disabled
                      />{' '}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleRemoveField(index)}
                        size="large"
                      >
                        <DeleteOutlineRoundedIcon
                          style={{ width: '20px', height: '20px' }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={cssStyles.addButton}>
            <button onClick={handleAddField}>+</button>
          </div>
        </div>

        <div className={cssStyles.invoiceSummary}>
          <div className={cssStyles.summary}>Invoice Summary</div>
          <div className={cssStyles.summaryItem}>
            <p>Sub total:</p>
            <h4>{subTotal}</h4>
          </div>
          <div className={cssStyles.summaryItem}>
            <p>VAT(%):</p>
            <h4>{vat}</h4>
          </div>
          <div className={cssStyles.summaryItem}>
            <p>Total</p>
            <h4 style={{ color: 'black', fontSize: '18px', lineHeight: '8px' }}>
              {currency} {toCommas(total)}
            </h4>
          </div>
        </div>

        <div className={cssStyles.toolBar}>
          <Container>
            <Grid container>
              <Grid
                item
                style={{ marginTop: 16, marginBottom: 8, marginRight: 10 }}
              >
                <TextField
                  type="text"
                  step="any"
                  name="rates"
                  id="rates"
                  value={rates}
                  onChange={handleRates}
                  placeholder="e.g 10"
                  label="Tax Rates(%)"
                  variant="standard"
                />
              </Grid>
              <Grid
                item
                style={{ marginTop: 16, marginBottom: 8, marginRight: 10 }}
              >
                <DatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  variant="outline"
                  label="Due paid"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                />
              </Grid>
              <Grid item style={{ width: 270, marginRight: 10 }}>
                <Autocomplete
                  id="currency-select-box"
                  options={currencies}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Select currency"
                      margin="normal"
                    />
                  )}
                  value={currency.value}
                  onChange={(_, value) => setCurrency(value.value)}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className={cssStyles.note}>
          <h4>Note/Payment Info</h4>
          <textarea
            style={{ border: 'solid 1px #d6d6d6', padding: '10px' }}
            placeholder="Provide additional details or terms of service"
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, notes: e.target.value })
            }
            value={invoiceData.notes}
          />
        </div>

        <Grid sx={{ mt: 4 }} container justifyContent="center">
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            sx={styles.button}
            startIcon={<SaveIcon />}
          >
            Save and Continue
          </Button>
        </Grid>
      </form>
    </div>
  )
}

export default Invoice
