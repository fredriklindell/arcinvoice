import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from './styles'
import EmailIcon from '@mui/icons-material/Email'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import LocationOnIcon from '@mui/icons-material/LocationOn'
//import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'

//      references: company?.references || [], // TODO: Fix

export default function CompanyDetails({
  company,
  expanded,
  handleAccordionChange,
  panelName,
  setCurrentCompany,
}) {
  return (
    <>
      <Accordion
        sx={styles.paper}
        expanded={expanded === panelName}
        onChange={handleAccordionChange(panelName)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="company-content"
        >
          <Box sx={styles.accordionSummary}>
            <Avatar alt={company?.name} src={company.logo} sx={styles.logo}>
              {company?.name.substring(0, 1)}
            </Avatar>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {company?.name}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {company?.businessRegistrationNumber}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 40,
                mr: 2,
              }}
            >
              <LocationOnIcon sx={{ color: 'gray' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>{company?.address}</Typography>
              <Typography>
                {company?.zip}, {company?.city}
              </Typography>
              <Typography>{company?.country}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 40,
                mr: 2,
              }}
            >
              <EmailIcon sx={{ color: 'gray' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>
                <a href={`mailto:${company?.email}`}>{company?.email}</a>
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 40,
                mr: 2,
              }}
            >
              <AlternateEmailIcon sx={{ color: 'gray' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>
                <a href={`${company?.website}`} target={'__blank'}>
                  {company?.website}
                </a>
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 40,
                mr: 2,
              }}
            >
              <ContactPhoneIcon sx={{ color: 'gray' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>{company?.phoneNumber}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography sx={{ fontWeight: 500 }}>Invoice Details</Typography>
            <Typography>{company?.invoiceDetails}</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Swish</Typography>
              <Typography>{company?.swish}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>VAT Reg.number</Typography>
              <Typography>{company?.vatRegistrationNumber}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Plus Giro</Typography>
              <Typography>{company?.plusGiro}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Bank Giro</Typography>
              <Typography>{company?.bankGiro}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                Place of Business
              </Typography>
              <Typography>{company?.placeOfBusiness}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>SWIFT</Typography>
              <Typography>{company?.swift}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography sx={{ fontWeight: 500 }}>IBAN</Typography>
            <Typography>{company?.iban}</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography sx={{ fontWeight: 500 }}>Extra Info</Typography>
            <Typography>{company?.extraInfo}</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Bank Name</Typography>
              <Typography>{company?.bankName}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Account Number</Typography>
              <Typography>{company?.accountNumber}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                Overdue Payment Interest
              </Typography>
              <Typography>{company?.overduePaymentInterest}%</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 243,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                Terms of Payment Days
              </Typography>
              <Typography>{company?.termsOfPaymentDays}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
            <Typography sx={{ fontWeight: 500 }}>Users</Typography>
            <Typography>
              {company?.users.map((user) => user.name).join(', ')}
            </Typography>
          </Box>

          <Button
            fullWidth
            aria-label="edit-company-icon-button"
            variant="outlined"
            sx={{ mt: 3, padding: '15px 30px' }}
            onClick={() => setCurrentCompany(company)}
          >
            Edit Company
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
