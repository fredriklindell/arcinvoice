import { combineReducers } from 'redux'

import auth from './auth'
import companies from './companies'
import customers from './customers'
import invoices from './invoices'

export default combineReducers({ auth, companies, customers, invoices })
