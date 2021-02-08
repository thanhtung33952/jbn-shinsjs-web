import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Scrollbars } from "react-custom-scrollbars";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import axios from "axios";
import { geolocated } from "react-geolocated";
import {
  osVersion,
  osName,
  browserName,
  browserVersion,
  fullBrowserVersion
} from "react-device-detect";
import publicIP from "react-native-public-ip";
//img
import Logo from "assets/img/sjsLogo.png";
// material ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
// layout
import Master3Col from "layout/Master3Col.jsx";
import MailIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/LockOpen";
import CloseIcon from "@material-ui/icons/Close";
// customer component
import DashboardDesktop from "views/Dashboard/DashboardDesktop.jsx";
import DashboardMobile from "views/Dashboard/DashboardMobile.jsx";
// jss
import styles from "assets/jss/views/styleDashboard.jsx";
// constant
import { apiRoot, folderRoot } from "constant/index.js";

class DashboardMain extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      // param security
      isPopupSecurity: false,
      isLoaddingSecurity: false,
      code: "",
      isCode: 0,
      isCheck: 0,
      statusSecurity: 0, // -1 error, 1: ok
      // end param security
      isPopupLogin: false,
      isLoadding: false,
      message: {
        isError: 0, // 0: normar, 1: ok, -1: error
        text: ""
      },
      userInfo: null,
      eMail: null,
      passWord: null,
      ip: null,
      latitude: "",
      longitude: "",
      city: ""
    };

    this.getMyLocation = this.getMyLocation.bind(this);
  }

  componentDidMount = () => {
    this.getpublicIP();
    this.getMyLocation();
    document.title = "ダッシュボード";
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    // console.log(userInfo)
    if (!userInfo) {
      this.setState({ isPopupLogin: true });
    } else {
      this.setState({ isPopupLogin: false, userInfo: userInfo });
    }
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

  // constructor(props) {
  //   super(props);
  // }

  // renderContent = () => {
  //   const { cookies } = this.props;
  //   const userInfo = cookies.get("authUserShinSJS");

  //   if (isMobile) {
  //     return <DashboardMobile userInfo={userInfo} />;
  //   }
  //   return <DashboardDesktop userInfo={userInfo} />;
  // };
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
    const { eMail, passWord, message } = this.state;
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

    // login success
    // console.log(osName);
    // console.log(osVersion);
    // console.log(browserName);
    // console.log(fullBrowserVersion);
    // console.log(this.state.latitude);
    // console.log(this.state.longitude);
    // console.log(this.state.city);

    // start check security login
    const data1 = {
      userName: result.firstName,
      email: eMail,
      ip: this.state.ip,
      location: this.state.city,
      machineName: osName,
      machineVer: osVersion,
      browserName: browserName,
      browserVer: fullBrowserVersion
    };

    try {
      const resSecurity = await axios.post(`${apiRoot}/checksecurity`, data1);
      console.log(resSecurity);
      if (resSecurity.data.checkMail == 1) {
        this.setState({ isPopupLogin: false, isPopupSecurity: true });
        return;
      }
    } catch (error) {
      console.log(error);
    }

    // set login cho socket
    // this.socket = io("http://jibannet-dev.com:6969");
    // this.socket.emit("login", result.id);
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
      userInfo: {
        lastName: result.lastName,
        firstName: result.firstName,
        email: result.email,
        userId: result.id,
        companyId: result.companyID
      },
      message,
      isLoadding: false,

      // call back cho check security 
      statusSecurity: 1,
      isLoaddingSecurity: false,
      isPopupLogin: false,
      isPopupSecurity: false
    });
  };
  renderView({ style, ...props }) {
    const thumbStyle = {
      paddingRight: 10,
      overflow: "hidden",
      overflowY: "auto",
      marginBottom: 0
    };
    return (
      <div
        id="contentRightSrcoll"
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }
  renderThumbScroll({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "rgba(30,30,30,0.2)",
      borderRadius: 5,
      right: -3,
      width: 5
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }
  changeConfirmationCode = e => {
    this.setState({ code: e.target.value });
  };
  onKeyPressSecurity = e => {
    if (e.key === "Enter") {
      this.handelCheckSecurity();
    }
  };
  handelCheckSecurity = async () => {
    const { cookies } = this.props;
    const { eMail, message, code } = this.state;
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

    // erro
    this.setState({ statusSecurity: -1 });
  };
  render = () => {
    const { classes } = this.props;
    const {
      isLoadding,
      isCheck,
      eMail,
      passWord,
      message,
      isPopupLogin,
      userInfo,
      isPopupSecurity,
      isLoaddingSecurity,
      statusSecurity,
      code,
      isCode
    } = this.state;
    // console.log(userInfo);
    return (
      <React.Fragment>
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={"100%"}
          titleHeader="ダッシュボード"
          breadcrumb="地盤ネット株式会社｜情報システム部｜大西　さんのダッシュボード"
        >
          <Scrollbars
            renderView={this.renderView}
            renderThumbVertical={this.renderThumbScroll}
            renderThumbHorizontal={props => (
              <div {...props} style={{ display: "none" }} />
            )}
          >
            {isMobile ? (
              <DashboardMobile userInfo={userInfo} />
            ) : (
              <DashboardDesktop userInfo={userInfo} />
            )}
          </Scrollbars>
        </Master3Col>
        {/* popup login */}

        <Dialog
          maxWidth={"sm"}
          open={isPopupLogin}
          aria-labelledby="responsive-dialog-title"
        >
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => this.setState({ isPopupLogin: false })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent className={classes.boxLogin}>
            <div className={classes.colLeftLogin}>
              <img src={Logo} alt="Shin sjs" />
              <Typography component="h2">
                SJS<span>へようこそ</span>
              </Typography>
            </div>
            <div className={classes.colRightLogin}>
              <Typography component="h2">Login</Typography>
              <div className={classes.formLogin}>
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
                <div className={classes.messageAndButton}>
                  {/* message */}
                  <Typography
                    className={`${classes.message} ${
                      message.isError === -1
                        ? classes.messErr
                        : classes.messSucc
                    }`}
                  >
                    {message.isError !== 0 && message.text}
                  </Typography>
                  {/* end message */}
                  <div className={classes.rowBtnRedirect}>
                    <Link
                      to={`${folderRoot}forgetpass`}
                      className={classes.linkLogin}
                    >
                      パスワードを忘れました？
                    </Link>
                    <div className={classes.rowButtonLogin}>
                      <Button
                        disabled={isLoadding}
                        type="button"
                        variant="contained"
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
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                onChange={this.changeConfirmationCode}
                onKeyPress={this.onKeyPressSecurity}
              />
              <div className={classes.messageAndButton}>
                {/* message */}
                {statusSecurity === -1 && (
                  <Typography
                    className={`${classes.message} ${classes.messErr}`}
                  >
                    確認コードが間違っています。
                  </Typography>
                )}
                {/* row check */}
                <div className={classes.rowButtonLogin}>
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
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
}

DashboardMain.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(DashboardMain)));
