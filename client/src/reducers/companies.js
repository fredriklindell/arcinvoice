import {
  FETCH_COMPANIES,
  CREATE_COMPANY,
  FETCH_COMPANIES_BY_USER,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  FETCH_COMPANY_BY_USER,
  START_LOADING,
  END_LOADING,
  FETCH_COMPANY,
} from '../actions/constants'

const companiesReducer = (
  state = {
    isLoading: true,
    companies: [],
    company: null,
  },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }

    case END_LOADING:
      return { ...state, isLoading: false }

    case FETCH_COMPANIES:
      return {
        ...state,
        companies: action.payload,
      }

    case FETCH_COMPANIES_BY_USER:
      return { ...state, companies: action.payload }

    case FETCH_COMPANY_BY_USER:
      return { ...state, company: action.payload }

    case FETCH_COMPANY:
      return { ...state, company: action.payload }

    case CREATE_COMPANY:
      return { ...state, companies: [...state.companies, action.payload] }

    case UPDATE_COMPANY:
      return {
        ...state,
        companies: state.companies.map((company) =>
          company._id === action.payload._id ? action.payload : company
        ),
      }

    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company._id !== action.payload
        ),
      }

    default:
      return state
  }
}

export default companiesReducer
