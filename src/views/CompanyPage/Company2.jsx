import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { matchPath } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// icon material
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
// redux action
import { setInfoUserTemp } from "actions/companyActions.js";
// layout
import Master3Col from "layout/Master3Col.jsx";
// constant
import { apiRoot, folderRoot } from "constant/index.js";
// component project
import KnownledBase from "components/KnownledBase/KnownledBase.jsx";
import CompanyStep1 from "components/CompanyPage/CompanyStep1.jsx";
import CompanyStep2 from "components/CompanyPage/CompanyStep2.jsx";
import CompanyStep3 from "components/CompanyPage/CompanyStep3.jsx";
import CompanyStep4 from "components/CompanyPage/CompanyStep4.jsx";
import CompanyStep5 from "components/CompanyPage/CompanyStep5.jsx";
import StepSjs from "components/StepSjs/StepSjs.jsx";
// jss
import styles from "assets/jss/views/styleCompany.jsx";

class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        "登録申請ユーザーの仮登録",
        "取引先の仮登録",
        "会社の登録（本登録）",
        "登録者の登録（本登録）",
        ""
      ],
      isStatusPage: 0, // 0: loadding page, -1 id user tren url khong ton tai, 1: xử lý buoc tiep theo
      activeStep: 0
    };
  }
  componentDidMount = async () => {
    const { dispatch, companyProps } = this.props;
    const userTempInfo = companyProps.userTempInfo;
    let currentLocation = this.props.location.pathname;
    let match = matchPath(currentLocation, {
      path: `${folderRoot}company/:uid`,
      exact: true,
      strict: false
    });
    if (match && match.params && match.params.uid) {
      let uid = match.params.uid;
      let isCheckUserTemp = await this.isCheckUserTemp(uid);
      if (!isCheckUserTemp && uid !== userTempInfo.paramUserTempId) {
        // user chưa tồn tại => cho phép tới step2
        dispatch(setInfoUserTemp({ paramUserTempId: uid }));
        this.setState({ activeStep: 1, isStatusPage: 1 });
      } else {
        this.setState({ isStatusPage: -1 });
      }
    } else {
      this.setState({ isStatusPage: 1 });
    }
  };
  isCheckUserTemp = async userId => {
    try {
      const res = await axios.post(`${apiRoot}/temp/user/checkexistuser`, {
        id: userId
      });
      // Failed -> chua co email nay trong db
      if (res.status !== 200) {
        return false;
      }
      // success -> da ton tai email nay
      return true;
    } catch (error) {
      return false;
    }
  };
  handleChangeStep = step => {
    this.setState({ activeStep: step });
  };
  renderStep = step => {
    switch (step) {
      case 0:
        return <CompanyStep1 nextStep={this.handleChangeStep} />;
      case 1:
        return <CompanyStep2 nextStep={this.handleChangeStep} />;
      case 2:
        return <CompanyStep3 nextStep={this.handleChangeStep} />;
      case 3:
        return <CompanyStep4 nextStep={this.handleChangeStep} />;
      case 4:
        return <CompanyStep5 />;
      default:
        return "Company Step 6 ...";
    }
  };
  render = () => {
    const { classes } = this.props;
    const { isStatusPage, steps, activeStep } = this.state;

    const leftCol = (
      <React.Fragment>
        <Typography className={classes.titleStep}>
          <CheckCircleIcon className={classes.iconCheckStep} />
          <span>新規登録の流れ</span>
        </Typography>
        <StepSjs arrSteps={steps} numberActive={activeStep} />
        {/* <div className={classes.blockButton}>
          <Button variant="outlined" className={classes.button}>
            Creating
          </Button>
          <Button variant="outlined" className={classes.button}>
            Complete
          </Button>
          <Button variant="outlined" className={classes.button}>
            Coding
          </Button>
        </div> */}
      </React.Fragment>
    );

    if (isStatusPage === 0) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          breadcrumb="トップ ＞ 取引先 ＞ 取引先の新規登録"
          maxWidthPage="100%"
        >
          <div className={classes.errorPage}>
            <CircularProgress size={50} className={classes.loaddingPage} />
          </div>
        </Master3Col>
      );
    }
    if (isStatusPage === -1) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          breadcrumb="トップ ＞ 取引先 ＞ 取引先の新規登録"
          maxWidthPage="100%"
        >
          <div className={classes.errorPage}>
            <Typography component="h2">Oops, something went wrong!</Typography>
          </div>
        </Master3Col>
      );
    }
    return (
      <Master3Col
        colLeft={leftCol}
        colRight={<KnownledBase />}
        maxWidthPage="100%"
        breadcrumb="トップ ＞ 取引先 ＞ 取引先の新規登録"
      >
        <Grid container spacing={0} style={{ height: "100%", paddingTop: 30 }}>
          <Grid item xs={9}>
            {this.renderStep(activeStep)}
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Master3Col>
    );
  };
}

CompanyPage.propTypes = {
  classes: PropTypes.object.isRequired,
  companyProps: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  match: PropTypes.object
};
const mapStateToProps = state => {
  const { companyState } = state;
  return {
    companyProps: companyState
  };
};
export default withRouter(
  connect(mapStateToProps)(withRoot(withStyles(styles)(CompanyPage)))
);
