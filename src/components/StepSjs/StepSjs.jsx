import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
// jss

import styles from "assets/jss/components/styleStepSjs.jsx";

class StepSjs extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  shouldComponentUpdate = () => {
    return true;
  };
  render() {
    const { classes, arrSteps, numberActive } = this.props;
    const connector = (
      <StepConnector
        classes={{
          root: classes.connectorDefault,
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine
        }}
      />
    );
    return (
      <div className={classes.root}>
        <Stepper
          activeStep={numberActive}
          orientation="vertical"
          className={classes.bockStep}
          connector={connector}
        >
          {arrSteps.map(label => {
            return (
              <Step
                key={label}
                classes={{
                  root: classes.stepItem
                }}
              >
                <StepLabel
                  icon={" "}
                  StepIconProps={{
                    classes: {
                      root: classes.defaultIcon,
                      completed: classes.completedIcon,
                      active: classes.activeIcon
                    }
                  }}
                  classes={{
                    root: classes.defaultLabel,
                    completed: classes.completedLabel,
                    active: classes.activeLabel
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {/* <Typography className={classes.titleEndStep}>本登録へ</Typography> */}
      </div>
    );
  }
}
StepSjs.propTypes = {
  classes: PropTypes.object.isRequired,
  numberActive: PropTypes.number,
  arrSteps: PropTypes.array
};
export default withRoot(withStyles(styles)(StepSjs));
