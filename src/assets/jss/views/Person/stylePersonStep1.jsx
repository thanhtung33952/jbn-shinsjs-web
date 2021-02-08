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
  formGroupButton: {
    display: "flex",
    marginTop: 15,
    color: theme.palette.secondary.dark,
    fontSize: 14,
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
    paddingRight: 0,
    "& button": {
      margin: "inherit"
    }
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
  }
});

export default styles;
