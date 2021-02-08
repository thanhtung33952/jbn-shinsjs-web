import React from "react";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";
// api
import { apiRoot } from "constant/index.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

// icon img
import IconNav from "assets/img/iconlistback.png";
import MenuActiveIcon from "assets/img/iconMenuActive.png";
import MenuDefaultIcon from "assets/img/iconMenuDefault.png";
// layout
import Master3Col from "layout/Master3Col.jsx";
// component project
import Notification from "components/Notification/Notification.jsx";
import KnownledBase from "components/KnownledBase/KnownledBase.jsx";
import CompanySetting1 from "components/CompanySetting/CompanySetting1.jsx";
import CompanySetting2 from "components/CompanySetting/CompanySetting2.jsx";
import CompanySetting3 from "components/CompanySetting/CompanySetting3.jsx";
// jss
import styles from "assets/jss/views/styleCompanySetting.jsx";

// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;
class CompanySettingPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      companyId: null, // 0 === null
      dataPage1: {
        isNew: true,
        errSubmit: false,
        fcFranchiseStore: "FC_franchise_store",
        contentOfTrans: "request_survey",
        companyForm: "independent",
        headOfficeName: "",
        companyDisplayName: "",
        companyFormalName: "",
        phonetic: "",
        postalCode: "",
        province: "",
        city: "",
        streetAddress: "",
        buildingName: "",
        phoneNumber: "",
        faxNumber: "",
        representativeEmail: "",
        website: "",
        representativeName: "",
        capital: "",
        establishmentDate: today,
        employeesNo: ""
      },
      dataPage2: {
        isNew: true,
        errSubmit: false,
        creditStatus: "accepting",
        billingMethod: "normal_format",
        outputUnit: "bulk",
        creditLimit: "",
        authConfirmScreen: "",
        authReceiptDoc: "",
        invoiceMailingAddress: {
          postalCode: "",
          province: "",
          city: "",
          streetAddress: "",
          buildingName: ""
        },
        personNameInCharge: "",
        payer: "",
        closingClassificationDate: today,
        estimatedRecoveryDate: today,
        businessClassificationDate: today,
        bankAccount: {
          bankName: "",
          bankCode: "",
          branchName: "",
          branchCode: "",
          accountClassification: "usually",
          accountNumber: "",
          accountHolder: ""
        }
      },
      dataPage3: {
        isNew: true,
        errSubmit: false,
        designated_survey_company_1: null,
        designated_survey_company_2: null,
        designated_survey_company_3: null,
        designated_survey_company_4: null,
        designated_survey_company_5: null,
        designated_survey_company_name_1: "",
        designated_survey_company_name_2: "",
        designated_survey_company_name_3: "",
        designated_survey_company_name_4: "",
        designated_survey_company_name_5: ""
      },
      statusSubmit1: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      },
      statusSubmit2: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      },
      statusSubmit3: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      }
    };
  }
  componentDidMount = () => {
    document.title = "企業情報";
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    if (userInfo && userInfo.companyId) {
      this.setState({ companyId: userInfo.companyId });
      this.getDataPage1(userInfo.companyId);
      this.getDataPage2And3(userInfo.companyId);
    }
  };
  getDataPage1 = async companyID => {
    if (!companyID) {
      return;
    }
    try {
      const res = await axios.get(`${apiRoot}/company/${companyID}`);
      if (res.status !== 200 || !res.data) {
        // trường hợp này có khi api call lỗi
        this.setState({ dataPage1: -1 });
        return;
      }
      // console.log(res)
      const { dataPage1 } = this.state;
      let result = res.data;
      dataPage1.isNew = false;
      dataPage1.errSubmit = false;
      dataPage1.establishmentDate = !result.establishmentDate
        ? today
        : result.establishmentDate;
      dataPage1.fcFranchiseStore = result.fcFranchiseStore;
      dataPage1.contentOfTrans = result.contentOfTrans;
      dataPage1.headOfficeName =
        result.companyForm &&
        result.companyForm !== "independent" &&
        result.companyForm !== "branch_office"
          ? result.companyForm
          : "";
      dataPage1.companyForm = result.companyForm;
      dataPage1.companyDisplayName = result.companyDisplayName;
      dataPage1.companyFormalName = result.companyFormalName;
      dataPage1.phonetic = result.phonetic;
      dataPage1.postalCode = result.postalCode;
      dataPage1.province = result.province;
      dataPage1.city = result.city;
      dataPage1.streetAddress = result.streetAddress;
      dataPage1.buildingName = result.buildingName;
      dataPage1.phoneNumber = result.phoneNumber;
      dataPage1.faxNumber = result.faxNumber;
      dataPage1.representativeEmail = result.representativeEmail;
      dataPage1.website = result.website;
      dataPage1.representativeName = result.representativeName;
      dataPage1.capital = result.capital;
      dataPage1.establishmentDate = result.establishmentDate;
      dataPage1.employeesNo = result.employeesNo;
      
      this.setState({ dataPage1 });
      return;
    } catch (error) {
      return;
    }
  };
  // chưa sài tới hàm này
  getDataPage2And3 = async companyID => {
    const { dataPage2, dataPage3 } = this.state;
    if (!companyID) {
      return;
    }
    try {
      const res = await axios.get(`${apiRoot}/companysetting/${companyID}`);
      console.log(res.data);
      if (res.status !== 200 || !res.data) {
        return;
      }
      if (!res.data.companyId) {
        // start mode add new
        dataPage2.isNew = true;
        dataPage2.errSubmit = false;
        this.setState({ dataPage2 });
        return;
      }
      let result = res.data;
      dataPage2.isNew = false;
      dataPage2.errSubmit = false;

      dataPage2.creditStatus = result.creditStatus;
      dataPage2.billingMethod = result.billingMethod;
      dataPage2.outputUnit = result.outputUnit;
      dataPage2.creditLimit = result.creditLimit;
      dataPage2.authConfirmScreen = result.authConfirmScreen;
      dataPage2.authReceiptDoc = result.authReceiptDoc;
      // parent - child invoiceMailingAddress
      dataPage2.invoiceMailingAddress.postalCode =
        result.invoiceMailingAddress.postalCode;
      dataPage2.invoiceMailingAddress.province =
        result.invoiceMailingAddress.province;
      dataPage2.invoiceMailingAddress.city = result.invoiceMailingAddress.city;
      dataPage2.invoiceMailingAddress.streetAddress =
        result.invoiceMailingAddress.streetAddress;
      dataPage2.invoiceMailingAddress.buildingName =
        result.invoiceMailingAddress.buildingName;
      // end address parent child
      dataPage2.personNameInCharge = result.personNameInCharge;
      dataPage2.payer = result.payer;

      dataPage2.closingClassificationDate = result.closingClassificationDate
        ? result.closingClassificationDate
        : today;
      dataPage2.estimatedRecoveryDate = result.estimatedRecoveryDate
        ? result.estimatedRecoveryDate
        : today;
      dataPage2.businessClassificationDate = result.businessClassificationDate
        ? result.businessClassificationDate
        : today;
      // parent - child bankAccount
      dataPage2.bankAccount.bankName = result.bankAccount.bankName
        ? result.bankAccount.bankName
        : "";
      dataPage2.bankAccount.bankCode = result.bankAccount.bankCode
        ? result.bankAccount.bankCode
        : "";
      dataPage2.bankAccount.branchName = result.bankAccount.branchName
        ? result.bankAccount.branchName
        : "";
      dataPage2.bankAccount.branchCode = result.bankAccount.branchCode
        ? result.bankAccount.branchCode
        : "";
      dataPage2.bankAccount.accountClassification = result.bankAccount
        .accountClassification
        ? result.bankAccount.accountClassification
        : "";
      dataPage2.bankAccount.accountNumber = result.bankAccount.accountNumber
        ? result.bankAccount.accountNumber
        : "";
      dataPage2.bankAccount.accountHolder = result.bankAccount.accountHolder
        ? result.bankAccount.accountHolder
        : "";

      // data page 3
      dataPage3.isNew = false;
      dataPage3.errSubmit = false;
      dataPage3.designated_survey_company_1 =
        result.designated_survey_company_1;
      dataPage3.designated_survey_company_2 =
        result.designated_survey_company_2;
      dataPage3.designated_survey_company_3 =
        result.designated_survey_company_3;
      dataPage3.designated_survey_company_4 =
        result.designated_survey_company_4;
      dataPage3.designated_survey_company_5 =
        result.designated_survey_company_5;
      dataPage3.designated_survey_company_name_1 =
        result.designated_survey_company_name_1;
      dataPage3.designated_survey_company_name_2 =
        result.designated_survey_company_name_2;
      dataPage3.designated_survey_company_name_3 =
        result.designated_survey_company_name_3;
      dataPage3.designated_survey_company_name_4 =
        result.designated_survey_company_name_4;
      dataPage3.designated_survey_company_name_5 =
        result.designated_survey_company_name_5;

      this.setState({ dataPage2, dataPage3 });
      return;
    } catch (error) {
      return;
    }
  };
  handleChangeStep = stepActive => {
    if ((stepActive === 2 || stepActive === 3) && !this.state.companyId) {
      return;
    }
    this.setState({ step: stepActive });
  };
  handleUpdateValue = (dataPage, level, name, value) => {
    const dataUpdate = this.state[dataPage];
    if (level) {
      dataUpdate[level][name] = value;
    } else {
      dataUpdate[name] = value;
    }
    this.setState({ [dataPage]: dataUpdate });
  };
  // handle upload images to server
  handleUploadFileServer = async (pageName, nameField) => {
    const dataPage = this.state[pageName];
    if (
      !dataPage[nameField] ||
      (dataPage[nameField] && !dataPage[nameField].name)
    ) {
      return true;
    }
    let dataFile = new FormData();
    // trường hợp file có file nào upload mới thì tiếp tục
    dataFile.append(`my_file[]`, dataPage[nameField]);
    // Upload img to server
    try {
      const res = await axios.post(`${apiRoot}/common/uploadfile`, dataFile);
      // console.log(res)
      // Failed
      if (res.status !== 200) {
        return false;
      }
      // Success
      let result = res.data;
      dataPage[nameField] = result.data[0];
      this.setState({ [pageName]: dataPage });
      return true;
    } catch (error) {
      return false;
    }
  };
  closeNotification1 = () => {
    const { statusSubmit1 } = this.state;
    statusSubmit1.open = false;
    statusSubmit1.isLoadding = false;
    statusSubmit1.isError = 0;
    statusSubmit1.message = "";
    this.setState({ statusSubmit1 });
  };
  closeNotification2 = () => {
    const { statusSubmit2 } = this.state;
    statusSubmit2.open = false;
    statusSubmit2.isLoadding = false;
    statusSubmit2.isError = 0;
    statusSubmit2.message = "";
    this.setState({ statusSubmit2 });
  };
  closeNotification3 = () => {
    const { statusSubmit3 } = this.state;
    statusSubmit3.open = false;
    statusSubmit3.isLoadding = false;
    statusSubmit3.isError = 0;
    statusSubmit3.message = "";
    this.setState({ statusSubmit3 });
  };
  isJson = data => {
    return data instanceof Object;
  };
  isValidationSave = pageName => {
    // page 3 khong can validation
    if (pageName === "dataPage3") {
      return true;
    }
    const dataCheck = this.state[pageName];
    let isSave = true;
    let arrCheckOut = [
      "isNew",
      "errSubmit",
      "authConfirmScreen",
      "authReceiptDoc",
      "headOfficeName"
    ];
    for (var key in dataCheck) {
      if (arrCheckOut.indexOf(key) === -1) {
        if (!dataCheck[key]) {
          isSave = false;
        } else if (this.isJson(dataCheck[key])) {
          for (var keySub in dataCheck[key]) {
            if (!dataCheck[key][keySub]) {
              isSave = false;
            }
          }
        }
      }
    }
    return isSave;
  };
  handleSavePage = dataPage => {
    const { cookies } = this.props;
    const { statusSubmit1, statusSubmit2, statusSubmit3 } = this.state;
    const userInfo = cookies.get("authUserShinSJS");
    const dataSave = this.state[dataPage];
    console.log(dataSave);
    let isValidation = this.isValidationSave(dataPage);
    if (!isValidation) {
      //validaion faild
      dataSave.errSubmit = true;
      this.setState({ [dataPage]: dataSave });
      // stop save
      return;
    } else {
      dataSave.errSubmit = false;
      this.setState({ [dataPage]: dataSave });
    }
    // save page 1
    if (dataPage === "dataPage1") {
      if (!userInfo) {
        return;
      }
      // set loadding
      statusSubmit1.isLoadding = true;
      this.setState({ statusSubmit1 });
      if (dataSave.isNew) {
        this.insertDataPage1(userInfo.userId);
      } else {
        this.updateDataPage1(userInfo.userId);
      }
    }
    // save page 2
    if (dataPage === "dataPage2") {
      // set loadding
      statusSubmit2.isLoadding = true;
      this.setState({ statusSubmit2 });
      if (dataSave.isNew) {
        this.insertDataPage2();
      } else {
        this.updateDataPage2();
      }
    }
    // save page 3
    if (dataPage === "dataPage3") {
      // set loadding
      statusSubmit3.isLoadding = true;
      this.setState({ statusSubmit3 });
      if (dataSave.isNew) {
        this.insertDataPage3();
      } else {
        this.updateDataPage3();
      }
    }
  };
  insertDataPage3 = async () => {
    const { dataPage3, statusSubmit3, companyId } = this.state;
    let dataInsert = {
      companyId: companyId,
      designated_survey_company_1: dataPage3.designated_survey_company_1,
      designated_survey_company_2: dataPage3.designated_survey_company_2,
      designated_survey_company_3: dataPage3.designated_survey_company_3,
      designated_survey_company_4: dataPage3.designated_survey_company_4,
      designated_survey_company_5: dataPage3.designated_survey_company_5
    };
    console.log(dataInsert);
    try {
      const res = await axios.post(`${apiRoot}/companysetting`, dataInsert);
      // console.log(result);
      if (res.status !== 200) {
        statusSubmit3.isLoadding = false;
        statusSubmit3.open = true;
        statusSubmit3.message = "Insert3 data error";
        statusSubmit3.status = -1;
        this.setState({ statusSubmit3 });
        return;
      }
      statusSubmit3.isLoadding = false;
      statusSubmit3.open = true;
      statusSubmit3.message = "Insert3 data success";
      statusSubmit3.status = 1;
      dataPage3.isNew = false;
      this.setState({ statusSubmit3, dataPage3 });
    } catch (error) {
      statusSubmit3.isLoadding = false;
      statusSubmit3.open = true;
      statusSubmit3.message = "Insert3 data error";
      statusSubmit3.status = -1;
      this.setState({ statusSubmit3 });
    }
  };
  updateDataPage3 = async () => {
    const { dataPage3, statusSubmit3, companyId } = this.state;
    let dataUpdate = {
      companyId: companyId,
      designated_survey_company_1: dataPage3.designated_survey_company_1,
      designated_survey_company_2: dataPage3.designated_survey_company_2,
      designated_survey_company_3: dataPage3.designated_survey_company_3,
      designated_survey_company_4: dataPage3.designated_survey_company_4,
      designated_survey_company_5: dataPage3.designated_survey_company_5
    };
    console.log(dataUpdate)
    try {
      const res = await axios.put(
        `${apiRoot}/companysetting/${companyId}`,
        dataUpdate
      );
      // console.log(result);
      if (res.status !== 200) {
        statusSubmit3.isLoadding = false;
        statusSubmit3.open = true;
        statusSubmit3.message = "Update data error";
        statusSubmit3.status = -1;
        this.setState({ statusSubmit3 });
        return;
      }
      statusSubmit3.isLoadding = false;
      statusSubmit3.open = true;
      statusSubmit3.message = "Update data success";
      statusSubmit3.status = 1;
      dataPage3.isNew = false;
      this.setState({ statusSubmit3, dataPage3 });
    } catch (error) {
      statusSubmit3.isLoadding = false;
      statusSubmit3.open = true;
      statusSubmit3.message = "Update data error";
      statusSubmit3.status = -1;
      this.setState({ statusSubmit3 });
    }
  };

  insertDataPage2 = async () => {
    const { dataPage2, statusSubmit2, companyId } = this.state;
    const isUploadFile = await this.handleUploadFileServer(
      "dataPage2",
      "authReceiptDoc"
    );
    if (!isUploadFile) {
      statusSubmit2.isLoadding = false;
      statusSubmit2.open = true;
      statusSubmit2.message = "Upload file error";
      statusSubmit2.status = -1;
      this.setState({ statusSubmit2 });
      return;
    }
    let dataInsert = {
      companyId: companyId,
      creditStatus: dataPage2.creditStatus,
      billingMethod: dataPage2.billingMethod,
      outputUnit: dataPage2.outputUnit,
      creditLimit: dataPage2.creditLimit,
      authConfirmScreen: dataPage2.authConfirmScreen,
      authReceiptDoc: dataPage2.authReceiptDoc,
      invoiceMailingAddress: {
        postalCode: dataPage2.invoiceMailingAddress.postalCode,
        province: dataPage2.invoiceMailingAddress.province,
        city: dataPage2.invoiceMailingAddress.city,
        streetAddress: dataPage2.invoiceMailingAddress.streetAddress,
        buildingName: dataPage2.invoiceMailingAddress.buildingName
      },
      personNameInCharge: dataPage2.personNameInCharge,
      payer: dataPage2.payer,
      closingClassificationDate: dataPage2.closingClassificationDate,
      estimatedRecoveryDate: dataPage2.estimatedRecoveryDate,
      businessClassificationDate: dataPage2.businessClassificationDate,
      bankAccount: {
        bankName: dataPage2.bankAccount.bankName,
        bankCode: dataPage2.bankAccount.bankCode,
        branchName: dataPage2.bankAccount.branchName,
        branchCode: dataPage2.bankAccount.branchCode,
        accountClassification: dataPage2.bankAccount.accountClassification,
        accountNumber: dataPage2.bankAccount.accountNumber,
        accountHolder: dataPage2.bankAccount.accountHolder
      }
    };
    try {
      const res = await axios.post(`${apiRoot}/companysetting`, dataInsert);
      // console.log(result);
      if (res.status !== 200) {
        statusSubmit2.isLoadding = false;
        statusSubmit2.open = true;
        statusSubmit2.message = "Insert2 data error";
        statusSubmit2.status = -1;
        this.setState({ statusSubmit2 });
        return;
      }
      statusSubmit2.isLoadding = false;
      statusSubmit2.open = true;
      statusSubmit2.message = "Insert2 data success";
      statusSubmit2.status = 1;
      dataPage2.isNew = false;
      this.setState({ statusSubmit2, dataPage2 });
    } catch (error) {
      statusSubmit2.isLoadding = false;
      statusSubmit2.open = true;
      statusSubmit2.message = "Insert2 data error";
      statusSubmit2.status = -1;
      this.setState({ statusSubmit2 });
    }
  };

  updateDataPage2 = async () => {
    const { dataPage2, statusSubmit2, companyId } = this.state;
    const isUploadFile = await this.handleUploadFileServer(
      "dataPage2",
      "authReceiptDoc"
    );
    if (!isUploadFile) {
      statusSubmit2.isLoadding = false;
      statusSubmit2.open = true;
      statusSubmit2.message = "Upload file error";
      statusSubmit2.status = -1;
      this.setState({ statusSubmit2 });
      return;
    }
    let dataUpdate = {
      companyId: companyId,
      creditStatus: dataPage2.creditStatus,
      billingMethod: dataPage2.billingMethod,
      outputUnit: dataPage2.outputUnit,
      creditLimit: dataPage2.creditLimit,
      authConfirmScreen: dataPage2.authConfirmScreen,
      authReceiptDoc: dataPage2.authReceiptDoc,
      invoiceMailingAddress: {
        postalCode: dataPage2.invoiceMailingAddress.postalCode,
        province: dataPage2.invoiceMailingAddress.province,
        city: dataPage2.invoiceMailingAddress.city,
        streetAddress: dataPage2.invoiceMailingAddress.streetAddress,
        buildingName: dataPage2.invoiceMailingAddress.buildingName
      },
      personNameInCharge: dataPage2.personNameInCharge,
      payer: dataPage2.payer,
      closingClassificationDate: dataPage2.closingClassificationDate,
      estimatedRecoveryDate: dataPage2.estimatedRecoveryDate,
      businessClassificationDate: dataPage2.businessClassificationDate,
      bankAccount: {
        bankName: dataPage2.bankAccount.bankName,
        bankCode: dataPage2.bankAccount.bankCode,
        branchName: dataPage2.bankAccount.branchName,
        branchCode: dataPage2.bankAccount.branchCode,
        accountClassification: dataPage2.bankAccount.accountClassification,
        accountNumber: dataPage2.bankAccount.accountNumber,
        accountHolder: dataPage2.bankAccount.accountHolder
      }
    };
    console.log(dataUpdate);
    try {
      const res = await axios.put(
        `${apiRoot}/companysetting/${companyId}`,
        dataUpdate
      );
      // console.log(result);
      if (res.status !== 200) {
        statusSubmit2.isLoadding = false;
        statusSubmit2.open = true;
        statusSubmit2.message = "UPdate data error";
        statusSubmit2.status = -1;
        this.setState({ statusSubmit2 });
        return;
      }
      statusSubmit2.isLoadding = false;
      statusSubmit2.open = true;
      statusSubmit2.message = "UPdate data success";
      statusSubmit2.status = 1;
      dataPage2.isNew = false;
      this.setState({ statusSubmit2, dataPage2 });
    } catch (error) {
      statusSubmit2.isLoadding = false;
      statusSubmit2.open = true;
      statusSubmit2.message = "UPdate data error";
      statusSubmit2.status = -1;
      this.setState({ statusSubmit2 });
    }
  };

  // function này không còn sử dụng, do page này không có addnew company step1
  insertDataPage1 = async userId => {
    if (!userId) {
      return;
    }
    const { dataPage1, statusSubmit1 } = this.state;

    const dataInsert = {
      fcFranchiseStore: dataPage1.fcFranchiseStore,
      contentOfTrans: dataPage1.contentOfTrans,
      companyForm: dataPage1.headOfficeName
        ? dataPage1.headOfficeName
        : dataPage1.companyForm,
      companyDisplayName: dataPage1.companyDisplayName,
      companyFormalName: dataPage1.companyFormalName,
      phonetic: dataPage1.phonetic,
      postalCode: dataPage1.postalCode,
      province: dataPage1.province,
      city: dataPage1.city,
      streetAddress: dataPage1.streetAddress,
      buildingName: dataPage1.buildingName,
      phoneNumber: dataPage1.phoneNumber,
      faxNumber: dataPage1.faxNumber,
      representativeEmail: dataPage1.representativeEmail,
      website: dataPage1.website,
      representativeName: dataPage1.representativeName,
      capital: dataPage1.capital,
      establishmentDate: dataPage1.establishmentDate,
      employeesNo: dataPage1.employeesNo,
      createUserTemp: "",
      createUser: userId
    };
    try {
      const res = await axios.post(`${apiRoot}/company`, dataInsert);
      if (res.status !== 200) {
        statusSubmit1.isLoadding = false;
        statusSubmit1.open = true;
        statusSubmit1.message = "Insert data error";
        statusSubmit1.status = -1;
        this.setState({ statusSubmit1 });
        return;
      }
      statusSubmit1.isLoadding = false;
      statusSubmit1.open = true;
      statusSubmit1.message = "Insert data success";
      statusSubmit1.status = 1;
      dataPage1.isNew = false;
      this.setState({
        companyId: res.data.id,
        statusSubmit1,
        dataPage1,
        step: 2
      });
    } catch (error) {
      statusSubmit1.isLoadding = false;
      statusSubmit1.open = true;
      statusSubmit1.message = "Insert data error";
      statusSubmit1.status = -1;
      this.setState({ statusSubmit1 });
    }
  };
  updateDataPage1 = async userId => {
    const { dataPage1, statusSubmit1, companyId } = this.state;
    if (!userId) {
      return;
    }
    if (!companyId) {
      statusSubmit1.isLoadding = false;
      statusSubmit1.open = true;
      statusSubmit1.message = "Company ID not found";
      statusSubmit1.status = -1;
      this.setState({ statusSubmit1 });
    }

    const dataUpdate = {
      fcFranchiseStore: dataPage1.fcFranchiseStore,
      contentOfTrans: dataPage1.contentOfTrans,
      companyForm: dataPage1.headOfficeName
        ? dataPage1.headOfficeName
        : dataPage1.companyForm,
      companyDisplayName: dataPage1.companyDisplayName,
      companyFormalName: dataPage1.companyFormalName,
      phonetic: dataPage1.phonetic,
      postalCode: dataPage1.postalCode,
      province: dataPage1.province,
      city: dataPage1.city,
      streetAddress: dataPage1.streetAddress,
      buildingName: dataPage1.buildingName,
      phoneNumber: dataPage1.phoneNumber,
      faxNumber: dataPage1.faxNumber,
      representativeEmail: dataPage1.representativeEmail,
      website: dataPage1.website,
      representativeName: dataPage1.representativeName,
      capital: dataPage1.capital,
      establishmentDate: dataPage1.establishmentDate,
      employeesNo: dataPage1.employeesNo,
      createUserTemp: "",
      createUser: userId
    };
    try {
      const res = await axios.put(
        `${apiRoot}/company/${this.state.companyId}`,
        dataUpdate
      );
      if (res.status !== 200 || res.data === false) {
        statusSubmit1.isLoadding = false;
        statusSubmit1.open = true;
        statusSubmit1.message = "Update data error";
        statusSubmit1.status = -1;
        this.setState({ statusSubmit1 });
        return;
      }

      // success
      statusSubmit1.isLoadding = false;
      statusSubmit1.open = true;
      statusSubmit1.message = "Update data success";
      statusSubmit1.status = 1;
      this.setState({ statusSubmit1 });
      return;
    } catch (error) {
      statusSubmit1.isLoadding = false;
      statusSubmit1.open = true;
      statusSubmit1.message = "Update data error";
      statusSubmit1.status = -1;
      this.setState({ statusSubmit1 });
    }
  };
  renderStep = step => {
    switch (step) {
      case 1:
        return (
          <CompanySetting1
            data={this.state.dataPage1}
            updateValue={this.handleUpdateValue}
            handleSave={this.handleSavePage}
            statusSubmit={this.state.statusSubmit1}
          />
        );
      case 2:
        return (
          <CompanySetting2
            data={this.state.dataPage2}
            updateValue={this.handleUpdateValue}
            handleSave={this.handleSavePage}
            statusSubmit={this.state.statusSubmit2}
          />
        );
      case 3:
        return (
          <CompanySetting3
            data={this.state.dataPage3}
            updateValue={this.handleUpdateValue}
            handleSave={this.handleSavePage}
            statusSubmit={this.state.statusSubmit3}
          />
        );
      default:
        return;
    }
  };
  render = () => {
    const { classes } = this.props;
    const {
      companyId,
      step,
      statusSubmit1,
      statusSubmit2,
      statusSubmit3
    } = this.state;
    const leftCol = (
      <React.Fragment>
        <Typography className={classes.titleStep}>
          <img
            className={classes.iconCheckStep}
            src={IconNav}
            alt="登録情報"
            style={{ marginTop: -7, marginRight: 5 }}
          />
          <span>登録情報</span>
        </Typography>
        <List className={classes.listItemRight}>
          <ListItem
            button
            className={`${classes.itemMenu} ${
              step === 1 ? classes.activeMenu : ""
            }`}
            onClick={() => this.handleChangeStep(1)}
          >
            <img src={MenuActiveIcon} alt="active" className={classes.active} />
            <img
              src={MenuDefaultIcon}
              alt="default"
              className={classes.default}
            />
            <ListItemText primary="登録情報" />
          </ListItem>
          <ListItem
            button
            className={`${classes.itemMenu} ${
              step === 2 ? classes.activeMenu : ""
            }`}
            onClick={() => this.handleChangeStep(2)}
          >
            <img src={MenuActiveIcon} alt="active" className={classes.active} />
            <img
              src={MenuDefaultIcon}
              alt="default"
              className={classes.default}
            />
            <ListItemText primary="取引条件" />
          </ListItem>
          <ListItem
            button
            className={`${classes.itemMenu} ${
              step === 3 ? classes.activeMenu : ""
            }`}
            onClick={() => this.handleChangeStep(3)}
          >
            <img src={MenuActiveIcon} alt="active" className={classes.active} />
            <img
              src={MenuDefaultIcon}
              alt="default"
              className={classes.default}
            />
            <ListItemText primary="指定調査会社" />
          </ListItem>
        </List>
      </React.Fragment>
    );

    return (
      <Master3Col
        colLeft={leftCol}
        colRight={<KnownledBase />}
        maxWidthPage="100%"
        titleHeader="企業情報"
        breadcrumb="トップ ＞ 取引先 ＞ 取引先の登録情報"
      >
        <Grid container spacing={0} style={{ height: "100%", paddingTop: 30 }}>
          <Grid item xs={9}>
            {this.renderStep(step)}
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        {/* Notification event */}
        {/* page 1 */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={statusSubmit1.open}
          autoHideDuration={6000}
          onClose={this.closeNotification1}
        >
          {statusSubmit1.open && (
            <Notification
              onClose={this.closeNotification1}
              variant={statusSubmit1.status === -1 ? "error" : "success"}
              message={statusSubmit1.message}
            />
          )}
        </Snackbar>
        {/* page 2 */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={statusSubmit2.open}
          autoHideDuration={6000}
          onClose={this.closeNotification2}
        >
          {statusSubmit2.open && (
            <Notification
              onClose={this.closeNotification2}
              variant={statusSubmit2.status === -1 ? "error" : "success"}
              message={statusSubmit2.message}
            />
          )}
        </Snackbar>
        {/* page 3 */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={statusSubmit3.open}
          autoHideDuration={6000}
          onClose={this.closeNotification3}
        >
          {statusSubmit3.open && (
            <Notification
              onClose={this.closeNotification3}
              variant={statusSubmit3.status === -1 ? "error" : "success"}
              message={statusSubmit3.message}
            />
          )}
        </Snackbar>
        {/* End Notification event */}
      </Master3Col>
    );
  };
}

CompanySettingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withCookies(withRoot(withStyles(styles)(CompanySettingPage)));
