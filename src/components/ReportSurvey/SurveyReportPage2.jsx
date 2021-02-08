import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import axios from "axios";
// img
import tbChildPage2 from "assets/img/tbChildPage2.png";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

// constant
import { apiRoot } from "constant/index.js";
// component customer
import Notification from "components/Notification/Notification.jsx";
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
    }
  },
  tableMain: {
    color: "gray",
    marginTop: 20,
    width: "100%",
    fontSize: 15,
    "& tr td": {
      paddingBottom: 20
    },
    "& tr td:nth-child(1)": {
      fontWeight: 600,
      color: "#213858",
      width: 110,
      letterSpacing: 6,
      fontSize: 15,
      verticalAlign: "top"
    }
  },
  input: {
    width: "100%",
    "& input": {
      padding: "4px 10px"
    },
    "& fieldset": {
      borderRadius: 0
    }
  },
  inputInline: {
    marginLeft: 20,
    width: 200,
    minWidth: "auto",
    "& input": {
      padding: "4px 10px"
    },
    "& fieldset": {
      borderRadius: 0
    }
  },
  tbChild: {
    borderSpacing: 0,
    margin: "5px 0",
    border: "1px solid #737373",
    width: "100%",
    color: "#213858",
    "& tr th, tr td": {
      border: "1px solid #737373",
      textAlign: "center",
      fontWeight: "normal",
      paddingBottom: 0
    },
    "& tr th:nth-child(1), tr td:nth-child(1), tr th:nth-child(4), tr td:nth-child(4)": {
      width: 30,
      letterSpacing: 0,
      fontWeight: "normal"
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
class SurveyReportPage2 extends React.Component {
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
        survey_site: {
          isVali: 0,
          isRequire: true,
          val: ""
        },
        survey_date: {
          isVali: 0,
          isRequire: true,
          val: ""
        },
        survey_equipment: {
          isVali: 0,
          isRequire: true,
          val: ""
        },
        person_in_charge: {
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

  convertDataPage = async dataParent => {
    const { data } = this.state;
    if (!dataParent) return;
    data.property_name.val = dataParent.property_name;
    data.property_name.isVali = dataParent.property_name ? 1 : 0;
    data.survey_date.val = dataParent.survey_date;
    data.survey_date.isVali = dataParent.survey_date ? 1 : 0;
    data.survey_site.val = dataParent.survey_site;
    data.survey_site.isVali = dataParent.survey_site ? 1 : 0;
    data.survey_equipment.val = dataParent.survey_equipment;
    data.survey_equipment.isVali = dataParent.survey_equipment ? 1 : 0;
    data.person_in_charge.val = dataParent.person_in_charge;
    data.person_in_charge.isVali = dataParent.person_in_charge ? 1 : 0;
    this.setState({ data }, () => this.validationAllPage());
  };
  // getDataSurveyReport = async id => {
  //   const { data } = this.state;
  //   const res = await axios.get(`${apiRoot}/groundsurveyreport1and2/${id}`);
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
  //   data.survey_site.val = result.survey_site;
  //   data.survey_site.isVali = result.survey_site ? 1 : 0;
  //   data.survey_equipment.val = result.survey_equipment;
  //   data.survey_equipment.isVali = result.survey_equipment ? 1 : 0;
  //   data.person_in_charge.val = result.person_in_charge;
  //   data.person_in_charge.isVali = result.person_in_charge ? 1 : 0;
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
    const { handleChangeIsNew, id } = this.props;
    const { data, statusSave } = this.state;
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataInsert = {
      id_ground_survey_report: id,
      property_name: data.property_name.val,
      survey_date: data.survey_date.val,
      survey_site: data.survey_site.val,
      survey_equipment: data.survey_equipment.val,
      person_in_charge: data.person_in_charge.val
    };
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
      survey_site: data.survey_site.val,
      survey_equipment: data.survey_equipment.val,
      person_in_charge: data.person_in_charge.val
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
    const { data, statusSave, isValidationAll } = this.state;
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
          <Typography component="h1">調査概要</Typography>
          <table className={classes.tableMain}>
            <tr>
              <td>調査件名</td>
              <td>
                <TextFieldSjsAcoor
                  permission={null}
                  placeholder="調査件名"
                  required={data.property_name.isRequire}
                  customStyleRoot={classes.input}
                  isVali={data.property_name.isVali}
                  handleUpdate={this.handleChangeValue("property_name")}
                  value={data.property_name.val}
                />
              </td>
            </tr>
            <tr>
              <td>調査場所</td>
              <td>
                <TextFieldSjsAcoor
                  permission={null}
                  placeholder="調査地"
                  required={data.survey_site.isRequire}
                  customStyleRoot={classes.input}
                  isVali={data.survey_site.isVali}
                  handleUpdate={this.handleChangeValue("survey_site")}
                  value={data.survey_site.val}
                />
              </td>
            </tr>
            <tr>
              <td>調査年月日</td>
              <td>
                <TextFieldSjsAcoor
                  permission={null}
                  placeholder="調査日付 2019年10月10日"
                  required={data.survey_date.isRequire}
                  customStyleRoot={classes.input}
                  isVali={data.survey_date.isVali}
                  handleUpdate={this.handleChangeValue("survey_date")}
                  value={data.survey_date.val}
                />
              </td>
            </tr>
            <tr>
              <td>調査目的</td>
              <td>
                敷地内の代表される地点で下記内容の調査を行って、地盤の硬軟締まり状況等を判断し、予定構造物の基礎設定及び施工に関する資料を得るために実施した。
              </td>
            </tr>
            <tr>
              <td>調査機器</td>
              <td>
                <TextFieldSjsAcoor
                  permission={null}
                  placeholder="調査機器"
                  required={data.survey_equipment.isRequire}
                  customStyleRoot={classes.input}
                  isVali={data.survey_equipment.isVali}
                  handleUpdate={this.handleChangeValue("survey_equipment")}
                  value={data.survey_equipment.val}
                />
              </td>
            </tr>
            <tr>
              <td>調査内容</td>
              <td>
                1.スウェーデン式型査
                <table className={classes.tbChild}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>調査深度</th>
                      <th>特記事項</th>
                      <th></th>
                      <th>調査深度</th>
                      <th>特記事項</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td></td>
                      <td></td>
                      <td>6</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                2.地形地層調査・敷地内造成状況調査・目視観察状況調査
              </td>
            </tr>
            <tr>
              <td>調査担当</td>
              <td>
                担当者
                <TextFieldSjsAcoor
                  permission={null}
                  placeholder="担当者"
                  required={data.person_in_charge.isRequire}
                  customStyleRoot={classes.inputInline}
                  isVali={data.person_in_charge.isVali}
                  handleUpdate={this.handleChangeValue("person_in_charge")}
                  value={data.person_in_charge.val}
                />
              </td>
            </tr>
            <tr>
              <td>使用計算式</td>
              <td style={{ color: "#222", fontWeight: 500 }}>
                換算N値の計算式は，稲田式を採用しております。3Wsw
                -0.05Nsw（粘性土）許容支持力の計算式は日本建築学会推奨式を採用しております。qa
                = 30Wsw + 0.64Nsw Nswが150以上の場合150とみなしております。
                <img
                  src={tbChildPage2}
                  alt="table"
                  style={{ display: "block" }}
                />
              </td>
            </tr>
          </table>
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

SurveyReportPage2.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  isNew: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeIsNew: PropTypes.func
};
export default withRoot(withStyles(styles)(SurveyReportPage2));
