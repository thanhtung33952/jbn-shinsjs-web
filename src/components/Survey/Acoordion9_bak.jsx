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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
//component custom
import UploadFile from "components/UploadFile/UploadFile.jsx";
// icon material
import DoneIcon from "@material-ui/icons/Done";
import CreateIcon from "@material-ui/icons/Create";
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
  headingAcoordion: {
    color: theme.palette.greenDark.dark,
    fontWeight: "400 !important",
    "& svg": {
      verticalAlign: "bottom",
      marginRight: 20
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
class Acoordion9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        nameAcoor: "acoordion9",
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

  render = () => {
    const { classes, permission } = this.props;
    // 1
    // let nameSiteMap = this.convertNameFile("現場案内図", "site_map");
    // 2
    let nameBuildingDrawing = this.convertNameFile(
      "建物図面一式",
      "building_drawing_set"
    );
    // 3
    let nameSitePhoto = this.convertNameFile("現場写真", "site_photo");
    // 4
    let nameOther = this.convertNameFile("その他", "other");
    // add sau này
    let nameGroundSurveyReport = this.convertNameFile(
      "地盤調査報告書",
      "ground_survey_report"
    );
    // 5
    let nameTemporaryMaterialRequestForm = this.convertNameFile(
      "仮設資材依頼書",
      "temporary_material_request_form"
    );
    // 6
    let nameDesignChecklist = this.convertNameFile(
      "設計チェックリスト",
      "design_checklist"
    );
    // 7
    let nameConstructionPlan = this.convertNameFile(
      "工事設計図",
      "construction_plan"
    );
    // 8
    let nameConstructionQuotation = this.convertNameFile(
      "工事見積書",
      "construction_quotation"
    );
    // 9
    let nameConstructionExaminationBook = this.convertNameFile(
      "工事検討書",
      "construction_examination_book"
    );
    // 10
    let nameConstructionReport = this.convertNameFile(
      "工事報告書",
      "construction_report"
    );

    return (
      <React.Fragment>
        {/* acoordion 9 */}
        <ExpansionPanel className={classes.acoordion}>
          <ExpansionPanelSummary className={classes.expansionPanelSummary}>
            <Typography className={classes.headingAcoordion}>
              {this.findValitionAcoordion("acoordion9") ? (
                <DoneIcon className={classes.iconDone} />
              ) : (
                <CreateIcon />
              )}
              9. 添付資料
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={`${classes.acoordionDetail}  ${
              classes.acoordionDetailAtt
            } ${permission === "R" ? classes.styleRead : ""}`}
          >
            {/* <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="現場案内図" style={{ color: "#AA041B" }}>
                現場案内図：
              </label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile("site_map")}
                  />
                )}
                <span className={classes.fileName}>{nameSiteMap}</span>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            /> */}
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="建物図面一式：">建物図面一式：</label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile(
                      "building_drawing_set"
                    )}
                  />
                )}
                <span className={classes.fileName}>{nameBuildingDrawing}</span>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="現場写真：">現場写真：</label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile("site_photo")}
                  />
                )}
                <span className={classes.fileName}>{nameSitePhoto}</span>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="その他：">その他：</label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile("other")}
                  />
                )}
                <span className={classes.fileName}>{nameOther}</span>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="地盤調査報告書：">地盤調査報告書：</label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile(
                      "ground_survey_report"
                    )}
                  />
                )}
                <span className={classes.fileName}>
                  {nameGroundSurveyReport}
                </span>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="仮設資材依頼書：">仮設資材依頼書：</label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile(
                      "temporary_material_request_form"
                    )}
                  />
                )}
                <span className={classes.fileName}>
                  {nameTemporaryMaterialRequestForm}
                </span>
              </div>
              <label
                className={classes.labEndRow}
                style={{ width: "auto", marginTop: -5 }}
                htmlFor="（別料金）"
              >
                仮設図を含む
              </label>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label
                htmlFor="設計チェックリスト："
                style={{
                  lineHeight: "20px",
                  width: "calc(30% + 20px)",
                  marginLeft: -20
                }}
              >
                設計チェックリスト：
              </label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile("design_checklist")}
                  />
                )}
                <span className={classes.fileName}>{nameDesignChecklist}</span>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="工事設計図：">工事設計図：</label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile(
                      "construction_plan"
                    )}
                  />
                )}
                <span className={classes.fileName}>{nameConstructionPlan}</span>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="工事見積書：">工事見積書：</label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile(
                      "construction_quotation"
                    )}
                  />
                )}
                <span className={classes.fileName}>
                  {nameConstructionQuotation}
                </span>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="工事検討書：">工事検討書：</label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile(
                      "construction_examination_book"
                    )}
                  />
                )}
                <span className={classes.fileName}>
                  {nameConstructionExaminationBook}
                </span>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupAtt}`}>
              <label htmlFor="工事報告書：">工事報告書：</label>
              <div className={classes.rowBtnAtt}>
                {permission !== "R" && (
                  <UploadFile
                    multiple={false}
                    accept="application/pdf"
                    textButton="アップロード"
                    handleChangeFile={this.handleChangeFile(
                      "construction_report"
                    )}
                  />
                )}
                <span className={classes.fileName}>
                  {nameConstructionReport}
                </span>
              </div>
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

Acoordion9.propTypes = {
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
  withRoot(withStyles(styles)(Acoordion9))
);
