import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// customer component
import ButtonSjs from "components/ButtonSjs/ButtonSjs.jsx";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

// jss
import styles from "assets/jss/views/Company/styleCompanyStep1.jsx";

class CompanyStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      listChecked: [
        { id: 1, isCheck: false, value: "" },
        { id: 2, isCheck: false, value: "" },
        { id: 3, isCheck: false, value: "" },
        { id: 4, isCheck: false, value: "" }
      ]
    };
  }
  handleNextStep = () => {
    // return value đã check để => todo
    let arrValCheck = [];
    this.state.listChecked.map(item => {
      if (item.isCheck) {
        arrValCheck.push(item.value);
      }
    });
    // xử lý hoàn thành step 1
    if (arrValCheck.length > 0) {
      this.setState({ isError: false });
      this.props.nextStep(1);
    } else {
      this.setState({ isError: true });
    }
  };
  handleChange = idCheck => event => {
    const { listChecked } = this.state;
    let isChecked = event.target.checked;
    const newCheckList = listChecked.map(item => {
      if (item.id === idCheck) {
        return {
          ...item,
          isCheck: isChecked,
          value: event.target.value
        };
      }
      return item;
    });
    this.setState({ isError: false, listChecked: newCheckList });
  };
  render = () => {
    const { classes } = this.props;
    const { isError, listChecked } = this.state;
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
          <div className={classes.formGroup}>
            <label htmlFor="iconCheck">
              {listChecked[0].isCheck == true && <Check />}
            </label>
            <Checkbox
              checked={listChecked[0].isCheck}
              onChange={this.handleChange(1)}
              icon={"地盤の調査依頼"}
              checkedIcon={"地盤の調査依頼"}
              value="地盤の調査依頼"
              classes={{
                root: `${classes.defaultCheck} ${
                  isError == true ? classes.errorCheck : ""
                }`,
                checked: classes.checkCheck
              }}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="iconCheck">
              {listChecked[1].isCheck == true && <Check />}
            </label>
            <Checkbox
              checked={listChecked[1].isCheck}
              onChange={this.handleChange(2)}
              icon={"地盤の補償依頼"}
              checkedIcon={"地盤の補償依頼"}
              value="地盤の補償依頼"
              classes={{
                root: `${classes.defaultCheck} ${
                  isError == true ? classes.errorCheck : ""
                }`,
                checked: classes.checkCheck
              }}
            />
          </div>
          <Typography className={classes.noteForm} style={{ marginTop: 30 }}>
            地盤の調査・改良工事の実施
          </Typography>
          <div className={classes.formGroup}>
            <label htmlFor="iconCheck">
              {listChecked[2].isCheck == true && <Check />}
            </label>
            <Checkbox
              checked={listChecked[2].isCheck}
              onChange={this.handleChange(3)}
              icon={"地盤調査の実施"}
              checkedIcon={"地盤調査の実施"}
              value="地盤調査の実施"
              classes={{
                root: `${classes.defaultCheck} ${
                  isError == true ? classes.errorCheck : ""
                }`,
                checked: classes.checkCheck
              }}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="iconCheck">
              {listChecked[3].isCheck == true && <Check />}
            </label>
            <Checkbox
              checked={listChecked[3].isCheck}
              onChange={this.handleChange(4)}
              icon={"地盤改良工事の実施"}
              checkedIcon={"地盤改良工事の実施"}
              value="地盤改良工事の実施"
              classes={{
                root: `${classes.defaultCheck} ${
                  isError == true ? classes.errorCheck : ""
                }`,
                checked: classes.checkCheck
              }}
            />
          </div>
        </div>
        <div className={classes.formGroupButton}>
          <ButtonSjs textButton="保存して次へ" onClick={this.handleNextStep} />
        </div>
      </div>
    );
  };
}

CompanyStep1.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func
};

export default withRoot(withStyles(styles)(CompanyStep1));
