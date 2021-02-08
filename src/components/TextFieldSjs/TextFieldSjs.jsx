/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// jss
import styles from "assets/jss/components/styleTextFieldSjs.jsx";
class TextFieldSjs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      messageError: "",
      value: ""
    };
  }
  componentDidMount = () => {
    this.setState({
      messageError: ""
    });
  };
  // eslint-disable-next-line react/no-deprecated
  componentWillMount = () => {
    this.setState({
      isError: this.props.isErrorProps,
      value: this.props.value,
      messageError: ""
    });
  };
  // khi data cha cập nhật thì tui là con tui cũng phải cập nhật tức thì
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    if (!nextProps.isErrorProps) {
      this.setState({ messageError: "" });
    }
    this.setState({
      value: nextProps.value,
      isError: nextProps.isErrorProps
    });
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
    let isErrorP = false;
    this.setState({
      isError: false,
      messageError: ""
    });
    if (required) {
      if (val !== "") {
        // check is Number
        if (isNumber) {
          if (isNaN(val)) {
            this.setState({
              isError: true,
              messageError: "有効な数値を入力してください"
            });
            isErrorP = true;
          } else {
            this.setState({ isError: false, messageError: "" });
            isErrorP = false;
          }
        }
        // check is Email
        if (isEmail) {
          // eslint-disable-next-line no-useless-escape
          var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          if (!re.test(String(val).toLowerCase())) {
            this.setState({
              isError: true,
              messageError: "メールアドレスは有効がありません。"
            });
            isErrorP = true;
          } else {
            this.setState({ isError: false, messageError: "" });
            isErrorP = false;
          }
        }
        // check is Url
        if (isURL) {
          let pattern = new RegExp(
            /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
          );
          if (!pattern.test(val)) {
            this.setState({
              isError: true,
              messageError: "入力は有効なURLではありません。"
            });
            isErrorP = true;
          } else {
            this.setState({ isError: false, messageError: "" });
            isErrorP = false;
          }
        }
        // check is Phone
        if (isPhone) {
          let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
          if (!val.match(phoneno)) {
            this.setState({
              isError: true,
              messageError: "電話番号が無効です"
            });
            isErrorP = true;
          } else {
            this.setState({ isError: false, messageError: "" });
            isErrorP = false;
          }
        }
      } else {
        this.setState({
          isError: true,
          messageError: "必ず入力してください。"
        });
        isErrorP = true;
      }
    } else {
      // check is Number
      if (isNumber) {
        if (isNaN(val)) {
          this.setState({
            isError: true,
            messageError: "有効な数値を入力してください"
          });
          isErrorP = true;
        } else {
          this.setState({ isError: false, messageError: "" });
          isErrorP = false;
        }
      }
      // check is Email
      if (isEmail) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(val).toLowerCase())) {
          this.setState({
            isError: true,
            messageError: "メールアドレスは有効がありません。"
          });
          isErrorP = true;
        } else {
          this.setState({ isError: false, messageError: "" });
          isErrorP = false;
        }
      }
      // check is Url
      if (isURL) {
        let pattern = new RegExp(
          /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
        );
        if (!pattern.test(val)) {
          this.setState({
            isError: true,
            messageError: "入力は有効なURLではありません。"
          });
          isErrorP = true;
        } else {
          this.setState({ isError: false, messageError: "" });
          isErrorP = false;
        }
      }
      // check is Phone
      if (isPhone) {
        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!val.match(phoneno)) {
          this.setState({
            isError: true,
            messageError: "電話番号が無効です"
          });
          isErrorP = true;
        } else {
          this.setState({ isError: false, messageError: "" });
          isErrorP = false;
        }
      }
    }
    this.props.handelValidation(isErrorP, this.props.nameField, val);
  };
  render = () => {
    const { classes, placeholder, type, disabled } = this.props;
    const { isError, messageError, value } = this.state;
    return (
      <React.Fragment>
        <TextField
          error={isError}
          disabled={disabled}
          helperText={messageError}
          className={`${classes.rowInputForm}  ${this.props.customStyleRoot}`}
          placeholder={placeholder}
          value={value}
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
      </React.Fragment>
    );
  };
}
TextFieldSjs.propTypes = {
  classes: PropTypes.object.isRequired,
  customStyleRoot: PropTypes.node,
  textButton: PropTypes.string,
  nameField: PropTypes.string,
  onClick: PropTypes.func,
  isErrorProps: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  isNumber: PropTypes.bool,
  isEmail: PropTypes.bool,
  isURL: PropTypes.bool,
  isPhone: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  handelValidation: PropTypes.func
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
