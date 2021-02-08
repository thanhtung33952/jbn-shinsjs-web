import React from "react";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import { connect } from "react-redux";
import { withCookies, Cookies } from "react-cookie";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextFieldCompany from "components/CompanyPage/TextFieldCompany.jsx";
// api
import { apiRoot } from "constant/index.js";
// redux action
import { setInfoUserTemp } from "actions/companyActions.js";
// jss
import styles from "assets/jss/views/Company/styleCompanyStep1.jsx";

class CompanyStep1 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoadding: false,
      isErrorAll: true,
      messError: false,
      arrValidation: {
        password: {
          name: "password",
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
    // xử lý hoàn thành step 2
    const data = {
      password: arrValidation.password.value //là mã code được gửi trong mail khi đăng ký user bên/register
    };
    //console.log(JSON.stringify(data));
    if (!nextStep) return;

    this.setState({ isLoadding: true });
    fetch(`${apiRoot}/temp/user/checkpassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        if (result !== null) {
          console.log(result)
          dispatch(
            setInfoUserTemp({
              paramUserTempId: result.id,
              userTempId: result.id,
              email: result.email,
              lastName: result.lastName,
              firstName: result.firstName,
              userID: result.userId
            })
          );
          this.setState({ isLoadding: false });
          // next step
          this.props.nextStep(1);
        } else {
          arrValidation["password"]["isError"] = true;
          this.setState({ arrValidation, messError: true, isLoadding: false });
        }
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
    const { messError, arrValidation, isLoadding } = this.state;
    return (
      <div className={classes.blockStep}>
        <Typography variant="h4" className={classes.titleForm}>
          取引先の新規登録
        </Typography>
        <Typography className={classes.titleSubForm}>メールの確認</Typography>
        {/* form company step1 */}
        <div className={classes.formCompany}>
          <Typography className={classes.titleChildForm}>
            メールに記してパスワードを入力して、ログインして下さい。
          </Typography>
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
          {messError === true && (
            <Typography className={classes.textError}>
              パスワードが正しくありません。
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
                ログイン
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
  appProps: PropTypes.object,
  companyProps: PropTypes.object,
  nextStep: PropTypes.func,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  const { companyState } = state;
  return {
    companyProps: companyState
  };
};
export default withCookies(
  connect(mapStateToProps)(withRoot(withStyles(styles)(CompanyStep1)))
);
