const drawerWidth = 150;
const styles = theme => ({
  contentPage: {
    display: "flex",
    height: "100%"
  },
  colLeft: {
    maxWidth: "32%",
    flexBasis: "32%",
    height: "100%"
  },
  contentLeft: {
    padding: "0 15px 30px"
  },
  colRight: {
    maxWidth: "68%",
    flexBasis: "68%",
    height: "100%"
  },
  paper: {
    display: "flex",
    backgroundColor: "#353535",
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    color: "#d8d8d8",
    backgroundColor: "#494949",
    fontSize: 14,
    "& h6": {
      fontSize: 14,
      marginLeft: 20
    }
  },
  gutters: {
    minHeight: 45,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    display: "flex",
    justifyContent: "space-between"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    height: 30,
    width: 33,
    minHeight: 30,
    borderRadius: 0,
    backgroundColor: "transparent",
    boxShadow: "none",
    color: "#d8d8d8",
    border: "1px solid transparent",
    "&:hover": {
      color: "#fff",
      backgroundColor: "transparent"
    }
  },
  activeIcon: {
    backgroundColor: "hsla(0,0%,0%,.3)",
    backgroundImage: "linear-gradient(hsla(0,0%,100%,.05), hsla(0,0%,100%,0))",
    borderColor: "hsla(0,0%,0%,.4) hsla(0,0%,0%,.45) hsla(0,0%,0%,.5)",
    boxShadow:
      "0 1px 1px hsla(0,0%,0%,.1) inset, 0 0 1px hsla(0,0%,0%,.2) inset, 0 1px 0 hsla(0,0%,100%,.05)",
    transitionProperty: "background-color, border-color, box-shadow",
    transitionDuration: "10ms",
    transitionTimingFunction: "linear"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#353535",
    borderRightColor: "rgba(0,0,0,0.2)"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    height: "100%"
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  listThumb: {
    padding: "0px 25px",
    textAlign: "center"
  },
  itemThumb: {
    margin: "8px 0",
    padding: 7,
    color: "hsla(0,0%,100%,1)",
    "&:hover": {
      backgroundColor: "hsla(0,0%,100%,.3)",
      backgroundImage:
        "linear-gradient(hsla(0,0%,100%,.05), hsla(0,0%,100%,0))",
      backgroundClip: "padding-box",
      boxShadow:
        "0 1px 0 hsla(0,0%,100%,.05) inset, 0 0 1px hsla(0,0%,100%,.1) inset, 0 0 1px hsla(0,0%,0%,.2)",
      "& $item": {
        boxShadow: "0 0 0 1px hsla(0,0%,0%,.5)",
        opacity: 0.9
      }
    },
    "& *": {
      margin: "auto"
    },
    "& svg": {
      margin: "auto",
      width: 60,
      height: 120
    }
  },
  activeItemThumb: {
    backgroundColor: "hsla(0,0%,100%,.3) !important",
    backgroundImage:
      "linear-gradient(hsla(0,0%,100%,.05), hsla(0,0%,100%,0)) !important",
    backgroundClip: "padding-box",
    boxShadow:
      "0 1px 0 hsla(0,0%,100%,.05) inset, 0 0 1px hsla(0,0%,100%,.1) inset, 0 0 1px hsla(0,0%,0%,.2)",
    "& $item": {
      boxShadow: "0 0 0 1px hsla(0,0%,0%,.5)",
      opacity: 0.9
    }
  },
  item: {
    backgroundColor: "#fff",
    border: "1px solid transparent",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)",
    opacity: 0.8,
    width: "100%"
  },
  close: {
    width: 40,
    height: 40
  },
  toolbar: {
    textAlign: "left",
    minHeight: 45,
    display: "flex",
    position: "relative",
    alignItems: "center",
    backgroundColor: "#494949",
    padding: "0 10px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  groupBtnLeft: {
    display: "flex",
    textAlign: "right",
    alignItems: "center"
  },
  groupBtnCenter: {
    display: "flex",
    textAlign: "right",
    alignItems: "center"
  },
  groupBtnRight: {
    display: "flex",
    textAlign: "right",
    alignItems: "center",
    "& button": {
      margin: "0 5px"
    }
  },
  iconMenuRight: {
    width: 20,
    height: 20,
    color: "#fff",
    "& *": {
      fill: "var(--iron-icon-fill-color, #fff)",
      opacity: 0.8
    },
    "&:hover": {
      "& *": {
        opacity: 1
      }
    }
  },
  page: {
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: theme.spacing(3),
    height: "100%"
  },
  checkbox: {
    padding: 0,
    marginRight: 5,
    "& *": {
      fontSize: 22
    },
    "& svg": {
      fontSize: 22
    }
  },
  rgCheckbox: {
    margin: 0,
    marginRight: 15
  },
  labelCheck: {
    fontSize: 16,
    letterSpacing: 0
  },
  titleLeft: {
    fontSize: 26,
    textAlign: "center",
    color: "#2F4F4F",
    marginTop: 0,
    marginBottom: 0
  },
  rowBtn: {
    display: "flex",
    justifyContent: "space-around",
    "& button": {
      border: "solid 1px darkslategrey",
      minWidth: 100,
      padding: "4px 20px"
    }
  },
  btnActive: {
    backgroundColor: "#2F4F4F !important",
    color: "#fff"
  },
  titleCat: {
    marginTop: 30,
    marginBottom: 15,
    display: "flex",
    "& span": {
      width: 65,
      height: 65,
      borderRadius: "50%",
      border: "solid 1px #2F4F4F",
      fontSize: 45,
      fontWeight: 500,
      textAlign: "center",
      lineHeight: "60px"
    },
    "& h2": {
      color: "darkred",
      paddingTop: 38,
      fontSize: 21,
      fontWeight: 500,
      marginLeft: 8
    }
  },
  contentCat: {
    paddingLeft: 50,
    color: "#2F4F4F",
    "& dt": {
      borderBottom: "solid 1px #2F4F4F",
      fontSize: 16,
      display: "flex",
      marginBottom: 5,
      marginTop: 10,
      justifyContent: "space-between"
    },
    "& dd": {
      fontSize: 22
    }
  },
  errorPage: {
    textAlign: "center",
    "& h2": {
      fontSize: 35,
      marginTop: "10%"
    },
    "& svg": {
      color: "darkslategrey"
    }
  },
  loaddingPage: {
    marginTop: "10%"
  },
  rowTitle: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 13px 10px"
  },
  rowBtnOption: {
    position: "relative"
  },
  btnSave: {
    border: "none !important",
    color: "#fff !important",
    borderRadius: 0,
    padding: "0px 30px",
    textTransform: "none",
    minHeight: 30,
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
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "38%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  pagination: {
    width: "calc(100% - 100px)",
    "& button": {
      padding: "4px 0px",
      minWidth: 34,
      margin: 2,
      borderRadius: 0
    }
  },
  activePage: {
    color: "#e58300",
    fontWeight: "bold"
  }
});

export default styles;
