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
    padding: "0 40px 70px 0",
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
    minWidth: "75%"
  },
  rowInputForm100: {
    margin: 0,
    minWidth: "100%"
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
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    margin: "8px 0",
    color: theme.palette.secondary.dark,
    "& label": {
      textAlign: "right",
      width: "25%",
      paddingRight: 3,
      lineHeight: "42px",
      [device.tablet]: {
        lineHeight: "22px"
      }
    }
  },
  
  lineForm: {
    borderStyle: "inset",
    borderWidth: 1,
    clear: "both",
    marginLeft: -40,
    marginRight: -40,
    marginTop: 15,
    marginBottom: 15
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
    [device.tablet]: {
      marginRight: 5,
      padding: "0px 5px"
    }
  },
  activeRole: {
    backgroundColor: theme.palette.green.main,
    borderColor: theme.palette.green.dark,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.green.dark
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
    justifyContent: "flex-end",
    flexDirection: "row",
    // float: "right",
    width: "100%",
    "& button": {
      margin: "inherit"
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
  message: {
    paddingRight: "15%",
    flex: 1,
    lineHeight: "20px",
  },
  messErr: {
    color: "red"
  },
  messSucc: {
    color: theme.palette.green.light,
    paddingTop: 10
  },
  boxCompanySetting: {
    padding: "20px 0"
  },
  tabCompany: {
    width: "100%",
    marginBottom: 40,
    "& button": {
      fontSize: 20,
      fontWeight: "bold",
      minWidth: 80,
      padding: 0,
      margin: "0 30px",
      "& span": {
        fontWeight: 500
      }
    }
  },
  contentStep: {
    margin: "20px 0"
  }
});

export default styles;
