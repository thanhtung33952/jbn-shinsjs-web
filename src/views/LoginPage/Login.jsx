import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import {
  osVersion,
  osName,
  browserName,
  browserVersion,
  fullBrowserVersion
} from "react-device-detect";
import publicIP from "react-native-public-ip";

// icon
import MailIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/LockOpen";
import CircularProgress from "@material-ui/core/CircularProgress";
// images
import LogoImg from "assets/img/sjsLogo.png";
// constant
// constant
import { apiRoot, folderRoot } from "constant/index.js";
import axios from "axios";

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
      color: "#222222",
      marginTop: 20,
      marginBottom: 50,
      fontSize: 22
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
    height: "auto",
    marginTop: 20
  },
  form: {
    width: "100%",
    padding: "0 50px",
    position: "relative"
  },
  inputLogin: {
    width: "100%",
    marginBottom: 20
  },
  rowInputForm: {
    margin: 0,
    minWidth: "70%",
    "& p": {
      marginLeft: 0
    }
  },
  rootInput: {
    "& fieldset": {
      borderRadius: 5,
      borderColor: theme.palette.secondary.main + `${"!important"}`,
      backgroundColor: "#fff"
    }
  },
  thisInputError: {
    "& fieldset": {
      borderColor: theme.palette.pink.main + `${"!important"}`
    }
  },
  iconInput: {
    zIndex: 999,
    color: "#cacaca"
  },
  thisInput: {
    padding: 12,
    borderRadius: 0,
    zIndex: 2,
    color: "#616161"
  },
  copyright: {
    marginTop: theme.spacing(25)
  },
  rowButtonLogin: {
    position: "relative"
  },
  submit: {
    backgroundColor: "#007c77",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#03615d"
    }
  },
  iconProgress: {
    color: "gray",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  message: {
    marginBottom: 15,
    flex: 1,
    fontSize: 14,
    lineHeight: "20px"
  },
  messErr: {
    color: "red"
  },
  messSucc: {
    color: theme.palette.green.light,
    textAlign: "left"
  },
  boxSecurity: {
    padding: 20,
    paddingTop: "10px !important",
    "& h2": {
      fontSize: 22,
      borderBottom: "solid 1px #dedede",
      marginBottom: 15,
      paddingBottom: 5
    },
    "& p": {
      fontSize: 14,
      marginBottom: 15
    },
    "& $message": {
      marginBottom: 5
    },
    "& $inputLogin": {
      marginBottom: 5
    },
    "& $submit": {
      width: "100%"
    }
  },
  formLogin: {
    paddingRight: 0
  }
});

class LoginPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      redirectHome: false,
      // param security
      isPopupSecurity: false,
      isLoaddingSecurity: false,
      code: "",
      isCode: 0,
      isCheck: 0,
      statusSecurity: 0, // -1 error, 1: ok
      // end param security
      isLoadding: false,
      message: {
        isError: 0, // 0: normar, 1: ok, -1: error
        text: ""
      },
      eMail: null,
      passWord: null,
      ip: null,
      latitude: "",
      longitude: "",
      city: ""
    };
  }

  componentDidMount = () => {
    this.getpublicIP();
    this.getMyLocation();
    document.title = "ログイン";
  };

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          this.getCity();
        },
        error => {
          this.setState({ latitude: "0", longitude: "0" });
        }
      );
    }
  }

  getpublicIP() {
    publicIP()
      .then(ip => {
        console.log(ip);
        this.setState({ ip: ip });
        // '47.122.71.234'
      })
      .catch(error => {
        console.log(error);
        // 'Unable to get IP address.'
      });
  }

  getCity = async () => {
    try {
      const res = await axios.get(
        `https://jinos.online/geocode/coordinate?lat=${this.state.latitude}&lng=${this.state.longitude}`
      );
      // error
      if (res.status !== 200 || res.data === false) {
        this.setState({ city: "" });
        return;
      }
      // success
      if (!res.data.city) {
        this.setState({ city: "" });
      } else {
        this.setState({ city: res.data.city });
      }
    } catch (error) {
      console.log(error);
      this.setState({ city: "" });
    }
  };
  isEmail = () => {
    if (!this.state.eMail) {
      return false;
    }

    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(this.state.eMail).toLowerCase())) {
      return false;
    } else {
      return true;
    }
  };
  isValidation = () => {
    const { eMail, passWord } = this.state;
    if (!eMail || !passWord || !this.isEmail()) {
      this.setState({ isCheck: -1 });
      return false;
    } else {
      this.setState({ isCheck: 1 });
      return true;
    }
  };

  handleChangeField = name => e => {
    this.setState({ [name]: e.target.value });
  };

  onKeyPressLogin = e => {
    if (e.key === "Enter") {
      this.handelLogin();
    }
  };

  handelLogin = async () => {
    const { cookies } = this.props;
    const { eMail, passWord, ip, city, message } = this.state;
    const validaion = this.isValidation();
    if (!validaion) return;
    this.setState({ isLoadding: true });
    // start login
    const data = {
      email: eMail,
      password: passWord
    };
    const res = await axios.post(`${apiRoot}/account/login`, data);
    const result = res.data;
console.log(result)
    // login error
    if (result === false) {
      message.isError = -1;
      message.text = "メールアドレスまたはパスワードが間違っています。";
      this.setState({
        message,
        isLoadding: false
      });
      return;
    }
    // console.log(res.data)

    // start check security login
    const dataCheckSecurity = {
      userName: result.firstName,
      email: eMail,
      ip: ip,
      location: city,
      machineName: osName,
      machineVer: osVersion,
      browserName: browserName,
      browserVer: fullBrowserVersion
    };

    try {
      const resSecurity = await axios.post(
        `${apiRoot}/checksecurity`,
        dataCheckSecurity
      );
      // console.log(resSecurity);
      if (resSecurity.data.checkMail == 1) {
        this.setState({ isLoadding: false, isPopupSecurity: true });
        return;
      }
    } catch (error) {
      console.log(error);
      message.isError = -1;
      message.text = "Oops, something went wrong!";
      this.setState({ isLoadding: false, message });
      return;
    }
    // set cookies
    cookies.set(
      "authUserShinSJS",
      {
        lastName: result.lastName,
        firstName: result.firstName,
        email: result.email,
        userId: result.id,
        companyId: result.companyID
      },
      {
        path: `/`,
        maxAge: 10 * 365 * 24 * 60 * 60 // 10 year
      }
    );
    message.isError = 1;
    message.text = "ログイン成功";
    this.setState({
      message,
      isLoadding: false,

      // call back cho check security
      statusSecurity: 1,
      isLoaddingSecurity: false,
      isPopupLogin: false,
      isPopupSecurity: false,
      redirectHome: true
    });

    // call api add history login
    let dataAddHistory = {
      email: result.email,
      ip: ip,
      location: city,
      machineName: osName,
      machineVer: osVersion,
      browserName: browserName,
      browserVer: fullBrowserVersion
    };
    try {
      const resHistory = await axios.post(
        `${apiRoot}/historylogin`,
        dataAddHistory
      );
      // console.log(resSecurity);
      if (resHistory.status !== 200) {
        return;
      }
    } catch (error) {
      return;
    }
  };

  onKeyPressSecurity = e => {
    if (e.key === "Enter") {
      this.handelCheckSecurity();
    }
  };
  handelCheckSecurity = async () => {
    const { eMail, code } = this.state;
    if (!code) {
      this.setState({ isCode: -1 });
      return;
    } else {
      this.setState({ isCode: 1 });
    }
    this.setState({ isLoaddingSecurity: true, statusSecurity: 1 });
    // check login
    let data = {
      email: eMail,
      codeLogin: code
    };
    try {
      const res = await axios.post(`${apiRoot}/checkcodelogin`, data);
      if (res.status !== 200) {
        this.setState({ statusSecurity: -1, isLoaddingSecurity: false });
        return;
      }
      // success
      this.handelLogin();
    } catch (error) {
      console.log(error);
      this.setState({ statusSecurity: -1, isLoaddingSecurity: false });
      return;
    }
  };

  render = () => {
    const { classes } = this.props;
    const {
      isLoadding,
      isCheck,
      eMail,
      passWord,
      message,
      isPopupSecurity,
      isLoaddingSecurity,
      statusSecurity,
      code,
      isCode
    } = this.state;

    if (this.state.redirectHome) {
      return <Redirect to={folderRoot} />;
    }

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <img className={classes.logo} src={LogoImg} alt="Login Shin Sjs" />
            <Typography component="h4" variant="h4">
              ログイン
            </Typography>

            <div className={classes.form}>
              <TextField
                error={!this.isEmail() && isCheck === -1 ? true : false}
                className={classes.inputLogin}
                helperText={
                  !this.isEmail() &&
                  isCheck === -1 &&
                  "メールアドレスは有効がありません。"
                }
                placeholder="eMail"
                variant="outlined"
                InputProps={{
                  classes: {
                    root: classes.rootInput,
                    input: classes.thisInput,
                    error: classes.thisInputError
                  },
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className={classes.iconInput}
                    >
                      <MailIcon />
                    </InputAdornment>
                  )
                }}
                onChange={this.handleChangeField("eMail")}
                onKeyPress={this.onKeyPressLogin}
              />
              <TextField
                error={!passWord && isCheck === -1 ? true : false}
                className={classes.inputLogin}
                helperText={
                  !eMail && isCheck === -1 && "必ず入力してください。"
                }
                placeholder="パスワード"
                type="password"
                variant="outlined"
                InputProps={{
                  classes: {
                    root: classes.rootInput,
                    input: classes.thisInput,
                    error: classes.thisInputError
                  },
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className={classes.iconInput}
                    >
                      <LockIcon />
                    </InputAdornment>
                  )
                }}
                onChange={this.handleChangeField("passWord")}
                onKeyPress={this.onKeyPressLogin}
              />
              {/* message */}
              <Typography
                className={`${classes.message} ${
                  message.isError === -1 ? classes.messErr : classes.messSucc
                }`}
              >
                {message.isError !== 0 && message.text}
              </Typography>
              {/* button login */}
              <div className={classes.rowButtonLogin}>
                <Button
                  disabled={isLoadding}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.submit}
                  onClick={this.handelLogin}
                >
                  ログイン
                </Button>
                {isLoadding && (
                  <CircularProgress
                    size={24}
                    className={classes.iconProgress}
                  />
                )}
              </div>
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
        {/* dialog security */}
        <Dialog
          maxWidth={"sm"}
          open={isPopupSecurity}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent className={classes.boxSecurity}>
            <Typography component="h2">二段階認証</Typography>
            <div className={classes.formLogin}>
              <Typography>
                確認コードを記載したメールを送信しました。<br />
                メールを受信後、確認コードを下記に入力して下さい。
              </Typography>
              <TextField
                error={!code && isCode === -1 ? true : false}
                className={classes.inputLogin}
                helperText={!code && isCode === -1 && "必ず入力してください。"}
                placeholder="確認コード"
                variant="outlined"
                InputProps={{
                  classes: {
                    root: classes.rootInput,
                    input: classes.thisInput,
                    error: classes.thisInputError
                  }
                }}
                onChange={this.handleChangeField("code")}
                onKeyPress={this.onKeyPressSecurity}
              />
              {/* message */}
              {statusSecurity === -1 && (
                <Typography className={`${classes.message} ${classes.messErr}`}>
                  確認コードが間違っています。
                </Typography>
              )}
              {/* row check */}
              <div
                className={classes.rowButtonLogin}
                style={{ marginTop: 10, marginBottom: 15 }}
              >
                <Button
                  disabled={isLoaddingSecurity}
                  type="button"
                  variant="contained"
                  size="large"
                  className={classes.submit}
                  onClick={this.handelCheckSecurity}
                >
                  次へ
                </Button>
                {isLoaddingSecurity && (
                  <CircularProgress
                    size={24}
                    className={classes.iconProgress}
                  />
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withRouter(withCookies(withRoot(withStyles(styles)(LoginPage))));
