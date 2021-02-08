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
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
// icon
import DeleteIcon from "@material-ui/icons/DeleteForever";
// constant
import { apiRoot, folderRoot, imageRoot } from "constant/index.js";
//component custom
import Notification from "components/Notification/Notification.jsx";
import UploadFile from "components/UploadFile/UploadFile.jsx";
import TextFieldSjsAcoor from "components/TextFieldSjsAcoordion/TextFieldSjsAcoordion.jsx";

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
      color: "#333",
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
      fontSize: 20
    }
  },
  rgCheckbox: {
    margin: 0,
    marginRight: 10
  },
  upload: {
    minHeight: 600,
    width: "100%",
    border: "solid 1px gray",
    marginTop: 10,
    position: "relative",
    "& img": {
      width: "100%",
      display: "flex"
    },
    "& button": {
      height: "100%",
      width: "100%",
      minHeight: 600,
      margin: 0
    }
  },
  labelCheck: {
    fontSize: 11,
    letterSpacing: 0
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
  },
  iconDeleteImg: {
    position: "absolute",
    zIndex: 999,
    color: "red",
    right: 0,
    top: 5,
    cursor: "pointer",
    fontSize: 35
  }
});
const arrayRenderData = ["東", "西	", "南", "北	"];
class SurveyReportPage5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidationAll: false, // isValidationAll: true => ok active btn save
      surveyId: null,
      data: {
        file: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          isRequire: true,
          val: ""
        },
        e_adjacent_ground_level_difference: "",
        e_retaining_wall: "",
        e_type: ["0", "0", "0", "0", "0", ""],
        e_distance: "",
        w_adjacent_ground_level_difference: "",
        w_retaining_wall: "",
        w_type: ["0", "0", "0", "0", "0", ""],
        w_distance: "",
        s_adjacent_ground_level_difference: "",
        s_retaining_wall: "",
        s_type: ["0", "0", "0", "0", "0", ""],
        s_distance: "",
        n_adjacent_ground_level_difference: "",
        n_retaining_wall: "",
        n_type: ["0", "0", "0", "0", "0", ""],
        n_distance: ""
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
    // }
    this.convertDataPage(data);
  };
  UNSAFE_componentWillReceiveProps = nextProps => {
    // if (!nextProps.id) return;
    // // check nếu id survey khác thì không cho nó lấy lại data nữa, vì bản chất vòng đời này luôn vào khi props thay đổi
    // if (nextProps.id !== this.state.surveyId) {
    //   this.setState({ surveyId: nextProps.id });
    //   this.getDataSurveyReport(nextProps.id);
    // } else return;
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
    const { data } = this.state;
    if (this.isEmpty(dataParent)) {
      return false;
    }
    data.file.val = dataParent.file;
    data.file.isVali = dataParent.file ? 1 : 0;

    data.e_adjacent_ground_level_difference =
      dataParent.e_adjacent_ground_level_difference;
    data.e_retaining_wall = dataParent.e_retaining_wall;
    data.e_type = dataParent.e_type
      ? dataParent.e_type.split(",")
      : ["0", "0", "0", "0", "0", ""];
    data.e_distance = dataParent.e_distance;
    data.w_adjacent_ground_level_difference =
      dataParent.w_adjacent_ground_level_difference;
    data.w_retaining_wall = dataParent.w_retaining_wall;
    data.w_type = dataParent.w_type
      ? dataParent.w_type.split(",")
      : ["0", "0", "0", "0", "0", ""];
    data.w_distance = dataParent.w_distance;
    data.s_adjacent_ground_level_difference =
      dataParent.s_adjacent_ground_level_difference;
    data.s_retaining_wall = dataParent.s_retaining_wall;
    data.s_type = dataParent.s_type
      ? dataParent.s_type.split(",")
      : ["0", "0", "0", "0", "0", ""];
    data.s_distance = dataParent.s_distance;
    data.n_adjacent_ground_level_difference =
      dataParent.n_adjacent_ground_level_difference;
    data.n_retaining_wall = dataParent.n_retaining_wall;
    data.n_type = dataParent.n_type
      ? dataParent.n_type.split(",")
      : ["0", "0", "0", "0", "0", ""];
    data.n_distance = dataParent.n_distance;
    this.setState({ data }, () => this.validationAllPage());
  };
  // getDataSurveyReport = async id => {
  //   const { data } = this.state;
  //   const res = await axios.get(`${apiRoot}/groundsurveyreport5/${id}`);
  //   // console.log(res);
  //   // Failed
  //   if (res.status !== 200 || res.data === false) {
  //     return false;
  //   }
  //   // Success
  //   let result = res.data;
  //   data.file.val = result.file;
  //   data.file.isVali = result.file ? 1 : 0;

  //   data.e_adjacent_ground_level_difference =
  //     result.e_adjacent_ground_level_difference;
  //   data.e_retaining_wall = result.e_retaining_wall;
  //   data.e_type = result.e_type.split(",");
  //   data.e_distance = result.e_distance;
  //   data.w_adjacent_ground_level_difference =
  //     result.w_adjacent_ground_level_difference;
  //   data.w_retaining_wall = result.w_retaining_wall;
  //   data.w_type = result.w_type.split(",");
  //   data.w_distance = result.w_distance;
  //   data.s_adjacent_ground_level_difference =
  //     result.s_adjacent_ground_level_difference;
  //   data.s_retaining_wall = result.s_retaining_wall;
  //   data.s_type = result.s_type.split(",");
  //   data.s_distance = result.s_distance;
  //   data.n_adjacent_ground_level_difference =
  //     result.n_adjacent_ground_level_difference;
  //   data.n_retaining_wall = result.n_retaining_wall;
  //   data.n_type = result.n_type.split(",");
  //   data.n_distance = result.n_distance;

  //   this.setState({ data, isNew: false }, () => this.validationAllPage());
  // };
  // check is checked
  isChecked = (field, name) => {
    const { data } = this.state;
    if (!data || !data[name]) return false;
    if (data[name].indexOf(field) !== -1) {
      return true;
    }
    return false;
  };
  // validation All page
  validationAllPage = () => {
    const { data } = this.state;
    let isValidationPage = true; // validation ok.
    // vòng for sẽ ckeck isVali từng field nếu field nào isVali === false sẽ bỏ qua.
    for (let name in data) {
      if (!data[name] || (data[name].isVali === -1 && data[name].isRequire)) {
        // nếu field nào false thì cả acoordition === faild, và out ngay
        isValidationPage = false;
        break;
      } else if (
        !data[name] ||
        (data[name].isVali === 0 && data[name].isRequire)
      ) {
        isValidationPage = false;
        break;
      }
    }
    this.setState({ isValidationAll: isValidationPage });
  };

  handleCloseNotification = () => {
    const { statusSave } = this.state;
    statusSave.open = false;
    statusSave.isLoadding = false;
    statusSave.status = 0;
    statusSave.message = "";
    this.setState({ statusSave });
  };
  changeCheckBoxYesNo = (value, name) => {
    const { handleChange } = this.props;
    // const { data } = this.state;
    // data[name] = value;
    // this.setState({ data });

    if (handleChange) {
      handleChange("page5", name, value);
    }
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
        handleChange("page5", name, arrCheck.toString());
      }
    } else {
      // data[name] = data[name] + field;
      if (handleChange) {
        handleChange("page5", name, data[name] + field);
      }
    }

    // this.setState({ data });
  };

  isCheckedArr = (name, stt) => {
    const { data } = this.state;
    if (!data || !data[name]) return false;
    if (data[name][stt] === "1") {
      return true;
    }
    return false;
  };
  handleChangeCheckBoxAndInput = (e, name, stt) => {
    const { handleChange } = this.props;
    const { data } = this.state;
    let newData = data[name];
    newData[stt] = e.target.checked ? "1" : "0";
    data[name] = newData;
    // console.log(data[name])
    // this.setState({ data });

    if (handleChange) {
      handleChange("page5", name, data[name].toString());
    }
  };

  handleChangeValueInput = (e, name) => {
    const { handleChange } = this.props;
    // const { data } = this.state;
    // data[name] = e.target.value;
    // this.setState({ data });

    if (handleChange) {
      handleChange("page5", name, e.target.value);
    }
  };

  handleChangeInputArr = (e, name, stt) => {
    const { handleChange } = this.props;
    const { data } = this.state;
    data[name][stt] = e.target.value;
    this.setState({ data });
    if (handleChange) {
      handleChange("page5", name, data[name].toString());
    }
  };

  handleChangeFile = name => file => {
    const { handleChange } = this.props;
    // const { data } = this.state;
    // data[name].isVali = 1;
    // data[name].val = file;

    // this.setState({ data }, () => this.validationAllPage());

    if (handleChange) {
      handleChange("page5", name, file);
    }
  };
  deleteFile = () => {
    const { handleChange } = this.props;
    // const { data } = this.state;
    // data.file.isVali = -1;
    // data.file.val = "";
    // this.setState({ data }, () => this.validationAllPage());

    if (handleChange) {
      handleChange("page5", "file", "");
    }
  };

  // handle upload images to server
  handleUploadImageToServer = async () => {
    const { handleChange } = this.props;
    const { data } = this.state;
    let dataFile = new FormData();
    let strImage = "";
    // trường hợp file có file nào upload mới thì tiếp tục
    if (data && data.file.val && data.file.val.name) {
      dataFile.append(`my_file[]`, data.file.val);
      strImage = data.file.val.name;
    }
    // no file upload
    if (!strImage) {
      // true để tiếp tục bước save data
      return true;
    }
    // Upload img to server
    try {
      const res = await axios.post(`${apiRoot}/common/uploadphoto`, dataFile);

      // Failed
      if (res.status !== 200) {
        return false;
      }
      // Success
      // set lai name file cho data
      data.file.val = strImage;
      this.setState({ data });
      if (handleChange) {
        handleChange("page5", "file", strImage);
      }
      return true;
    } catch (error) {
      return false;
    }
  };
  handleSave = async () => {
    const { statusSave } = this.state;
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    const isUploadImages = await this.handleUploadImageToServer();
    // upload file error
    if (!isUploadImages) {
      statusSave.isLoadding = false;
      statusSave.open = true;
      statusSave.message = "Upload file error";
      statusSave.status = -1;
      this.setState({ statusSave });
      return;
    }

    // upload file success
    if (this.props.isNew) {
      // insert
      this.insertSurveyReport();
    } else {
      this.updateSurveyReport();
    }
  };
  insertSurveyReport = async () => {
    const { handleChangeIsNew } = this.props;
    const { data, statusSave } = this.state;
    let dataClone = cloneDeep(data);

    let dataInsert = {
      id_ground_survey_report: this.props.id,
      file: dataClone.file.val,
      e_adjacent_ground_level_difference:
        dataClone.e_adjacent_ground_level_difference,
      e_retaining_wall: dataClone.e_retaining_wall,
      e_type: dataClone.e_type.toString(),
      e_distance: dataClone.e_distance,
      w_adjacent_ground_level_difference:
        dataClone.w_adjacent_ground_level_difference,
      w_retaining_wall: dataClone.w_retaining_wall,
      w_type: dataClone.w_type.toString(),
      w_distance: dataClone.w_distance,
      s_adjacent_ground_level_difference:
        dataClone.s_adjacent_ground_level_difference,
      s_retaining_wall: dataClone.s_retaining_wall,
      s_type: dataClone.s_type.toString(),
      s_distance: dataClone.s_distance,
      n_adjacent_ground_level_difference:
        dataClone.n_adjacent_ground_level_difference,
      n_retaining_wall: dataClone.n_retaining_wall,
      n_type: dataClone.n_type.toString(),
      n_distance: dataClone.n_distance
    };
    // console.log(dataInsert);
    const res = await axios.post(`${apiRoot}/groundsurveyreport5`, dataInsert);

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
    handleChangeIsNew("page5", false);
  };

  updateSurveyReport = async () => {
    const { data, statusSave } = this.state;
    let dataClone = cloneDeep(data);
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataUpdate = {
      file: dataClone.file.val,
      e_adjacent_ground_level_difference:
        dataClone.e_adjacent_ground_level_difference,
      e_retaining_wall: dataClone.e_retaining_wall,
      e_type: dataClone.e_type.toString(),
      e_distance: dataClone.e_distance,
      w_adjacent_ground_level_difference:
        dataClone.w_adjacent_ground_level_difference,
      w_retaining_wall: dataClone.w_retaining_wall,
      w_type: dataClone.w_type.toString(),
      w_distance: dataClone.w_distance,
      s_adjacent_ground_level_difference:
        dataClone.s_adjacent_ground_level_difference,
      s_retaining_wall: dataClone.s_retaining_wall,
      s_type: dataClone.s_type.toString(),
      s_distance: dataClone.s_distance,
      n_adjacent_ground_level_difference:
        dataClone.n_adjacent_ground_level_difference,
      n_retaining_wall: dataClone.n_retaining_wall,
      n_type: dataClone.n_type.toString(),
      n_distance: dataClone.n_distance
    };
    // console.log(dataUpdate);
    const res = await axios.put(
      `${apiRoot}/groundsurveyreport5/${this.props.id}`,
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
    const { data, statusSave, isValidationAll } = this.state;
    console.log(data);
    let urlImg = null;
    if (data.file.val) {
      // nếu tồn tại preview thì đó là file upload
      if (data.file.val.preview) {
        urlImg = data.file.val.preview;
      } else {
        // ngược lại thì file này từ database
        urlImg = imageRoot + data.file.val;
      }
    }
    // console.log(urlImg);
    let elRender =
      data &&
      arrayRenderData.map((item, index) => {
        let pre;
        if (index === 0) {
          pre = "e";
        }
        if (index === 1) {
          pre = "w";
        }
        if (index === 2) {
          pre = "s";
        }
        if (index === 3) {
          pre = "n";
        }
        let name1 = pre + "_adjacent_ground_level_difference";
        let name2 = pre + "_retaining_wall";
        let name3 = pre + "_type";
        let name4 = pre + "_distance";

        let val_name3 = data && data[name3][5] ? data[name3][5] : "";
        let val_name4 = data && data[name4] ? data[name4] : "";
        // console.log(val_name4)
        return (
          <tr key={item}>
            <td>{item} </td>
            <td>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    onChange={() => this.changeCheckBoxYesNo("none", name1)}
                    checked={this.isChecked("none", name1)}
                  />
                }
                label="なし"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    onChange={() => this.changeCheckBoxYesNo("yes", name1)}
                    checked={this.isChecked("yes", name1)}
                  />
                }
                label="あり（　〜　m）"
              />
            </td>
            <td>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    onChange={() => this.changeCheckBoxYesNo("none", name2)}
                    checked={this.isChecked("none", name2)}
                  />
                }
                label="なし"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    onChange={() => this.changeCheckBoxYesNo("yes", name2)}
                    checked={this.isChecked("yes", name2)}
                  />
                }
                label="あり"
              />
            </td>
            <td>
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e => this.handleChangeCheckBoxAndInput(e, name3, 0)}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr(name3, 0)}
                  />
                }
                label="間知"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e => this.handleChangeCheckBoxAndInput(e, name3, 1)}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr(name3, 1)}
                  />
                }
                label="RC"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e => this.handleChangeCheckBoxAndInput(e, name3, 2)}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr(name3, 2)}
                  />
                }
                label="CB"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e => this.handleChangeCheckBoxAndInput(e, name3, 3)}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr(name3, 3)}
                  />
                }
                label="石積・石垣"
              />
              <FormControlLabel
                classes={{
                  root: classes.rgCheckbox,
                  label: classes.labelCheck
                }}
                onChange={e => this.handleChangeCheckBoxAndInput(e, name3, 4)}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={this.isCheckedArr(name3, 4)}
                  />
                }
                label="土留"
              />
              その他（
              <InputBase
                className={classes.input}
                onChange={e => this.handleChangeInputArr(e, name3, 5)}
                value={val_name3}
              />
              ）
            </td>
            <td>
              <InputBase
                className={classes.input}
                onChange={e => this.handleChangeValueInput(e, name4)}
                value={val_name4}
              />
              m
            </td>
          </tr>
        );
      });
    return (
      <Paper className={classes.root}>
        {/* button save/insert */}
        <div className={classes.rowBtnOption}>
          <Button
            disabled={!isValidationAll}
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
          <Typography component="h1">調査敷地状況</Typography>
          <Typography component="h2">● 印は調査ポイントを示す</Typography>
          <div className={classes.upload}>
            {urlImg ? (
              <React.Fragment>
                <DeleteIcon
                  onClick={() => this.deleteFile()}
                  className={classes.iconDeleteImg}
                />
                <img src={urlImg} alt="" />
              </React.Fragment>
            ) : (
              <UploadFile
                multiple={false}
                accept="image/jpeg,image/png"
                textButton="file selector or drag and drop"
                handleChangeFile={this.handleChangeFile("file")}
              />
            )}
          </div>
        </div>
        <table className={classes.table}>
          <tbody>
            <tr>
              <td></td>
              <td>隣接地高低差 </td>
              <td>擁壁 </td>
              <td>種類 </td>
              <td>距離 </td>
            </tr>
            {elRender}
          </tbody>
        </table>
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

SurveyReportPage5.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  isNew: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeIsNew: PropTypes.func
};
export default withRoot(withStyles(styles)(SurveyReportPage5));
