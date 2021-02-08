const styles = theme => ({
  titleForm: {
    color: "#222222",
    textAlign: "center",
    margin: "20px 0 30px"
  },
  formCompany: {
    padding: "0 40px",
    fontSize: 15,
    color: theme.palette.secondary.dark,
    textAlign: "center"
  },
  titleSubForm: {
    color: theme.palette.secondary.dark,
    fontSize: 16,
    marginTop: 20,
    textAlign: "left"
  },
  noteEmail: {
    color: theme.palette.pink.dark,
    paddingLeft: "25%",
    textAlign: "left",
    marginTop: 5,
    fontSize: 13
  },
  rowInputForm: {
    margin: 0,
    minWidth: "75%"
  },
  rootInput: {
    "& fieldset": {
      borderRadius: 0,
      borderColor: theme.palette.secondary.dark
    }
  },
  thisInput: {
    padding: 8,
    borderRadius: 0
  },
  // step 3
  rowFromGroup: {
    display: "flex",
    "& $formGroup": {
      width: "50%",
      "& label": {
        width: "50%"
      }
    },
    "& $rowInputForm": {
      minWidth: "50%",
      width: "50%"
    }
  },
  btnRole: {
    marginRight: 4,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.dark,
    borderRadius: 0,
    padding: "5px 10px",
    textTransform: "none",
    minHeight: 28,
    fontSize: 12
  },
  activeRole: {
    backgroundColor: theme.palette.green.main,
    borderColor: theme.palette.green.dark,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.green.dark
    }
  },
  selectableLabel: {
    backgroundColor: "blue"
  },
  formControlRadio: {
    flexDirection: "initial"
  },
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    color: theme.palette.secondary.dark,
    "& label": {
      textAlign: "right",
      width: "25%",
      paddingRight: 15,
      lineHeight: "33px"
    }
  },
  btnLogin: {
    backgroundColor: theme.palette.primary.main,
    border: "none",
    color: "#fff",
    borderRadius: 0,
    padding: "5px 20px",
    textTransform: "none",
    minHeight: 34,
    fontSize: 12,
    margin: "auto",
    paddingRight: 30,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  },
  formGroupButton: {
    display: "flex",
    marginTop: 15,
    color: theme.palette.secondary.dark,
    fontSize: 14,
    paddingLeft: "calc(25% + 20px)",
    justifyContent: "flex-start",
    flexDirection: "row",
    float: "right",
    width: "100%",
    paddingRight: 17,
    "& button": {
      margin: "inherit"
    }
  },
  rootTextFieldOverride: {
    width: "red"
  }
});

export default styles;
