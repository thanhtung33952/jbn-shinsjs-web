const styles = theme => ({
  listFormChat: {
    right: 210,
    bottom: 0,
    position: "fixed",
    display: "flex",
    zIndex: 99999
  },
  blockChat: {
    position: "fixed",
    right: 20,
    bottom: 20,
    backgroundColor: "darkslategrey",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1b2d2d"
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
  listUserChat: {
    position: "fixed",
    bottom: 0,
    right: -5,
    width: 200,
    height: "100vh",
    backgroundColor: "#F0F4F8",
    borderLeft: "solid 1px #ddd",
    zIndex: 999999
  },
  rootList: {
    height: "calc(100% - 40px)"
  },
  itemUser: {
    paddingTop: 5,
    paddingBottom: 5,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#ddd"
    }
  },
  avatar: {
    width: 35,
    height: 35,
    position: "relative",
    overflow: "inherit"
  },
  textName: {
    "& span": {
      fontSize: 13
    }
  },
  online: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "rgb(66, 183, 42)",
    position: "absolute",
    zIndex: 9999,
    bottom: 0,
    right: 3
  },
  blockControlList: {
    height: 40,
    display: "flex",
    position: "absolute",
    bottom: 0,
    left: 0,
    background: "#fff",
    borderTop: "solid 1px #ddd"
  },
  search: {
    position: "relative",
    marginLeft: 0,
    width: "auto",
    flex: "1 auto"
  },
  searchIcon: {
    width: 40,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      width: 20,
      height: 20,
      color: "#999"
    }
  },
  inputRoot: {
    color: "inherit",
    height: "100%"
  },
  inputInput: {
    padding: "8px 8px 8px 45px",
    width: "100%",
    fontSize: 13
  },
  iconSetting: {
    width: 20,
    height: 20,
    cursor: "pointer",
    color: "#999",
    margin: "auto",
    marginRight: 10
  },
  blockQueue: {
    position: "absolute",
    bottom: 0,
    left: -50
  },
  iconQueue: {
    width: 44,
    height: 42,
    padding: 8,
    border: "solid 1px #dedede",
    color: "#606770",
    borderRadius: "6px 6px 0 0",
    position: "absolute",
    bottom: -2,
    left: 0,
    backgroundColor: "#fff",
    cursor: "pointer"
  },
  paperQueue: {
    position: "relative",
    bottom: 45,
    left: "calc(-100% + 44px)",
    width: "auto",
    "& ul": {
      margin: 0,
      padding: "4px 0",
      "& li": {
        listStyle: "none",
        height: 26,
        lineHeight: "26px",
        display: "flex",
        padding: "0 25px 0  20px",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          backgroundColor: "#e9ebee",
          "& svg": {
            display: "block"
          }
        },
        "& span": {
          marginRight: 10
        },
        "& svg": {
          position: "absolute",
          right: 5,
          fontSize: 14,
          top: 6,
          cursor: "pointer",
          borderRadius: "50%",
          background: "#a7a6a6",
          color: "#fff",
          padding: 1,
          display: "none"
        }
      }
    }
  },
  headList: {
    position: "relative",
    borderBottom: "inset 1px #ddd",
    display: "flex",
    "& $avatar": {
      width: 45,
      height: 45,
      backgroundColor: "#5f9ea0"
    },
    "& $online": {
      width: 13,
      height: 13,
      border: "solid 2px #fff",
      bottom: -2,
      right: 0
    },
    "& $textName": {
      marginLeft: 10
    }
  },
  infoUser: {
    paddingLeft: 10
  },
  optionBlock: {
    position: "relative",
    width: "auto",
    height: "auto"
  },
  iconMore: {
    right: 15,
    color: "#606770",
    bottom: 18,
    width: 30,
    cursor: "pointer",
    position: "absolute"
  },
  paperMore: {
    right: 18,
    bottom: "auto",
    top: 50,
    position: "absolute",
    left: "auto",
    zIndex: 99,
    "& ul": {
      padding: 0,
      "& li": {
        padding: "0 10px",
        whiteSpace: "nowrap",
        "& span": {
          marginRight: 0
        }
      }
    }
  }
});

export default styles;
