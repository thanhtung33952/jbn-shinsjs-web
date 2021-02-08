import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonSjs from "components/ButtonSjs/ButtonSjs.jsx";
import TextFieldSjs from "components/TextFieldSjs/TextFieldSjs.jsx";
import TextField from "@material-ui/core/TextField";
// icon material
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// icon img
import IconListBack from "assets/img/iconlistback.png";
// jss
import styles from "assets/jss/views/Person/stylePersonStep2.jsx";

class PersonStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "activeDuty",
      isErrorAll: true,
      arrValidation: {
        date1: {
          name: "date1",
          isRequire: true,
          isError: false,
          value: ""
        },
        linkageRoom1: {
          name: "linkageRoom1",
          isRequire: true,
          isError: false,
          value: ""
        },
        position1: {
          name: "position1",
          isRequire: true,
          isError: false,
          value: ""
        },
        date2: {
          name: "date2",
          isRequire: true,
          isError: false,
          value: ""
        },
        linkageRoom2: {
          name: "linkageRoom2",
          isRequire: true,
          isError: false,
          value: ""
        },
        position2: {
          name: "position2",
          isRequire: true,
          isError: false,
          value: ""
        },
        story: {
          name: "story",
          isRequire: true,
          isError: false,
          value: ""
        }
      }
    };
  }
  handleChangeStatus = event => {
    this.setState({ status: event.currentTarget.value });
  };
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
    // xử lý hoàn thành step 2
    if (nextStep) {
      this.props.nextStep(2);
    }
  };
  isValidation = (isError, nameField, value) => {
    const { arrValidation } = this.state;
    arrValidation[`${nameField}`]["isError"] = isError;
    arrValidation[`${nameField}`]["value"] = value;
    this.setState({ arrValidation });
  };
  render = () => {
    const { classes } = this.props;
    const { status, arrValidation } = this.state;
    return (
      <div className={classes.blockStep}>
        <Typography variant="h4" className={classes.titleForm}>
          ユーザープロフィール
        </Typography>
        <Typography className={classes.titleSubForm}>所属、役職</Typography>
        {/* form person step2 */}
        <div className={classes.formCompany}>
          <div className={classes.formGroup}>
            <label htmlFor="日付：">日付：</label>
            <TextFieldSjs
              placeholder="日付"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.date1.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.date1.name}
              value={arrValidation.date1.value}
            />
            <label className={classes.labEndRow}>
              日付を選択
              <img src={IconListBack} alt="Back" />
            </label>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="所属部署：">所属部署：</label>
            <TextFieldSjs
              placeholder="所属部署"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.linkageRoom1.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.linkageRoom1.name}
              value={arrValidation.linkageRoom1.value}
            />
            <label className={classes.labEndRow}>
              部署を選択
              <img src={IconListBack} alt="Back" />
            </label>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="役職：">役職：</label>
            <TextFieldSjs
              placeholder="役職"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.position1.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.position1.name}
              value={arrValidation.position1.value}
            />
            <label className={classes.labEndRow}>
              役職を選択
              <img src={IconListBack} alt="Back" />
            </label>
          </div>
          <Typography className={classes.noteForm}>if 兼務</Typography>
          <div className={classes.formGroup}>
            <label htmlFor="日付：">日付：</label>
            <TextFieldSjs
              placeholder="日付"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.date2.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.date2.name}
              value={arrValidation.date2.value}
            />
            <label className={classes.labEndRow}>
              日付を選択
              <img src={IconListBack} alt="Back" />
            </label>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="所属部署：">所属部署：</label>
            <TextFieldSjs
              placeholder="所属部署"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.linkageRoom2.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.linkageRoom2.name}
              value={arrValidation.linkageRoom2.value}
            />
            <label className={classes.labEndRow}>
              部署を選択
              <img src={IconListBack} alt="Back" />
            </label>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="役職：">役職：</label>
            <TextFieldSjs
              placeholder="役職"
              required={true}
              customStyleRoot={classes.rowInputForm}
              isErrorProps={arrValidation.position2.isError}
              handelValidation={this.isValidation}
              nameField={arrValidation.position2.name}
              value={arrValidation.position2.value}
            />
            <label className={classes.labEndRow}>
              役職を選択
              <img src={IconListBack} alt="Back" />
            </label>
          </div>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <div
            className={classes.formGroup}
            style={{ justifyContent: "flex-start" }}
          >
            <label htmlFor="ステータス：">ステータス：</label>
            <div className={classes.rowBtnStatus}>
              <Button
                variant="outlined"
                value="activeDuty"
                onClick={this.handleChangeStatus}
                className={`${classes.btnStatus} ${
                  status === "activeDuty" ? classes.activeStatus : ""
                }`}
              >
                現役
              </Button>
              <Button
                variant="outlined"
                value="leave"
                onClick={this.handleChangeStatus}
                className={`${classes.btnStatus} ${
                  status === "leave" ? classes.activeStatus : ""
                }`}
              >
                休職
              </Button>
              <Button
                variant="outlined"
                value="retirement"
                onClick={this.handleChangeStatus}
                className={`${classes.btnStatus} ${
                  status === "retirement" ? classes.activeStatus : ""
                }`}
              >
                退職
              </Button>
            </div>
          </div>
          <div className={classes.formGroupButton}>
            <ButtonSjs textButton="追加する" isIconRow={false} />
          </div>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <div className={classes.formGroup}>
            <label htmlFor="経歴：">経歴：</label>
            <TextField
              multiline={true}
              rows={2}
              rowsMax={2}
              className={classes.textAreaForm}
              margin="normal"
              variant="outlined"
              value="2018-11-01	地盤ネット株式会社／地盤ネット事業本部	本部長
              2018-11-01	地盤ネット株式会社／地盤ネット事業本部	本部長
              2018-11-01	地盤ネット株式会社／地盤ネット事業本部	本部長"
            />
          </div>
          <Divider
            classes={{
              root: classes.lineForm
            }}
          />
          <div className={classes.formGroup}>
            <label htmlFor="システムコード：" style={{ lineHeight: "20px" }}>
              システムコード：
            </label>
            <span style={{ fontWeight: 600, color: "#222" }}>
              jibannetG.jibannet.jibannetD
            </span>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="ロール：">ロール：</label>
            <Typography className={`${classes.roleItem} ${classes.roleActive}`}>
              <CheckCircleIcon />
              mamager
            </Typography>
            <Typography className={`${classes.roleItem}`}>
              <CheckCircleIcon />
              staff
            </Typography>
          </div>
        </div>
      </div>
    );
  };
}

PersonStep2.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func
};

export default withRoot(withStyles(styles)(PersonStep2));
