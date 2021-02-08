import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  dialogBox: {
    maxHeight: "calc(100% - 30px)"
  },
  contentDialog: {
    display: "flex",
    padding: 0,
    flexDirection: "column"
  },
  titlePopup: {
    textAlign: "center",
    margin: "15px 0 10px",
    fontSize: 25,
    fontWeight: "bold"
  },
  rowName: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    margin: "20px auto 50px",
    "& label": {
      fontSize: 18,
      margin: "auto",
      fontWeight: "bold"
    }
  },
  inputName: {
    margin: 0,
    marginLeft: 10
  },
  contentFilter: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
    [device.tablet]: {
      flexDirection: "column"
    }
  },
  columFilter: {
    padding: "0 10px",
    width: "33.3%",
    [device.tablet]: {
      width: "100%"
    }
  },
  titleFilter: {
    fontSize: 14,
    marginBottom: 5
  },
  rowInputDate: {
    margin: 0,
    width: "100%"
  },
  inputRootDate: {
    border: "none",
    background: "none",
    color: "#222",
    fontSize: 13,
    "&:after": {
      content: "none"
    },
    "&:before": {
      content: "none"
    }
  },
  inputInputDate: {
    padding: 5
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
    padding: "8px 15px",
    minWidth: 240,
    borderRadius: 0,
    zIndex: 2
  },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 3,
    padding: 5
  },
  InputTable: {
    padding: 0,
    width: "100% !important",
    fontSize: 13,
    "& input": {
      padding: "5px 5px 6px"
    }
  },
  table1: {
    borderSpacing: 0,
    borderTop: "solid 2px #ababab",
    borderLeft: "solid 2px #ababab",
    width: "100%",
    fontSize: 13,
    color: "#222",
    fontWeight: 400,
    textAlign: "center",
    "& thead": {
      backgroundColor: "#D6D7D1"
    },
    "& tr:nth-child(1) td, tr:nth-child(2) td, tr:nth-child(3) td, tr:nth-child(4) td": {
      backgroundColor: "#E5E5E5"
    },
    "& tr:nth-child(5) td, tr:nth-child(6) td, tr:nth-child(7) td, tr:nth-child(8) td": {
      backgroundColor: "#ECDAC0"
    },
    "& td, th": {
      borderBottom: "1px solid #ababab",
      borderRight: "1px solid #ababab",
      padding: 5,
      fontWeight: 400,
      position: "relative"
    },
    "& td:nth-child(3), td:nth-child(4)": {
      padding: 0
    },
    "& td span": {
      padding: "0 5px",
      fontSize: 12,
      lineHeight: "13px",
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }
  },
  table2: {
    borderSpacing: 0,
    borderTop: "solid 2px #ababab",
    borderLeft: "solid 2px #ababab",
    width: "100%",
    fontSize: 13,
    color: "#222",
    fontWeight: 400,
    textAlign: "center",
    "& thead": {
      backgroundColor: "#D6D7D1"
    },
    "& tr:nth-child(1) td, tr:nth-child(2) td, tr:nth-child(3) td, tr:nth-child(4) td, tr:nth-child(5) td, tr:nth-child(6) td": {
      backgroundColor: "#E5E5E5"
    },
    "& tr:nth-child(7) td, tr:nth-child(8) td, tr:nth-child(9) td, tr:nth-child(10) td, tr:nth-child(11) td": {
      backgroundColor: "#E5E5E5"
    },
    "& tr:nth-child(21) td, tr:nth-child(22) td, tr:nth-child(23) td": {
      backgroundColor: "#E5E5E5"
    },
    "& tr:nth-child(12) td, tr:nth-child(13) td, tr:nth-child(14) td, tr:nth-child(15) td, tr:nth-child(16) td": {
      backgroundColor: "#ECDAC0"
    },
    "& tr:nth-child(17) td, tr:nth-child(18) td, tr:nth-child(19) td, tr:nth-child(20) td": {
      backgroundColor: "#ECDAC0"
    },
    "& td, th": {
      borderBottom: "1px solid #ababab",
      borderRight: "1px solid #ababab",
      padding: 5,
      fontWeight: 400
    },
    "& td:nth-child(3), td:nth-child(4)": {
      padding: 0
    },
    "& td span": {
      padding: "0 5px",
      fontSize: 12,
      lineHeight: "13px",
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }
  },
  table3: {
    borderSpacing: 0,
    borderTop: "solid 2px #ababab",
    borderLeft: "solid 2px #ababab",
    width: "100%",
    fontSize: 13,
    color: "#222",
    fontWeight: 400,
    textAlign: "center",
    "& thead": {
      backgroundColor: "#D6D7D1"
    },
    "& tr td": {
      backgroundColor: "#ECDAC0"
    },
    "& td, th": {
      borderBottom: "1px solid #ababab",
      borderRight: "1px solid #ababab",
      padding: 5,
      fontWeight: 400
    },
    "& td:nth-child(3), td:nth-child(4)": {
      padding: 0
    },
    "& td span": {
      padding: "0 5px",
      fontSize: 12,
      lineHeight: "13px",
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }
  },
  btnRun: {
    height: "100%",
    width: 120,
    margin: 0,
    border: "solid 1px #b7b7b7",
    padding: "2px 15px",
    fontSize: 16
  },
  rowSQL: {
    display: "flex",
    margin: "0 100px 100px",
    "& label": {
      marginRight: 10,
      fontSize: 18,
      fontWeight: 500,
      color: "#222"
    }
  },
  contentSql: {
    width: "100%"
    // border: "solid 1px #ababab",
    // minHeight: 70
  },
  rowBtnSubmit: {
    position: "relative",
    marginLeft: 20
  },
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  menuOptionSQL: {
    backgroundColor: "#7D7E7C",
    "& li": {
      minHeight: "auto",
      color: "#fff",
      fontSize: 12,
      lineHeight: "20px",
      padding: "0 10px"
    }
  },
  p0: {
    padding: "0 !important",
    cursor: "pointer"
  },
  txtError: {
    color: "red",
    margin: "0 146px 2px"
  },
  txtSuccess: {
    color: "#149e52",
    margin: "0 146px 2px"
  }
});
export default styles;
