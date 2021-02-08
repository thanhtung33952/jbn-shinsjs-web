import React from "react";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
// customer component
import ButtonSjs from "components/ButtonSjs/ButtonSjs.jsx";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// component projact
import TextFieldSjs from "components/TextFieldSjs/TextFieldSjs.jsx";
// api
import { apiRoot } from "constant/index.js";
// jss
import styles from "assets/jss/views/CompanySetting/styleCompanySetting1.jsx";

class CompanySetting1 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      notAddress: false
    };
  }
  handleRenderAddress = () => {
    const { data, updateValue } = this.props;
    if (!data.postalCode) {
      return false;
    }
    fetch(`${apiRoot}/zipaddress/${data.postalCode}`, {
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
              updateValue("dataPage1", null, "province", result.data.pref);
              updateValue("dataPage1", null, "city", result.data.address);
              // updateValue(
              //   "dataPage1",
              //   null,
              //   "streetAddress",
              //   result.data.address
              // );
              // updateValue("dataPage1", null, "buildingName", result.data.town);
            }
            this.setState({ notAddress: false });
          } else {
            this.setState({ notAddress: true });
          }
        },
        () => {}
      );
  };

  handleChangeRoleBtn = (e, level, nameField) => {
    const { updateValue } = this.props;
    let value = e.currentTarget.value;
    if (updateValue) {
      updateValue("dataPage1", level, nameField, value);

      if (
        nameField === "companyForm" &&
        (value === "independent" || value === "branch_office")
      ) {
        updateValue("dataPage1", level, "headOfficeName", "");
      }
    }
  };
  isValidation = (isError, nameField, value) => {
    const { updateValue } = this.props;
    let level = null;
    if (updateValue) {
      updateValue("dataPage1", level, nameField, value);
    }
  };
  closeNoti = () => {
    const { closeNotification } = this.props;
    if (closeNotification) {
      closeNotification("statusSubmit1");
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
      updateValue("dataPage1", level, name, newDate);
    }
  };
  handleSave = () => {
    const { handleSave } = this.props;
    if (handleSave) {
      handleSave("dataPage1");
    }
  };
  render = () => {
    const { classes, data, statusSubmit } = this.props;
    if (data === -1) {
      return (
        <div className={classes.blockStep}>
          <Typography variant="h4" className={classes.titleForm}>
            Oops, something went wrong!
          </Typography>
        </div>
      );
    }
    return (
      <div className={classes.blockStep}>
        <Typography variant="h4" className={classes.titleForm}>
          取引先の登録情報
        </Typography>
        <Typography className={classes.titleSubForm}>基本情報</Typography>
        {/* form person step1 */}
        <div className={classes.formCompany}>
          <Typography className={classes.titleChildForm}>
            未記入欄があれば、すべて記入したのち「保存」ボタンを押してください。
          </Typography>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
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
                onClick={e =>
                  this.handleChangeRoleBtn(e, null, "fcFranchiseStore")
                }
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
                onClick={e =>
                  this.handleChangeRoleBtn(e, null, "fcFranchiseStore")
                }
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
                onClick={e =>
                  this.handleChangeRoleBtn(e, null, "contentOfTrans")
                }
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
                onClick={e =>
                  this.handleChangeRoleBtn(e, null, "contentOfTrans")
                }
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
                onClick={e =>
                  this.handleChangeRoleBtn(e, null, "contentOfTrans")
                }
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
                onClick={e =>
                  this.handleChangeRoleBtn(e, null, "contentOfTrans")
                }
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
                onClick={e =>
                  this.handleChangeRoleBtn(e, null, "contentOfTrans")
                }
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
                onClick={e => this.handleChangeRoleBtn(e, null, "companyForm")}
                className={`${classes.btnRole} ${
                  data.companyForm === "independent" ? classes.activeRole : ""
                }`}
              >
                独立会社
              </Button>
              <Button
                variant="outlined"
                value="group_headquarters"
                onClick={e => this.handleChangeRoleBtn(e, null, "companyForm")}
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
                onClick={e => this.handleChangeRoleBtn(e, null, "companyForm")}
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
              <TextFieldSjs
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
                  !data.headOfficeName && data.errSubmit ? true : false
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
            <label htmlFor="取引先の表示名：">取引先の表示名：</label>
            <TextFieldSjs
              placeholder="例）地盤ネット"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.companyDisplayName && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"companyDisplayName"}
              value={data.companyDisplayName}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="取引先の正式名称：" style={{ lineHeight: "20px" }}>
              取引先の正式名称：
            </label>
            <TextFieldSjs
              placeholder="例）地盤ネット株式会社"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.companyFormalName && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"companyFormalName"}
              value={data.companyFormalName}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="フリガナ：">フリガナ：</label>
            <TextFieldSjs
              placeholder="フリガナ"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.phonetic && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"phonetic"}
              value={data.phonetic}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="郵便番号：">郵便番号：</label>
            <div style={{ width: "40%", minWidth: "auto" }}>
              <TextFieldSjs
                placeholder="103-0027"
                required={true}
                customStyleRoot={classes.rowInputForm100}
                isErrorProps={!data.postalCode && data.errSubmit ? true : false}
                handelValidation={this.isValidation}
                nameField={"postalCode"}
                value={data.postalCode}
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
              isErrorProps={!data.province && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"province"}
              value={data.province}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="市区郡：">市区郡：</label>
            <TextFieldSjs
              placeholder="市区郡"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.city && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"city"}
              value={data.city}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="地名番地：">地名番地：</label>
            <TextFieldSjs
              placeholder="地名番地"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.streetAddress && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"streetAddress"}
              value={data.streetAddress}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="ビル名：">ビル名：</label>
            <TextFieldSjs
              placeholder="ビル名"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.buildingName && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"buildingName"}
              value={data.buildingName}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="電話番号：">電話番号：</label>
            <TextFieldSjs
              placeholder="例）03-123-4567"
              // isPhone={true}
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.phoneNumber && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"phoneNumber"}
              value={data.phoneNumber}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="FAX番号：">FAX番号：</label>
            <TextFieldSjs
              placeholder="FAX番号"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.faxNumber && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"faxNumber"}
              value={data.faxNumber}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="代表eMail：">代表eMail：</label>
            <TextFieldSjs
              placeholder="代表eMail"
              required={true}
              isEmail={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.representativeEmail && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"representativeEmail"}
              value={data.representativeEmail}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="web site：">Web site：</label>
            <TextFieldSjs
              placeholder="例）http://abc.co.jp"
              required={true}
              // isURL={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.website && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"website"}
              value={data.website}
            />
          </div>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <div className={classes.formGroup}>
            <label htmlFor="代表者名：">代表者名：</label>
            <TextFieldSjs
              placeholder="代表者名"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={
                !data.representativeName && data.errSubmit ? true : false
              }
              handelValidation={this.isValidation}
              nameField={"representativeName"}
              value={data.representativeName}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="資本金：">資本金：</label>
            <TextFieldSjs
              placeholder="資本金"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.capital && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"capital"}
              value={data.capital}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="設立日：">設立日：</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
              <DatePicker
                value={this.formatDate(data.establishmentDate)}
                format="yyyy/MM/dd"
                placeholder="2019/01/01"
                className={classes.rowInputForm}
                cancelLabel="キャンセル"
                margin="normal"
                InputProps={{
                  classes: {
                    root:
                      !data.establishmentDate && data.errSubmit
                        ? classes.inputRootDateErro
                        : classes.inputRootDate,
                    input: classes.inputInputDate
                  }
                }}
                onChange={this.handleChangeDate("establishmentDate")}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="社員数：">社員数：</label>
            <TextFieldSjs
              placeholder="社員数"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={!data.employeesNo && data.errSubmit ? true : false}
              handelValidation={this.isValidation}
              nameField={"employeesNo"}
              value={data.employeesNo}
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
                {/* 更新する */}{" "}
                {/* tạm thời đổi text chỗ này cho bên /company sử dụng */}
                次へ
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

CompanySetting1.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func,
  updateValue: PropTypes.func,
  closeNotification: PropTypes.func,
  handleSave: PropTypes.func,
  statusSubmit: PropTypes.object,
  data: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(CompanySetting1)));
