/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Clients from './Clients'
import AddClient from './AddClient'
import { getClientsByUser } from '../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import NoData from '../svgIcons/NoData'
import Spinner from '../Spinner/Spinner'

const ClientList = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  const { clients } = useSelector((state) => state.clients)
  const { user } = useSelector((state) => state?.auth)
  const isLoading = useSelector((state) => state.clients.isLoading)

  // useEffect(() => {
  // }, [currentId, dispatch]);

  //     useEffect(() => {
  //         dispatch(getClients(1));
  //         // dispatch(getClientsByUser({userId : user?.result?._id}));
  //         // dispatch(getClientsByUser({ search :user?.result?._id, tags: tags.join(',') }));
  //     },[location]
  // )

  useEffect(() => {
    dispatch(getClientsByUser({ search: user?._id || user?.googleId }))
  }, [location, dispatch])

  if (!user) {
    navigate('/login')
  }

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

  if (clients.length === 0) {
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
      <AddClient
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <Clients
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
    </div>
  )
}

export default ClientList
