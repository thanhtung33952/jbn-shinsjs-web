import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// customer component
import ButtonSjs from "components/ButtonSjs/ButtonSjs.jsx";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// component projact
import TextFieldSjs from "components/TextFieldSjs/TextFieldSjs.jsx";
// api
import { apiRoot } from "constant/index.js";
// jss
import styles from "assets/jss/views/Person/stylePersonStep1.jsx";

class PersonStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorAll: true,
      arrValidation: {
        name: {
          name: "name",
          isRequire: true,
          isError: false,
          value: ""
        },
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
        firstNameSur: {
          name: "firstNameSur",
          isRequire: true,
          isError: false,
          value: ""
        },
        email1: {
          name: "email1",
          isRequire: true,
          isError: false,
          value: ""
        },
        phone: {
          name: "phone",
          isRequire: true,
          isError: false,
          value: ""
        },
        email2: {
          name: "email2",
          isRequire: true,
          isError: false,
          value: ""
        },
        zipcode: {
          name: "zipcode",
          isRequire: true,
          isError: false,
          value: ""
        },
        prefectures: {
          name: "prefectures",
          isRequire: true,
          isError: false,
          value: ""
        },
        city: { name: "city", isRequire: true, isError: false, value: "" },
        streetAddress: {
          name: "streetAddress",
          isRequire: true,
          isError: false,
          value: ""
        },
        town: { name: "town", isRequire: true, isError: false, value: "" }
      }
    };
  }
  handleNextStep = () => {
    const { isErrorAll, arrValidation } = this.state;
    let nextStep = true;
    if (isErrorAll) {
      // eslint-disable-next-line no-undef
      for (let x in arrValidation) {
        if (
          arrValidation[`${x}`]["isRequire"] === true &&
          arrValidation[`${x}`]["value"] === ""
        ) {
          arrValidation[`${x}`]["isError"] = true;
          nextStep = false;
        }
      }
      this.setState({ arrValidation, isErrorAll: false });
    } else {
      for (let x in arrValidation) {
        if (arrValidation[`${x}`]["isError"] === true) {
          nextStep = false;
        }
      }
    }
    // xử lý hoàn thành step 3
    if (nextStep) {
      this.props.nextStep(1);
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
    if (!arrValidation.zipcode.isError) {
      fetch(`${apiRoot}/zipaddress/${arrValidation.zipcode.value}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "text/plain"
        }
      })
        .then(res => res.json())
        .then(
          result => {
            const { arrValidation } = this.state;
            if (result.code === 200) {
              arrValidation.prefectures["value"] = result.data.pref;
              arrValidation.city["value"] = result.data.city;
              arrValidation.streetAddress["value"] = result.data.address;
              arrValidation.town["value"] = result.data.town;
              // update is error
              arrValidation.prefectures["isError"] = false;
              arrValidation.city["isError"] = false;
              arrValidation.streetAddress["isError"] = false;
              arrValidation.town["isError"] = false;
              this.setState({ arrValidation });
            }
          },
          () => {}
        );
    }
  };
  render = () => {
    const { classes } = this.props;
    const { arrValidation } = this.state;
    return (
      <div className={classes.blockStep}>
        {/* form person step1 */}
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
                  isErrorProps={arrValidation.name.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.name.name}
                  value={arrValidation.name.value}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="（名）：">（名）：</label>
                <TextFieldSjs
                  customStyleRoot={classes.rowInputForm}
                  placeholder="名"
                  required={true}
                  isErrorProps={arrValidation.nameSur.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.nameSur.name}
                  value={arrValidation.nameSur.value}
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
                  placeholder="名よみ"
                  required={true}
                  isErrorProps={arrValidation.firstNameSur.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.firstNameSur.name}
                  value={arrValidation.firstNameSur.value}
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
                isErrorProps={arrValidation.email1.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.email1.name}
                value={arrValidation.email1.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="携帯電話：">携帯電話：</label>
              <TextFieldSjs
                placeholder="携帯電話"
                required={true}
                isPhone={true}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.phone.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.phone.name}
                value={arrValidation.phone.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="eMail：">eMail：</label>
              <TextFieldSjs
                placeholder="eMail"
                required={true}
                isEmail={true}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.email2.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.email2.name}
                value={arrValidation.email2.value}
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
                placeholder=""
                required={true}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.zipcode.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.zipcode.name}
                value={arrValidation.zipcode.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="入社日：">入社日：</label>
              <div
                style={{ width: "50%", minWidth: "auto", textAlign: "left" }}
              >
                <TextFieldSjs
                  placeholder=""
                  required={true}
                  customStyleRoot={classes.rowInputForm}
                  isErrorProps={arrValidation.prefectures.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.prefectures.name}
                  value={arrValidation.prefectures.value}
                />
              </div>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="所属部署：">所属部署：</label>
              <TextFieldSjs
                placeholder=""
                required={true}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.city.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.city.name}
                value={arrValidation.city.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="役職：">役職：</label>
              <TextFieldSjs
                placeholder=""
                required={true}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.streetAddress.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.streetAddress.name}
                value={arrValidation.streetAddress.value}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="役職就任日：">役職就任日：</label>
              <div
                style={{ width: "50%", minWidth: "auto", textAlign: "left" }}
              >
                <TextFieldSjs
                  placeholder=""
                  required={true}
                  customStyleRoot={classes.rowInputForm}
                  isErrorProps={arrValidation.town.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.town.name}
                  value={arrValidation.town.value}
                />
              </div>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="社員番号： ">社員番号： </label>
              <div
                style={{ width: "30%", minWidth: "auto", textAlign: "left" }}
              >
                <TextFieldSjs
                  placeholder=""
                  required={true}
                  customStyleRoot={classes.rowInputForm100}
                  isErrorProps={arrValidation.town.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.town.name}
                  value={arrValidation.town.value}
                />
              </div>
              <label htmlFor="SJS-ID： ">SJS-ID： </label>
              <div
                style={{ width: "30%", minWidth: "auto", textAlign: "left" }}
              >
                <TextFieldSjs
                  placeholder=""
                  required={true}
                  customStyleRoot={classes.rowInputForm100}
                  isErrorProps={arrValidation.town.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.town.name}
                  value={arrValidation.town.value}
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
                  placeholder="123-4567"
                  required={true}
                  customStyleRoot={classes.rowInputForm100}
                  isErrorProps={arrValidation.zipcode.isError}
                  handelValidation={this.isValidation}
                  nameField={arrValidation.zipcode.name}
                  value={arrValidation.zipcode.value}
                />
              </div>
              <ButtonSjs
                textButton="住所を表示"
                onClick={this.handleRenderAddress}
                isIconRow={false}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="都道府県：">都道府県：</label>
              <TextFieldSjs
                placeholder="都道府県"
                required={true}
                customStyleRoot={classes.rowInputForm}
                isErrorProps={arrValidation.prefectures.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.prefectures.name}
                value={arrValidation.prefectures.value}
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
                isErrorProps={arrValidation.town.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.town.name}
                value={arrValidation.town.value}
              />
            </div>
            <div className={classes.formGroupButton}>
              <ButtonSjs
                textButton="
                更新する"
                onClick={this.handleNextStep}
                isIconRow={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

PersonStep1.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func
};

export default withRoot(withStyles(styles)(PersonStep1));
