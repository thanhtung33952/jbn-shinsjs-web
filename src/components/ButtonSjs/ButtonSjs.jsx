import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  btnLogin: {
    backgroundColor: theme.palette.green.light,
    border: "none",
    color: "#fff",
    borderRadius: 0,
    padding: "0px 20px",
    textTransform: "none",
    minHeight: 45,
    fontSize: 14,
    margin: "auto",
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    "&:hover": {
      backgroundColor: theme.palette.pink.main,
      "&:after": {
        borderLeftColor: theme.palette.pink.main
      }
    },
    "&:after": {
      content: '""',
      position: "absolute",
      transition: "all ease 250ms",
      right: -17,
      top: 0,
      borderLeft: "solid 17px #5bad84",
      borderTop: "solid 23px transparent",
      borderBottom: "solid 22px transparent",
      [device.tablet]: {
        right: -16,
        borderTopWidth: "18px !important",
        borderBottomWidth: "17px !important"
      }
    },
    [device.tablet]: {
      minHeight: 35,
      padding: "0 10px"
    }
  },
  notIconRow: {
    "&:after": {
      content: "none"
    }
  }
});
class ButtonSjs extends React.Component {
  handleClick = () => {
    if (typeof this.props.onClick === "function") {
      this.props.onClick();
    }
  };
  render = () => {
    const { classes, isIconRow } = this.props;
    return (
      <React.Fragment>
        <Button
          variant="outlined"
          className={`${classes.btnLogin} ${this.props.customStyleRoot} ${
            isIconRow === false ? classes.notIconRow : " "
          }`}
          onClick={this.handleClick}
        >
          {this.props.textButton}
        </Button>
      </React.Fragment>
    );
  };
}
ButtonSjs.propTypes = {
  classes: PropTypes.object.isRequired,
  customStyleRoot: PropTypes.node,
  textButton: PropTypes.string,
  onClick: PropTypes.func,
  isIconRow: PropTypes.bool
};
export default withRoot(withStyles(styles)(ButtonSjs));
