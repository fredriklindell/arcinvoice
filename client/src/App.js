import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Home from './components/Home/Home'
import Invoice from './components/Invoice/Invoice'
import Invoices from './components/Invoices/Invoices'
import InvoiceDetails from './components/InvoiceDetails/InvoiceDetails'
import CustomerList from './components/Customers/CustomerList'
import NavBar from './components/NavBar/NavBar'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Settings from './components/Settings/Settings'
import Forgot from './components/Password/Forgot'
import Reset from './components/Password/Reset'
import AuthGate from './components/AuthGate'
import { useSelector } from 'react-redux'

const theme = createTheme()

function App() {
  const { user } = useSelector((state) => state?.auth)

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SnackbarProvider>
                <AuthGate>
                  {user && <NavBar />}
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/invoice" element={<Invoice />} />
                    <Route path="/edit/invoice/:id" element={<Invoice />} />
                    <Route path="/invoice/:id" element={<InvoiceDetails />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/forgot" element={<Forgot />} />
                    <Route path="/reset/:token" element={<Reset />} />
                  </Routes>
                  <Footer />
                </AuthGate>
              </SnackbarProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
