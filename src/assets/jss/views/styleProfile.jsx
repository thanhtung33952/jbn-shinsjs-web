import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  textCenter: {
    color: theme.palette.secondary.main,
    textAlign: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    "& h1": {
      display: "inline-block",
      color: theme.palette.secondary.main
    }
  },
  formLogin: {
    paddingRight: 20
  },
  titleStep: {
    color: theme.palette.secondary.dark,
    marginTop: 0,
    paddingLeft: 20,
    fontSize: 17,
    display: "flex",
    "& span": {
      fontWeight: 600
    }
  },
  iconCheckStep: {
    opacity: 0.5,
    fontSize: 42,
    color: theme.palette.primary.main,
    marginTop: -10,
    marginRight: 2
  },
  blockButton: {
    position: "absolute",
    bottom: 2,
    left: 0,
    "& button": {
      marginRight: 4,
      borderColor: theme.palette.primary.blue,
      color: theme.palette.primary.blue,
      borderRadius: 0,
      padding: "4px 20px",
      textTransform: "none",
      minHeight: 28,
      fontSize: 12
    }
  },
  blockKnownledBase: {
    width: "100%",
    marginLeft: theme.spacing(2)
  },
  // end css masterpage
  titleHeadingPage: {
    height: 25,
    backgroundColor: theme.palette.primary.main,
    fontSize: 13,
    textAlign: "center",
    lineHeight: "25px",
    color: "#fff"
  },
  formGroupButton: {
    display: "flex",
    marginTop: 15,
    color: theme.palette.secondary.dark,
    fontSize: 14,
    justifyContent: "flex-end",
    flexDirection: "row",
    float: "right",
    width: "100%",
    paddingRight: 17,
    "& button": {
      margin: "inherit"
    }
  },
  blockContent: {
    width: 900,
    margin: "auto"
  },
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
    padding: "0 40px",
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
    marginBottom: 25,
    textAlign: "left"
  },
  rowInputForm: {
    margin: "0 0",
    minWidth: "80%"
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
        width: "50%",
        [device.tablet]: {
          lineHeight: "22px"
        }
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
  rowInputForm100: {
    width: "100%"
  },
  formGroup: {
    display: "flex",
    justifyContent: "flex-start",
    margin: "8px 0",
    color: theme.palette.secondary.dark,
    fontSize: 14,
    "& label": {
      textAlign: "right",
      width: "20%",
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
  btnRenderAddress: {
    boxShadow: "none",
    backgroundColor: "#5bad84",
    color: "#fff",
    borderRadius: 0,
    marginLeft: 30,
    "&:hover": {
      backgroundColor: "#ff6666"
    }
  },
  rowBtnSave: {
    position: "relative",
    marginTop: 20,
    marginBottom: 40,
    clear: "both",
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
  errorPage: {
    textAlign: "center",
    "& h2": {
      fontSize: 35,
      marginTop: "10%"
    },
    "& svg": {
      color: "darkslategrey"
    }
  },
  loaddingPage: {
    marginTop: "10%"
  },
  rowInputDate: {
    color: "#222",
    "& input": {
      borderRadius: 5,
      backgroundColor: "#fff",
      border: "solid 1px #9e9e9e",
      padding: 10
    },
    "& div:before, div:after": {
      content: "none"
    }
  }
});

export default styles;
