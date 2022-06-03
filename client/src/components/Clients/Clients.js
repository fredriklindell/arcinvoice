import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cssStyles from './Clients.module.css'
// import moment from 'moment'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/system/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import Container from '@mui/material/Container'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { Button } from '@mui/material'
import { useSnackbar } from 'react-simple-snackbar'

import { deleteClient } from '../../actions/clientActions'

const styles = {
  root: {
    flexShrink: 0,
    ml: 2.5,
  },
  table: {
    minWidth: '500px',
  },
  tablecell: {
    fontSize: '16px',
  },
}

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={styles.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="large"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="large"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="large"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="large"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

const Clients = ({ setOpen, setCurrentId }) => {
  const { clients } = useSelector((state) => state.clients)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  // eslint-disable-next-line
  const [openSnackbar] = useSnackbar()

  const dispatch = useDispatch()

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleEdit = (selectedInvoice) => {
    setOpen((prevState) => !prevState)
    setCurrentId(selectedInvoice)
  }

  const tableStyle = {
    width: '160px',
    fontSize: '14px',
    cursor: 'pointer',
    borderBottom: 'none',
    padding: '8px',
    textAlign: 'center',
  }
  const headerStyle = { borderBottom: 'none', textAlign: 'center' }

  return (
    <Box className={cssStyles.pageLayout}>
      <Container sx={{ width: '85%' }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={styles.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...headerStyle, width: '10px' }}>
                  Number
                </TableCell>
                <TableCell sx={headerStyle}>Name</TableCell>
                <TableCell sx={headerStyle}>Email</TableCell>
                <TableCell sx={headerStyle}>Phone</TableCell>
                <TableCell sx={headerStyle}>Edit</TableCell>
                <TableCell sx={headerStyle}>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clients.map((row, index) => (
                <TableRow key={row._id} styel={{ cursor: 'pointer' }}>
                  <TableCell sx={{ ...tableStyle, width: '10px' }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={tableStyle} scope="row">
                    {' '}
                    <Button style={{ textTransform: 'none' }}>
                      {' '}
                      {row.name}{' '}
                    </Button>
                  </TableCell>
                  <TableCell sx={tableStyle}>{row.email}</TableCell>
                  <TableCell sx={tableStyle}>{row.phone}</TableCell>
                  <TableCell sx={{ ...tableStyle, width: '10px' }}>
                    <IconButton
                      onClick={() => handleEdit(row._id)}
                      size="large"
                    >
                      <BorderColorIcon sx={{ width: '20px', height: '20px' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ ...tableStyle, width: '10px' }}>
                    <IconButton
                      onClick={() =>
                        dispatch(deleteClient(row._id, openSnackbar))
                      }
                      size="large"
                    >
                      <DeleteOutlineRoundedIcon
                        sx={{ width: '20px', height: '20px' }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={clients.length}
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
    </Box>
  )
}

export default Clients
