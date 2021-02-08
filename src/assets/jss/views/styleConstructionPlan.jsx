const styles = theme => ({
  contentPage: {
    height: "100%",
    width: "100%",
    padding: "0 10px",
    margin: "auto"
  },
  titleForm: {
    margin: "20px auto",
    fontSize: "1.4rem",
    fontWeight: 300,
    borderTop: "3px solid #691919",
    color: "#222"
  },
  subTitlle: {
    color: "#691919"
  },
  contentForm: {
    padding: "0 20px"
  },
  wid1: {
    width: "calc(50% - 10px)",
    border: "1px solid green",
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 20,
    padding: 20,
    display: "inline-block"
  },
  wid2: {
    width: "calc(50% - 10px)",
    border: "1px solid green",
    borderRadius: 12,
    marginLeft: 10,
    marginBottom: 20,
    padding: 20,
    display: "inline-block"
  },
  wid3: {
    width: "100%",
    border: "1px solid green",
    borderRadius: 12,
    marginBottom: 20,
    padding: "0 10px",
    minHheight: 100
  },
  table: {
    float: "right",
    width: "92%",
    border: "none",
    fontSize: 16,
    borderSpacing: 0,
    "& tr td": {
      padding: 10
    },
    "& tr:nth-child(2n + 1)": {
      background: "#dedede"
    }
  },
  rowForm2: {
    display: "flex"
  },
  form21: {
    width: "calc(40% - 10px)",
    marginRight: 10
  },
  form22: {
    width: "calc(60% - 10px)",
    marginLeft: 10
  },
  wid21: {
    border: "1px solid green",
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
    "& dt": {
      display: "flex",
      marginBottom: 20,
      fontSize: 18,
      "& span": {
        width: 50,
        height: 50,
        borderRadius: "50%",
        backgroundColor: "#027C77",
        textAlign: "center",
        fontSize: 20,
        color: "#fff",
        lineHeight: "48px"
      },
      "& p": {
        margin: "auto 10px",
        paddingTop: 26
      }
    }
  },
  wid22: {
    border: "1px solid green",
    borderRadius: 12,
    marginBottom: 20,
    padding: 20 
  },
  input: {
    "& input": {
      border: "2px dotted #691919",
      textAlign: "right",
      padding: "8px 10px",
      width: 80
    }
  },
  btnWid22: {
    backgroundColor: "darkslategrey",
    opacity: 0.4,
    color: "#fff"
  },
  calc: {
    fontSize: 18,
    color: "#666",
    "& li": {
      marginBottom: 15,
      lineHeight: "28px"
    }
  },
  wid33: {
    width: "100%",
    border: "1px solid green",
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
    display: "flex"
  },
  conLeft: {
    width: "35%"
  },
  conRight: {
    width: "65%",
    height: 400,
    border: "1px dotted red"
  },
  btnEnd: {
    width: "70%",
    color: "#fff",
    backgroundColor: "darkslategrey",
    marginLeft: "15%",
    marginBottom: 20,
    padding: 5,
    fontSize: 18
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
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "38%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  activePage: {
    color: "#e58300",
    fontWeight: "bold"
  },
  pagination: {
    width: "100%",
    marginTop: 10,
    "& button": {
      padding: "4px 0px",
      minWidth: 34,
      margin: 2,
      borderRadius: 0
    }
  },
  boxParentSws: {
    border: "none",
    boxShadow: "none",
    marginBottom: 0,
    padding: "10px 0px"
  }
});

export default styles;
