import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { setDefaultCompany } from '../../actions/company-actions'

import cssStyles from './Header.module.css'

const styles = {
  root: {
    display: 'flex',
    mr: 2,
  },
  paper: {
    mr: 2,
  },
}

const Header = () => {
  const dispatch = useDispatch()
  const { user, company: selectedCompany } = useSelector((state) => state?.auth)
  const { companies } = useSelector((state) => state?.companies)
  const navigate = useNavigate()
  const [companyMenuAnchorEl, setCompanyMenuAnchorEl] = useState(null)
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const handleCompanyMenuClick = (event) => {
    setCompanyMenuAnchorEl(companyMenuAnchorEl ? null : event.currentTarget)
  }

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(userMenuAnchorEl ? null : event.currentTarget)
  }

  const handleSetDefaultCompany = (company) => {
    dispatch(setDefaultCompany(company._id))
  }

  const openLink = (link) => {
    navigate(`/${link}`)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
    }
  }

  const companyMenuOpen = Boolean(companyMenuAnchorEl)
  const userMenuOpen = Boolean(userMenuAnchorEl)

  if (!user)
    return (
      <Box className={cssStyles.header2}>
        <img
          style={{ width: '160px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
          src="https://i.postimg.cc/C5fxh51H/Arc-Invoice-Logo2.png"
          alt="arc-invoice"
        />
        <button onClick={() => navigate('/login')} className={cssStyles.login}>
          Get started
        </button>
      </Box>
    )
  return (
    <Box className={cssStyles.header}>
      <Box sx={styles.root}>
        <Box>
          <Button
            aria-controls={
              companyMenuOpen ? 'company-menu-list-grow' : undefined
            }
            aria-haspopup="true"
            onClick={handleCompanyMenuClick}
            endIcon={<KeyboardArrowDownIcon sx={{ color: 'gray' }} />}
          >
            <Avatar sx={{ mr: 1 }} src={selectedCompany?.logo}>
              {selectedCompany?.name?.charAt(0)}
            </Avatar>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
              {selectedCompany?.name}
            </Typography>
          </Button>
          <Popper open={companyMenuOpen} anchorEl={companyMenuAnchorEl}>
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleCompanyMenuClick}>
                <MenuList
                  autoFocusItem={companyMenuOpen}
                  id="company-menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {companies.map((company, index) => (
                    <MenuItem
                      key={`company-menu-item-key-${index}`}
                      onClick={() => handleSetDefaultCompany(company)}
                    >
                      <Avatar sx={{ mr: 1 }} src={company.logo}>
                        {company.name?.charAt(0)}
                      </Avatar>
                      {company?.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </Box>

        <Box>
          <Button
            aria-controls={userMenuOpen ? 'user-menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleUserMenuClick}
            endIcon={<KeyboardArrowDownIcon sx={{ color: 'gray' }} />}
          >
            <Avatar sx={{ backgroundColor: '#1976D2' }}>
              {user?.name?.charAt(0)}
            </Avatar>
          </Button>
          <Popper open={userMenuOpen} anchorEl={userMenuAnchorEl}>
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleUserMenuClick}>
                <MenuList
                  autoFocusItem={userMenuOpen}
                  id="user-menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => openLink('settings')}>
                    <SettingsOutlinedIcon sx={{ color: 'gray', mr: 1 }} />
                    <Typography>{user?.name}</Typography>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={() => logout()}>
                    <LogoutOutlinedIcon sx={{ color: 'gray', mr: 1 }} />
                    <Typography>Logout</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
