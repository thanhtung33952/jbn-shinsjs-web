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
    textAlign: "left !important",
    [device.tablet]: {
      width: 60,
      paddingLeft: 5
    }
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
  rowBtnRole: {
    textAlign: "left",
    width: "80%",
    [device.tablet]: {
      width: "56% !important"
    }
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
class Acoordion11 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      data: {
        SBI_building_confirmation_application: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          arrBtn: [
            { textBtn: "利用する", valBtn: "use" },
            { textBtn: "利用しない", valBtn: "not_use" }
          ],
          isRequire: false
        },
        ASD_visual_record: {
          isVali: 0,
          arrBtn: [
            { textBtn: "利用する", valBtn: "use" },
            { textBtn: "利用しない", valBtn: "not_use" }
          ],
          isRequire: false
        },
        JIBANGOO_published: {
          isVali: 0,
          arrBtn: [
            { textBtn: "掲載する", valBtn: "post" },
            { textBtn: "掲載しない", valBtn: "not_post" }
          ],
          isRequire: false
        }
      }
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(
      updateValidation({
        nameAcoor: "acoordion11",
        isVali: true
      })
    );
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
    const { dispatch, isNew } = this.props;
    const { data } = this.state;
    //console.log(itemArrCoor);
    let isValidationAcoor = true; // validation ok.
    // vòng for sẽ ckeck isVali từng field nếu field nào isVali === false sẽ dừng ngay.
    for (let name in data) {
      if (data[name].isVali === -1 && data[name].isRequire) {
        // nếu field nào false thì cả acoordition === faild, và out ngay
        isValidationAcoor = false;
        break;
      } else if (data[name].isVali === 0 && isNew && data[name].isRequire) {
        // nếu field nào chưa làm gì cả (isVali==0)
        // + trường mode isnew == true thì cả acoord === faild
        // + trường mode isnew == false thì cả acoord === ok (vì trường hợp đã có data sẵn trên từng field)
        isValidationAcoor = false;
        break;
      }
    }
    dispatch(
      updateValidation({
        nameAcoor: "acoordion11",
        isVali: isValidationAcoor
      })
    );
  };
  // render str by value button
  renderStringModeRead = (name, value) => {
    const { data } = this.state;
    let item = data[name].arrBtn.find(i => i.valBtn === value);
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

    // event change role renderBtnSBIBuildingApp
    // let renderBtnSBIBuildingApp = this.renderStringModeRead(
    //   "SBI_building_confirmation_application",
    //   dataDetail.SBI_building_confirmation_application
    // );

    let renderBtnSBIBuildingApp = data.SBI_building_confirmation_application.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.SBI_building_confirmation_application === item.valBtn
            ? true
            : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.SBI_building_confirmation_application}
            onClick={() =>
              this.handleChangeRoleBtn(
                "SBI_building_confirmation_application",
                item.valBtn
              )
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

    // event change role renderBtnASDVisualIdentity
    // let renderBtnASDVisualIdentity = this.renderStringModeRead(
    //   "ASD_visual_record",
    //   dataDetail.ASD_visual_record
    // );

    let renderBtnASDVisualIdentity = data.ASD_visual_record.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.ASD_visual_record === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.ASD_visual_record}
            onClick={() =>
              this.handleChangeRoleBtn("ASD_visual_record", item.valBtn)
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

    // event change role renderBtnJIBANGOOPosted
    // let renderBtnJIBANGOOPosted = this.renderStringModeRead(
    //   "JIBANGOO_published",
    //   dataDetail.JIBANGOO_published
    // );

    let renderBtnJIBANGOOPosted = data.JIBANGOO_published.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.JIBANGOO_published === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.JIBANGOO_published}
            onClick={() =>
              this.handleChangeRoleBtn("JIBANGOO_published", item.valBtn)
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
              {/* {this.findValitionAcoordion("acoordion11") ? (
                <DoneIcon className={classes.iconDone} />
              ) : (
                <CreateIcon />
              )} */}
              {this.state.expanded ? (
                <img src={ExpandOpenIcon} />
              ) : (
                <img src={ExpandCloseIcon} />
              )}
              11. オプションサービス
            </Typography>
            <Typography className={classes.headingAcoordionRight}>
              {this.findValitionAcoordion("acoordion11") ? (
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
              <label htmlFor="SBI 建築確認申請" style={{ lineHeight: "20px" }}>
                SBI 建築確認申請:
              </label>
              <div className={classes.rowBtnRole} style={{ width: "45%" }}>
                {renderBtnSBIBuildingApp}
              </div>
              <label className={classes.labEndRow} htmlFor="（別料金）">
                （別料金）
              </label>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label htmlFor="ASD 目視録">ASD 目視録:</label>
              <div className={classes.rowBtnRole} style={{ width: "45%" }}>
                {renderBtnASDVisualIdentity}
              </div>
              <label className={classes.labEndRow} htmlFor="（別料金）">
                （別料金）
              </label>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label htmlFor="JIBANGOO掲載" style={{ lineHeight: "20px" }}>
                JIBANGOO掲載:
              </label>
              <div className={classes.rowBtnRole} style={{ width: "45%" }}>
                {renderBtnJIBANGOOPosted}
              </div>
              <label className={classes.labEndRow} htmlFor="（別料金）">
                （無料）
              </label>
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

Acoordion11.propTypes = {
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
  withRoot(withStyles(styles)(Acoordion11))
);
