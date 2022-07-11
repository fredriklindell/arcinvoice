import * as api from '../api/index'
import { AUTH, FETCH_COMPANIES_BY_USER } from './constants'

export const signin =
  (formData, openSnackbar, setLoading, navigate) => async (dispatch) => {
    try {
      //login the user
      const { data: user } = await api.signIn(formData)
      dispatch({ type: AUTH, data: user })

      // fetch all user related stuff, since needed in AuthGate
      //      console.log('user', user)
      const {
        data: { data: companies },
      } = await api.fetchCompaniesByUser({
        search: user?.user?._id || user?.user?.googleId,
      })
      dispatch({
        type: FETCH_COMPANIES_BY_USER,
        payload: companies,
      })

      // setLoading(false)
      openSnackbar('Signin successfull')
      navigate('/dashboard')
    } catch (error) {
      // console.log(error?.response?.data?.message)
      openSnackbar(error?.response?.data?.message)
      setLoading(false)
    }
  }

export const signup =
  (formData, openSnackbar, setLoading, navigate) => async (dispatch) => {
    try {
      //Sign up the user
      const { data } = await api.signUp(formData)
      dispatch({ type: AUTH, data })
      // TODO: should this be done automatically or via settings?
      //      const { info } = await api.createCompany({
      //        name: data?.result?.name,
      //        email: data?.result?.email,
      //        userId: data?.result?._id,
      //        phoneNumber: '',
      //        businessName: '',
      //        contactAddress: '',
      //        logo: '',
      //        website: '',
      //      })
      //      dispatch({ type: CREATE_COMPANY, payload: info })
      navigate('/dashboard')
      openSnackbar('Sign up successfull')
    } catch (error) {
      console.log(error)
      openSnackbar(error?.response?.data?.message)
      setLoading(false)
    }
  }

export const forgot = (formData) => async (dispatch) => {
  try {
    await api.forgot(formData)
  } catch (error) {
    console.log(error)
  }
}

export const reset = (formData, navigate) => async (dispatch) => {
  try {
    await api.reset(formData)
    navigate('/dashboard')
  } catch (error) {
    alert(error)
  }
}
