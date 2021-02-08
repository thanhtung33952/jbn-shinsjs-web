import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import axios from "axios";
// img
import bgPage from "assets/img/bg01.png";
import logoFooter from "assets/img/logoFooter.PNG";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
// component customer
import Notification from "components/Notification/Notification.jsx";
import TextFieldSjsAcoor from "components/TextFieldSjsAcoordion/TextFieldSjsAcoordion.jsx";
// constant
import { apiRoot } from "constant/index.js";
// jss
const styles = theme => ({
  root: {
    // height: "100%",
    textAlign: "right",
    border: "1px solid gray",
    position: "relative",
    marginBottom: 80
  },
  textReport: {
    transform: "rotate(-90deg)",
    color: "#CACCE1",
    fontSize: 42,
    position: "absolute",
    right: 5,
    bottom: 280,
    fontWeight: 600
  },
  grMain: {
    position: "absolute",
    top: 300,
    display: "flex",
    flexDirection: "column",
    left: 110,
    color: "#213858",
    "& h1": {
      fontSize: 45,
      fontWeight: 900,
      color: "#213858",
      position: "relative",
      lineHeight: "45px",
      "&:before": {
        content: "''",
        height: 110,
        width: 10,
        background: "#213858",
        position: "absolute",
        left: -30
      }
    }
  },
  input: {
    marginTop: 28,
    marginLeft: 6,
    "& input": {
      padding: "9px 10px"
    },
    "& fieldset": {
      borderRadius: 0
    }
  },
  footer: {
    position: "absolute",
    left: 80,
    bottom: 80,
    textAlign: "left",
    "& p": {
      fontSize: 13,
      color: "#222",
      fontWeight: 600,
      marginTop: -5
    },
    "& span": {
      display: "block",
      fontSize: 15,
      fontWeight: 600,
      color: "#222",
      marginBottom: 5
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
class SurveyReportPage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidationAll: false, // isValidationAll: true => ok active btn save
      surveyId: null,
      data: {
        property_name: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          isRequire: true,
          val: ""
        },
        survey_date: {
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
    const { id, data } = this.props;
    // if (id && data) {
    //   this.setState({ surveyId: id });
    //   // this.getDataSurveyReport(id);
    // }
    this.convertDataPage(data);
  };
  UNSAFE_componentWillReceiveProps = nextProps => {
    // if (!nextProps.id || !nextProps.data) return;
    // // check nếu id survey khác thì không cho nó lấy lại data nữa, vì bản chất vòng đời này luôn vào khi props thay đổi
    // if (nextProps.id !== this.state.surveyId && nextProps.data) {
    //   this.setState({ surveyId: nextProps.id });
    //   // this.getDataSurveyReport(nextProps.id);
    // } else return;
    this.convertDataPage(nextProps.data);
  };

  convertDataPage = async dataParent => {
    const { data } = this.state;
    if (!dataParent) return;
    data.property_name.val = dataParent.property_name;
    data.property_name.isVali = dataParent.property_name ? 1 : 0;
    data.survey_date.val = dataParent.survey_date;
    data.survey_date.isVali = dataParent.survey_date ? 1 : 0;
    this.setState({ data }, () => this.validationAllPage());
  };

  // getDataSurveyReport = async id => {
  //   const { data } = this.state;
  //   const res = await axios.get(`${apiRoot}/groundsurveyreport1and2/${id}`);
  //   // console.log(res);
  //   // Failed
  //   if (res.status !== 200 || res.data === false) {
  //     return false;
  //   }
  //   // Success
  //   let result = res.data;
  //   data.property_name.val = result.property_name;
  //   data.property_name.isVali = result.property_name ? 1 : 0;
  //   data.survey_date.val = result.survey_date;
  //   data.survey_date.isVali = result.survey_date ? 1 : 0;
  //   this.setState({ data, isNew: false }, () => this.validationAllPage());
  // };

  // event validation blur field text thông qua component TextFieldSjsAcoor
  handleChangeValue = name => (isVali, value) => {
    const { handleChange } = this.props;
    // const { data } = this.state;
    // data[name].isVali = isVali;
    // data[name].val = value;

    if (handleChange) {
      handleChange("page1and2", name, value);
    }
    // this.setState({ data }, () => this.validationAllPage());
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

  handleSave = () => {
    const { isNew } = this.props;
    if (isNew) {
      // insert
      this.insertSurveyReport();
    } else {
      this.updateSurveyReport();
    }
  };
  insertSurveyReport = async () => {
    const { data, statusSave } = this.state;
    const { handleChangeIsNew } = this.props;
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataInsert = {
      id_ground_survey_report: this.props.id,
      property_name: data.property_name.val,
      survey_date: data.survey_date.val,
      // data rong cho page 2
      survey_site: "",
      survey_equipment: "",
      person_in_charge: ""
    };
    // console.log(dataInsert)
    const res = await axios.post(
      `${apiRoot}/groundsurveyreport1and2`,
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
    handleChangeIsNew("page1and2", false);
  };

  updateSurveyReport = async () => {
    const { data, statusSave } = this.state;
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataUpdate = {
      id_ground_survey_report: this.props.id,
      property_name: data.property_name.val,
      survey_date: data.survey_date.val,
      // data rong cho page 2
      survey_site: "",
      survey_equipment: "",
      person_in_charge: ""
    };
    const res = await axios.put(
      `${apiRoot}/groundsurveyreport1and2/${this.props.id}`,
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
    const { data, isValidationAll, statusSave } = this.state;
    // console.log(data);
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
        <img src={bgPage} alt="background page" style={{ width: 200 }} />
        <Typography component="h1" className={classes.textReport}>
          Ground Survey Report
        </Typography>
        <div className={classes.grMain}>
          <Typography component="h1">地盤調査報告書</Typography>
          <TextFieldSjsAcoor
            permission={null}
            placeholder="物件名"
            required={data.property_name.isRequire}
            customStyleRoot={classes.input}
            isVali={data.property_name.isVali}
            handleUpdate={this.handleChangeValue("property_name")}
            value={data.property_name.val}
          />
          <TextFieldSjsAcoor
            permission={null}
            placeholder="調査日付 2019年10月10日"
            required={data.survey_date.isRequire}
            customStyleRoot={classes.input}
            isVali={data.survey_date.isVali}
            handleUpdate={this.handleChangeValue("survey_date")}
            value={data.survey_date.val}
          />
        </div>
        <div className={classes.footer}>
          <img src={logoFooter} alt="Jibannet" />
          <Typography className={classes.textFooter}>
            <span>地盤ネット株式会社</span>
            東京都中央区日本橋1-7-9ダヴィンチ日本橋179ビル2F
            <br />
            TEL 03-6265-1803 FAX 03-6265-1804
          </Typography>
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
      </Paper>
    );
  };
}

SurveyReportPage1.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  isNew: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeIsNew: PropTypes.func
};
export default withRoot(withStyles(styles)(SurveyReportPage1));
