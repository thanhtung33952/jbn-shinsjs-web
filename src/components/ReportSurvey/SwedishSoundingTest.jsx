import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

// component customer
import Notification from "components/Notification/Notification.jsx";
// icon material
import ErrorIcon from "@material-ui/icons/Error";
// img
import bgChambi from "assets/img/bg-cbi.png";
import bgGachNgang from "assets/img/bg-td.png";
import bgDatSoi from "assets/img/dat-soi.png";
import bgLuoiDen from "assets/img/bg-luoi-den.png";
// constant
import { apiRoot } from "constant/index.js";
const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "#da3f3f",
    color: "#ffffff",
    maxWidth: 240,
    border: "1px solid #dadde9",
    padding: "5px 8px",
    margin: "0 5px",
    "& span": {
      fontSize: 12,
      "& u": {
        fontSize: 15,
        textDecoration: "none",
        letterSpacing: "0.5px"
      },
      "& i": {
        fontStyle: "italic",
        color: "#ff0",
        marginLeft: 5,
        letterSpacing: "0.7px"
      }
    }
  }
}))(Tooltip);
const styles = theme => ({
  table: {
    borderSpacing: 0,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 0,
    border: "solid 1px #000",
    borderRight: 0,
    width: "100%",
    color: "#222",
    fontSize: 13,
    fontFamily: "'M PLUS 1p', sans-serif",
    "& thead tr th:nth-child(1)": {
      backgroundColor: "#B4C6E7",
      borderLeft: "solid 1px"
    },
    "& thead th": {
      padding: "5px 0px",
      letterSpacing: 2,
      fontWeight: 500,
      height: 35,
      position: "relative"
    },
    "& th, td": {
      border: "1px solid #000",
      borderLeft: 0,
      borderTop: 0,
      // padding: "4px 0",
      verticalAlign: "middle",
      textAlign: "center"
    },
    "& tbody td": {
      fontSize: 14,
      height: 35,
      fontWeight: 500,
      position: "relative"
    }
  },
  bg1: {
    backgroundColor: "#B4C6E7"
  },
  divInth: {
    left: 0,
    width: "100%",
    bottom: 0,
    position: "absolute",
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
    "& span": {
      width: "25%",
      textAlign: "left",
      fontSize: 11
    }
  },
  colNetDut1: {
    "& hr": {
      position: "absolute",
      height: "100%",
      width: 3,
      border: "none",
      bottom: -5,
      borderLeft: "dashed 1px #000"
    },
    "& hr:nth-child(1)": {
      left: "calc(25% - 1px)"
    },
    "& hr:nth-child(2)": {
      left: "calc(50% - 1px)"
    },
    "& hr:nth-child(3)": {
      left: "calc(75% - 1px)"
    },
    "& span": {
      height: "100%",
      maxWidth: "100%",
      position: "absolute",
      left: 0,
      top: 0,
      backgroundColor: "#F9BB00"
    }
  },
  colNetDut2: {
    "& hr": {
      position: "absolute",
      height: "100%",
      width: 3,
      border: "none",
      bottom: -5,
      borderLeft: "dashed 1px #000"
    },
    "& hr:nth-child(1)": {
      left: "calc(16.6% - 1px)"
    },
    "& hr:nth-child(2)": {
      left: "calc(33.2% - 1px)"
    },
    "& hr:nth-child(3)": {
      left: "calc(49.8% - 1px)"
    },
    "& hr:nth-child(4)": {
      left: "calc(66.6% - 1px)"
    },
    "& hr:nth-child(5)": {
      left: "calc(83% - 1px)"
    },
    "& span": {
      height: "100%",
      maxWidth: "100%",
      position: "absolute",
      left: 0,
      top: 0,
      backgroundColor: "#61D937"
    }
  },
  rowInputDate: {
    margin: 0,
    width: "100%"
  },
  inputRootDate: {
    "&:after": {
      content: "none !important"
    },
    "&:before": {
      content: "none !important"
    }
  },
  inputInputDate: {
    textAlign: "center",
    padding: 0
  },
  inputTable: {
    padding: 0,
    display: "flex",
    fontSize: 14,
    height: "100%",
    "& textarea": {
      textAlign: "left"
    }
  },
  inputTableCenter: {
    padding: 0,
    display: "flex",
    fontSize: 14,
    height: "100%",
    "& textarea": {
      textAlign: "center"
    }
  },
  iconError: {
    color: "#da3f3f",
    fontSize: 20,
    marginRight: 10,
    position: "absolute",
    right: 0,
    cursor: "pointer"
  },
  iconErrorNumber: {
    color: "#da3f3f",
    fontSize: 18,
    top: 7,
    position: "absolute",
    right: 0,
    cursor: "pointer"
  },
  rowDouble: {
    display: "flex",
    "& $inputTableCenter": {
      "& textarea": {
        textAlign: "right"
      }
    }
  },
  txt: {
    padding: 0,
    display: "block",
    fontSize: 14,
    height: "100%",
    lineHeight: "35px"
  },
  menuOptionSQL: {
    backgroundColor: "#7D7E7C",
    padding: "4px 0",
    "& li": {
      minHeight: "auto",
      color: "#fff",
      fontSize: 12,
      lineHeight: "20px",
      padding: "0 15px"
    }
  },
  rowBtnOption: {
    display: "flex",
    position: "absolute",
    top: -52,
    right: 0
  },
  btnSave: {
    border: "none !important",
    color: "#fff !important",
    borderRadius: 0,
    padding: "0px 30px",
    textTransform: "none",
    minHeight: 30,
    fontSize: 14,
    margin: 0,
    marginLeft: 5,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    backgroundColor: theme.palette.green.light + "!important",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.green.light
    },
    "&:disabled": {
      opacity: 0.3
    }
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
const arrayRenderData = [];
for (let index = 0.25; index <= 10; index += 0.25) {
  arrayRenderData.push(String(index.toFixed(2)));
}
// console.log(arrayRenderData);
let surveyInfoNew = {};
surveyInfoNew["survey_id"] = null;
surveyInfoNew["survey_name"] = "";
surveyInfoNew["measurement_point_no"] = "";
surveyInfoNew["survey_location"] = "";
surveyInfoNew["survey_date"] = null;
surveyInfoNew["hole_mouth_elevation"] = "";
surveyInfoNew["final_penetration_depth"] = "";
surveyInfoNew["tester"] = "";
surveyInfoNew["water_level"] = "";
surveyInfoNew["weather"] = "";
surveyInfoNew["site_name"] = "";
surveyInfoNew["remarks"] = "";
surveyInfoNew["measurement_content"] = "";
surveyInfoNew["phenol_reaction"] = 0;
surveyInfoNew["survey_equipment"] = "";
// map render field in table
arrayRenderData.forEach(item => {
  surveyInfoNew[item] = {};
  surveyInfoNew[item]["wsw"] = "";
  surveyInfoNew[item]["half_revolution"] = "";
  surveyInfoNew[item]["shari"] = 0;
  surveyInfoNew[item]["jari"] = 0;
  surveyInfoNew[item]["gully"] = 0;
  surveyInfoNew[item]["excavation"] = 0;
  surveyInfoNew[item]["ston"] = 0;
  surveyInfoNew[item]["sursul"] = 0;
  surveyInfoNew[item]["yukuri"] = 0;
  surveyInfoNew[item]["jinwali"] = 0;
  surveyInfoNew[item]["number_of_hits"] = "";
  surveyInfoNew[item]["idling"] = 0;
  surveyInfoNew[item]["sandy_soil"] = 0;
  surveyInfoNew[item]["clay_soil"] = 0;
  surveyInfoNew[item]["other"] = "";
  surveyInfoNew[item]["penetration_amount"] = "";
  surveyInfoNew[item]["nws"] = "";
  surveyInfoNew[item]["sound_and_feel"] = "";
  surveyInfoNew[item]["intrusion_status"] = "";
  surveyInfoNew[item]["soil_name"] = "";
  surveyInfoNew[item]["conversion_N_value"] = "";
  surveyInfoNew[item]["allowable_bearing_capacity"] = "";
});

let valRender = {};
class SwedishSoundingTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: true,
      scroolLeft: 0,
      surveyId: null,
      no: null,
      arrFieldNumberError: [],
      inputTemp: {
        row: "",
        name: "",
        value: ""
      },
      surveyInfo: null, // -1: api faild, -2 : No không tồn tại By surveyId,
      statusSave: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      },
      anchorEl: null // để mở option colum 8 trên table
    };
  }

  componentDidMount = () => {
    const { id, no } = this.props;
    valRender = {};
    if (id && no) {
      this.setState({
        surveyId: id,
        no: no
      });
      this.getSurveyInfoBySurveyIdAndNo(id, no);
    }
  };
  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!nextProps.id || !nextProps.no) return;
    // check nếu id survey khác thì không cho nó lấy lại data nữa, vì bản chất vòng đời này luôn vào khi props thay đổi
    if (
      nextProps.id !== this.state.surveyId ||
      nextProps.no !== this.state.no
    ) {
      valRender = {};
      this.setState({
        surveyId: nextProps.id,
        no: nextProps.no
      });
      this.getSurveyInfoBySurveyIdAndNo(nextProps.id, nextProps.no);
    } else return;
  };
  // get survey info by id
  getSurveyInfoBySurveyIdAndNo = async (id, no) => {
    try {
      const res = await axios.get(`${apiRoot}/surveyinfo/${id}?no=${no}`);
      // error
      if (res.status !== 200) {
        this.setState({
          surveyInfo: -1
        });
        return;
      }
      // console.log(res.data)
      // success
      // thuc hien mode add new nếu khong tim thay data by no

      if (!res || res.data === false) {
        let newSurveyInfoNew = cloneDeep(surveyInfoNew);
        newSurveyInfoNew.measurement_point_no = no;
        this.setState({
          isNew: true,
          surveyInfo: { ...newSurveyInfoNew, survey_id: id }
        });
        return;
      }
      let data = res.data;
      let surveyInfoUpdate = cloneDeep(surveyInfoNew);
      // convert data dẻ sử dụng api cho chính xác
      surveyInfoUpdate["survey_id"] = id;
      surveyInfoUpdate["measurement_point_no"] = no;
      surveyInfoUpdate["survey_name"] = data.survey_name
        ? data.survey_name
        : null;
      surveyInfoUpdate["survey_location"] = data.survey_location
        ? data.survey_location
        : null;
      surveyInfoUpdate["hole_mouth_elevation"] = data.hole_mouth_elevation
        ? data.hole_mouth_elevation
        : null;
      surveyInfoUpdate["final_penetration_depth"] = data.final_penetration_depth
        ? data.final_penetration_depth
        : null;
      surveyInfoUpdate["remarks"] = data.remarks ? data.remarks : null;
      surveyInfoUpdate["survey_date"] = data.survey_date
        ? data.survey_date
        : null;
      surveyInfoUpdate["tester"] = data.tester ? data.tester : null;
      surveyInfoUpdate["water_level"] = data.water_level
        ? data.water_level
        : null;
      surveyInfoUpdate["weather"] = data.weather ? data.weather : null;
      surveyInfoUpdate["site_name"] = data.site_name ? data.site_name : null;
      surveyInfoUpdate["measurement_content"] = data.measurement_content
        ? data.measurement_content
        : null;
      surveyInfoUpdate["survey_equipment"] = data.survey_equipment
        ? data.survey_equipment
        : null;

      arrayRenderData.forEach(item => {
        surveyInfoUpdate[item]["wsw"] =
          data[item] && data[item].wsw ? data[item].wsw : "";
        surveyInfoUpdate[item]["half_revolution"] =
          data[item] && data[item].half_revolution
            ? data[item].half_revolution
            : "";
        surveyInfoUpdate[item]["penetration_amount"] =
          data[item] && data[item].penetration_amount
            ? data[item].penetration_amount
            : 25;
        surveyInfoUpdate[item]["nws"] =
          data[item] && data[item].nws ? data[item].nws : "";
        surveyInfoUpdate[item]["sound_and_feel"] =
          data[item] && data[item].sound_and_feel
            ? data[item].sound_and_feel
            : "";
        surveyInfoUpdate[item]["intrusion_status"] =
          data[item] && data[item].intrusion_status
            ? data[item].intrusion_status
            : "";
        surveyInfoUpdate[item]["soil_name"] =
          data[item] && data[item].soil_name ? data[item].soil_name : "";
        surveyInfoUpdate[item]["conversion_N_value"] =
          data[item] && data[item].conversion_N_value
            ? data[item].conversion_N_value
            : "";
        surveyInfoUpdate[item]["allowable_bearing_capacity"] =
          data[item] && data[item].allowable_bearing_capacity
            ? data[item].allowable_bearing_capacity
            : "";
      });

      // console.log(surveyInfoUpdate);
      this.setState({
        surveyInfo: surveyInfoUpdate,
        isNew: false
      });
    } catch (error) {
      this.setState({
        surveyInfo: -1
      });
      return;
    }
  };

  // update value
  handleUpdateFieldTableRight = (val, number, name) => {
    const { surveyInfo } = this.state;
    if (!surveyInfo[number]) {
      // trường hợp này khi có survey mà không có surveyInfo nào thuộc surveyInfo này
      surveyInfo[number] = {};
    }
    if (name === "wsw" || name === "nws" || name === "soil_name") {
      // new value conversion_N_value
      let conversion_N_value = "";
      let soil_name = name === "soil_name" ? val : surveyInfo[number].soil_name;
      let valWsw = name === "wsw" ? val : surveyInfo[number].wsw;
      let valNws = name === "nws" ? val : surveyInfo[number].nws;
      if (
        soil_name === "粘性土" &&
        valWsw &&
        valNws &&
        !isNaN(valWsw) &&
        !isNaN(valNws)
      ) {
        conversion_N_value = (
          3 * parseFloat(valWsw) +
          0.05 * parseFloat(valNws)
        ).toFixed(1);
      } else if (
        (soil_name === "砂質土" || soil_name === "礫質土") &&
        valWsw &&
        valNws &&
        !isNaN(valWsw) &&
        !isNaN(valNws)
      ) {
        conversion_N_value = (
          2 * parseFloat(valWsw) +
          0.067 * parseFloat(valNws)
        ).toFixed(1);
      }
      surveyInfo[number].conversion_N_value = conversion_N_value;

      // new value allowable_bearing_capacity
      let allowable_bearing_capacity = "";
      if (valWsw && valNws && !isNaN(valWsw) && !isNaN(valNws)) {
        allowable_bearing_capacity = (
          30 * parseFloat(valWsw) +
          0.64 * parseFloat(valNws)
        ).toFixed(1);
      }
      surveyInfo[
        number
      ].allowable_bearing_capacity = allowable_bearing_capacity;
    }

    surveyInfo[number][name] = val;
    this.setState(
      {
        surveyInfo: surveyInfo
      },
      () => this.checkStatusPageByNo()
    );
  };
  // kiểm tra status page 8-17 khi mới vào trang
  checkStatusPageByNo = () => {
    const { surveyInfo } = this.state;
    if (
      !surveyInfo ||
      (surveyInfo.final_penetration_depth &&
        isNaN(surveyInfo.final_penetration_depth))
    ) {
      if (updateStatusPageByNo) {
        updateStatusPageByNo({
          pageByNo: parseInt(this.props.no),
          finish: false
        });
      }
      return;
    }
    // arrOut: khi check thì các field này sẽ bị loại trừ khi loop qua detail của No
    let arrOut = [
      "survey_id",
      "site_name",
      "weather",
      "remarks",
      "measurement_content",
      "water_level",
      "measurement_point_no",
      "phenol_reaction",
      "survey_name",
      "survey_location",
      "hole_mouth_elevation",
      "survey_date",
      "final_penetration_depth",
      "tester",
      "survey_equipment"
    ];
    let successRow = 0;
    // Số dòng cần phải check
    let numberRowValidation =
      parseFloat(surveyInfo.final_penetration_depth) / 0.25;

    for (let key in surveyInfo) {
      // dataDetail[key] là lớp data[0.25], data[0.50]...
      if (arrOut.indexOf(key) === -1 && surveyInfo[key]) {
        // nếu surveyInfo[key] có data thì tiếp tục loop qua các field bên trong.
        for (let keyChild in surveyInfo[key]) {
          // nếu có 1 field có data thì row (0.25 ....) đó sẽ có data
          if (surveyInfo[key][keyChild]) {
            successRow = successRow + 1;
            break;
          }
        }
      }

      if (successRow === parseInt(numberRowValidation)) {
        break;
      }
    }
    // set status page theo no vào biến toàn cục reduce
    const { updateStatusPageByNo } = this.props;
    if (updateStatusPageByNo) {
      updateStatusPageByNo({
        pageByNo: parseInt(this.props.no),
        finish: successRow === parseInt(numberRowValidation) ? true : false
      });
    }
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
    return null;
  };

  // set value tạm thời
  setValueTemp = (e, number, name) => {
    let val = e.target.value;
    this.setState(prevState => ({
      inputTemp: {
        ...prevState.inputTemp,
        name: name,
        row: number,
        value: val
      }
    }));
  };
  // sau kh iblur ra khoi input tren table thi bắt đầu set lại data cho field đó
  updateField = () => {
    const { inputTemp } = this.state;
    if (!inputTemp.name || !inputTemp.row) return;
    let val =
      inputTemp.name === "wsw" && inputTemp.value && !isNaN(inputTemp.value)
        ? parseFloat(inputTemp.value).toFixed(2)
        : inputTemp.value;
    // check is number các field
    let arrCheckIsNumber = [
      "wsw",
      "half_revolution",
      "penetration_amount",
      "nws",
      "conversion_N_value"
    ];
    if (arrCheckIsNumber.indexOf(inputTemp.name) !== -1) {
      let indexFieldError = this.state.arrFieldNumberError.findIndex(
        x => x.row === inputTemp.row && x.name === inputTemp.name
      );
      if (isNaN(inputTemp.value)) {
        // khoong phai la number
        if (indexFieldError === -1) {
          this.setState({
            arrFieldNumberError: this.state.arrFieldNumberError.concat({
              row: inputTemp.row,
              name: inputTemp.name
            })
          });
        }
      } else {
        // la number
        if (indexFieldError !== -1) {
          var newArr = [...this.state.arrFieldNumberError];
          newArr.splice(indexFieldError, 1);
          this.setState({ arrFieldNumberError: newArr });
        }
      }
    }

    this.handleUpdateFieldTableRight(val, inputTemp.row, inputTemp.name);
    this.setState(prevState => ({
      inputTemp: {
        ...prevState.inputTemp,
        name: "",
        row: "",
        value: ""
      }
    }));
  };

  // hander change date
  handleChangeDate = name => e => {
    const { surveyInfo } = this.state;
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let data = yy + "-" + mm + "-" + dd;
    surveyInfo[`${name}`] = data;
    this.setState({ surveyInfo });
  };
  // change value only field
  handleChangeInputOnly = (e, name) => {
    let val = e.target.value;
    if (name === "final_penetration_depth") {
      let indexFieldError = this.state.arrFieldNumberError.findIndex(
        x => x.row === "th3" && x.name === "final_penetration_depth"
      );
      if (isNaN(val)) {
        // khoong phai la number
        if (indexFieldError === -1) {
          this.setState({
            arrFieldNumberError: this.state.arrFieldNumberError.concat({
              row: "th3",
              name: "final_penetration_depth"
            })
          });
        }
      } else {
        // la number
        if (indexFieldError !== -1) {
          var newArr = [...this.state.arrFieldNumberError];
          newArr.splice(indexFieldError, 1);
          this.setState({ arrFieldNumberError: newArr });
        }
      }
    }
    const { surveyInfo } = this.state;
    surveyInfo[`${name}`] = e.target.value;
    this.setState({ surveyInfo }, () => this.checkStatusPageByNo());
  };

  // chọn option colum 8 trên table
  selectOptionCol8 = value => () => {
    const { inputTemp } = this.state;
    this.handleUpdateFieldTableRight(value, inputTemp.row, inputTemp.name);
    this.setState(prevState => ({
      inputTemp: {
        ...prevState.inputTemp,
        name: "",
        row: "",
        value: ""
      },
      anchorEl: null
    }));
  };
  // open option colum 8 trên table
  openOptionCol8 = (e, number, name) => {
    let current = e.currentTarget;
    this.setState(prevState => ({
      inputTemp: {
        ...prevState.inputTemp,
        name: name,
        row: number
      },
      anchorEl: current
    }));
  };
  // close option menu colum 8
  closeOptionCol8 = () => {
    this.setState({ anchorEl: null });
  };
  // close notifical
  handleCloseNotification = () => {
    const { statusSave } = this.state;
    statusSave.open = false;
    statusSave.isLoadding = false;
    statusSave.status = 0;
    statusSave.message = "";
    this.setState({ statusSave });
  };
  // save survey point No
  handleSave = () => {
    const { arrFieldNumberError, isNew, statusSave } = this.state;
    // check validation
    if (arrFieldNumberError.length > 0) {
      statusSave.open = true;
      statusSave.status = -1;
      statusSave.message = "フォーマットが正しいデータを入力して下さい。";
      this.setState({ statusSave });
      return;
    }
    statusSave.isLoadding = true;
    statusSave.message = "";
    this.setState({ statusSave });
    if (isNew) {
      // insert
      this.insertSurveyInfo();
    } else {
      // update
      this.updateSurveyInfo();
    }
  };
  // Insert survey info
  insertSurveyInfo = async () => {
    const { surveyId, surveyInfo, statusSave } = this.state;
    if (!surveyId) return;

    let dataInsert = { ...surveyInfo, survey_id: surveyId };
    if (dataInsert.final_penetration_depth) {
      arrayRenderData.forEach(item => {
        if (parseFloat(item) > parseFloat(dataInsert.final_penetration_depth)) {
          dataInsert[item]["wsw"] = "";
          dataInsert[item]["half_revolution"] = "";
          dataInsert[item]["penetration_amount"] = "";
          dataInsert[item]["nws"] = "";
          dataInsert[item]["sound_and_feel"] = "";
          dataInsert[item]["intrusion_status"] = "";
          dataInsert[item]["soil_name"] = "";
          dataInsert[item]["conversion_N_value"] = "";
          dataInsert[item]["allowable_bearing_capacity"] = "";
        }
      });
    }
    // console.log("Insert", dataInsert);
    try {
      const res = await axios.post(`${apiRoot}/surveyinfo`, dataInsert);

      // Failed
      if (res.status !== 200) {
        statusSave.isLoadding = false;
        statusSave.open = true;
        statusSave.message = "Insert data error";
        statusSave.status = -1;
        this.setState({ statusSave });
      }
      // Success
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.status = 1;
      statusSave.message = "Insert data success";
      this.setState({ statusSave });
      return true;
    } catch (error) {
      statusSave.isLoadding = false;
      statusSave.open = true;
      statusSave.message = "Insert data error";
      statusSave.status = -1;
      this.setState({ statusSave });
    }
  };
  // Update survey info
  updateSurveyInfo = async () => {
    const { surveyId, surveyInfo, statusSave } = this.state;
    let dataUpdate = cloneDeep(surveyInfo);
    if (dataUpdate.final_penetration_depth) {
      arrayRenderData.forEach(item => {
        if (parseFloat(item) > parseFloat(dataUpdate.final_penetration_depth)) {
          dataUpdate[item]["wsw"] = "";
          dataUpdate[item]["half_revolution"] = "";
          dataUpdate[item]["penetration_amount"] = "";
          dataUpdate[item]["nws"] = "";
          dataUpdate[item]["sound_and_feel"] = "";
          dataUpdate[item]["intrusion_status"] = "";
          dataUpdate[item]["soil_name"] = "";
          dataUpdate[item]["conversion_N_value"] = "";
          dataUpdate[item]["allowable_bearing_capacity"] = "";
        }
      });
    }
    this.setState({ surveyInfo: surveyInfo });
    // console.log("Update:", dataUpdate);
    try {
      const res = await axios.put(
        `${apiRoot}/surveyinfo/${surveyId}`,
        dataUpdate
      );

      // Failed
      if (res.status !== 200) {
        statusSave.open = true;
        statusSave.isLoadding = false;
        statusSave.status = -1;
        statusSave.message = "Update data faild";
        this.setState({ statusSave });
      }
      // console.log(res.data);
      // Success
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.status = 1;
      statusSave.message = "Update data success";
      this.setState({ statusSave });
    } catch (error) {
      console.log(error);
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.status = -1;
      statusSave.message = "Update data faild";
      this.setState({ statusSave });
    }
  };
  //add new point
  addNewPoint = async () => {
    const { handleAddNewNo } = this.props;
    if (handleAddNewNo) {
      handleAddNewNo();
    }
  };
  render = () => {
    const { classes } = this.props;
    const {
      surveyInfo,
      inputTemp,
      statusSave,
      anchorEl,
      arrFieldNumberError
    } = this.state;
    // flag mở option colum 8 row table
    const open = Boolean(anchorEl);
    // console.log(surveyInfo);
    let elRender =
      surveyInfo &&
      arrayRenderData.map((item, i) => {
        // chỉ render với số dòng bằng field final_penetration_depth
        let isContinute =
          surveyInfo &&
          surveyInfo.final_penetration_depth &&
          Math.ceil(parseFloat(surveyInfo.final_penetration_depth)) >=
            parseFloat(item)
            ? true
            : false;
        // wsw
        let wsw =
          surveyInfo && surveyInfo[`${item}`] ? surveyInfo[`${item}`].wsw : "";
        // half_revolution
        let half_revolution =
          surveyInfo && surveyInfo[`${item}`]
            ? surveyInfo[`${item}`].half_revolution
            : "";
        // penetration_amount
        let penetration_amount =
          surveyInfo && surveyInfo[`${item}`]
            ? surveyInfo[`${item}`].penetration_amount
            : "";
        // nws
        let nws =
          surveyInfo && surveyInfo[`${item}`] ? surveyInfo[`${item}`].nws : "";
        // sound_and_feel
        let sound_and_feel =
          surveyInfo && surveyInfo[`${item}`]
            ? surveyInfo[`${item}`].sound_and_feel
            : "";
        // intrusion_status
        let intrusion_status =
          surveyInfo && surveyInfo[`${item}`]
            ? surveyInfo[`${item}`].intrusion_status
            : "";
        // soil_name
        let soil_name =
          surveyInfo && surveyInfo[`${item}`]
            ? surveyInfo[`${item}`].soil_name
            : "";
        // conversion_N_value
        let conversion_N_value =
          surveyInfo && surveyInfo[`${item}`]
            ? surveyInfo[`${item}`].conversion_N_value
            : "";
        // allowable_bearing_capacity
        let allowable_bearing_capacity =
          surveyInfo && surveyInfo[`${item}`]
            ? surveyInfo[`${item}`].allowable_bearing_capacity
            : "";

        let bgCol8 =
          soil_name === "砂質土"
            ? bgChambi
            : soil_name === "粘性土"
            ? bgGachNgang
            : soil_name === "礫質土"
            ? bgDatSoi
            : "";
        // check error field number
        let isErrorWsw =
          arrFieldNumberError.findIndex(
            x => x.row === item && x.name === "wsw"
          ) !== -1
            ? true
            : false;
        let isErrorHalf_revolution =
          arrFieldNumberError.findIndex(
            x => x.row === item && x.name === "half_revolution"
          ) !== -1
            ? true
            : false;
        let isErrorPenetration_amount =
          arrFieldNumberError.findIndex(
            x => x.row === item && x.name === "penetration_amount"
          ) !== -1
            ? true
            : false;
        let isErrorNws =
          arrFieldNumberError.findIndex(
            x => x.row === item && x.name === "nws"
          ) !== -1
            ? true
            : false;

        if (isContinute) {
          return (
            <tr key={i}>
              <td width={50}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    inputTemp.row === item && inputTemp.name === "wsw"
                      ? inputTemp.value
                      : wsw
                  }
                  onChange={e => this.setValueTemp(e, item, "wsw")}
                  onBlur={this.updateField}
                />
                {isErrorWsw && (
                  <HtmlTooltip
                    placement="right-end"
                    title={<span>有効な数値を入力してください</span>}
                  >
                    <ErrorIcon className={classes.iconErrorNumber} />
                  </HtmlTooltip>
                )}
              </td>
              <td width={50}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    inputTemp.row === item &&
                    inputTemp.name === "half_revolution"
                      ? inputTemp.value
                      : half_revolution
                  }
                  onChange={e => this.setValueTemp(e, item, "half_revolution")}
                  onBlur={this.updateField}
                />
                {isErrorHalf_revolution && (
                  <HtmlTooltip
                    placement="right-end"
                    title={<span>有効な数値を入力してください</span>}
                  >
                    <ErrorIcon className={classes.iconErrorNumber} />
                  </HtmlTooltip>
                )}
              </td>
              <td width={50}>
                <span className={classes.txt}>{item}</span>
              </td>
              <td width={50}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    inputTemp.row === item &&
                    inputTemp.name === "penetration_amount"
                      ? inputTemp.value
                      : penetration_amount
                  }
                  onChange={e =>
                    this.setValueTemp(e, item, "penetration_amount")
                  }
                  onBlur={this.updateField}
                />
                {isErrorPenetration_amount && (
                  <HtmlTooltip
                    placement="right-end"
                    title={<span>有効な数値を入力してください</span>}
                  >
                    <ErrorIcon className={classes.iconErrorNumber} />
                  </HtmlTooltip>
                )}
              </td>
              <td width={50}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    inputTemp.row === item && inputTemp.name === "nws"
                      ? inputTemp.value
                      : nws
                  }
                  onChange={e => this.setValueTemp(e, item, "nws")}
                  onBlur={this.updateField}
                />
                {isErrorNws && (
                  <HtmlTooltip
                    placement="right-end"
                    title={<span>有効な数値を入力してください</span>}
                  >
                    <ErrorIcon className={classes.iconErrorNumber} />
                  </HtmlTooltip>
                )}
              </td>
              <td width={50}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    inputTemp.row === item &&
                    inputTemp.name === "sound_and_feel"
                      ? inputTemp.value
                      : sound_and_feel
                  }
                  onChange={e => this.setValueTemp(e, item, "sound_and_feel")}
                  onBlur={this.updateField}
                />
              </td>
              <td width={50}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    inputTemp.row === item &&
                    inputTemp.name === "intrusion_status"
                      ? inputTemp.value
                      : intrusion_status
                  }
                  onChange={e => this.setValueTemp(e, item, "intrusion_status")}
                  onBlur={this.updateField}
                />
              </td>
              <td
                width={50}
                onClick={e => this.openOptionCol8(e, item, "soil_name")}
                style={{ cursor: "pointer" }}
              >
                <span className={classes.txt}>{soil_name}</span>
              </td>
              <td
                width={50}
                style={{
                  backgroundImage: `url(${bgCol8})`,
                  backgroundSize: "cover"
                }}
              >
                {" "}
              </td>
              <td width={50} className={classes.colNetDut1}>
                <hr />
                <hr />
                <hr />
                <span
                  style={{
                    width: `${!isNaN(wsw) ? parseFloat(wsw * 100) : 0}%`
                  }}
                ></span>
              </td>
              <td width={50} className={classes.colNetDut2}>
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <span
                  style={{
                    width: `${
                      !isNaN(wsw) && parseFloat(wsw) >= 1 && !isNaN(nws)
                        ? parseFloat(nws / 3)
                        : 0
                    }%`
                  }}
                ></span>
              </td>
              <td width={50}>{conversion_N_value}</td>
              <td width={50}>{allowable_bearing_capacity}</td>
            </tr>
          );
        } else {
          return (
            <tr key={i}>
              <td width={50}></td>
              <td width={50}></td>
              <td width={50}></td>
              <td width={50}></td>
              <td width={50}></td>
              <td width={50}></td>
              <td width={50}></td>
              <td width={50}></td>
              <td width={50}></td>
              <td width={50} className={classes.colNetDut1}>
                <hr />
                <hr />
                <hr />
              </td>
              <td width={50} className={classes.colNetDut2}>
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
              </td>
              <td width={50}></td>
              <td width={50}></td>
            </tr>
          );
        }
      });

    // check error field final_penetration_depth
    let isErrorFieldFinal_depth =
      arrFieldNumberError.findIndex(
        x => x.row === "th3" && x.name === "final_penetration_depth"
      ) !== -1
        ? true
        : false;
    return (
      <div style={{ position: "relative" }}>
        {/* button save/insert */}
        <div className={classes.rowBtnOption}>
          <div style={{ position: "relative" }}>
            <Button
              disabled={statusSave.isLoadding}
              variant="contained"
              className={classes.btnSave}
              onClick={() => this.handleSave()}
            >
              保存
            </Button>
            {statusSave.isLoadding && (
              <CircularProgress size={24} className={classes.iconProgress} />
            )}
          </div>
          {this.props.isEndPoint && (
            <Button
              className={classes.btnSave}
              onClick={this.addNewPoint}
              style={{
                backgroundColor: "#3e7158 !important"
              }}
            >
              追加
            </Button>
          )}
        </div>
        {/* end button save */}
        <table className={classes.table}>
          <thead>
            <tr>
              <th colSpan={2} style={{ borderTop: "solid 1px" }}>
                調査名
              </th>
              <th colSpan={8}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    surveyInfo && surveyInfo.survey_name
                      ? surveyInfo.survey_name
                      : ""
                  }
                  onChange={e => this.handleChangeInputOnly(e, "survey_name")}
                />
              </th>
              <th
                colSpan={1}
                className={classes.bg1}
                style={{ borderTop: "solid 1px" }}
              >
                測点番号
              </th>
              <th colSpan={2}>
                {surveyInfo && surveyInfo.measurement_point_no
                  ? surveyInfo.measurement_point_no
                  : ""}
              </th>
            </tr>
            <tr>
              <th colSpan={2}>調査場所</th>
              <th colSpan={8}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    surveyInfo && surveyInfo.survey_location
                      ? surveyInfo.survey_location
                      : ""
                  }
                  onChange={e =>
                    this.handleChangeInputOnly(e, "survey_location")
                  }
                />
              </th>
              <th colSpan={1} className={classes.bg1}>
                調査年月日
              </th>
              <th colSpan={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
                  <DatePicker
                    value={this.formatDate(
                      surveyInfo && surveyInfo.survey_date
                    )}
                    format="yyyy/MM/dd"
                    className={classes.rowInputDate}
                    cancelLabel="キャンセル"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.inputRootDate,
                        input: classes.inputInputDate
                      }
                    }}
                    onChange={this.handleChangeDate("survey_date")}
                  />
                </MuiPickersUtilsProvider>
              </th>
            </tr>
            <tr>
              <th colSpan={2}>標高 </th>
              <th colSpan={4}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    surveyInfo && surveyInfo.hole_mouth_elevation
                      ? surveyInfo.hole_mouth_elevation
                      : ""
                  }
                  onChange={e =>
                    this.handleChangeInputOnly(e, "hole_mouth_elevation")
                  }
                />
              </th>
              <th colSpan={2} className={classes.bg1}>
                最終貫入深さ
              </th>
              <th colSpan={2}>
                <div className={classes.rowDouble}>
                  <InputBase
                    className={classes.inputTableCenter}
                    multiline
                    value={
                      surveyInfo && surveyInfo.final_penetration_depth
                        ? surveyInfo.final_penetration_depth
                        : ""
                    }
                    onChange={e =>
                      this.handleChangeInputOnly(e, "final_penetration_depth")
                    }
                  />
                  <span style={{ width: 40 }}>m</span>
                  {isErrorFieldFinal_depth && (
                    <HtmlTooltip
                      placement="right-end"
                      title={
                        <span>
                          <u>Error.</u> The data entered is not in the allowed
                          format: <i>0.25 or 0.50 or 0.75...4.00</i>
                        </span>
                      }
                    >
                      <ErrorIcon className={classes.iconError} />
                    </HtmlTooltip>
                  )}
                </div>
              </th>
              <th colSpan={1} className={classes.bg1}>
                試験者
              </th>
              <th colSpan={2}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    surveyInfo && surveyInfo.tester ? surveyInfo.tester : ""
                  }
                  onChange={e => this.handleChangeInputOnly(e, "tester")}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={2}>孔内水位 </th>
              <th colSpan={4}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    surveyInfo && surveyInfo.water_level
                      ? surveyInfo.water_level
                      : ""
                  }
                  onChange={e => this.handleChangeInputOnly(e, "water_level")}
                />
              </th>
              <th colSpan={2} className={classes.bg1}>
                天候
              </th>
              <th colSpan={2}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    surveyInfo && surveyInfo.weather ? surveyInfo.weather : ""
                  }
                  onChange={e => this.handleChangeInputOnly(e, "weather")}
                />
              </th>
              <th colSpan={1} className={classes.bg1}>
                調査機器
              </th>
              <th colSpan={2}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    surveyInfo && surveyInfo.survey_equipment
                      ? surveyInfo.survey_equipment
                      : ""
                  }
                  onChange={e =>
                    this.handleChangeInputOnly(e, "survey_equipment")
                  }
                />
              </th>
            </tr>
            <tr>
              <th colSpan={2}>備 考 </th>
              <th colSpan={14}>
                <InputBase
                  className={classes.inputTableCenter}
                  multiline
                  value={
                    surveyInfo && surveyInfo.remarks ? surveyInfo.remarks : ""
                  }
                  onChange={e => this.handleChangeInputOnly(e, "remarks")}
                />
              </th>
            </tr>
            {/* tr Loop */}
            <tr className={classes.bg1}>
              <th rowSpan={2}>
                荷重 <br />
                Wsw <br />
                (kN)
              </th>
              <th rowSpan={2} className={classes.bg1}>
                半回 <br />
                転数 <br />
                (Na)
              </th>
              <th rowSpan={2}>
                貫入深さ <br />
                D<br />
                (m)
              </th>
              <th rowSpan={2}>
                貫入量 <br />
                L<br />
                (cm)
              </th>
              <th rowSpan={2}>
                1m 当りの <br />
                半回転数 <br />
                Nsw
              </th>
              <th colSpan={3}>記 事</th>
              <th rowSpan={2}>
                推定 <br />
                柱状図
              </th>
              <th rowSpan={2} width={100}>
                荷重 <br />
                Wsw(kN)
                <div className={classes.divInth}>
                  <span>0</span>
                  <span>0.25</span>
                  <span>0.5</span>
                  <span>0.75</span>
                </div>
              </th>
              <th rowSpan={2} width={150}>
                貫入量 1m 当りの 半回転数 <br />
                Nsw
                <div className={classes.divInth}>
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                  <span>150</span>
                  <span>200</span>
                  <span>250</span>
                </div>
              </th>
              <th rowSpan={2}>
                換算
                <br />
                NC値
              </th>
              <th rowSpan={2}>
                許容 <br />
                支持力 <br />
                qa <br />
                kN/㎡
              </th>
            </tr>
            <tr className={classes.bg1}>
              <th style={{ borderLeft: "none", background: "none" }}>
                音感・感触
              </th>
              <th>貫入状況</th>
              <th> 土質名</th>
            </tr>
          </thead>
          <tbody>{elRender}</tbody>
        </table>
        <Menu
          id="option"
          anchorEl={anchorEl}
          open={open}
          onClose={this.closeOptionCol8}
          classes={{
            list: classes.menuOptionSQL
          }}
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <MenuItem onClick={this.selectOptionCol8("砂質土")}>砂質土</MenuItem>
          <MenuItem onClick={this.selectOptionCol8("粘性土")}>粘性土</MenuItem>
          <MenuItem onClick={this.selectOptionCol8("礫質土")}>礫質土</MenuItem>
        </Menu>
        {/* Notification event */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={statusSave.open}
          autoHideDuration={6000}
          onClose={this.handleCloseNotification}
        >
          {statusSave.open && (
            <Notification
              onClose={this.handleCloseNotification}
              variant={statusSave.status === -1 ? "error" : "success"}
              message={statusSave.message}
            />
          )}
        </Snackbar>
        {/* End Notification event */}
      </div>
    );
  };
}
SwedishSoundingTest.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  no: PropTypes.number,
  isEndPoint: PropTypes.bool,
  handleAddNewNo: PropTypes.func,
  updateStatusPageByNo: PropTypes.func
};
export default withRoot(withStyles(styles)(SwedishSoundingTest));
