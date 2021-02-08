import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
// constant
import { apiRoot } from "constant/index.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
// img
import bgTd from "assets/img/bg-td.png";
import bgTd2 from "assets/img/bg-td2.png";
//component custom
import Notification from "components/Notification/Notification.jsx";

const styles = theme => ({
  recordForm: {
    display: "flex",
    width: "100%"
  },
  colLeftForm: {
    fontSize: 16,
    marginTop: 23,
    marginRight: 30
  },
  colRightForm: {
    width: "100%"
  },
  lineBlack: {
    width: "100%",
    height: 3,
    backgroundColor: "#000",
    zIndex: 9999
  },
  tableColRight: {
    borderSpacing: 0,
    marginRight: 0,
    border: "solid 1px #000",
    borderRight: 0,
    width: "100%",
    color: "#222",
    fontSize: 13,
    "& thead tr:nth-child(4) th": {
      backgroundColor: "#D9E6EE"
    },
    "& thead tr:nth-child(5) th": {
      borderBottomColor: "#000",
      borderBottomWidth: 2,
      letterSpacing: 0,
      backgroundColor: "#D9E6EE"
    },
    "& thead tr:nth-child(6) th": {
      borderBottomColor: "#000",
      borderBottomWidth: 2,
      fontSize: 11,
      fontWeight: "normal",
      letterSpacing: 0
    },
    "& thead tr:nth-child(7) th": {
      fontSize: 11,
      fontWeight: "normal",
      letterSpacing: 0
    },
    "& thead th": {
      padding: "5px 0px",
      letterSpacing: 2
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
      fontWeight: "bold",
      fontSize: 11
    },
    "& $formText1": {
      width: 60
    },
    "& $formText": {
      width: 60
    }
    // "&& td:nth-child(3), th:nth-child(3)": {
    //   color: "#0178BE",
    //   fontWeight: 600
    // },
    // "&& td:nth-child(9), th:nth-child(9)": {
    //   backgroundColor: "#EBF1EC"
    // },
    // "&& td:nth-last-child(1), th:nth-last-child(1), td:nth-last-child(2), th:nth-last-child(2), td:nth-last-child(3), th:nth-last-child(3)": {
    //   backgroundColor: "#FFE4CB"
    // }
  },
  inlineRow: {
    "& td": {
      borderBottomColor: "#000",
      borderBottomWidth: 2
    }
  },
  errorPage: {
    textAlign: "center",
    "& h2": {
      fontSize: 35,
      marginTop: 100
    }
  },
  loaddingPage: {
    marginTop: "calc(32% - 20px)"
  },
  bgGach: {
    backgroundImage: `url(${bgTd})`,
    backgroundSize: "100% 100%"
  },
  bgLuoi: {
    position: "relative",
    "& span": {
      height: "100%",
      maxWidth: "100%",
      position: "absolute",
      left: 0,
      top: 0,
      backgroundImage: `url(${bgTd2})`,
      backgroundSize: "auto 100%"
    }
  },
  td10: {
    position: "relative",
    "& span": {
      fontSize: 8,
      position: "absolute",
      bottom: 0,
      width: "100%",
      left: 0
    }
  },
  rowBtnOption: {
    position: "absolute",
    top: -34,
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
  InputTable: {
    padding: 5,
    display: "flex",
    fontSize: 11,
    "& textarea": {
      textAlign: "center"
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

const arrayRenderData = [
  "0.25",
  "0.50",
  "0.75",
  "1.00",
  "1.25",
  "1.50",
  "1.75",
  "2.00",
  "2.25",
  "2.50",
  "2.75",
  "3.00",
  "3.25",
  "3.50",
  "3.75",
  "4.00",
  "4.25",
  "4.50",
  "4.75",
  "5.00",
  "5.25",
  "5.50",
  "5.75",
  "6.00",
  "6.25",
  "6.50",
  "6.75",
  "7.00",
  "7.25",
  "7.50",
  "7.75",
  "8.00",
  "8.25",
  "8.50",
  "8.75",
  "9.00",
  "9.25",
  "9.50",
  "9.75",
  "10.00"
];
let surveyInfoNew = {};
surveyInfoNew["survey_id"] = null;
surveyInfoNew["site_name"] = "";
surveyInfoNew["weather"] = [0, 0, 0, 0];
surveyInfoNew["remarks"] = "";
surveyInfoNew["measurement_content"] = [0, 0, 0, 0];
surveyInfoNew["water_level"] = "";
surveyInfoNew["measurement_point_no"] = "";
surveyInfoNew["phenol_reaction"] = 0;
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

class FormReportGroundSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: true,
      scroolLeft: 0,
      surveyId: null,
      no: null,
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
      }
    };
  }

  componentDidMount = () => {
    const { surveyId, no } = this.props;
    if (surveyId && no) {
      valRender = {};
      this.setState({
        surveyId: surveyId,
        no: no
      });
      this.getSurveyInfoBySurveyIdAndNo(surveyId, no);
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!nextProps.surveyId || !nextProps.no) return;
    // check nếu id survey khác thì không cho nó lấy lại data nữa, vì bản chất vòng đời này luôn vào khi props thay đổi
    if (
      nextProps.surveyId !== this.state.surveyId ||
      nextProps.no !== this.state.no
    ) {
      valRender = {};
      this.setState({
        surveyId: nextProps.surveyId,
        no: nextProps.no
      });
      this.getSurveyInfoBySurveyIdAndNo(nextProps.surveyId, nextProps.no);
    } else return;
  };

  // get survey info by id
  getSurveyInfoBySurveyIdAndNo = async (id, no) => {
    try {
      const res = await axios.get(
        `${apiRoot}/groundsurveyreport8to12/${id}?no=${no}`
      );
      // error
      if (res.status !== 200) {
        this.setState({
          surveyInfo: -1
        });
        return;
      }
      // success
      // thuc hien mode add new nếu khong tim thay data by no
      if (res.data === false) {
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
      surveyInfoUpdate["survey_name"] = data.survey_name;
      surveyInfoUpdate["survey_location"] = data.survey_location;
      surveyInfoUpdate["hole_mouth_elevation"] = data.hole_mouth_elevation;
      surveyInfoUpdate["remarks"] = data.remarks;
      surveyInfoUpdate["station_number"] = data.station_number;
      surveyInfoUpdate["survey_date"] = data.survey_date;
      surveyInfoUpdate["final_penetration_depth"] =
        data.final_penetration_depth;
      surveyInfoUpdate["tester"] = data.tester;

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
            : "";
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
  handleChangeInputTable = (e, number, name) => {
    const { inputTemp } = this.state;
    let val = e.target.value;
    inputTemp.name = name;
    inputTemp.row = number;
    inputTemp.value = val;
    this.setState({ inputTemp });
  };
  updateValue = () => {
    const { inputTemp } = this.state;
    this.handleUpdateFieldTableRight(
      inputTemp.value,
      inputTemp.row,
      inputTemp.name
    );
    inputTemp.name = "";
    inputTemp.row = "";
    inputTemp.value = "";
    this.setState({ inputTemp });
  };
  // kiểm tra status page 8-17 khi mới vào trang
  checkStatusPageByNo = () => {
    const { surveyInfo } = this.state;
    if (!surveyInfo) {
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
      "station_number",
      "survey_date",
      "final_penetration_depth",
      "tester"
    ];
    let successRow = 0;
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
      // nếu đã đủ 10 dòng có dữ liệu thì không cần kiểm tra detail No này
      if (successRow === 10) {
        break;
      }
    }
    // set status page theo no vào biến toàn cục reduce
    const { updateStatusPageByNo } = this.props;
    if (updateStatusPageByNo) {
      updateStatusPageByNo({
        pageByNo: parseInt(this.props.no),
        finish: successRow === 10 ? true : false
      });
    }
  };
  // comon update field table right
  handleUpdateFieldTableRight = (val, number, name) => {
    const { surveyInfo } = this.state;
    if (!surveyInfo[number]) {
      // trường hợp này khi có survey mà không có surveyInfo nào thuộc surveyInfo này
      surveyInfo[number] = {};
    }
    surveyInfo[number][name] = val;
    this.setState(
      {
        surveyInfo: surveyInfo
      },
      () => this.checkStatusPageByNo()
    );
  };
  handleCloseNotification = () => {
    const { statusSave } = this.state;
    statusSave.open = false;
    statusSave.isLoadding = false;
    statusSave.status = 0;
    statusSave.message = "";
    this.setState({ statusSave });
  };
  handleSave = () => {
    const { isNew, statusSave } = this.state;
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
  insertSurveyInfo = async () => {
    const { surveyId, surveyInfo, statusSave } = this.state;
    if (!surveyId) return;

    let dataInsert = { ...surveyInfo, survey_id: surveyId };
    dataInsert.weather = dataInsert.weather.toString();
    dataInsert.measurement_content = dataInsert.measurement_content.toString();

    console.log(dataInsert);
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

  updateSurveyInfo = async () => {
    const { surveyId, surveyInfo, statusSave } = this.state;
    let dataUpdate = cloneDeep(surveyInfo);
    delete dataUpdate["survey_name"];
    delete dataUpdate["survey_location"];
    delete dataUpdate["hole_mouth_elevation"];
    delete dataUpdate["remarks"];
    delete dataUpdate["station_number"];
    delete dataUpdate["survey_date"];
    delete dataUpdate["final_penetration_depth"];
    delete dataUpdate["tester"];
    dataUpdate.weather = dataUpdate.weather.toString();
    dataUpdate.measurement_content = dataUpdate.measurement_content.toString();
    // console.log(dataUpdate);
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
  render = () => {
    const { classes } = this.props;
    const { surveyInfo, inputTemp, statusSave } = this.state;
    // console.log(surveyInfo);
    // console.log(surveyInfo);
    // if (!surveyInfo) {
    //   return false;
    // }

    // get surveyInfo === -2 ( không có No này )
    // if (surveyInfo === -2) {
    //   return (
    //     <Typography component="h1" className="abc">
    //       スウェーデン式サウンディング試験
    //     </Typography>
    //   );
    // }
    // api faild

    // console.log(surveyInfo);
    if (surveyInfo === -1) {
      return (
        <div className={classes.errorPage}>
          <Typography component="h2">Oops, something went wrong!</Typography>
        </div>
      );
    }
    let elRender = arrayRenderData.map((item, i) => {
      let wsw =
        surveyInfo && surveyInfo[`${item}`] ? surveyInfo[`${item}`].wsw : "";
      let nws =
        surveyInfo && surveyInfo[`${item}`] ? surveyInfo[`${item}`].nws : "";
      let half_revolution =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].half_revolution
          : "";
      let penetration_amount =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].penetration_amount
          : "";
      let sound_and_feel =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].sound_and_feel
          : "";

      let intrusion_status =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].intrusion_status
          : "";
      let soil_name =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].soil_name
          : "";
      let conversion_N_value =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].conversion_N_value
          : "";
      let allowable_bearing_capacity =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].allowable_bearing_capacity
          : "";
      let valRandomBg;
      if (valRender[item]) {
        valRandomBg = valRender[item];
      } else {
        valRandomBg = Math.floor(Math.random() * 100);
        valRender[item] = Math.floor(Math.random() * 100);
      }
      return (
        <tr key={i} className={`${(i + 1) % 4 === 0 ? classes.inlineRow : ""}`}>
          <td width={50}>
            <InputBase
              className={classes.InputTable}
              multiline
              value={
                inputTemp.row === item && inputTemp.name === "wsw"
                  ? inputTemp.value
                  : wsw
              }
              onChange={e => this.handleChangeInputTable(e, item, "wsw")}
              onBlur={this.updateValue}
            />
          </td>
          <td width={50}>
            <InputBase
              className={classes.InputTable}
              multiline
              value={
                inputTemp.row === item && inputTemp.name === "half_revolution"
                  ? inputTemp.value
                  : half_revolution
              }
              onChange={e =>
                this.handleChangeInputTable(e, item, "half_revolution")
              }
              onBlur={this.updateValue}
            />
          </td>
          <td width={50}>{item}</td>
          <td width={50}>
            <InputBase
              className={classes.InputTable}
              multiline
              value={
                inputTemp.row === item &&
                inputTemp.name === "penetration_amount"
                  ? inputTemp.value
                  : penetration_amount
              }
              onChange={e =>
                this.handleChangeInputTable(e, item, "penetration_amount")
              }
              onBlur={this.updateValue}
            />
          </td>
          <td width={50}>
            <InputBase
              className={classes.InputTable}
              multiline
              value={
                inputTemp.row === item && inputTemp.name === "nws"
                  ? inputTemp.value
                  : nws
              }
              onChange={e => this.handleChangeInputTable(e, item, "nws")}
              onBlur={this.updateValue}
            />
          </td>
          <td width={75}>
            <InputBase
              className={classes.InputTable}
              multiline
              value={
                inputTemp.row === item && inputTemp.name === "sound_and_feel"
                  ? inputTemp.value
                  : sound_and_feel
              }
              onChange={e =>
                this.handleChangeInputTable(e, item, "sound_and_feel")
              }
              onBlur={this.updateValue}
            />
          </td>
          <td width={75}>
            <InputBase
              className={classes.InputTable}
              multiline
              value={
                inputTemp.row === item && inputTemp.name === "intrusion_status"
                  ? inputTemp.value
                  : intrusion_status
              }
              onChange={e =>
                this.handleChangeInputTable(e, item, "intrusion_status")
              }
              onBlur={this.updateValue}
            />
          </td>
          <td width={75}>
            <InputBase
              className={classes.InputTable}
              multiline
              value={
                inputTemp.row === item && inputTemp.name === "soil_name"
                  ? inputTemp.value
                  : soil_name
              }
              onChange={e => this.handleChangeInputTable(e, item, "soil_name")}
              onBlur={this.updateValue}
            />
          </td>
          <td width={45} className={classes.bgGach}></td>
          <td width={90} className={classes.bgLuoi}>
            <span style={{ width: "100%" }}></span>
          </td>
          <td width={100} className={classes.bgLuoi}>
            <span style={{ width: `${valRandomBg}%` }}></span>
          </td>
          <td width={40}>
            <InputBase
              className={classes.InputTable}
              multiline
              value={
                inputTemp.row === item &&
                inputTemp.name === "conversion_N_value"
                  ? inputTemp.value
                  : conversion_N_value
              }
              onChange={e =>
                this.handleChangeInputTable(e, item, "conversion_N_value")
              }
              onBlur={this.updateValue}
            />
          </td>
          <td>
            <InputBase
              className={classes.InputTable}
              multiline
              value={
                inputTemp.row === item &&
                inputTemp.name === "allowable_bearing_capacity"
                  ? inputTemp.value
                  : allowable_bearing_capacity
              }
              onChange={e =>
                this.handleChangeInputTable(
                  e,
                  item,
                  "allowable_bearing_capacity"
                )
              }
              onBlur={this.updateValue}
            />
          </td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        {/* button save/insert */}
        <div className={classes.rowBtnOption}>
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
        {/* end button save */}
        <div className={classes.recordForm}>
          <table className={classes.tableColRight}>
            <thead>
              <tr>
                <th colSpan={2}>調査名</th>
                <th colSpan={6}>{surveyInfo && surveyInfo.survey_name} </th>
                <th colSpan={2}>測点番号</th>
                <th colSpan={3}>{surveyInfo && surveyInfo.station_number}</th>
              </tr>
              <tr>
                <th colSpan={2}>調査場所</th>
                <th colSpan={6}>{surveyInfo && surveyInfo.survey_location} </th>
                <th colSpan={2}>調査年月日</th>
                <th colSpan={3}>{surveyInfo && surveyInfo.survey_date}</th>
              </tr>
              <tr>
                <th colSpan={2}>孔口標高 </th>
                <th colSpan={6}>
                  {surveyInfo && surveyInfo.hole_mouth_elevation}
                </th>
                <th colSpan={2}>最終貫入深さ</th>
                <th colSpan={3}>
                  {surveyInfo && surveyInfo.final_penetration_depth}
                </th>
              </tr>

              <tr>
                <th colSpan={2}>孔内水位</th>
                <th colSpan={2}>不明</th>
                <th colSpan={2}>天候</th>
                <th colSpan={2}>曇り</th>
                <th colSpan={2}>試験者</th>
                <th colSpan={3}>{surveyInfo && surveyInfo.tester}</th>
              </tr>
              <tr>
                <th colSpan={2}>備 考</th>
                <th colSpan={11}>{surveyInfo && surveyInfo.remarks}</th>
              </tr>
              <tr>
                <th rowSpan={2}>
                  荷重 <br />
                  Wsw <br />
                  (kN){" "}
                </th>
                <th rowSpan={2}>
                  半回 <br />
                  転数 <br />
                  (Na){" "}
                </th>
                <th rowSpan={2}>
                  貫入深さ <br />D <br />
                  (m)
                </th>
                <th rowSpan={2}>
                  貫入量 <br />L <br />
                  (cm)
                </th>
                <th rowSpan={2}>
                  1m 当りの 半回転数 <br />
                  Nsw{" "}
                </th>
                <th colSpan={3} style={{ borderBottomWidth: 1 }}>
                  記 事
                </th>
                <th rowSpan={2}>
                  推定
                  <br /> 柱状図
                </th>
                <th rowSpan={2} className={classes.td10}>
                  荷重 <br />
                  Wsw(kN)
                  <br /> <span> 0 0.25 0.50 0.75 1.00</span>
                </th>
                <th rowSpan={2} className={classes.td10}>
                  貫入量 1m 当りの 半回転数 <br /> Nsw <br />{" "}
                  <span> 50 100 150 200 250</span>
                </th>
                <th rowSpan={2}>
                  換算 <br />N 値
                </th>
                <th rowSpan={2}>
                  許容 支持力 <br />
                  qa <br />
                  kN/㎡
                </th>
              </tr>
              <tr>
                <th style={{ borderBottomWidth: 2 }}>音感・感触</th>
                <th style={{ borderBottomWidth: 2 }}>貫入状況</th>
                <th style={{ borderBottomWidth: 2 }}> 土質名</th>
              </tr>
            </thead>
            <tbody>{elRender}</tbody>
          </table>
        </div>
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
      </React.Fragment>
    );
  };
}

FormReportGroundSurvey.propTypes = {
  classes: PropTypes.object.isRequired,
  surveyId: PropTypes.string,
  no: PropTypes.number,
  updateStatusPageByNo: PropTypes.func
};
export default withRoot(withStyles(styles)(FormReportGroundSurvey));
