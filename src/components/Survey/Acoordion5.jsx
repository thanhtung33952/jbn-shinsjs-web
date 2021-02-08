import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// icon material
import DoneIcon from "@material-ui/icons/Done";
import CreateIcon from "@material-ui/icons/Create";
// icon img
import ExpandCloseIcon from "assets/img/icon_close_survey.png";
import ExpandOpenIcon from "assets/img/icon_open_survey.png";
// component project
import TextFieldSjsAcoor from "components/TextFieldSjsAcoordion/TextFieldSjsAcoordion.jsx";
// jss
import { device } from "assets/jss/responsive/device.jsx";
// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;

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
  rowInputFormCheckbox: {
    margin: 0,
    minWidth: "80%",
    textAlign: "left",
    "& label": {
      width: "auto !important"
    }
  },
  textDateTab: {
    backgroundColor: "#fff",
    borderRadius: 6,
    // height: "100%",
    margin: 0,
    "& fieldset": {
      borderColor: theme.palette.secondary.main + `${"!important"}`
    },
    "& input": {
      padding: 8,
      fontSize: 14,
      height: "100%"
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
  textFieldDefault: {
    "& fieldset": {
      borderRadius: 5,
      borderColor: theme.palette.secondary.main,
      backgroundColor: "#fff"
    },
    "& input": {
      padding: 9,
      borderRadius: 0,
      zIndex: 2
    }
  },
  activeOther: {
    "& fieldset": {
      borderColor: "#6699ff !important",
      borderWidth: 2
    }
  },
  rowBtnRole: {
    textAlign: "left",
    width: "80%"
  },
  rowBtnAtt: {
    textAlign: "left",
    width: "25%",
    "& button": {
      marginBottom: 0
    }
  },
  inputRootDate: {
    border: "solid 1px #9e9e9e",
    borderRadius: 5,
    padding: "0 10px",
    "&:before, &:after": {
      content: "none"
    }
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
  styleRead: {
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
    }
  }
});
class Acoordion5 extends React.Component {
  constructor(props) {
    super(props);
    this.noticeAcoor10 = React.createRef();
    this.state = {
      expanded: false,
      isLoadingSearchCompany: false,
      listCompany: [],
      data: {
        basic_shape: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          arrBtn: [
            {
              textBtn: "ベタ基礎",
              valBtn: "solid_foundation"
            },
            { textBtn: "布基礎", valBtn: "cloth_foundation" },
            { textBtn: "SCR基礎", valBtn: "SCR_foundation" }
          ],
          isRequire: false
        },
        rooting_depth: {
          isVali: 0,
          isRequire: false
        },
        foundation_work_schedule: {
          isVali: 0,
          arrBtn: [
            { textBtn: "未定", valBtn: "to_be_determined" },
            { textBtn: "予定", valBtn: "plans" }
          ],
          isRequire: true
        }
      }
    };
  }

  componentDidMount = () => {
    const { dataDetail, handleUpdate } = this.props;
    const { data } = this.state;
    if (!dataDetail) {
      handleUpdate("foundation_work_schedule_date", today);
      // phải gọi lai action redux để cập nhật lại props
      this.validationAllAcoordion();
      return;
    }
    // set date === today cho field foundation_work_schedule_date null
    data.basic_shape.isVali = dataDetail.basic_shape ? 1 : 0;
    data.rooting_depth.isVali = dataDetail.rooting_depth ? 1 : 0;
    data.foundation_work_schedule.isVali = dataDetail.foundation_work_schedule
      ? 1
      : 0;
    this.setState({ data: data }, () => this.validationAllAcoordion());
  };
  // event change checkbox all
  handleChangeCheckbox = name => event => {
    // const { data } = this.state;
    const { handleUpdate } = this.props;
    let val = event.target.checked ? 1 : 0;
    // data[name] = event.target.checked;
    // this.setState({ data });
    if (handleUpdate) {
      handleUpdate(name, val);
      this.validationAllAcoordion();
    }
  };
  // hander change date
  handleChangeDate = name => e => {
    const { handleUpdate } = this.props;
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let data = yy + "-" + mm + "-" + dd;
    if (handleUpdate) {
      handleUpdate(name, data);
      // phải gọi lai action redux để cập nhật lại props
      this.validationAllAcoordion();
    }
  };
  // event change role acoordion all
  handleChangeRoleBtn = (name, value) => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    data[name].isVali = 1;

    if (name === "foundation_work_schedule" && value === "to_be_determined") {
      handleUpdate("foundation_work_schedule_date", null);
    } else if (name === "foundation_work_schedule" && value === "plans") {
      handleUpdate("foundation_work_schedule_date", today);
    }

    this.setState({ data }, () => this.validationAllAcoordion());
    if (handleUpdate) {
      handleUpdate(name, value);
    }
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
        nameAcoor: "acoordion5",
        isVali: isValidationAcoor
      })
    );
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
    return item.textBtn + " ";
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
    return new Date();
  };
  // find acoordion có validation chưa
  findValitionAcoordion = nameAcoor => {
    const { surveyProps } = this.props;
    const validation = surveyProps.validation;
    let isValidation = validation.find(x => x.nameAcoor === nameAcoor).isVali;
    return isValidation;
  };
  toggleExpand = (event, expanded) => {
    this.setState({
      expanded: expanded
    });
  };

  render = () => {
    const { classes, dataDetail, permission } = this.props;

    const { data, expanded } = this.state;
    // event change role renderBtnBasicShape
    // let renderBtnBasicShape = this.renderStringModeRead(
    //   "basic_shape",
    //   dataDetail.basic_shape
    // );

    let renderBtnBasicShape = data.basic_shape.arrBtn.map((item, index) => {
      let isSelect = dataDetail.basic_shape === item.valBtn ? true : false;
      return (
        <Button
          key={index}
          disabled={permission !== "R" ? false : true}
          variant="outlined"
          value={dataDetail.basic_shape}
          onClick={() => this.handleChangeRoleBtn("basic_shape", item.valBtn)}
          className={`${classes.btnRole} ${isSelect ? classes.activeRole : ""}`}
        >
          {item.textBtn}
        </Button>
      );
    });
    // event change role renderBtnWorkPlan
    // let renderBtnWorkPlan = this.renderStringModeRead(
    //   "foundation_work_schedule",
    //   dataDetail.foundation_work_schedule
    // );

    let renderBtnWorkPlan = data.foundation_work_schedule.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.foundation_work_schedule === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.foundation_work_schedule}
            onClick={() =>
              this.handleChangeRoleBtn("foundation_work_schedule", item.valBtn)
            }
            className={`${classes.btnRole} ${
              isSelect ? classes.activeRole : ""
            }`}
          >
            {item.textBtn}
          </Button>
        );
      }
    );
    let openExpan = this.findValitionAcoordion("acoordion4");
    return (
      <React.Fragment>
        {/* acoordion 1 */}
        <ExpansionPanel
          disabled={!openExpan}
          className={classes.acoordion}
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
              5. 予定基礎
            </Typography>
            <Typography className={classes.headingAcoordionRight}>
              {this.findValitionAcoordion("acoordion5") ? (
                <span>ご記入ください</span>
              ) : (
                <span style={{ color: "#B40D26" }}>記入済み</span>
              )}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={`${classes.acoordionDetail} ${
              permission === "R" ? classes.styleRead : ""
            }`}
          >
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label htmlFor="基礎形状">基礎形状:</label>
              <div className={classes.rowBtnRole}>
                {renderBtnBasicShape}
                <TextFieldSjsAcoor
                  permission={permission}
                  placeholder="その他"
                  customStyleRoot={classes.textFieldDefault}
                  required={data.basic_shape.isRequire}
                  isVali={data.basic_shape.isVali}
                  handleUpdate={this.handleUpdateOther("basic_shape")}
                  value={
                    this.isValueOfButton("basic_shape", dataDetail.basic_shape)
                      ? ""
                      : dataDetail.basic_shape
                  }
                />
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={classes.formGroup}>
              <label htmlFor="根切り深度:">根切り深度:</label>
              <TextFieldSjsAcoor
                permission={permission} // quyền hạn
                placeholder="GL"
                required={data.rooting_depth.isRequire}
                customStyleRoot={classes.rowInputFormInline40}
                isVali={data.rooting_depth.isVali}
                handleUpdate={this.handleUpdate("rooting_depth")}
                value={dataDetail.rooting_depth}
              />
              <label className={classes.labEndRow} htmlFor="m">
                m
              </label>
            </div>
            <div className={classes.formGroup} style={{ marginTop: 0 }}>
              <label htmlFor="" />
              <div className={classes.rowInputFormCheckbox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={permission !== "R" ? false : true}
                      checked={
                        parseInt(dataDetail.deep_foundation_available) === 1
                          ? true
                          : false
                      }
                      onChange={this.handleChangeCheckbox(
                        "deep_foundation_available"
                      )}
                      value={dataDetail.deep_foundation_available}
                      style={{
                        paddingTop: 0,
                        paddingBottom: 0
                      }}
                    />
                  }
                  label="深基礎対応可"
                />
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label
                htmlFor="基礎工事予定"
                style={{
                  width: "40%",
                  marginLeft: "-20%",
                  color: "#AA041B"
                }}
              >
                基礎工事予定:
              </label>
              <div className={classes.rowBtnRole}>
                {renderBtnWorkPlan}
                {dataDetail.foundation_work_schedule === "plans" ? (
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={jpLocale}
                  >
                    <DatePicker
                      disabled={permission !== "R" ? false : true}
                      value={this.formatDate(
                        dataDetail.foundation_work_schedule_date
                      )}
                      format="yyyy/MM/dd"
                      className={classes.textDateTab}
                      cancelLabel="キャンセル"
                      margin="normal"
                      variant="outlined"
                      onChange={this.handleChangeDate(
                        "foundation_work_schedule_date"
                      )}
                      InputProps={{
                        classes: {
                          root: classes.inputRootDate,
                          input: classes.inputInputDate
                        }
                      }}
                    />
                  </MuiPickersUtilsProvider>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* end acoordion 1 */}
      </React.Fragment>
    );
  };
}

Acoordion5.propTypes = {
  classes: PropTypes.object.isRequired,
  dataDetail: PropTypes.object,
  permission: PropTypes.string,
  isNew: PropTypes.bool,
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
  withRoot(withStyles(styles)(Acoordion5))
);
