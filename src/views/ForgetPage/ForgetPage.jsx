import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// images
import LogoImg from "assets/img/sjsLogo.png";
// component custom
import ForgetPassword from "components/ForgetPassword/ForgetPassword.jsx";
import ChangePassword from "components/ChangePassword/ChangePassword.jsx";
// constant
import { folderRoot } from "constant/index.js";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: "35%",
      marginLeft: "auto",
      marginRight: "auto"
    },
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
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  logo: {
    width: 100,
    height: "auto"
  },
  form: {
    width: "100%",
    position: "relative"
  },
  copyright: {
    marginTop: theme.spacing(5)
  }
});

class ForgetPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      redirectHome: false,
      userID: null
    };
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (!match || !match.params || !match.params.userID) {
      return;
    }

    this.setState({ userID: match.params.userID });
  };

  render = () => {
    const { classes } = this.props;
    if (this.state.redirectHome) {
      return <Redirect to={folderRoot} />;
    }

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <img className={classes.logo} src={LogoImg} alt="Forget password" />
            <Typography component="h4" variant="h4">
              パスワードを取り戻す
            </Typography>

            <div className={classes.form}>
              {this.state.userID ? (
                <ChangePassword userID={this.state.userID} />
              ) : (
                <ForgetPassword />
              )}
            </div>
            {/* copyright */}
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

ForgetPage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withRouter(
  withCookies(withRoot(withStyles(styles)(ForgetPage)))
);
