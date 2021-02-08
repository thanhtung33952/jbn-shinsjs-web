import React from "react";
import axios from "axios";
import { apiRoot, folderRoot } from "constant/index.js";
import { matchPath } from "react-router";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';

import CircularProgress from "@material-ui/core/CircularProgress";
import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

// component project
import TextFieldOperator from "components/TextFieldOperator/TextFieldOperator.jsx";
// layout
import Master3Col from "layout/Master3Col.jsx";
// jss
import styles from "assets/jss/views/styleDetailedSearch.jsx";

// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;

let arrFieldDate = [
  "sales_date",
  "sales_approval_date",
  "closing_date",
  "billing_date",
  "scheduled_collection_date",
  "payment_day",
  "purchase_date",
  "survey_construction_date",
  "purchase_approval_date",
  "payment_closing_date",
  "payment_due_date",
  "payment_date"
];
class DetailedSearch extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isNew: true,
      statusSubmit: {
        flag: 0, // -1: error, 1: ok
        isLoadding: false,
        message: ""
      },
      anchorEl: null, // null: close option sql
      nameFilter: "",
      isErrorName: false,
      fieldActive: null, // field click để set operator
      sqlSearch: "",
      sqlId: null,
      // table 1
      //sales
      sales_number: {
        operator: null,
        value: ""
      },
      sales_date: {
        operator: null,
        value: ""
      },
      categories: {
        operator: null,
        value: ""
      },
      product_name: {
        operator: null,
        value: ""
      },
      //property
      property_no: {
        operator: null,
        value: ""
      },
      quality_certification_company: {
        operator: null,
        value: ""
      },
      property_name: {
        operator: null,
        value: ""
      },
      property_address: {
        operator: null,
        value: ""
      },
      // end table 1

      // table 2
      //claim
      billing_code: {
        operator: null,
        value: ""
      },
      billing_name: {
        operator: null,
        value: ""
      },
      sales_approval_date: {
        operator: null,
        value: ""
      },
      sales_staff: {
        operator: null,
        value: ""
      },
      branch_name: {
        operator: null,
        value: ""
      },
      excluding_tax: {
        operator: null,
        value: ""
      },
      tax_included: {
        operator: null,
        value: ""
      },
      billing_method: {
        operator: null,
        value: ""
      },
      closing_date: {
        operator: null,
        value: ""
      },
      billing_date: {
        operator: null,
        value: ""
      },
      scheduled_collection_date: {
        operator: null,
        value: ""
      },
      //deposit
      deposit_number: {
        operator: null,
        value: ""
      },
      payment_day: {
        operator: null,
        value: ""
      },
      deposit_type_1: {
        operator: null,
        value: ""
      },
      deposit_1: {
        operator: null,
        value: ""
      },
      deposit_type_2: {
        operator: null,
        value: ""
      },
      deposit_2: {
        operator: null,
        value: ""
      },
      commission: {
        operator: null,
        value: ""
      },
      cooperation_fee: {
        operator: null,
        value: ""
      },
      deposit_total: {
        operator: null,
        value: ""
      },
      //deposit2
      advance_payment: {
        operator: null,
        value: ""
      },
      uncollected_balance: {
        operator: null,
        value: ""
      },
      deposit: {
        operator: null,
        value: ""
      },
      // end table 2

      // table 3
      //purchase
      purchase_number: {
        operator: null,
        value: ""
      },
      purchase_date: {
        operator: null,
        value: ""
      },
      survey_construction_date: {
        operator: null,
        value: ""
      },
      description: {
        operator: null,
        value: ""
      },
      payee_code: {
        operator: null,
        value: ""
      },
      payee_name: {
        operator: null,
        value: ""
      },
      purchase_approval_date: {
        operator: null,
        value: ""
      },
      excluding_tax_1: {
        operator: null,
        value: ""
      },
      tax_included_1: {
        operator: null,
        value: ""
      },
      payment_closing_date: {
        operator: null,
        value: ""
      },
      payment_due_date: {
        operator: null,
        value: ""
      },
      payment_number: {
        operator: null,
        value: ""
      },
      payment_date: {
        operator: null,
        value: ""
      },
      payment_type_1: {
        operator: null,
        value: ""
      },
      payment_amount_1: {
        operator: null,
        value: ""
      },
      payment_type_2: {
        operator: null,
        value: ""
      },
      payment_amount_2: {
        operator: null,
        value: ""
      },
      total_payment_amount: {
        operator: null,
        value: ""
      },
      unpaid_balance: {
        operator: null,
        value: ""
      }
      // end table 3
    };
  }

  componentDidMount = async () => {
    let currentLocation = this.props.location.pathname;
    let match = matchPath(currentLocation, {
      path: `${folderRoot}detailed-search/:id`,
      exact: true,
      strict: false
    });

    if (match !== null && match.params.id) {
      // get sql từ id sql
      let sqlString = await this.getStringSQL(match.params.id);

      if (!sqlString) return;
      this.setState({ isNew: false, sqlId: match.params.id });
      this.convertSqlShowTable(sqlString);
    }
  };

  // lấy string sql theo id sql
  getStringSQL = async id => {
    try {
      const res = await axios.get(`${apiRoot}/costbalancefilter/${id}`);
      // Failed
      if (res.status !== 200) {
        console.log("Get string sql error");
        return false;
      }
      // success
      return res.data.content;
    } catch (error) {
      console.log("Get string sql error");
      return false;
    }
  };

  // chuyển dữ liệu string sql sang ob để hiển thị trên table
  convertSqlShowTable = sql => {
    this.setState({ sqlSearch: sql });
    let arrSql = sql !== "" ? sql.split("AND") : null;
    // console.log(arrSql);
    if (!arrSql) return;
    arrSql.forEach(async (item, i) => {
      let operator = this.findOperatorInString(item.trim());
      if (!operator) return;
      let arrfield = item.split(operator);
      let value = arrfield[1].trim();
      // const cho field BETWEEN , NOT BETWEEN
      let valFrom;
      let valTo;
      // end const
      switch (operator) {
        case "IN":
          operator = "IN (...)";
          break;
        case "NOT IN":
          operator = "NOT IN (...)";
          break;
        case "IS NULL":
          value = "true";
          break;
        case "IS NOT NULL":
          value = "true";
          break;
        case "BETWEEN":
          valFrom = arrfield[1].trim();
          valTo = arrSql[i + 1].trim();
          value = { from: valFrom, to: valTo };
          break;
        default:
          break;
      }
      this.setState(prevState => ({
        [arrfield[0].trim()]: {
          ...prevState[arrfield[0].trim()],
          operator: operator,
          value: value
        }
      }));
    });
  };

  // tìm 1 operator trong string
  findOperatorInString = str => {
    let arrOperator = [
      "=",
      ">",
      ">=",
      "<",
      "<=",
      "!=",
      "LIKE",
      "NOT LIKE",
      "IN",
      "NOT IN",
      "BETWEEN",
      "NOT BETWEEN",
      "IS NULL",
      "IS NOT NULL"
    ];
    let operator = null;
    arrOperator.map(item => {
      if (str.indexOf(item) !== -1) {
        operator = item;
      }
    });
    return operator;
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
  // hander change date
  changeDate = nameField => e => {
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let newDate = yy + "-" + mm + "-" + dd;

    this.setState(
      prevState => ({
        [nameField]: {
          ...prevState[nameField],
          value: newDate
        }
      }),
      () => this.renderSql()
    );
  };

  // set field name edit vao global khi click vào td operator
  selectFieldTb = nameField => event => {
    const { fieldActive } = this.state;
    const fieldBefore = this.state[fieldActive];

    // kiểm tra field trước đó có data không
    if (fieldBefore && !fieldBefore.value) {
      // không có data thì set operator về null
      fieldBefore.operator = null;
      this.setState({ fieldBefore });
    }
    this.setState({ fieldActive: nameField, anchorEl: event.currentTarget });
  };

  // chọn option operator
  selectOperator = value => () => {
    const { fieldActive } = this.state;
    this.setState(
      prevState => ({
        [fieldActive]: {
          ...prevState[fieldActive],
          operator: value
        }
      }),
      () => this.renderSql()
    );
    this.setState({ anchorEl: null });
  };
  // set lại field edit , tránh trường hợp input của field trước rỗng thì phải set lại operator null
  focusInput = nameField => () => {
    const { fieldActive } = this.state;
    // lấy data field trước đó
    const fieldBefore = this.state[fieldActive];
    // kiểm tra field trước đó có data không
    if (
      fieldBefore &&
      fieldActive !== nameField &&
      fieldBefore.operator &&
      !fieldBefore.value
    ) {
      // không có data và khác field đang focus thì set operator về null
      fieldBefore.operator = null;
      this.setState({ fieldBefore });
    }
    this.setState({ fieldActive: nameField });
  };
  // onbur field tu component customer
  forCusField = nameField => () => {
    const { fieldActive } = this.state;
    // lấy data field trước đó
    const fieldBefore = this.state[fieldActive];
    // Mục đích chỗ này để set lại operator null cho các field có dữ liệu rỗng
    if (fieldBefore && fieldActive !== nameField) {
      // field cũ không có data thì set operator về null
      if (fieldBefore.operator && !fieldBefore.value) {
        this.setState(prevState => ({
          [fieldActive]: {
            ...prevState[fieldActive],
            operator: null,
            value: ""
          }
        }));
      }

      if (
        (fieldBefore.operator === "BETWEEN" ||
          fieldBefore.operator === "NOT BETWEEN") &&
        (!fieldBefore.value.from && !fieldBefore.value.to)
      ) {
        // field cũ không có data thì set operator về null
        this.setState(prevState => ({
          [fieldActive]: {
            ...prevState[fieldActive],
            operator: null,
            value: ""
          }
        }));
      }
    }

    this.setState({ fieldActive: nameField });
  };
  // onChange field
  changeValueField = nameField => (value, nameChild, isError) => {
    // nameChild là field from - to của operator BETWEEN || NOT BETWEEN
    if (nameChild) {
      // check xem value là kiểu { from: "", to: ""} hay value: ""
      let isNew =
        typeof this.state[nameField].value === "string" ? true : false;
      // neu isNew === true => nó là 1 string => clear string đó đi và set lại from, to
      if (isNew) {
        this.setState(
          prevState => ({
            [nameField]: {
              ...prevState[nameField],
              value: {
                [nameChild]: value
              },
              isError: isError
            }
          }),
          () => this.renderSql()
        );
      } else {
        this.setState(
          prevState => ({
            [nameField]: {
              ...prevState[nameField],
              value: {
                ...prevState[nameField].value,
                [nameChild]: value
              },
              isError: isError
            }
          }),
          () => this.renderSql()
        );
      }
    } else {
      this.setState(
        prevState => ({
          [nameField]: {
            ...prevState[nameField],
            value: value,
            isError: isError
          }
        }),
        () => this.renderSql()
      );
    }
  };
  // change input value trong td table
  changeInput = (e, nameField) => {
    let value = e.target.value;
    this.setState(
      prevState => ({
        [nameField]: {
          ...prevState[nameField],
          value: value
        }
      }),
      () => this.renderSql()
    );
  };
  // convert operator
  converOperator = value => {
    switch (value) {
      case "LIKE %...%":
        return "LIKE";
      case "IN (...)":
        return "IN";
      case "NOT IN (...)":
        return "NOT IN";
      default:
        return "";
    }
  };

  // change sql tại textare
  changeSQL = e => {
    let val = e.target.value;
    this.setState({ sqlSearch: val });
    console.log(val)
  };
  // render string sql
  renderSql = () => {
    let sql = "";
    // field loại bỏ khi loop qua state
    let notArr = [
      "statusSubmit",
      "anchorEl",
      "nameFilter",
      "isErrorName",
      "fieldActive",
      "sqlSearch",
      "sqlId"
    ];
    // operator loại bỏ khi chuyển đổi
    let arrConvertOperator = ["LIKE %...%", "IN (...)", "NOT IN (...)"];
    for (var nameField in this.state) {
      if (notArr.indexOf(nameField) === -1) {
        let value = this.state[nameField].value;
        let isError = this.state[nameField].isError ? true : false;
        if (
          this.state[nameField] &&
          (value || (value && value.form && value.to)) &&
          !isError
        ) {
          let operator = this.state[nameField].operator;
          operator =
            arrConvertOperator.indexOf(operator) !== -1
              ? this.converOperator(operator, false)
              : operator;
          let flagContinue = true;
          // check value của 2 operator is null và is not null ( nếu value === false thì không dc ghi vào sql)
          if (
            (operator === "IS NULL" || operator === "IS NOT NULL") &&
            value !== "true"
          ) {
            flagContinue = false;
          }
          // check value
          switch (operator) {
            case "IS NULL":
              value = "";
              break;
            case "IS NOT NULL":
              value = "";
              break;
            case "BETWEEN":
              value =
                arrFieldDate.indexOf(nameField) !== -1
                  ? `'${value.from}'` + " AND " + `'${value.to}'`
                  : value.from + " AND " + value.to;
              break;
            case "NOT BETWEEN":
              value =
                arrFieldDate.indexOf(nameField) !== -1
                  ? `'${value.from}'` + " AND " + `'${value.to}'`
                  : value.from + " AND " + value.to;
              break;
            default:
              value =
                arrFieldDate.indexOf(nameField) !== -1 ? `'${value}'` : value;
              break;
          }
          if (flagContinue) {
            sql = sql + " " + nameField + " " + operator + " " + value + " AND";
          }
        }
      }
    }
    console.log(this.state.sqlSearch)
    this.setState({ sqlSearch: sql.substring(0, sql.length - 3) });
  };
  handleCheckSQL = async () => {
    const { statusSubmit } = this.state;
    statusSubmit.isLoadding = true;
    this.setState({ statusSubmit });

    try {
      const res = await axios.post(`${apiRoot}/executesqlcostbalance`, {
        content: this.state.sqlSearch
      });
      if (res.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  handleSaveSql = async () => {
    const { statusSubmit } = this.state;
    let checkSQL = await this.handleCheckSQL();
    // sql faild
    if (!checkSQL) {
      statusSubmit.isLoadding = false;
      statusSubmit.flag = -1;
      statusSubmit.message = "SQL Error!";
      this.setState({ statusSubmit });
      return;
    }

    // sql success => lưu sql
    if (this.state.isNew) {
      this.insertSQL();
    } else {
      console.log(1)
      this.updateSQL();
    }
  };

  insertSQL = async () => {
    const { statusSubmit } = this.state;
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    // sql success => lưu sql
    let dataInsert = {
      userId: userInfo.userId,
      content: this.state.sqlSearch
    };
    try {
      const res = await axios.post(`${apiRoot}/costbalancefilter`, dataInsert);
      // error
      if (res.status !== 200) {
        statusSubmit.isLoadding = false;
        statusSubmit.flag = -1;
        statusSubmit.message = "Insert SQL Error!";
        this.setState({ statusSubmit });
      }
      // success

      statusSubmit.isLoadding = false;
      statusSubmit.flag = 1;
      statusSubmit.message = "Insert SQL Success!";
      this.setState({
        statusSubmit,
        isNew: false,
        sqlId: res.data.id
      });
    } catch (error) {
      statusSubmit.isLoadding = false;
      statusSubmit.flag = -2;
      statusSubmit.message = "Oops, something went wrong!";
      this.setState({ statusSubmit });
    }
  };
  updateSQL = async () => {
    const { statusSubmit } = this.state;
    if (!this.state.sqlId) return;
    let dataUpdate = {
      content: this.state.sqlSearch
    };
    try {
      const res = await axios.put(
        `${apiRoot}/costbalancefilter/${this.state.sqlId}`,
        dataUpdate
      );
      // error
      if (res.status !== 200) {
        statusSubmit.isLoadding = false;
        statusSubmit.flag = -1;
        statusSubmit.message = "Update SQL Error!";
        this.setState({ statusSubmit });
      }
      // success
      statusSubmit.isLoadding = false;
      statusSubmit.flag = 1;
      statusSubmit.message = "Update SQL Success!";
      this.setState({
        statusSubmit,
        isNew: false
      });
    } catch (error) {
      statusSubmit.isLoadding = false;
      statusSubmit.flag = -2;
      statusSubmit.message = "Oops, something went wrong!";
      this.setState({ statusSubmit });
    }
  };
  // open option menu
  handleOpenOption = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  // close option menu
  handleCloseOption = () => {
    this.setState({ anchorEl: null });
  };
  render = () => {
    const { classes } = this.props;
    // console.log(this.state);
    const {
      statusSubmit,
      anchorEl,
      // data table 1
      sales_number,
      sales_date,
      categories,
      product_name,
      property_no,
      quality_certification_company,
      property_name,
      property_address,
      // data table 2
      billing_code,
      billing_name,
      sales_approval_date,
      sales_staff,
      excluding_tax,
      branch_name,
      tax_included,
      billing_method,
      closing_date,
      billing_date,
      scheduled_collection_date,
      deposit_number,
      payment_day,
      deposit_type_1,
      deposit_1,
      deposit_type_2,
      deposit_2,
      commission,
      cooperation_fee,
      deposit_total,
      advance_payment,
      uncollected_balance,
      deposit,
      // data table 3
      purchase_number,
      purchase_date,
      survey_construction_date,
      description,
      payee_code,
      payee_name,
      purchase_approval_date,
      excluding_tax_1,
      tax_included_1,
      payment_closing_date,
      payment_due_date,
      payment_number,
      payment_date,
      payment_type_1,
      payment_amount_1,
      payment_type_2,
      payment_amount_2,
      total_payment_amount,
      unpaid_balance
    } = this.state;
    // console.log(this.state);
    const open = Boolean(anchorEl);
    return (
      <Master3Col
        colLeft={null}
        colRight={null}
        maxWidthPage={"100%"}
        titleHeader="売上一覧"
        breadcrumb="▶︎ 作成者：〇〇　▶︎ 編集許可範囲：調査会社　　▶︎ステータス：作成中"
      >
        <Typography className={classes.titlePopup}>詳細検索#</Typography>
        <div className={classes.contentFilter}>
          {/* table 1 */}
          <div className={classes.columFilter}>
            <table className={classes.table1}>
              <thead>
                <tr>
                  <th width={40}></th>
                  <th width={120}>項目</th>
                  <th width={80}>演算子</th>
                  <th>値</th>
                </tr>
              </thead>
              <tbody>
                {/* tr1 */}
                <tr>
                  <td rowSpan="4">売上</td>
                  <td>売上番号</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("sales_number")}
                  >
                    <span>
                      {sales_number.operator && sales_number.operator}
                    </span>
                  </td>
                  <td>
                    {sales_number.operator && (
                      <TextFieldOperator
                        value={sales_number.value}
                        type="text"
                        operator={sales_number.operator}
                        handleFocus={this.forCusField("sales_number")}
                        handleChange={this.changeValueField("sales_number")}
                      />
                      // <InputBase
                      //   className={classes.InputTable}
                      //   value={sales_number.value}
                      //   onFocus={this.focusInput("sales_number")}
                      //   onChange={e => this.changeInput(e, "sales_number")}
                      // />
                    )}
                  </td>
                </tr>
                {/* tr11 */}
                <tr>
                  <td>売上日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("sales_date")}
                  >
                    <span>{sales_date.operator && sales_date.operator}</span>
                  </td>
                  <td>
                    {sales_date.operator && (
                      <TextFieldOperator
                        value={sales_date.value}
                        type="date"
                        operator={sales_date.operator}
                        handleFocus={this.forCusField("sales_date")}
                        handleChange={this.changeValueField("sales_date")}
                      />
                      // <MuiPickersUtilsProvider
                      //   utils={DateFnsUtils}
                      //   locale={jpLocale}
                      // >
                      //   <DatePicker
                      //     format="yyyy/MM/dd"
                      //     className={classes.rowInputDate}
                      //     value={this.formatDate(sales_date.value)}
                      //     margin="normal"
                      //     variant="outlined"
                      //     InputProps={{
                      //       classes: {
                      //         root: classes.inputRootDate,
                      //         input: classes.inputInputDate
                      //       }
                      //     }}
                      //     onChange={this.changeDate("sales_date")}
                      //   />
                      // </MuiPickersUtilsProvider>
                    )}
                  </td>
                </tr>
                {/* tr12 */}
                <tr>
                  <td>商品区分</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("categories")}
                  >
                    <span>{categories.operator && categories.operator}</span>
                  </td>
                  <td>
                    {categories.operator && (
                      <TextFieldOperator
                        value={categories.value}
                        type="text"
                        operator={categories.operator}
                        handleFocus={this.forCusField("categories")}
                        handleChange={this.changeValueField("categories")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr13 */}
                <tr>
                  <td>商品名</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("product_name")}
                  >
                    <span>
                      {product_name.operator && product_name.operator}
                    </span>
                  </td>
                  <td>
                    {product_name.operator && (
                      <TextFieldOperator
                        value={product_name.value}
                        type="text"
                        operator={product_name.operator}
                        handleFocus={this.forCusField("product_name")}
                        handleChange={this.changeValueField("product_name")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr2 */}
                <tr>
                  <td rowSpan="4">物件</td>
                  <td>物件番号</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("property_no")}
                  >
                    <span>{property_no.operator && property_no.operator}</span>
                  </td>
                  <td>
                    {property_no.operator && (
                      <TextFieldOperator
                        value={property_no.value}
                        type="text"
                        operator={property_no.operator}
                        handleFocus={this.forCusField("property_no")}
                        handleChange={this.changeValueField("property_no")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr21 */}
                <tr>
                  <td>品質証明事業者</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb(
                      "quality_certification_company"
                    )}
                  >
                    <span>
                      {quality_certification_company.operator &&
                        quality_certification_company.operator}
                    </span>
                  </td>
                  <td>
                    {quality_certification_company.operator && (
                      <TextFieldOperator
                        value={quality_certification_company.value}
                        type="text"
                        operator={quality_certification_company.operator}
                        handleFocus={this.forCusField(
                          "quality_certification_company"
                        )}
                        handleChange={this.changeValueField(
                          "quality_certification_company"
                        )}
                      />
                    )}
                  </td>
                </tr>
                {/* tr22 */}
                <tr>
                  <td>物件名</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("property_name")}
                  >
                    <span>
                      {property_name.operator && property_name.operator}
                    </span>
                  </td>
                  <td>
                    {property_name.operator && (
                      <TextFieldOperator
                        value={property_name.value}
                        type="text"
                        operator={property_name.operator}
                        handleFocus={this.forCusField("property_name")}
                        handleChange={this.changeValueField("property_name")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr23 */}
                <tr>
                  <td>物件住所</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("property_address")}
                  >
                    <span>
                      {property_address.operator && property_address.operator}
                    </span>
                  </td>
                  <td>
                    {property_address.operator && (
                      <TextFieldOperator
                        value={property_address.value}
                        type="text"
                        operator={property_address.operator}
                        handleFocus={this.forCusField("property_address")}
                        handleChange={this.changeValueField("property_address")}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* table 2 */}
          <div className={classes.columFilter}>
            <table className={classes.table2}>
              <thead>
                <tr>
                  <th width={40}></th>
                  <th width={120}>項目</th>
                  <th width={80}>演算子</th>
                  <th>値</th>
                </tr>
              </thead>
              <tbody>
                {/* tr1 */}
                <tr>
                  <td rowSpan="11">請求</td>
                  <td>請求先コード</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("billing_code")}
                  >
                    <span>
                      {billing_code.operator && billing_code.operator}
                    </span>
                  </td>
                  <td>
                    {billing_code.operator && (
                      <TextFieldOperator
                        value={billing_code.value}
                        type="text"
                        operator={billing_code.operator}
                        handleFocus={this.forCusField("billing_code")}
                        handleChange={this.changeValueField("billing_code")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr12 */}
                <tr>
                  <td>請求先名</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("billing_name")}
                  >
                    <span>
                      {billing_name.operator && billing_name.operator}
                    </span>
                  </td>
                  <td>
                    {billing_name.operator && (
                      <TextFieldOperator
                        value={billing_name.value}
                        type="text"
                        operator={billing_name.operator}
                        handleFocus={this.forCusField("billing_name")}
                        handleChange={this.changeValueField("billing_name")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr13 */}
                <tr>
                  <td>売上承認日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("sales_approval_date")}
                  >
                    <span>
                      {sales_approval_date.operator &&
                        sales_approval_date.operator}
                    </span>
                  </td>
                  <td>
                    {sales_approval_date.operator && (
                      <TextFieldOperator
                        value={sales_approval_date.value}
                        type="date"
                        operator={sales_approval_date.operator}
                        handleFocus={this.forCusField("sales_approval_date")}
                        handleChange={this.changeValueField(
                          "sales_approval_date"
                        )}
                      />
                    )}
                  </td>
                </tr>
                {/* tr14 */}
                <tr>
                  <td>営業担当</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("sales_staff")}
                  >
                    <span>{sales_staff.operator && sales_staff.operator}</span>
                  </td>
                  <td>
                    {sales_staff.operator && (
                      <TextFieldOperator
                        value={sales_staff.value}
                        type="text"
                        operator={sales_staff.operator}
                        handleFocus={this.forCusField("sales_staff")}
                        handleChange={this.changeValueField("sales_staff")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr15 */}
                <tr>
                  <td>支社名</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("branch_name")}
                  >
                    <span>{branch_name.operator && branch_name.operator}</span>
                  </td>
                  <td>
                    {branch_name.operator && (
                      <TextFieldOperator
                        value={branch_name.value}
                        type="text"
                        operator={branch_name.operator}
                        handleFocus={this.forCusField("branch_name")}
                        handleChange={this.changeValueField("branch_name")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr16 */}
                <tr>
                  <td>税抜金額</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("excluding_tax")}
                  >
                    <span>
                      {excluding_tax.operator && excluding_tax.operator}
                    </span>
                  </td>
                  <td>
                    {excluding_tax.operator && (
                      <TextFieldOperator
                        value={excluding_tax.value}
                        type="text"
                        operator={excluding_tax.operator}
                        handleFocus={this.forCusField("excluding_tax")}
                        handleChange={this.changeValueField("excluding_tax")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr17 */}
                <tr>
                  <td>税込金額</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("tax_included")}
                  >
                    <span>
                      {tax_included.operator && tax_included.operator}
                    </span>
                  </td>
                  <td>
                    {tax_included.operator && (
                      <TextFieldOperator
                        value={tax_included.value}
                        type="text"
                        operator={tax_included.operator}
                        handleFocus={this.forCusField("tax_included")}
                        handleChange={this.changeValueField("tax_included")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr18 */}
                <tr>
                  <td>請求方法</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("billing_method")}
                  >
                    <span>
                      {billing_method.operator && billing_method.operator}
                    </span>
                  </td>
                  <td>
                    {billing_method.operator && (
                      <TextFieldOperator
                        value={billing_method.value}
                        type="text"
                        operator={billing_method.operator}
                        handleFocus={this.forCusField("billing_method")}
                        handleChange={this.changeValueField("billing_method")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr19 */}
                <tr>
                  <td>請求締日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("closing_date")}
                  >
                    <span>
                      {closing_date.operator && closing_date.operator}
                    </span>
                  </td>
                  <td>
                    {closing_date.operator && (
                      <TextFieldOperator
                        value={closing_date.value}
                        type="date"
                        operator={closing_date.operator}
                        handleFocus={this.forCusField("closing_date")}
                        handleChange={this.changeValueField("closing_date")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr110 */}
                <tr>
                  <td>請求日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("billing_date")}
                  >
                    <span>
                      {billing_date.operator && billing_date.operator}
                    </span>
                  </td>
                  <td>
                    {billing_date.operator && (
                      <TextFieldOperator
                        value={billing_date.value}
                        type="date"
                        operator={billing_date.operator}
                        handleFocus={this.forCusField("billing_date")}
                        handleChange={this.changeValueField("billing_date")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr111 */}
                <tr>
                  <td>回収予定日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("scheduled_collection_date")}
                  >
                    <span>
                      {scheduled_collection_date.operator &&
                        scheduled_collection_date.operator}
                    </span>
                  </td>
                  <td>
                    {scheduled_collection_date.operator && (
                      <TextFieldOperator
                        value={scheduled_collection_date.value}
                        type="date"
                        operator={scheduled_collection_date.operator}
                        handleFocus={this.forCusField(
                          "scheduled_collection_date"
                        )}
                        handleChange={this.changeValueField(
                          "scheduled_collection_date"
                        )}
                      />
                    )}
                  </td>
                </tr>
                {/* tr2 */}
                <tr>
                  <td rowSpan="9">入金</td>
                  <td>入金番号</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("deposit_number")}
                  >
                    <span>
                      {deposit_number.operator && deposit_number.operator}
                    </span>
                  </td>
                  <td>
                    {deposit_number.operator && (
                      <TextFieldOperator
                        value={deposit_number.value}
                        type="text"
                        operator={deposit_number.operator}
                        handleFocus={this.forCusField("deposit_number")}
                        handleChange={this.changeValueField("deposit_number")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr21 */}
                <tr>
                  <td>入金日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payment_day")}
                  >
                    <span>{payment_day.operator && payment_day.operator}</span>
                  </td>
                  <td>
                    {payment_day.operator && (
                      <TextFieldOperator
                        value={payment_day.value}
                        type="date"
                        operator={payment_day.operator}
                        handleFocus={this.forCusField("payment_day")}
                        handleChange={this.changeValueField("payment_day")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr22 */}
                <tr>
                  <td>入金種別１</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("deposit_type_1")}
                  >
                    <span>
                      {deposit_type_1.operator && deposit_type_1.operator}
                    </span>
                  </td>
                  <td>
                    {deposit_type_1.operator && (
                      <TextFieldOperator
                        value={deposit_type_1.value}
                        type="text"
                        operator={deposit_type_1.operator}
                        handleFocus={this.forCusField("deposit_type_1")}
                        handleChange={this.changeValueField("deposit_type_1")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr23 */}
                <tr>
                  <td>入金額１</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("deposit_1")}
                  >
                    <span>{deposit_1.operator && deposit_1.operator}</span>
                  </td>
                  <td>
                    {deposit_1.operator && (
                      <TextFieldOperator
                        value={deposit_1.value}
                        type="text"
                        operator={deposit_1.operator}
                        handleFocus={this.forCusField("deposit_1")}
                        handleChange={this.changeValueField("deposit_1")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr24 */}
                <tr>
                  <td>入金種別２</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("deposit_type_2")}
                  >
                    <span>
                      {deposit_type_2.operator && deposit_type_2.operator}
                    </span>
                  </td>
                  <td>
                    {deposit_type_2.operator && (
                      <TextFieldOperator
                        value={deposit_type_2.value}
                        type="text"
                        operator={deposit_type_2.operator}
                        handleFocus={this.forCusField("deposit_type_2")}
                        handleChange={this.changeValueField("deposit_type_2")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr25 */}
                <tr>
                  <td>入金額２</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("deposit_2")}
                  >
                    <span>{deposit_2.operator && deposit_2.operator}</span>
                  </td>
                  <td>
                    {deposit_2.operator && (
                      <TextFieldOperator
                        value={deposit_2.value}
                        type="text"
                        operator={deposit_2.operator}
                        handleFocus={this.forCusField("deposit_2")}
                        handleChange={this.changeValueField("deposit_2")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr26 */}
                <tr>
                  <td>手数料</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("commission")}
                  >
                    <span>{commission.operator && commission.operator}</span>
                  </td>
                  <td>
                    {commission.operator && (
                      <TextFieldOperator
                        value={commission.value}
                        type="text"
                        operator={commission.operator}
                        handleFocus={this.forCusField("commission")}
                        handleChange={this.changeValueField("commission")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr27 */}
                <tr>
                  <td>協力会費 等</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("cooperation_fee")}
                  >
                    <span>
                      {cooperation_fee.operator && cooperation_fee.operator}
                    </span>
                  </td>
                  <td>
                    {cooperation_fee.operator && (
                      <TextFieldOperator
                        value={cooperation_fee.value}
                        type="text"
                        operator={cooperation_fee.operator}
                        handleFocus={this.forCusField("cooperation_fee")}
                        handleChange={this.changeValueField("cooperation_fee")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr28 */}
                <tr>
                  <td>入金額合計</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("deposit_total")}
                  >
                    <span>
                      {deposit_total.operator && deposit_total.operator}
                    </span>
                  </td>
                  <td>
                    {deposit_total.operator && (
                      <TextFieldOperator
                        value={deposit_total.value}
                        type="text"
                        operator={deposit_total.operator}
                        handleFocus={this.forCusField("deposit_total")}
                        handleChange={this.changeValueField("deposit_total")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr3 */}
                <tr>
                  <td rowSpan="3">入金２</td>
                  <td>前受金</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("advance_payment")}
                  >
                    <span>
                      {advance_payment.operator && advance_payment.operator}
                    </span>
                  </td>
                  <td>
                    {advance_payment.operator && (
                      <TextFieldOperator
                        value={advance_payment.value}
                        type="text"
                        operator={advance_payment.operator}
                        handleFocus={this.forCusField("advance_payment")}
                        handleChange={this.changeValueField("advance_payment")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr31 */}
                <tr>
                  <td>未回収残高</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("uncollected_balance")}
                  >
                    <span>
                      {uncollected_balance.operator &&
                        uncollected_balance.operator}
                    </span>
                  </td>
                  <td>
                    {uncollected_balance.operator && (
                      <TextFieldOperator
                        value={uncollected_balance.value}
                        type="text"
                        operator={uncollected_balance.operator}
                        handleFocus={this.forCusField("uncollected_balance")}
                        handleChange={this.changeValueField(
                          "uncollected_balance"
                        )}
                      />
                    )}
                  </td>
                </tr>
                {/* tr32 */}
                <tr>
                  <td>預り金</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("deposit", "deposit")}
                  >
                    <span>{deposit.operator && deposit.operator}</span>
                  </td>
                  <td>
                    {deposit.operator && (
                      <TextFieldOperator
                        value={deposit.value}
                        type="text"
                        operator={deposit.operator}
                        handleFocus={this.forCusField("deposit")}
                        handleChange={this.changeValueField("deposit")}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* table 3 */}
          <div className={classes.columFilter}>
            <table className={classes.table3}>
              <thead>
                <tr>
                  <th width={40}></th>
                  <th width={120}>項目</th>
                  <th width={80}>演算子</th>
                  <th>値</th>
                </tr>
              </thead>
              <tbody>
                {/* tr1 */}
                <tr>
                  <td rowSpan="19">仕入</td>
                  <td>仕入番号</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("purchase_number")}
                  >
                    <span>
                      {purchase_number.operator && purchase_number.operator}
                    </span>
                  </td>
                  <td>
                    {purchase_number.operator && (
                      <TextFieldOperator
                        value={purchase_number.value}
                        type="text"
                        operator={purchase_number.operator}
                        handleFocus={this.forCusField("purchase_number")}
                        handleChange={this.changeValueField("purchase_number")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr1 */}
                <tr>
                  <td>仕入日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("purchase_date")}
                  >
                    <span>
                      {purchase_date.operator && purchase_date.operator}
                    </span>
                  </td>
                  <td>
                    {purchase_date.operator && (
                      <TextFieldOperator
                        value={purchase_date.value}
                        type="date"
                        operator={purchase_date.operator}
                        handleFocus={this.forCusField("purchase_date")}
                        handleChange={this.changeValueField("purchase_date")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr3 */}
                <tr>
                  <td>調査・工事日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("survey_construction_date")}
                  >
                    <span>
                      {survey_construction_date.operator &&
                        survey_construction_date.operator}
                    </span>
                  </td>
                  <td>
                    {survey_construction_date.operator && (
                      <TextFieldOperator
                        value={survey_construction_date.value}
                        type="date"
                        operator={survey_construction_date.operator}
                        handleFocus={this.forCusField(
                          "survey_construction_date"
                        )}
                        handleChange={this.changeValueField(
                          "survey_construction_date"
                        )}
                      />
                    )}
                  </td>
                </tr>
                {/* tr4 */}
                <tr>
                  <td>明細摘要</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("description")}
                  >
                    <span>{description.operator && description.operator}</span>
                  </td>
                  <td>
                    {description.operator && (
                      <TextFieldOperator
                        value={description.value}
                        type="text"
                        operator={description.operator}
                        handleFocus={this.forCusField("description")}
                        handleChange={this.changeValueField("description")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr5 */}
                <tr>
                  <td>支払先コード</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payee_code")}
                  >
                    <span>{payee_code.operator && payee_code.operator}</span>
                  </td>
                  <td>
                    {payee_code.operator && (
                      <TextFieldOperator
                        value={payee_code.value}
                        type="text"
                        operator={payee_code.operator}
                        handleFocus={this.forCusField("payee_code")}
                        handleChange={this.changeValueField("payee_code")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr6 */}
                <tr>
                  <td>支払先名</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payee_name")}
                  >
                    <span>{payee_name.operator && payee_name.operator}</span>
                  </td>
                  <td>
                    {payee_name.operator && (
                      <TextFieldOperator
                        value={payee_name.value}
                        type="text"
                        operator={payee_name.operator}
                        handleFocus={this.forCusField("payee_name")}
                        handleChange={this.changeValueField("payee_name")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr7 */}
                <tr>
                  <td>仕入承認日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("purchase_approval_date")}
                  >
                    <span>
                      {purchase_approval_date.operator &&
                        purchase_approval_date.operator}
                    </span>
                  </td>
                  <td>
                    {purchase_approval_date.operator && (
                      <TextFieldOperator
                        value={purchase_approval_date.value}
                        type="date"
                        operator={purchase_approval_date.operator}
                        handleFocus={this.forCusField("purchase_approval_date")}
                        handleChange={this.changeValueField(
                          "purchase_approval_date"
                        )}
                      />
                    )}
                  </td>
                </tr>
                {/* tr8 */}
                <tr>
                  <td>税抜金額</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("excluding_tax_1")}
                  >
                    <span>
                      {excluding_tax_1.operator && excluding_tax_1.operator}
                    </span>
                  </td>
                  <td>
                    {excluding_tax_1.operator && (
                      <TextFieldOperator
                        value={excluding_tax_1.value}
                        type="text"
                        operator={excluding_tax_1.operator}
                        handleFocus={this.forCusField("excluding_tax_1")}
                        handleChange={this.changeValueField("excluding_tax_1")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr9 */}
                <tr>
                  <td>税込金額</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("tax_included_1")}
                  >
                    <span>
                      {tax_included_1.operator && tax_included_1.operator}
                    </span>
                  </td>
                  <td>
                    {tax_included_1.operator && (
                      <TextFieldOperator
                        value={tax_included_1.value}
                        type="text"
                        operator={tax_included_1.operator}
                        handleFocus={this.forCusField("tax_included_1")}
                        handleChange={this.changeValueField("tax_included_1")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr10 */}
                <tr>
                  <td>支払締日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payment_closing_date")}
                  >
                    <span>
                      {payment_closing_date.operator &&
                        payment_closing_date.operator}
                    </span>
                  </td>
                  <td>
                    {payment_closing_date.operator && (
                      <TextFieldOperator
                        value={payment_closing_date.value}
                        type="date"
                        operator={payment_closing_date.operator}
                        handleFocus={this.forCusField("payment_closing_date")}
                        handleChange={this.changeValueField(
                          "payment_closing_date"
                        )}
                      />
                    )}
                  </td>
                </tr>
                {/* tr11 */}
                <tr>
                  <td>支払予定日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payment_due_date")}
                  >
                    <span>
                      {payment_due_date.operator && payment_due_date.operator}
                    </span>
                  </td>
                  <td>
                    {payment_due_date.operator && (
                      <TextFieldOperator
                        value={payment_due_date.value}
                        type="date"
                        operator={payment_due_date.operator}
                        handleFocus={this.forCusField("payment_due_date")}
                        handleChange={this.changeValueField("payment_due_date")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr12 */}
                <tr>
                  <td>支払番号</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payment_number")}
                  >
                    <span>
                      {payment_number.operator && payment_number.operator}
                    </span>
                  </td>
                  <td>
                    {payment_number.operator && (
                      <TextFieldOperator
                        value={payment_number.value}
                        type="text"
                        operator={payment_number.operator}
                        handleFocus={this.forCusField("payment_number")}
                        handleChange={this.changeValueField("payment_number")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr13 */}
                <tr>
                  <td>支払日</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payment_date")}
                  >
                    <span>
                      {payment_date.operator && payment_date.operator}
                    </span>
                  </td>
                  <td>
                    {payment_date.operator && (
                      <TextFieldOperator
                        value={payment_date.value}
                        type="date"
                        operator={payment_date.operator}
                        handleFocus={this.forCusField("payment_date")}
                        handleChange={this.changeValueField("payment_date")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr14 */}
                <tr>
                  <td>支払種別１</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payment_type_1")}
                  >
                    <span>
                      {payment_type_1.operator && payment_type_1.operator}
                    </span>
                  </td>
                  <td>
                    {payment_type_1.operator && (
                      <TextFieldOperator
                        value={payment_type_1.value}
                        type="text"
                        operator={payment_type_1.operator}
                        handleFocus={this.forCusField("payment_type_1")}
                        handleChange={this.changeValueField("payment_type_1")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr15 */}
                <tr>
                  <td>支払額１</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payment_amount_1")}
                  >
                    <span>
                      {payment_amount_1.operator && payment_amount_1.operator}
                    </span>
                  </td>
                  <td>
                    {payment_amount_1.operator && (
                      <TextFieldOperator
                        value={payment_amount_1.value}
                        type="text"
                        operator={payment_amount_1.operator}
                        handleFocus={this.forCusField("payment_amount_1")}
                        handleChange={this.changeValueField("payment_amount_1")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr16 */}
                <tr>
                  <td>支払種別２</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payment_type_2")}
                  >
                    <span>
                      {payment_type_2.operator && payment_type_2.operator}
                    </span>
                  </td>
                  <td>
                    {payment_type_2.operator && (
                      <TextFieldOperator
                        value={payment_type_2.value}
                        type="text"
                        operator={payment_type_2.operator}
                        handleFocus={this.forCusField("payment_type_2")}
                        handleChange={this.changeValueField("payment_type_2")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr17 */}
                <tr>
                  <td>支払額２</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("payment_amount_2")}
                  >
                    <span>
                      {payment_amount_2.operator && payment_amount_2.operator}
                    </span>
                  </td>
                  <td>
                    {payment_amount_2.operator && (
                      <TextFieldOperator
                        value={payment_amount_2.value}
                        type="text"
                        operator={payment_amount_2.operator}
                        handleFocus={this.forCusField("payment_amount_2")}
                        handleChange={this.changeValueField("payment_amount_2")}
                      />
                    )}
                  </td>
                </tr>
                {/* tr18 */}
                <tr>
                  <td>支払額合計</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("total_payment_amount")}
                  >
                    <span>
                      {total_payment_amount.operator &&
                        total_payment_amount.operator}
                    </span>
                  </td>
                  <td>
                    {total_payment_amount.operator && (
                      <TextFieldOperator
                        value={total_payment_amount.value}
                        type="text"
                        operator={total_payment_amount.operator}
                        handleFocus={this.forCusField("total_payment_amount")}
                        handleChange={this.changeValueField(
                          "total_payment_amount"
                        )}
                      />
                    )}
                  </td>
                </tr>
                {/* tr19 */}
                <tr>
                  <td>未払残高</td>
                  <td
                    className={classes.p0}
                    onClick={this.selectFieldTb("unpaid_balance")}
                  >
                    <span>
                      {unpaid_balance.operator && unpaid_balance.operator}
                    </span>
                  </td>
                  <td>
                    {unpaid_balance.operator && (
                      <TextFieldOperator
                        value={unpaid_balance.value}
                        type="text"
                        operator={unpaid_balance.operator}
                        handleFocus={this.forCusField("unpaid_balance")}
                        handleChange={this.changeValueField("unpaid_balance")}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {statusSubmit.flag === -1 && (
          <Typography className={classes.txtError}>
            {statusSubmit.message}
          </Typography>
        )}
        {statusSubmit.flag === -2 && (
          <Typography className={classes.txtError}>
            {statusSubmit.message}
          </Typography>
        )}
        {statusSubmit.flag === 1 && (
          <Typography className={classes.txtSuccess}>
            {statusSubmit.message}
          </Typography>
        )}
        <div className={classes.rowSQL}>
          <label htmlFor="SQL">SQL</label>
          {/* <div className={classes.contentSql}>{this.state.sqlSearch}</div> */}
          <TextField
            multiline
            rows="2"
            value={this.state.sqlSearch}
            variant="outlined"
            className={classes.contentSql}
            onChange={this.changeSQL}
          />
          <div className={classes.rowBtnSubmit}>
            <Button
              variant="contained"
              className={classes.btnRun}
              onClick={this.handleSaveSql}
            >
              実行
            </Button>
            {statusSubmit.isLoadding && (
              <CircularProgress size={24} className={classes.iconProgress} />
            )}
          </div>
        </div>

        <Menu
          id="option"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleCloseOption}
          classes={{
            list: classes.menuOptionSQL
          }}
        >
          <MenuItem onClick={this.selectOperator("=")}>{`=`}</MenuItem>
          <MenuItem onClick={this.selectOperator(">")}>{`>`}</MenuItem>
          <MenuItem onClick={this.selectOperator(">=")}>{`>=`}</MenuItem>
          <MenuItem onClick={this.selectOperator("<")}>{`<`}</MenuItem>
          <MenuItem onClick={this.selectOperator("<=")}>{`<=`}</MenuItem>
          <MenuItem onClick={this.selectOperator("!=")}>{`!=`}</MenuItem>
          <MenuItem onClick={this.selectOperator("LIKE")}>{`LIKE`}</MenuItem>
          <MenuItem
            onClick={this.selectOperator("LIKE %...%")}
          >{`LIKE %...%`}</MenuItem>
          <MenuItem
            onClick={this.selectOperator("NOT LIKE")}
          >{`NOT LIKE`}</MenuItem>
          <MenuItem
            onClick={this.selectOperator("IN (...)")}
          >{`IN (...)`}</MenuItem>
          <MenuItem
            onClick={this.selectOperator("NOT IN (...)")}
          >{`NOT IN (...)`}</MenuItem>
          <MenuItem
            onClick={this.selectOperator("BETWEEN")}
          >{`BETWEEN`}</MenuItem>
          <MenuItem
            onClick={this.selectOperator("NOT BETWEEN")}
          >{`NOT BETWEEN`}</MenuItem>
          <MenuItem
            onClick={this.selectOperator("IS NULL")}
          >{`IS NULL`}</MenuItem>
          <MenuItem
            onClick={this.selectOperator("IS NOT NULL")}
          >{`IS NOT NULL`}</MenuItem>
        </Menu>
      </Master3Col>
    );
  };
}

DetailedSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  location: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(DetailedSearch)));
