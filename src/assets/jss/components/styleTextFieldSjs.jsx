const styles = theme => ({
  rowInputForm: {
    margin: 0,
    minWidth: "70%",
    "& p": {
      marginLeft: 0
    }
  },
  rootInput: {
    "& fieldset": {
      borderRadius: 5,
      borderColor: theme.palette.secondary.main + `${"!important"}`,
      backgroundColor: "#fff"
    }
  },
  thisInputError: {
    "& fieldset": {
      borderColor: theme.palette.pink.main + `${"!important"}`
    }
  },
  thisInput: {
    padding: 12,
    borderRadius: 0,
    zIndex: 2
  }
});

export default styles;
