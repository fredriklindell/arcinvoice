import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cssStyles from './Header.module.css'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Avatar from '@mui/material/Avatar'

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
  const { user } = useSelector((state) => state?.auth)
  const navigate = useNavigate()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const openLink = (link) => {
    navigate(`/${link}`)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
    }
  }

  const open = Boolean(anchorEl)

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
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar style={{ backgroundColor: '#1976D2' }}>
              {user?.name?.charAt(0)}
            </Avatar>
          </Button>
          <Popper open={open} anchorEl={anchorEl}>
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClick}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => openLink('settings')}>
                    {(user?.name).split(' ')[0]}
                  </MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
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
