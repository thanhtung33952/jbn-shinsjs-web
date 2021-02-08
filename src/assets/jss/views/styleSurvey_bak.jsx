import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  loaddingPage: {
    position: "absolute",
    top: "55%",
    left: "calc(50% - 25px)",
    color: "#666699"
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
    marginTop: 10,
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
  },
  // new
  colLeftSurvey: {
    maxWidth: "20%",
    flexBasis: "20%"
  },
  colCenterSurvey: {
    height: "100%",
    padding: 0,
    paddingTop: 0,
    flexBasis: "57%",
    maxWidth: "57%",
    "& *": {
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300
    }
  },
  colRightSurvey: {
    flexBasis: "23%",
    maxWidth: "23%"
  },
  titleForm: {
    color: theme.palette.secondary.dark,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
    fontWeight: 100,
    fontSize: 30
  },
  formCompany: {
    padding: "0 15px",
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
    marginTop: 0,
    marginBottom: 0,
    width: "80%",
    marginLeft: "20%"
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
  textDateForm: {
    width: "auto",
    backgroundColor: "#fff",
    borderRadius: 6,
    margin: 0,
    "& fieldset": {
      borderColor: theme.palette.secondary.main + `${"!important"}`
    },
    "& input": {
      padding: "9px 14px"
    }
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
    paddingLeft: 20,
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
  rowInputFormInline40: {
    margin: "0 0",
    minWidth: "40%"
  },
  rowInputFormCheckbox: {
    margin: 0,
    minWidth: "80%",
    textAlign: "left",
    "& label": {
      width: "auto !important"
    }
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
  rowInputForm100: {
    width: "100%"
  },
  formGroup: {
    display: "flex",
    justifyContent: "flex-start",
    margin: "8px 0",
    color: theme.palette.secondary.dark,
    fontSize: 14,
    width: "100%",
    "& label": {
      textAlign: "right",
      width: "20%",
      paddingRight: 15,
      lineHeight: "42px",
      "& svg": {
        height: "100%",
        color: theme.palette.primary.dark
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
    width: "80%"
  },
  rowBtnAtt: {
    textAlign: "left",
    width: "25%",
    "& button": {
      marginBottom: 0
    }
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
  // acoordion
  acoordion: {
    // backgroundColor: "#e6e6e6",
    margin: "10px 0",
    // boxShadow: "none"
  },
  expansionPanelSummary: {
    padding: "5px 10px"
  },
  headingAcoordion: {
    color: theme.palette.greenDark.dark,
    fontWeight: 500,
    "& svg": {
      verticalAlign: "bottom",
      marginRight: 20
    }
  },
  acoordionDetail: {
    paddingRight: 60,
    paddingLeft: 60,
    display: "flex",
    flexDirection: "column"
  },
  labEndRow: {
    width: "auto",
    paddingRight: "0 !important",
    paddingLeft: 15,
    textAlign: "left !important"
  },
  formGroupBtn: {
    justifyContent: "flex-start",
    "& label": {
      lineHeight: "32px"
    }
  },
  formGroupAtt: {
    justifyContent: "flex-start",
    "& label": {
      width: "30%",
      lineHeight: "32px"
    }
  },
  acoordionDetailAtt: {
    "& $lineForm": {
      width: "50% !important",
      marginLeft: "30% !important"
    }
  },
  lineheigh20: {
    lineHeight: "20px"
  },
  boxTabs: {
    width: "80%",
    flexGrow: 1
  },
  appBarTab: {
    boxShadow: "none"
  },
  tabRoot: {
    minWidth: "auto",
    border: "solid 1px",
    borderColor: theme.palette.secondary.light,
    borderRight: "none"
  },
  tabSelected: {
    // backgroundColor: theme.palette.indigo.main
  },
  styleIndicator: {
    backgroundColor: "orange"
  },
  conTab: {
    padding: 10,
    border: "solid 1px #dad8d8",
    borderTop: "none",
    textAlign: "left"
  },
  rowInTab: {
    margin: "5px 0",
    display: "flex"
  },
  textDateTab: {
    backgroundColor: "#fff",
    borderRadius: 6,
    height: "100%",
    margin: 0,
    "& fieldset": {
      borderColor: theme.palette.secondary.main + `${"!important"}`
    },
    "& input": {
      padding: 8,
      fontSize: 14,
      height: "100%"
    }
  },
  styleSelectbox: {
    backgroundColor: "#fff",
    display: "flex",
    flexGrow: 1,
    borderRadius: "4px !important",
    "&:after": {
      content: "none"
    },
    "&:before": {
      content: "none"
    }
  },
  styleSelect: {
    padding: 8,
    fontSize: 14,
    borderRadius: "4px !important",
    border: "solid 1px",
    borderColor: theme.palette.secondary.main
  },
  iconDone: {
    color: theme.palette.pink.main
  },
  btnSave: {
    border: "none !important",
    color: "#fff !important",
    borderRadius: 0,
    padding: "0px 20px",
    textTransform: "none",
    minHeight: 45,
    fontSize: 14,
    margin: 0,
    marginLeft: 5,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    backgroundColor: theme.palette.green.light + "!important",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.green.light
    },
    "&:disabled": {
      opacity: 0.3
    }
  },
  btnDeleteDraft: {
    border: "none !important",
    color: "#fff !important",
    borderRadius: 0,
    padding: "0px 20px",
    textTransform: "none",
    minHeight: 45,
    fontSize: 14,
    margin: 0,
    marginLeft: 5,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    backgroundColor: "#ca0202",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#ca0202"
    },
    "&:disabled": {
      opacity: 0.3
    }
  },
  btnSaveDraft: {
    border: "none !important",
    color: "#fff !important",
    borderRadius: 0,
    padding: "0px 20px",
    textTransform: "none",
    minHeight: 45,
    fontSize: 14,
    margin: 0,
    marginLeft: 5,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    backgroundColor: "#ff760f",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#ff760f"
    },
    "&:disabled": {
      opacity: 0.3
    }
  },
  activeBtnSave: {
    opacity: 1,
    backgroundColor: theme.palette.green.light + "!important",
    boxShadow: "none",
    border: "none",
    color: "#fff",
    borderRadius: 0,
    padding: "0px 20px",
    textTransform: "none",
    minHeight: 45,
    fontSize: 14,
    margin: 0,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    "&:hover": {
      backgroundColor: theme.palette.pink.main
    }
  },
  rowButtonSave: {
    position: "relative",
    marginBottom: 20,
    float: "right",
    display: "flex"
  },
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  btnDefault: {
    backgroundColor: theme.palette.green.light,
    border: "none",
    color: "#fff",
    borderRadius: 4,
    padding: "0px 25px",
    textTransform: "none",
    minHeight: 42,
    fontSize: "1rem",
    marginLeft: 15,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    "&:hover": {
      backgroundColor: theme.palette.pink.main,
      "&:after": {
        borderLeftColor: theme.palette.pink.main
      }
    }
  },
  textFieldDefault: {
    "& fieldset": {
      borderRadius: 5,
      borderColor: theme.palette.secondary.main + `${"!important"}`,
      backgroundColor: "#fff"
    },
    "& input": {
      padding: 9,
      borderRadius: 0,
      zIndex: 2
    }
  },
  notFound: {
    textAlign: "center",
    margin: "40px 10px",
    color: "#a9a9a9",
    width: "100%"
  },
  rowBtnTab: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: 0,
    marginTop: 20,
    minHeight: 40,
    borderBottom: "solid 4px #ca0202 ",
    "& button": {
      boxShadow: "none",
      backgroundColor: "#666666",
      margin: "0 5px",
      minWidth: 140,
      color: "#fff",
      opacity: 1,
      borderRadius: "8px 6px 0 0",
      minHeight: 40,
      fontSize: 15,
      "&:hover": {
        backgroundColor: "#771d4a"
      }
    }
  },
  indicator: {
    backgroundColor: "#E53A3A",
    display: "none"
  },
  flexContainer: {
    justifyContent: "center"
  },
  select: {
    backgroundColor: "#ca0202 !important"
  },
  contentTab2: {
    width: "auto",
    minWidth: "100%",
    height: "calc(100% - 58px)"
  },
  contentTab1: {
    display: "flex",
    height: "calc(100% - 45px)"
  }
});

export default styles;
