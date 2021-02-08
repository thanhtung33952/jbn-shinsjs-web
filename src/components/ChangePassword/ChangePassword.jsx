import React from "react";
import axios from "axios";
import { PropTypes, instanceOf } from "prop-types";
import withRoot from "withRoot";
import { withCookies, Cookies } from "react-cookie";
import { withRouter, Link } from "react-router-dom";
import { Redirect } from "react-router";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
// api
import { apiRoot, folderRoot } from "constant/index.js";

const styles = theme => ({
  formForget: {
    marginTop: 10
  },
  submit: {
    backgroundColor: "#666699",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#993466"
    }
  },
  blockLoadding: {
    textAlign: "center"
  },
  messSendMail: {
    margin: "20px 0",
    fontSize: 14,
    lineHeight: "25px",
    color: "#339966"
  },
  iconCheckSuccess: {
    fontSize: 80,
    color: "#339966"
  },
  rowInput: {
    marginBottom: 0,
    "& label": {
      fontSize: "0.8rem"
    }
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
  },
  redirectLink: {
    color: "grey",
    "& svg": {
      verticalAlign: "middle",
      fontSize: 30,
      marginRight: 6
    }
  }
});

class ChangePassword extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      redirectHome: 0, // 0: normar, 1: show button redirect, 2: redirect
      isLoadding: false,
      message: "",
      statusSubmit: 0, // -1: error, 0 = normal, 1: success
      isCheck: 0, // -1: error, 0 = normal, 1: success
      // data
      // data Login
      data: {
        passwordTemp: { value: "", status: 0 },
        passwordNew: { value: "", status: 0 },
        passwordRe: { value: "", status: 0 }
      },
      passwordTemp: "",
      passwordNew: "",
      passwordRe: ""
    };
  }
  // check validation
  isValid = () => {
    const { passwordTemp, passwordNew, passwordRe } = this.state;

    if (passwordTemp && passwordNew && passwordRe) {
      return true;
    }

    return false;
  };

  strPasswordInvalid = password => {
    // check ký tự 1 byte
    let byteLen = 0;
    for (let i = 0; i < password.length; i++) {
      let c = password.charCodeAt(i);
      byteLen +=
        c < 1 << 7
          ? 1
          : c < 1 << 11
          ? 2
          : c < 1 << 16
          ? 3
          : c < 1 << 21
          ? 4
          : c < 1 << 26
          ? 5
          : c < 1 << 31
          ? 6
          : Number.NaN;
    }

    // xác thực chữ thường
    var lowerCaseLetters = /[a-z]/g;
    // xác thực chữ HOA
    var upperCaseLetters = /[A-Z]/g;
    // xác thực numbers
    var numbers = /[0-9]/g;
    if (!password) {
      return "必ず入力してください。";
    } else if (!password.match(lowerCaseLetters)) {
      return "必ず小文字を入れてください。";
    } else if (!password.match(upperCaseLetters)) {
      return "必ず大文字を入れてください。";
    } else if (!password.match(numbers)) {
      return "必ず数字を入れてください。";
    } else if (password.length < 8) {
      return "必ず8文字以上を入れてください。";
    } else if (byteLen > password.length) {
      return "マルチバイトの文字が入ってはいけません。";
    }
  };
  // check password invalid
  checkPasswordInvalid = name => {
    const { data } = this.state;
    let password = data[name].value;
    // check ký tự 1 byte
    let byteLen = 0;
    for (let i = 0; i < password.length; i++) {
      let c = password.charCodeAt(i);
      byteLen +=
        c < 1 << 7
          ? 1
          : c < 1 << 11
          ? 2
          : c < 1 << 16
          ? 3
          : c < 1 << 21
          ? 4
          : c < 1 << 26
          ? 5
          : c < 1 << 31
          ? 6
          : Number.NaN;
    }

    // xác thực chữ thường
    let lowerCaseLetters = /[a-z]/g;
    // xác thực chữ HOA
    let upperCaseLetters = /[A-Z]/g;
    // xác thực numbers
    let numbers = /[0-9]/g;
    if (
      !password ||
      !password.match(lowerCaseLetters) ||
      !password.match(upperCaseLetters) ||
      !password.match(numbers) ||
      password.length < 8 ||
      byteLen > password.length
    ) {
      data[name].status = -1;
    } else if (
      name === "passwordRe" &&
      data[name].value !== data["passwordNew"].value
    ) {
      data[name].status = -2;
    } else {
      data[name].status = 1;
    }
    this.setState({ data });
  };
  // change value input
  handleChangeText = name => event => {
    const { data } = this.state;
    let val = event.target.value;

    data[name].value = val;
    this.setState({ data });
  };
  // blur field input
  handleBlur = name => () => {
    this.handleCheckValidation(name);
  };
  // validation all
  handleCheckValidation = name => {
    const { data } = this.state;
    if (!data[name].value) {
      data[name].status = -1;
      this.setState({ data });
    } else {
      data[name].status = 1;
      this.setState({ data });
    }
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handelChangePassword();
    }
  };
  // event change password
  handelChangePassword = async () => {
    const { userID } = this.props;
    const { data } = this.state;
    // check validation
    if (
      data.passwordTemp.status !== 1 ||
      data.passwordNew.status !== 1 ||
      data.passwordRe.status !== 1
    ) {
      this.handleCheckValidation("passwordTemp");
      this.checkPasswordInvalid("passwordNew");
      this.checkPasswordInvalid("passwordRe");
      return;
    }

    this.setState({ isCheck: 1, isLoadding: true });
    //start call api change password
    const dataCheckPasss = {
      userID: userID,
      password: data.passwordTemp.value
    };
    const resPass = await axios.post(
      `${apiRoot}/account/checkpasswordtemp`,
      dataCheckPasss
    );
    // check passs faild
    if (!resPass.data.result) {
      this.setState({
        isLoadding: false,
        statusSubmit: -1,
        message: "パスワードが一時的に間違っています"
      });
      return;
    }
    // check passs OK => start update new password
    const dataUpdate = {
      userID: userID,
      password: data.passwordNew.value
    };
    const res = await axios.put(`${apiRoot}/account/infouser`, dataUpdate);
    if (res.status !== 200) {
      this.setState({
        message: "パスワード更新に失敗しました",
        isLoadding: false,
        statusSubmit: -1
      });
    }
    // Update pass OK => start login
    this.handleLogin(res.data.email, res.data.password);
  };
  handleLogin = async (email, password) => {
    // const { cookies } = this.props;
    const dataLogin = {
      email: email,
      password: password
    };
    const res = await axios.post(`${apiRoot}/account/login`, dataLogin);
    const result = res.data;
    // login error
    if (result === false) {
      this.setState({
        message: "Oops, something went wrong!",
        isLoadding: false,
        statusSubmit: -1
      });
    }

    // login success
    // cookies.set(
    //   "authUser",
    //   {
    //     fullName: result.userName,
    //     userId: result.userID,
    //     type: result.role
    //   },
    //   {
    //     path: `/`,
    //     maxAge: 10 * 365 * 24 * 60 * 60 // 10 year
    //   }
    // );
    // cookies.set(
    //   "isNewUser",
    //   {
    //     status: false
    //   },
    //   {
    //     path: `/`,
    //     maxAge: 10 * 365 * 24 * 60 * 60 // 10 year
    //   }
    // );

    this.setState({
      message: "パスワードは正常に更新されました",
      isLoadding: false,
      statusSubmit: 1
    });
  };
  render = () => {
    if (this.state.redirectHome) {
      return <Redirect to={folderRoot} />;
    }
    const { classes } = this.props;
    const { isLoadding, statusSubmit, data, message } = this.state;
    return (
      <div className={classes.formForget}>
        {/* el change password success */}
        {statusSubmit === 1 ? (
          <div className={classes.blockLoadding}>
            <CheckIcon className={classes.iconCheckSuccess} />
            <Typography className={classes.messSendMail}>{message}</Typography>
            <Link to={folderRoot} className={classes.redirectLink}>
              <ArrowRightAltIcon />
              ホームページに戻る
            </Link>
          </div>
        ) : (
          <React.Fragment>
            {/* Temporary password */}
            <FormControl
              margin="normal"
              className={classes.rowInput}
              error={data.passwordTemp.status === -1 ? true : false}
              required
              fullWidth
            >
              <InputLabel htmlFor="仮パスワード">仮パスワード</InputLabel>
              <Input
                type="password"
                autoComplete="password"
                onChange={this.handleChangeText("passwordTemp")}
                onBlur={this.handleBlur("passwordTemp")}
                onKeyDown={this.handleKeyDown}
                placeholder="仮パスワード"
                variant="outlined"
                style={{ marginBottom: 5 }}
              />
              {data.passwordTemp.status === -1 && (
                <FormHelperText>必ず入力してください。</FormHelperText>
              )}
            </FormControl>

            {/* New password */}
            <FormControl
              margin="normal"
              className={classes.rowInput}
              error={data.passwordNew.status === -1 ? true : false}
              required
              fullWidth
            >
              <InputLabel htmlFor="新しいパスワード">
                新しいパスワード
              </InputLabel>
              <Input
                type="password"
                onChange={this.handleChangeText("passwordNew")}
                onKeyDown={this.handleKeyDown}
                onBlur={() => this.checkPasswordInvalid("passwordNew")}
                placeholder="新しいパスワード"
                variant="outlined"
                style={{ marginBottom: 5 }}
              />
              {data.passwordNew.status === -1 ? (
                <FormHelperText>
                  {this.strPasswordInvalid(data.passwordNew.value)}
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>

            {/* Re-New password */}
            <FormControl
              margin="normal"
              className={classes.rowInput}
              error={
                data.passwordRe.status === -1 || data.passwordRe.status === -2
                  ? true
                  : false
              }
              required
              fullWidth
            >
              <InputLabel htmlFor="パスワードを再入力">
                パスワードを再入力
              </InputLabel>
              <Input
                type="password"
                onChange={this.handleChangeText("passwordRe")}
                onKeyDown={this.handleKeyDown}
                onBlur={() => this.checkPasswordInvalid("passwordRe")}
                placeholder="パスワードを再入力"
                variant="outlined"
                style={{ marginBottom: 5 }}
              />
              {data.passwordRe.status === -1 ? (
                <FormHelperText>
                  {this.strPasswordInvalid(data.passwordRe.value)}
                </FormHelperText>
              ) : data.passwordRe.status === -2 ? (
                <FormHelperText>新しいパスワードが一致しません</FormHelperText>
              ) : (
                ""
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
                onClick={this.handelChangePassword}
              >
                更新する
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

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  userID: PropTypes.string
};

export default withRouter(
  withCookies(withRoot(withStyles(styles)(ChangePassword)))
);
