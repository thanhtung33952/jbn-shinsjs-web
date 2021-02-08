import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
// redux action
import { updateValidation } from "actions/surveyActions.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// icon material
import DoneIcon from "@material-ui/icons/Done";
import CreateIcon from "@material-ui/icons/Create";
// icon material
import ExpandCloseIcon from "assets/img/icon_close_survey.png";
import ExpandOpenIcon from "assets/img/icon_open_survey.png";
// constant
import { folderRoot } from "constant/index.js";
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
    color: "#B40D26",
    "& span": {
      fontWeight: "500 !important"
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
  acoordionDetailAtt: {
    "& $lineForm": {
      width: "50% !important",
      marginLeft: "30% !important"
    }
  },
  formGroupAtt: {
    justifyContent: "flex-start",
    "& label": {
      width: "30%",
      lineHeight: "32px"
    }
  },
  rowBtnAtt: {
    textAlign: "left",
    width: "25%",
    position: "relative",
    "& button": {
      marginBottom: 0
    },
    [device.tablet]: {
      width: "35%"
    }
  },
  fileName: {
    position: "absolute",
    bottom: 0,
    left: "100%",
    width: 200
  },
  styleRead: {
    "& $formGroup": {
      "& label": {
        lineHeight: "20px"
      },
      "& span": {
        lineHeight: "20px",
        fontWeight: 500
      }
    },
    "& $fileName": {
      fontWeight: 500,
      left: "auto",
      width: "auto",
      bottom: "auto",
      position: "relative"
    },
    "& $lineForm": {
      display: "none"
    },
    "& $rowBtnAtt": {
      width: "auto"
    }
  }
});
class Acoordion8 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      data: {
        // site_map: {
        //   isVali: 0, // 1: ok, 0: norma , -1: error
        //   isRequire: true
        // },
        building_drawing_set: {
          isVali: 0,
          isRequire: false
        },
        site_photo: {
          isVali: 0,
          isRequire: false
        },
        other: {
          isVali: 0,
          isRequire: false
        },
        ground_survey_report: {
          isVali: 0,
          isRequire: false
        },
        temporary_material_request_form: {
          isVali: 0,
          isRequire: false
        },
        design_checklist: {
          isVali: 0,
          isRequire: false
        },
        construction_plan: {
          isVali: 0,
          isRequire: false
        },
        construction_quotation: {
          isVali: 0,
          isRequire: false
        },
        construction_examination_book: {
          isVali: 0,
          isRequire: false
        },
        construction_report: {
          isVali: 0,
          isRequire: false
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
    // data.site_map.isVali = dataDetail.site_map ? 1 : 0;
    // data.building_drawing_set.isVali = dataDetail.building_drawing_set ? 1 : 0;
    // data.site_photo.isVali = dataDetail.site_photo ? 1 : 0;

    data.other = dataDetail.other ? 1 : 0;
    data.ground_survey_report.isVali = dataDetail.ground_survey_report ? 1 : 0;
    data.temporary_material_request_form.isVali = dataDetail.temporary_material_request_form
      ? 1
      : 0;

    data.design_checklist = dataDetail.design_checklist ? 1 : 0;
    data.construction_plan.isVali = dataDetail.construction_plan ? 1 : 0;
    data.construction_quotation.isVali = dataDetail.construction_quotation
      ? 1
      : 0;
    data.construction_examination_book.isVali = dataDetail.construction_examination_book
      ? 1
      : 0;
    data.construction_report.isVali = dataDetail.construction_report ? 1 : 0;
    this.setState({ data: data }, () => this.validationAllAcoordion());
  };
  handleChangeFile = name => file => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    data[name].isVali = 1;

