import React from "react";
import withRoot from "withRoot";
import axios from "axios";
import { Link } from "react-router-dom";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import io from "socket.io-client";
import uniqid from "uniqid";

import {
  osVersion,
  osName,
  browserName,
  fullBrowserVersion
} from "react-device-detect";
import publicIP from "react-native-public-ip";
// constant
import { folderRoot } from "constant/index.js";
import "index.css";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import FormControl from "@material-ui/core/FormControl"; 
// import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from '@material-ui/core/TextField';
// icons
import DownIcon from "@material-ui/icons/ArrowDropDown";
import PersonIcon from "@material-ui/icons/Person";
import LogoIcon from "assets/img/sjsLogo.png";
import LaptopMacIcon from "assets/img/icon_lap_mac.png";
import LaptopWindowIcon from "assets/img/icon_lap_window.png";
import PhoneAndroidIcon from "assets/img/icon_phone_android.png";
import PhoneAppleIcon from "assets/img/icon_phone_apple.png";
import ComputerIcon from "@material-ui/icons/Computer";
import MoreIcon from "@material-ui/icons/MoreVert";
import jpLocale from "date-fns/locale/ja";
import { formatDistance } from "date-fns";
// constant
import { apiRoot } from "constant/index.js";
// component customer
import Chat from "components/Chat/MainChat.jsx";
// jss
import styles from "assets/jss/layout/styleMaster3Col.jsx";
class CompanyPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.main = React.createRef();
    this.state = {
      isLoadding: false,
      activeStep: 0,
      open: false,
      location: null,
      maxWidthLayout: null,
      isPopupLoginLocation: false,
      isPopupDetailLogUser: false,
      isPopupChangePassWord: false,
      listLocationLog: null,
      listDeviceOnline: null,
      isLoaddingHistory: 0,
      listHistoryLoginUser: null,
      anchorEl: null,
      locationActive: null,
      anchorElSetting: null,
      isClickExitDivece: false,
      ip: null,
      latitude: "",
      longitude: "",
      city: "",
      email: null,
      statusSubmit: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      },
      message: {
        isError: 0, // 0: normar, 1: ok, -1: error
        text: ""
      },
      data: {
        passwordOld: { value: "", status: 0 },
        passwordNew: { value: "", status: 0 },
        passwordRe: { value: "", status: 0 }
      }
    };
    this.containerMaster = React.createRef();
    this.socket = null;
  }
  UNSAFE_componentWillMount = () => {
    const { cookies } = this.props;
    // khởi tạo , connect socket để lấy các thiết bị mà user này đang online
    const userInfo = cookies.get("authUserShinSJS");
    if (userInfo) {
      this.socket = io("https://jibannet-dev.com:6969");
      this.socket.on("updateDeviceList", response => {
        this.setState({ listDeviceOnline: response });
      });
    }
  };
  componentDidMount = () => {
    this.getMyLocation();
    this.getpublicIP();
    setTimeout(() => {
      this.checkExitstSecurity();
    }, 1500);
    const { maxWidthPage } = this.props;
    // set width all page
    if (maxWidthPage) {
      this.main.current.style.maxWidth = maxWidthPage;
      this.setState({ maxWidthLayout: maxWidthPage });
    }

    let currentLocation = window.location.pathname;
    this.setState({ location: currentLocation });

    if (
      currentLocation.indexOf("operation/survey") !== -1 ||
      currentLocation.indexOf("judgement") !== -1 ||
      currentLocation.indexOf("map-survey") !== -1
    ) {
      this.containerMaster.current.style.height = "calc(100vh - 113px)";
      this.main.current.style.maxWidth = 100 + "%";
      document.body.style.background = "rgba(230,230,230)";
      document.body.style.fontFamily = "'M PLUS 1p', sans-serif";
      document.body.style.overflow = "hidden";
    } else if (
      currentLocation.indexOf("/dashboard") !== -1 ||
      currentLocation.indexOf("/login") !== -1
    ) {
      this.containerMaster.current.style.height = "calc(100vh - 113px)";
    } else {
      this.containerMaster.current.style.height = "auto";
      document.body.style.overflow = "auto";
    }
    const { cookies } = this.props;
    if (
      cookies.get("gaShinSJS") === null ||
      cookies.get("gaShinSJS") === undefined
    ) {
      cookies.set("gaShinSJS", uniqid(`${Date.now()}-`), {
        path: `/`,
        maxAge: 1209600
      }); // 1209600 giây -> 2 tuần
    }
  };
  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!nextProps.maxWidthPage) return;
    if (nextProps.maxWidthPage !== this.state.maxWidthLayout) {
      this.setState({
        maxWidthLayout: nextProps.maxWidthPage
      });

      this.main.current.style.maxWidth = nextProps.maxWidthPage;
    } else return;
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
        this.setState({ ip: ip });
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
      // success
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
  handleLogout = () => {
    const { cookies } = this.props;
    cookies.remove("authUserShinSJS", { path: `/` });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  // show list login location
  showLoginLocation = async () => {
    this.setState({ anchorElSetting: null });
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    if (!userInfo || !userInfo.email) {
      return;
    }
    // go api
    try {
      const res = await axios.get(`${apiRoot}/security/${userInfo.email}`);
      // error
      if (res.status !== 200) {
        this.setState({
          listLocationLog: null,
          isPopupLoginLocation: false
        });
      }
      // success
      this.setState({
        listLocationLog: res.data,
        isPopupLoginLocation: true
      });
    } catch (error) {
      this.setState({
        listLocationLog: null,
        isPopupLoginLocation: false
      });
    }
  };
  // customer style scrollbar
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

  convertTimeLogin = date => {
    // if (date) {
    //   let arrDay = new Date(date);
    //   return (
    //     arrDay.getFullYear() +
    //     "年" +
    //     (arrDay.getMonth() + 1) +
    //     "月" +
    //     arrDay.getDate() +
    //     "日"
    //   );
    // }
    // return "データが空です";
    if (date) {
      let now = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Tokyo"
      });
      now = new Date(now);

      let lastLoginDay = new Date(date);
      let offset = now.getTime() - lastLoginDay.getTime();
      let totalDays = Math.round(offset / 1000 / 60 / 60 / 24);
      offset -= totalDays * 1000 * 60 * 60 * 24;

      let totalHours = Math.round(offset / 1000 / 60 / 60);
      offset -= totalHours * 1000 * 60 * 60;
      let totalMinutes = Math.round(offset / 1000 / 60);
      offset -= totalMinutes * 1000 * 60;
      let totalSeconds = Math.round(offset / 1000);

       // fixed lỗi datetime trên safari
       let arrD = date.split(" ");
       let arrDate = arrD[0].split("-"); // yyyy-mm-dd
       let arrTime = arrD[1].split(":"); //hh:misnute:second
       let newDate = new Date(
         arrDate[0],
         arrDate[1],
         arrDate[2],
         arrTime[0],
         arrTime[1],
         arrTime[2]
       );
      return (
        newDate.getFullYear() +
        "年" +
        (newDate.getMonth() < 10
          ? "0" + newDate.getMonth()
          : newDate.getMonth()) +
        "月" +
        (newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()) +
        "日" +
        " " +
        (newDate.getHours() < 10
          ? "0" + newDate.getHours()
          : newDate.getHours()) +
        ":" +
        (newDate.getMinutes() < 10
          ? "0" + newDate.getMinutes()
          : newDate.getMinutes())
      );
      // return {
      //   day: totalDays,
      //   hours: totalHours,
      //   minute: totalMinutes,
      //   second: totalSeconds
      // };
    }
  };

  // close popup location
  handleClosePopupLocation = async () => {
    this.setState({ isPopupLoginLocation: false });
    if (!this.state.isClickExitDivece) return;
    this.checkExitstSecurity();
  };

  // close popup detail log location user
  handleClosePopupDetailLogUser = () => {
    this.setState({ isPopupDetailLogUser: false });
  };

  checkExitstSecurity = async () => {
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    if (!userInfo || !userInfo.email) return;
    // kiểm tra xem có logout device nào không

    const data = {
      email: userInfo.email,
      ip: this.state.ip,
      location: this.state.city,
      machineName: osName,
      machineVer: osVersion,
      browserName: browserName,
      browserVer: fullBrowserVersion
    };
    // console.log(data)
    try {
      const res = await axios.post(`${apiRoot}/checkexistsecurity`, data);
      if (res.status !== 200) {
        return;
      }
      // success
      if (res.data.redirectLogin === 1) {
        this.handleLogout();
      } else {
        // console.log(res.data.id)
        this.socket.emit("deviceOnline", res.data.id);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // open option log location and set id log location
  openOptionLocation = locationId => event => {
    this.setState({
      locationActive: locationId,
      anchorEl: event.currentTarget
    });
  };

  showPopupHistoryLoginUser = () => {
    this.setState({ isPopupDetailLogUser: true });
    this.getHistoryLoginUser();
  };
  // open popup detail log user
  getHistoryLoginUser = async () => {
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    if (!userInfo.email) return;
    this.setState({ isLoaddingHistory: 0 });
    try {
      const res = await axios.get(`${apiRoot}/historylogin/${userInfo.email}`);
      // error
      // console.log(res.data);
      if (res.status !== 200) {
        this.setState({ isLoaddingHistory: -1 });
        return;
      }
      if (!res.data) {
        this.setState({ isLoaddingHistory: -2 });
        return;
      }
      // success
      this.setState({ isLoaddingHistory: 1, listHistoryLoginUser: res.data });
    } catch (error) {
      return;
    }
  };

  // logout location
  logoutLocation = async () => {
    const { locationActive } = this.state;
    if (!locationActive) return;
    // go delete
    try {
      const res = await axios.delete(`${apiRoot}/security/${locationActive}`);
      // error
      if (res.status !== 200) {
        // console.log("delete error");
        return;
      }
      // success
      // remove item in arr location
      let newArr = [...this.state.listLocationLog];
      let indexLocation = newArr.findIndex(x => x.id === locationActive);
      if (indexLocation !== -1) {
        newArr.splice(indexLocation, 1);
        this.setState({ listLocationLog: newArr, isClickExitDivece: true });
      }
    } catch (error) {
      // console.log("delete error");
      return;
    }
    this.setState({ anchorEl: null });
  };
  // close option menu log location
  handleCloseOption = () => {
    this.setState({ anchorEl: null });
  };
  renderThumbScroll({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "rgba(30,30,30,0.2)",
      borderRadius: 5,
      right: -3,
      width: 5
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  // render icon device trên popup các thiết bị đăng nhập
  renderIconDevice = device => {
    switch (device) {
      case "Mac OS":
        return <img src={LaptopMacIcon} alt="Mac OS" />;
      case "Windows":
        return <img src={LaptopWindowIcon} alt="Windows" />;
      case "Android":
        return <img src={PhoneAndroidIcon} alt="Android" />;
      case "iOS":
        return <img src={PhoneAppleIcon} alt="iOS" />;
      default:
        return <ComputerIcon />;
    }
  };

  // kiểm tra xem user có đang online trên thiết bị không
  checkIsOnlineDevice = deviceId => {
    const { listDeviceOnline } = this.state;
    let isOnline =
      listDeviceOnline &&
      listDeviceOnline.findIndex(x => x.deviceId === deviceId);
    if (isOnline !== -1) {
      return true;
    } else {
      return false;
    }
  };

  // Popup Change PassWord

  
  // show Popup Change PassWord
  showChangePassWord = async () => {
    this.setState({ anchorElSetting: null });
    // console.log(userActive);
    this.setState({ isPopupChangePassWord: true });
  };
  // close popup 
  handleClosePopupChangePassWord = async () => {
    this.setState({ isPopupChangePassWord: false });
    this.setState({ anchorEl: null });
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
  // change value input popup
  handleChangeTextPopup = name => event => {
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
    console.log(name);
  };
  
  handleKeyDownPopup = e => {
    if (e.key === "Enter") {
      this.handelChangePassword();
    }
  };
  // event change password
  handelChangePassword = async () => {
    const { data } = this.state;
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
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
      email: userInfo.email,
      odlPassword: data.passwordOld.value,
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
          email: userInfo.email
        }
      });
      
      this.setState({
        isLoadding: false,
        statusSubmit: 1,
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
    const {
      cookies,
      classes,
      colLeft,
      colRight,
      titleHeader,
      subTitleHeader
    } = this.props;
    const {
      data,
      open,
      location,
      isPopupLoginLocation,
      listLocationLog,
      listDeviceOnline,
      listHistoryLoginUser,
      isLoaddingHistory,
      anchorEl,
      anchorElSetting,
      isPopupDetailLogUser,
      isPopupChangePassWord,
      isLoadding,
      statusSubmit,
      message,
      passwordOld
    } = this.state;
    let titleHeaderDefault = "地盤調査報告書";
    let subTitleHeaderDefault =
      "▶︎ 作成者：〇〇　▶︎ 編集許可範囲：調査会社　　▶︎ステータス：作成中";
    const userInfo = cookies.get("authUserShinSJS");
    let displayName;
    if (cookies && userInfo && (userInfo.lastName || userInfo.firstName)) {
      displayName = userInfo.lastName ? `${userInfo.lastName} ` : "";
      displayName += userInfo.firstName ? `${userInfo.firstName} ` : "";
    }
    // console.log(userInfo);
    // console.log(listLocationLog);
    // console.log(listHistoryLoginUser);

    // open menu setting
    const openOptionSetting = Boolean(anchorElSetting);
    // open action log location
    const openOption = Boolean(anchorEl);
    // render list location login
    let itemLocationLogin =
      listLocationLog && listLocationLog.length > 0
        ? listLocationLog.map((item, i) => {
            let nameDevice =
              item.machineName + " " + item.machineVer + " device";
            let timePast = this.convertTimeLogin(item.dateTime);
            let dateTime;
            if (timePast.day) {
              dateTime = timePast.day + " days ago";
            } else if (timePast.hours) {
              dateTime = timePast.hours + ":" + timePast.minute + " ago";
            } else if (timePast.minute) {
              dateTime = timePast.minute + " minutes ago";
            }

            let isOnline = this.checkIsOnlineDevice(item.id);
            return (
              <ListItem
                alignItems="flex-start"
                key={i}
                style={{ paddingLeft: 0 }}
                className={classes.itemDevice}
              >
                <ListItemAvatar className={classes.avaDevice}>
                  {this.renderIconDevice(item.machineName)}
                </ListItemAvatar>
                <ListItemText
                  className={classes.inline}
                  primary={
                    <React.Fragment>
                      {nameDevice}{" "}
                      <span style={{ color: "#38B30B", fontSize: 11 }}>
                        {isOnline && "- 接続中"}
                      </span>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {item.browserName} version {item.browserVer}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-controls="option-menu"
                    edge="end"
                    aria-label="more"
                    className={classes.iconEnd}
                    onClick={this.openOptionLocation(item.id)}
                  >
                    <MoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
        : null;
    // render list detail log login user
    let itemDetailLogUser =
    listHistoryLoginUser && listHistoryLoginUser.length > 0
        ? listHistoryLoginUser.map((item, i) => {
            let nameDevice =
              item.machineName + " " + item.machineVer + " device";
            let timePast = this.convertTimeLogin(item.dateTime);
            let dateTime;
            if (timePast.day) {
              dateTime = timePast.day + " days ago";
            } else if (timePast.hours) {
              dateTime = timePast.hours + ":" + timePast.minute + " ago";
            } else if (timePast.minute) {
              dateTime = timePast.minute + " minutes ago";
            }

            return (
              <ListItem
                alignItems="flex-start"
                key={i}
                style={{ paddingLeft: 20 }}
                className={classes.itemDevice}
              >
                <ListItemAvatar className={classes.avaDevice}>
                  {this.renderIconDevice(item.machineName)}
                </ListItemAvatar>
                <ListItemText
                  className={classes.inline}
                  style={{ width: "40%" }}
                  primary={`${nameDevice}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {item.browserName} version {item.browserVer}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemText
                  className={classes.inline}
                  style={{ marginLeft: 20, width: "50%" }}
                  primary={`${item.location} (${item.ip})`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {timePast}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })
        : null;
    return (
      <React.Fragment>
        <div className={classes.containerCompany} ref={this.main}>
          <AppBar position="static" className={classes.header}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.grLogo}>
                <Link to={`${folderRoot}dashboard`} className={classes.logo}>
                  <img src={LogoIcon} alt="ナレッジベース" />
                </Link>
                <div className={classes.subLogo}>
                  <Typography component="h1">
                    {titleHeader ? titleHeader : titleHeaderDefault}
                    {location && location.indexOf("/survey/sws") !== -1 && (
                      <span>SWSデータ入力用</span>
                    )}
                  </Typography>
                  <Typography>
                    {subTitleHeader ? subTitleHeader : subTitleHeaderDefault}
                  </Typography>
                </div>
              </div>
              {userInfo && (
                <div className={classes.headerInformation}>
                  <span>▶︎ ユーザー：{displayName}さん</span>
                  {/* <span>▶︎ 所属会社：〇〇〇〇</span> */}
                  <span>▶︎ 許可範囲：編集可能</span>
                  <span>
                    ▶︎ 前回表示：8月24日｜
                    <Link to={`${folderRoot}`} onClick={this.handleLogout}>
                      ログアウト
                    </Link>
                  </span>
                  <span
                    onClick={e =>
                      this.setState({
                        anchorElSetting: e.currentTarget
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    ▶︎ 設定
                  </span>
                  {/* menu setting */}
                  <Menu
                    id="setting-menu"
                    anchorEl={anchorElSetting}
                    open={openOptionSetting}
                    onClose={() => this.setState({ anchorElSetting: null })}
                    classes={{
                      list: classes.menuOptionSetting
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
                    <MenuItem onClick={this.showLoginLocation}>
                      セキュリティとログイン
                    </MenuItem>
                    <MenuItem onClick={this.showChangePassWord}>
                      パスワード変更
                    </MenuItem>
                  </Menu>
                  {/* end menu setting */}
                </div>
              )}
              {/* display info user on mobile */}
              {userInfo && (
                <div className={classes.displayPhone}>
                  <IconButton
                    color="inherit"
                    className={classes.iconButtonAvatar}
                    buttonRef={node => {
                      this.anchorEl = node;
                    }}
                    aria-owns={Option ? "menu-profile" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                  >
                    <PersonIcon />
                    {displayName} 様
                    <DownIcon />
                  </IconButton>
                  <Popper
                    placement="top-end"
                    open={open}
                    anchorEl={this.anchorEl}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        id="menu-profile"
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom"
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList className={classes.ulInfo}>
                              <MenuItem>ダッシュボード</MenuItem>
                              <MenuItem onClick={this.handleLogout}>
                                ログアウト
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              )}
              {/* display info user on mobile  */}
            </Toolbar>
          </AppBar>
          <div className={classes.breadcrumbs}>{this.props.breadcrumb}</div>
          <div style={{ clear: "both" }} />
          <main className={classes.mainContaner}>
            <Grid
              container
              spacing={0}
              className={classes.containerMaster}
              ref={this.containerMaster}
            >
              {/* col left */}
              {colLeft && (
                <Grid item xs={3} className={classes.colLeft}>
                  {this.props.colLeft}
                </Grid>
              )}

              {/* con center */}
              <Grid
                item
                xs={9}
                className={`${classes.colCenter} ${!colLeft &&
                  !colRight &&
                  classes.colCenterFull}`}
              >
                {this.props.children}
              </Grid>
              {/* col right */}
              {/* {colLeft && (
                <Grid item xs={3} className={classes.colRight}>
                  {this.props.colRight}
                </Grid>
              )} */}
            </Grid>
          </main>
          {/* <div className={classes.footer}>
            Nwe SJS Copyright@2018, Jiban Net all rights reserved
          </div> */}
        </div>
        {/* chat */}
        {userInfo && <Chat userInfo={userInfo} />}
        {/* end chat */}

        {/* popup list login location */}
        {/* dialog security */}
        <Dialog
          maxWidth={"sm"}
          open={isPopupLoginLocation}
          aria-labelledby="responsive-dialog-title"
          onClose={this.handleClosePopupLocation}
        >
          <DialogContent className={classes.boxSecurity}>
            <Typography
              component="h2"
              style={{
                textAlign: "right",
                paddingRight: "10px"
              }}
            >
              ログインしているデバイス
              <IconButton
                variant="outlined"
                style={{ marginLeft: "120px", minWidth: "36px" }}
                onClick={this.handleClosePopupLocation}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            <div className={classes.formLocation}>
              {!itemLocationLogin ? (
                <Typography style={{ margin: 20, textAlign: "center" }}>
                  No data.
                </Typography>
              ) : (
                <React.Fragment>
                  <List className={classes.rootUl}>{itemLocationLogin}</List>
                  <span
                    style={{
                      borderTop: "solid 2px gray",
                      display: "block",
                      textAlign: "right",
                      color: "#00A2FF",
                      padding: "8px 20px",
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                    onClick={this.showPopupHistoryLoginUser}
                  >
                    最近のアクティビティ
                  </span>
                </React.Fragment>
              )}
            </div>
          </DialogContent>
        </Dialog>
        {/* end popup list login location */}

        {/* popup detail list login location */}
        <Dialog
          maxWidth={"md"}
          open={isPopupDetailLogUser}
          onClose={this.handleClosePopupDetailLogUser}
        >
          <DialogContent className={classes.boxDetailSecurity}>
            <Typography
              component="h2"
              style={{
                textAlign: "center",
                paddingRight: "10px"
              }}
            >
              最近のアクティビティ
              <IconButton
                variant="outlined"
                style={{
                  marginTop: -10,
                  minWidth: "36px",
                  float: "right",
                  padding: 10
                }}
                onClick={this.handleClosePopupDetailLogUser}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            <div
              style={{
                textAlign: "right",
                display: "block",
                margin: "15px 24px 10px"
              }}
            >
              <Button
                variant="contained"
                className={classes.btnUpdateLogUser}
                onClick={this.getHistoryLoginUser}
              >
                更新
              </Button>
            </div>
            <div className={classes.formLocation}>
              {isLoaddingHistory === 0 ? (
                <CircularProgress
                  size={30}
                  className={classes.iconProgressUser}
                />
              ) : isLoaddingHistory === -2 ? (
                <Typography
                  style={{ display: "block", textAlign: "center", margin: 20 }}
                >
                  No data
                </Typography>
              ) : isLoaddingHistory === -1 ? (
                <Typography
                  style={{ display: "block", textAlign: "center", margin: 20 }}
                >
                  Oops, something went wrong!
                </Typography>
              ) : (
                <React.Fragment>
                  <List className={classes.rootUl}>{itemDetailLogUser}</List>
                </React.Fragment>
              )}
            </div>
          </DialogContent>
        </Dialog>
        {/* end popup detail list login location */}

        {/* popup dialog passWord */}
        <Dialog
          maxWidth={"sm"}
          style={{ 
            height: 500
          //   top: "0%",
          //   left: "30%",
          //   bottom: "22%",
          //   width: "40%"
          }}
          open={isPopupChangePassWord}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent className={classes.box}>
            <Typography 
              // component="h2" 
              style={{
                textAlign: "right",
                color: "black",
                fontSize: "22px",
                borderRadius: 3,
                backgroundColor: "#F6F7FB",
                fontWeight: "bold"
              }}>
                パスワード変更
                <IconButton 
                  variant="outlined" 
                  style={{
                    marginLeft: "180px",
                    minWidth:"36px",
                    paddingBottom: "10px",
                    paddingTop: "10px",
                  }}
                  onClick={this.handleClosePopupChangePassWord}
                >
                  <CloseIcon />
                </IconButton>
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
                      <div>
                        <label htmlFor="現在のパスワード"
                          style={{
                            fontWeight: "bold",
                            fontSize: "13px",
                            lineHeight: "35px"
                          }}
                        >
                          現在のパスワード
                        </label>
                        <TextField
                          type="password"
                          autoComplete="password"
                          className={classes.rowInputForm}
                          onChange={this.handleChangeTextPopup("passwordOld")}
                          onBlur={this.handleBlur("passwordOld")}
                          onKeyDown={this.handleKeyDownPopup}
                          variant="outlined"
                          style={{ marginBottom: 5, width: "50%", float: "right" }}
                          InputProps={{
                            classes: {
                              root: classes.rootInput,
                              input: classes.thisInput,
                              error: classes.thisInputError
                            }
                          }}
                        />
                        {data.passwordOld.status === -1 && (
                          <FormHelperText
                            style={{
                              paddingBottom: "5px",
                              paddingLeft: "192pxs",
                              marginTop: 0
                            }}
                          >
                            必ず入力してください。</FormHelperText>
                        )}
                      </div>
                    </FormControl>
                    {/* New password */}
                    <FormControl
                      margin="normal"
                      className={classes.rowInput}
                      error={data.passwordNew.status === -1 ? true : false}
                      required
                      fullWidth
                    >
                      <div>
                        <label htmlFor="新しいパスワード"
                          style={{
                            fontWeight: "bold",
                            fontSize: "13px",
                            lineHeight: "35px"
                          }}
                        >
                          新しいパスワード
                        </label>
                        <TextField
                          type="password"
                          className={classes.rowInputForm}
                          onChange={this.handleChangeTextPopup("passwordNew")}
                          onKeyDown={this.handleKeyDownPopup}
                          onBlur={() => this.checkPasswordInvalid("passwordNew")}
                          variant="outlined"
                          style={{ marginBottom: 5, width: "50%", float: "right" }}
                          InputProps={{
                            classes: {
                              root: classes.rootInput,
                              input: classes.thisInput,
                              error: classes.thisInputError
                            }
                          }}
                        />
                        {data.passwordNew.status === -1 ? (
                          <FormHelperText
                            style={{
                              paddingBottom: "5px",
                              paddingLeft: "192px",
                              marginTop: 0
                            }}
                          >
                            {this.strPasswordInvalid(data.passwordNew.value)}
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </div>
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
                      <div>
                        <label htmlFor="新しいパスワード"
                           style={{
                            fontWeight: "bold",
                            fontSize: "13px",
                            lineHeight: "35px"
                          }}
                        >
                            新しいパスワード（確認用）
                        </label>
                        <TextField
                          type="password"
                          className={classes.rowInputForm}
                          onChange={this.handleChangeTextPopup("passwordRe")}
                          onKeyDown={this.handleKeyDownPopup}
                          onBlur={() => this.checkPasswordInvalid("passwordRe")}
                          variant="outlined"
                          style={{ marginBottom: 5, width: "50%", float: "right" }}
                          InputProps={{
                            classes: {
                              root: classes.rootInput,
                              input: classes.thisInput,
                              error: classes.thisInputError
                            }
                          }}
                        />
                        {data.passwordRe.status === -1 ? (
                          <FormHelperText
                            style={{
                              paddingBottom: "5px",
                              paddingLeft: "192px",
                              marginTop: 0
                            }}
                          >
                            {this.strPasswordInvalid(data.passwordRe.value)}
                          </FormHelperText>
                        ) : data.passwordRe.status === -2 ? (
                          <FormHelperText
                            style={{
                              paddingBottom: "20px",
                              paddingLeft: "192px",
                              marginTop: 0
                            }}
                          >
                            新しいパスワードが一致しません
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </div>
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
                        variant="contained"
                        className={classes.buttonChangePass}
                        onClick={this.handelChangePassword}
                      >
                        保存
                      </Button>
                      {isLoadding && (
                        <CircularProgress
                          size={24}
                          className={classes.iconProgress}
                        />
                      )}
                      <Button
                        type="button"
                        variant="contained"
                        className={classes.buttonChangePass}
                        onClick={this.handleClosePopupChangePassWord}
                      >
                        キャンセル
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* end popup dialog passWord */}

        {/* menu action log location */}
        <Menu
          id="option-menu"
          anchorEl={anchorEl}
          open={openOption}
          onClose={this.handleCloseOption}
          classes={{
            list: classes.menuOptionLocation
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
          <MenuItem onClick={() => this.setState({ anchorEl: null })}>
            Not you?
          </MenuItem>
          <MenuItem onClick={this.logoutLocation}>Log out</MenuItem>
        </Menu>
        {/* end menu action log location */}
      </React.Fragment>
    );
  };
}

CompanyPage.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,
  colLeft: PropTypes.node,
  children: PropTypes.node,
  colRight: PropTypes.node,
  maxWidthPage: PropTypes.string,
  breadcrumb: PropTypes.string,
  titleHeader: PropTypes.string,
  subTitleHeader: PropTypes.string,
  userProps: PropTypes.object
};
const mapStateToProps = state => {
  const { userState } = state;
  return {
    userProps: userState
  };
};
export default withCookies(
  connect(mapStateToProps)(withRoot(withStyles(styles)(CompanyPage)))
);
