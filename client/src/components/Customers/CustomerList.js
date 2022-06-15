/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Customers from './Customers'
import AddCustomer from './AddCustomer'
import { getCustomersByCompany } from '../../actions/customer-actions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import NoData from '../svgIcons/NoData'
import Spinner from '../Spinner/Spinner'

const CustomerList = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  const { customers, isLoading } = useSelector((state) => state.customers)
  const { user } = useSelector((state) => state?.auth)

  useEffect(() => {
    dispatch(getCustomersByCompany({ search: user?._id || user?.googleId }))
  }, [location, dispatch])

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingTop: '20px',
        }}
      >
        <Spinner />
      </div>
    )
  }

  if (customers.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingTop: '20px',
          margin: '80px',
        }}
      >
        <NoData />
        <p style={{ padding: '40px', color: 'gray', textAlign: 'center' }}>
          No customers yet. Click the plus icon to add customer
        </p>
      </div>
    )
  }

  return (
    <div>
      <AddCustomer
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <Customers
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
    </div>
  )
}

export default CustomerList
