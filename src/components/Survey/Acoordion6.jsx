import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
class Acoordion6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      data: {
        slope: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          arrBtn: [
            { textBtn: "なし", valBtn: 0 },
            { textBtn: "あり", valBtn: 1 }
          ],
          isRequire: false
        },
        field_situation: {
          isVali: 0,
          arrBtn: [
            { textBtn: "更地", valBtn: "land" },
            {
              textBtn: "既存建物あり",
              valBtn: "existing_building"
            },
            {
              textBtn: "はつり要（アスファルト5cm内）",
              valBtn: "hanging_required"
            },
            {
              textBtn: "雑草あり（10cm以上）",
              valBtn: "with_weeds"
            },
            {
              textBtn: "積雪あり（10cm以上）",
              valBtn: "with_snow"
            }
          ],
          isRequire: true
        },
        height_disorder: {
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
    data.slope.isVali = dataDetail.slope ? 1 : 0;
    data.field_situation.isVali = dataDetail.field_situation ? 1 : 0;
    data.height_disorder.isVali = dataDetail.height_disorder ? 1 : 0;
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
        nameAcoor: "acoordion6",
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
    const { data, expanded } = this.state;

    // event change role renderBtnSlope
    // let renderBtnSlope = this.renderStringModeRead(
    //   "slope",
    //   parseInt(dataDetail.slope)
    // );

    let renderBtnSlope = data.slope.arrBtn.map((item, index) => {
      let isSelect = parseInt(dataDetail.slope) === item.valBtn ? true : false;
      return (
        <Button
          key={index}
          disabled={permission !== "R" ? false : true}
          variant="outlined"
          value={dataDetail.slope}
          onClick={() => this.handleChangeRoleBtn("slope", item.valBtn)}
          className={`${classes.btnRole} ${isSelect ? classes.activeRole : ""}`}
        >
          {item.textBtn}
        </Button>
      );
    });

    // event change role renderBtnSiteSituation

    // let renderBtnSiteSituation = this.renderStringModeRead(
    //   "field_situation",
    //   dataDetail.field_situation
    // );

    let renderBtnSiteSituation = data.field_situation.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.field_situation === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.field_situation}
            onClick={() =>
              this.handleChangeRoleBtn("field_situation", item.valBtn)
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

    // event change role renderBtnHeightTrouble
    // let renderBtnHeightTrouble = this.renderStringModeRead(
    //   "height_disorder",
    //   parseInt(dataDetail.height_disorder)
    // );

    let renderBtnHeightTrouble = data.height_disorder.arrBtn.map(
      (item, index) => {
        let isSelect =
          parseInt(dataDetail.height_disorder) === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.height_disorder}
            onClick={() =>
              this.handleChangeRoleBtn("height_disorder", item.valBtn)
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

    let openExpan = this.findValitionAcoordion("acoordion5");
    return (
      <React.Fragment>
        {/* acoordion 7 */}
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
              6. 搬入条件、高さ障害
            </Typography>
            <Typography className={classes.headingAcoordionRight}>
              {this.findValitionAcoordion("acoordion6") ? (
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
              <label htmlFor="スロープ">スロープ:</label>
              <div className={classes.rowBtnRole}>{renderBtnSlope}</div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label htmlFor="現場状況" style={{ color: "#AA041B" }}>
                現場状況:
              </label>
              <div className={classes.rowBtnRole}>
                {renderBtnSiteSituation}
                <TextFieldSjsAcoor
                  permission={permission}
                  placeholder="その他"
                  customStyleRoot={classes.textFieldDefault}
                  isVali={data.field_situation.isVali}
                  handleUpdate={this.handleUpdateOther("field_situation")}
                  value={
                    this.isValueOfButton(
                      "field_situation",
                      dataDetail.field_situation
                    )
                      ? ""
                      : dataDetail.field_situation
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
              <label htmlFor="高さ障害" style={{ color: "#AA041B" }}>
                高さ障害:
              </label>
              <div className={classes.rowBtnRole}>{renderBtnHeightTrouble}</div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  };
}

Acoordion6.propTypes = {
  classes: PropTypes.object.isRequired,
  dataDetail: PropTypes.object,
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
  withRoot(withStyles(styles)(Acoordion6))
);
