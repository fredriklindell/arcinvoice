import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fab, Action } from 'react-tiny-fab'
import 'react-tiny-fab/dist/styles.css'
import AddIcon from '@mui/icons-material/Add'
import CreateIcon from '@mui/icons-material/Create'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import AddCompany from '../Settings/Form/AddCompany'
import AddCustomer from '../Customers/AddCustomer'

const FabButton = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const mainButtonStyles = { backgroundColor: '#1976D2' }
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false)
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false)

  // if(location.pathname === '/invoice') return null

  return (
    <div>
      <AddCompany setOpen={setCompanyDialogOpen} open={companyDialogOpen} />
      <AddCustomer setOpen={setCustomerDialogOpen} open={customerDialogOpen} />
      <Fab
        mainButtonStyles={mainButtonStyles}
        icon={<AddIcon />}
        alwaysShowTitle={true}
      >
        {location.pathname !== '/invoice' && (
          <Action text="New Invoice" onClick={() => navigate(`/invoice`)}>
            <CreateIcon />
          </Action>
        )}

        <Action
          text="New Customer"
          onClick={() => {
            setCompanyDialogOpen(false)
            setCustomerDialogOpen((prev) => !prev)
          }}
        >
          <PersonAddIcon />
        </Action>

        {location.pathname === '/settings' && (
          <Action
            text="New Company"
            onClick={() => {
              setCustomerDialogOpen(false)
              setCompanyDialogOpen((prev) => !prev)
            }}
          >
            <AddBusinessIcon />
          </Action>
        )}
      </Fab>
    </div>
  )
}

export default FabButton