    this.setState({ data }, () => this.validationAllAcoordion());
    if (handleUpdate) {
      handleUpdate(name, file);
    }
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
        nameAcoor: "acoordion8",
        isVali: isValidationAcoor
      })
    );
  };

  // find acoordion có validation chưa
  findValitionAcoordion = nameAcoor => {
    const { surveyProps } = this.props;
    const validation = surveyProps.validation;
    let isValidation = validation.find(x => x.nameAcoor === nameAcoor).isVali;
    return isValidation;
  };

  // save and redirect sang page groupd-suvey-report
  saveAndRedirect = () => {
    const { handleSave } = this.props;
    if (handleSave) {
      handleSave();
    }
  };

  // convert name file
  convertNameFile = (strOutput, field) => {
    const { dataDetail } = this.props;
    let file;
    let strConvert = "";
    if (dataDetail && dataDetail[field]) {
      if (dataDetail[field].name) {
        // nếu tồn tại name thì đó là file upload
        file = dataDetail[field].name;
      } else {
        // ngược lại thì file này từ database
        file = dataDetail[field];
      }
      // lấy phần mở rộng của file
      let extension = file.split(".");
      strConvert = strOutput + "." + extension[1];
    }

    return strConvert;

    // let arrFile;
    // let strConvert = "";
    // if (dataDetail && dataDetail[field]) {
    //   // hiện tại chỉ cho upload 1 file ( check trước nếu nhiều file: đang upload thì nó là arr, else data từ database thì sẽ là string dạng "abc.jpg,hello.pdf")
    //   if (Array.isArray(dataDetail[field])) {
    //     // arr file đang upload
    //     arrFile = dataDetail[field];
    //   } else {
    //     // dataDetail[field] là string từ database và nó có thể là arr
    //     arrFile = dataDetail[field].split(",");
    //   }
    // }
    // if (arrFile && Array.isArray(arrFile)) {
    //   arrFile.forEach((item, i) => {
    //     let file;
    //     if (item.name) {
    //       // nếu tồn tại item.name thì đó là file upload
    //       file = item.name;
    //     } else {
    //       // ngược lại thì file này từ database
    //       file = item;
    //     }

    //     // lấy phần mở rộng của file
    //     let extension = file.split(".");
    //     strConvert +=
    //       strOutput + "." + extension[1] + (i - 1 < arrFile.length ? "" : ",");
    //   });
    // }
  };
  toggleExpand = (event, expanded) => {
    this.setState({
      expanded: expanded
    });
  };

  render = () => {
    const { classes, dataDetail } = this.props;
    // console.log(dataDetail);
    let openExpan = this.findValitionAcoordion("acoordion7");
    return (
      <React.Fragment>
        {/* acoordion 9 */}
        <ExpansionPanel
          disabled={!openExpan}
          className={classes.acoordion}
          style={{ margin: "10px 0" }}
          expanded={this.state.expanded}
          onChange={this.toggleExpand}
        >
          <ExpansionPanelSummary
            style={{ height: 58, minHeight: 58 }}
            className={classes.expansionPanelSummary}
            classes={{
              root: classes.expansionPanelSummary,
              content: classes.expansionContent
            }}
          >
            <Typography className={classes.headingAcoordion}>
              {/* {this.findValitionAcoordion("acoordion8") ? (
                <DoneIcon className={classes.iconDone} />
              ) : (
                <CreateIcon />
              )} */}
              {this.state.expanded ? (
                <img src={ExpandOpenIcon} />
              ) : (
                <img src={ExpandCloseIcon} />
              )}
              8. 地盤調査報告書
            </Typography>
            <Button
              // disabled={!dataDetail || !dataDetail.id}
              // href={`${folderRoot}ground-survey-report/${dataDetail.id}`}
              // target="_blank"
              variant="outlined"
              className={classes.headingAcoordionRight}
              onClick={this.saveAndRedirect}
            >
              調査報告書作成画面へ
            </Button>
          </ExpansionPanelSummary>
          {/* <ExpansionPanelDetails
            className={`${classes.acoordionDetail}  ${
              classes.acoordionDetailAtt
            } ${permission === "R" ? classes.styleRead : ""}`}
          >
            <span>Todo</span>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
          </ExpansionPanelDetails> */}
        </ExpansionPanel>
      </React.Fragment>
    );
  };
}

Acoordion8.propTypes = {
  classes: PropTypes.object.isRequired,
  dataDetail: PropTypes.object,
  permission: PropTypes.string,
  isNew: PropTypes.bool,
  surveyProps: PropTypes.object,
  handleUpdate: PropTypes.func,
  handleSave: PropTypes.func,
  dispatch: PropTypes.func
};
const mapStateToProps = state => {
  const { surveyState } = state;
  return {
    surveyProps: surveyState
  };
};
export default connect(mapStateToProps)(
  withRoot(withStyles(styles)(Acoordion8))
);
