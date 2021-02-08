import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
// constant
import { apiRoot } from "constant/index.js";
// redux action
import { updateValidation } from "actions/surveyActions.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// icon material
import DoneIcon from "@material-ui/icons/Done";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
// icon img
import ExpandCloseIcon from "assets/img/icon_close_survey.png";
import ExpandOpenIcon from "assets/img/icon_open_survey.png";
// custom component
import ViewMapContainer from "components/Map/ViewMapContainer";
import TextFieldSjsAcoor from "components/TextFieldSjsAcoordion/TextFieldSjsAcoordion.jsx";
import AutoComplete from "components/AutoCompleted/AutoComplete.jsx";
import ChatSurvey from "components/ChatSurvey/ChatSurvey.jsx";
// common function
import { getPostion } from "utils/common.js";
// constant
import { folderRoot } from "constant/index.js";
// jss
import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  // acoordion
  acoordion: {
    margin: "10px 0"
  },
  expansionPanelSummary: {
    padding: "5px 10px"
  },
  expansionContent: {
    justifyContent: "space-between"
  },
  headingAcoordion: {
    color: theme.palette.greenDark.dark,
    fontWeight: "400 !important",
    "& img": {
      verticalAlign: "bottom",
      marginRight: 10,
      height: 25
    }
  },
  headingAcoordionRight: {
    color: "#192928",
    fontWeight: "400 !important",
    "& span": {
      fontWeight: "400 !important",
      color: "#192928"
    }
  },
  iconDone: {
    color: theme.palette.pink.main
  },
  acoordionDetail: {
    paddingRight: 60,
    paddingLeft: 60,
    display: "flex",
    flexDirection: "column",
    [device.tablet]: {
      paddingRight: 5,
      paddingLeft: 5
    }
  },
  titleGroup: {
    color: "#fff",
    background: "#6D997E",
    textAlign: "left",
    padding: 5,
    margin: "5px 0"
  },
  formGroup: {
    display: "flex",
    justifyContent: "flex-start",
    margin: "8px 0",
    color: theme.palette.secondary.dark,
    fontSize: 14,
    width: "100%",
    "& label": {
      textAlign: "right",
      width: "20%",
      paddingRight: 15,
      lineHeight: "42px",
      "& svg": {
        height: "100%",
        color: theme.palette.primary.dark
      },
      [device.tablet]: {
        lineHeight: "22px"
      }
    }
  },
  formGroupBtn: {
    justifyContent: "flex-start",
    "& label": {
      lineHeight: "32px",
      [device.tablet]: {
        lineHeight: "22px"
      }
    }
  },
  rowBtnRole: {
    textAlign: "left",
    width: "80%"
  },
  btnRole: {
    marginRight: 10,
    marginBottom: 10,
    borderColor: theme.palette.secondary.main,
    backgroundColor: "#fff",
    color: theme.palette.secondary.dark,
    borderRadius: 0,
    padding: "0px 10px",
    lineHeight: "34px",
    textTransform: "none",
    minHeight: 34,
    fontSize: 14,
    "&:hover": {
      backgroundColor: theme.palette.pink.main,
      borderColor: theme.palette.pink.dark,
      color: "#fff"
    }
  },
  activeRole: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.dark,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark
    }
  },
  lineForm: {
    borderStyle: "inset",
    borderWidth: 1,
    clear: "both",
    marginTop: 0,
    marginBottom: 0,
    width: "80%",
    marginLeft: "20%"
  },
  labEndRow: {
    width: "auto",
    paddingRight: "0 !important",
    paddingLeft: 15,
    textAlign: "left !important"
  },
  rowInputForm: {
    margin: "0 0",
    minWidth: "80%"
  },
  rowInputFormInline40: {
    margin: "0 0",
    minWidth: "40%"
  },
  textAreaForm: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 6,
    margin: 0,
    "& fieldset": {
      borderColor: theme.palette.secondary.main + `${"!important"}`
    }
  },
  btnDefault: {
    backgroundColor: theme.palette.green.light,
    border: "none",
    color: "#fff",
    borderRadius: 4,
    padding: "0px 25px",
    textTransform: "none",
    minHeight: 42,
    fontSize: "1rem",
    marginLeft: 15,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    "&:hover": {
      backgroundColor: theme.palette.pink.main,
      "&:after": {
        borderLeftColor: theme.palette.pink.main
      }
    }
  },
  boxTabs: {
    width: "80%",
    flexGrow: 1
  },
  appBarTab: {
    boxShadow: "none"
  },
  tabRoot: {
    minWidth: "auto",
    border: "solid 1px",
    borderColor: theme.palette.secondary.light,
    borderRight: "none"
  },
  tabSelected: {
    // backgroundColor: theme.palette.indigo.main
  },
  styleIndicator: {
    backgroundColor: "orange"
  },
  conTab: {
    padding: 10,
    border: "solid 1px #dad8d8",
    borderTop: "none",
    textAlign: "left"
  },
  rowInTab: {
    margin: "10px 0",
    display: "flex",
    justifyContent: "space-between"
  },
  textDateTab: {
    backgroundColor: "#fff",
    borderRadius: 6,
    height: "100%",
    margin: 0,
    flex: 1,
    "& button": {
      padding: 7,
      "& svg": {
        fontSize: 22
      }
    },
    "& fieldset": {
      borderColor: theme.palette.secondary.main + `${"!important"}`
    },
    "& input": {
      padding: 8,
      fontSize: 14,
      height: "100%"
    }
  },
  inputRootDate: {
    border: "solid 1px #9e9e9e",
    borderRadius: 5,
    padding: "0 5px",
    "&:before, &:after": {
      content: "none"
    }
  },
  styleSelectbox: {
    backgroundColor: "#fff",
    display: "flex",
    flexGrow: 1,
    borderRadius: "4px !important",
    "&:after": {
      content: "none"
    },
    "&:before": {
      content: "none"
    }
  },
  styleSelect: {
    padding: 8,
    fontSize: 14,
    borderRadius: "4px !important",
    border: "solid 1px",
    borderColor: theme.palette.secondary.main
  },
  btnRead: {},
  styleRead: {
    "& $inputRootDate": {
      borderColor: "transparent !important",
      color: "#222"
    },
    "& $formGroup": {
      "& label": {
        // lineHeight: "20px"
      },
      "& span": {
        // lineHeight: "20px",
        fontWeight: 500
      }
    },
    "& $rowBtnRole": {
      fontWeight: 500
      // width: "auto !important"
    },
    "& $lineForm": {
      // display: "none"
    },
    "& $labEndRow": {
      // width: "auto",
      // paddingLeft: "0px !important",
      fontWeight: 500
    },
    "& $btnRead": {
      // marginLeft: 10,
      // marginTop: -6
    }
  },
  titleTabContent: {
    color: "rgb(170, 4, 27)"
  },
  ulData: {
    padding: 0,
    paddingBottom: 20,
    width: "80%",
    marginLeft: "20%",
    paddingBottom: 20,
    display: "flex",
    flexDirection: "column",
    paddingRight: 50,
    "& button": {
      marginRight: 0,
      width: "100%"
    }
  },
  itemitem: {
    padding: 0,
    height: 40,
    "&:hover": {
      backgroundColor: "#6699ff !Important",
      color: "#fff",
      "& $btnDelete": {
        display: "block"
      }
    }
  },
  itemSelect: {
    backgroundColor: "#6699ff !Important",
    color: "#fff",
    "& $btnDelete": {
      display: "block"
    }
  },
  ulDataTab: {
    border: "solid 1px gray",
    marginTop: 10
  },
  tableTab: {
    width: "100%",
    marginTop: 10,
    borderCollapse: "collapse",
    fontSize: "1rem",
    "& tbody": {
      border: "solid 1px gray"
    },
    "& td, th": {
      padding: "5px 10px"
    }
  },
  rowBtnTabMap: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    "& $btnDefault": {
      backgroundColor: "#6D997E",
      margin: "0 20px",
      boxShadow: "none",
      borderRadius: 0,
      border: "solid 1px gray",
      minHeight: 35
    }
  },
  contentMapTab: {
    width: "100%",
    marginTop: 10
  },
  mapTab: {
    height: 250,
    width: "100%",
    margin: "10px 0"
  },
  popupMap: {
    padding: 0,
    border: "none",
    marginTop: -12,
    "&:before": {
      border: "12px solid transparent",
      marginBottom: -41,
      borderTopWidth: 41,
      borderBottom: "none",
      left: "calc(50% - 6px)"
    },
    "& $statusMar": {
      position: "absolute",
      fontWeight: "bold",
      top: -20,
      right: 2
    }
  },
  popupMapBlue: {
    backgroundColor: "#1DB100",
    "&:before": {
      borderTopColor: "#1DB100"
    },
    "& $statusMar": {
      color: "#127200"
    }
  },
  popupMapYelow: {
    backgroundColor: "#FF9300",
    "&:before": {
      borderTopColor: "#FF9300"
    },
    "& $statusMar": {
      color: "#CC7600"
    }
  },
  popupMapOran: {
    backgroundColor: "#B61A00",
    "&:before": {
      borderTopColor: "#B61A00"
    },
    "& $statusMar": {
      color: "#B61A00"
    }
  },
  popupMapSelect: {
    backgroundColor: "#00A2FF",
    "&:before": {
      borderTopColor: "#00A2FF"
    },
    "& $statusMar": {
      color: "#00A2FF"
    }
  },
  contentPopupM: {
    padding: 8,
    minWidth: 100,
    cursor: "pointer",
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    "& p": {
      margin: 0
    }
  },
  statusMar: {
    position: "absolute",
    fontWeight: "bold",
    top: -20,
    right: 2,
    color: "#B61A00"
  },
  boxChat: {
    border: "solid 1px #4F9AFF",
    width: "80%",
    marginLeft: "20%",
    height: 400
  }
});

// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;
let time = day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
// let time = new Date(
//   day.getFullYear(),
//   day.getMonth(),
//   day.getDate(),
//   day.getHours(),
//   day.getMinutes(),
//   day.getSeconds()
// );

class Acoordion7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      isOpenMap: false,
      tabSurveyCompany: 0,
      isLoadingSearchCompany: false,
      listCompany: [],
      listCompanyKsat: [],
      data: {
        scheduled_survey_company: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          isRequire: false
        },
        survey_method: {
          isVali: 0,
          arrBtn: [
            {
              textBtn: "SS試験（グラウンドプロ）希望",
              valBtn: "ground_pro"
            },
            {
              textBtn: "SS試験（IGP）希望",
              valBtn: "IGP"
            },
            {
              textBtn: "SS試験（半自動）希望",
              valBtn: "semi_automatic"
            },
            {
              textBtn: "SS試験（手回し）希望",
              valBtn: "preparation"
            },
            {
              textBtn: "SS試験（全自動）希望",
              valBtn: "full_automatic"
            },
            {
              textBtn: "表面波探査希望",
              valBtn: "surface_wave"
            },
            {
              textBtn: "ボーリング調査希望",
              valBtn: "bowling_investigation"
            }
          ],
          isRequire: true
        },
        witness: {
          isVali: 0,
          arrBtn: [
            { textBtn: "なし", valBtn: 0 },
            { textBtn: "あり", valBtn: 1 }
          ],
          isRequire: true
        },
        scheduled_survey_company_id: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          isRequire: true
        }
      }
    };
  }

  componentDidMount = () => {
    const { dataDetail, handleUpdate, userInfo } = this.props;
    const { data } = this.state;
    if (userInfo.companyId) {
      this.getCompanyKhaosat(userInfo.companyId);
    }
    if (!dataDetail) {
      return;
    }

    // set date === today cho field date null
    // if (!dataDetail.first_choice_from) {
    //   handleUpdate("first_choice_from", today);
    // }
    // if (!dataDetail.first_choice_to) {
    //   handleUpdate("first_choice_to", today);
    // }
    // if (!dataDetail.second_choice_from) {
    //   handleUpdate("second_choice_from", today);
    // }
    // if (!dataDetail.second_choice_to) {
    //   handleUpdate("second_choice_to", today);
    // }
    // // set time === time cho field time null
    // if (!dataDetail.first_choice_hour) {
    //   handleUpdate("first_choice_hour", time);
    // }
    // if (!dataDetail.second_choice_hour) {
    //   handleUpdate("second_choice_hour", time);
    // }
    // if (!dataDetail.time_specification) {
    //   handleUpdate("time_specification", time);
    // }
    // if (!dataDetail.survey_date) {
    //   handleUpdate("survey_date", 0);
    // }
    // if (!dataDetail.final_survey_date) {
    //   handleUpdate("final_survey_date", today);
    // }

    data.scheduled_survey_company.isVali = dataDetail.scheduled_survey_company
      ? 1
      : 0;
    data.survey_method.isVali = dataDetail.survey_method ? 1 : 0;
    data.witness.isVali = dataDetail.witness ? 1 : 0;
    data.scheduled_survey_company_id.isVali = dataDetail.scheduled_survey_company_id
      ? 1
      : 0;

    this.setState({ data: data }, () => this.validationAllAcoordion());
    // this.validationAllAcoordion();
  };
  // UNSAFE_componentWillReceiveProps = nextProps => {
  //   if (!nextProps.dataDetail) {
  //     return;
  //   }
  //   if (nextProps.dataDetail.c_company_id) {
  //     this.getCompanyKhaosat(nextProps.dataDetail.c_company_id);
  //   }
  // };

  getCompanyKhaosat = async companyId => {
    try {
      const res = await axios.get(`${apiRoot}/companysurveys/${companyId}`);
      if (res.status !== 200 || !res.data) {
        return;
      }
      this.setState({ listCompanyKsat: res.data });
    } catch (error) {
      return;
    }
  };

  // event change tab (accorion 4)
  handleChangeTab = (event, value) => {
    const { handleUpdate } = this.props;
    if (handleUpdate) {
      handleUpdate("survey_date", value);
      // phải gọi lai action redux để cập nhật lại props
      this.validationAllAcoordion();
    }
  };
  // change tab  Survey Company
  handleChangeTabSurveyCompany = (event, value) => {
    this.setState({ tabSurveyCompany: value });
  };

  // hander change date
  handleChangeDate = name => e => {
    const { handleUpdate } = this.props;
    if (!e) {
      handleUpdate(name, null);
      return;
    }
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let dataDate = yy + "-" + mm + "-" + dd;

    if (handleUpdate) {
      // set date default cho first_choice_from luôn
      if (name === "first_choice_from") {
        handleUpdate("first_choice_to", dataDate);
      }
      if (name === "second_choice_from") {
        handleUpdate("second_choice_to", dataDate);
      }

      handleUpdate(name, dataDate);
      // phải gọi lai action redux để cập nhật lại props
      this.validationAllAcoordion();
    }
  };

  // hander change date
  handleChangeTime = name => e => {
    const { handleUpdate } = this.props;
    let time = e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
    if (handleUpdate) {
      handleUpdate(name, time);
      // phải gọi lai action redux để cập nhật lại props
      this.validationAllAcoordion();
    }
  };

  // event change role acoordion all
  handleChangeRoleBtn = (name, value) => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    data[name].isVali = 1;

    this.setState({ data }, () => this.validationAllAcoordion());
    if (handleUpdate) {
      handleUpdate(name, value);
    }
  };

  selectProceedAfterSurvey = (name, value) => {
    const { handleUpdate, dataDetail } = this.props;
    let newVal;
    if (value === "2") {
      if (dataDetail.proceed_after_survey.indexOf("2") !== -1) {
        newVal = "1";
      } else {
        newVal = dataDetail.proceed_after_survey + "," + value;
      }
    } else {
      newVal = value;
    }

    if (handleUpdate) {
      handleUpdate(name, newVal);
    }
    this.validationAllAcoordion();
  };

  // khi blur input other sex cập nhất value lên trên
  handleUpdateOther = name => (isVali, value) => {
    const { handleUpdate } = this.props;
    const { data } = this.state;

    if (data[name].isRequire) {
      data[name].isVali = value ? 1 : -1;
    }
    this.setState({ data }, () => this.validationAllAcoordion());
    if (handleUpdate) {
      handleUpdate(name, value);
    }
  };

  // Kiểm tra dữ liệu đang thuộc button  hay field textbox other
  // return false: value thuộc other , ngược lại thuộc button
  isValueOfButton = (name, value) => {
    const { data } = this.state;
    let indexValue = data[name].arrBtn.findIndex(i => i.valBtn === value);
    return indexValue !== -1 ? true : false;
  };

  // event validation blur field text thông qua component TextFieldSjsAcoor
  handleUpdate = name => (isVali, value) => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    data[name].isVali = isVali;

    this.setState({ data }, () => this.validationAllAcoordion());
    if (handleUpdate) {
      handleUpdate(name, value);
    }
  };

  // format date mode reading
  formatDateRead = date => {
    if (date) {
      let arrDay = new Date(date);
      return (
        arrDay.getFullYear() +
        "/" +
        (arrDay.getMonth() + 1) +
        "/" +
        arrDay.getDate()
      );
    }
    return "";
  };

  // format time mode reading
  formatTimeRead = time => {
    if (time) {
      time = time.split(":");
      time = time[0] + ":" + time[1] + ":" + time[2];
      return time;
    }
    return "";
  };

  // format date
  formatDate = date => {
    if (date) {
      let arrDay = new Date(date);
      return new Date(
        arrDay.getFullYear(),
        arrDay.getMonth(),
        arrDay.getDate()
      );
    }
    // return new Date();
    return null;
  };

  // format date
  formatTime = time => {
    if (time) {
      let arrDay = new Date();
      time = time.split(":");
      time = new Date(
        arrDay.getFullYear(),
        arrDay.getMonth(),
        arrDay.getDate(),
        time[0],
        time[1],
        time[2]
      );
      return time;
    }
    return null;
  };

  // render str by value button
  renderStringModeRead = (name, value) => {
    const { data } = this.state;
    if (!value) return null; // giá trị rỗng return
    // nếu không có giá trị nào băng value thì có thể là text input
    let item = data[name].arrBtn.find(i => i.valBtn === value);
    if (!item) {
      return value;
    }
    return item.textBtn;
  };

  // validation All acoordion
  validationAllAcoordion = () => {
    const { dispatch } = this.props;
    const { data } = this.state;
    //console.log(itemArrCoor);
    let isValidationAcoor = true; // validation ok.
    // vòng for sẽ ckeck isVali từng field nếu field nào isVali === false sẽ dừng ngay.
    for (let name in data) {
      if (data[name].isVali === -1 && data[name].isRequire) {
        // nếu field nào false thì cả acoordition === faild, và out ngay
        isValidationAcoor = false;
        break;
      } else if (data[name].isVali === 0 && data[name].isRequire) {
        // nếu field nào chưa làm gì cả (isVali==0)
        // + trường mode isnew == true thì cả acoord === faild
        // + trường mode isnew == false thì cả acoord === ok (vì trường hợp đã có data sẵn trên từng field)
        isValidationAcoor = false;
        break;
      }
    }
    dispatch(
      updateValidation({
        nameAcoor: "acoordion7",
        isVali: isValidationAcoor
      })
    );
  };
  handleChangeFile = name => files => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    data[name].isVali = 1;

    this.setState({ data }, () => this.validationAllAcoordion());
    if (handleUpdate) {
      handleUpdate(name, files);
    }
  };
  // find acoordion có validation chưa
  findValitionAcoordion = nameAcoor => {
    const { surveyProps } = this.props;
    const validation = surveyProps.validation;
    let isValidation = validation.find(x => x.nameAcoor === nameAcoor).isVali;
    return isValidation;
  };

  handleSelectCompanyKs = companyId => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    data.scheduled_survey_company_id.isVali = 1;

    this.setState({ data }, () => this.validationAllAcoordion());
    if (handleUpdate) {
      handleUpdate("scheduled_survey_company_id", companyId);
    }
  };
  toggleExpand = (event, expanded) => {
    this.setState({
      expanded: expanded
    });
  };
  renderClassPopupMap = status => {
    const { classes } = this.props;
    switch (status) {
      case "成立済":
        return classes.popupMapBlue;
      case "募集中":
        return classes.popupMapOran;
      case "交渉中":
        return classes.popupMapYelow;
      default:
        return classes.popupMapBlue;
    }
  };

  render = () => {
    const { classes, dataDetail, permission, userInfo } = this.props;
    const { data, expanded, tabSurveyCompany, listCompanyKsat } = this.state;
    // console.log(dataDetail);
    // convert lat, lng
    const latLng =
      dataDetail &&
      dataDetail.location_information &&
      dataDetail.location_information.split(","); // lat, lng

    // event change role renderBtnSurveyMethod
    // let renderBtnSurveyMethod = this.renderStringModeRead(
    //   "survey_method",
    //   dataDetail.survey_method
    // );

    let renderBtnSurveyMethod = data.survey_method.arrBtn.map((item, index) => {
      let isSelect = dataDetail.survey_method === item.valBtn ? true : false;
      return (
        <Button
          key={index}
          disabled={permission !== "R" ? false : true}
          variant="outlined"
          value={item.valBtn}
          onClick={() => this.handleChangeRoleBtn("survey_method", item.valBtn)}
          className={`${classes.btnRole} ${isSelect ? classes.activeRole : ""}`}
        >
          {item.textBtn}
        </Button>
      );
    });

    // event change role renderBtnWitness
    // let renderBtnWitness = this.renderStringModeRead(
    //   "witness",
    //   parseInt(dataDetail.witness)
    // );

    let renderBtnWitness = data.witness.arrBtn.map((item, index) => {
      let isSelect =
        parseInt(dataDetail.witness) === item.valBtn ? true : false;
      return (
        <Button
          key={index}
          disabled={permission !== "R" ? false : true}
          variant="outlined"
          value={dataDetail.witness}
          onClick={() => this.handleChangeRoleBtn("witness", item.valBtn)}
          className={`${classes.btnRole} ${isSelect ? classes.activeRole : ""}`}
        >
          {item.textBtn}
        </Button>
      );
    });

    // data chatsurvey
    let dataChat = {
      survey_id: dataDetail.id,
      userInfo: userInfo,
      survey_company_id: dataDetail.scheduled_survey_company_id
    };

    // value company ks
    let indexCompanyKsSelect = listCompanyKsat.find(
      x => x.survey_company_id === dataDetail.scheduled_survey_company_id
    );
    // data company
    let renderListCompany =
      listCompanyKsat &&
      listCompanyKsat.map((item, i) => {
        return (
          <ListItem
            key={i}
            button
            onClick={() => this.handleSelectCompanyKs(item.survey_company_id)}
            className={`${classes.itemitem} ${
              dataDetail.scheduled_survey_company_id == item.survey_company_id
                ? classes.itemSelect
                : ""
            }`}
          >
            <ListItemText
              primary={item.companyDisplayName}
              style={{ paddingLeft: 20 }}
            />
          </ListItem>
        );
      });
    let openExpan = this.findValitionAcoordion("acoordion6");

    // map
    const defaultPosition = getPostion("35.68089", "139.76749");
    let centerPosition;
    // center position;
    if (latLng && latLng.length > 0) {
      centerPosition = getPostion(latLng[0], latLng[1]);
    }
    centerPosition = centerPosition ? centerPosition : defaultPosition;
    let classPopup = this.renderClassPopupMap(dataDetail.statusSurvey);
    // console.log(dataDetail);
    return (
      <React.Fragment>
        {/* acoordion 1 */}
        <ExpansionPanel
          disabled={!openExpan}
          className={classes.acoordion}
          style={{ marginTop: 0 }}
          expanded={expanded}
          onChange={this.toggleExpand}
        >
          <ExpansionPanelSummary
            className={classes.expansionPanelSummary}
            classes={{
              root: classes.expansionPanelSummary,
              content: classes.expansionContent
            }}
          >
            <Typography className={classes.headingAcoordion}>
              {expanded ? (
                <img src={ExpandOpenIcon} />
              ) : (
                <img src={ExpandCloseIcon} />
              )}
              7. 地盤調査申込
            </Typography>
            <Typography className={classes.headingAcoordionRight}>
              {this.findValitionAcoordion("acoordion7") ? (
                <span>ご記入ください</span>
              ) : (
                <span style={{ color: "#B40D26" }}>記入済み</span>
              )}
              {/* 調査会社へ申込を送信 */}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={`${classes.acoordionDetail} ${
              permission === "R" ? classes.styleRead : ""
            }`}
          >
            {/* group 1 */}
            <div className={classes.titleGroup}>調査の日時・方法</div>
            <div className={classes.formGroup}>
              <label htmlFor="希望調査日:" style={{ color: "#AA041B" }}>
                希望調査日:
              </label>
              <div className={classes.boxTabs}>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.appBarTab}
                >
                  <Tabs
                    fullwidth="true"
                    value={
                      dataDetail.survey_date
                        ? parseInt(dataDetail.survey_date)
                        : 0
                    }
                    onChange={this.handleChangeTab}
                    classes={{
                      indicator: classes.styleIndicator
                    }}
                  >
                    <Tab
                      classes={{
                        root: classes.tabRoot,
                        selected: classes.tabSelected
                      }}
                      label="日時を指定"
                    />
                    <Tab
                      classes={{
                        root: classes.tabRoot,
                        selected: classes.tabSelected
                      }}
                      label="いつでも"
                    />
                    <Tab
                      classes={{
                        root: classes.tabRoot,
                        selected: classes.tabSelected
                      }}
                      label="最短日"
                    />
                  </Tabs>
                </AppBar>
                {(dataDetail.survey_date
                  ? parseInt(dataDetail.survey_date)
                  : 0) === 0 && (
                  <Typography component="div" className={classes.conTab}>
                    <span style={{ color: "#AA041B" }}>第一希望</span>
                    <div className={classes.rowInTab}>
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={jpLocale}
                      >
                        <KeyboardDatePicker
                          disabled={permission === "R" ? true : false}
                          value={this.formatDate(dataDetail.first_choice_from)}
                          format="yyyy/MM/dd"
                          minDate={today}
                          className={classes.textDateTab}
                          cancelLabel="キャンセル"
                          placeholder={today}
                          margin="normal"
                          InputProps={{
                            classes: {
                              root: classes.inputRootDate,
                              input: classes.inputInputDate
                            }
                          }}
                          onChange={this.handleChangeDate("first_choice_from")}
                        />
                      </MuiPickersUtilsProvider>
                      <label
                        htmlFor="〜 "
                        style={{
                          width: "10%",
                          textAlign: "center",
                          padding: 0
                        }}
                      >
                        〜
                      </label>
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={jpLocale}
                      >
                        <KeyboardDatePicker
                          disabled={permission === "R" ? true : false}
                          value={this.formatDate(dataDetail.first_choice_to)}
                          format="yyyy/MM/dd"
                          placeholder={today}
                          minDate={this.formatDate(
                            dataDetail.first_choice_from
                          )}
                          className={classes.textDateTab}
                          cancelLabel="キャンセル"
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            classes: {
                              root: classes.inputRootDate,
                              input: classes.inputInputDate
                            }
                          }}
                          onChange={this.handleChangeDate("first_choice_to")}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <div className={classes.rowInTab}>
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={jpLocale}
                      >
                        <TimePicker
                          margin="normal"
                          className={classes.textDateTab}
                          disabled={permission === "R" ? true : false}
                          value={this.formatTime(dataDetail.first_choice_hour)}
                          placeholder={time}
                          InputProps={{
                            classes: {
                              root: classes.inputRootDate,
                              input: classes.inputInputDate
                            }
                          }}
                          onChange={this.handleChangeTime("first_choice_hour")}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <span>第2希望</span>
                    <div className={classes.rowInTab}>
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={jpLocale}
                      >
                        <KeyboardDatePicker
                          disabled={permission === "R" ? true : false}
                          value={this.formatDate(dataDetail.second_choice_from)}
                          format="yyyy/MM/dd"
                          placeholder={today}
                          className={classes.textDateTab}
                          cancelLabel="キャンセル"
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            classes: {
                              root: classes.inputRootDate,
                              input: classes.inputInputDate
                            }
                          }}
                          onChange={this.handleChangeDate("second_choice_from")}
                        />
                      </MuiPickersUtilsProvider>
                      <label
                        htmlFor="〜 "
                        style={{
                          width: "10%",
                          textAlign: "center",
                          padding: 0
                        }}
                      >
                        〜{" "}
                      </label>

                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={jpLocale}
                      >
                        <KeyboardDatePicker
                          disabled={permission === "R" ? true : false}
                          value={this.formatDate(dataDetail.second_choice_to)}
                          format="yyyy/MM/dd"
                          placeholder={today}
                          className={classes.textDateTab}
                          cancelLabel="キャンセル"
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            classes: {
                              root: classes.inputRootDate,
                              input: classes.inputInputDate
                            }
                          }}
                          onChange={this.handleChangeDate("second_choice_to")}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <div className={classes.rowInTab}>
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={jpLocale}
                      >
                        <TimePicker
                          margin="normal"
                          placeholder={time}
                          disabled={permission === "R" ? true : false}
                          className={classes.textDateTab}
                          value={this.formatTime(dataDetail.second_choice_hour)}
                          InputProps={{
                            classes: {
                              root: classes.inputRootDate,
                              input: classes.inputInputDate
                            }
                          }}
                          onChange={this.handleChangeTime("second_choice_hour")}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Typography>
                )}
                {parseInt(dataDetail.survey_date) === 1 && (
                  <Typography component="div" className={classes.conTab}>
                    <span>時間指定：</span>
                    <div className={classes.rowInTab}>
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={jpLocale}
                      >
                        <TimePicker
                          disabled={permission === "R" ? true : false}
                          placeholder={time}
                          margin="normal"
                          className={classes.textDateTab}
                          value={this.formatTime(dataDetail.time_specification)}
                          InputProps={{
                            classes: {
                              root: classes.inputRootDate,
                              input: classes.inputInputDate
                            }
                          }}
                          onChange={this.handleChangeTime("time_specification")}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Typography>
                )}
                {parseInt(dataDetail.survey_date) === 2 && (
                  <Typography component="div" className={classes.conTab}>
                    <span>時間指定：</span>
                    <div className={classes.rowInTab}>
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={jpLocale}
                      >
                        <TimePicker
                          margin="normal"
                          placeholder={time}
                          disabled={permission === "R" ? true : false}
                          className={classes.textDateTab}
                          value={this.formatTime(dataDetail.time_specification)}
                          InputProps={{
                            classes: {
                              root: classes.inputRootDate,
                              input: classes.inputInputDate
                            }
                          }}
                          onChange={this.handleChangeTime("time_specification")}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Typography>
                )}
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label htmlFor="調査方法:" style={{ color: "#AA041B" }}>
                調査方法:
              </label>
              <div className={classes.rowBtnRole}>
                {renderBtnSurveyMethod}
                <TextFieldSjsAcoor
                  permission={permission}
                  placeholder="その他"
                  customStyleRoot={classes.textFieldDefault}
                  isVali={data.survey_method.isVali}
                  handleUpdate={this.handleUpdateOther("survey_method")}
                  value={
                    this.isValueOfButton(
                      "survey_method",
                      dataDetail.survey_method
                    )
                      ? ""
                      : dataDetail.survey_method
                  }
                />
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label htmlFor="立会い:" style={{ color: "#AA041B" }}>
                立会い:
              </label>
              <div className={classes.rowBtnRole}>{renderBtnWitness}</div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            {/* group 2 */}
            <div className={classes.titleGroup}>調査会社：</div>
            <div className={classes.formGroup}>
              <label htmlFor="" style={{ color: "#AA041B" }}></label>
              <div className={classes.boxTabs}>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.appBarTab}
                >
                  <Tabs
                    fullwidth="true"
                    value={tabSurveyCompany}
                    onChange={this.handleChangeTabSurveyCompany}
                    classes={{
                      indicator: classes.styleIndicator
                    }}
                  >
                    <Tab
                      classes={{
                        root: classes.tabRoot,
                        selected: classes.tabSelected
                      }}
                      label="指定の調査会社へ"
                    />
                    <Tab
                      classes={{
                        root: classes.tabRoot,
                        selected: classes.tabSelected
                      }}
                      label="履歴から選ぶ"
                    />
                    <Tab
                      classes={{
                        root: classes.tabRoot,
                        selected: classes.tabSelected
                      }}
                      label="受発注マップに掲載"
                    />
                  </Tabs>
                </AppBar>
                {tabSurveyCompany === 0 && (
                  <div className={classes.conTab}>
                    <Typography className={classes.titleTabContent}>
                      選択した調査会社に申込ます
                    </Typography>
                    <List component="nav" className={classes.ulDataTab}>
                      {renderListCompany}
                    </List>
                  </div>
                )}
                {tabSurveyCompany === 1 && (
                  <div className={classes.conTab}>
                    <Typography className={classes.titleTabContent}>
                      選択した調査会社に申込ます
                    </Typography>
                    <List component="nav" className={classes.ulDataTab}>
                      {renderListCompany}
                    </List>
                    {/* <table className={classes.tableTab}>
                      <thead>
                        <tr>
                          <th>調査会社</th>
                          <th>調査日</th>
                          <th>調査地</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>調査会社・１</td>
                          <td>2019-11-04</td>
                          <td>東京都調布市</td>
                        </tr>
                        <tr>
                          <td>調査会社・２</td>
                          <td>2019-11-04</td>
                          <td>東京都調布市</td>
                        </tr>
                      </tbody>
                    </table> */}
                  </div>
                )}
                {tabSurveyCompany === 2 && (
                  <div className={classes.conTab}>
                    <Typography className={classes.titleTabContent}>
                      このようなマーカーが表示されます。
                    </Typography>
                    <div className={classes.contentMapTab}>
                      <Map
                        center={["35.68089", "139.76749"]}
                        className={classes.mapTab}
                        zoom={12}
                        center={centerPosition}
                        // ondblClick={this.handleDblClick}
                      >
                        {/* Basic Layer */}
                        <TileLayer
                          attribution='&copy; <a href="https://osm.org/c	opyright">OpenStreetMap</a> contributors'
                          url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        />
                        {/* End Basic Layer */}
                        <Marker position={centerPosition} opacity={0}>
                          <Tooltip
                            direction="top"
                            interactive
                            offset={[0, 0]}
                            opacity={1}
                            permanent
                            className={`${classes.popupMap} ${classPopup}`}
                          >
                            <div className={classes.contentPopupM}>
                              <p>
                                {dataDetail.property_name
                                  ? dataDetail.property_name
                                  : "データが空です"}
                              </p>
                              <span>{dataDetail.update_date}</span>
                            </div>
                          </Tooltip>
                        </Marker>
                      </Map>
                      <div className={classes.rowBtnTabMap}>
                        <Button
                          variant="contained"
                          className={classes.btnDefault}
                        >
                          マーカーを掲載
                        </Button>
                        <Button
                          href={`${folderRoot}map-survey`}
                          target="_blank"
                          variant="contained"
                          className={classes.btnDefault}
                        >
                          受発注マップへ
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* group 3 */}
            <div className={classes.titleGroup}>調査発注の調整：</div>
            <div className={classes.boxChat}>
              {dataDetail.id && <ChatSurvey data={dataChat} />}
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="確定調査会社：" style={{ color: "#AA041B" }}>
                確定調査会社：
              </label>
              <TextFieldSjsAcoor
                disabled={true}
                permission={permission}
                placeholder=""
                required={data.scheduled_survey_company_id.isRequire}
                customStyleRoot={classes.rowInputForm}
                isVali={data.scheduled_survey_company_id.isVali}
                handleUpdate={this.handleUpdate("scheduled_survey_company_id")}
                value={
                  indexCompanyKsSelect
                    ? indexCompanyKsSelect.companyDisplayName
                    : ""
                }
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="確定調査日：" style={{ color: "#AA041B" }}>
                確定調査日：
              </label>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
                <KeyboardDatePicker
                  disabled={permission === "R" ? true : false}
                  value={this.formatDate(dataDetail.final_survey_date)}
                  format="yyyy/MM/dd"
                  className={classes.textDateTab}
                  cancelLabel="キャンセル"
                  placeholder={today}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    classes: {
                      root: classes.inputRootDate,
                      input: classes.inputInputDate
                    }
                  }}
                  onChange={this.handleChangeDate("final_survey_date")}
                />
              </MuiPickersUtilsProvider>
            </div>
            {/* group 4 */}
            <div className={classes.titleGroup}>調査後の進め方：</div>
            <div className={classes.ulData}>
              <Button
                variant="outlined"
                onClick={() =>
                  this.selectProceedAfterSurvey("proceed_after_survey", "1")
                }
                className={`${classes.btnRole} ${
                  dataDetail &&
                  dataDetail.proceed_after_survey &&
                  dataDetail.proceed_after_survey.indexOf("1") !== -1
                    ? classes.activeRole
                    : ""
                }`}
              >
                調査・判定結果をお知らせ下さい。結果を見て次に進めます。
              </Button>
              <div style={{ display: "flex" }}>
                <AddIcon
                  style={{
                    margin: "5px 10px 0 30px",
                    color: "gray"
                  }}
                />
                <Button
                  disabled={
                    dataDetail &&
                    dataDetail.proceed_after_survey &&
                    dataDetail.proceed_after_survey.indexOf("1") !== -1
                      ? false
                      : true
                  }
                  variant="outlined"
                  onClick={() =>
                    this.selectProceedAfterSurvey("proceed_after_survey", "2")
                  }
                  className={`${classes.btnRole} ${
                    dataDetail &&
                    dataDetail.proceed_after_survey &&
                    dataDetail.proceed_after_survey.indexOf("2") !== -1
                      ? classes.activeRole
                      : ""
                  }`}
                >
                  判定結果が「改良工事なし」の場合、補償に進んで下さい。
                </Button>
              </div>
              <Button
                variant="outlined"
                onClick={() =>
                  this.selectProceedAfterSurvey("proceed_after_survey", "3")
                }
                className={`${classes.btnRole} ${
                  dataDetail &&
                  dataDetail.proceed_after_survey &&
                  dataDetail.proceed_after_survey.indexOf("3") !== -1
                    ? classes.activeRole
                    : ""
                }`}
              >
                「事前調査」ですので、改めて「本調査」をお願いします。
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  this.selectProceedAfterSurvey("proceed_after_survey", "4")
                }
                className={`${classes.btnRole} ${
                  dataDetail &&
                  dataDetail.proceed_after_survey &&
                  dataDetail.proceed_after_survey.indexOf("4") !== -1
                    ? classes.activeRole
                    : ""
                }`}
              >
                「再調査」ですので、調査・判定結果をお知らせ下さい。
              </Button>
            </div>
            {/* <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label
                htmlFor="現場案内図 :"
                style={{
                  lineHeight: "20px",
                  marginLeft: -20,
                  width: "calc(20% + 20px)"
                }}
              >
                現場案内図 :
              </label>
              <div className={classes.rowBtnRole} style={{ display: "flex" }}>
                <Button
                  disabled={!latLng || !latLng.length === 0}
                  variant="outlined"
                  className={classes.btnRole}
                  onClick={() => this.setState({ isOpenMap: true })}
                >
                  地図を表示
                </Button>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            /> */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* end acoordion 1 */}
        {/* Map Container */}
        {latLng && latLng.length > 0 && (
          <ViewMapContainer
            isOpen={this.state.isOpenMap}
            latitude={latLng && latLng[0]}
            longitude={latLng && latLng[1]}
            handleClose={() => this.setState({ isOpenMap: false })}
          />
        )}
        {/* End Map Container */}
      </React.Fragment>
    );
  };
}

Acoordion7.propTypes = {
  classes: PropTypes.object.isRequired,
  dataDetail: PropTypes.object,
  userInfo: PropTypes.object,
  isNew: PropTypes.bool,
  permission: PropTypes.string,
  surveyProps: PropTypes.object,
  handleUpdate: PropTypes.func,
  dispatch: PropTypes.func
};
const mapStateToProps = state => {
  const { surveyState } = state;
  return {
    surveyProps: surveyState
  };
};
export default connect(mapStateToProps)(
  withRoot(withStyles(styles)(Acoordion7))
);
