/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// jss
const styles = theme => ({
  rowInputForm: {
    margin: 0,
    minWidth: "70%",
    "& p": {
      marginLeft: 0
    }
  },
  text: {
    "& $rootInput": {
      padding: 0
    }
  },
  rootInput: {
    "& fieldset": {
      borderRadius: 0,
      borderColor: "transparent",
      backgroundColor: "#fff"
    }
  },
  thisInputError: {
    "& fieldset": {
      borderColor: theme.palette.pink.main + `${"!important"}`
    }
  },
  thisInput: {
    padding: 8,
    borderRadius: 0,
    zIndex: 2
  }
});
class TextFieldRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  // khi data cha cập nhật thì tui là con tui cũng phải cập nhật tức thì
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    this.setState({ value: nextProps.value });
  };
  handleChange = e => {
    let val = e.target.value;
    this.setState({ value: val });
  };
  handleBlur = () => {
    let val = this.state.value;
    this.props.handleUpdate(val);
  };
  render = () => {
    const { classes, multiline, rows, rowsMax, placeholder, type } = this.props;
    const { value } = this.state;
    // console.log(permission)
    return (
      <React.Fragment>
        <TextField
          multiline={multiline}
          rows={rows}
          rowsMax={rowsMax}
          className={`${classes.rowInputForm}  ${this.props.customStyleRoot} ${
            multiline ? classes.text : ""
          } `}
          placeholder={placeholder}
          value={value ? value : ""}
          type={type}
          margin="normal"
          variant="outlined"
          InputProps={{
            classes: {
              root: classes.rootInput,
              input: classes.thisInput
            }
          }}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  };
}
TextFieldRecordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  customStyleRoot: PropTypes.node,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  handleUpdate: PropTypes.func
};
export default withRoot(withStyles(styles)(TextFieldRecordForm));
