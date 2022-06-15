import React from 'react'
import { Avatar, Box, List, ListItem, ListItemText } from '@mui/material'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'

const styles = {
  root: {
    width: '100%',
    maxWidth: '450px',
    // backgroundColor: "#EEEEEE",
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: 'solid 1px #dddddd',
    pb: 2,
  },
  large: {
    width: 100,
    height: 100,
  },
}

export default function ProfileDetail({ company }) {
  return (
    <>
      <Box sx={styles.avatarContainer}>
        <Avatar alt={company?.name} src={company.logo} sx={styles.large} />
      </Box>
      <List sx={styles.root}>
        <ListItem>
          <BusinessCenterIcon style={{ marginRight: '20px', color: 'gray' }} />
          <ListItemText primary={company?.name} secondary="" />
        </ListItem>

        <ListItem>
          <LocationOnIcon style={{ marginRight: '20px', color: 'gray' }} />
          <ListItemText primary={company?.contactAddress} secondary="" />
        </ListItem>

        <ListItem>
          <PhoneInTalkIcon style={{ marginRight: '20px', color: 'gray' }} />
          <ListItemText primary={company?.phoneNumber} secondary="" />
        </ListItem>

        <ListItem>
          <AlternateEmailIcon style={{ marginRight: '20px', color: 'gray' }} />
          <ListItemText primary={company?.email} secondary="" />
        </ListItem>

        <ListItem>
          <AccountBalanceWalletRoundedIcon
            style={{ marginRight: '20px', color: 'gray' }}
          />
          <ListItemText primary={company?.paymentDetails} secondary="" />
        </ListItem>
      </List>
    </>
  )
}
