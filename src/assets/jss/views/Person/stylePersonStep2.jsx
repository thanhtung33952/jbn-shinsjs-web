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
    padding: "0 40px",
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
    minWidth: "60%"
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
    marginLeft: -40,
    marginRight: -40,
    marginTop: 15,
    marginBottom: 15
  },
  noteForm: {
    fontSize: 18,
    textAlign: "left",
    color: theme.palette.secondary.main
  },
  rowBtnStatus: {
    textAlign: "left",
    width: "75%"
  },
  btnStatus: {
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
    minWidth: 55,
    "&:hover": {
      borderColor: theme.palette.pink.dark,
      backgroundColor: theme.palette.pink.main,
      color: "#fff"
    }
  },
  activeStatus: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.dark,
    color: "#fff",
    "&:hover": {
      borderColor: theme.palette.pink.dark,
      backgroundColor: theme.palette.pink.main
    }
  },
  textAreaForm: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 6,
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
  formGroupButton: {
    display: "flex",
    marginTop: 15,
    marginBottom: 5,
    color: theme.palette.secondary.dark,
    fontSize: 14,
    justifyContent: "flex-end",
    flexDirection: "row",
    float: "right",
    width: "100%",
    "& button": {
      margin: "inherit"
    }
  }
});

export default styles;
