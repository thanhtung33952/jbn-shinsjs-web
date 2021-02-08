import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// component custommer
import FormReport14 from "components/ReportSurvey/FormReport14.jsx";

// jss
const styles = () => ({
  root: {
    // height: "100%",
    border: "1px solid gray",
    position: "relative",
    marginBottom: 80,
    padding: "20px 0px"
  },
  line: {
    height: 28,
    backgroundColor: "#213858"
  },
  grMain: {
    color: "#213858",
    paddingBottom: 20,
    paddingLeft: 20,
    overflow: "auto",
    position: "relative",
    minHeight: 1250,
    "& h1": {
      marginBottom: 10,
      fontSize: 28,
      fontWeight: 900,
      letterSpacing: 1,
      color: "#213858",
      position: "relative",
      lineHeight: "48px",
      display: "block",
      borderBottom: "dashed 1px #777",
      marginTop: 30,
      width: "100%"
    }
  },
  no: {
    height: 35,
    backgroundColor: "rgb(37,87,46)",
    lineHeight: "32px",
    fontSize: 18,
    color: "#fff",
    paddingLeft: 10,
    marginTop: 50,
    marginBottom: 5
  }
});
class SurveyReportPage13 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.props.updateStatusPage(
      this.props.numberNoStart === 1 ? "page151" : "page152"
    );
  };
  render = () => {
    const { classes, id, numberNoStart } = this.props;
    // console.log(id, numberNoStart)
    return (
      <Paper className={classes.root}>
        <Divider className={classes.line} />
        <div className={classes.grMain}>
          <Typography component="h1">
            サウンディング柱状図一覧表 {numberNoStart}
          </Typography>
          {/* <div className={classes.no}>換算N値柱状図</div>
          <span style={{ marginBottom: 600, display: "block" }}>
            SWSデータの加工図が入ります（物件IDのSWSデータ）
          </span> */}
          {id && (
            <FormReport14
              surveyId={id ? id : null}
              numberNoStart={numberNoStart}
            />
          )}
        </div>
        <Divider className={classes.line} style={{ height: 15 }} />
      </Paper>
    );
  };
}

SurveyReportPage13.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  numberNoStart: PropTypes.number,
  updateStatusPage: PropTypes.func
};
export default withRoot(withStyles(styles)(SurveyReportPage13));
