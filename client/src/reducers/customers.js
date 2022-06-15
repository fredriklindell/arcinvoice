import {
  ALL_CUSTOMERS,
  ADD_NEW_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS_BY_COMPANY,
  FETCH_CUSTOMER,
  START_LOADING,
  END_LOADING,
} from '../actions/constants'

const customers = (state = { isLoading: true, customers: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case FETCH_CUSTOMERS_BY_COMPANY:
      return { ...state, customers: action.payload }
    case FETCH_CUSTOMER:
      return { ...state, client: action.payload.client }
    case ADD_NEW_CUSTOMER:
      return { ...state, customers: [...state.customers, action.payload] }
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map((client) =>
          client._id === action.payload._id ? action.payload : client
        ),
      }
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (client) => client._id !== action.payload
        ),
      }
    default:
      return state
  }
}

export default customers
