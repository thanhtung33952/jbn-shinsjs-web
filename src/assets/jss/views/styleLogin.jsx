import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  appBar: {
    position: "relative"
  },
  textHeader: {
    color: "#f3f3f3",
    position: "static",
    fontSize: 14,
    "& h4": {
      display: "inline-block",
      color: "#f3f3f3"
    },
    "& span": {
      lineHeight: "20px",
      marginRight: 3
    },
    "& span:last-child": {
      marginLeft: 5
    }
  },
  headerLine: {
    height: 25,
    backgroundColor: theme.palette.primary.main
  },
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
  bottomLine: {
    height: 25,
    backgroundColor: theme.palette.secondary.main
  },
  colLeft: {
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "5px 0px 10px 0px #c3c3c3",
    minHeight: "calc(100vh - 114px)",
    position: "relative"
  },
  colCenter: {
    boxShadow: "5px 0px 10px 0px #c3c3c3",
    minHeight: "calc(100vh - 114px)",
    padding: "0 40px 50px"
  },
  formLogin: {
    paddingRight: 20
  },
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    height: "auto",
    marginTop: 20,
    color: theme.palette.secondary.dark,
    fontSize: 14,
    "& label": {
      textAlign: "right",
      width: "30%",
      paddingRight: 15,
      lineHeight: "33px"
    }
  },
  inputLogin: {
    width: "70%"
  },
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
    zIndex: 2,
    color: "#616161"
  },
  messageAndButton: {
    display: "flex",
    width: "70%",
    float: "right",
    justifyContent: "flex-end"
  },
  message: {
    paddingTop: 15,
    paddingRight: 10,
    flex: 1,
    lineHeight: "20px"
  },
  messErr: {
    color: "red"
  },
  messSucc: {
    color: theme.palette.green.light,
    paddingTop: 30,
    textAlign: "right"
  },
  linkLogin: {
    textDecoration: "none",
    color: "#A2222D",
    fontSize: 14,
    width: "70%",
    float: "right",
    marginTop: 10
  },
  formGroupButton: {
    display: "flex",
    marginTop: 5,
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
  titleSingup: {
    color: theme.palette.secondary.dark,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20
  },
  cardLogin: {
    boxShadow: "0px 0px 10px 1px #c3c3c3",
    borderRadius: 10,
    margin: "0 5px"
  },
  cardLoginLeft: {
    [device.tablet]: {
      paddingRight: "10px !important"
    }
  },
  cardLoginRight: {
    [device.tablet]: {
      paddingLeft: "10px !important"
    }
  },
  titleCard: {
    color: theme.palette.secondary.dark,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20
  },
  textCard: {
    color: theme.palette.secondary.dark,
    textAlign: "left",
    fontSize: 14
  },
  boxBtnCard: {
    paddingBottom: 20,
    "& button": {
      margin: "auto"
    }
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
      padding: "4px 14px",
      textTransform: "none",
      minHeight: 28,
      fontSize: 12
    }
  },
  blockKnownledBase: {
    width: "100%",
    marginLeft: theme.spacing(2)
  },
  rowButtonLogin: {
    position: "relative",
    marginTop: 10,
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
  submit: {
    backgroundColor: theme.palette.green.light,
    border: "none",
    color: "#fff",
    borderRadius: 0,
    padding: "0px 20px",
    textTransform: "none",
    minHeight: 45,
    fontSize: 14,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    margin: "0 !important",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.pink.main
    }
  }
});

export default styles;
