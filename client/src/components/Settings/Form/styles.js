const styles = {
  paper: {
    mt: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    p: 2,
    border: 'solid 1px #bcbcbc',
    // backgroundColor: '#EEEEEE'
  },
  root: {
    '& .MuiTextField-root': {
      m: 1,
    },
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: 'solid 1px #dddddd',
    pb: 2,
  },
  avatar: {
    backgroundColor: 'white',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 24,
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    ml: 3,
    mr: 3,
    mt: 0,
    mb: 0,
  },
  googleButton: {
    mb: 2,
  },
  accordionSummary: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  logo: {
    mr: 2,
  },
}

export default styles
