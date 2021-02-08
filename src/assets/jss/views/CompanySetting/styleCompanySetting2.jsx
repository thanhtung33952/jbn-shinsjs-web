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
    margin: 0,
    minWidth: "80%"
  },
  rootInput: {
    "& fieldset": {
      borderRadius: 5,
      borderColor: theme.palette.secondary.main
    }
  },
  thisInput: {
    padding: 12,
    borderRadius: 0
  },
  // step 2
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
      [device.tablet]: {
        lineHeight: "22px"
      }
    }
  },
  labEndRow: {
    paddingRight: "0 !important",
    color: theme.palette.pink.main,
    "& img": {
      height: 24,
      opacity: 0.4,
      verticalAlign: "middle",
      marginLeft: 2
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
    fontSize: 15,
    textAlign: "left",
    color: theme.palette.secondary.dark,
    margin: "0 -30px",
    [device.tablet]: {
      margin: "0 -15px"
    }
  },
  textAreaForm: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 6,
    margin: 0,
    "& fieldset": {
      borderColor: theme.palette.secondary.main + `${"!important"}`
    }
  },
  roleItem: {
    color: theme.palette.secondary.dark,
    fontWeight: 600,
    marginRight: 10,
    paddingTop: 12,
    "& svg": {
      color: theme.palette.primary.main,
      verticalAlign: "bottom",
      fontSize: 20,
      marginRight: 2,
      display: "none"
    }
  },
  roleActive: {
    color: "#222",
    "& svg": {
      display: "inline-block"
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
  rowUpload: {
    display: "inline"
  },
  formGroupButton: {
    display: "flex",
    marginTop: 15,
    color: theme.palette.secondary.dark,
    fontSize: 14,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: 60,
    width: "100%",
    "& button": {
      margin: "inherit"
    }
  },
  rowBtnRole: {
    textAlign: "left",
    width: "80%"
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
  rowBtnRole0: {
    "& $btnRole": {
      marginBottom: 0
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
  thisInputError: {
    "& fieldset": {
      borderColor: theme.palette.pink.main + `${"!important"}`
    }
  },
  rowInputDate: {
    margin: "0 5px"
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
  inputInputDate: {
    padding: 12,
    fontSize: "1rem",
    fontWeight: 400
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
  txtCredit: {
    color: "#222",
    border: "solid 1px #9e9e9e",
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "80%",
    textAlign: "left",
    padding: "10px 15px"
  },
  closeButton: {
    padding: 5,
    marginLeft: 10,
    color: "#b90707"
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
