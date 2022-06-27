import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000'})
const API = axios.create({ baseURL: process.env.REACT_APP_API })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }

  return req
})

// export const fetchInvoices =() => API.get('/invoices')
export const fetchInvoice = (id) => API.get(`/invoices/${id}`)
export const addInvoice = (invoice) => API.post('/invoices', invoice)
export const updateInvoice = (id, updatedInvoice) =>
  API.patch(`/invoices/${id}`, updatedInvoice)
export const deleteInvoice = (id) => API.delete(`/invoices/${id}`)
export const fetchInvoicesByUser = (searchQuery) =>
  API.get(`/invoices?searchQuery=${searchQuery.search}`)

export const fetchCustomer = (id) => API.get(`/customers/${id}`)
export const fetchCustomers = (page) => API.get(`/customers?page=${page}`)
export const addCustomer = (client) => API.post('/customers', client)
export const updateCustomer = (id, updatedClient) =>
  API.patch(`/customers/${id}`, updatedClient)
export const deleteCustomer = (id) => API.delete(`/customers/${id}`)
export const fetchCustomersByCompany = (searchQuery) =>
  API.get(`/customers/company?searchQuery=${searchQuery.search}`)

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)
export const forgot = (formData) => API.post('/users/forgot', formData)
export const reset = (formData) => API.post('/users/reset', formData)
export const updateUserName = (id, newUserName) => API.patch(`/users/${id}`, { newUserName })

export const fetchCompaniesBySearch = (searchQuery) =>
  API.get(
    `/companies/search?searchQuery=${
      searchQuery.search || searchQuery.year || 'none'
    }`
  )
export const fetchCompany = (id) => API.get(`/companies/${id}`)
export const fetchCompanies = () => API.get('/companies')
export const fetchCompaniesByUser = (searchQuery) =>
  API.get(`/companies?searchQuery=${searchQuery.search}`)
export const fetchCompanyByUser = (searchQuery) =>
  API.get(`/companies/user/?searchQuery=${searchQuery.search}`)
export const createCompany = (newProfile) => API.post('/companies', newProfile)
export const updateCompany = (id, updatedCompany) =>
  API.patch(`/companies/${id}`, updatedCompany)
export const deleteCompany = (id) => API.delete(`/companies/${id}`)

export const fetchUsers = () => API.get(`/users`)
