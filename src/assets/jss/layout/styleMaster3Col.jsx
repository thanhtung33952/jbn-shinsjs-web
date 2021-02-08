/* eslint-disable no-dupe-keys */
import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  containerCompany: {
    width: "100%",
    maxWidth: 1200,
    margin: "auto",
    // marginTop: 8,
    paddingTop: 8,
    fontSize: 14,
    fontFamily: "'M PLUS 1p', sans-serif",
    color: "#253b3a",
    background: "#fff",
    [device.tablet]: {
      marginTop: 0
    },
    "& *": {
      fontFamily: "'M PLUS 1p', sans-serif"
    }
    // background: "rgba(242, 246, 248, 1)",
    // background:
    //   "-moz-linear-gradient(top, rgba(242, 246, 248, 1) 0%, rgba(182, 207, 200, 1) 100%)",
    // background:
    //   "-webkit-gradient(left top, left bottom, color-stop(0%, rgba(242, 246, 248, 1)), color-stop(100%, rgba(182, 207, 200, 1)))",
    // background:
    //   "-webkit-linear-gradient(top, rgba(242, 246, 248, 1) 0%, rgba(182, 207, 200, 1) 100%)",
    // background:
    //   "-o-linear-gradient(top, rgba(242, 246, 248, 1) 0%, rgba(182, 207, 200, 1) 100%)",
    // background:
    //   "-ms-linear-gradient(top, rgba(242, 246, 248, 1) 0%, rgba(182, 207, 200, 1) 100%)",
    // background:
    //   "linear-gradient(to bottom, rgba(242, 246, 248, 1) 0%, rgba(182, 207, 200, 1) 100%)",
    // filter:
    //   "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2f6f8', endColorstr='#b6cfc8', GradientType=0)"
  },
  header: {
    position: "relative",
    backgroundColor: "inherit",
    boxShadow: "none"
  },
  toolbar: {
    padding: 0,
    justifyContent: "space-between",
    minHeight: "auto"
  },
  grLogo: {
    display: "flex"
  },
  logo: {
    "& img": {
      height: 70,
      margin: 5,
      display: "block"
    }
  },
  subLogo: {
    paddingLeft: 4,
    color: "#5E5E5E",
    display: "flex",
    flexDirection: "column",
    "& h1": {
      fontSize: "1.5rem",
      fontFamily: "Hiragino_Kaku_Gothic",
      fontWeight: "bold",
      marginTop: 8,
      color: "#5E5E5E",
      letterSpacing: 0,
      "& span": {
        fontSize: 18,
        fontFamily: "Hiragino_Kaku_Gothic",
        marginLeft: 10
      }
    },
    "& p": {
      fontSize: "0.9rem"
    }
  },
  headerInformation: {
    paddingRight: 0,
    display: "flex",
    flexDirection: "column",
    fontSize: "0.72rem",
    color: "#003366",
    "& span": {
      paddingRight: 20
    },
    "& a": {
      color: "#900606",
      textDecoration: "none",
      "&:hover": {
        color: theme.palette.pink.main
      }
    },
    [device.tablet]: {
      display: "none"
    }
  },
  displayPhone: {
    display: "none",
    [device.tablet]: {
      display: "block"
    }
  },
  iconButtonAvatar: {
    fontSize: 13,
    paddingRight: 5,
    paddingLeft: 5,
    color: "grey",
    "& svg": {
      fontSize: 16,
      verticalAlign: "bottom",
      marginRight: 2
    }
  },
  ulInfo: {
    padding: 0,
    "& li": {
      padding: "0 6px",
      minHeight: 35
    }
  },
  breadcrumbs: {
    color: "#fff",
    minHeight: 25,
    fontSize: "0.8rem",
    lineHeight: "25px",
    textAlign: "center",
    backgroundColor: "#2F4F4F"
  },
  mainContaner: {
    paddingTop: 0,
    [device.mobileL]: {
      padding: "0"
    }
  },
  containerMaster: {
    // height: "calc(100vh - 103px)"
  },
  colLeft: {
    // minHeight: "calc(100vh - 114px)",
    height: "100%",
    overflow: "auto",
    maxWidth: "21%",
    flexBasis: "21%",
    position: "relative",
    [device.tablet]: {
      maxWidth: "100%",
      flexBasis: "100%",
      minHeight: "initial"
    }
  },
  colCenter: {
    // borderLeft: "1px solid #999",
    // borderRight: "1px solid #999",
    // minHeight: "calc(100vh - 114px)",
    height: "100%",
    overflow: "auto",
    // padding: "0 20px 0px",
    padding: 0,
    maxWidth: "79%",
    overflow: "hidden",
    flexBasis: "79%",
    [device.tablet]: {
      maxWidth: "100%",
      flexBasis: "100%",
      border: "none"
    }
  },
  colCenterFull: {
    maxWidth: "100%",
    flexBasis: "100%",
    border: "none",
    minHeight: "auto",
    [device.mobileL]: {
      padding: "0 5px"
    }
  },
  colRight: {
    // minHeight: "calc(100vh - 114px)",
    height: "100%",
    overflow: "auto",
    maxWidth: "23%",
    flexBasis: "23%",
    position: "relative",
    [device.tablet]: {
      maxWidth: "100%",
      flexBasis: "100%",
      minHeight: "initial"
    }
  },
  footer: {
    borderTop: "solid 1px #999"
  },
  boxSecurity: {
    minWidth: 400,
    padding: "0px !important",
    "& h2": {
      backgroundColor: "#F6F7FB",
      padding: "10px 20px",
      borderBottom: "solid 1px #eaeaea",
      textAlign: "center",
      fontWeight: 600
    }
  },
  boxDetailSecurity: {
    minWidth: 700,
    padding: "0px !important",
    "& h2": {
      backgroundColor: "#F6F7FB",
      padding: "10px 20px",
      borderBottom: "solid 1px #eaeaea",
      textAlign: "center",
      fontWeight: 600
    }
  },
  formLocation: {
    padding: "0 5px"
  },
  rootUl: {
    padding: 0,
    "& li": {
      padding: "6px 20px",
      borderBottom: "solid 1px #e6e6e6",
      "& svg": {
        fontSize: 30
      }
    },
    "& *": {
      fontFamily: "'M PLUS 1p', sans-serif"
    }
  },
  inline: {
    "& span": {
      fontWeight: "bold",
      fontSize: 15
    },
    "& p": {
      fontWeight: "500",
      fontSize: 13,
      color: "#2d74f7",
      "& span": {
        marginRight: 15,
        fontSize: 13,
        fontWeight: "500"
      }
    }
  },
  iconEnd: {
    padding: 8,
    "& svg": {
      fontSize: "25px !important"
    }
  },
  menuOptionLocation: {
    border: "solid 1px #e6e6e6",
    borderRadius: 3,
    "&:before": {
      content: `''`,
      position: "absolute",
      top: 0,
      left: "calc(50% - 8px)",
      borderBottom: "solid 2px #757575",
      width: 15
    },
    "& li": {
      fontSize: 13,
      minHeight: 20,
      "&:hover": {
        backgroundColor: "#2d74f7",
        color: "#fff"
      }
    }
  },
  menuOptionSetting: {
    backgroundColor: "#65656522",
    padding: 0,
    borderRadius: 0,
    "& li": {
      fontSize: 11,
      minHeight: 20,
      fontWeight: 500,
      fontFamily: "'M PLUS 1p', sans-serif"
    }
  },
  itemDevice: {
    paddingTop: 0,
    paddingBottom: 0
  },
  avaDevice: {
    "& img": {
      width: 30
    }
  },
  btnUpdateLogUser: {
    backgroundColor: "#0FA89D",
    padding: "2px 25px",
    borderRadius: 0,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0d968c"
    }
  },
  iconProgressUser: {
    color: "gray",
    margin: 30,
    marginLeft: "calc(50% - 15px)"
  },
  box: {
    minWidth: 400,
    padding: "0px !important",
    "& h2": {
      backgroundColor: "#F6F7FB",
      padding: "10px 20px",
      borderBottom: "solid 1px #eaeaea",
      textAlign: "center",
      fontWeight: 600
    }
  },
  form: {
    width: "80%",
    position: "relative",
    textAlign:"center",
    marginLeft: "10%",
    marginBottom: "20px",
    marginTop: "20px"
  },
  formForget: {
    marginTop: 10
  },
  rowInput: {
    marginTop: "5px",
    marginBottom: 0,
    textAlign: "left",
    height: "50px",
    "& label": {
      fontSize: "0.8rem"
    }
  },
  rowInputForm: {
    margin: 0,
    minWidth: "50%"
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
    paddingRight: "110px",
    paddingRight: "0px",
    paddingBottom: "0px",
    paddingTop: "0px",
    height: "30px",
    borderRadius: 0,
    zIndex: 2
  },
  buttonChangePass: {
    marginRight: "50px",
    marginLeft: "40px",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingBottom: "3px",
    width: "25%",
    borderRadius: 0,
    color: "white",
    background: "#008B8B",
    boxShadow : "0 3px gray",
    fontSize: "15px",
    "&:hover": {
      backgroundColor: "#993466"
    }
  },
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "70%",
    marginTop: -12,
    marginLeft: -12
  },
  rowButtonForget: {
    position: "relative",
    marginTop: "20px",
    paddingBottom: "13px"
  },
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
});

export default styles;
