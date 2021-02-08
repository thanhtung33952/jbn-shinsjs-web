/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// jss
const styles = () => ({
  controlForm: {
    color: "#222",
    marginLeft: 0
  },
  checkbox: {
    padding: 0,
    marginRight: 2
  }
});
class CheckboxRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };
  }
  // khi data cha cập nhật thì tui là con tui cũng phải cập nhật tức thì
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    this.setState({ value: parseInt(nextProps.value) === 1 ? true : false });
  };
  handleChange = e => {
    let val = e.target.checked;
    this.setState({ value: val });
    this.props.handleUpdate(val ? 1 : 0);
  };
  render = () => {
    const { classes, label } = this.props;
    return (
      <React.Fragment>
        <FormControlLabel
          className={`${classes.controlForm}  ${this.props.customStyleRoot} `}
          control={
            <Checkbox
              className={classes.checkbox}
              value={this.state.value}
              onChange={e => this.handleChange(e)}
            />
          }
          label={label}
        />
      </React.Fragment>
    );
  };
}
CheckboxRecordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  customStyleRoot: PropTypes.node,
  value: PropTypes.number,
  label: PropTypes.string,
  handleUpdate: PropTypes.func
};
export default withRoot(withStyles(styles)(CheckboxRecordForm));
