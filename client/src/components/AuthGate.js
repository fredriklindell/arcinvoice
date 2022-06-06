import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import decode from 'jwt-decode'

const AuthGate = ({ children }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { user, token } = useSelector((state) => state?.auth)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  useEffect(() => {
    //If token expires, logout the user
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
    // eslint-disable-next-line
  }, [location, token]) //when location changes, set the user

  // navigate to dashboard if already logged in
  if (user && location.pathname === '/login') {
    return <Navigate replace to="/dashboard" />
  }

  // render route if logged in
  if (
    (user && location.pathname !== '/login') ||
    location.pathname === '/' ||
    location.pathname === '/login'
  ) {
    return <>{children}</>
  }

  // redirect to login if not logged in
  return <Navigate replace to="/login" />
}

export default AuthGate
