import React from "react";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import { connect } from "react-redux";

import { withCookies, Cookies } from "react-cookie";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// jss
import styles from "assets/jss/views/Company/styleCompanyStep5.jsx";

class CompanyStep5 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  // constructor(props) {
  //   super(props);
  // }
  handleChangeRole = event => {
    this.setState({ role: event.currentTarget.value });
  };
  render = () => {
    const { classes, cookies } = this.props;
    const { companyProps } = this.props;
    const userTempInfo = companyProps.userTempInfo;
    // const userInfo = cookies.get("authUserShinSJS");
    let nameUser = userTempInfo.firstName + " " + userTempInfo.lastName;
    console.log(userTempInfo)
    return (
      <React.Fragment>
        <Typography variant="h5" className={classes.titleForm}>
          担当者の登録
        </Typography>
        {/* form company step2 */}
        <div className={classes.formCompany}>
          <Typography className={classes.resultSendmail}>
            {nameUser}様 <br />
            メールアドレスを確認しました。
            <br />
            ありがとうございました。
            <br />
            <br />
            以上で仮登録は終了です。
            <br />
            <br />
            本登録では、取引に必、要な各種情報、
            <br />
            本システムにアクセスできる担当者の追加登報、
            <br />
            <br />
            役割の設定（ロール）を行いまず。
            <br />
            <br />
            本登録が完了すると取引を開始できます。
            <br />
          </Typography>
          <Typography className={classes.noteAfterRegister}>
            登録内容の変更は 本登録後、「登録情報」
            <br />
            メニューから変更可能です。
          </Typography>
        </div>
      </React.Fragment>
    );
  };
}

CompanyStep5.propTypes = {
  classes: PropTypes.object.isRequired,
  companyProps: PropTypes.object
};
const mapStateToProps = state => {
  const { companyState } = state;
  return {
    companyProps: companyState
  };
};
export default withCookies(
  connect(mapStateToProps)(withRoot(withStyles(styles)(CompanyStep5)))
);
