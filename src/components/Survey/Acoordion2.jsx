import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
// redux action
import { updateValidation } from "actions/surveyActions.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
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
import AutoComplete from "components/AutoCompleted/AutoComplete.jsx";
// constant
import { apiRoot } from "constant/index.js";
// jss
import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  // acoordion
  acoordion: {
    margin: "10px 0"
  },
  acoorDisabled: {
    
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
  rowInputForm: {
    margin: "0 0",
    minWidth: "80%"
  },
  textAreaForm: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 6,
    margin: 0,
    "& fieldset": {
      borderColor: theme.palette.secondary.main
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
    "& $lineForm": {
      // display: "none"
    }
  }
});
class Acoordion2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      isLoadingSearchCompany: false,
      listCompany: [],
      data: {
        c_business_name: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          isRequire: true
        },
        c_contact_name: {
          isVali: 0,
          isRequire: true
        },
        c_email: {
          isVali: 0,
          isRequire: false
        },
        c_contacts_etc: {
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
    data.c_business_name.isVali = dataDetail.c_business_name ? 1 : 0;
    data.c_contact_name.isVali = dataDetail.c_contact_name ? 1 : 0;
    data.c_email.isVali = dataDetail.c_email ? 1 : 0;
    data.c_contacts_etc.isVali = dataDetail.c_contacts_etc ? 1 : 0;
    this.setState({ data: data }, () => this.validationAllAcoordion());
  };

  handleChangevalueInputDownshift = value => {
    const { handleUpdate } = this.props;
    handleUpdate("c_business_name", value);
    this.searchCompany(value);
  };

  handleBlurInputDownshift = (itemSelect, error) => {
    const { data } = this.state;
    const { handleUpdate } = this.props;
    let company;
    if (itemSelect && handleUpdate) {
      data.c_business_name.isVali = 1;
      company = itemSelect.label;
    } else {
      company = null;
      data.c_business_name.isVali = error ? -1 : 1;
    }
    this.setState({ data }, () => this.validationAllAcoordion());
    handleUpdate("c_business_name", company);
  };

  handleChangeCompany = company => {
    const { data } = this.state;
    const { handleUpdate } = this.props;
    if (company && handleUpdate) {
      data.c_business_name.isVali = 1;
      data.c_contact_name.isVali = company.contactName ? 1 : 0;
      data.c_email.isVali = company.representativeEmail ? 1 : 0;
      data.c_contacts_etc.isVali = company.contactInformation ? 1 : 0;
      this.setState({ data }, () => this.validationAllAcoordion());
      handleUpdate("c_business_name", company ? company.label : "");
      handleUpdate("c_contact_name", company ? company.contactName : "");
      handleUpdate("c_email", company ? company.representativeEmail : "");
      handleUpdate("c_contacts_etc", company ? company.contactInformation : "");
      handleUpdate("c_company_id", company ? company.value : "");
      return;
    }
    data.c_business_name.isVali = -1;
    this.setState({ data }, () => this.validationAllAcoordion());
  };

  searchCompany = async keySearch => {
    this.setState({ isLoadingSearchCompany: true });
    // call api search company
    const res = await axios.get(`${apiRoot}/company/search/${keySearch}`, {
      params: {
        limit: 5
      }
    });

    if (res.status !== 200) {
      return;
    }
    let result = res.data.map(item => ({
      value: item.id,
      label: item.name,
      contactName: item.contactName,
      representativeEmail: item.representativeEmail,
      contactInformation: item.contactInformation
    }));
    this.setState({ listCompany: result, isLoadingSearchCompany: false });
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
        nameAcoor: "acoordion2",
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
  toggleExpand = (event, expanded) => {
    this.setState({
      expanded: expanded
    });
  };

  render = () => {
    const { classes, dataDetail, permission } = this.props;
    const { data, expanded } = this.state;
    let openExpan = this.findValitionAcoordion("acoordion1");
    return (
      <React.Fragment>
        {/* acoordion 1 */}
        <ExpansionPanel
          disabled={!openExpan}
          className={classes.acoordion}
          style={{ marginTop: 0 }}
          expanded={expanded}
          onChange={this.toggleExpand}
          classes={{
            disabled: classes.acoorDisabled
          }}
        >
          <ExpansionPanelSummary
            classes={{
              root: classes.expansionPanelSummary,
              content: classes.expansionContent
            }}
          >
            <Typography className={classes.headingAcoordion}>
              {expanded? (
                <img src={ExpandOpenIcon} />
              ) : (
                <img src={ExpandCloseIcon} />
              )}
              2. 地盤品質証明事業者
            </Typography>
            <Typography className={classes.headingAcoordionRight}>
              {this.findValitionAcoordion("acoordion2") ? (
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
            <div className={classes.formGroup}>
              <label htmlFor="事業者名:" style={{ color: "#AA041B" }}>
                事業者名:
              </label>
              <AutoComplete
                permission={permission}
                loadding={this.state.isLoadingSearchCompany}
                listData={this.state.listCompany}
                placeholder={"会社名"}
                messError="必ず入力してください。"
                isRequired={true}
                value={dataDetail.c_business_name}
                onChangeInput={this.handleChangevalueInputDownshift}
                onChangeItem={this.handleChangeCompany}
                onBlurInput={this.handleBlurInputDownshift}
              />
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={classes.formGroup}>
              <label htmlFor="担当者名:" style={{ color: "#AA041B" }}>
                担当者名:
              </label>
              <TextFieldSjsAcoor
                permission={permission} // quyền hạn
                required={true}
                customStyleRoot={classes.rowInputForm}
                isVali={data.c_contact_name.isVali}
                handleUpdate={this.handleUpdate("c_contact_name")}
                value={dataDetail.c_contact_name}
              />
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={classes.formGroup}>
              <label htmlFor="eMail：">eMail：</label>
              <TextFieldSjsAcoor
                permission={permission} // quyền hạn
                required={data.c_email.isRequire}
                isEmail={true}
                customStyleRoot={classes.rowInputForm}
                isVali={data.c_email.isVali}
                handleUpdate={this.handleUpdate("c_email")}
                value={dataDetail.c_email}
              />
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={classes.formGroup}>
              <label htmlFor="連絡先など:">連絡先など:</label>
              <TextFieldSjsAcoor
                permission={permission} // quyền hạn
                multiline={true}
                rows={2}
                rowsMax={2}
                required={data.c_contacts_etc.isRequire}
                placeholder="共通アカウントをご利用の方は担当者名、連絡先携帯番号をご記入ください"
                customStyleRoot={classes.textAreaForm}
                isVali={data.c_contacts_etc.isVali}
                handleUpdate={this.handleUpdate("c_contacts_etc")}
                value={dataDetail.c_contacts_etc}
              />
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

Acoordion2.propTypes = {
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
  withRoot(withStyles(styles)(Acoordion2))
);
