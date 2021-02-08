import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
// api
import { apiRoot } from "constant/index.js";
// component projact
import TextFieldCompany from "components/CompanyPage/TextFieldCompany.jsx";
// redux action
import { setInfoUserTemp } from "actions/companyActions.js";
// jss
import styles from "assets/jss/views/Company/styleCompanyStep1.jsx";

class CompanyStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadding: false,
      isErrorSubmit: false,
      isErrorAll: true,
      arrValidation: {
        email: {
          name: "email",
          isRequire: true,
          isError: false,
          value: ""
        },
        firstName: {
          name: "firstName",
          isRequire: true,
          isError: false,
          value: ""
        }
      }
    };
  }
  handleNextStep = () => {
    const { dispatch } = this.props;
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

    if (!nextStep) {
      return;
    }
    // this.props.nextStep(1);
    // xử lý hoàn thành step 3
    this.setState({ isLoadding: true });
    const dataInsert = {
      email: arrValidation.email.value,
      firstName: arrValidation.firstName.value,
      password: ""
    };
    const url = `${apiRoot}/temp/user`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataInsert)
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        if (result.id === -1) {
          this.setState({ isErrorSubmit: true, isLoadding: false });
        } else {
          this.setState({ isErrorSubmit: false, isLoadding: false });
          dispatch(
            setInfoUserTemp({
              userTempId: result.id,
              email: result.email,
              firstName: result.firstName
            })
          );
          this.props.nextStep(1);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ isErrorSubmit: true, isLoadding: false });
      });
  };
  isValidation = (isError, nameField, value) => {
    const { arrValidation } = this.state;
    arrValidation[`${nameField}`]["isError"] = isError;
    arrValidation[`${nameField}`]["value"] = value;
    this.setState({ arrValidation });
  };
  render = () => {
    const { classes } = this.props;
    const { isErrorSubmit, arrValidation, isLoadding } = this.state;
    return (
      <div className={classes.blockStep}>
        <Typography variant="h4" className={classes.titleForm}>
          取引先の新規登録
        </Typography>
        <Typography className={classes.titleSubForm}>
          登録申請ユーザーの仮登録
        </Typography>
        {/* form company step1 */}
        <div className={classes.formCompany}>
          <Typography className={classes.titleChildForm}>
            最初にユーザーの仮登録を行います。下記にeMail、お名前を入力してください。
            取引先登録のためのリンク、仮のパスワードなどを送らせていただけいます。
          </Typography>
          <div className={classes.rowFromGroups}>
            <div className={classes.formGroup}>
              <label htmlFor="お名前:">
                お名前 <span style={{ color: "#FF150E" }}>(必須)</span>：
              </label>
              <TextFieldCompany
                customStyleRoot={classes.rowInputForm}
                placeholder="名"
                required={true}
                isErrorProps={arrValidation.firstName.isError}
                handelValidation={this.isValidation}
                nameField={arrValidation.firstName.name}
                value={arrValidation.firstName.value}
              />
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="eMail：">
              eMail <span style={{ color: "#FF150E" }}>(必須)</span>：
            </label>
            <TextFieldCompany
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

          {isErrorSubmit === true && (
            <Typography className={classes.messSubmit}>
              Registration failed, This email already exists!
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
                保存・メール送信
              </Button>
              {isLoadding && (
                <CircularProgress size={24} className={classes.iconProgress} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

CompanyStep1.propTypes = {
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
  withRoot(withStyles(styles)(CompanyStep1))
);
