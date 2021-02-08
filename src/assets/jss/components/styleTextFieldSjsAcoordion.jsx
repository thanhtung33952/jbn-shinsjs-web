const styles = theme => ({
  rowInputForm: {
    margin: 0,
    minWidth: "70%",
    "& p": {
      marginLeft: 0
    }
  },
  text: {
    "& $rootInput": {
      padding: 0
    }
  },
  rootInput: {
    "& fieldset": {
      borderRadius: 5,
      borderColor: theme.palette.secondary.main + `${"!important"}`,
      backgroundColor: "#fff"
    }
  },
  rowInputFormReadonly: {
    "& fieldset": {
      borderColor: "transparent !important"
    },
    "& input": {
      color: "#222"
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
