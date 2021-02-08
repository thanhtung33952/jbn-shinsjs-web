import React from "react";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";
import { matchPath } from "react-router";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
// component projact
import TextFieldSjs from "components/TextFieldSjs/TextFieldSjs.jsx";
import ButtonSjs from "components/ButtonSjs/ButtonSjs.jsx";
import Notification from "components/Notification/Notification.jsx";
import Master3Col from "layout/Master3Col.jsx";
// api
import { apiRoot, folderRoot } from "constant/index.js";
// icon img
import IconUser from "assets/img/iconuser.png";
// layout
// jss
import styles from "assets/jss/views/styleProfile.jsx";

// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;
class PersonPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoaddingPage: 0,
      isNew: true,
      isErrorAll: true,
      userId: null,
      arrValidation: {
        firstName: {
          name: "firstName",
          isRequire: true,
          isError: false,
          value: ""
        },
        first_name1: {
          name: "first_name1",
          isRequire: true,
          isError: false,
          value: ""
        },
        lastName: {
          name: "lastName",
          isRequire: true,
          isError: false,
          value: ""
        },
        last_name1: {
          name: "last_name1",
          isRequire: true,
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
          isRequire: true,
          isError: false,
          value: ""
        },
        company_name: {
          name: "company_name",
          isRequire: true,
          isError: false,
          value: ""
        },
        hire_date: {
          name: "hire_date",
          isRequire: true,
          isError: false,
          value: ""
        },
        department: {
          name: "department",
          isRequire: true,
          isError: false,
          value: ""
        },
        position: {
          name: "position",
          isRequire: true,
          isError: false,
          value: ""
        },
        job_title: {
          name: "job_title",
          isRequire: true,
          isError: false,
          value: ""
        },
        employee_number: {
          name: "employee_number",
          isRequire: true,
          isError: false,
          value: ""
        },
        sjs_id: {
          name: "sjs_id",
          isRequire: true,
          isError: false,
          value: ""
        },
        postalCode: {
          name: "postalCode",
          isRequire: true,
          isError: false,
          value: ""
        },
        province: {
          name: "province",
          isRequire: true,
          isError: false,
          value: ""
        },
        city: {
          name: "city",
          isRequire: true,
          isError: false,
          value: ""
        },
        streetAddress: {
          name: "streetAddress",
          isRequire: true,
          isError: false,
          value: ""
        },
        buildingName: {
          name: "buildingName",
          isRequire: true,
          isError: false,
          value: ""
        }
      },
      statusSave: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      }
    };
  }

  componentDidMount = () => {
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    document.title = "プロフィール";

    if (userInfo && userInfo.userId) {
      // mode update
      console.log(userInfo);
      this.getDataProfile(userInfo.userId);
    } else {
      // không tồn tại userId
      this.setState({ isLoaddingPage: -1 });
    }
  };
  getDataProfile = async id => {
    const { arrValidation } = this.state;
    try {
      const res = await axios.get(`${apiRoot}/profile/${id}`);
      // Failed
      if (res.status !== 200) {
        // không tồn tại userId trong db
        this.setState({ isLoaddingPage: -1 });
        return;
      }
      if (res.data === false) {
        this.setState({ isLoaddingPage: 1, isNew: true, userId: id });
        return;
      }
      // set data
      const data = res.data;
      arrValidation.firstName.value = data.firstName;
      arrValidation.first_name1.value = data.first_name1;
      arrValidation.lastName.value = data.lastName;
      arrValidation.last_name1.value = data.last_name1;
      arrValidation.email.value = data.email;
      arrValidation.mobile_phone.value = data.mobile_phone;
      arrValidation.company_name.value = data.company_name;
      arrValidation.hire_date.value = data.hire_date;
      arrValidation.department.value = data.department;
      arrValidation.position.value = data.position;
      arrValidation.job_title.value = data.job_title;
      arrValidation.employee_number.value = data.employee_number;
      arrValidation.sjs_id.value = data.sjs_id;
      arrValidation.postalCode.value = data.postalCode;
      arrValidation.province.value = data.province;
      arrValidation.city.value = data.city;
      arrValidation.streetAddress.value = data.streetAddress;
      arrValidation.buildingName.value = data.buildingName;
      this.setState({
        arrValidation,
        isNew: false,
        isLoaddingPage: 1,
        userId: id
      });
    } catch (error) {
      this.setState({ isLoaddingPage: -1 });
      return;
    }
  };
  handleSave = () => {
    const { isNew, isErrorAll, arrValidation, statusSave } = this.state;
    let isSave = true;
    if (isErrorAll) {
      // eslint-disable-next-line no-undef
      for (let x in arrValidation) {
        if (
          arrValidation[`${x}`]["isRequire"] === true &&
          (arrValidation[`${x}`]["value"] === "" ||
            !arrValidation[`${x}`]["value"])
        ) {
          arrValidation[`${x}`]["isError"] = true;
          isSave = false;
        }
      }
      this.setState({ arrValidation, isErrorAll: false });
    } else {
      for (let x in arrValidation) {
        if (arrValidation[`${x}`]["isError"] === true) {
          isSave = false;
        }
      }
    }

    if (!isSave) return;

    statusSave.isLoadding = true;
    this.setState({ statusSave });
    if (isNew) {
      this.handleInsert();
    } else {
      this.handleUpdate();
    }
  };

  handleCloseNotification = () => {
    const { statusSave } = this.state;
    statusSave.open = false;
    statusSave.isLoadding = false;
    statusSave.isError = 0;
    statusSave.message = "";
    this.setState({ statusSave });
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
            arrValidation.city["value"] = result.data.city;
            arrValidation.streetAddress["value"] = result.data.address;
            arrValidation.buildingName["value"] = result.data.town;
            // update is validation success
            arrValidation.province["isError"] = false;
            arrValidation.city["isError"] = false;
            arrValidation.streetAddress["isError"] = false;
            arrValidation.buildingName["isError"] = false;
            this.setState({ arrValidation });
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
    return new Date();
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
  handleInsert = async () => {
    const { arrValidation, userId, statusSave } = this.state;
    if (!userId) return;

    let dataInsert = {
      user_id: userId,
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
    // console.log(dataInsert)
    try {
      const res = await axios.post(`${apiRoot}/profile`, dataInsert);

      // Failed
      if (res.status !== 200) {
        statusSave.open = true;
        statusSave.isLoadding = false;
        statusSave.isError = -1;
        statusSave.message = "Insert profile faild";
        this.setState({ statusSave });
      }
      // Success
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = 1;
      statusSave.message = "Insert profile success";
      this.setState({
        statusSave,
        isNew: false,
        profileId: res.data.id
      });
      return true;
    } catch (error) {
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = -1;
      statusSave.message = "Insert profile faild";
      this.setState({ statusSave });
    }
  };
  handleUpdate = async () => {
    const { arrValidation, userId, statusSave } = this.state;
    let dataUpdate = {
      firstName: arrValidation.firstName.value,
      first_name1: arrValidation.first_name1.value,
      lastName: arrValidation.lastName.value,
      last_name1: arrValidation.last_name1.value,
      email: arrValidation.email.value,
      mobile_phone: arrValidation.mobile_phone.value,
      postalCode: arrValidation.postalCode.value,
      province: arrValidation.province.value,
      city: arrValidation.city.value,
      streetAddress: arrValidation.streetAddress.value,
      buildingName: arrValidation.buildingName.value
    };
    console.log(dataUpdate);
    try {
      const res = await axios.put(`${apiRoot}/profile/${userId}`, dataUpdate);
      // console.log(res);
      // Failed
      if (res.status !== 200) {
        statusSave.open = true;
        statusSave.isLoadding = false;
        statusSave.isError = -1;
        statusSave.message = "Update profile faild";
        this.setState({ statusSave });
        return;
      }
      // Success
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = 1;
      statusSave.message = "Update profile success";
      this.setState({ statusSave });
    } catch (error) {
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = -1;
      statusSave.message = "Update profile faild";
      this.setState({ statusSave });
    }
  };
  render = () => {
    const { classes } = this.props;
    const { isLoaddingPage, arrValidation, statusSave, isNew } = this.state;

    // console.log(surveyInfo)
    if (isLoaddingPage === 0) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={"100%"}
          titleHeader="プロフィール"
          breadcrumb="トップ ＞ プロフィール"
        >
          <div className={classes.errorPage}>
            <CircularProgress size={50} className={classes.loaddingPage} />
          </div>
        </Master3Col>
      );
    }

    // không tồn tại userID, hoặc userID trên url không giống với userID từ cookies
    if (isLoaddingPage === -1) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={"100%"}
          titleHeader="プロフィール"
          breadcrumb="トップ ＞ プロフィール"
        >
          <div className={classes.errorPage}>
            <Typography component="h2">Oops, something went wrong!</Typography>
          </div>
        </Master3Col>
      );
    }
    return (
      <Master3Col
        colLeft={null}
        colRight={null}
        maxWidthPage={"100%"}
        titleHeader="プロフィール"
        breadcrumb="トップ ＞ プロフィール"
      >
        <div className={classes.blockContent}>
          <div className={classes.formCompany}>
            <div className={classes.form}>
              <Typography className={classes.titleSubForm}>基本情報</Typography>
              <div className={classes.rowFromGroups}>
                <div className={classes.formGroup}>
                  <label htmlFor="名前（姓）：">名前（姓）：</label>
                  <TextFieldSjs
                    customStyleRoot={classes.rowInputForm}
                    placeholder="姓"
                    required={true}
                    isErrorProps={arrValidation.firstName.isError}
                    handelValidation={this.isValidation}
                    nameField={arrValidation.firstName.name}
                    value={arrValidation.firstName.value}
                  />
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="（名）：">（名）：</label>
                  <TextFieldSjs
                    customStyleRoot={classes.rowInputForm}
                    placeholder="名"
                    required={true}
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
                  <TextFieldSjs
                    customStyleRoot={classes.rowInputForm}
                    placeholder="姓よみ"
                    required={true}
                    isErrorProps={arrValidation.lastName.isError}
                    handelValidation={this.isValidation}
                    nameField={arrValidation.lastName.name}
                    value={arrValidation.lastName.value}
                  />
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="（名）：">（名）：</label>
                  <TextFieldSjs
                    customStyleRoot={classes.rowInputForm}
                    placeholder="名よみ"
                    required={true}
                    isErrorProps={arrValidation.last_name1.isError}
                    handelValidation={this.isValidation}
                    nameField={arrValidation.last_name1.name}
                    value={arrValidation.last_name1.value}
                  />
                </div>
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="eMail：">eMail：</label>
                <TextFieldSjs
                  placeholder="eMail"
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
                <TextFieldSjs
                  placeholder="携帯電話"
                  required={true}
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
                <TextFieldSjs
                  disabled={!isNew}
                  placeholder=""
                  required={true}
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
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={jpLocale}
                  >
                    <DatePicker
                      disabled={!isNew}
                      value={this.formatDate(arrValidation.hire_date.value)}
                      format="yyyy/MM/dd"
                      minDate={
                        this.formatDate(arrValidation.hire_date.value)
                          ? this.formatDate(arrValidation.hire_date.value)
                          : today
                      }
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
                <TextFieldSjs
                  disabled={!isNew}
                  placeholder=""
                  required={true}
                  customStyleRoot={classes.rowInputForm}
                  isErrorProps={arrValidation.department.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.department.name}
                  value={arrValidation.department.value}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="役職：">役職：</label>
                <TextFieldSjs
                  disabled={!isNew}
                  placeholder=""
                  required={true}
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
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={jpLocale}
                  >
                    <DatePicker
                      disabled={!isNew}
                      value={this.formatDate(arrValidation.job_title.value)}
                      format="yyyy/MM/dd"
                      minDate={
                        this.formatDate(arrValidation.job_title.value)
                          ? this.formatDate(arrValidation.job_title.value)
                          : today
                      }
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
                <label htmlFor="社員番号： ">社員番号： </label>
                <div
                  style={{ width: "30%", minWidth: "auto", textAlign: "left" }}
                >
                  <TextFieldSjs
                    disabled={!isNew}
                    placeholder=""
                    required={true}
                    customStyleRoot={classes.rowInputForm100}
                    isErrorProps={arrValidation.employee_number.isError}
                    handelValidation={this.isValidation}
                    nameField={arrValidation.employee_number.name}
                    value={arrValidation.employee_number.value}
                  />
                </div>
                <label htmlFor="SJS-ID： ">SJS-ID： </label>
                <div
                  style={{ width: "30%", minWidth: "auto", textAlign: "left" }}
                >
                  <TextFieldSjs
                    disabled={!isNew}
                    placeholder=""
                    required={true}
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
                  <TextFieldSjs
                    placeholder="103-0027"
                    required={true}
                    customStyleRoot={classes.rowInputForm100}
                    isErrorProps={arrValidation.postalCode.isError}
                    handelValidation={this.isValidation}
                    nameField={arrValidation.postalCode.name}
                    value={arrValidation.postalCode.value}
                  />
                </div>
                <Button
                  variant="contained"
                  className={classes.btnRenderAddress}
                  disabled={arrValidation.postalCode.isError}
                  onClick={this.handleRenderAddress}
                >
                  住所を表示
                </Button>
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="都道府県：">都道府県：</label>
                <TextFieldSjs
                  placeholder="都道府県"
                  required={true}
                  customStyleRoot={classes.rowInputForm}
                  isErrorProps={arrValidation.province.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.province.name}
                  value={arrValidation.province.value}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="市区郡：">市区郡：</label>
                <TextFieldSjs
                  placeholder="市区郡"
                  required={true}
                  customStyleRoot={classes.rowInputForm}
                  isErrorProps={arrValidation.city.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.city.name}
                  value={arrValidation.city.value}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="地名番地：">地名番地：</label>
                <TextFieldSjs
                  placeholder="地名番地"
                  required={true}
                  customStyleRoot={classes.rowInputForm}
                  isErrorProps={arrValidation.streetAddress.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.streetAddress.name}
                  value={arrValidation.streetAddress.value}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="ビル名：">ビル名：</label>
                <TextFieldSjs
                  placeholder="ビル名"
                  required={true}
                  customStyleRoot={classes.rowInputForm}
                  isErrorProps={arrValidation.buildingName.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.buildingName.name}
                  value={arrValidation.buildingName.value}
                />
              </div>
              <div className={classes.rowBtnSave}>
                <Button
                  variant="contained"
                  className={classes.btnRenderAddress}
                  disabled={statusSave.isLoadding}
                  onClick={this.handleSave}
                  style={{
                    padding: "10px 30px",
                    margin: 0
                  }}
                >
                  更新する
                </Button>
                {statusSave.isLoadding && (
                  <CircularProgress
                    size={24}
                    className={classes.iconProgress}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Notification event */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={statusSave.open}
          autoHideDuration={6000}
          onClose={this.handleCloseNotification}
        >
          {statusSave.open && (
            <Notification
              onClose={this.handleCloseNotification}
              variant={statusSave.isError === -1 ? "error" : "success"}
              message={statusSave.message}
            />
          )}
        </Snackbar>
        {/* End Notification event */}
      </Master3Col>
    );
  };
}

PersonPage.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(PersonPage)));
