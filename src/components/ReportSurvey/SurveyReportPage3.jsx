import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
// img
import imgContent from "assets/img/03.jpg";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line no-unused-vars
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";

// jss
const styles = () => ({
  root: {
    // height: "100%",
    border: "1px solid gray",
    position: "relative",
    marginBottom: 80,
    padding: "20px 15px"
  },
  line: {
    height: 28,
    backgroundColor: "#213858"
  },
  grMain: {
    color: "#213858",
    padding: "0 80px",
    "& h1": {
      fontSize: 30,
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
  }
});
class SurveyReportPage3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.props.updateStatusPage("page3");
  };
  render = () => {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Divider className={classes.line} />
        <div className={classes.grMain}>
          <Typography component="h1">調査方法概要</Typography>
          <img
            src={imgContent}
            alt="table"
            style={{ display: "block", width: "100%" }}
          />
        </div>
        <Divider className={classes.line} style={{ height: 15 }} />
      </Paper>
    );
  };
}

SurveyReportPage3.propTypes = {
  classes: PropTypes.object.isRequired,
  updateStatusPage: PropTypes.func
};
export default withRoot(withStyles(styles)(SurveyReportPage3));
