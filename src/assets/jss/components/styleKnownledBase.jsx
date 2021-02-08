const styles = theme => ({
  blockKnow: {
    "& *": {
      fontFamily: "'M PLUS 1p', sans-serif",
      fontWeight: 300
    }
  },
  titleSearch: {
    fontSize: 16,
    textAlign: "left",
    color: theme.palette.secondary.dark,
    fontWeight: "bold",
    marginTop: 0,
    "& img": {
      height: 40,
      verticalAlign: "middle",
      marginRight: 5
    }
  },
  search: {
    position: "relative",
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.light,
    marginLeft: 0,
    marginTop: 10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.secondary.main
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(5),
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  lableChild: {
    margin: "10px 0",
    fontSize: 14,
    color: theme.palette.greenDark.main,
    lineHeight: "18px"
  },
  btnSjs: {
    minHeight: 24,
    padding: "3px 12px",
    color: "#fff",
    backgroundColor: theme.palette.pink.main,
    border: "none",
    borderRadius: 15,
    fontSize: 11,
    "&:hover": {
      backgroundColor: theme.palette.pink.light
    }
  },
  listSjs: {
    color: theme.palette.secondary.main,
    paddingLeft: 0,
    paddingTop: 5,
    "& li": {
      borderTop: "dotted 1px",
      borderTopColor: theme.palette.purple.main,
      padding: 8,
      paddingLeft: 0
    }
  },
  textLi: {
    textDecoration: "none",
    color: theme.palette.greenDark.main,
    fontSize: 14,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.purple.main,
      fontWeight: "bold"
    }
  }
});

export default styles;
