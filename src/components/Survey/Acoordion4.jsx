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
import Slider from "@material-ui/core/Slider";
//component custom
import UploadFile from "components/UploadFile/UploadFile.jsx";
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
const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

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
    },
    "& $labEndRow": {
      // width: "auto",
      // paddingLeft: "0px !important",
      fontWeight: 500
    }
  },
  disSlider: {
    pointerEvents: "none"
  },
  formGroupAtt: {
    justifyContent: "flex-start",
    "& label": {
      width: "20%",
      lineHeight: "32px"
    }
  },
  rowBtnAtt: {
    textAlign: "left",
    width: "18%",
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
  }
});
class Acoordion4 extends React.Component {
  constructor(props) {
    super(props);
    this.noticeAcoor10 = React.createRef();
    this.state = {
      expanded: false,
      isLoadingSearchCompany: false,
      listCompany: [],
      data: {
        collateral_liability_insurance_corporation: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          arrBtn: [
            { textBtn: "JIO", valBtn: "geo" },
            {
              textBtn: "住宅あんしん",
              valBtn: "housing_anshin"
            },
            { textBtn: "ハウスプラン", valBtn: "house_plan" },
            { textBtn: "供託", valBtn: "deposit" },
            {
              textBtn: "ハウスジーメンス",
              valBtn: "house_siemens"
            },
            { textBtn: "まもりすまい", valBtn: "climate" },
            { textBtn: "未定", valBtn: "to_be_determined" }
          ],
          isRequire: true
        },
        building_confirmation_application_organization: {
          isVali: 0,
          arrBtn: [
            { textBtn: "日本ERI", valBtn: "japan_ERI" },
            { textBtn: "UDI", valBtn: "UDI" },
            { textBtn: "供託", valBtn: "to_be_determined" }
          ],
          isRequire: true
        },
        building_structure: {
          isVali: 0,
          arrBtn: [
            { textBtn: "木造", valBtn: "wooden" },
            { textBtn: "鉄骨造", valBtn: "steel_frame" },
            { textBtn: "RC造", valBtn: "RC_construction" },
            {
              textBtn: "鉄骨木造混構造",
              valBtn: "wooden_structure"
            },
            {
              textBtn: "RC木造混構造",
              valBtn: "RC_composite"
            }
          ],
          isRequire: false
        },
        building_floor_number: {
          isVali: 0,
          arrBtn: [
            { textBtn: "平屋建 ", valBtn: "hirafaki" },
            { textBtn: "２階建 ", valBtn: "2_stories" },
            { textBtn: "３階建", valBtn: "3_stories" }
          ],
          isRequire: false
        },
        total_floor_area: {
          isVali: 0,
          isRequire: false
        },
        design_ground_pressure: {
          isVali: 0,
          isRequire: false
        },
        building_division: {
          isVali: 0,
          arrBtn: [
            { textBtn: "新築 ", valBtn: "new" },
            { textBtn: "建替え ", valBtn: "rebuild" }
          ],
          isRequire: false
        },
        usage_classification: {
          isVali: 0,
          arrBtn: [
            {
              textBtn: "居住専用",
              valBtn: "residential_only"
            },
            {
              textBtn: "店舗併用 ",
              valBtn: "store_combination"
            },
            { textBtn: "集合住宅", valBtn: "housing_complex" }
          ],
          isRequire: false
        },
        building_drawing_set: {
          isVali: 0,
          isRequire: false
        },
        site_photo: {
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
    data.collateral_liability_insurance_corporation.isVali = dataDetail.collateral_liability_insurance_corporation
      ? 1
      : 0;
    data.building_confirmation_application_organization.isVali = dataDetail.building_confirmation_application_organization
      ? 1
      : 0;
    data.building_structure.isVali = dataDetail.building_structure ? 1 : 0;
    data.building_floor_number.isVali = dataDetail.building_floor_number
      ? 1
      : 0;
    data.total_floor_area.isVali = dataDetail.total_floor_area ? 1 : 0;
    data.design_ground_pressure.isVali = dataDetail.design_ground_pressure
      ? 1
      : 0;
    data.building_division.isVali = dataDetail.building_division ? 1 : 0;
    data.usage_classification.isVali = dataDetail.usage_classification ? 1 : 0;

    data.building_drawing_set.isVali = dataDetail.building_drawing_set ? 1 : 0;
    data.site_photo.isVali = dataDetail.site_photo ? 1 : 0;
    data.construction_quotation.isVali = dataDetail.construction_quotation
      ? 1
      : 0;
    data.construction_examination_book.isVali = dataDetail.construction_examination_book
      ? 1
      : 0;
    data.construction_report.isVali = dataDetail.construction_report ? 1 : 0;
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

  // handle change slider Pressure
  handleSliderPressureChange = (event, newValue) => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    data.design_ground_pressure.isVali = 1;

    if (handleUpdate) {
      handleUpdate("design_ground_pressure", newValue);
    }
    this.setState({ data }, () => this.validationAllAcoordion());
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
        nameAcoor: "acoordion4",
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
  // upload file
  handleChangeFile = name => file => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    data[name].isVali = 1;

    this.setState({ data }, () => this.validationAllAcoordion());
    if (handleUpdate) {
      handleUpdate(name, file);
    }
  };
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
  };
  toggleExpand = (event, expanded) => {
    this.setState({
      expanded: expanded
    });
  };

  render = () => {
    const { classes, dataDetail, permission } = this.props;
    const { data, expanded } = this.state;
// console.log(dataDetail)
    // event change role companyWarranty
    // let renderBtnCompanyWarranty = this.renderStringModeRead(
    //   "collateral_liability_insurance_corporation",
    //   dataDetail.collateral_liability_insurance_corporation
    // );

    // data updaload file
    // 1
    let nameBuildingDrawing = this.convertNameFile(
      "建物図面一式",
      "building_drawing_set"
    );
    // 2
    let nameSitePhoto = this.convertNameFile("現場写真", "site_photo");
    // 3
    let nameConstructionQuotation = this.convertNameFile(
      "工事見積書",
      "construction_quotation"
    );
    // 4
    let nameConstructionExaminationBook = this.convertNameFile(
      "工事検討書",
      "construction_examination_book"
    );
    // 5
    let nameConstructionReport = this.convertNameFile(
      "工事報告書",
      "construction_report"
    );
    // end data upload file

    let renderBtnCompanyWarranty = data.collateral_liability_insurance_corporation.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.collateral_liability_insurance_corporation === item.valBtn
            ? true
            : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.collateral_liability_insurance_corporation}
            onClick={() =>
              this.handleChangeRoleBtn(
                "collateral_liability_insurance_corporation",
                item.valBtn
              )
            }
            className={`${classes.btnRole}  ${
              isSelect ? classes.activeRole : ""
            }`}
          >
            {item.textBtn}
          </Button>
        );
      }
    );

    // event change role renderBtnBuildApplication
    // let renderBtnBuildApplication = this.renderStringModeRead(
    //   "building_confirmation_application_organization",
    //   dataDetail.building_confirmation_application_organization
    // );
    let renderBtnBuildApplication = data.building_confirmation_application_organization.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.building_confirmation_application_organization ===
          item.valBtn
            ? true
            : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.building_confirmation_application_organization}
            onClick={() =>
              this.handleChangeRoleBtn(
                "building_confirmation_application_organization",
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

    // event change role renderBtnBuildingStructure
    // let renderBtnBuildingStructure = this.renderStringModeRead(
    //   "building_structure",
    //   dataDetail.building_structure
    // );
    let renderBtnBuildingStructure = data.building_structure.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.building_structure === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.building_structure}
            onClick={() =>
              this.handleChangeRoleBtn("building_structure", item.valBtn)
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

    // event change role building_floor_number
    // let renderBtnBuildingFloor = this.renderStringModeRead(
    //   "building_floor_number",
    //   dataDetail.building_floor_number
    // );
    let renderBtnBuildingFloor = data.building_floor_number.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.building_floor_number === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.building_floor_number}
            onClick={() =>
              this.handleChangeRoleBtn("building_floor_number", item.valBtn)
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

    // event change role groundPressure
    const valuePressure =
      dataDetail.design_ground_pressure &&
      typeof parseInt(dataDetail.design_ground_pressure) === "number"
        ? parseInt(dataDetail.design_ground_pressure)
        : 20;

    // event change role renderBtnBuildingClass
    // let renderBtnBuildingClass = this.renderStringModeRead(
    //   "building_division",
    //   dataDetail.building_division
    // );
    let renderBtnBuildingClass = data.building_division.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.building_division === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.building_division}
            onClick={() =>
              this.handleChangeRoleBtn("building_division", item.valBtn)
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

    // event change role renderBtnApplicationClass
    // let renderBtnApplicationClass = this.renderStringModeRead(
    //   "usage_classification",
    //   dataDetail.usage_classification
    // );
    let renderBtnApplicationClass = data.usage_classification.arrBtn.map(
      (item, index) => {
        let isSelect =
          dataDetail.usage_classification === item.valBtn ? true : false;
        return (
          <Button
            key={index}
            disabled={permission !== "R" ? false : true}
            variant="outlined"
            value={dataDetail.usage_classification}
            onClick={() =>
              this.handleChangeRoleBtn("usage_classification", item.valBtn)
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
    let openExpan = this.findValitionAcoordion("acoordion3");
    return (
      <React.Fragment>
        {/* acoordion 1 */}
        <ExpansionPanel
          disabled={!openExpan}
          className={classes.acoordion}
          style={{ marginTop: 0 }}
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
              4. 建物概要
            </Typography>
            <Typography className={classes.headingAcoordionRight}>
              {this.findValitionAcoordion("acoordion4") ? (
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
              <label
                htmlFor="瑕疵担保責任"
                style={{
                  width: "40%",
                  lineHeight: "20px",
                  marginLeft: "-20%",
                  color: "#AA041B"
                }}
              >
                瑕疵担保責任:
                <br />
                保険法人
              </label>
              <div className={classes.rowBtnRole}>
                {renderBtnCompanyWarranty}
                <TextFieldSjsAcoor
                  permission={permission}
                  placeholder="その他"
                  customStyleRoot={classes.textFieldDefault}
                  isVali={
                    data.collateral_liability_insurance_corporation.isVali
                  }
                  handleUpdate={this.handleUpdateOther(
                    "collateral_liability_insurance_corporation"
                  )}
                  value={
                    this.isValueOfButton(
                      "collateral_liability_insurance_corporation",
                      dataDetail.collateral_liability_insurance_corporation
                    )
                      ? ""
                      : dataDetail.collateral_liability_insurance_corporation
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
              <label
                htmlFor="建築確認申請機関:"
                style={{ lineHeight: "20px", color: "#AA041B" }}
              >
                建築確認申請機関:
              </label>
              <div className={classes.rowBtnRole}>
                {renderBtnBuildApplication}
                <TextFieldSjsAcoor
                  placeholder="その他"
                  customStyleRoot={classes.textFieldDefault}
                  isVali={
                    data.building_confirmation_application_organization.isVali
                  }
                  handleUpdate={this.handleUpdateOther(
                    "building_confirmation_application_organization"
                  )}
                  value={
                    this.isValueOfButton(
                      "building_confirmation_application_organization",
                      dataDetail.building_confirmation_application_organization
                    )
                      ? ""
                      : dataDetail.building_confirmation_application_organization
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
              <label htmlFor="建物構造:">建物構造:</label>
              <div className={classes.rowBtnRole}>
                {renderBtnBuildingStructure}
                <TextFieldSjsAcoor
                  permission={permission}
                  placeholder="その他"
                  customStyleRoot={classes.textFieldDefault}
                  required={data.building_structure.isRequire}
                  isVali={data.building_structure.isVali}
                  handleUpdate={this.handleUpdateOther("building_structure")}
                  value={
                    this.isValueOfButton(
                      "building_structure",
                      dataDetail.building_structure
                    )
                      ? ""
                      : dataDetail.building_structure
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
              <label htmlFor="建物階数:">建物階数:</label>
              <div className={classes.rowBtnRole}>{renderBtnBuildingFloor}</div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={classes.formGroup}>
              <label htmlFor="延床面積:">延床面積:</label>
              <TextFieldSjsAcoor
                permission={permission} // quyền hạn
                placeholder="延床面積"
                required={data.total_floor_area.isRequire}
                isNumber={true}
                customStyleRoot={classes.rowInputFormInline40}
                isVali={data.total_floor_area.isVali}
                handleUpdate={this.handleUpdate("total_floor_area")}
                value={dataDetail.total_floor_area}
              />
              <label className={classes.labEndRow}>m2</label>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label htmlFor="設計接地圧:">設計接地圧:</label>
              <div
                className={`${classes.rowBtnRole} ${
                  permission === "R" ? classes.disSlider : ""
                }`}
                style={{ width: "55%", marginLeft: 10 }}
              >
                <PrettoSlider
                  // disabled={permission !== "R" ? false : true}
                  valueLabelDisplay="auto"
                  aria-label="Pretto slider"
                  defaultValue={valuePressure}
                  min={20}
                  max={50}
                  onChangeCommitted={this.handleSliderPressureChange}
                />
              </div>
              <label
                className={classes.labEndRow}
                style={{ width: "25%", paddingLeft: 20 }}
              >
                {valuePressure} kN/m2
              </label>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={`${classes.formGroup} ${classes.formGroupBtn}`}>
              <label htmlFor="郵便番号:">郵便番号:</label>
              <div className={classes.rowBtnRole}>
                {renderBtnBuildingClass}
                <TextFieldSjsAcoor
                  permission={permission}
                  placeholder="その他"
                  customStyleRoot={classes.textFieldDefault}
                  isVali={data.building_division.isVali}
                  handleUpdate={this.handleUpdateOther("building_division")}
                  value={
                    this.isValueOfButton(
                      "building_division",
                      dataDetail.building_division
                    )
                      ? ""
                      : dataDetail.building_division
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
              <label htmlFor="都道府県:">都道府県:</label>
              <div className={classes.rowBtnRole}>
                {renderBtnApplicationClass}
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
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
        {/* end acoordion 1 */}
      </React.Fragment>
    );
  };
}

Acoordion4.propTypes = {
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
  withRoot(withStyles(styles)(Acoordion4))
);
