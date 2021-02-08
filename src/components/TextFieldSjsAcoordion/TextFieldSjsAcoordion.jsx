/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// jss
import styles from "assets/jss/components/styleTextFieldSjsAcoordion.jsx";
class TextFieldSjs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: 0, // 0: normar , 1: ok, -1: error
      messageError: "",
      value: ""
    };
  }
  // eslint-disable-next-line react/no-deprecated
  componentWillMount = () => {
    this.setState({
      isError: this.props.isVali,
      value: this.props.value
    });
  };
  // khi data cha cập nhật thì tui là con tui cũng phải cập nhật tức thì
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    this.setState({ value: nextProps.value, isError: nextProps.isVali });
  };
  handleClick = () => {
    if (typeof this.props.onClick === "function") {
      this.props.onClick();
    }
  };
  handleChange = e => {
    let val = e.target.value;
    this.setState({ value: val });
  };
  handleBlur = () => {
    const { isNumber, isEmail, isURL, isPhone, required } = this.props;
    // const { isError, messageError } = this.state;
    let val = this.state.value;
    let isVali = 1,
      message = "";
    if (required) {
      if (val && val !== "") {
        // check is Number
        if (isNumber) {
          if (isNaN(val)) {
            isVali = -1;
            message = "有効な数値を入力してください";
          } else {
            isVali = 1;
            message = "";
          }
        }
        // check is Email
        if (isEmail) {
          // eslint-disable-next-line no-useless-escape
          var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          if (!re.test(String(val).toLowerCase())) {
            isVali = -1;
            message = "メールアドレスは有効がありません。";
          } else {
            isVali = 1;
            message = "";
          }
        }
        // check is Url
        if (isURL) {
          let pattern = new RegExp(
            /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
          );
          if (!pattern.test(val)) {
            isVali = -1;
            message = "入力は有効なURLではありません。";
          } else {
            isVali = 1;
            message = "";
          }
        }
        // check is Phone
        if (isPhone) {
          let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
          if (!val.match(phoneno)) {
            isVali = -1;
            message = "電話番号が無効です";
          } else {
            isVali = 1;
            message = "";
          }
        }
      } else {
        isVali = -1;
        message = "必ず入力してください。";
      }
    } else {
      // check is Number
      if (val && isNumber) {
        if (isNaN(val)) {
          isVali = -1;
          message = "有効な数値を入力してください";
        } else {
          isVali = 1;
          message = "";
        }
      }
      // check is Email
      if (val && isEmail) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(val).toLowerCase())) {
          isVali = -1;
          message = "メールアドレスは有効がありません。";
        } else {
          isVali = 1;
          message = "";
        }
      }
      // check is Url
      if (val && isURL) {
        let pattern = new RegExp(
          /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
        );
        if (!pattern.test(val)) {
          isVali = -1;
          message = "入力は有効なURLではありません。";
        } else {
          isVali = 1;
          message = "";
        }
      }
      // check is Phone
      if (val && isPhone) {
        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!val.match(phoneno)) {
          isVali = -1;
          message = "電話番号が無効です";
        } else {
          isVali = 1;
          message = "";
        }
      }
    }
    this.setState({
      isError: isVali,
      messageError: message
    });
    this.props.handleUpdate(isVali, val);
  };
  render = () => {
    const {
      classes,
      multiline,
      rows,
      rowsMax,
      placeholder,
      type,
      disabled,
      permission
    } = this.props;
    const { isError, messageError, value } = this.state;
    // console.log(permission)
    return (
      <React.Fragment>
        {/* permission == R thì hiển thị label (chỉ đọc) */}
        {permission === "R" ? (
          <TextField
            multiline={multiline}
            disabled={disabled}
            rows={rows}
            rowsMax={rowsMax}
            error={isError === -1 ? true : false}
            helperText={isError === -1 ? messageError : ""}
            className={`${classes.rowInputForm} ${
              classes.rowInputFormReadonly
            }  ${this.props.customStyleRoot} ${multiline ? classes.text : ""} `}
            placeholder={placeholder}
            value={value ? value : ""}
            type={type}
            margin="normal"
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.rootInput,
                input: classes.thisInput,
                error: classes.thisInputError
              }
            }}
          />
        ) : (
          <TextField
            multiline={multiline}
            disabled={disabled}
            rows={rows}
            rowsMax={rowsMax}
            error={isError === -1 ? true : false}
            helperText={isError === -1 ? messageError : ""}
            className={`${classes.rowInputForm}  ${
              this.props.customStyleRoot
            } ${multiline ? classes.text : ""} `}
            placeholder={placeholder}
            value={value ? value : ""}
            type={type}
            margin="normal"
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.rootInput,
                input: classes.thisInput,
                error: classes.thisInputError
              }
            }}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
        )}
      </React.Fragment>
    );
  };
}
TextFieldSjs.propTypes = {
  classes: PropTypes.object.isRequired,
  customStyleRoot: PropTypes.node,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  permission: PropTypes.string,
  textButton: PropTypes.string,
  onClick: PropTypes.func,
  isVali: PropTypes.number,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  isNumber: PropTypes.bool,
  isEmail: PropTypes.bool,
  isURL: PropTypes.bool,
  isPhone: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  handleUpdate: PropTypes.func
};
export default withRoot(withStyles(styles)(TextFieldSjs));
// Usesing Demo
// <TextFieldSjs
//   placeholder="例）ABC産業"
//   isNumber={false}
//   isEmail={false}
//   isURL={false}
//   isPhone={true}
//   required={true}
// />
