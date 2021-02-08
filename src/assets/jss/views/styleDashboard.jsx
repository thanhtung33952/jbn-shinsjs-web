const styles = theme => ({
  mainContaner: {
    margin: "20px auto",
    position: "relative",
    width: 950,
    height: 950
  },
  w1: {
    top: 0,
    left: 0
  },
  w2: {
    top: 0,
    left: 320
  },
  w3: {
    top: 0,
    left: 640
  },
  w4: {
    top: 280,
    left: 0
  },
  w5: {
    top: 280,
    left: 320
  },
  w6: {
    top: 280,
    left: 640
  },
  w7: {
    top: 560,
    left: 0
  },
  w8: {
    top: 560,
    left: 320
  },
  w9: {
    top: 560,
    left: 640
  },
  blockWidget: {
    height: 270,
    width: 310,
    display: "block",
    position: "absolute",
    overflow: "hidden",
    transition: "all ease 0.3s",
    boxShadow:
      "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
  },
  blockChat: {
    position: "fixed",
    display: "flex",
    width: 360,
    height: 600,
    right: 20,
    bottom: -550,
    backgroundColor: "#fff",
    border: "1px solid #acacac",
    borderRadius: 4,
    boxShadow: "0 0 10px grey",
    "& img": {
      width: 24,
      height: 24,
      opacity: 0.6,
      margin: 12
    }
  },
  subChat: {
    marginTop: 8,
    "& span": {
      fontSize: "1em",
      padding: "0.25em",
      marginRight: 10
    },
    "& button": {
      border: "1px solid #FFF",
      marginLeft: 4,
      fontSize: "0.8em",
      padding: "6px 10px",
      borderRadius: 0,
      backgroundColor: "#9eabb9",
      color: "white",
      minWidth: "auto",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#dd2d2d"
      },
      "& span": {
        margin: 0,
        padding: 0,
        fontSize: 12
      }
    }
  },
  boxLogin: {
    display: "flex",
    padding: 0
  },
  boxSecurity: {
    padding: 20,
    paddingTop: "10px !important",
    "& h2": {
      fontSize: 22,
      borderBottom: "solid 1px #dedede",
      marginBottom: 15,
      paddingBottom: 5
    },
    "& p": {
      fontSize: 14,
      marginBottom: 15
    },
    "& $message": {
      marginBottom: 5
    },
    "& $inputLogin": {
      marginBottom: 5
    },
    "& $submit": {
      width: "100%"
    }
  },
  colLeftLogin: {
    maxWidth: "30%",
    flexBasis: "30%",
    textAlign: "center",
    padding: "35px 10px",
    background: "#C7C7C7",
    borderRight: "inset 2px #a7a7a7",
    color: "#fff",
    "& img": {
      width: 100
    },
    "& h2": {
      fontSize: 20,
      color: "darkslategrey"
    },
    "& p": {
      fontSize: 19,
      marginTop: 10
    }
  },
  colRightLogin: {
    maxWidth: "70%",
    flexBasis: "70%",
    padding: 20,
    "& h2": {
      fontSize: 20,
      color: "darkslategrey",
      marginBottom: 15,
      marginTop: 10,
      fontWeight: 600
    }
  },
  formLogin: {
    paddingRight: 0
  },
  iconInput: {
    zIndex: 999,
    color: "#ddd"
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
    width: "100%",
    marginBottom: 15
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
    flexDirection: "column",
    marginBottom: 20
  },
  rowBtnRedirect: {
    display: "flex",
    justifyContent: "space-between"
  },
  message: {
    marginBottom: 15,
    flex: 1,
    fontSize: 14,
    lineHeight: "20px"
  },
  messErr: {
    color: "red"
  },
  messSuccmessSucc: {
    color: theme.palette.green.light,
    textAlign: "left"
  },
  linkLogin: {
    textDecoration: "none",
    color: "#A2222D",
    fontSize: 14,
    marginTop: 25
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
    backgroundColor: "#2F4F4F",
    border: "none",
    color: "#fff",
    borderRadius: 5,
    padding: "0px 20px",
    textTransform: "none",
    minHeight: 45,
    fontSize: 14,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    margin: "0 !important",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#313e3e"
    }
  },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 3,
    padding: 5
  },
  mainContent: {
    position: "relative"
  },
  override: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 9999
  }
});

export default styles;
