import * as api from '../api/index'

import {
  ADD_NEW_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS_BY_COMPANY,
  FETCH_CUSTOMER,
  START_LOADING,
  END_LOADING,
} from './constants'

export const getCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchCustomer(id)
    dispatch({ type: FETCH_CUSTOMER, payload: { client: data } })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getCustomersByCompany = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchCustomersByCompany(searchQuery)

    dispatch({ type: FETCH_CUSTOMERS_BY_COMPANY, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.response)
  }
}

export const createCustomer = (customer, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await api.addCustomer(customer)
    dispatch({ type: ADD_NEW_CUSTOMER, payload: data })
    openSnackbar('Customer added successfully')
  } catch (error) {
    console.log(error)
  }
}

export const updateCustomer =
  (id, client, openSnackbar) => async (dispatch) => {
    const { data } = await api.updateCustomer(id, client)
    dispatch({ type: UPDATE_CUSTOMER, payload: data })
    openSnackbar('Customer updated successfully')
    try {
    } catch (error) {
      console.log(error)
    }
  }

export const deleteCustomer = (id, openSnackbar) => async (dispatch) => {
  try {
    await api.deleteCustomer(id)

    dispatch({ type: DELETE_CUSTOMER, payload: id })
    openSnackbar('Customer deleted successfully')
  } catch (error) {
    console.log(error)
  }
}
