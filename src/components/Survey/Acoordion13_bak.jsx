import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// redux action
import { updateValidation } from "actions/surveyActions.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// icon material
import DoneIcon from "@material-ui/icons/Done";
import CreateIcon from "@material-ui/icons/Create";
// icon img
import ExpandCloseIcon from "assets/img/icon_close_survey.png";
import ExpandOpenIcon from "assets/img/icon_open_survey.png";
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
        lineHeight: "22px",
        width: "22%"
      }
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
    }
  }
});
class Acoordion13 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      data: {
        application_category: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          arrBtn: [
            { textBtn: "なし", valBtn: 0 },
            { textBtn: "あり", valBtn: 1 }
          ],
          isRequire: true
        },
        proof_period: {
          isVali: 0,
          arrBtn: [
            { textBtn: "なし", valBtn: 0 },
            { textBtn: "あり", valBtn: 1 }
          ],
          isRequire: true
        }
      }
    };
  }

  componentDidMount = () => {
    const { dataDetail } = this.props;
    const { data } = this.state;
    if (!dataDetail) {
      return;
    }
    data.application_category.isVali = dataDetail.application_category ? 1 : 0;
    data.proof_period.isVali = dataDetail.proof_period ? 1 : 0;
    this.setState({ data: data }, () => this.validationAllAcoordion());
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
  // Kiểm tra dữ liệu đang thuộc button  hay field textbox other
  // return false: value thuộc other , ngược lại thuộc button
  isValueOfButton = (name, value) => {
    const { data } = this.state;
    let indexValue = data[name].arrBtn.findIndex(
      i => i.valBtn === parseInt(value)
    );
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
        nameAcoor: "acoordion13",
        isVali: isValidationAcoor
      })
    );
  };

  // render str by value button
  renderStringModeRead = (name, value) => {
    const { data } = this.state;
    let item = data[name].arrBtn.find(i => i.valBtn === parseInt(value));
    if (!item) return null;
    return item.textBtn;
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
    const { data } = this.state;

    // event change role renderBtnAppType
    // let renderBtnAppType = this.renderStringModeRead(
    //   "application_category",
    //   dataDetail.application_category
    // );

    let renderBtnAppType = data.application_category.arrBtn.map(
      (item, index) => {
        let isSelect =
          parseInt(dataDetail.application_category) === item.valBtn
            ? true
            : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.application_category}
            onClick={() =>
              this.handleChangeRoleBtn("application_category", item.valBtn)
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

    // event change role renderBtnCertificationPeriod
    //  nếu quyền chỉ được đọc thì lấy string tương ứng với giá trị
    // let renderBtnCertificationPeriod = this.renderStringModeRead(
    //   "proof_period",
    //   dataDetail.proof_period
    // );
    // khác quyền đọc thì xử lý select btn

    let renderBtnCertificationPeriod = data.proof_period.arrBtn.map(
      (item, index) => {
        let isSelect =
          parseInt(dataDetail.proof_period) === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            variant="outlined"
            disabled={permission !== "R" ? false : true}
            value={dataDetail.proof_period}
            onClick={() =>
              this.handleChangeRoleBtn("proof_period", item.valBtn)
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

    let openExpan = this.findValitionAcoordion("acoordion7");
    return (
      <React.Fragment>
        {/* acoordion 11 */}
        <ExpansionPanel
          disabled={!openExpan}
          className={classes.acoordion}
          expanded={this.state.expanded}
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
              {this.state.expanded ? (
                <img src={ExpandOpenIcon} />
              ) : (
                <img src={ExpandCloseIcon} />
              )}
              13. 申込区分
            </Typography>
            <Typography className={classes.headingAcoordionRight}>
              {this.findValitionAcoordion("acoordion13") ? (
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
              <label htmlFor="申込区分:" style={{ color: "#AA041B" }}>
                申込区分:
              </label>
              <div className={classes.rowBtnRole}>{renderBtnAppType}</div>
            </div>
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label htmlFor="証明期間:" style={{ color: "#AA041B" }}>
                証明期間:
              </label>
              <div className={classes.rowBtnRole}>
                {renderBtnCertificationPeriod}
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  };
}

Acoordion13.propTypes = {
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
  withRoot(withStyles(styles)(Acoordion13))
);
