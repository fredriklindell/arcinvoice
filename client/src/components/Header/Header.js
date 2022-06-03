import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import decode from 'jwt-decode'
import cssStyles from './Header.module.css'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Avatar from '@mui/material/Avatar'
// import axios from 'axios'

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
  const { user, token } = useSelector((state) => state?.auth)
  const navigate = useNavigate()
  const location = useLocation()

  //GET REPO INFO FROM GITHUB
  // useEffect(() => {
  //   getMetaData()
  // },[])

  // const getMetaData = async() => {
  //   const response = await axios.get('https://api.github.com/repos/panshak/arc')
  //       // console.log(response.data);
  // }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  useEffect(() => {
    //If token expires, logout the user
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
    // eslint-disable-next-line
  }, [location, token]) //when location changes, set the user

  const [anchorEl, setAnchorEl] = React.useState(null)

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

  // return focus to the button when we transitioned from !open -> open
  //  const prevOpen = React.useRef(open);
  //  React.useEffect(() => {
  //    if (prevOpen.current === true && open === false) {
  //      anchorRef.current.focus();
  //    }
  //
  //    prevOpen.current = open;
  //  }, [open]);

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
