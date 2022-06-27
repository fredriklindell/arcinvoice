import { useState } from 'react'
import { IconButton, List, ListItem, ListItemText, Paper } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { updateUserName } from '../../../actions/user-actions'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'react-simple-snackbar'
import styles from './styles'
import Input from './Input'

const profileStyles = {
  listItemIcon: {
    mr: 2,
    color: 'gray',
  },
  editIcon: {
    color: 'gray',
  },
}

const ProfileDetails = ({ user }) => {
  // eslint-disable-next-line
  const [openSnackbar] = useSnackbar()
  const dispatch = useDispatch()
  const [isEditingProfileName, setIsEditingProfileName] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  const editProfileName = () => {
    setIsEditingProfileName(true)
    setNewUserName(user?.name)
  }

  const saveProfileName = () => {
    dispatch(updateUserName(user._id, newUserName, openSnackbar))
    setIsEditingProfileName(false)
    setNewUserName('')
  }

  const handleProfileNameChange = (e) => {
    setNewUserName(e.target.value)
  }

  return (
    <Paper sx={styles.paper} elevation={0}>
      <List>
        {isEditingProfileName ? (
          <ListItem>
            <PersonOutlineIcon sx={profileStyles.listItemIcon} />
            <Input
              sx={{ flexGrow: 1, mr: 2 }}
              name="name"
              label="User name"
              handleChange={handleProfileNameChange}
              type="text"
              value={newUserName}
            />
            <IconButton onClick={() => saveProfileName()}>
              <SaveOutlinedIcon sx={profileStyles.editIcon} />
            </IconButton>
          </ListItem>
        ) : (
          <ListItem>
            <PersonOutlineIcon sx={profileStyles.listItemIcon} />
            <ListItemText primary={user?.name} secondary="" />
            <IconButton onClick={() => editProfileName()}>
              <EditOutlinedIcon sx={profileStyles.editIcon} />
            </IconButton>
          </ListItem>
        )}

        <ListItem>
          <AlternateEmailIcon sx={profileStyles.listItemIcon} />
          <ListItemText primary={user?.email} secondary="" />
        </ListItem>
      </List>
    </Paper>
  )
}

export default ProfileDetails
