import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// jss
import styles from "assets/jss/views/Company/styleCompanyStep4.jsx";

class CompanyStep4 extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChangeRole = event => {
    this.setState({ role: event.currentTarget.value });
  };
  render = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h5" className={classes.titleForm}>
          担当者の登録
        </Typography>
        {/* form company step2 */}
        <div className={classes.formCompany}>
          <Typography className={classes.resultSendmail}>
            0000様 <br/>
            name@mail.com<br/>
            宛にメールしました。<br/><br/>
            メールを確認してください。<br/><br/>
            送信したメールにある<br/>
            リンクをクリックしていただき<br/>
            登録手続きを進めてください。<br/><br/>
            ありがとうございました。
          </Typography>
        </div>
      </React.Fragment>
    );
  };
}

CompanyStep4.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(CompanyStep4));
