import React from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import withRoot from "withRoot";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
//img
import emailSuccess from "assets/img/emailSuccess.png";
// api
import { apiRoot } from "constant/index.js";

const styles = theme => ({
  formForget: {
    marginTop: 50
  },
  submit: {
    backgroundColor: "#007c77",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#03615d"
    }
  },
  blockLoadding: {
    textAlign: "center"
  },
  messSendMail: {
    margin: "20px 0",
    fontSize: 14,
    lineHeight: "25px",
    color: "gray"
  },
  iconCheckSuccess: {
    fontSize: 80,
    color: "#69b600"
  },
  message: {
    minHeight: 25,
    color: "red",
    fontSize: 14,
    padding: 5,
    marginBottom: 10,
    textAlign: "left"
  },
  rowButtonForget: {
    position: "relative",
    marginTop: theme.spacing(3)
  },
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadding: false,
      message: "",
      statusSubmit: 0, // -1: error, 0 = normal, 1: success
      isCheck: 0, // -1: error, 0 = normal, 1: success
      email: ""
    };
  }
  // check validation
  isValid = () => {
    const { email } = this.state;

    if (email) {
      return true;
    }

    return false;
  };
  // check isEmail
  isEmail = email => {
    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(String(email).toLowerCase())) {
      // là email
      return true;
    }
    // k phải email
    return false;
  };
  // change value input
  handleChangeText = name => event => {
    let val = event.target.value;
    this.setState({ [name]: val });
  };
  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handelForget();
    }
  };
  // event forget
  handelForget = async () => {
    const { email } = this.state;
    // check validation
    if (!this.isValid() || !this.isEmail(email)) {
      this.setState({ isCheck: -1 });
      return;
    }

    this.setState({ isCheck: 1, isLoadding: true });
    // start call api forget
    await axios
      .post(`${apiRoot}/account/forgetpassword`, {
        email: email
      })
      .then(() => {
        this.setState({
          isLoadding: false,
          statusSubmit: 1
        });
      })
      .catch(() => {
        this.setState({
          isLoadding: false,
          statusSubmit: -1,
          message: "メールアドレスが存在しません。"
        });
      });
  };
  render = () => {
    const { classes } = this.props;
    const { isLoadding, statusSubmit, isCheck, email, message } = this.state;

    return (
      <div className={classes.formForget}>
        {/* el loadding */}
        {/* {isLoadding && (
          <div className={classes.blockLoadding}>
            <CircularProgress
              size={50}
              className={classes.iconProgress}
              style={{ color: "gray", top: "45%" }}
            />
          </div>
        )} */}
        {/* el Đã sent password temp */}
        {statusSubmit === 1 ? (
          <div className={classes.blockLoadding}>
            <img src={emailSuccess} alt="Email" />
            <Typography className={classes.messSendMail}>
              システムはリンクを登録したイーメールに送信したので、アカウントを確認するようにそのリンクをクリックしてください。
            </Typography>
          </div>
        ) : (
          <React.Fragment>
            {/* Email Control */}
            <FormControl
              margin="normal"
              error={isCheck !== 0 && (!email || !this.isEmail(email))}
              required
              fullWidth
            >
              <InputLabel htmlFor="email">e-Mail</InputLabel>
              <Input
                type="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChangeText("email")}
                onKeyDown={this.handleKeyDown}
                placeholder="e-Mail"
                variant="outlined"
                style={{ marginBottom: 5 }}
              />
              {isCheck !== 0 && (!email || !this.isEmail(email)) && (
                <FormHelperText>無効なメールアドレスです。</FormHelperText>
              )}
            </FormControl>
            {/* message */}
            <Typography className={classes.message}>
              {statusSubmit === -1 && message}
            </Typography>
            {/* button forget */}
            <div className={classes.rowButtonForget}>
              <Button
                disabled={isLoadding}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={classes.submit}
                onClick={this.handelForget}
              >
                次へ進む
              </Button>
              {isLoadding && (
                <CircularProgress size={24} className={classes.iconProgress} />
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  };
}

ForgetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(
  withCookies(withRoot(withStyles(styles)(ForgetPassword)))
);
