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
    minWidth: "80%"
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
    margin: "4px 0",
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
  textError: {
    color: theme.palette.pink.main,
    paddingLeft: "20%",
    textAlign: "left"
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
  }
});

export default styles;
