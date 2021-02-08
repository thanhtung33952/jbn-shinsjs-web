import React from "react";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonSjs from "components/ButtonSjs/ButtonSjs.jsx";
import TextFieldSjs from "components/TextFieldSjs/TextFieldSjs.jsx";

import Snackbar from "@material-ui/core/Snackbar";

import Notification from "components/Notification/Notification.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
//component custom
import UploadFile from "components/UploadFile/UploadFile.jsx";
import AutoCompleteCompany from "components/AutoCompleted/AutoCompleteCompanySetting.jsx";
// api
import { apiRoot } from "constant/index.js";
// jss
import styles from "assets/jss/views/CompanySetting/styleCompanySetting3.jsx";

class CompanySetting3 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      listCompany: [],
      isLoadding1: false,
      isLoadding2: false,
      isLoadding3: false,
      isLoadding4: false,
      isLoadding5: false,
      companyName1: "",
      companyName2: "",
      companyName3: "",
      companyName4: "",
      companyName5: "",
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
      isOpen5: false
    };
  }
  componentDidMount = () => {
    const { data, cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    this.setState({
      companyName1: data.designated_survey_company_name_1
        ? data.designated_survey_company_name_1
        : "",
      companyName2: data.designated_survey_company_name_2
        ? data.designated_survey_company_name_2
        : "",
      companyName3: data.designated_survey_company_name_3
        ? data.designated_survey_company_name_3
        : "",
      companyName4: data.designated_survey_company_name_4
        ? data.designated_survey_company_name_4
        : "",
      companyName5: data.designated_survey_company_name_5
        ? data.designated_survey_company_name_5
        : ""
    });
  };
  handleChangevalueInputDownshift = nameField => value => {
    this.setState({ [nameField]: value });
  };

  handleBlurInputDownshift = nameField => (itemSelect, error) => {
    const { updateValue } = this.props;
    let company;
    if (itemSelect && updateValue) {
      company = itemSelect.value;
    } else {
      company = null;
    }
    updateValue("dataPage3", null, nameField, company);
  };

  handleChangeCompany = nameField => company => {
    const { updateValue } = this.props;
    updateValue("dataPage3", null, nameField, company ? company.value : "");
    // close downshift và set lại value đã select cho input
    switch (nameField) {
      case "designated_survey_company_1":
        this.setState({
          isOpen1: false,
          companyName1: company ? company.label : ""
        });
        break;
      case "designated_survey_company_2":
        this.setState({
          isOpen2: false,
          companyName2: company ? company.label : ""
        });
        break;
      case "designated_survey_company_3":
        this.setState({
          isOpen3: false,
          companyName3: company ? company.label : ""
        });
        break;
      case "designated_survey_company_4":
        this.setState({
          isOpen4: false,
          companyName4: company ? company.label : ""
        });
        break;
      case "designated_survey_company_5":
        this.setState({
          isOpen5: false,
          companyName5: company ? company.label : ""
        });
        break;
      default:
        break;
    }
  };

  handleSearchCompany = (nameField, isOpenDownShift) => {
    this.searchCompany(this.state[nameField], isOpenDownShift);
  };

  // close downshift và set lại value rỗng cho input
  handleCloseDownShift = nameField => () => {
    switch (nameField) {
      case "designated_survey_company_1":
        this.setState({ isOpen1: false, companyName1: "" });
        break;
      case "designated_survey_company_2":
        this.setState({ isOpen2: false, companyName2: "" });
        break;
      case "designated_survey_company_3":
        this.setState({ isOpen3: false, companyName3: "" });
        break;
      case "designated_survey_company_4":
        this.setState({ isOpen4: false, companyName4: "" });
        break;
      case "designated_survey_company_5":
        this.setState({ isOpen5: false, companyName5: "" });
        break;
      default:
        break;
    }
  };

  searchCompany = async (keySearch, isOpenDownShift) => {
    this.setState({ isLoadingSearchCompany: true });
    // set loadding cho input
    this.setLoaddingAutocomplete(isOpenDownShift, true);

    // call api search company
    const res = await axios.get(`${apiRoot}/company/search/${keySearch}`, {
      params: {
        limit: 5
      }
    });

    if (res.status !== 200) {
      this.setLoaddingAutocomplete(isOpenDownShift, false);
      this.setValueAutocomplete(isOpenDownShift, null);
      return;
    }
    if (res.data && res.data.length === 0) {
      this.setLoaddingAutocomplete(isOpenDownShift, false);
      this.setValueAutocomplete(isOpenDownShift, null);
      return;
    }
    let result = res.data.map(item => ({
      value: item.id,
      label: item.name,
      contactName: item.contactName,
      representativeEmail: item.representativeEmail,
      contactInformation: item.contactInformation
    }));
    this.setState({
      listCompany: result,
      [isOpenDownShift]: true
    });
    this.setLoaddingAutocomplete(isOpenDownShift, false);
  };
  setLoaddingAutocomplete = (name, status) => {
    // set loadding cho input
    switch (name) {
      case "isOpen1":
        this.setState({ isLoadding1: status });
        break;
      case "isOpen2":
        this.setState({ isLoadding2: status });
        break;
      case "isOpen3":
        this.setState({ isLoadding3: status });
        break;
      case "isOpen4":
        this.setState({ isLoadding4: status });
        break;
      case "isOpen5":
        this.setState({ isLoadding5: status });
        break;
      default:
        break;
    }
  };
  setValueAutocomplete = (name, value) => {
    // set loadding cho input
    switch (name) {
      case "isOpen1":
        this.setState({ companyName1: value });
        break;
      case "isOpen2":
        this.setState({ companyName2: value });
        break;
      case "isOpen3":
        this.setState({ companyName3: value });
        break;
      case "isOpen4":
        this.setState({ companyName4: value });
        break;
      case "isOpen5":
        this.setState({ companyName5: value });
        break;
      default:
        break;
    }
  };
  isValidation = (isError, nameField, value) => {
    const { updateValue } = this.props;
    let level = null;
    let dataCheckAddress = [
      "postalCode",
      "province",
      "city",
      "streetAddress",
      "buildingName",
      "latitude",
      "longitute"
    ];
    let dataCheckBankAccount = [
      "bankName",
      "bankCode",
      "branchName",
      "branchCode",
      "accountClassification",
      "accountNumber",
      "accountHolder"
    ];
    if (dataCheckAddress.indexOf(nameField) !== -1) {
      level = "invoiceMailingAddress";
    }
    if (dataCheckBankAccount.indexOf(nameField) !== -1) {
      level = "bankAccount";
    }
    if (updateValue) {
      updateValue("dataPage2", level, nameField, value);
    }
  };
  closeNoti = () => {
    const { closeNotification } = this.props;
    if (closeNotification) {
      closeNotification("statusSubmit3");
    }
  };
  handleSave = () => {
    const { handleSave } = this.props;
    if (handleSave) {
      handleSave("dataPage3");
    }
  };

  render = () => {
    const { classes, data, statusSubmit } = this.props;
    const {
      isLoadding1,
      isLoadding2,
      isLoadding3,
      isLoadding4,
      isLoadding5,
      companyName1,
      companyName2,
      companyName3,
      companyName4,
      companyName5
    } = this.state;
    // console.log(data);
    return (
      <div className={classes.blockStep}>
        <Typography variant="h4" className={classes.titleForm}>
          取引先の登録情報
        </Typography>
        <Typography className={classes.titleSubForm}>
          地盤調査を依頼する調査会社
        </Typography>
        {/* form company-setting step2 */}
        <div className={classes.formCompany}>
          <Typography className={classes.titleChildForm}>
            調査会社を指定する場合は、ここで登録してください。
          </Typography>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <div className={classes.formGroup}>
            <label htmlFor="地盤調査会社・１：">地盤調査会社・１：</label>
            <AutoCompleteCompany
              loadding={isLoadding1}
              listData={this.state.listCompany}
              zIndex={5}
              value={this.state.companyName1}
              isOpenDownShift={this.state.isOpen1}
              onChangeInput={this.handleChangevalueInputDownshift(
                "companyName1"
              )}
              onChangeItem={this.handleChangeCompany(
                "designated_survey_company_1"
              )}
              onBlurInput={this.handleBlurInputDownshift(
                "designated_survey_company_1"
              )}
              closeDownShift={this.handleCloseDownShift(
                "designated_survey_company_1"
              )}
            />
            <Button
              variant="outlined"
              value="normal_format"
              className={classes.btnSearchCom}
              disabled={!companyName1 ? true : false || isLoadding1}
              onClick={() =>
                this.handleSearchCompany("companyName1", "isOpen1")
              }
            >
              検索
            </Button>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="地盤調査会社・２：">地盤調査会社・２：</label>
            <AutoCompleteCompany
              loadding={isLoadding2}
              listData={this.state.listCompany}
              zIndex={4}
              value={this.state.companyName2}
              isOpenDownShift={this.state.isOpen2}
              onChangeInput={this.handleChangevalueInputDownshift(
                "companyName2"
              )}
              onChangeItem={this.handleChangeCompany(
                "designated_survey_company_2"
              )}
              onBlurInput={this.handleBlurInputDownshift(
                "designated_survey_company_2"
              )}
              closeDownShift={this.handleCloseDownShift(
                "designated_survey_company_2"
              )}
            />
            <Button
              variant="outlined"
              value="normal_format"
              className={classes.btnSearchCom}
              disabled={!companyName2 ? true : false || isLoadding2}
              onClick={() =>
                this.handleSearchCompany("companyName2", "isOpen2")
              }
            >
              検索
            </Button>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="地盤調査会社・３：">地盤調査会社・３：</label>
            <AutoCompleteCompany
              loadding={isLoadding3}
              listData={this.state.listCompany}
              zIndex={3}
              value={this.state.companyName3}
              isOpenDownShift={this.state.isOpen3}
              onChangeInput={this.handleChangevalueInputDownshift(
                "companyName3"
              )}
              onChangeItem={this.handleChangeCompany(
                "designated_survey_company_3"
              )}
              onBlurInput={this.handleBlurInputDownshift(
                "designated_survey_company_3"
              )}
              closeDownShift={this.handleCloseDownShift(
                "designated_survey_company_3"
              )}
            />
            <Button
              variant="outlined"
              value="normal_format"
              className={classes.btnSearchCom}
              disabled={!companyName3 ? true : false || isLoadding3}
              onClick={() =>
                this.handleSearchCompany("companyName3", "isOpen3")
              }
            >
              検索
            </Button>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="地盤調査会社・４： ">地盤調査会社・４： </label>
            <AutoCompleteCompany
              loadding={isLoadding4}
              listData={this.state.listCompany}
              zIndex={2}
              value={this.state.companyName4}
              isOpenDownShift={this.state.isOpen4}
              onChangeInput={this.handleChangevalueInputDownshift(
                "companyName4"
              )}
              onChangeItem={this.handleChangeCompany(
                "designated_survey_company_4"
              )}
              onBlurInput={this.handleBlurInputDownshift(
                "designated_survey_company_4"
              )}
              closeDownShift={this.handleCloseDownShift(
                "designated_survey_company_4"
              )}
            />
            <Button
              variant="outlined"
              value="normal_format"
              className={classes.btnSearchCom}
              disabled={!companyName4 ? true : false || isLoadding4}
              onClick={() =>
                this.handleSearchCompany("companyName4", "isOpen4")
              }
            >
              検索
            </Button>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="地盤調査会社・５： ">地盤調査会社・５： </label>
            <AutoCompleteCompany
              loadding={isLoadding5}
              listData={this.state.listCompany}
              zIndex={1}
              value={this.state.companyName5}
              isOpenDownShift={this.state.isOpen5}
              onChangeInput={this.handleChangevalueInputDownshift(
                "companyName5"
              )}
              onChangeItem={this.handleChangeCompany(
                "designated_survey_company_5"
              )}
              onBlurInput={this.handleBlurInputDownshift(
                "designated_survey_company_5"
              )}
              closeDownShift={this.handleCloseDownShift(
                "designated_survey_company_5"
              )}
            />
            <Button
              variant="outlined"
              value="normal_format"
              className={classes.btnSearchCom}
              disabled={!companyName5 ? true : false || isLoadding5}
              onClick={() =>
                this.handleSearchCompany("companyName5", "isOpen5")
              }
            >
              検索
            </Button>
          </div>
          {/* row btn save */}
          <div className={classes.formGroupButton}>
            <div className={classes.rowButtonSave}>
              <Button
                disabled={statusSubmit.isLoadding}
                type="button"
                variant="contained"
                color="primary"
                size="large"
                className={classes.btnSave}
                onClick={this.handleSave}
              >
                {/* 登録を更新する */} {/* tạm thời đổi text chỗ này cho bên /company sử dụng */}
                登録
              </Button>
              {statusSubmit.isLoadding && (
                <CircularProgress size={24} className={classes.iconProgress} />
              )}
            </div>
          </div>
          {/* End Notification event */}
        </div>
      </div>
    );
  };
}

CompanySetting3.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func,
  updateValue: PropTypes.func,
  closeNotification: PropTypes.func,
  handleSave: PropTypes.func,
  statusSubmit: PropTypes.object,
  data: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(CompanySetting3)));
