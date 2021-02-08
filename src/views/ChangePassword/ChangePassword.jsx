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
import Paper from "@material-ui/core/Paper";
// api
import { apiRoot, folderRoot } from "constant/index.js";
// images
import LogoImg from "assets/img/sjsLogo.png";

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
  },
  formForget: {
    marginTop: 10
  },
  submit: {
    backgroundColor: "#007c77",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#03504d"
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
      email: null,
      redirectHome: 0, // 0: normar, 1: show button redirect, 2: redirect
      isLoadding: false,
      message: "",
      statusSubmit: 0, // -1: error, 0 = normal, 1: success
      data: {
        passwordOld: { value: "", status: 0 },
        passwordNew: { value: "", status: 0 },
        passwordRe: { value: "", status: 0 }
      }
    };
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (!match || !match.params || !match.params.email) {
      return;
    }

    this.setState({ email: match.params.email });
  };

  // check validation
  isValid = () => {
    const { passwordOld, passwordNew, passwordRe } = this.state;

    if (passwordOld && passwordNew && passwordRe) {
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
    const { data, email } = this.state;
    const { cookies } = this.props;
    // check validation
    if (
      data.passwordOld.status !== 1 ||
      data.passwordNew.status !== 1 ||
      data.passwordRe.status !== 1
    ) {
      this.handleCheckValidation("passwordOld");
      this.checkPasswordInvalid("passwordNew");
      this.checkPasswordInvalid("passwordRe");
      return;
    }

    this.setState({ isLoadding: true });
    //start call api change password
    const updatePasss = {
      email: email,
      oldPassword: data.passwordOld.value,
      newPassword: data.passwordNew.value
    };
    try {
      const res = await axios.put(
        `${apiRoot}/account/updatepassword`,
        updatePasss
      );
      if (res.status !== 200) {
        this.setState({
          isLoadding: false,
          statusSubmit: -1,
          message: "パスワード更新に失敗しました"
        });
      }
      //remove all security
      const res1 = await axios.delete(`${apiRoot}/deletesecuritybyemail`, {
        data: {
          email: email
        }
      });
      
      this.setState({
        isLoadding: false,
        statusSubmit: 1,
        redirectHome: 1,
        message: "パスワード更新の完了"
      });
      // logout
      cookies.remove("authUserShinSJS", { path: `/` });
    } catch (error) {
      this.setState({
        isLoadding: false,
        statusSubmit: -1,
        message: "パスワード更新に失敗しました"
      });
    }
  };

  render = () => {
    const { classes } = this.props;
    const { isLoadding, statusSubmit, data, message } = this.state;
    if (this.state.redirectHome) {
      return <Redirect to={`${folderRoot}login`} />;
    }

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <img className={classes.logo} src={LogoImg} alt="Change password" />
            <Typography component="h4" variant="h4">
              パスワードの変更
            </Typography>

            <div className={classes.form}>
              <div className={classes.formForget}>
                {/* el change password success */}
                {statusSubmit === 1 ? (
                  <div className={classes.blockLoadding}>
                    <CheckIcon className={classes.iconCheckSuccess} />
                    <Typography className={classes.messSendMail}>
                      {message}
                    </Typography>
                    <Link
                      to={`${folderRoot}login`}
                      className={classes.redirectLink}
                    >
                      <ArrowRightAltIcon />
                      ログイン画面へ
                    </Link>
                  </div>
                ) : (
                  <React.Fragment>
                    {/* Temporary password */}
                    <FormControl
                      margin="normal"
                      className={classes.rowInput}
                      error={data.passwordOld.status === -1 ? true : false}
                      required
                      fullWidth
                    >
                      <InputLabel htmlFor="現在のパスワード">
                        現在のパスワード
                      </InputLabel>
                      <Input
                        type="password"
                        autoComplete="password"
                        onChange={this.handleChangeText("passwordOld")}
                        onBlur={this.handleBlur("passwordOld")}
                        onKeyDown={this.handleKeyDown}
                        placeholder="現在のパスワード"
                        variant="outlined"
                        style={{ marginBottom: 5 }}
                      />
                      {data.passwordOld.status === -1 && (
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
                        data.passwordRe.status === -1 ||
                        data.passwordRe.status === -2
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
                        <FormHelperText>
                          新しいパスワードが一致しません
                        </FormHelperText>
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
                        <CircularProgress
                          size={24}
                          className={classes.iconProgress}
                        />
                      )}
                    </div>
                  </React.Fragment>
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
      </React.Fragment>
    );
  };
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withRouter(
  withCookies(withRoot(withStyles(styles)(ChangePassword)))
);
