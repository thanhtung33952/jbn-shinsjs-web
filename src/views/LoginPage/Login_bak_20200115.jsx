import React from "react";
import withRoot from "withRoot";
import { Redirect } from "react-router-dom";
import PropTypes, { instanceOf } from "prop-types";
import { Link } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { Scrollbars } from "react-custom-scrollbars";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {osVersion, osName, browserName} from 'react-device-detect';
// constant
import { folderRoot } from "constant/index.js";
//
import axios from "axios";
import { apiRoot } from "constant/index.js";
// layout
import Master3Col from "layout/Master3Col.jsx";
// component project
import ButtonSjs from "components/ButtonSjs/ButtonSjs.jsx";
import KnownledBase from "components/KnownledBase/KnownledBase.jsx";
// jss
import styles from "assets/jss/views/styleLogin.jsx";

class LoginPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isCheck: 0,
      isLoadding: false,
      message: {
        isError: 0, // 0: normar, 1: ok, -1: error
        text: ""
      },
      eMail: null,
      passWord: null
    };
    // this.socket = null;
  }
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
    console.log(browserName);
    // login error
    if (result === false) {
      message.isError = -1;
      message.text = browserName;
      this.setState({
        message,
        isLoadding: false
      });
      return;
    }
    // console.log(res.data)

    // login success
    //check info user login
    

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
      message,
      isLoadding: false
    });
  };

  render = () => {
    const { classes } = this.props;
    const { isLoadding, isCheck, eMail, passWord, message } = this.state;

    // login success redirect to home
    if (message.isError === 1) {
      return <Redirect to={folderRoot} />;
    }

    const leftCol = (
      <div className={classes.blockButton}>
        <Button variant="outlined" className={classes.button}>
          Creating
        </Button>
        <Button variant="outlined" className={classes.button}>
          Complete
        </Button>
        <Button variant="outlined" className={classes.button}>
          Coding
        </Button>
      </div>
    );

    return (
      <Master3Col
        colLeft={leftCol}
        colRight={<KnownledBase />}
        maxWidthPage={"100%"}
        breadcrumb=""
      >
        <Scrollbars
          renderView={this.renderView}
          renderThumbVertical={this.renderThumbScroll}
          renderThumbHorizontal={props => (
            <div {...props} style={{ display: "none" }} />
          )}
        >
          <Grid container spacing={0} style={{ height: "100%" }}>
            <Grid item xs={9}>
              <div className={classes.textCenter}>
                <span>新</span>
                <Typography variant="h1">SJS</Typography>
              </div>
              <Divider style={{ height: 2 }} />
              {/* form login */}
              <div className={classes.formLogin}>
                <div className={classes.formGroup}>
                  <label htmlFor="eMail">eMail</label>
                  <TextField
                    error={!this.isEmail() && isCheck === -1 ? true : false}
                    className={classes.inputLogin}
                    helperText={
                      !this.isEmail() &&
                      isCheck === -1 &&
                      "メールアドレスは有効がありません。"
                    }
                    placeholder="メールアドレス"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.rootInput,
                        input: classes.thisInput,
                        error: classes.thisInputError
                      }
                    }}
                    onChange={this.handleChangeField("eMail")}
                    onKeyPress={this.onKeyPressLogin}
                  />
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="パスワード">パスワード</label>
                  <TextField
                    error={!passWord && isCheck === -1 ? true : false}
                    className={classes.inputLogin}
                    helperText={
                      !eMail && isCheck === -1 && "必ず入力してください。"
                    }
                    placeholder="パスワードパ"
                    type="password"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.rootInput,
                        input: classes.thisInput,
                        error: classes.thisInputError
                      }
                    }}
                    onChange={this.handleChangeField("passWord")}
                    onKeyPress={this.onKeyPressLogin}
                  />
                </div>
                <Link
                  to={`${folderRoot}forgetpass`}
                  className={classes.linkLogin}
                >
                  パスワードを忘れました？
                </Link>
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
              <div style={{ clear: "both" }} />
              <Divider style={{ height: 2, margin: "15px 0" }} />
              <Typography variant="h6" className={classes.titleSingup}>
                新規登録
              </Typography>
              <Grid container spacing={10}>
                <Grid item xs={6} className={classes.cardLoginLeft}>
                  <Card className={classes.cardLogin}>
                    <CardContent>
                      <Typography className={classes.titleCard}>
                        会社を新規に登録
                      </Typography>
                      <Typography className={classes.textCard}>
                        新規の取引先として会社を登録します。
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.boxBtnCard}>
                      <ButtonSjs textButton="取引先新規登録" />
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={6} className={classes.cardLoginRight}>
                  <Card className={classes.cardLogin}>
                    <CardContent>
                      <Typography className={classes.titleCard}>
                        会社の社員を登録
                      </Typography>
                      <Typography className={classes.textCard}>
                        会社は登録済みで、社員を追加登録します。
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.boxBtnCard}>
                      <ButtonSjs textButton="取引先社員を登録" />
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Scrollbars>
      </Master3Col>
    );
  };
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withCookies(withRoot(withStyles(styles)(LoginPage)));
