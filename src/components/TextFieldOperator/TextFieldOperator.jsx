/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
// icon material
import ErrorIcon from "@material-ui/icons/Error";
// jss
const styles = () => ({
  InputTable: {
    padding: 0,
    width: "100% !important",
    fontSize: 13,
    "& input": {
      padding: "5px 5px 6px"
    }
  },
  rowDouble: {
    width: "100% !important",
    display: "flex",
    padding: "0 4px",
    "& label": {
      minWidth: 35,
      textAlign: "left",
      paddingTop: 5,
      fontSize: 12
    }
  },
  rowInputDate: {
    margin: 0,
    width: "100%"
  },
  inputRootDate: {
    border: "none",
    background: "none",
    color: "#222",
    fontSize: 13,
    "&:after": {
      content: "none"
    },
    "&:before": {
      content: "none"
    }
  },
  inputInputDate: {
    padding: 5
  },
  iconError: {
    color: "#da3f3f",
    fontSize: 20,
    margin: "auto",
    cursor: "pointer"
  }
});
const today = new Date();
const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "#da3f3f",
    color: "#ffffff",
    maxWidth: 240,
    border: "1px solid #dadde9",
    padding: "5px 8px",
    margin: "0 5px",
    "& span": {
      fontSize: 12,
      "& u": {
        fontSize: 15,
        textDecoration: "none",
        letterSpacing: "0.5px"
      },
      "& i": {
        fontStyle: "italic",
        color: "#ff0",
        marginLeft: 5,
        letterSpacing: "0.7px"
      }
    }
  }
}))(Tooltip);
class TextFieldOperator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorStr: false,
      isErrorFrom: false,
      isErrorTo: false,
      formatSQL: ""
      // placeholder: "abc",
      // messageError: "",
      // value: ""
    };
  }
  // componentDidMount = () => {
  //   this.setState({
  //     messageError: ""
  //   });
  // };
  // eslint-disable-next-line react/no-deprecated
  componentWillMount = () => {
    // let labelPlaceholder = this.getPlaceholder(this.props.operator);
    // this.setState({
    //   value: this.props.value
    // });
  };
  // khi data cha cập nhật thì tui là con tui cũng phải cập nhật tức thì
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    if (typeof nextProps.value === "string") {
      this.checkValidation(nextProps.operator, nextProps.value);
    } else {
      // value dạng obj {from: "", to: ""}
      // error value from
      let isErrorFrom = this.checkValidation(
        nextProps.operator,
        nextProps.value.from
      );
      let formatSQL = this.getPlaceholder(nextProps.operator);
      this.setState({ isErrorFrom: isErrorFrom, formatSQL: formatSQL });

      // error value to
      let isErrorTo = this.checkValidation(
        nextProps.operator,
        nextProps.value.to
      );
      this.setState({ isErrorTo: isErrorTo });
    }
  };

  handleChange = (e, nameChild) => {
    let val = e.target.value;
    let isError = this.checkValidation(this.props.operator, val);
    this.props.handleChange(val, nameChild ? nameChild : null, isError);
    // this.setState({ value: val });
  };
  checkValidation = (operator, val) => {
    // check ký tự đặt biệt
    let strFormat;
    let formatString = /[!@#$^&*()_+\-=\[\]{};:"\\|,.<>\/?]+/;
    let formatIN = /[!@#$^&*_+\-=\[\]{};":\\|.<>\/?]+/;
    if (operator === "IN (...)" || operator === "NOT IN (...)") {
      strFormat = formatIN;
    } else strFormat = formatString;

    if (strFormat.test(val)) {
      // tồn tại ký tự đặt biệt
      let formatSQL = this.getPlaceholder(operator);
      this.setState({ isErrorStr: true, formatSQL: formatSQL });
      return true;
    } else {
      this.setState({ isErrorStr: false });
      return false;
    }
  };
  // hander change date
  changeDate = nameChild => e => {
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let newDate = yy + "-" + mm + "-" + dd;

    this.props.handleChange(newDate, nameChild ? nameChild : null);
  };
  // format date
  formatDate = date => {
    if (date) {
      let arrDay = new Date(date);
      return new Date(
        arrDay.getFullYear(),
        arrDay.getMonth(),
        arrDay.getDate()
      );
    }
    return new Date();
  };
  // handleFocus = () => {
  //   const { operator } = this.props;
  //   let val = this.state.value;
  //   this.setState({
  //     isError: false,
  //     messageError: "",
  //     placeholder: ""
  //   });
  //   let validation = this.checkValidationOperator(operator);
  //   this.props.handelFocus(validation.isError, val);
  //   this.setState({ messageError: validation.messageError });
  // };
  // tạm ngưng
  getPlaceholder = operator => {
    switch (operator) {
      case "LIKE %...%":
        return `'%value%'`;
      case "IN (...)":
        return `('val1', 'val2',...)`;
      case "NOT IN (...)":
        return `('val1', 'val2',...)`;
      case "LIKE":
        return `'value%'`;
      case "IN":
        return `('val1', 'val2',...)`;
      case "NOT IN":
        return `('val1', 'val2',...)`;
      case "IS NULL":
        return `true/false`;
      case "IS NOT NULL":
        return `true/false`;
      default:
        return "'value'";
    }
  };
  // tạm ngưng
  checkValidationOperator = operator => {
    switch (operator) {
      case "=":
        return this.checkBang();
      case ">":
        return this.checkBang();
      case ">=":
        return this.checkBang();
      case "<":
        return this.checkBang();
      case "<=":
        return this.checkBang();
      case "!=":
        return this.checkBang();
      case "LIKE":
        return this.checkBang();
      case "LIKE %...%":
        return this.checkBang();
      case "NOT LIKE":
        return this.checkBang();
      case "IN (...)":
        return this.checkBang();
      case "NOT IN (...)":
        return this.checkBang();
      case "BETWEEN":
        return this.checkBang();
      case "NOT BETWEEN":
        return this.checkBang();
      case "IS NULL":
        return this.checkBang();
      case "IS NOT NULL":
        return this.checkBang();
      default:
        break;
    }
  };
  // tạm ngưng
  checkBang = () => {
    return {
      isError: false,
      placeholder: `"value"`,
      messageError: ""
    };
  };
  render = () => {
    const { classes, handleFocus, value, operator, type } = this.props;
    const { isErrorStr, isErrorFrom, isErrorTo, formatSQL } = this.state;
    if (type === "date") {
      return (
        <React.Fragment>
          {operator === "BETWEEN" || operator === "NOT BETWEEN" ? (
            <React.Fragment>
              <div className={classes.rowDouble}>
                <label htmlFor="From:">From:</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
                  <DatePicker
                    format="yyyy/MM/dd"
                    className={classes.rowInputDate}
                    value={
                      value && value.from ? this.formatDate(value.from) : today
                    }
                    InputProps={{
                      classes: {
                        root: classes.inputRootDate,
                        input: classes.inputInputDate
                      }
                    }}
                    onFocus={handleFocus}
                    onChange={this.changeDate("from")}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className={classes.rowDouble}>
                <label htmlFor="To:">To:</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
                  <DatePicker
                    format="yyyy/MM/dd"
                    className={classes.rowInputDate}
                    value={
                      value && value.to ? this.formatDate(value.to) : today
                    }
                    InputProps={{
                      classes: {
                        root: classes.inputRootDate,
                        input: classes.inputInputDate
                      }
                    }}
                    onFocus={handleFocus}
                    onChange={this.changeDate("to")}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </React.Fragment>
          ) : (
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
              <DatePicker
                format="yyyy/MM/dd"
                className={classes.rowInputDate}
                value={
                  typeof value === "string" ? this.formatDate(value) : today
                }
                InputProps={{
                  classes: {
                    root: classes.inputRootDate,
                    input: classes.inputInputDate
                  }
                }}
                onFocus={handleFocus}
                onChange={this.changeDate(null)}
              />
            </MuiPickersUtilsProvider>
          )}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {operator === "BETWEEN" || operator === "NOT BETWEEN" ? (
          <React.Fragment>
            <div className={classes.rowDouble}>
              <label htmlFor="From:">From:</label>
              <InputBase
                type={type}
                value={value && value.from ? value.from : ""}
                className={classes.InputTable}
                onFocus={handleFocus}
                onChange={e => this.handleChange(e, "from")}
              />
              {isErrorFrom && (
                <HtmlTooltip
                  placement="right-end"
                  title={
                    <span>
                      <u>Error.</u> The data entered is not in the allowed
                      format: <i>{formatSQL}</i>
                    </span>
                  }
                >
                  <ErrorIcon className={classes.iconError} />
                </HtmlTooltip>
              )}
            </div>
            <div className={classes.rowDouble}>
              <label htmlFor="To:">To:</label>
              <InputBase
                type={type}
                value={value && value.to ? value.to : ""}
                className={classes.InputTable}
                onFocus={handleFocus}
                onChange={e => this.handleChange(e, "to")}
              />
              {isErrorTo && (
                <HtmlTooltip
                  placement="right-end"
                  title={
                    <span>
                      <u>Error.</u> The data entered is not in the allowed
                      format: <i>{formatSQL}</i>
                    </span>
                  }
                >
                  <ErrorIcon className={classes.iconError} />
                </HtmlTooltip>
              )}
            </div>
          </React.Fragment>
        ) : (
          <div className={classes.rowDouble}>
            <InputBase
              type={type}
              value={typeof value === "string" ? value : ""}
              className={classes.InputTable}
              onFocus={handleFocus}
              onChange={this.handleChange}
            />
            {isErrorStr && (
              <HtmlTooltip
                placement="right-end"
                title={
                  <span>
                    <u>Error.</u> The data entered is not in the allowed format:
                    <i>{formatSQL}</i>
                  </span>
                }
              >
                <ErrorIcon className={classes.iconError} />
              </HtmlTooltip>
            )}
          </div>
        )}
      </React.Fragment>
    );
  };
}
TextFieldOperator.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  operator: PropTypes.string,
  type: PropTypes.string,
  handleFocus: PropTypes.func,
  handleChange: PropTypes.func
};
export default withRoot(withStyles(styles)(TextFieldOperator));
