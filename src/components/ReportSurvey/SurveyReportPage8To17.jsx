import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
// constant
import { folderRoot } from "constant/index.js";
// component custommer
import FormReportGroundSurvey from "components/ReportSurvey/FormReportGroundSurvey.jsx";

// jss
const styles = () => ({
  root: {
    // height: "100%",
    border: "1px solid gray",
    position: "relative",
    marginBottom: 80,
    padding: "20px 2px"
  },
  line: {
    height: 28,
    backgroundColor: "#213858"
  },
  grMain: {
    color: "#213858",
    paddingBottom: 20,
    overflow: "auto",
    minHeight: 500,
    "& h1": {
      marginBottom: 10,
      paddingLeft: 20,
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
    backgroundColor: "rgb(105, 105, 105)",
    lineHeight: "32px",
    fontSize: 18,
    color: "#fff",
    paddingLeft: 10,
    marginTop: 50,
    marginBottom: 5
  },
  rowBtnOption: {
    position: "absolute",
    top: -29,
    right: 0
  },
  linkRedirect: {
    padding: "4px 10px",
    border: "solid 1px #b3b3b3",
    color: "#000 !important",
    borderRadius: 0,
    textTransform: "none",
    textDecoration: "none",
    minHeight: 30,
    fontSize: 14,
    margin: 0,
    marginLeft: 5,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#72FCE9"
    }
  },
  btnAdd: {
    backgroundColor: "#007C76",
    padding: "0 20px",
    height: 30,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#01524e"
    }
  }
});
class SurveyReportPage8To17 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount = () => {
  //   let elBtn = document.getElementsByClassName("abc")[0];
  //   setTimeout(() => {

  //     console.log(elBtn)
  //   }, 1500);
  //   // elBtn.style.width = "700px";
  // };
  //add new point
  addNewPoint = async () => {
    this.props.handleChange();
  };
  render = () => {
    const {
      classes,
      id,
      no,
      customerCss,
      isEndPoint,
      updateStatusPageByNo
    } = this.props;
    // console.log(no)
    return (
      <Paper className={`${classes.root} ${customerCss ? customerCss : ""}`}>
        {/* button save/insert */}
        {/* <div className={classes.rowBtnOption}>
          <Link
            to={`${folderRoot}survey/sws/${id}`}
            target="_blank"
            className={classes.linkRedirect}
          >
            SWSデータ入力はこちらから→
          </Link>
        </div> */}
        {/* end button save */}
        <Divider className={classes.line} />
        <div className={classes.grMain}>
          <Typography component="h1" className="abc">
            スウェーデン式サウンディング試験
            {isEndPoint && (
              <Button
                className={classes.btnAdd}
                onClick={this.addNewPoint}
                style={{
                  borderRadius: 0,
                  float: "right",
                  marginTop: "10px",
                  width: "89px"
                }}
              >
                追加
              </Button>
            )}
          </Typography>
          {/* <div className={classes.no}>測点１</div>
          <span style={{ marginBottom: 600, display: "block" }}>
            SWSデータが入ります（物件IDのSWSデータ）
          </span> */}
          {id && (
            <FormReportGroundSurvey
              surveyId={id ? id : null}
              no={no}
              updateStatusPageByNo={updateStatusPageByNo}
            />
          )}
        </div>
        <Divider className={classes.line} style={{ height: 15 }} />
      </Paper>
    );
  };
}

SurveyReportPage8To17.propTypes = {
  classes: PropTypes.object.isRequired,
  customerCss: PropTypes.node,
  id: PropTypes.string,
  no: PropTypes.string,
  isEndPoint: PropTypes.bool,
  updateStatusPageByNo: PropTypes.func
};
export default withRoot(withStyles(styles)(SurveyReportPage8To17));
