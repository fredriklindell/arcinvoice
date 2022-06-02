import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Container from '@mui/material/Container'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useLocation } from 'react-router-dom';

import { deleteInvoice, getInvoicesByUser } from '../../actions/invoiceActions';
import NoData from '../svgIcons/NoData';
import Spinner from '../Spinner/Spinner'
import { useSnackbar } from 'react-simple-snackbar'
import { Box } from '@mui/system';

const styles = {
  root: {
    flexShrink: 0,
    ml: 2.5,
  },
  table: {
    minWidth: '500px',
  },

  tablecell: {
    fontSize: '16px'
  }
};

const TablePaginationActions = (props) => {

  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={styles.root} >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="large">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="large">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="large">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="large">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const tableStyle = { width: '160px', fontSize: '14px', cursor: 'pointer', borderBottom: 'none', padding: '8px', textAlign: 'center' }
const headerStyle = { borderBottom: 'none', textAlign: 'center' }


const Invoices = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const rows = useSelector(state => state.invoices.invoices)
  const isLoading = useSelector(state => state.invoices.isLoading)
  // eslint-disable-next-line 
  const [openSnackbar, closeSnackbar] = useSnackbar()

  // const rows = []


  // useEffect(() => {
  //     dispatch(getInvoices());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getInvoicesByUser({ search: user?.result?._id || user?.result?.googleId }));
    // eslint-disable-next-line
  }, [location])


  const toCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows.length);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const editInvoice = (id) => {
    navigate(`/edit/invoice/${id}`)
  }

  const openInvoice = (id) => {
    navigate(`/invoice/${id}`)
  }

  if (!user) {
    navigate('/login')
  }

  function checkStatus(status) {
    return status === "Partial" ? { border: 'solid 0px #1976d2', backgroundColor: '#baddff', padding: '8px 18px', borderRadius: '20px' }
      : status === "Paid" ? { border: 'solid 0px green', backgroundColor: '#a5ffcd', padding: '8px 18px', borderRadius: '20px' }
        : status === "Unpaid" ? { border: 'solid 0px red', backgroundColor: '#ffaa91', padding: '8px 18px', borderRadius: '20px' }
          : "red";

  }

  if (isLoading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px' }}>
      <Spinner />
    </div>
  }

  if (rows.length === 0) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px' }}>
      <NoData />
      <p style={{ padding: '40px', color: 'gray', textAlign: 'center' }}>No invoice yet. Click the plus icon to create invoice</p>

    </div>
  }

  return (
    <div>
      <Container sx={{ width: '85%', paddingTop: '70px', paddingBottom: '50px', border: 'none' }} >
        <TableContainer component={Paper} elevation={0}>
          <Table sx={styles.table} aria-label="custom pagination table">

            <TableHead>
              <TableRow>
                <TableCell sx={headerStyle}>Number</TableCell>
                <TableCell sx={headerStyle}>Client</TableCell>
                <TableCell sx={headerStyle}>Amount</TableCell>
                <TableCell sx={headerStyle}>Due Date</TableCell>
                <TableCell sx={headerStyle}>Status</TableCell>
                <TableCell sx={headerStyle}>Edit</TableCell>
                <TableCell sx={headerStyle}>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row._id} style={{ cursor: 'pointer' }} >
                  <TableCell sx={tableStyle} onClick={() => openInvoice(row._id)}> {row.invoiceNumber} </TableCell>
                  <TableCell sx={tableStyle} onClick={() => openInvoice(row._id)} > {row.client.name} </TableCell>
                  <TableCell sx={tableStyle} onClick={() => openInvoice(row._id)} >{row.currency} {row.total ? toCommas(row.total) : row.total} </TableCell>
                  <TableCell sx={tableStyle} onClick={() => openInvoice(row._id)} > {moment(row.dueDate).fromNow()} </TableCell>
                  <TableCell sx={tableStyle} onClick={() => openInvoice(row._id)} > <button style={checkStatus(row.status)}>{row.status}</button></TableCell>

                  <TableCell style={{ ...tableStyle, width: '10px' }}>
                    <IconButton onClick={() => editInvoice(row._id)} size="large">
                      <BorderColorIcon style={{ width: '20px', height: '20px' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell style={{ ...tableStyle, width: '10px' }}>
                    <IconButton
                      onClick={() => dispatch(deleteInvoice(row._id, openSnackbar))}
                      size="large">
                      <DeleteOutlineRoundedIcon style={{ width: '20px', height: '20px' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Invoices
