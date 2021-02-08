import React from "react";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import axios from "axios";
import { connect } from "react-redux";
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
// api
import { apiRoot } from "constant/index.js";
// jss
import styles from "assets/jss/views/CompanySetting/styleCompanySetting2.jsx";

class CompanySetting2 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      creditApprovalLog: [],
      notAddress: false
    };
  }
  componentDidMount = () => {
    const { cookies, companyProps } = this.props;
    const userTempInfo = companyProps.userTempInfo;
    const userInfo = cookies.get("authUserShinSJS");
    let companyID = userInfo && userInfo.companyId ? userInfo.companyId : null;
    if (!companyID && userTempInfo) {
      companyID = userTempInfo.companyId;
    }
    this.getCreditApprovalLog(companyID);
  };
  getCreditApprovalLog = async companyId => {
    if (!companyId) {
      return;
    }
    try {
      const res = await axios.get(`${apiRoot}/creditapprovallog/${companyId}`);
      // console.log(result);
      if (res.status !== 200 || !res.data) {
        return;
      }
      this.setState({ creditApprovalLog: res.data });
      return;
    } catch (error) {
      return;
    }
  };
  handleRenderAddress = () => {
    const { data, updateValue } = this.props;
    if (!data.invoiceMailingAddress.postalCode) {
      return false;
    }
    fetch(`${apiRoot}/zipaddress/${data.invoiceMailingAddress.postalCode}`, {
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
            if (updateValue) {
              updateValue(
                "dataPage2",
                "invoiceMailingAddress",
                "province",
                result.data.pref
              );
              updateValue(
                "dataPage2",
                "invoiceMailingAddress",
                "city",
                result.data.address
              );
              // updateValue(
              //   "dataPage2",
              //   "invoiceMailingAddress",
              //   "streetAddress",
              //   result.data.address
              // );
              // updateValue(
              //   "dataPage2",
              //   "invoiceMailingAddress",
              //   "buildingName",
              //   result.data.town
              // );
            }
            this.setState({ notAddress: false });
          } else {
            this.setState({ notAddress: true });
          }
        },
        () => {}
      );
  };
  handleChangeFile = nameField => file => {
    const { updateValue } = this.props;
    if (updateValue) {
      updateValue("dataPage2", null, nameField, file);
    }
  };
  clearFileUpload = nameField => () => {
    const { updateValue } = this.props;
    if (updateValue) {
      updateValue("dataPage2", null, nameField, "");
    }
  };
  handleChangeRoleBtn = (e, level, nameField) => {
    const { updateValue } = this.props;
    if (updateValue) {
      updateValue("dataPage2", level, nameField, e.currentTarget.value);
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
      closeNotification("statusSubmit2");
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
    // return new Date();
    return null;
  };
  // hander change date
  handleChangeDate = name => e => {
    const { updateValue } = this.props;
    let level = null;
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let newDate = yy + "-" + mm + "-" + dd;
    if (updateValue) {
      updateValue("dataPage2", level, name, newDate);
    }
  };
  handleSave = () => {
    const { handleSave } = this.props;
    if (handleSave) {
      handleSave("dataPage2");
    }
  };

  render = () => {
    const { classes, data, statusSubmit } = this.props;
    const { creditApprovalLog } = this.state;
    // console.log(data);
    let txtCreditApprovalLog =
      creditApprovalLog.length > 0 &&
      creditApprovalLog.map(item => {
        return (
          <li key={item}>
            {item.date + ", " + item.description + ", " + item.name}
          </li>
        );
      });

    let nameFile =
      data.authReceiptDoc && data.authReceiptDoc.name
        ? data.authReceiptDoc.name
        : data.authReceiptDoc;
    return (
      <div className={classes.blockStep}>
        <Typography variant="h4" className={classes.titleForm}>
          取引先の登録情報
        </Typography>
        <Typography className={classes.titleSubForm}>取引条件</Typography>
        {/* form company-setting step2 */}
        <div className={classes.formCompany}>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <Typography className={classes.noteForm}>与信情報</Typography>
          <div className={classes.formGroup}>
            <label htmlFor="与信限度額：">与信限度額：</label>
            <TextFieldSjs
              placeholder="90万円"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.creditLimit && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"creditLimit"}
              value={data.creditLimit}
            />
          </div>
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="与信ステータス：" style={{ lineHeight: "22px" }}>
              与信ステータス：
            </label>
            <div className={`${classes.rowBtnRole} ${classes.rowBtnRole0}`}>
              <Button
                variant="outlined"
                value="accepting"
                onClick={e => this.handleChangeRoleBtn(e, null, "creditStatus")}
                className={`${classes.btnRole} ${
                  data.creditStatus === "accepting" ? classes.activeRole : ""
                }`}
              >
                受付中
              </Button>
              <Button
                variant="outlined"
                value="reception_stop"
                onClick={e => this.handleChangeRoleBtn(e, null, "creditStatus")}
                className={`${classes.btnRole} ${
                  data.creditStatus === "reception_stop"
                    ? classes.activeRole
                    : ""
                }`}
              >
                受付停止（与信オーバー）
              </Button>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="与信承認ログ：">与信承認ログ：</label>
            <div className={classes.txtCredit}>{txtCreditApprovalLog}</div>
          </div>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <Typography className={classes.noteForm}>反社情報</Typography>
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="確認画面：">確認画面：</label>
            <label htmlFor="" style={{ textAlign: "left", color: "#222" }}>
              URL of html
            </label>
          </div>
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="受付書類：">受付書類：</label>
            <div className={`${classes.rowBtnRole}`}>
              {/* <ButtonSjs textButton="アップロード" isIconRow={false} /> */}
              <UploadFile
                accept="application/pdf"
                textButton="アップロード"
                customStyleRoot={classes.rowUpload}
                multiple={false}
                handleChangeFile={this.handleChangeFile("authReceiptDoc")}
              />
              <label htmlFor="" style={{ marginLeft: 20, color: "#222" }}>
                {nameFile ? nameFile : "or URL of pdf"}
                {nameFile && (
                  <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={this.clearFileUpload("authReceiptDoc")}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </label>
            </div>
          </div>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <div className={classes.formGroup}>
            <label htmlFor="郵便番号：">郵便番号：</label>
            <div style={{ width: "40%", minWidth: "auto" }}>
              <TextFieldSjs
                placeholder="103-0027"
                required={true}
                customStyleRoot={classes.rowInputForm100}
                isErrorProps={
                  !data.invoiceMailingAddress.postalCode && data.errSubmit
                    ? true
                    : false
                }
                handelValidation={this.isValidation}
                nameField={"postalCode"}
                value={data.invoiceMailingAddress.postalCode}
              />
              {this.state.notAddress && (
                <Typography
                  style={{
                    color: "#f44336",
                    fontSize: 13,
                    marginTop: 2,
                    textAlign: "left"
                  }}
                >
                  データがありません。
                </Typography>
              )}
            </div>
            <Button
              variant="contained"
              className={classes.btnRenderAddress}
              onClick={this.handleRenderAddress}
              style={{ height: 43 }}
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
              isErrorProps={
                !data.invoiceMailingAddress.province && data.errSubmit
                  ? true
                  : false
              }
              handelValidation={this.isValidation}
              nameField={"province"}
              value={data.invoiceMailingAddress.province}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="市区郡：">市区郡：</label>
            <TextFieldSjs
              placeholder="市区郡"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.invoiceMailingAddress.city && data.errSubmit
                  ? true
                  : false
              }
              handelValidation={this.isValidation}
              nameField={"city"}
              value={data.invoiceMailingAddress.city}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="地名番地：">地名番地：</label>
            <TextFieldSjs
              placeholder="地名番地"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.invoiceMailingAddress.streetAddress && data.errSubmit
                  ? true
                  : false
              }
              handelValidation={this.isValidation}
              nameField={"streetAddress"}
              value={data.invoiceMailingAddress.streetAddress}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="ビル名：">ビル名：</label>
            <TextFieldSjs
              placeholder="ビル名"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.invoiceMailingAddress.buildingName && data.errSubmit
                  ? true
                  : false
              }
              handelValidation={this.isValidation}
              nameField={"buildingName"}
              value={data.invoiceMailingAddress.buildingName}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="郵送先担当者名：" style={{ lineHeight: "24px" }}>
              郵送先担当者名：
            </label>
            <TextFieldSjs
              placeholder="郵送先担当者名"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.personNameInCharge && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"personNameInCharge"}
              value={data.personNameInCharge}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="支払人：">支払人：</label>
            <TextFieldSjs
              placeholder="支払人"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.payer && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"payer"}
              value={data.payer}
            />
          </div>
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start", marginTop: 12 }}
          >
            <label htmlFor="請求方法：" style={{ lineHeight: "22px" }}>
              請求方法：
            </label>
            <div className={`${classes.rowBtnRole} ${classes.rowBtnRole0}`}>
              <Button
                variant="outlined"
                value="normal_format"
                onClick={e =>
                  this.handleChangeRoleBtn(e, null, "billingMethod")
                }
                className={`${classes.btnRole} ${
                  data.billingMethod === "normal_format"
                    ? classes.activeRole
                    : ""
                }`}
              >
                通常書式
              </Button>
              <Button
                variant="outlined"
                value="payee_format"
                onClick={e =>
                  this.handleChangeRoleBtn(e, null, "billingMethod")
                }
                className={`${classes.btnRole} ${
                  data.billingMethod === "payee_format"
                    ? classes.activeRole
                    : ""
                }`}
              >
                ？支払先書式？
              </Button>
            </div>
          </div>
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start", marginTop: 12 }}
          >
            <label htmlFor="出力単位：" style={{ lineHeight: "22px" }}>
              出力単位：
            </label>
            <div className={`${classes.rowBtnRole} ${classes.rowBtnRole0}`}>
              <Button
                variant="outlined"
                value="bulk"
                onClick={e => this.handleChangeRoleBtn(e, null, "outputUnit")}
                className={`${classes.btnRole} ${
                  data.outputUnit === "bulk" ? classes.activeRole : ""
                }`}
              >
                一括
              </Button>
              <Button
                variant="outlined"
                value="property"
                onClick={e => this.handleChangeRoleBtn(e, null, "outputUnit")}
                className={`${classes.btnRole} ${
                  data.outputUnit === "property" ? classes.activeRole : ""
                }`}
              >
                物件
              </Button>
              <Button
                variant="outlined"
                value="line_item"
                onClick={e => this.handleChangeRoleBtn(e, null, "outputUnit")}
                className={`${classes.btnRole} ${
                  data.outputUnit === "line_item" ? classes.activeRole : ""
                }`}
              >
                明細
              </Button>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="締め日区分：">締め日区分：</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
              <DatePicker
                value={this.formatDate(data.closingClassificationDate)}
                format="yyyy/MM/dd"
                placeholder="2019/01/01"
                className={classes.rowInputForm}
                cancelLabel="キャンセル"
                margin="normal"
                InputProps={{
                  classes: {
                    root:
                      !data.closingClassificationDate && data.errSubmit
                        ? classes.inputRootDateErro
                        : classes.inputRootDate,
                    input: classes.inputInputDate
                  }
                }}
                onChange={this.handleChangeDate("closingClassificationDate")}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="回収予定日：">回収予定日：</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
              <DatePicker
                value={this.formatDate(data.estimatedRecoveryDate)}
                format="yyyy/MM/dd"
                placeholder="2019/01/01"
                className={classes.rowInputForm}
                cancelLabel="キャンセル"
                margin="normal"
                InputProps={{
                  classes: {
                    root:
                      !data.estimatedRecoveryDate && data.errSubmit
                        ? classes.inputRootDateErro
                        : classes.inputRootDate,
                    input: classes.inputInputDate
                  }
                }}
                onChange={this.handleChangeDate("estimatedRecoveryDate")}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="営業日区分：">営業日区分：</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
              <DatePicker
                value={this.formatDate(data.businessClassificationDate)}
                format="yyyy/MM/dd"
                placeholder="2019/01/01"
                className={classes.rowInputForm}
                cancelLabel="キャンセル"
                margin="normal"
                InputProps={{
                  classes: {
                    root:
                      !data.businessClassificationDate && data.errSubmit
                        ? classes.inputRootDateErro
                        : classes.inputRootDate,
                    input: classes.inputInputDate
                  }
                }}
                onChange={this.handleChangeDate("businessClassificationDate")}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <Typography className={classes.noteForm}>銀行口座情報</Typography>
          <div className={classes.formGroup}>
            <label htmlFor="銀行名：">銀行名：</label>
            <TextFieldSjs
              placeholder="銀行名"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.bankAccount.bankName && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"bankName"}
              value={data.bankAccount.bankName}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="銀行コード：">銀行コード：</label>
            <TextFieldSjs
              placeholder="銀行コード"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.bankAccount.bankCode && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"bankCode"}
              value={data.bankAccount.bankCode}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="支店名：">支店名：</label>
            <TextFieldSjs
              placeholder="支店名"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.bankAccount.branchName && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"branchName"}
              value={data.bankAccount.branchName}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="支店コード：">支店コード：</label>
            <TextFieldSjs
              placeholder="支店コード"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.bankAccount.branchCode && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"branchCode"}
              value={data.bankAccount.branchCode}
            />
          </div>
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start", marginTop: 12 }}
          >
            <label htmlFor="口座区分：" style={{ lineHeight: "22px" }}>
              口座区分：
            </label>
            <div className={`${classes.rowBtnRole} ${classes.rowBtnRole0}`}>
              <Button
                variant="outlined"
                value="usually"
                onClick={e =>
                  this.handleChangeRoleBtn(
                    e,
                    "bankAccount",
                    "accountClassification"
                  )
                }
                className={`${classes.btnRole} ${
                  data.bankAccount.accountClassification === "usually"
                    ? classes.activeRole
                    : ""
                }`}
              >
                普通
              </Button>
              <Button
                variant="outlined"
                value="current"
                onClick={e =>
                  this.handleChangeRoleBtn(
                    e,
                    "bankAccount",
                    "accountClassification"
                  )
                }
                className={`${classes.btnRole} ${
                  data.bankAccount.accountClassification === "current"
                    ? classes.activeRole
                    : ""
                }`}
              >
                当座
              </Button>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="口座番号：">口座番号：</label>
            <TextFieldSjs
              placeholder="口座番号"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.bankAccount.accountNumber && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"accountNumber"}
              value={data.bankAccount.accountNumber}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="口座名義：">口座名義：</label>
            <TextFieldSjs
              placeholder="口座名義"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.bankAccount.accountHolder && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"accountHolder"}
              value={data.bankAccount.accountHolder}
            />
          </div>
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
                {/* 登録を更新する */}{" "}
                {/* tạm thời đổi text chỗ này cho bên /company sử dụng */}
                次へ
              </Button>
              {statusSubmit.isLoadding && (
                <CircularProgress size={24} className={classes.iconProgress} />
              )}
            </div>
          </div>
          {/* Notification event */}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={statusSubmit.open}
            autoHideDuration={6000}
            onClose={this.closeNoti}
          >
            {statusSubmit.open && (
              <Notification
                onClose={this.closeNoti}
                variant={statusSubmit.status === -1 ? "error" : "success"}
                message={statusSubmit.message}
              />
            )}
          </Snackbar>
          {/* End Notification event */}
        </div>
      </div>
    );
  };
}

CompanySetting2.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func,
  updateValue: PropTypes.func,
  closeNotification: PropTypes.func,
  handleSave: PropTypes.func,
  statusSubmit: PropTypes.object,
  companyProps: PropTypes.object,
  data: PropTypes.object
};

const mapStateToProps = state => {
  const { companyState } = state;
  return {
    companyProps: companyState
  };
};
export default withCookies(
  connect(mapStateToProps)(withRoot(withStyles(styles)(CompanySetting2)))
);
