import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonSjs from "components/ButtonSjs/ButtonSjs.jsx";
import TextFieldSjs from "components/TextFieldSjs/TextFieldSjs.jsx";
// jss
import styles from "assets/jss/views/Company/styleCompanyStep3.jsx";

class CompanyStep3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "staff",
      isErrorAll: true,
      arrValidation: {
        nameSur: {
          name: "nameSur",
          isRequire: true,
          isError: false,
          value: ""
        },
        firstName: {
          name: "firstName",
          isRequire: true,
          isError: false,
          value: ""
        },
        phoneticNameSur: {
          name: "phoneticNameSur",
          isRequire: true,
          isError: false,
          value: ""
        },
        phoneticFirstName: {
          name: "phoneticFirstName",
          isRequire: true,
          isError: false,
          value: ""
        },
        affiliationDepartment: {
          name: "affiliationDepartment",
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
        phoneNumber: {
          name: "phoneNumber",
          isRequire: true,
          isError: false,
          value: ""
        },
        cellPhoneNumber: {
          name: "cellPhoneNumber",
          isRequire: true,
          isError: false,
          value: ""
        },
        email: {
          name: "email",
          isRequire: true,
          isError: false,
          value: ""
        }
      }
    };
  }
  handleChangeRole = event => {
    this.setState({ role: event.currentTarget.value });
  };
  isValidation = (isError, nameField, value) => {
    const { arrValidation } = this.state;
    arrValidation[`${nameField}`]["isError"] = isError;
    arrValidation[`${nameField}`]["value"] = value;
    this.setState({ arrValidation });
  };
  handleNextStep = () => {
    const { isErrorAll, arrValidation } = this.state;
    let nextStep = true;
    if (isErrorAll) {
      // eslint-disable-next-line no-undef
      for (let x in arrValidation) {
        if (
          arrValidation[`${x}`]["isRequire"] == true &&
          arrValidation[`${x}`]["value"] === ""
        ) {
          arrValidation[`${x}`]["isError"] = true;
          nextStep = false;
        }
      }
      this.setState({ arrValidation, isErrorAll: false });
    } else {
      for (let x in arrValidation) {
        if (arrValidation[`${x}`]["isError"] == true) {
          nextStep = false;
        }
      }
    }
    // xử lý hoàn thành step 2
    if (nextStep) {
      this.props.nextStep(3);
    }
  };
  render = () => {
    const { classes } = this.props;
    const { role, arrValidation } = this.state;
    return (
      <React.Fragment>
        <Typography variant="h5" className={classes.titleForm}>
          担当者の仮登録
        </Typography>
        {/* form company step2 */}
        <div className={classes.formCompany}>
          <div className={classes.rowFromGroup}>
            <div className={classes.formGroup}>
              <label htmlFor="名前（姓）">名前（姓）</label>
              <TextFieldSjs
                customStyleRoot={classes.rowInputForm}
                placeholder="例）山田太郎"
                required={true}
                isErrorProps={arrValidation.nameSur.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.nameSur.name}
                value={arrValidation.nameSur.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="名前（名）">名前（名）</label>
              <TextFieldSjs
                customStyleRoot={classes.rowInputForm}
                placeholder="例）山田太郎"
                required={true}
                isErrorProps={arrValidation.firstName.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.firstName.name}
                value={arrValidation.firstName.value}
              />
            </div>
          </div>
          <div className={classes.rowFromGroup}>
            <div className={classes.formGroup}>
              <label htmlFor="フリガナ">フリガナ</label>
              <TextFieldSjs
                customStyleRoot={classes.rowInputForm}
                placeholder="フリガナ"
                required={true}
                isErrorProps={arrValidation.phoneticNameSur.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.phoneticNameSur.name}
                value={arrValidation.phoneticNameSur.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="フリガナ">フリガナ</label>
              <TextFieldSjs
                customStyleRoot={classes.rowInputForm}
                placeholder="フリガナ"
                required={true}
                isErrorProps={arrValidation.phoneticFirstName.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.phoneticFirstName.name}
                value={arrValidation.phoneticFirstName.value}
              />
            </div>
          </div>
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="会社名">会社名</label>
            <label htmlFor="会社名">会社名</label>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="所属部署">所属部署</label>
            <TextFieldSjs
              customStyleRoot={classes.rowInputForm}
              placeholder="例）営業部"
              required={true}
              isErrorProps={arrValidation.affiliationDepartment.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.affiliationDepartment.name}
              value={arrValidation.affiliationDepartment.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="役職 ">役職 </label>
            <TextFieldSjs
              customStyleRoot={classes.rowInputForm}
              placeholder="例）課長"
              required={true}
              isErrorProps={arrValidation.position.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.position.name}
              value={arrValidation.position.value}
            />
          </div>
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="新SJS上でスタッフ ">新SJS上でスタッフ </label>
            <div className={classes.rowBtnRole}>
              <Button
                variant="outlined"
                value="staff"
                onClick={this.handleChangeRole}
                className={`${classes.btnRole} ${
                  role === "staff" ? classes.activeRole : ""
                }`}
              >
                スタッフ
              </Button>
              <Button
                variant="outlined"
                value="manager"
                onClick={this.handleChangeRole}
                className={`${classes.btnRole} ${
                  role === "manager" ? classes.activeRole : ""
                }`}
              >
                マネージャー
              </Button>
              <Button
                variant="outlined"
                value="managerHigh"
                onClick={this.handleChangeRole}
                className={`${classes.btnRole} ${
                  role === "managerHigh" ? classes.activeRole : ""
                }`}
              >
                上級マネージャー
              </Button>
              <Button
                variant="outlined"
                value="managerMaster"
                onClick={this.handleChangeRole}
                className={`${classes.btnRole} ${
                  role === "managerMaster" ? classes.activeRole : ""
                }`}
              >
                ガバナー
              </Button>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="電話番号・内線">電話番号・内線</label>
            <TextFieldSjs
              customStyleRoot={classes.rowInputForm}
              placeholder="例）03-123-4567（内線）123"
              required={true}
              isErrorProps={arrValidation.phoneNumber.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.phoneNumber.name}
              value={arrValidation.phoneNumber.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="携帯電話番号">携帯電話番号</label>
            <TextFieldSjs
              customStyleRoot={classes.rowInputForm}
              placeholder="例）090-1234-5678"
              required={true}
              isErrorProps={arrValidation.cellPhoneNumber.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.cellPhoneNumber.name}
              value={arrValidation.cellPhoneNumber.value}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="eMail">eMail</label>
            <TextFieldSjs
              customStyleRoot={classes.rowInputForm}
              placeholder="例）name@mail.com"
              required={true}
              isEmail={true}
              isErrorProps={arrValidation.email.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.email.name}
              value={arrValidation.email.value}
            />
          </div>
          <Typography className={classes.noteEmail}>
            このメールアドレスに確認のメールを送らせていただきます。
          </Typography>
        </div>
        <div className={classes.formGroupButton}>
          <ButtonSjs
            textButton="保存して確認メールを送信"
            onClick={this.handleNextStep}
            isIconRow={false}
          />
        </div>
      </React.Fragment>
    );
  };
}

CompanyStep3.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func
};

export default withRoot(withStyles(styles)(CompanyStep3));
