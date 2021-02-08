import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
// img
import imgContent from "assets/img/03.jpg";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

// icon
import DeleteIcon from "@material-ui/icons/DeleteForever";
// constant
import { apiRoot, folderRoot, imageRoot } from "constant/index.js";
//component custom
import Notification from "components/Notification/Notification.jsx";
import UploadFile from "components/UploadFile/UploadFile.jsx";
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
      fontSize: 28,
      fontWeight: 900,
      letterSpacing: 1,
      color: "#213858",
      position: "relative",
      lineHeight: "48px",
      display: "block",
      borderBottom: "dashed 1px #777",
      marginTop: 30,
      width: "100%"
    }
  },
  content: {
    padding: "0 50px 50px",
    marginTop: 30,
    display: "flex",
    flexWrap: "wrap"
  },
  box: {
    width: "calc(50% - 10px)",
    height: 350,
    display: "flex",
    flexDirection: "column",
    flex: "0 calc(50% - 10px)",
    margin: 5,
    // border: "1px solid gray",
    "& h3": {
      backgroundColor: "#DAE7EF",
      color: "#000",
      textAlign: "center",
      padding: 5,
      margin: "0 10px",
      border: "1px solid gray"
    }
  },
  boxUpload: {
    height: "100%",
    "& *": {
      border: "none"
    }
  },
  contentBox: {
    border: "1px solid gray",
    margin: 10,
    marginBottom: 0,
    height: "100%",
    position: "relative",
    overflow: "hidden",
    width: "calc(100% - 20px)",
    textAlign: "center",
    "& img": {
      height: "100%",
      width: "auto"
    },
    "& button": {
      width: "100%",
      height: "100%",
      minHeight: 243,
      margin: 0
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
  },
  iconDeleteImg: {
    position: "absolute",
    zIndex: 999,
    color: "#ef2628",
    right: 0,
    top: 5,
    cursor: "pointer",
    fontSize: 35
  }
});
class SurveyReportPage14 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidationAll: false, // isValidationAll: true => ok active btn save
      // surveyId: null,
      // isNew: true,
      data: {
        front_road_east_side: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          isRequire: true,
          val: ""
        },
        front_road_south_side: {
          isVali: 0,
          isRequire: true,
          val: ""
        },
        western_border: {
          isVali: 0,
          isRequire: true,
          val: ""
        },
        east_border: {
          isVali: 0,
          isRequire: true,
          val: ""
        },
        southern_boundary: {
          isVali: 0,
          isRequire: true,
          val: ""
        },
        north_border: {
          isVali: 0,
          isRequire: true,
          val: ""
        }
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
    console.log(data);
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
    data.front_road_east_side.val = dataParent.front_road_east_side;
    data.front_road_east_side.isVali = dataParent.front_road_east_side ? 1 : 0;
    data.front_road_south_side.val = dataParent.front_road_south_side;
    data.front_road_south_side.isVali = dataParent.front_road_south_side
      ? 1
      : 0;
    data.western_border.val = dataParent.western_border;
    data.western_border.isVali = dataParent.western_border ? 1 : 0;
    data.east_border.val = dataParent.east_border;
    data.east_border.isVali = dataParent.east_border ? 1 : 0;
    data.southern_boundary.val = dataParent.southern_boundary;
    data.southern_boundary.isVali = dataParent.southern_boundary ? 1 : 0;
    data.north_border.val = dataParent.north_border;
    data.north_border.isVali = dataParent.north_border ? 1 : 0;

    this.setState({ data }, () => this.validationAllPage());
  };
  // getDataSurveyReport = async id => {
  //   const { data } = this.state;
  //   const res = await axios.get(`${apiRoot}/groundsurveyreport14_1/${id}`);
  //   // Failed
  //   if (res.status !== 200 || res.data === false) {
  //     return false;
  //   }
  //   // Success
  //   let result = res.data;
  //   data.front_road_east_side.val = result.front_road_east_side;
  //   data.front_road_east_side.isVali = result.front_road_east_side ? 1 : 0;
  //   data.front_road_south_side.val = result.front_road_south_side;
  //   data.front_road_south_side.isVali = result.front_road_south_side ? 1 : 0;
  //   data.western_border.val = result.western_border;
  //   data.western_border.isVali = result.western_border ? 1 : 0;
  //   data.east_border.val = result.east_border;
  //   data.east_border.isVali = result.east_border ? 1 : 0;
  //   data.southern_boundary.val = result.southern_boundary;
  //   data.southern_boundary.isVali = result.southern_boundary ? 1 : 0;
  //   data.north_border.val = result.north_border;
  //   data.north_border.isVali = result.north_border ? 1 : 0;
  //   this.setState({ data, isNew: false }, () => this.validationAllPage());
  // };

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

  handleChangeFile = name => file => {
    const { handleChange } = this.props;
    const { data } = this.state;
    data[name].isVali = 1;
    data[name].val = file;

    this.setState({ data }, () => this.validationAllPage());
    if (handleChange) {
      handleChange("page141", name, file);
    }
  };
  deleteFile = name => {
    const { handleChange } = this.props;
    const { data } = this.state;
    data[name].isVali = -1;
    data[name].val = "";
    this.setState({ data }, () => this.validationAllPage());
    if (handleChange) {
      handleChange("page141", name, "");
    }
  };
  getUrlImg = name => {
    const { data } = this.state;
    if (data[name].val) {
      // nếu tồn tại preview thì đó là file upload
      if (data[name].val.preview) {
        return data[name].val.preview;
      } else {
        // ngược lại thì file này từ database
        return imageRoot + data[[name]].val;
      }
    } else {
      return null;
    }
  };
  // handle upload images to server
  handleUploadImageToServer = async name => {
    const { handleChange } = this.props;
    const { data } = this.state;
    let dataFile = new FormData();
    let strImage = "";
    // trường hợp file có file nào upload mới thì tiếp tục
    if (data && data[name].val && data[name].val.name) {
      dataFile.append(`my_file[]`, data[name].val);
      strImage = data[name].val.name;
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
      data[name].val = strImage;
      this.setState({ data });
      if (handleChange) {
        handleChange("page141", name, strImage);
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
    const isUpload1 = await this.handleUploadImageToServer(
      "front_road_east_side"
    );
    const isUpload2 = await this.handleUploadImageToServer(
      "front_road_south_side"
    );
    const isUpload3 = await this.handleUploadImageToServer("western_border");
    const isUpload4 = await this.handleUploadImageToServer("east_border");
    const isUpload5 = await this.handleUploadImageToServer("southern_boundary");
    const isUpload6 = await this.handleUploadImageToServer("north_border");
    // upload file error
    if (
      !isUpload1 ||
      !isUpload2 ||
      !isUpload3 ||
      !isUpload4 ||
      !isUpload5 ||
      !isUpload6
    ) {
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
    statusSave.isLoadding = true;
    this.setState({ statusSave });

    let dataInsert = {
      id_ground_survey_report: this.props.id,
      front_road_east_side: dataClone.front_road_east_side.val,
      front_road_south_side: dataClone.front_road_south_side.val,
      western_border: dataClone.western_border.val,
      east_border: dataClone.east_border.val,
      southern_boundary: dataClone.southern_boundary.val,
      north_border: dataClone.north_border.val
    };
    // console.log(dataInsert);
    const res = await axios.post(
      `${apiRoot}/groundsurveyreport14_1`,
      dataInsert
    );

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
    handleChangeIsNew("page141", false);
  };

  updateSurveyReport = async () => {
    const { data, statusSave } = this.state;
    let dataClone = cloneDeep(data);
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataUpdate = {
      front_road_east_side: dataClone.front_road_east_side.val,
      front_road_south_side: dataClone.front_road_south_side.val,
      western_border: dataClone.western_border.val,
      east_border: dataClone.east_border.val,
      southern_boundary: dataClone.southern_boundary.val,
      north_border: dataClone.north_border.val
    };
    // console.log(dataUpdate);
    const res = await axios.put(
      `${apiRoot}/groundsurveyreport14_1/${this.props.id}`,
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
    const { statusSave, isValidationAll } = this.state;
    let url1 = this.getUrlImg("front_road_east_side");
    let url2 = this.getUrlImg("front_road_south_side");
    let url3 = this.getUrlImg("western_border");
    let url4 = this.getUrlImg("east_border");
    let url5 = this.getUrlImg("southern_boundary");
    let url6 = this.getUrlImg("north_border");
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
          <Typography component="h1">試験測点写真</Typography>
        </div>
        <div className={classes.content}>
          <div className={classes.box}>
            <div className={classes.contentBox}>
              {url1 ? (
                <React.Fragment>
                  <DeleteIcon
                    onClick={() => this.deleteFile("front_road_east_side")}
                    className={classes.iconDeleteImg}
                  />
                  <img src={url1} alt="" />
                </React.Fragment>
              ) : (
                <UploadFile
                  customStyleRoot={classes.boxUpload}
                  multiple={false}
                  accept="image/jpeg,image/png"
                  textButton="file selector or drag and drop"
                  handleChangeFile={this.handleChangeFile(
                    "front_road_east_side"
                  )}
                />
              )}
            </div>
            <Typography component="h3">前面道路：東側</Typography>
          </div>
          <div className={classes.box}>
            <div className={classes.contentBox}>
              {url2 ? (
                <React.Fragment>
                  <DeleteIcon
                    onClick={() => this.deleteFile("front_road_south_side")}
                    className={classes.iconDeleteImg}
                  />
                  <img src={url2} alt="" />
                </React.Fragment>
              ) : (
                <UploadFile
                  customStyleRoot={classes.boxUpload}
                  multiple={false}
                  accept="image/jpeg,image/png"
                  textButton="file selector or drag and drop"
                  handleChangeFile={this.handleChangeFile(
                    "front_road_south_side"
                  )}
                />
              )}
            </div>
            <Typography component="h3">前面道路：南側</Typography>
          </div>
          <div className={classes.box}>
            <div className={classes.contentBox}>
              {url3 ? (
                <React.Fragment>
                  <DeleteIcon
                    onClick={() => this.deleteFile("western_border")}
                    className={classes.iconDeleteImg}
                  />
                  <img src={url3} alt="" />
                </React.Fragment>
              ) : (
                <UploadFile
                  customStyleRoot={classes.boxUpload}
                  multiple={false}
                  accept="image/jpeg,image/png"
                  textButton="file selector or drag and drop"
                  handleChangeFile={this.handleChangeFile("western_border")}
                />
              )}
            </div>
            <Typography component="h3">西側境界</Typography>
          </div>
          <div className={classes.box}>
            <div className={classes.contentBox}>
              {url4 ? (
                <React.Fragment>
                  <DeleteIcon
                    onClick={() => this.deleteFile("east_border")}
                    className={classes.iconDeleteImg}
                  />
                  <img src={url4} alt="" />
                </React.Fragment>
              ) : (
                <UploadFile
                  customStyleRoot={classes.boxUpload}
                  multiple={false}
                  accept="image/jpeg,image/png"
                  textButton="file selector or drag and drop"
                  handleChangeFile={this.handleChangeFile("east_border")}
                />
              )}
            </div>
            <Typography component="h3">東側境界</Typography>
          </div>
          <div className={classes.box}>
            <div className={classes.contentBox}>
              {url5 ? (
                <React.Fragment>
                  <DeleteIcon
                    onClick={() => this.deleteFile("southern_boundary")}
                    className={classes.iconDeleteImg}
                  />
                  <img src={url5} alt="" />
                </React.Fragment>
              ) : (
                <UploadFile
                  customStyleRoot={classes.boxUpload}
                  multiple={false}
                  accept="image/jpeg,image/png"
                  textButton="file selector or drag and drop"
                  handleChangeFile={this.handleChangeFile("southern_boundary")}
                />
              )}
            </div>
            <Typography component="h3">南側境界</Typography>
          </div>
          <div className={classes.box}>
            <div className={classes.contentBox}>
              {url6 ? (
                <React.Fragment>
                  <DeleteIcon
                    onClick={() => this.deleteFile("north_border")}
                    className={classes.iconDeleteImg}
                  />
                  <img src={url6} alt="" />
                </React.Fragment>
              ) : (
                <UploadFile
                  customStyleRoot={classes.boxUpload}
                  multiple={false}
                  accept="image/jpeg,image/png"
                  textButton="file selector or drag and drop"
                  handleChangeFile={this.handleChangeFile("north_border")}
                />
              )}
            </div>
            <Typography component="h3">北側境界</Typography>
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

SurveyReportPage14.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string, // id survey
  isNew: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeIsNew: PropTypes.func
};
export default withRoot(withStyles(styles)(SurveyReportPage14));
