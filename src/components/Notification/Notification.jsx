import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
// @material-ui components
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
// jss
import styles from "assets/jss/components/styleNotification.jsx";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};
class MySnackbarContent extends React.Component {
  // constructor() {
  //   super();
  // }
  render() {
    const { classes, className, message, onClose, variant } = this.props;
    const Icon = variantIcon[variant];
    return (
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        classes={{
          message: classNames(className)
        }}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    );
  }
}
MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};
// ví dụ sử dụng component này
/* <Snackbar
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "center"
  }}
  open={isSnackTag}
  autoHideDuration={6000}
  onClose={this.handleCloseSnack}
>
  <Notification
    onClose={this.handleCloseSnack}
    variant={error === true ? "error" : "success"}
    message={error === true ? "Register faild" : "Register success"}
  />
</Snackbar> */
export default withRoot(withStyles(styles)(MySnackbarContent));
