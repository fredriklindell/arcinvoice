const styles = {
  paper: {
    mt: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 2,
  },
  root: {
    '& .MuiTextField-root': {
      m: 0,
    },
  },
  avatar: {
    m: 1,
    backgroundColor: '#1976d2',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '24px',
  },
  submit: {
    //    margin: theme.spacing(3, 0, 2),
    ml: 3,
    mr: 3,
    mt: 0,
    mb: 0,
  },
  googleButton: {
    mb: 0,
  },
};

export default styles;
