import React from "react";
import withRoot from "withRoot";
import axios from "axios";
import PropTypes, { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { connect } from "react-redux";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
// components project
import TextFieldCompany from "components/CompanyPage/TextFieldCompany.jsx";
import CompanySetting1 from "components/CompanySetting/CompanySetting1.jsx";
import CompanySetting2 from "components/CompanySetting/CompanySetting2.jsx";
import CompanySetting3 from "components/CompanySetting/CompanySetting3.jsx";
import Snackbar from "@material-ui/core/Snackbar";
import ButtonSjs from "components/ButtonSjs/ButtonSjs.jsx";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Notification from "components/Notification/Notification.jsx";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
// redux action
import { setInfoCompany } from "actions/companyActions.js";
// api
import { apiRoot } from "constant/index.js";
// jss
import styles from "assets/jss/views/Company/styleCompanyStep3.jsx";
// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;
class CompanyStep3 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoadding: false,
      isLoaddingAddress: false,
      statusSubmit: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      },
      isNew: true,
      errSubmit: false,
      data: {
        fcFranchiseStore: "FC_franchise_store",
        contentOfTrans: "request_survey",
        companyForm: "independent",
        headOfficeName: "",
        companyDisplayName: {
          isRequire: true,
          isError: false,
          value: ""
        },
        companyFormalName: {
          isRequire: true,
          isError: false,
          value: ""
        },
        phonetic: {
          isRequire: true,
          isError: false,
          value: ""
        },
        postalCode: {
          isRequire: true,
          isError: false,
          value: ""
        },
        province: {
          isRequire: true,
          isError: false,
          value: ""
        },
        city: {
          isRequire: true,
          isError: false,
          value: ""
        },
        streetAddress: {
          isRequire: true,
          isError: false,
          value: ""
        },
        buildingName: {
          isRequire: true,
          isError: false,
          value: ""
        },
        phoneNumber: {
          isRequire: true,
          isError: false,
          value: ""
        },
        faxNumber: {
          isRequire: true,
          isError: false,
          value: ""
        },
        representativeEmail: {
          isRequire: true,
          isError: false,
          value: ""
        },
        website: {
          isRequire: true,
          isError: false,
          value: ""
        },
        representativeName: {
          isRequire: true,
          isError: false,
          value: ""
        },
        capital: {
          isRequire: true,
          isError: false,
          value: ""
        },
        establishmentDate: today,
        employeesNo: {
          isRequire: true,
          isError: false,
          value: ""
        }
      },
      // data dành cho phần company-setting
      step: 0, // step setting company
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

  // check validation all
  isValidationSave = () => {
    const { data } = this.state;
    let isSave = true;
    let arrCheckOut = ["fcFranchiseStore", "contentOfTrans", "companyForm"];
    for (let x in data) {
      if (arrCheckOut.indexOf(x) === -1) {
        if (
          (data[`${x}`]["isRequire"] === true &&
            (data[`${x}`]["value"] === "" || !data[`${x}`]["value"])) ||
          data[`${x}`]["isError"] === true
        ) {
          data[`${x}`]["isError"] = true;
          isSave = false;
        }
      }
    }
    this.setState({ data });

    return isSave;
  };
  // change tab company setting
  handleChangeTab = (event, newValue) => {
    this.setState({ step: newValue });
  };
  handleNextStep = async () => {
    const { dispatch, companyProps } = this.props;
    const userTempInfo = companyProps.userTempInfo;
    const { statusSubmit, data } = this.state;
    let isValidation = await this.isValidationSave();
    if (!isValidation) return;
    // validation ok step 3
    this.setState(prevState => ({
      statusSubmit: {
        ...prevState.statusSubmit,
        isLoadding: true
      }
    }));
    const userTempId = userTempInfo.paramUserTempId || userTempInfo.userId;

    const dataInsert = {
      fcfcFranchiseStore: data.fcFranchiseStore,
      contentOfTrans: data.contentOfTrans,
      companyForm: data.headOfficeName ? data.headOfficeName : data.companyForm,
      companyDisplayName: data.companyDisplayName.value,
      companyFormalName: data.companyFormalName.value,
      phonetic: data.phonetic.value,
      postalCode: data.postalCode.value,
      province: data.province.value,
      city: data.city.value,
      streetAddress: data.streetAddress.value,
      buildingName: data.buildingName.value,
      phoneNumber: data.phoneNumber.value,
      faxNumber: data.faxNumber.value,
      representativeEmail: data.representativeEmail.value,
      website: data.website.value,
      representativeName: data.representativeName.value,
      capital: data.capital.value,
      establishmentDate: data.establishmentDate,
      employeesNo: data.employeesNo.value,
      createUserTemp: userTempId,
      createUser: userTempInfo.userID
    };
    // console.log(dataInsert)
    try {
      const res = await axios.post(`${apiRoot}/company`, dataInsert);
      if (res.status !== 200) {
        statusSubmit.isLoadding = false;
        statusSubmit.open = true;
        statusSubmit.message = "Insert data error";
        statusSubmit.status = -1;
        this.setState({ statusSubmit });
        return;
      }
      if (res.data.id) {
        statusSubmit.isLoadding = false;
        statusSubmit.open = true;
        statusSubmit.message = "Insert data success";
        statusSubmit.status = 1;
        this.setState({ statusSubmit });
        dispatch(
          setInfoCompany({
            companyId: res.data.id,
            companyName: res.data.companyDisplayName
          })
        );
        this.props.nextStep(3);
      }
    } catch (error) {
      statusSubmit.isLoadding = false;
      statusSubmit.open = true;
      statusSubmit.message = "Insert data error";
      statusSubmit.status = -1;
      this.setState({ statusSubmit });
    }
  };
  // get full address by zipcode
  handleRenderAddress = () => {
    const { data } = this.state;
    if (!data.postalCode.value) {
      return false;
    }
    fetch(`${apiRoot}/zipaddress/${data.postalCode.value}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.code === 200) {
            data.province["value"] = result.data.pref;
            data.city["value"] = result.data.city;
            data.streetAddress["value"] = result.data.address;
            data.buildingName["value"] = result.data.town;
            // update is validation success
            data.province["isError"] = false;
            data.city["isError"] = false;
            data.streetAddress["isError"] = false;
            data.buildingName["isError"] = false;
            this.setState({ data });
          }
        },
        () => {}
      );
  };
  isValidation = (isError, nameField, value) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [nameField]: {
          ...prevState.data[nameField],
          value: value,
          isError: isError
        }
      }
    }));
  };
  // change button
  handleChangeRoleBtn = (e, nameField) => {
    let value = e.currentTarget.value;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [nameField]: value
      }
    }));

    if (
      nameField === "companyForm" &&
      (value === "independent" || value === "branch_office")
    ) {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          headOfficeName: ""
        }
      }));
    }
  };
  // hander change date
  handleChangeDate = name => e => {
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let newDate = yy + "-" + mm + "-" + dd;

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: newDate
      }
    }));
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

  // PHẦN XỬ LÝ COMPANY STEP 3
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
  isValidationSaveCompanySetting = pageName => {
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
    // const { cookies } = this.props;
    const { companyProps } = this.props;
    const userTempInfo = companyProps.userTempInfo;
    const { statusSubmit1, statusSubmit2, statusSubmit3 } = this.state;
    const dataSave = this.state[dataPage];
    // console.log(dataSave);
    let isValidation = this.isValidationSaveCompanySetting(dataPage);
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
      if (!userTempInfo.userID) {
        return;
      }
      // set loadding
      statusSubmit1.isLoadding = true;
      this.setState({ statusSubmit1 });
      if (dataSave.isNew) {
        this.insertDataPage1(userTempInfo.userID);
      } else {
        this.updateDataPage1(userTempInfo.userID);
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
    console.log("inset3:", dataInsert);
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
    console.log("update3:", dataUpdate);
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
    console.log("inset2:", dataInsert);
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
      this.setState({ statusSubmit2, dataPage2, step: 2 });
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
    console.log("update2:", dataUpdate);
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
      fcfcFranchiseStore: dataPage1.fcFranchiseStore,
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
    console.log("inset1:", dataInsert);
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
        step: 1
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
    console.log("update1:", dataUpdate);
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

  // render step company setting
  renderStepComnpany = step => {
    switch (step) {
      case 0:
        return (
          <CompanySetting1
            data={this.state.dataPage1}
            updateValue={this.handleUpdateValue}
            handleSave={this.handleSavePage}
            statusSubmit={this.state.statusSubmit1}
          />
        );
      case 1:
        return (
          <CompanySetting2
            data={this.state.dataPage2}
            updateValue={this.handleUpdateValue}
            handleSave={this.handleSavePage}
            statusSubmit={this.state.statusSubmit2}
          />
        );
      case 2:
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
      statusSubmit,
      errSubmit,
      data,
      step,
      statusSubmit1,
      statusSubmit2,
      statusSubmit3
    } = this.state;
    // console.log(step);
    // console.log(data);
    return (
      <div className={classes.blockStep}>
        <Typography variant="h4" className={classes.titleForm}>
          取引先の新規登録
        </Typography>
        <Typography className={classes.titleSubForm}>
          取引先の基本情報
        </Typography>
        {/* form company step3 */}
        <div className={classes.formCompany}>
          <Typography className={classes.titleChildForm}>
            下記の欄、すべてにご記入ください。
            <br />
            登録を申請されたのち、メールで完了のお知らせを送ります。
          </Typography>
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="FC加盟店：" style={{ lineHeight: "38px" }}>
              FC加盟店：
            </label>
            <div className={classes.rowBtnRole}>
              <Button
                variant="outlined"
                value="FC_franchise_store"
                onClick={e => this.handleChangeRoleBtn(e, "fcFranchiseStore")}
                className={`${classes.btnRole} ${
                  data.fcFranchiseStore === "FC_franchise_store"
                    ? classes.activeRole
                    : ""
                }`}
              >
                FC加盟店
              </Button>
              <Button
                variant="outlined"
                value="Non_FC_store"
                onClick={e => this.handleChangeRoleBtn(e, "fcFranchiseStore")}
                className={`${classes.btnRole} ${
                  data.fcFranchiseStore === "Non_FC_store"
                    ? classes.activeRole
                    : ""
                }`}
              >
                非FC加盟店
              </Button>
            </div>
          </div>
          <Divider
            style={{ marginTop: 5 }}
            classes={{
              root: classes.lineForm
            }}
          />
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="取引の内容：" style={{ lineHeight: "24px" }}>
              取引の内容：
              <br />
              （複数選択可）
            </label>
            <div className={classes.rowBtnRole}>
              <Button
                variant="outlined"
                value="request_survey"
                onClick={e => this.handleChangeRoleBtn(e, "contentOfTrans")}
                className={`${classes.btnRole} ${
                  data.contentOfTrans === "request_survey"
                    ? classes.activeRole
                    : ""
                }`}
              >
                地盤の調査依頼
              </Button>
              <Button
                variant="outlined"
                value="warranty_request"
                onClick={e => this.handleChangeRoleBtn(e, "contentOfTrans")}
                className={`${classes.btnRole} ${
                  data.contentOfTrans === "warranty_request"
                    ? classes.activeRole
                    : ""
                }`}
              >
                地盤の補償依頼
              </Button>
              <Button
                variant="outlined"
                value="investigation_ground"
                onClick={e => this.handleChangeRoleBtn(e, "contentOfTrans")}
                className={`${classes.btnRole} ${
                  data.contentOfTrans === "investigation_ground"
                    ? classes.activeRole
                    : ""
                }`}
              >
                地盤の調査実施
              </Button>
              <Button
                variant="outlined"
                value="ground_improvement"
                onClick={e => this.handleChangeRoleBtn(e, "contentOfTrans")}
                className={`${classes.btnRole} ${
                  data.contentOfTrans === "ground_improvement"
                    ? classes.activeRole
                    : ""
                }`}
              >
                地盤の改良工事
              </Button>
              <Button
                variant="outlined"
                value="other"
                onClick={e => this.handleChangeRoleBtn(e, "contentOfTrans")}
                className={`${classes.btnRole} ${
                  data.contentOfTrans === "other" ? classes.activeRole : ""
                }`}
              >
                その他
              </Button>
            </div>
          </div>
          <Divider
            style={{ marginTop: 5 }}
            classes={{
              root: classes.lineForm
            }}
          />
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="会社の形態：">会社の形態：</label>
            <div className={classes.rowBtnRole}>
              <Button
                variant="outlined"
                value="independent"
                onClick={e => this.handleChangeRoleBtn(e, "companyForm")}
                className={`${classes.btnRole} ${
                  data.companyForm === "independent" ? classes.activeRole : ""
                }`}
              >
                独立会社
              </Button>
              <Button
                variant="outlined"
                value="group_headquarters"
                onClick={e => this.handleChangeRoleBtn(e, "companyForm")}
                className={`${classes.btnRole} ${
                  data.companyForm &&
                  data.companyForm !== "independent" &&
                  data.companyForm !== "branch_office"
                    ? classes.activeRole
                    : ""
                }`}
              >
                グループ会社の本社
              </Button>
              <Button
                variant="outlined"
                value="branch_office"
                onClick={e => this.handleChangeRoleBtn(e, "companyForm")}
                className={`${classes.btnRole} ${
                  data.companyForm === "branch_office" ? classes.activeRole : ""
                }`}
              >
                グループ会社の支社
              </Button>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="" />
            <div style={{ width: "40%", minWidth: "auto", textAlign: "left" }}>
              <TextFieldCompany
                placeholder="本社名"
                disabled={
                  data.companyForm &&
                  (data.companyForm === "independent" ||
                    data.companyForm === "branch_office")
                    ? true
                    : false
                }
                required={true}
                customStyleRoot={classes.rowInputForm100}
                isErrorProps={
                  !data.headOfficeName &&
                  data.companyForm === "group_headquarters" &&
                  errSubmit
                    ? true
                    : false
                }
                handelValidation={this.isValidation}
                nameField={"headOfficeName"}
                value={data.headOfficeName}
              />
            </div>
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              disabled={
                data.companyForm &&
                (data.companyForm === "independent" ||
                  data.companyForm === "branch_office")
                  ? true
                  : false
              }
              className={classes.btnSave}
              // onClick={this.handleRenderAddress}
            >
              本社を選択
            </Button>
          </div>
          <Divider
            style={{ marginTop: 5 }}
            classes={{
              root: classes.lineForm
            }}
          />
          <div className={classes.formGroup}>
            <label htmlFor="取引先の表示名：">
              取引先の表示名
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="例）地盤ネット"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.companyDisplayName.isError}
              handelValidation={this.isValidation}
              nameField={"companyDisplayName"}
              value={data.companyDisplayName.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label
              htmlFor="取引先の正式名称："
              style={{ lineHeight: "20px", marginTop: "12px" }}
            >
              取引先の正式名称
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="例）地盤ネット株式会社"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.companyFormalName.isError}
              handelValidation={this.isValidation}
              nameField={"companyFormalName"}
              value={data.companyFormalName.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="フリガナ：">
              フリガナ
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="フリガナ"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.phonetic.isError}
              handelValidation={this.isValidation}
              nameField={"phonetic"}
              value={data.phonetic.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="郵便番号：">
              郵便番号
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <div style={{ width: "40%", minWidth: "auto" }}>
              <TextFieldCompany
                placeholder="103-0027"
                required={true}
                customStyleRoot={classes.rowInputForm100}
                isErrorProps={data.postalCode.isError}
                handelValidation={this.isValidation}
                nameField={"postalCode"}
                value={data.postalCode.value}
              />
            </div>
            <ButtonSjs
              textButton="住所を表示"
              onClick={this.handleRenderAddress}
              isIconRow={false}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="都道府県：">
              都道府県
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="都道府県"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.province.isError}
              handelValidation={this.isValidation}
              nameField={"province"}
              value={data.province.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="市区郡：">
              市区郡
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="市区郡"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.city.isError}
              handelValidation={this.isValidation}
              nameField={"city"}
              value={data.city.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="地名番地：">
              地名番地
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="地名番地"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.streetAddress.isError}
              handelValidation={this.isValidation}
              nameField={"streetAddress"}
              value={data.streetAddress.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="ビル名：">
              ビル名
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="ビル名"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.buildingName.isError}
              handelValidation={this.isValidation}
              nameField={"buildingName"}
              value={data.buildingName.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="電話番号：">
              電話番号
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="例）03-123-4567"
              isPhone={true}
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.phoneNumber.isError}
              handelValidation={this.isValidation}
              nameField={"phoneNumber"}
              value={data.phoneNumber.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="FAX番号：">
              FAX番号
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="FAX番号"
              required={true}
              isNumber={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.faxNumber.isError}
              handelValidation={this.isValidation}
              nameField={"faxNumber"}
              value={data.faxNumber.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="代表eMail：">
              代表eMail
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="代表eMail"
              required={true}
              isEmail={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.representativeEmail.isError}
              handelValidation={this.isValidation}
              nameField={"representativeEmail"}
              value={data.representativeEmail.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="web site：">
              Web site
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="例）http://abc.co.jp"
              required={true}
              isURL={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.website.isError}
              handelValidation={this.isValidation}
              nameField={"website"}
              value={data.website.value}
            />
          </div>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <div className={classes.formGroup}>
            <label htmlFor="代表者名：">
              代表者名
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="代表者名"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.representativeName.isError}
              handelValidation={this.isValidation}
              nameField={"representativeName"}
              value={data.representativeName.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="資本金：">
              資本金
              <span style={{ color: "#FF150E" }}> (万円)</span>：
            </label>
            <TextFieldCompany
              placeholder="資本金"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.capital.isError}
              handelValidation={this.isValidation}
              nameField={"capital"}
              value={data.capital.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="設立日：">
              設立日
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
              <DatePicker
                value={this.formatDate(data.establishmentDate)}
                format="yyyy/MM/dd"
                className={classes.rowInputForm}
                cancelLabel="キャンセル"
                margin="normal"
                InputProps={{
                  classes: {
                    root: classes.inputRootDate,
                    input: classes.inputInputDate
                  }
                }}
                onChange={this.handleChangeDate("establishmentDate")}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="社員数：">
              社員数
              <span style={{ color: "#FF150E" }}> (必須)</span>：
            </label>
            <TextFieldCompany
              placeholder="社員数"
              required={true}
              isNumber={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={data.employeesNo.isError}
              handelValidation={this.isValidation}
              nameField={"employeesNo"}
              value={data.employeesNo.value}
            />
          </div>
          {/* phần company setting */}
          <Paper square className={classes.boxCompanySetting}>
            <Tabs
              value={this.state.step}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChangeTab}
              centered
              className={classes.tabCompany}
            >
              <Tab label="登録情報" />
              <Tab label="取引条件" />
              <Tab label="指定調査会社" />
            </Tabs>
            <div className={classes.contentStep}>
              {this.renderStepComnpany(step)}
            </div>
          </Paper>
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
          {/* end company-setting */}
          <div className={classes.formGroupButton}>
            {/* message */}
            {statusSubmit.open && (
              <Typography
                className={`${classes.message} ${
                  statusSubmit.status === -1
                    ? classes.messErr
                    : classes.messSucc
                }`}
              >
                {statusSubmit.message}
              </Typography>
            )}
            <div className={classes.rowButtonSave}>
              <Button
                disabled={statusSubmit.isLoadding}
                type="button"
                variant="contained"
                color="primary"
                size="large"
                className={classes.btnSave}
                onClick={this.handleNextStep}
              >
                登録を申請する
              </Button>
              {statusSubmit.isLoadding && (
                <CircularProgress size={24} className={classes.iconProgress} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

CompanyStep3.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func,
  companyProps: PropTypes.object,
  dispatch: PropTypes.func
};
const mapStateToProps = state => {
  const { companyState } = state;
  return {
    companyProps: companyState
  };
};
export default withCookies(
  connect(mapStateToProps)(withRoot(withStyles(styles)(CompanyStep3)))
);
