import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import { matchPath } from "react-router";
import axios from "axios";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
// constant
import { folderRoot } from "constant/index.js";
// layout
import Master3Col from "layout/Master3Col.jsx";
// component custommer
import RecordFormReport from "components/Survey/RecordFormReport.jsx";
// constant
import { apiRoot } from "constant/index.js";
// jss
const styles = {
  content: {
    padding: "20px 20px 150px"
  },
  rowBtnPage: {
    display: "flex",
    "& button": {
      margin: "0 5px",
      padding: 0,
      minWidth: 45,
      border: "solid 1px #007c77",
      borderRadius: 0,
      fontSize: 16,
      color: "#007c77"
    }
  },
  select: {
    backgroundColor: "#007c77 !important",
    color: "#fff !important"
  },
  errorPage: {
    textAlign: "center",
    "& h2": {
      fontSize: 35,
      marginTop: "10%"
    },
    "& svg": {
      color: "darkslategrey"
    }
  },
  loaddingPage: {
    marginTop: "10%"
  }
};

class SurveySws extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaddingPage: 0,
      surveyId: null
    };
  }
  componentDidMount = () => {
    document.title = "地盤調査報告書　SWSデータ入力用";
    let currentLocation = this.props.location.pathname;
    let match = matchPath(currentLocation, {
      path: `${folderRoot}survey/sws/:id`,
      exact: true,
      strict: false
    });

    if (match !== null && match.params.id) {
      // kiểm trả xem survey này có tồn tại không
      this.isCheckSurveyById(match.params.id);
    } else {
      // khoon ton tai survey id => falid
      this.setState({ surveyId: null });
      setTimeout(() => {
        this.setState({ isLoaddingPage: -1 });
      }, 800);
    }
  };
  isCheckSurveyById = async id => {
    try {
      const res = await axios.get(`${apiRoot}/checksurvey/${id}`);
      // Failed
      if (res.status !== 200) {
        this.setState({ isLoaddingPage: -1 });
        return;
      }
      // survey id tồn tại
      this.setState({ isLoaddingPage: 1, surveyId: id });
    } catch (error) {
      this.setState({ isLoaddingPage: -1 });
      return;
    }
  };

  render = () => {
    const { classes } = this.props;
    const { surveyId, isLoaddingPage } = this.state;

    if (isLoaddingPage === 0) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={"100%"}
          breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541"
        >
          <div className={classes.errorPage}>
            <CircularProgress size={50} className={classes.loaddingPage} />
          </div>
        </Master3Col>
      );
    }
    if (isLoaddingPage === -1) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={"100%"}
          breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541"
        >
          <div className={classes.errorPage}>
            <Typography component="h2">Oops, something went wrong!</Typography>
          </div>
        </Master3Col>
      );
    }

    return (
      <Master3Col
        colLeft={null}
        colRight={null}
        maxWidthPage={"100%"}
        breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541"
      >
        <div className={classes.content}>
          <RecordFormReport surveyId={surveyId ? surveyId : null} />
        </div>
      </Master3Col>
    );
  };
}

SurveySws.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object
};
export default withRoot(withStyles(styles)(SurveySws));
