import React from "react";
import { Redirect } from "react-router-dom";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// contant
import { folderRoot } from "constant/index.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
// layout
// import Master3Col from "layout/Master3Col.jsx";
// jss
import styles from "assets/jss/views/styleHomePage.jsx";

class HomePage extends React.Component {
  render = () => {
    // const { classes } = this.props;
    return <Redirect to={`${folderRoot}dashboard`} />;
    // return (
    //   <Master3Col>
    //     <span>Home</span>
    //   </Master3Col>
    // );
  };
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(HomePage));
