import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
// redux action
import { setInfoUserTemp } from "actions/companyActions.js";
// api
import { apiRoot } from "constant/index.js";
// components project
import TextFieldCompany from "components/CompanyPage/TextFieldCompany.jsx";
// jss
import styles from "assets/jss/views/Company/styleCompanyStep2.jsx";

// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;
class CompanyStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadding: false,
      isErrorSubmit: false,
      messErrorSubmit: "",
      isErrorAll: true,
      notAddress: false,
      password: {
        main: { value: "", status: 0 },
        retype: { value: "", status: 0 }
      },
      arrValidation: {
        firstName: {
          name: "firstName",
          isRequire: false,
          isError: false,
          value: ""
        },
        first_name1: {
          name: "first_name1",
          isRequire: false,
          isError: false,
          value: ""
        },
        lastName: {
          name: "lastName",
          isRequire: false,
          isError: false,
          value: ""
        },
        last_name1: {
          name: "last_name1",
          isRequire: false,
          isError: false,
          value: ""
        },
        email: {
          name: "email",
          isRequire: true,
          isError: false,
          value: ""
        },
        mobile_phone: {
          name: "mobile_phone",
          isRequire: false,
          isError: false,
          value: ""
        },
        company_name: {
          name: "company_name",
          isRequire: false,
          isError: false,
          value: ""
        },
        hire_date: {
          name: "hire_date",
          isRequire: false,
          isError: false,
          value: null
        },
        department: {
          name: "department",
          isRequire: false,
          isError: false,
          value: ""
        },
        position: {
          name: "position",
          isRequire: false,
          isError: false,
          value: ""
        },
        job_title: {
          name: "job_title",
          isRequire: false,
          isError: false,
          value: null
        },
        employee_number: {
          name: "employee_number",
          isRequire: false,
          isError: false,
          value: ""
        },
        sjs_id: {
          name: "sjs_id",
          isRequire: false,
          isError: false,
          value: ""
        },
        postalCode: {
          name: "postalCode",
          isRequire: false,
          isError: false,
          value: ""
        },
        province: {
          name: "province",
          isRequire: false,
          isError: false,
          value: ""
        },
        city: {
          name: "city",
          isRequire: false,
          isError: false,
          value: ""
        },
        streetAddress: {
          name: "streetAddress",
          isRequire: false,
          isError: false,
          value: ""
        },
        buildingName: {
          name: "buildingName",
          isRequire: false,
          isError: false,
          value: ""
        }
      }
    };
  }
  componentDidMount = () => {
    const { arrValidation } = this.state;
    const { companyProps } = this.props;
    const userTempInfo = companyProps.userTempInfo;
    if (userTempInfo) {
      // arrValidation.firstName["value"] = userTempInfo.firstName
      //   ? userTempInfo.firstName
      //   : "";
      // arrValidation.lastName["value"] = userTempInfo.lastName
      //   ? userTempInfo.lastName
      //   : "";
      // arrValidation.firstName["isError"] = false;
      arrValidation.email["value"] = userTempInfo.email
        ? userTempInfo.email
        : "";
      arrValidation.email["isError"] = false;
      this.setState({ arrValidation });
    }
  };
  // change value input
  handleChangePass = name => event => {
    const { password } = this.state;
    let val = event.target.value;

    password[name].value = val;
    this.setState({ password: password });
  };
  // check password invalid
  checkPasswordInvalid = name => {
    const { password } = this.state;
    let passCheck = password[name].value;
    // check ký tự 1 byte
    let byteLen = 0;
    for (let i = 0; i < passCheck.length; i++) {
      let c = passCheck.charCodeAt(i);
      byteLen +=
        c < 1 << 7
          ? 1
          : c < 1 << 11
          ? 2
          : c < 1 << 16
          ? 3
          : c < 1 << 21
          ? 4
          : c < 1 << 26
          ? 5
          : c < 1 << 31
          ? 6
          : Number.NaN;
    }

    // xác thực chữ thường
    let lowerCaseLetters = /[a-z]/g;
    // xác thực chữ HOA
    let upperCaseLetters = /[A-Z]/g;
    // xác thực numbers
    let numbers = /[0-9]/g;
    if (!passCheck || !passCheck.match(numbers) || passCheck.length < 8) {
      password[name].status = -1;
    } else if (
      name === "retype" &&
      password[name].value !== password["main"].value
    ) {
      password[name].status = -2;
    } else {
      password[name].status = 1;
    }
    this.setState({ password: password });
  };
  strPasswordInvalid = password => {
    // check ký tự 1 byte
    let byteLen = 0;
    for (let i = 0; i < password.length; i++) {
      let c = password.charCodeAt(i);
      byteLen +=
        c < 1 << 7
          ? 1
          : c < 1 << 11
          ? 2
          : c < 1 << 16
          ? 3
          : c < 1 << 21
          ? 4
          : c < 1 << 26
          ? 5
          : c < 1 << 31
          ? 6
          : Number.NaN;
    }

    // xác thực chữ thường
    var lowerCaseLetters = /[a-z]/g;
    // xác thực chữ HOA
    var upperCaseLetters = /[A-Z]/g;
    // xác thực numbers
    var numbers = /[0-9]/g;
    if (!password) {
      return "必須項目。入力をお願いします。";
    } else if (!password.match(numbers)) {
      return "必ず数字を入れてください。";
    } else if (password.length < 8) {
      return "必ず8文字以上を入れてください。";
    }
  };
  handleNextStep = async () => {
    const { password } = this.state;
    const { companyProps } = this.props;
    const userTempInfo = companyProps.userTempInfo;

    // console.log(userTempInfo);
    const { isErrorAll, arrValidation } = this.state;
    let isSave = true;
    if (isErrorAll) {
      // eslint-disable-next-line no-undef
      for (let x in arrValidation) {
        if (
          (arrValidation[`${x}`]["isRequire"] === true &&
            (arrValidation[`${x}`]["value"] === "" ||
              !arrValidation[`${x}`]["value"])) ||
          arrValidation[`${x}`]["isError"] === true
        ) {
          arrValidation[`${x}`]["isError"] = true;
          isSave = false;
        }
      }
      if (password.main.status !== 1) {
        isSave = false;
        password.main.status = -1;
      }
      if (password.retype.status !== 1) {
        isSave = false;
        password.retype.status = -1;
      }
      this.setState({ password: password });
      this.setState({ arrValidation, isErrorAll: false });
    }

    if (!isSave || !userTempInfo.userTempId) return;

    this.setState({ isLoadding: true });

    // đi đăng ký user trước rồi mới đăng ký profile => sẽ trả về userID (tạm thời bỏ)
    // let userId = await this.registerUser();

    // đi update user (do màn hình register là đã đăng ký 1 user chính thức rồi)
    await this.updateUser();

    if (!userTempInfo.userID) return;

    // set userId vào biến toàn cục
    // lúc này user temp đã thành user chính
    const { dispatch } = this.props;
    dispatch(
      setInfoUserTemp({
        ...userTempInfo,
        firstName: arrValidation.firstName.value,
        lastName: arrValidation.lastName.value,
        password: password.main.value
      })
    );
    // insert data
    // xử lý hoàn thành step 3
    let dataInsert = {
      user_id: userTempInfo.userID,
      firstName: arrValidation.firstName.value,
      first_name1: arrValidation.first_name1.value,
      lastName: arrValidation.lastName.value,
      last_name1: arrValidation.last_name1.value,
      email: arrValidation.email.value,
      mobile_phone: arrValidation.mobile_phone.value,
      company_name: arrValidation.company_name.value,
      hire_date: arrValidation.hire_date.value,
      department: arrValidation.department.value,
      position: arrValidation.position.value,
      job_title: arrValidation.job_title.value,
      employee_number: arrValidation.employee_number.value,
      sjs_id: arrValidation.sjs_id.value,
      postalCode: arrValidation.postalCode.value,
      province: arrValidation.province.value,
      city: arrValidation.city.value,
      streetAddress: arrValidation.streetAddress.value,
      buildingName: arrValidation.buildingName.value
    };
    console.log(dataInsert);
    try {
      const res = await axios.post(`${apiRoot}/profile`, dataInsert);
      console.log(res);
      // Failed
      if (res.status !== 200) {
        this.setState({
          isErrorSubmit: true,
          messErrorSubmit: "Register profile faild",
          isLoadding: false
        });
      }
      // Success
      this.setState({
        isErrorSubmit: false,
        messErrorSubmit: "Register profile success",
        isLoadding: false
      });
      this.props.nextStep(2);
      return true;
    } catch (error) {
      this.setState({
        isErrorSubmit: true,
        messErrorSubmit: "Oops, something went wrong!",
        isLoadding: false
      });
    }
  };
  // đăng ký user chính thức
  registerUser = async () => {
    const { password, arrValidation } = this.state;

    const dataInsert = {
      email: arrValidation.email.value,
      firstName: arrValidation.firstName.value,
      lastName: arrValidation.lastName.value,
      password: password.main.value,
      companyID: null
    };
    try {
      const res = await axios.post(`${apiRoot}/account/register`, dataInsert);
      if (res.status !== 200 || res.data.id === -1) {
        this.setState({
          isLoadding: false,
          isErrorSubmit: true,
          messErrorSubmit:
            "登録に失敗しました。 このメッセージは登録されています"
        });
        return false;
      }
      this.setState({
        isLoadding: false,
        messErrorSubmit: "",
        isErrorSubmit: false
      });
      return res.data.id;
    } catch (error) {
      this.setState({
        isLoadding: false,
        isErrorSubmit: true,
        messErrorSubmit: "Oops, something went wrong!"
      });
      return false;
    }
  };

  // update user chính
  updateUser = async () => {
    const { password, arrValidation } = this.state;
    const { companyProps } = this.props;
    const userTempInfo = companyProps.userTempInfo;
    //cập nhật companyid cho user
    const dataUpdate = {
      userID: userTempInfo.userID,
      email: arrValidation.email.value,
      firstName: arrValidation.firstName.value,
      lastName: arrValidation.lastName.value,
      password: password.main.value,
      companyID: null
    };
    try {
      const res = await axios.put(`${apiRoot}/account/infouser`, dataUpdate);
      // error
      if (res.status !== 200 || res.data.id === -1) {
        this.setState({
          isLoadding: false,
          isErrorSubmit: true,
          messErrorSubmit:
            "登録に失敗しました。 このメッセージは登録されています"
        });
        return false;
      }
      // success
      this.setState({
        isLoadding: false,
        messErrorSubmit: "",
        isErrorSubmit: false
      });
    } catch (error) {
      this.setState({
        isLoadding: false,
        isErrorSubmit: true,
        messErrorSubmit: "Oops, something went wrong!"
      });
      return false;
    }
  };
  isValidation = (isError, nameField, value) => {
    const { arrValidation } = this.state;
    arrValidation[`${nameField}`]["isError"] = isError;
    arrValidation[`${nameField}`]["value"] = value;
    this.setState({ arrValidation });
  };
  handleRenderAddress = () => {
    const { arrValidation } = this.state;
    if (!arrValidation.postalCode.isError) {
      fetch(`${apiRoot}/zipaddress/${arrValidation.postalCode.value}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "text/plain"
        }
      })
        .then(res => res.json())
        .then(result => {
          const { arrValidation } = this.state;
          if (result.code === 200) {
            arrValidation.province["value"] = result.data.pref;
            arrValidation.city["value"] = result.data.address;
            // arrValidation.streetAddress["value"] = result.data.address;
            // arrValidation.buildingName["value"] = result.data.town;
            // update is validation success
            arrValidation.province["isError"] = false;
            arrValidation.city["isError"] = false;
            // arrValidation.streetAddress["isError"] = false;
            // arrValidation.buildingName["isError"] = false;
            this.setState({ arrValidation, notAddress: false });
          } else {
            this.setState({ notAddress: true });
          }
        });
    }
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
    return null;
  };
  // hander change date
  handleChangeDate = name => e => {
    const { arrValidation } = this.state;
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let data = yy + "-" + mm + "-" + dd;
    arrValidation[`${name}`]["isError"] = false;
    arrValidation[`${name}`]["value"] = data;
    this.setState({ arrValidation });
  };
  render = () => {
    const { classes } = this.props;
    const {
      isErrorSubmit,
      messErrorSubmit,
      arrValidation,
      password,
      isLoadding
    } = this.state;

    return (
      <div className={classes.blockStep}>
        <Typography variant="h4" className={classes.titleForm}>
          取引先の新規登録
        </Typography>
        <Typography className={classes.titleSubForm}>
          ユーザーの本登録
        </Typography>
        {/* form company step3 */}
        <div className={classes.formCompany}>
          <Typography className={classes.titleChildForm}>
            下記の欄、すべてにご記入ください。
            <br />
            このユーザーは admin 権限を有し、御社の情報すべてを編集できます。
          </Typography>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <div className={classes.form}>
            <Typography className={classes.titleSubForm}>基本情報</Typography>
            <div className={classes.rowFromGroups}>
              <div className={classes.formGroup}>
                <label htmlFor="名前（姓）：">名前（姓）：</label>
                <TextFieldCompany
                  customStyleRoot={classes.rowInputForm}
                  placeholder="姓"
                  required={false}
                  isErrorProps={arrValidation.firstName.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.firstName.name}
                  value={arrValidation.firstName.value}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="（名）：">（名）：</label>
                <TextFieldCompany
                  customStyleRoot={classes.rowInputForm}
                  placeholder="名"
                  required={false}
                  isErrorProps={arrValidation.first_name1.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.first_name1.name}
                  value={arrValidation.first_name1.value}
                />
              </div>
            </div>
            <div className={classes.rowFromGroups}>
              <div className={classes.formGroup}>
                <label htmlFor="よみ（姓）：">よみ（姓）：</label>
                <TextFieldCompany
                  customStyleRoot={classes.rowInputForm}
                  placeholder="姓よみ"
                  required={false}
                  isErrorProps={arrValidation.lastName.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.lastName.name}
                  value={arrValidation.lastName.value}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="（名）：">（名）：</label>
                <TextFieldCompany
                  customStyleRoot={classes.rowInputForm}
                  placeholder="名よみ"
                  required={false}
                  isErrorProps={arrValidation.last_name1.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.last_name1.name}
                  value={arrValidation.last_name1.value}
                />
              </div>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="eMail：">eMail：</label>
              <TextFieldCompany
                placeholder="eMail"
                disabled={true}
                required={true}
                isEmail={true}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.email.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.email.name}
                value={arrValidation.email.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="携帯電話：">携帯電話：</label>
              <TextFieldCompany
                placeholder="携帯電話"
                required={false}
                isPhone={true}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.mobile_phone.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.mobile_phone.name}
                value={arrValidation.mobile_phone.value}
              />
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
          </div>
          <div className={classes.form}>
            <Typography className={classes.noteForm}>所属会社</Typography>
            <div className={classes.formGroup}>
              <label htmlFor="会社名：">会社名：</label>
              <TextFieldCompany
                placeholder=""
                required={false}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.company_name.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.company_name.name}
                value={arrValidation.company_name.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="入社日：">入社日：</label>
              <div
                style={{ width: "50%", minWidth: "auto", textAlign: "left" }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
                  <DatePicker
                    value={this.formatDate(arrValidation.hire_date.value)}
                    format="yyyy/MM/dd"
                    // placeholder={today}
                    // minDate={
                    //   this.formatDate(arrValidation.hire_date.value)
                    //     ? this.formatDate(arrValidation.hire_date.value)
                    //     : today
                    // }
                    className={classes.rowInputDate}
                    cancelLabel="キャンセル"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.inputRootDate,
                        input: classes.inputInputDate
                      }
                    }}
                    onChange={this.handleChangeDate("hire_date")}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="所属部署：">所属部署：</label>
              <TextFieldCompany
                placeholder=""
                required={false}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.department.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.department.name}
                value={arrValidation.department.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="役職：">役職：</label>
              <TextFieldCompany
                placeholder=""
                required={false}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.position.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.position.name}
                value={arrValidation.position.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="役職就任日：">役職就任日：</label>
              <div
                style={{ width: "50%", minWidth: "auto", textAlign: "left" }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
                  <DatePicker
                    value={this.formatDate(arrValidation.job_title.value)}
                    format="yyyy/MM/dd"
                    // minDate={
                    //   this.formatDate(arrValidation.job_title.value)
                    //     ? this.formatDate(arrValidation.job_title.value)
                    //     : today
                    // }
                    placeholder={today}
                    className={classes.rowInputDate}
                    cancelLabel="キャンセル"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.inputRootDate,
                        input: classes.inputInputDate
                      }
                    }}
                    onChange={this.handleChangeDate("job_title")}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="社員番号： ">社員番号：</label>
              <div
                style={{ width: "30%", minWidth: "auto", textAlign: "left" }}
              >
                <TextFieldCompany
                  placeholder=""
                  required={false}
                  customStyleRoot={classes.rowInputForm100}
                  isErrorProps={arrValidation.employee_number.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.employee_number.name}
                  value={arrValidation.employee_number.value}
                />
              </div>
              <label htmlFor="SJS-ID：">SJS-ID： </label>
              <div
                style={{ width: "30%", minWidth: "auto", textAlign: "left" }}
              >
                <TextFieldCompany
                  placeholder=""
                  required={false}
                  customStyleRoot={classes.rowInputForm100}
                  isErrorProps={arrValidation.sjs_id.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.sjs_id.name}
                  value={arrValidation.sjs_id.value}
                />
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
          </div>
          <div className={classes.form} style={{ marginBottom: 30 }}>
            <Typography className={classes.noteForm}>自宅住所</Typography>
            <div className={classes.formGroup}>
              <label htmlFor="郵便番号：">郵便番号：</label>
              <div
                style={{ width: "40%", minWidth: "auto", textAlign: "left" }}
              >
                <TextFieldCompany
                  placeholder="103-0027"
                  required={false}
                  customStyleRoot={classes.rowInputForm100}
                  isErrorProps={arrValidation.postalCode.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.postalCode.name}
                  value={arrValidation.postalCode.value}
                />
                {this.state.notAddress && (
                  <Typography
                    style={{ color: "#f44336", fontSize: 13, marginTop: 2 }}
                  >
                    データがありません。
                  </Typography>
                )}
              </div>
              <Button
                variant="contained"
                className={classes.btnRenderAddress}
                disabled={arrValidation.postalCode.isError}
                onClick={this.handleRenderAddress}
                style={{ height: 43 }}
              >
                住所を表示
              </Button>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="都道府県：">都道府県：</label>
              <TextFieldCompany
                placeholder="都道府県"
                required={false}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.province.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.province.name}
                value={arrValidation.province.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="市区郡：">市区郡：</label>
              <TextFieldCompany
                placeholder="市区郡"
                required={false}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.city.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.city.name}
                value={arrValidation.city.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="地名番地：">地名番地：</label>
              <TextFieldCompany
                placeholder="地名番地"
                required={false}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.streetAddress.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.streetAddress.name}
                value={arrValidation.streetAddress.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="ビル名：">ビル名：</label>
              <TextFieldCompany
                placeholder="ビル名"
                required={false}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.buildingName.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.buildingName.name}
                value={arrValidation.buildingName.value}
              />
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
          </div>
          <div className={classes.form}>
            <Typography className={classes.noteForm}>
              パスワードの作成
            </Typography>
            <div className={classes.formGroup} style={{ flexFlow: "row wrap" }}>
              <label
                htmlFor="新しいパスワード："
                style={{ marginLeft: -80, width: "calc(20% + 80px)" }}
              >
                新しいパスワード：{" "}
                <span style={{ color: "#FF150E" }}>(必須)</span>:
              </label>
              <TextField
                error={password.main.status === -1 ? true : false}
                helperText={
                  password.main.status === -1
                    ? this.strPasswordInvalid(password.main.value)
                    : ""
                }
                className={classes.rowInputFormPass}
                value={password.main.value}
                type="password"
                margin="normal"
                variant="outlined"
                InputProps={{
                  classes: {
                    root: classes.rootInputPass,
                    input: classes.thisInputPass,
                    error: classes.thisInputErrorPass
                  }
                }}
                onBlur={() => this.checkPasswordInvalid("main")}
                onChange={this.handleChangePass("main")}
              />
            </div>
            <div className={classes.formGroup} style={{ flexFlow: "row wrap" }}>
              <label
                htmlFor="新しいパスワードの確認："
                style={{ marginLeft: -85, width: "calc(20% + 85px)" }}
              >
                新しいパスワードの確認：
                <span style={{ color: "#FF150E" }}>(必須)</span>:
              </label>
              <TextField
                error={
                  password.retype.status === -1 || password.retype.status === -2
                    ? true
                    : false
                }
                helperText={
                  password.retype.status === -1
                    ? this.strPasswordInvalid(password.retype.value)
                    : password.retype.status === -2
                    ? "パスワードが一致しません"
                    : ""
                }
                className={classes.rowInputFormPass}
                value={password.retype.value}
                type="password"
                margin="normal"
                variant="outlined"
                InputProps={{
                  classes: {
                    root: classes.rootInputPass,
                    input: classes.thisInputPass,
                    error: classes.thisInputErrorPass
                  }
                }}
                onBlur={() => this.checkPasswordInvalid("retype")}
                onChange={this.handleChangePass("retype")}
              />
            </div>
            <div className={classes.formGroupButton}>
              {isErrorSubmit === true && (
                <Typography className={classes.messSubmit}>
                  {messErrorSubmit}
                </Typography>
              )}
              <div className={classes.rowButtonSave}>
                <Button
                  disabled={isLoadding}
                  type="button"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.btnRenderAddress}
                  onClick={this.handleNextStep}
                >
                  次へ
                </Button>
                {isLoadding && (
                  <CircularProgress
                    size={24}
                    className={classes.iconProgress}
                  />
                )}
              </div>
            </div>
          </div>
          {/* <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="eMail：">eMail：</label>
            <label htmlFor="" style={{ textAlign: "left" }}>
              [{userTempInfo.email}]
            </label>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="パスワード：">パスワード：</label>
            <TextFieldCompany
              placeholder="パスワード"
              required={true}
              type="password"
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.password.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.password.name}
              value={arrValidation.password.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="パスワード：確認" style={{ lineHeight: "20px" }}>
              パスワード：
              <br />
              確認　
            </label>
            <TextFieldCompany
              placeholder="パスワード"
              required={true}
              type="password"
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.rePassword.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.rePassword.name}
              value={arrValidation.rePassword.value}
            />
          </div>
          <Divider
            classes={{
              root: classes.lineForm
            }}
            style={{ marginTop: 30 }}
          />
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="会社名：">会社名：</label>
            <label htmlFor="" style={{ textAlign: "left" }}>
              {companyInfo.companyName}
            </label>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="所属部署：">所属部署：</label>
            <TextFieldCompany
              placeholder="例）営業部"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.affiliationDepartment.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.affiliationDepartment.name}
              value={arrValidation.affiliationDepartment.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="役職：">役職：</label>
            <TextFieldCompany
              placeholder="例）部長"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.position.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.position.name}
              value={arrValidation.position.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="電話番号：">電話番号：</label>
            <TextFieldCompany
              placeholder="電話番号"
              isPhone={true}
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.phoneNumber.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.phoneNumber.name}
              value={arrValidation.phoneNumber.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="携帯電話：">携帯電話：</label>
            <TextFieldCompany
              placeholder="携帯電話"
              isPhone={true}
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.mobileNumber.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.mobileNumber.name}
              value={arrValidation.mobileNumber.value}
            />
          </div>
          {isErrorSubmit === true && (
            <Typography className={classes.messSubmit}>
              {messErrorSubmit}
            </Typography>
          )}
          <div className={classes.formGroupButton}>
            <div className={classes.rowButtonSave}>
              <Button
                disabled={isLoadding}
                type="button"
                variant="contained"
                color="primary"
                size="large"
                className={classes.btnSave}
                onClick={this.handleNextStep}
              >
                登録する
              </Button>
              {isLoadding && (
                <CircularProgress size={24} className={classes.iconProgress} />
              )}
            </div>
          </div> */}
        </div>
      </div>
    );
  };
}

CompanyStep2.propTypes = {
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
export default connect(mapStateToProps)(
  withRoot(withStyles(styles)(CompanyStep2))
);
