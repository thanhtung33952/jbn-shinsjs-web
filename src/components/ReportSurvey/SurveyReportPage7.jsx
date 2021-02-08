import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
// img
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

// constant
import { apiRoot, folderRoot } from "constant/index.js";
//component custom
import Notification from "components/Notification/Notification.jsx";
// jss
const styles = theme => ({
  root: {
    // height: "100%",
    border: "1px solid gray",
    position: "relative",
    marginBottom: 80,
    padding: "20px 15px"
  },
  line: {
    height: 28,
    backgroundColor: "#213858"
  },
  grMain: {
    color: "#213858",
    padding: "0 80px",
    "& h1": {
      fontSize: 30,
      fontWeight: 900,
      letterSpacing: 1,
      color: "#213858",
      position: "relative",
      lineHeight: "48px",
      display: "block",
      borderBottom: "dashed 1px #777",
      marginTop: 30,
      width: "100%"
    },
    "& h2": {
      color: "#213858",
      fontWeight: "bold",
      fontSize: 20,
      marginTop: 25
    }
  },
  table: {
    borderSpacing: 1,
    color: "#213858",
    marginTop: 30,
    marginBottom: 40,
    marginLeft: 14,
    marginRight: 15,
    width: "calc(100% - 30px)",
    fontSize: 15,
    "& tr th, tr td": {
      border: "1px solid gray",
      textAlign: "left",
      padding: 5
    },
    "& tr td:nth-child(1)": {
      color: "#213858",
      width: 35,
      letterSpacing: 1,
      fontSize: 15,
      verticalAlign: "top"
    },
    "& tr td:nth-last-child(1)": {
      width: 50
    }
  },
  checkbox: {
    padding: 0,
    marginRight: 2,
    "& *": {
      fontSize: 14
    },
    "& svg": {
      fontSize: 16
    }
  },
  rgCheckbox: {
    margin: 0,
    marginRight: 15
  },
  labelCheck: {
    fontSize: 12,
    letterSpacing: 0
  },
  no: {
    height: 35,
    backgroundColor: "rgb(105, 105, 105)",
    lineHeight: "32px",
    fontSize: 18,
    color: "#fff",
    paddingLeft: 10,
    marginBottom: 5,
    marginTop: 5
  },
  input: {
    width: "auto",
    "& input": {
      width: 30,
      borderBottom: "solid 1px",
      padding: "0 3px"
    }
  },
  content: {
    marginTop: 20,
    marginBottom: 100,
    fontSize: 13,
    "& dt": {
      color: "#1b6f2b",
      marginTop: 20,
      fontSize: "1rem",
      fontWeight: "bold"
    },
    "& dd": {
      marginBottom: 8
    },
    "& *": {
      color: "#003366"
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
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});
const newData = {
  creation_status: [0, 0, 0, 0, 0, 0, 0, ""],
  ground_surface: [0, 0, 0, 0, 0, 0, 0, ""],
  soil_quality: "",
  moisture_content: "",
  underground_objects: [0, 0, 0, 0, 0, 0, ""],
  current_situation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ""],

  existing_building0: "",
  existing_building1: [0, 0, ""],
  existing_building2: "",
  existing_building3: [0, 0, 0, 0, ""],
  crack: "",
  deflection: "",
  slope: "",

  carry_in0: "",
  carry_in1: "",
  carry_in2: "",
  carry_in3: "",
  carry_in4: [0, 0, 0, 0, 0, ""]
};
class SurveyReportPage7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidationAll: false, // isValidationAll: true => ok active btn save
      // isNew: true,
      // surveyId: null,
      data: {
        creation_status: [0, 0, 0, 0, 0, 0, 0, ""],
        ground_surface: [0, 0, 0, 0, 0, 0, 0, ""],
        soil_quality: "",
        moisture_content: "",
        underground_objects: [0, 0, 0, 0, 0, 0, ""],
        current_situation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ""],

        existing_building0: "",
        existing_building1: [0, 0, ""],
        existing_building2: "",
        existing_building3: [0, 0, 0, 0, ""],
        crack: "",
        deflection: "",
        slope: "",

        carry_in0: "",
        carry_in1: "",
        carry_in2: "",
        carry_in3: "",
        carry_in4: [0, 0, 0, 0, 0, ""]
      },
      statusSave: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      }
    };
  }
  componentDidMount = () => {
    const { data } = this.props;
    // if (id) {
    //   this.setState({ surveyId: id });
    //   this.getDataSurveyReport(id);
    // } else {
    //   return;
    // }
    this.convertDataPage(data);
  };
  UNSAFE_componentWillReceiveProps = nextProps => {
    // if (!nextProps.id) return;
    // // check nếu id survey khác thì không cho nó lấy lại data nữa, vì bản chất vòng đời này luôn vào khi props thay đổi
    // if (nextProps.id !== this.state.surveyId) {
    //   this.setState({ surveyId: nextProps.id });
    //   this.getDataSurveyReport(nextProps.id);
    // } else {
    //   this.setState({ data: newData });
    // }
    this.convertDataPage(nextProps.data);
  };
  isEmpty = obj => {
    for (var key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  convertDataPage = dataParent => {
    if (this.isEmpty(dataParent)) {
      return false;
    }

    let newData = cloneDeep(dataParent);
    newData.creation_status = !newData.creation_status
      ? [0, 0, 0, 0, 0, 0, 0, ""]
      : newData.creation_status.split(",");

    newData.ground_surface = !newData.ground_surface
      ? [0, 0, 0, 0, 0, 0, 0, ""]
      : newData.ground_surface.split(",");

    newData.underground_objects = !newData.underground_objects
      ? [0, 0, 0, 0, 0, 0, ""]
      : newData.underground_objects.split(",");

    newData.current_situation = !newData.current_situation
      ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ""]
      : newData.current_situation.split(",");

    newData.existing_building1 = !newData.existing_building1
      ? [0, 0, ""]
      : newData.existing_building1.split(",");

    newData.existing_building3 = !newData.existing_building3
      ? [0, 0, 0, 0, ""]
      : newData.existing_building3.split(",");

    newData.carry_in4 = !newData.carry_in4
      ? [0, 0, 0, 0, 0, ""]
      : newData.carry_in4.split(",");
    // this.setState({ data: newData }, () => this.validationAllPage());
    this.setState({ data: newData });
  };
  // getDataSurveyReport = async id => {
  //   const res = await axios.get(`${apiRoot}/groundsurveyreport7/${id}`);
  //   console.log(res);
  //   // Failed
  //   if (res.status !== 200 || res.data === false) {
  //     this.setState({ data: newData });
  //     return;
  //   }
  //   // Success
  //   let result = res.data;

  //   result.creation_status = !result.creation_status
  //     ? newData.creation_status
  //     : result.creation_status.split(",");

  //   result.ground_surface = !result.ground_surface
  //     ? newData.ground_surface
  //     : result.ground_surface.split(",");

  //   result.underground_objects = !result.underground_objects
  //     ? newData.underground_objects
  //     : result.underground_objects.split(",");

  //   result.current_situation = !result.current_situation
  //     ? newData.current_situation
  //     : result.current_situation.split(",");

  //   result.existing_building1 = !result.existing_building1
  //     ? newData.existing_building1
  //     : result.existing_building1.split(",");

  //   result.existing_building3 = !result.existing_building3
  //     ? newData.existing_building3
  //     : result.existing_building3.split(",");

  //   result.carry_in4 = !result.carry_in4
  //     ? newData.carry_in4
  //     : result.carry_in4.split(",");

  //   this.setState({ data: result, isNew: false });
  // };
  // validation All page
  validationAllPage = () => {
    const { data } = this.state;
    let isValidationPage = true; // validation ok.
    // vòng for sẽ ckeck isVali từng field nếu field nào isVali === false sẽ bỏ qua.
    for (let name in data) {
      if (data[name].isVali === -1 && data[name].isRequire) {
        // nếu field nào false thì cả acoordition === faild, và out ngay
        isValidationPage = false;
        break;
      } else if (data[name].isVali === 0 && data[name].isRequire) {
        isValidationPage = false;
        break;
      }
    }
    this.setState({ isValidationAll: isValidationPage });
  };
  changeCheckBox = (field, name) => {
    const { handleChange } = this.props;
    const { data } = this.state;
    if (data[name]) {
      let arrCheck = data[name].split(",");
      let indexItem = arrCheck.indexOf(field);
      if (indexItem !== -1) {
        arrCheck.splice(indexItem, 1);
      } else {
        arrCheck.push(field);
      }
      // convert lai thanh string
      // data[name] = arrCheck.toString();
      if (handleChange) {
        handleChange("page7", name, arrCheck.toString());
      }
    } else {
      // data[name] = data[name] + field;
      if (handleChange) {
        handleChange("page7", name, data[name] + field);
      }
    }

    this.setState({ data });
  };
  // check is checked
  isChecked = (field, name) => {
    const { data } = this.state;
    if (!data || !data[name]) return false;
    if (data[name].indexOf(field) !== -1) {
      return true;
    }
    return false;
  };
  isCheckedArr = (name, stt) => {
    const { data } = this.state;
    if (!data || !data[name]) return false;
    if (parseInt(data[name][stt]) === 1) {
      return true;
    }
    return false;
  };
  handleCloseNotification = () => {
    const { statusSave } = this.state;
    statusSave.open = false;
    statusSave.isLoadding = false;
    statusSave.status = 0;
    statusSave.message = "";
    this.setState({ statusSave });
  };
  handleChangeCheckBoxAndInput = (e, name, stt) => {
    const { handleChange } = this.props;
    const { data } = this.state;
    let newData = data[name];
    newData[stt] = e.target.checked ? 1 : 0;
    data[name] = newData;
    // this.setState({ data });
    if (handleChange) {
      handleChange("page7", name, data[name].toString());
    }
  };
  handleChangeInput = (e, name, stt) => {
    const { handleChange } = this.props;
    const { data } = this.state;
    data[name][stt] = e.target.value;
    this.setState({ data });
    if (handleChange) {
      handleChange("page7", name, data[name].toString());
    }
  };

  handleChangeOnlyOne = (e, name) => {
    const { handleChange } = this.props;
    const { data } = this.state;
    data[name] = e.target.value;
    this.setState({ data });
    if (handleChange) {
      handleChange("page7", name, data[name]);
    }
  };

  handleSave = () => {
    const { isNew } = this.props;
    if (isNew) {
      // insert
      this.insertSurveyReport();
    } else {
      // update
      this.updateSurveyReport();
    }
  };
  insertSurveyReport = async () => {
    const { handleChangeIsNew } = this.props;
    const { data, statusSave } = this.state;
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataClone = cloneDeep(data);

    let dataInsert = {
      id_ground_survey_report: this.props.id,

      creation_status: dataClone.creation_status.toString(),
      ground_surface: dataClone.ground_surface.toString(),
      soil_quality: dataClone.soil_quality,
      moisture_content: dataClone.moisture_content,
      underground_objects: dataClone.underground_objects.toString(),
      current_situation: dataClone.current_situation.toString(),

      existing_building0: dataClone.existing_building0,
      existing_building1: dataClone.existing_building1.toString(),
      existing_building2: dataClone.existing_building2,
      existing_building3: dataClone.existing_building3.toString(),
      crack: dataClone.crack,
      deflection: dataClone.deflection,
      slope: dataClone.slope,

      carry_in0: dataClone.carry_in0,
      carry_in1: dataClone.carry_in1,
      carry_in2: dataClone.carry_in2,
      carry_in3: dataClone.carry_in3,
      carry_in4: dataClone.carry_in4.toString()
    };
    // console.log(dataInsert);
    const res = await axios.post(`${apiRoot}/groundsurveyreport7`, dataInsert);

    // faild
    if (res.status !== 200 || res.data === false) {
      statusSave.isLoadding = false;
      statusSave.open = true;
      statusSave.message = "Insert data error";
      statusSave.status = -1;
      this.setState({ statusSave });
    }

    // success
    statusSave.isLoadding = false;
    statusSave.open = true;
    statusSave.message = "Insert data success";
    statusSave.status = 1;
    this.setState({ statusSave });
    handleChangeIsNew("page7", false);
  };

  updateSurveyReport = async () => {
    const { data, statusSave } = this.state;
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataClone = cloneDeep(data);
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataUpdate = {
      creation_status: dataClone.creation_status.toString(),
      ground_surface: dataClone.ground_surface.toString(),
      soil_quality: dataClone.soil_quality,
      moisture_content: dataClone.moisture_content,
      underground_objects: dataClone.underground_objects.toString(),
      current_situation: dataClone.current_situation.toString(),

      existing_building0: dataClone.existing_building0,
      existing_building1: dataClone.existing_building1.toString(),
      existing_building2: dataClone.existing_building2,
      existing_building3: dataClone.existing_building3.toString(),
      crack: dataClone.crack,
      deflection: dataClone.deflection,
      slope: dataClone.slope,

      carry_in0: dataClone.carry_in0,
      carry_in1: dataClone.carry_in1,
      carry_in2: dataClone.carry_in2,
      carry_in3: dataClone.carry_in3,
      carry_in4: dataClone.carry_in4.toString()
    };
    const res = await axios.put(
      `${apiRoot}/groundsurveyreport7/${this.props.id}`,
      dataUpdate
    );

    // faild
    if (res.status !== 200 || res.data === false) {
      statusSave.isLoadding = false;
      statusSave.open = true;
      statusSave.message = "Update data error";
      statusSave.status = -1;
      this.setState({ statusSave });
    }

    // success
    statusSave.isLoadding = false;
    statusSave.open = true;
    statusSave.message = "Update data success";
    statusSave.status = 1;
    this.setState({ statusSave });
  };
  render = () => {
    const { classes } = this.props;
    const { isValidationAll, statusSave, data } = this.state;
    // console.log(data);
    return (
      <Paper className={classes.root}>
        {/* button save/insert */}
        <div className={classes.rowBtnOption}>
          <Button
            disabled={isValidationAll}
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
        <Divider className={classes.line} />
        <div className={classes.grMain}>
          <Typography component="h1">敷地概要調査。目視調査結果</Typography>
          <Typography component="h2">她形地層調査チェックリスト</Typography>
          <div className={classes.no}>周辺状況</div>
          <div className={classes.content}>
            <dt>造成状況</dt>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "creation_status", 0)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("creation_status", 0)}
                  />
                }
                label="新しい"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "creation_status", 1)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("creation_status", 1)}
                  />
                }
                label="古い"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "creation_status", 2)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("creation_status", 2)}
                  />
                }
                label="不明"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "creation_status", 3)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("creation_status", 3)}
                  />
                }
                label="切土"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "creation_status", 4)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("creation_status", 4)}
                  />
                }
                label="盛土"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "creation_status", 5)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("creation_status", 5)}
                  />
                }
                label="切盛土"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "creation_status", 6)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("creation_status", 6)}
                  />
                }
                label="盛土の厚さ"
              />
              <InputBase
                className={classes.input}
                onChange={e => this.handleChangeInput(e, "creation_status", 7)}
                value={
                  data && data.creation_status[7] ? data.creation_status[7] : ""
                }
              />
              m
            </dd>

            <dt>地表面</dt>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "ground_surface", 0)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("ground_surface", 0)}
                  />
                }
                label="平坦"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "ground_surface", 1)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("ground_surface", 1)}
                  />
                }
                label="起伏"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "ground_surface", 2)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("ground_surface", 2)}
                  />
                }
                label="傾斜地"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "ground_surface", 3)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("ground_surface", 3)}
                  />
                }
                label="雑草"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "ground_surface", 4)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("ground_surface", 4)}
                  />
                }
                label="土間コン"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "ground_surface", 5)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("ground_surface", 5)}
                  />
                }
                label="アスファルト"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "ground_surface", 6)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("ground_surface", 6)}
                  />
                }
                label="その他"
              />
              <InputBase
                className={classes.input}
                onChange={e => this.handleChangeInput(e, "ground_surface", 7)}
                value={
                  data && data.ground_surface[7] ? data.ground_surface[7] : ""
                }
              />
            </dd>
            <dt>土質</dt>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("gravel", "soil_quality")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("gravel", "soil_quality")}
                  />
                }
                label="礫"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("gravel_soil", "soil_quality")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("gravel_soil", "soil_quality")}
                  />
                }
                label="礫質土"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("sand", "soil_quality")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("sand", "soil_quality")}
                  />
                }
                label="砂"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("sand_soil", "soil_quality")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("sand_soil", "soil_quality")}
                  />
                }
                label="砂質土"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("clay_soil", "soil_quality")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("clay_soil", "soil_quality")}
                  />
                }
                label="粘性土"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("organic_soil", "soil_quality")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("organic_soil", "soil_quality")}
                  />
                }
                label="有機質土"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("black_me", "soil_quality")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("black_me", "soil_quality")}
                  />
                }
                label="黒ボク"
              />
            </dd>

            <dt>含水状況</dt>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("yes", "moisture_content")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("yes", "moisture_content")}
                  />
                }
                label="あり"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("none", "moisture_content")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("none", "moisture_content")}
                  />
                }
                label="なし"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("unknown", "moisture_content")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("unknown", "moisture_content")}
                  />
                }
                label="不明"
              />
            </dd>
            <dt>地下埋設物</dt>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "underground_objects", 0)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("underground_objects", 0)}
                  />
                }
                label="あり"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "underground_objects", 1)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("underground_objects", 1)}
                  />
                }
                label="なし"
              />
            </dd>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "underground_objects", 2)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("underground_objects", 2)}
                  />
                }
                label="井戸"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "underground_objects", 3)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("underground_objects", 3)}
                  />
                }
                label="地下構造物"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "underground_objects", 4)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("underground_objects", 4)}
                  />
                }
                label="岩砕など"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "underground_objects", 5)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("underground_objects", 5)}
                  />
                }
                label="その他"
              />
              <InputBase
                className={classes.input}
                onChange={e =>
                  this.handleChangeInput(e, "underground_objects", 6)
                }
                value={
                  data && data.underground_objects[6]
                    ? data.underground_objects[6]
                    : ""
                }
              />
            </dd>
            <dt>現在の状況</dt>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 0)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 0)}
                  />
                }
                label="既存あり"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 1)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 1)}
                  />
                }
                label="造成更地"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 2)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 2)}
                  />
                }
                label="建物解体跡地"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 3)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 3)}
                  />
                }
                label="古くからの住宅地"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 4)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 4)}
                  />
                }
                label="野原"
              />
            </dd>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 5)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 5)}
                  />
                }
                label="田"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 6)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 6)}
                  />
                }
                label="畑"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 7)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 7)}
                  />
                }
                label="資材置き場"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 8)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 8)}
                  />
                }
                label="駐車場"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "current_situation", 9)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("current_situation", 9)}
                  />
                }
                label="その他"
              />
              <InputBase
                className={classes.input}
                onChange={e =>
                  this.handleChangeInput(e, "current_situation", 10)
                }
                value={
                  data && data.current_situation[10]
                    ? data.current_situation[10]
                    : ""
                }
              />
            </dd>
            <dt>既存建物</dt>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("wooden", "existing_building0")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("wooden", "existing_building0")}
                  />
                }
                label="木造"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("steel_frame", "existing_building0")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked(
                      "steel_frame",
                      "existing_building0"
                    )}
                  />
                }
                label="鉄骨"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("RC", "existing_building0")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("RC", "existing_building0")}
                  />
                }
                label="RC"
              />
            </dd>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "existing_building1", 0)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("existing_building1", 0)}
                  />
                }
                label="１F"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "existing_building1", 1)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("existing_building1", 1)}
                  />
                }
                label="２F その他"
              />
              <InputBase
                className={classes.input}
                onChange={e =>
                  this.handleChangeInput(e, "existing_building1", 2)
                }
                value={
                  data && data.existing_building1[2]
                    ? data.existing_building1[2]
                    : ""
                }
              />
              F
            </dd>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("detached_house", "existing_building2")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked(
                      "detached_house",
                      "existing_building2"
                    )}
                  />
                }
                label="戸建"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("housing_complex", "existing_building2")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked(
                      "housing_complex",
                      "existing_building2"
                    )}
                  />
                }
                label="集合住宅"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() =>
                  this.changeCheckBox("office_etc", "existing_building2")
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("office_etc", "existing_building2")}
                  />
                }
                label="事務所など"
              />
            </dd>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "existing_building3", 0)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("existing_building3", 0)}
                  />
                }
                label="建築中"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "existing_building3", 1)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("existing_building3", 1)}
                  />
                }
                label="5年以内"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "existing_building3", 2)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("existing_building3", 2)}
                  />
                }
                label="５〜10年程度"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "existing_building3", 3)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("existing_building3", 3)}
                  />
                }
                label="その他"
              />
              <InputBase
                className={classes.input}
                onChange={e =>
                  this.handleChangeInput(e, "existing_building3", 4)
                }
                value={
                  data && data.existing_building3[4]
                    ? data.existing_building3[4]
                    : ""
                }
              />
            </dd>
            <dd>
              クラック
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("big", "crack")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("big", "crack")}
                  />
                }
                label="大"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("small", "crack")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("small", "crack")}
                  />
                }
                label="小"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("many", "crack")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("many", "crack")}
                  />
                }
                label="多"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("less", "crack")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("less", "crack")}
                  />
                }
                label="少"
              />
            </dd>
            <dd>
              たわみ
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("big", "deflection")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("big", "deflection")}
                  />
                }
                label="大"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("small", "deflection")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("small", "deflection")}
                  />
                }
                label="小"
              />
            </dd>
            <dd>
              傾斜　
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("big", "slope")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("big", "slope")}
                  />
                }
                label="大"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("small", "slope")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("small", "slope")}
                  />
                }
                label="小"
              />
            </dd>
            <dt>車両搬入</dt>
            <dd>
              大型車　
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("8t", "carry_in0")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("8t", "carry_in0")}
                  />
                }
                label="8t"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("4t", "carry_in0")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("4t", "carry_in0")}
                  />
                }
                label="4t"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("Ng", "carry_in0")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("Ng", "carry_in0")}
                  />
                }
                label="ング"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("4t_short", "carry_in0")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("4t_short", "carry_in0")}
                  />
                }
                label="4tショート"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("3t", "carry_in0")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("3t", "carry_in0")}
                  />
                }
                label="3t"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("2t", "carry_in0")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("2t", "carry_in0")}
                  />
                }
                label="2t"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={() => this.changeCheckBox("impossible", "carry_in0")}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isChecked("impossible", "carry_in0")}
                  />
                }
                label="不可"
              />
            </dd>
            <dd>
              進入路　
              <InputBase
                className={classes.input}
                onChange={e => this.handleChangeOnlyOne(e, "carry_in1")}
                value={data.carry_in1}
              />
              m
            </dd>
            <dd>
              前面道路　
              <InputBase
                className={classes.input}
                onChange={e => this.handleChangeOnlyOne(e, "carry_in2")}
                value={data.carry_in2}
              />
              m
            </dd>
            <dd>
              側溝　
              <InputBase
                className={classes.input}
                onChange={e => this.handleChangeOnlyOne(e, "carry_in3")}
                value={data.carry_in3}
              />
              m
            </dd>
            <dd>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "carry_in4", 0)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("carry_in4", 0)}
                  />
                }
                label="段差"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "carry_in4", 1)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("carry_in4", 1)}
                  />
                }
                label="擁壁"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "carry_in4", 2)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("carry_in4", 2)}
                  />
                }
                label="急スロープ"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "carry_in4", 3)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("carry_in4", 3)}
                  />
                }
                label="電線"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e =>
                  this.handleChangeCheckBoxAndInput(e, "carry_in4", 4)
                }
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr("carry_in4", 4)}
                  />
                }
                label="その他"
              />
              <InputBase
                className={classes.input}
                onChange={e => this.handleChangeInput(e, "carry_in4", 5)}
                value={data && data.carry_in4[5] ? data.carry_in4[5] : ""}
              />
            </dd>
          </div>
        </div>
        <Divider className={classes.line} style={{ height: 15 }} />
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
      </Paper>
    );
  };
}

SurveyReportPage7.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string, // id survey
  isNew: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeIsNew: PropTypes.func
};
export default withRoot(withStyles(styles)(SurveyReportPage7));
