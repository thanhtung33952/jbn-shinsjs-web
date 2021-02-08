import React from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import withRoot from "withRoot";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconError from "@material-ui/icons/ErrorOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
// api
import { apiRoot, folderRoot } from "constant/index.js";
// images
import imgSuccess from "assets/img/icon-success.png";

const styles = theme => ({
  layout: {
    display: "block",
    backgroundColor: "#F5F5F5",
    height: "100%",
    width: "100%",
    position: "fixed",
    left: 0,
    top: 0,
    margin: 0,
    overflow: "hidden",
    "& h4": {
      color: "#666699",
      marginTop: 20,
      fontSize: 25
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "none",
    backgroundColor: "#F5F5F5",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  iconStatus: {
    width: 100,
    height: "auto"
  },
  iconError: {
    color: "#ef0000",
    fontSize: 80
  },
  copyright: {
    marginTop: theme.spacing(5)
  },
  iconProgress: {
    color: "#333",
    position: "absolute",
    top: "calc(50% - 70px)",
    left: "calc(50% - 25px)"
  }
});

class UpdateDevice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadding: true,
      statusSubmit: 0 // -1: error, 0 = normal, 1: success
    };
  }

  componentDidMount = () => {
    document.title = "デバイスの更新";
    let queryParam = new URLSearchParams(this.props.location.search);
    //this.checkUpdateDevice(queryParam);
    this.setState({
      isLoadding: false,
      statusSubmit: 1
    });
  };
  checkUpdateDevice = async queryParam => {
    const dataUpdate = {
      email: queryParam.get("email"),
      location: queryParam.get("location"),
      machineName: queryParam.get("machineName"),
      machineVer: queryParam.get("machineVer"),
      browserName: queryParam.get("browserName"),
      browserVer: queryParam.get("browserVer")
    };

    this.setState({
      isLoadding: false,
      statusSubmit: 1
    });

    // try {
    //   const res = await axios.put(`${apiRoot}/updatedevice`, dataUpdate);
    //   // Failed
    //   if (res.status !== 200) {
    //     this.setState({
    //       isLoadding: false,
    //       statusSubmit: -1
    //     });
    //   }
    //   this.setState({
    //     isLoadding: false,
    //     statusSubmit: 1
    //   });
    // } catch (error) {
    //   this.setState({
    //     isLoadding: false,
    //     statusSubmit: -1
    //   });
    // }
  };

  render = () => {
    const { classes } = this.props;
    const { isLoadding, statusSubmit } = this.state;
    let queryParam = new URLSearchParams(this.props.location.search);
    let codeLogin=queryParam.get("codeLogin");
    if (this.state.redirectHome) {
      return <Redirect to={`${folderRoot}login`} />;
    }

    if (isLoadding) {
      return (
        <main className={classes.layout}>
          <CircularProgress size={54} className={classes.iconProgress} />
        </main>
      );
    }
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {statusSubmit === 1 ? (
              <img
                className={classes.iconStatus}
                src={imgSuccess}
                alt="Success"
              />
            ) : (
              <IconError className={classes.iconError} />
            )}
            <Typography component="h4" variant="h4">
              {statusSubmit === 1
                ? "更新を完了しました。"
                : "更新を失敗しました。"}
            </Typography>
            <Typography component="h4" variant="h4">
              確認コード: {codeLogin}
            </Typography>
            <Typography
              className={classes.copyright}
              variant="caption"
              align="center"
            >
              Copyright © 2019 Jibannet
            </Typography>
          </Paper>
        </main>
      </React.Fragment>
    );
  };
}

UpdateDevice.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(
  withCookies(withRoot(withStyles(styles)(UpdateDevice)))
);
