const styles = theme => ({
  mainContaner: {
    margin: "20px auto",
    position: "relative",
    width: 950,
    maxWidth: "100%",
    height: 950
  },
  w1: {
    top: 0,
    left: 0
  },
  // w2: {
  //   top: 0,
  //   left: 320
  // },
  // w3: {
  //   top: 0,
  //   left: 640
  // },
  // w4: {
  //   top: 280,
  //   left: 0
  // },
  // w5: {
  //   top: 280,
  //   left: 320
  // },
  // w6: {
  //   top: 280,
  //   left: 640
  // },
  // w7: {
  //   top: 560,
  //   left: 0
  // },
  // w8: {
  //   top: 560,
  //   left: 320
  // },
  // w9: {
  //   top: 560,
  //   left: 640
  // },
  blockWidget: {
    width: "calc(50% - 10px)",
    display: "block",
    position: "absolute",
    overflow: "hidden",
    transition: "all ease 0.5s",
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
  }
});

export default styles;
