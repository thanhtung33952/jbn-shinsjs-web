const styles = theme => ({
  titleForm: {
    color: "#222222",
    textAlign: "center",
    margin: "20px 0 30px"
  },
  resultSendmail: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: theme.palette.green.dark
  },
  noteAfterRegister: {
    color: theme.palette.pink.dark,
    marginTop: 10,
    textAlign: "center",
    fontSize: 13
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
