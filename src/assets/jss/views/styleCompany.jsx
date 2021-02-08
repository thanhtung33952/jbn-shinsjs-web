const styles = theme => ({
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
    marginTop: 30,
    paddingLeft: 20,
    fontSize: 17,
    display: "flex",
    "& span": {
      fontWeight: 600
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
  iconCheckStep: {
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
    marginTop: 15,
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
  }
});

export default styles;
