import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageIcon from "@material-ui/icons/Image";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
// images
import LogoImg from "assets/img/sjs2Logo.png";
// constant
import { imageRoot } from "constant/index.js";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    },
    "& h1": {
      color: "gray",
      marginTop: 0,
      fontSize: 30
    }
  },
  paper: {
    marginTop: 25,
    maxHeight: "calc(100vh - 50px)",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`
  },
  colLeft: {
    borderRight: "solid 1px #ddd",
    backgroundColor: "#F1F1F1"
  },
  colRight: {
    backgroundColor: "#F1F1F1"
  },
  logo: {
    width: 300,
    height: "auto"
  },
  blockNotfound: {
    textAlign: "center",
    padding: 50
  },
  imgNotfound: {
    color: "gray",
    width: 120,
    height: 120,
    margin: "auto"
  },
  blockImage: {
    display: "block",
    "& li": {
      width: "calc(15% - 5px)",
      float: "left",
      margin: 10,
      position: "relative",
      boxShadow:
        "inset 0 0 15px rgba(0,0,0,.1), inset 0 0 0 1px rgba(0,0,0,.05)",
      background: "#eee",
      cursor: "pointer",
      textAlign: "center",
      userSelect: "none",
      listStyle: "none",
      overflow: "hidden",
      "&:before": {
        content: "''",
        display: "block",
        paddingTop: "100%"
      },
      "& img": {
        width: "auto",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 999
      }
    }
  },
  dialog: {
    "& img": {
      width: "100%"
    }
  },
  dialogTitle: {
    padding: "5px 10px"
  },
  dialogContent: {
    // width: 700,
    background: "#f1f1f1",
    padding: 5,
    "& img": {
      display: "block",
      height: "auto"
    }
  }
});

class ReviewImage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      listImg: [],
      imgPreview: null,
      isLoadding: true,
      isOpen: false,
      statusPage: 0 //0:normar , 1: success, -1: error
    };
  }

  componentDidMount = () => {
    const data = JSON.parse(localStorage.getItem("imageData"));
    if (!data) {
      this.setState({ isLoadding: false, statusPage: -1 });
      return;
    }
    this.setState({
      isLoadding: false,
      listImg: data
    });
    localStorage.removeItem("imageData");
  };

  showImageFullSize = item => {
    this.setState({ imgPreview: item, isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render = () => {
    const { classes } = this.props;
    const { isLoadding, listImg, imgPreview, statusPage } = this.state;
    let renderThumb =
      listImg &&
      listImg.length > 0 &&
      listImg.map((item, i) => {
        if (item.preview) {
          return (
            <li key={i} onClick={() => this.showImageFullSize(item)}>
              <img src={item.preview} alt="" />
            </li>
          );
        }
        let src = `${imageRoot}src/uploads/thumbnails/${item}`;
        return (
          <li key={i} onClick={() => this.showImageFullSize(item)}>
            <img src={src} alt="" />
          </li>
        );
      });

    let renderPreview = null;
    let titleImg = null;
    if (imgPreview) {
      if (imgPreview.preview) {
        renderPreview = <img src={imgPreview.preview} alt="" />;
        titleImg = imgPreview.path;
      } else {
        renderPreview = (
          <img src={`${imageRoot}src/uploads/${imgPreview}`} alt="" />
        );
        titleImg = imgPreview;
      }
    }

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {/* copyright */}
            <Grid container className={classes.root}>
              <Grid item xs={12} className={classes.colLeft}>
                {isLoadding ? (
                  <CircularProgress
                    size={50}
                    className={classes.loaddingPage}
                  />
                ) : statusPage === -1 ? (
                  <div className={classes.blockNotfound}>
                    <ImageIcon className={classes.imgNotfound} />
                    <Typography component="h1">Image not found...</Typography>
                  </div>
                ) : (
                  <div className={classes.blockImage}>{renderThumb}</div>
                )}
              </Grid>
              {/* <Grid item xs={4} className={classes.colRight}>
                {renderPreview && renderPreview}
              </Grid> */}
            </Grid>
          </Paper>
          <Dialog
            maxWidth="lg"
            className={classes.dialog}
            onClose={this.handleClose}
            aria-labelledby="image-full-size"
            open={this.state.isOpen}
          >
            <DialogTitle className={classes.dialogTitle} id="image-full-size">{titleImg}</DialogTitle>
            <DialogContent className={classes.dialogContent}>
              {renderPreview}
            </DialogContent>
          </Dialog>
        </main>
      </React.Fragment>
    );
  };
}

ReviewImage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withRouter(
  withCookies(withRoot(withStyles(styles)(ReviewImage)))
);
