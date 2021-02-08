import React from "react";
import withRoot from "withRoot";
import PropTypes, { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Redirect, Link } from "react-router-dom";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
// images
import LogoImg from "assets/img/sjsLogo.png";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Popper from "@material-ui/core/Popper";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import RefeshIcon from "@material-ui/icons/Autorenew";
import MenuList from "@material-ui/core/MenuList";
import Snackbar from "@material-ui/core/Snackbar";
import Notification from "components/Notification/Notification.jsx";
//
import axios from "axios";
import {
  osVersion,
  osName,
  browserName,
  browserVersion,
  fullBrowserVersion
} from "react-device-detect";
import publicIP from "react-native-public-ip";
import { apiRoot } from "constant/index.js";
// constant
import { folderRoot } from "constant/index.js";
// jss
const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: "65%",
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
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  logo: {
    width: 90,
    height: "auto"
  },
  form: {
    width: "100%",
    position: "relative"
  },
  copyright: {
    marginTop: theme.spacing(5)
  },
  formRegister: {
    marginTop: 20,
    width: "65%"
  },
  row2: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row"
  },
  submit: {
    backgroundColor: "#666699",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#993466"
    }
  },
  blockLoadding: {
    textAlign: "center",
    paddingLeft: "50px"
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
  rowButtonRegister: {
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
  iconProgressUser: {
    color: "gray"
  },
  btnRefesh: {
    color: "#222222",
    backgroundColor: "#73fdea",
    marginBottom: 20,
    "&:hover": {
      backgroundColor: "#3bd2bd",
      color: "#fff"
    }
  },
  paperTable: {
    marginTop: 20,
    width: "100%"
  },
  table: {
    // border: "solid 1px gray"
  },
  headTb: {
    color: "#222",
    backgroundColor: "#73FDEA",
    "& th": {
      fontWeight: "bold",
      fontSize: 13,
      color: "#222",
      minWidth: 120,
      padding: 14
    }
  },
  bodyTable: {
    "& th, td": {
      padding: 10
    }
  },
  menuOptionUser: {
    border: "solid 1px #e6e6e6",
    borderRadius: 3,
    "&:before": {
      content: `''`,
      position: "absolute",
      top: 0,
      left: "calc(50% - 8px)",
      borderBottom: "solid 2px #757575",
      width: 15
    },
    "& li": {
      fontSize: 13,
      minHeight: 20,
      "&:hover": {
        backgroundColor: "#73FDEA"
      }
    },
    "& a": {
      fontSize: 13,
      minHeight: 20,
      "&:hover": {
        backgroundColor: "#73FDEA"
      }
    }
  },
  iconEnd: {
    padding: 8,
    "& svg": {
      fontSize: "25px !important"
    }
  },
  boxSecurity: {
    minWidth: 600,
    padding: "0px !important",
    "& h2": {
      backgroundColor: "#006666",
      borderBottom: "solid 1px #eaeaea",
      textAlign: "center",
      fontWeight: 600
    }
  },
  form: {
    width: "80%",
    position: "relative",
    textAlign:"right",
    marginLeft: "25px",
    marginBottom: "20px"
  },
  formForget: {
    marginTop: 10
  },
});
class RegisterPage extends React.Component {
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
      anchorEl: null,
      userActive: null,
      isLoaddingListUser: 0, // 0: loadding, -1:error, 1: success
      isLoaddingtUser: 0,
      listUser: [],
      User: [],
      listCompany: [],
      firstName: "",
      lastName: "",
      company: "",
      UserId: "",
      companyId: null,
      eMail: null,
      passWord: null,
      publicIP: null,
      isPopupChangePassWord: false,
      latitude: "",
      longitude: "",
      city: "",
      statusSubmit: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      },
      data: {
        passwordNew: { value: "", status: 0 },
        passwordRe: { value: "", status: 0 }
      }
    };
    // this.socket = null;
  }
  componentDidMount = () => {
    this.getpublicIP();
    this.getMyLocation();
    this.getListCompany();
    this.getListUser();
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
        // console.log(ip);
        this.setState({ publicIP: ip });
        // '47.122.71.234'
      })
      .catch(error => {
        // console.log(error);
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

      if (!res.data.city) {
        this.setState({ city: "" });
      } else {
        this.setState({ city: res.data.city });
      }
    } catch (error) {
      // console.log(error);
      this.setState({ city: "" });
    }
  };

  getListCompany = async () => {
    try {
      const res = await axios.get(`${apiRoot}/companies`);
      if (res.status !== 200 || !res.data) {
        return;
      }
      this.setState({ listCompany: res.data });
    } catch (error) {
      return;
    }
  };
  getListUser = async () => {
    this.setState({ isLoaddingListUser: 0 });
    try {
      const res = await axios.get(`${apiRoot}/users`);
      if (res.status !== 200 || !res.data) {
        this.setState({ isLoaddingListUser: -1 });
        return;
      }
      this.setState({ listUser: res.data, isLoaddingListUser: 1 });
    } catch (error) {
      this.setState({ isLoaddingListUser: -1 });
      return;
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
    const { eMail, lastName, firstName } = this.state;
    if (!eMail || !this.isEmail() || !lastName || !firstName) {
      this.setState({ isCheck: -1 });
      return false;
    } else {
      this.setState({ isCheck: 1 });
      return true;
    }
  };

  // change value input
  handleChangeText = name => event => {
    let val = event.target.value;
    this.setState({ [name]: val });
  };

  onKeyPressRegister = e => {
    if (e.key === "Enter") {
      this.handelRegister();
    }
  };

  handleChangeCompany = event => {
    this.setState({ companyId: event.target.value });
  };

  // open option changepass/delete user
  openOptionUser = user => event => {
    // console.log(user)
    this.setState({
      userActive: user,
      anchorEl: event.currentTarget
    });
  };
  // close option changepass/delete user
  handleCloseUser = () => {
    this.setState({ anchorEl: null });
  };

  closeNotification = () => {
    const { statusSubmit } = this.state;
    statusSubmit.open = false;
    statusSubmit.isLoadding = false;
    statusSubmit.isError = 0;
    statusSubmit.message = "";
    this.setState({ statusSubmit });
  };

  handelRegister = async () => {
    const { listUser, statusSubmit } = this.state;
    const validaion = this.isValidation();
    if (!validaion) return;
    statusSubmit.isLoadding = true;
    statusSubmit.message = "";
    this.setState({ statusSubmit });
    // start register
    const data = {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      email: this.state.eMail,
      companyName: this.state.company,
      password: "",
      affiliationDepartment: null,
      position: null,
      phoneNumber: null,
      mobileNumber: null,
      companyID: null
    };

    // data cho đăng ký user tạm thời
    const dataUserTemp = {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      email: this.state.eMail,
      companyName: this.state.company
    };
    try {
      // gọi api này để có user tạm ( nhận code trong mail)
      const regiterUserTemp = await axios.post(
        `${apiRoot}/temp/user`,
        dataUserTemp
      );
      // console.log(regiterUserTemp)
      // register error
      if (regiterUserTemp.status !== 200 || regiterUserTemp.data.id === -1) {
        statusSubmit.open = true;
        statusSubmit.isLoadding = false;
        statusSubmit.status = -1;
        statusSubmit.message = "登録に失敗しました";
        this.setState({ statusSubmit });
        return;
      }
      // gọi api này để có userId chính thức ( thực hiện event changepass/delete user)
      const res = await axios.post(`${apiRoot}/account/register`, data);
      if (res.status !== 200 || res.data === false) {
        return;
      }
      // add user mới vao list user
      let newUser = {
        ...res.data,
        userId: res.data.id,
        companyDisplayName: res.data.companyName
      };
      let newlistUser = listUser.unshift(newUser);
      // console.log(newlistUser);

      //success
      const data1 = {
        email: this.state.eMail,
        ip: this.state.publicIP,
        location: this.state.city,
        machineName: osName,
        machineVer: osVersion,
        browserName: browserName,
        browserVer: fullBrowserVersion,
        status: 1
      };
      await axios.post(`${apiRoot}/security`, data1);

      statusSubmit.open = true;
      statusSubmit.isLoadding = false;
      statusSubmit.status = 1;
      statusSubmit.message = "登録成功";
      this.setState({ statusSubmit });

      // set lại các giá trị rỗng cho các field trên màn hình
      this.setState({
        isCheck: 0,
        firstName: "",
        lastName: "",
        company: "",
        eMail: ""
      });
    } catch (error) {
      statusSubmit.open = true;
      statusSubmit.isLoadding = false;
      statusSubmit.status = -1;
      statusSubmit.message = "登録に失敗しました";
      this.setState({ statusSubmit });

      // set lại các giá trị rỗng cho các field trên màn hình
      this.setState({
        isCheck: 0,
        firstName: "",
        lastName: "",
        company: "",
        eMail: ""
      });
      return;
    }
  };

  // show Popup Change PassWord
  showChangePassWord = async () => {
    const { userActive, statusSubmit } = this.state;
    this.setState({ anchorElSetting: null });
    // console.log(userActive);
    this.setState({ isPopupChangePassWord: true });
  };
  // close popup 
  handleClosePopupChangePassWord = async () => {
    this.setState({ isPopupChangePassWord: false });
    this.setState({ anchorEl: null });
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

  // change value input popup
  handleChangeTextPopup = name => event => {
    const { data } = this.state;
    let val = event.target.value;

    data[name].value = val;
    this.setState({ data });
  };

  handleKeyDownPopup = e => {
    if (e.key === "Enter") {
      this.handelChangePassword();
    }
  };
  // event change password
  handelChangePassword = async () => {
    const { data, userActive } = this.state;
    // check validation
    if (
      data.passwordNew.status !== 1 ||
      data.passwordRe.status !== 1
    ) {
      this.checkPasswordInvalid("passwordNew");
      this.checkPasswordInvalid("passwordRe");
      return;
    }

    this.setState({ isLoadding: true });
    //start call api change password
    const updatePass = {
      email: userActive.email,
      odlPassword: "",
      newPassword: data.passwordNew.value
    };
    console.log(updatePass);
    try {
      const res = await axios.put(
        `${apiRoot}/account/updatepassword`,
        updatePass
      );
      // console.log(res);
      if (res.status !== 200) {
        this.setState({
          isLoadding: false,
          statusSubmit: -1,
          message: "パスワード更新に失敗しました"
        });
      }
      this.setState({
        isLoadding: false,
        statusSubmit: 1,
        message: "パスワード更新の完了"
      });
    } catch (error) {
      this.setState({
        isLoadding: false,
        statusSubmit: -1,
        message: "パスワード更新に失敗しました"
      });
    }
  };
  // Delete User
  deleteUser = async () => {
    const { userActive, statusSubmit } = this.state;
    const listUserRemove = this.state.listUser;
    if (!userActive) return;
    try {
      const res = await axios.delete(`${apiRoot}/user/${userActive.userId}`);
      // register error
      if (res.status !== 200 || res.data === false) {
        statusSubmit.open = true;
        statusSubmit.status = -1;
        statusSubmit.message = "Delete error";
        this.setState({ anchorEl: null, statusSubmit });
        return;
      }
      // success
      let index = listUserRemove.findIndex(x => x.userId === userActive.userId);
      if (index !== -1) {
        listUserRemove.splice(index, 1);
        this.setState({ listUser: listUserRemove, anchorEl: null });
      }

      statusSubmit.open = true;
      statusSubmit.status = 1;
      statusSubmit.message = "Delete success";
      this.setState({ anchorEl: null, statusSubmit });
    } catch (error) {
      statusSubmit.open = true;
      statusSubmit.status = -1;
      statusSubmit.message = "Delete error";
      this.setState({ anchorEl: null, statusSubmit });
      return;
    }
  };

  render = () => {
    const { classes } = this.props;
    const {
      data,
      isLoadding,
      isCheck,
      lastName,
      firstName,
      company,
      eMail,
      listCompany,
      listUser,
      userActive,
      anchorEl,
      statusSubmit,
      isLoaddingListUser,
      isPopupChangePassWord,
      message
    } = this.state;
    // console.log(listUser)
    let renderItemCompany =
      listCompany.length > 0 &&
      listCompany.map((com, i) => {
        return (
          <MenuItem key={i} value={com.companyId}>
            {com.companyDisplayName}
          </MenuItem>
        );
      });
    // register success redirect to login
    // if (message.isError === 1) {
    //   return <Redirect to={`${folderRoot}login`} />;
    // }

    // open action user
    const openOption = Boolean(anchorEl);
    // console.log(this.state.data);
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <img className={classes.logo} src={LogoImg} alt="Forget password" />
            <Typography component="h4" variant="h4">
              アカウントにサインアップする
            </Typography>
            <div className={classes.formRegister}>
              {/* last and first name */}
              <div className={classes.row2}>
                <FormControl
                  style={{ width: "48%" }}
                  margin="normal"
                  error={isCheck !== 0 && !firstName}
                  fullWidth
                >
                  <InputLabel htmlFor="First name">
                    First name <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Input
                    type="text"
                    autoFocus
                    value={firstName}
                    onChange={this.handleChangeText("firstName")}
                    onKeyDown={this.handleKeyDown}
                    placeholder="First name"
                    variant="outlined"
                    style={{ marginBottom: 5 }}
                    onKeyPress={this.onKeyPressRegister}
                  />
                  {isCheck !== 0 && !firstName && (
                    <FormHelperText>必ず入力してください。</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  style={{ width: "48%" }}
                  margin="normal"
                  error={isCheck !== 0 && !lastName}
                  fullWidth
                >
                  <InputLabel htmlFor="Last name">
                    Last name <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={this.handleChangeText("lastName")}
                    onKeyDown={this.handleKeyDown}
                    placeholder="Last name"
                    variant="outlined"
                    style={{ marginBottom: 5 }}
                    onKeyPress={this.onKeyPressRegister}
                  />
                  {isCheck !== 0 && !lastName && (
                    <FormHelperText>必ず入力してください。</FormHelperText>
                  )}
                </FormControl>
              </div>
              {/* company */}
              <FormControl margin="normal" error={false} fullWidth>
                <InputLabel htmlFor="Company">Company name</InputLabel>
                <Input
                  type="text"
                  onChange={this.handleChangeText("company")}
                  onKeyDown={this.handleKeyDown}
                  value={company}
                  placeholder="Company name"
                  variant="outlined"
                  style={{ marginBottom: 5 }}
                  onKeyPress={this.onKeyPressRegister}
                />
              </FormControl>
              {/* email */}
              <FormControl
                margin="normal"
                error={isCheck !== 0 && (!eMail || !this.isEmail(eMail))}
                fullWidth
              >
                <InputLabel htmlFor="email">
                  e-Mail <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Input
                  type="email"
                  value={eMail}
                  onChange={this.handleChangeText("eMail")}
                  onKeyDown={this.handleKeyDown}
                  placeholder="e-Mail"
                  variant="outlined"
                  style={{ marginBottom: 5 }}
                  onKeyPress={this.onKeyPressRegister}
                />
                {isCheck !== 0 && (!eMail || !this.isEmail(eMail)) && (
                  <FormHelperText>無効なメールアドレスです。</FormHelperText>
                )}
              </FormControl>
              {/* button register */}
              <div className={classes.rowButtonRegister}>
                <Button
                  disabled={statusSubmit.isLoadding}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.submit}
                  onClick={this.handelRegister}
                >
                  {/* サインアップ */}
                  Add user
                </Button>
                {statusSubmit.isLoadding && (
                  <CircularProgress
                    size={24}
                    className={classes.iconProgress}
                  />
                )}
              </div>
            </div>
            {/* table user */}
            <Paper className={classes.paperTable}>
              <Table className={classes.table}>
                <TableHead className={classes.headTb}>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell align="center">Last name</TableCell>
                    <TableCell align="center">First name</TableCell>
                    <TableCell align="center">Company</TableCell>
                    <TableCell align="right" style={{ paddingRight: 0 }}>
                      Mail
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ minWidth: "auto" }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                {isLoaddingListUser === 0 ? (
                  <TableRow>
                    <TableCell colspan={6} align="center">
                      <CircularProgress
                        size={30}
                        className={classes.iconProgressUser}
                      />
                    </TableCell>
                  </TableRow>
                ) : isLoaddingListUser === -1 ? (
                  <TableRow>
                    <TableCell colspan={6} align="center">
                      <Typography
                        style={{
                          color: "red"
                        }}
                      >
                        Oops, something went wrong!
                      </Typography>
                      <Button
                        variant="contained"
                        className={classes.btnRefesh}
                        onClick={this.getListUser}
                      >
                        <RefeshIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : listUser.length === 0 ? (
                  <TableRow>
                    <TableCell colspan={6} align="center">
                      <Typography>データが空です。</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableBody className={classes.bodyTable}>
                    {listUser.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.userId}
                        </TableCell>
                        <TableCell align="center">{row.lastName}</TableCell>
                        <TableCell align="center">{row.firstName}</TableCell>
                        <TableCell align="center">
                          {row.companyDisplayName}
                        </TableCell>
                        <TableCell align="right" style={{ paddingRight: 0 }}>
                          {row.email}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-controls="option-menu"
                            edge="end"
                            aria-label="
                            "
                            className={classes.iconEnd}
                            onClick={this.openOptionUser(row)}
                          >
                            <MoreIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </Paper>
            {/* dialog passWord */}
            <Dialog
              maxWidth={"sm"}
              open={isPopupChangePassWord}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogContent className={classes.boxSecurity}>
                <Typography 
                  // component="h2" 
                  style={{
                    textAlign: "right",
                    color: "white",
                    fontSize: "26px",
                    borderRadius: 3,
                    backgroundColor: "#006666",
                  }}>
                    パスワードの変更
                    <IconButton 
                      variant="outlined" 
                      style={{
                        marginLeft: "150px",
                        minWidth:"36px",
                        paddingBottom: "10px",
                        paddingTop: "10px",
                      }}
                      onClick={this.handleClosePopupChangePassWord}
                    >
                      <CloseIcon />
                    </IconButton>
                </Typography>
                {/* table user */}
                <Table 
                  style={{ 
                    marginTop: "20px",
                    width:"95%",
                    float: "right",
                    fontSize: "16px"
                  }}
                >
                  <TableBody>
                    <tr>
                      <th align="left" 
                        style={{ 
                          width: "50%",
                          paddingBottom: "15px",
                          fontWeight: "normal",
                          paddingLeft: "20px"
                        }}
                      >
                        UserId : <b> { userActive && userActive.userId} </b>
                      </th>
                      <th align="left" 
                        style={{ 
                          width: "50%",
                          paddingBottom: "15px",
                          fontWeight: "normal"
                          
                        }}>
                        Company : <b> {userActive && userActive.companyDisplayName} </b> 
                      </th>
                    </tr>
                    <tr>
                      <th align="left" 
                        style={{ 
                          width: "50%",
                          paddingBottom: "15px",
                          fontWeight: "normal",
                          paddingLeft: "20px"
                        }}>
                        Name : <b> {userActive && userActive.lastName} {userActive && userActive.firstName} </b> 
                      </th>
                      <th align="left" 
                        style={{ 
                          width: "50%",
                          paddingBottom: "15px",
                          fontWeight: "normal" 
                        }}>
                        Mail : <b> {userActive && userActive.email} </b> 
                      </th>
                    </tr>
                  </TableBody>
                </Table>

                <div className={classes.form}>
                  <div className={classes.formForget}>
                    {/* el change password success */}
                    {statusSubmit === 1 ? (
                      <div className={classes.blockLoadding}>
                        <CheckIcon className={classes.iconCheckSuccess} />
                        <Typography className={classes.messSendMail}>
                          {message}
                        </Typography>
                      </div>
                    ) : (
                      <React.Fragment>
                        {/* New password */}
                        <FormControl
                          margin="normal"
                          className={classes.rowInput}
                          error={data.passwordNew.status === -1 ? true : false}
                          required
                          style={{ width: "85%" }}
                        >
                          <InputLabel htmlFor="新しいパスワード">
                            新しいパスワード
                          </InputLabel>
                          <Input
                            type="password"
                            onChange={this.handleChangeTextPopup("passwordNew")}
                            onKeyDown={this.handleKeyDownPopup}
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
                          style={{ width: "85%" }}
                        >
                          <InputLabel htmlFor="パスワードを再入力">
                            パスワードを再入力
                          </InputLabel>
                          <Input
                            type="password"
                            onChange={this.handleChangeTextPopup("passwordRe")}
                            onKeyDown={this.handleKeyDownPopup}
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
                            style={{ width: "85%" }}
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.submit}
                            onClick={this.handelChangePassword}
                          >
                            変更する
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
              </DialogContent>
            </Dialog>
            {/* menu action cho table user */}
            <Menu
              id="option-menu"
              anchorEl={anchorEl}
              open={openOption}
              onClose={this.handleCloseUser}
              classes={{
                list: classes.menuOptionUser
              }}
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
              <MenuItem
                onClick={this.showChangePassWord}
              >
                Change password
              </MenuItem>
              <MenuItem onClick={this.deleteUser}>Delete</MenuItem>
            </Menu>
            {/* end menu action table user */}
            {/* copyright */}
            <Typography
              className={classes.copyright}
              variant="caption"
              align="center"
            >
              Copyright © 2019 Jibannet
            </Typography>
            {/* notifical */}
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              open={statusSubmit.open}
              autoHideDuration={6000}
              onClose={this.closeNotification}
            >
              {statusSubmit.open && (
                <Notification
                  onClose={this.closeNotification}
                  variant={statusSubmit.status === -1 ? "error" : "success"}
                  message={statusSubmit.message}
                />
              )}
            </Snackbar>
          </Paper>
        </main>
      </React.Fragment>
    );
  };
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withCookies(withRoot(withStyles(styles)(RegisterPage)));
