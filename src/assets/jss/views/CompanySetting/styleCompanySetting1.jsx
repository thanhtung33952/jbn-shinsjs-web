import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  blockStep: {
    "& *": {
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300
    }
  },
  titleForm: {
    color: theme.palette.secondary.dark,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: 100,
    fontSize: 30
  },
  formCompany: {
    padding: "0 30px",
    fontSize: 15,
    color: theme.palette.secondary.dark,
    textAlign: "center",
    [device.tablet]: {
      padding: 0
    }
  },
  lineForm: {
    borderStyle: "inset",
    borderWidth: 1,
    clear: "both",
    marginLeft: -30,
    marginRight: -30,
    marginTop: 15,
    marginBottom: 15
  },
  noteForm: {
    fontSize: 14,
    textAlign: "left",
    color: theme.palette.secondary.dark
  },
  titleSubForm: {
    color: theme.palette.purple.main,
    fontSize: 17,
    fontWeight: 500,
    marginTop: 20,
    textAlign: "left"
  },
  titleChildForm: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 15,
    textAlign: "left"
  },
  rowInputForm: {
    margin: "0 0",
    minWidth: "75%"
  },
  rootInput: {
    "& fieldset": {
      borderRadius: 0,
      borderColor: theme.palette.secondary.dark
    }
  },
  rowFromGroups: {
    display: "flex",
    "& $formGroup": {
      width: "50%",
      margin: "4px 0",
      "& label": {
        width: "50%"
      }
    },
    "& $rowInputForm": {
      minWidth: "60%",
      width: "60%"
    }
  },
  thisInput: {
    padding: 10,
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.light
  },
  formGroupButton: {
    display: "flex",
    marginTop: 15,
    color: theme.palette.secondary.dark,
    fontSize: 14,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: 90,
    width: "100%",
    paddingRight: 0,
    "& button": {
      margin: "inherit"
    }
  },
  rowInputForm100: {
    width: "100%"
  },
  messSubmit: {
    color: theme.palette.pink.main,
    marginTop: 10,
    textAlign: "left",
    paddingLeft: "20%"
  },
  formGroup: {
    display: "flex",
    justifyContent: "flex-start",
    margin: "8px 0",
    color: theme.palette.secondary.dark,
    fontSize: 14,
    "& label": {
      textAlign: "right",
      width: "25%",
      paddingRight: 15,
      lineHeight: "42px",
      "& svg": {
        height: "100%",
        color: theme.palette.primary.dark
      },
      [device.tablet]: {
        lineHeight: "22px"
      }
    }
  },
  defaultCheck: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 0,
    fontSize: 15,
    padding: 10,
    lineHeight: "19px",
    width: "60%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.dark + `${"!important"}`,
    "& span": {
      justifyContent: "flex-start"
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  errorCheck: {
    borderColor: "#f44336"
  },
  checkCheck: {
    backgroundColor: "#76D6FF",
    "&:hover": {
      backgroundColor: "#76D6FF"
    }
  },
  rowBtnRole: {
    textAlign: "left",
    width: "75%"
  },
  btnRole: {
    marginRight: 10,
    marginBottom: 10,
    borderColor: theme.palette.secondary.main,
    backgroundColor: "#fff",
    color: theme.palette.secondary.dark,
    borderRadius: 0,
    padding: "0px 10px",
    lineHeight: "34px",
    textTransform: "none",
    minHeight: 34,
    fontSize: 14,
    "&:hover": {
      backgroundColor: theme.palette.pink.main,
      borderColor: theme.palette.pink.dark,
      color: "#fff"
    },
    [device.tablet]: {
      padding: "0px 6px",
      marginRight: 5
    }
  },
  activeRole: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.dark,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark
    }
  },
  rowButtonSave: {
    position: "relative",
    float: "right"
  },
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  btnSave: {
    backgroundColor: theme.palette.green.light,
    border: "none",
    color: "#fff",
    borderRadius: 0,
    padding: "0px 20px",
    textTransform: "none",
    minHeight: 45,
    fontSize: 14,
    margin: "auto",
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.pink.main
    }
  },
  inputRootDate: {
    border: "solid 1px #9e9e9e",
    borderRadius: 5,
    backgroundColor: "#fff",
    "&:after": {
      content: "none"
    },
    "&:before": {
      content: "none"
    }
  },
  inputRootDateErro: {
    border: "solid 1px #ff6666",
    borderRadius: 5,
    backgroundColor: "#fff",
    "&:after": {
      content: "none"
    },
    "&:before": {
      content: "none"
    }
  },
  inputInputDate: {
    padding: 12,
    fontSize: "1rem",
    fontWeight: 400
  },
  btnRenderAddress: {
    boxShadow: "none",
    backgroundColor: "#5bad84",
    color: "#fff",
    borderRadius: 0,
    marginLeft: 30,
    "&:hover": {
      backgroundColor: "#ff6666"
    }
  }
});

export default styles;
