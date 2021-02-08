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
class TextFieldCompany extends React.Component {
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
  // check password invalid
  checkPasswordInvalid = value => {
    // check ký tự 1 byte
    let byteLen = 0;
    for (let i = 0; i < value.length; i++) {
      let c = value.charCodeAt(i);
      byteLen +=
        c < 1 << 7
          ? 1
          : c < 1 << 11
          ? 2
          : c < 1 << 16
          ? 3
          : c < 1 << 21
          ? 4
          : c < 1 << 26
          ? 5
          : c < 1 << 31
          ? 6
          : Number.NaN;
    }

    // xác thực chữ thường
    let lowerCaseLetters = /[a-z]/g;
    // xác thực chữ HOA
    let upperCaseLetters = /[A-Z]/g;
    // xác thực numbers
    let numbers = /[0-9]/g;
    if (
      !value ||
      !value.match(lowerCaseLetters) ||
      !value.match(upperCaseLetters) ||
      !value.match(numbers) ||
      value.length < 8 ||
      byteLen > value.length
    ) {
      return false;
    } else {
      return true;
    }
  };
  handleBlur = () => {
    const {
      isNumber,
      isEmail,
      isURL,
      isPhone,
      isPassword,
      required
    } = this.props;
    // const { isError, messageError } = this.state;
    let val = this.state.value;
    let isErrorP = false;
    this.setState({
      isError: false,
      messageError: ""
    });
    if (required) {
      if (val !== "") {
        // check is password
        if (isPassword) {
          if (!this.checkPasswordInvalid(val)) {
            this.setState({
              isError: true,
              messageError: "パスワードが弱すぎる"
            });
            isErrorP = true;
          } else {
            this.setState({ isError: false, messageError: "" });
            isErrorP = false;
          }
        }
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
          // let phoneno = /^(?:\d{11}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/;
          let phoneno = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
          if (!val.match(phoneno)) {
            this.setState({
              isError: true,
              messageError: "正しい電話番号の形式で入力して下さい"
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
          messageError: "必須項目。入力をお願いします。"
        });
        isErrorP = true;
      }
    } else {
      // check is password
      if (isPassword) {
        if (!this.checkPasswordInvalid(val)) {
          this.setState({
            isError: true,
            messageError: "パスワードが弱すぎる"
          });
          isErrorP = true;
        } else {
          this.setState({ isError: false, messageError: "" });
          isErrorP = false;
        }
      }
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
        let phoneno = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        // let phoneno =/^\(?(\d{2})\)?[-]?(\d{3})[-]?(\d{4})$/;
        //  let phoneno = /^((\+)?[0-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,4}$/;
        if (!val.match(phoneno)) {
          this.setState({
            isError: true,
            messageError: "正しい電話番号の形式で入力して下さい"
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
TextFieldCompany.propTypes = {
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
  isPassword: PropTypes.bool,
  isEmail: PropTypes.bool,
  isURL: PropTypes.bool,
  isPhone: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  handelValidation: PropTypes.func
};
export default withRoot(withStyles(styles)(TextFieldCompany));
// Usesing Demo
// <TextFieldCompany
//   placeholder="例）ABC産業"
//   isNumber={false}
//   isEmail={false}
//   isURL={false}
//   isPhone={true}
//   required={true}
// />
