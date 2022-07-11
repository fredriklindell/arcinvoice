import {
  FETCH_COMPANIES,
  FETCH_COMPANIES_BY_USER,
  CREATE_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  FETCH_COMPANY_BY_USER,
  START_LOADING,
  END_LOADING,
  FETCH_COMPANY,
  FETCH_CUSTOMERS_BY_COMPANY,
  FETCH_INVOICES_BY_COMPANY,
} from './constants'
import * as api from '../api/index.js'

export const getCompany = (id) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING })
    const { data } = await api.fetchCompany(id)

    dispatch({ type: FETCH_COMPANY, payload: data })
    // dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.response)
  }
}

export const getCompanies = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchCompanies()
    dispatch({ type: FETCH_COMPANIES, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getCompanyByUser = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchCompanyByUser(searchQuery)
    dispatch({ type: FETCH_COMPANY_BY_USER, payload: data })

    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.response)
  }
}

export const getCompaniesByUser = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchCompaniesByUser(searchQuery)
    dispatch({ type: FETCH_COMPANIES_BY_USER, payload: data })

    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.response)
  }
}

export const getCompaniesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchCompaniesBySearch(searchQuery)

    dispatch({ type: FETCH_COMPANIES_BY_USER, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const createCompany = (company, history) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING })
    const { data } = await api.createCompany(company)
    // history.push(`/profiles/${data._id}`)

    dispatch({ type: CREATE_COMPANY, payload: data })
    // dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const updateCompany = (id, form, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await api.updateCompany(id, form)

    dispatch({ type: UPDATE_COMPANY, payload: data })
    openSnackbar('Company successfully updated')
  } catch (error) {
    console.log(error)
  }
}

export const setDefaultCompany = (id) => async (dispatch) => {
  try {
    const { data } = await api.setDefaultCompany(id)

    dispatch({ type: UPDATE_COMPANY, payload: data })

    const {
      data: { data: customers },
    } = await api.fetchCustomersByCompany({ search: data._id })

    dispatch({ type: FETCH_CUSTOMERS_BY_COMPANY, payload: customers })

    const {
      data: { data: invoices },
    } = await api.fetchInvoicesByCompany({ search: data._id })

    dispatch({ type: FETCH_INVOICES_BY_COMPANY, payload: invoices })

    // TODO: fetch customers by company
  } catch (error) {
    console.log(error)
  }
}

export const deleteCompany = (id) => async (dispatch) => {
  try {
    await api.deleteCompany(id)

    dispatch({ type: DELETE_COMPANY, payload: id })
  } catch (error) {
    console.log(error)
  }
}
