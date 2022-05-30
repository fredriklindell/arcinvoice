const styles = {
  paper: {
    mt: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 4,
  },
  root: {
    '& .MuiTextField-root': {
      m: 1,
    },
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    mt: 3,
  },
  submit: {
    // margin: theme.spacing(2, 0, 2),
    ml: 2,
    mr: 2,
    mt: 0,
    mb: 0,
  },
};

export default styles;
