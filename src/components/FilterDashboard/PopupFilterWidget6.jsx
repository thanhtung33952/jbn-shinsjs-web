import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiRoot, folderRoot } from "constant/index.js";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import IconClose from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
// icons
import icon_view from "assets/img/icon_view.png";
// jss
const styles = theme => ({
  dialogBox: {
    maxHeight: "calc(100% - 30px)"
  },
  contentDialog: {
    display: "flex",
    padding: 0,
    flexDirection: "column"
  },
  titlePopup: {
    textAlign: "center",
    margin: "15px 0 10px",
    fontSize: 25,
    fontWeight: "bold"
  },
  rowName: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    margin: "auto",
    "& label": {
      fontSize: 18,
      margin: "auto",
      fontWeight: "bold"
    }
  },
  inputName: {
    margin: 0,
    marginLeft: 10
  },
  contentFilter: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10
  },
  columFilter: {
    padding: "0 10px",
    width: "50%"
  },
  titleFilter: {
    fontSize: 14,
    marginBottom: 5
  },
  rowInputDate: {
    margin: 0
  },
  inputRootDate: {
    border: "none",
    backgroundColor: "#fff",
    corlor: "#222",
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
  rootInput: {
    "& fieldset": {
      borderRadius: 5,
      borderColor: theme.palette.secondary.main + `${"!important"}`,
      backgroundColor: "#fff"
    }
  },
  thisInputError: {
    "& fieldset": {
      borderColor: theme.palette.pink.main + `${"!important"}`
    }
  },
  thisInput: {
    padding: "8px 15px",
    minWidth: 240,
    borderRadius: 0,
    zIndex: 2
  },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 3,
    padding: 5
  },
  InputTable: {
    padding: 0,
    width: "100% !important",
    "& input": {
      padding: "5px 5px 6px"
    }
  },
  table: {
    borderSpacing: 0,
    borderTop: "solid 1px #ababab",
    borderLeft: "solid 1px #ababab",
    width: "100%",
    fontSize: 13,
    "& td": {
      borderBottom: "1px solid #ababab",
      borderRight: "1px solid #ababab",
      padding: 0,
      verticalAlign: "top"
    },
    "& td:nth-child(1)": {
      textAlign: "center"
    },
    "& td:nth-child(3)": {
      textAlign: "center"
    },
    "& td:nth-child(5)": {
      textAlign: "center"
    },
    "& td:nth-child(2)": {
      padding: 5,
      width: 80
    },
    "& td:nth-child(4)": {
      padding: 5,
      width: 120
    },
    "& $formCheckbox": {
      width: "50%",
      margin: "5px 0px"
    }
  },
  checkbox: {
    padding: "4px 5px",
    "&& svg": {
      fontSize: 20
    },
    "&& input": {
      width: 40
    }
  },
  btn: {
    backgroundColor: "#fff",
    border: "solid 2px #055d05",
    color: "#055d05",
    margin: "0 10px 0 40px",
    padding: "2px 15px",
    height: 35,
    fontSize: 15,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#055d05",
      color: "#fff"
    }
  },
  btn1: {
    backgroundColor: "#5F9EA0",
    height: 35,
    color: "#fff",
    margin: 0,
    border: "solid 2px #5F9EA0",
    padding: "2px 15px",
    fontSize: 15,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#055d05",
      borderColor: "#5F9EA0"
    }
  }
});

// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;
class PopupFilterWidget6 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoadding: false,
      nameFilter: "",
      isErrorName: false,
      sales: {
        isCheck: false,
        sales_number: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        sales_date: {
          isCheck: false,
          data: {
            isCheck: false,
            value: today
          }
        }
      },
      product: {
        isCheck: false,
        product_name: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        detailed_description: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        survey_date: {
          isCheck: false,
          data: {
            isCheck: false,
            value: today
          }
        },
        final_sales_date: {
          isCheck: false,
          data: {
            isCheck: false,
            value: today
          }
        },
        person_in_charge: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        }
      },
      amountOfMoney: {
        isCheck: false,
        tax_excluded_amount: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        consumption_tax: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        tax_included_amount: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        }
      },
      billingAddress: {
        isCheck: false,
        billing_code: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        billing_name: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        collection_method: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        billing_method: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        closing_date: {
          isCheck: false,
          data: {
            isCheck: false,
            value: today
          }
        },
        recording: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        }
      },
      // colum right
      property: {
        isCheck: false,
        property_no: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        property_name: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        property_address: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        business_name: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        survey_and_construction_date: {
          isCheck: false,
          data: {
            isCheck: false,
            value: today
          }
        },
        contact_person: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        construction_store_manager: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        details: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        }
      },
      billingDate: {
        isCheck: false,
        billing_date: {
          isCheck: false,
          data: {
            isCheck: false,
            value: today
          }
        },
        scheduled_collection_date: {
          isCheck: false,
          data: {
            isCheck: false,
            value: today
          }
        }
      },
      depositBalance: {
        isCheck: false,
        deposit_balance: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        amount_received: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        Date_of_receipt: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        amount_carried_forward: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        carry_forward_date: {
          isCheck: false,
          data: {
            isCheck: false,
            value: today
          }
        },
        adjustment_amount: {
          isCheck: false,
          data: {
            isCheck: false,
            value: ""
          }
        },
        adjustment_date: {
          isCheck: false,
          data: {
            isCheck: false,
            value: today
          }
        }
      }
    };
  }

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
  changeDate = (parent, child) => e => {
    const data = this.state[parent];
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let newDate = yy + "-" + mm + "-" + dd;
    data[child].data.value = newDate;
    this.setState({ [parent]: data });
  };

  handleChangeName = e => {
    this.setState({ nameFilter: e.target.value });
  };
  handleBlurName = () => {
    if (!this.state.nameFilter) {
      this.setState({ isErrorName: true });
    } else this.setState({ isErrorName: false });
  };
  changeCheck = (e, level, parent, child) => {
    const data = this.state[parent];
    let isCheck = e.target.checked;
    if (level === 0) {
      if (!isCheck) {
        for (var key in data) {
          if (key !== "isCheck") {
            data[key].isCheck = false;
            data[key].data.isCheck = false;
            data[key].data.value = "";
          }
        }
      }
      data.isCheck = isCheck;
    }
    if (level === 1 && child) {
      if (!isCheck) {
        for (var key1 in data) {
          if (key1 !== "isCheck") {
            data[child].data.isCheck = false;
            data[child].data.value = "";
          }
        }
      }
      data[child].isCheck = isCheck;
    }
    if (level === 2 && child) {
      if (!isCheck) {
        for (var key2 in data) {
          if (key2 !== "isCheck") {
            data[child].data.value = "";
          }
        }
      }
      data[child].data.isCheck = isCheck;
    }
    this.setState({ [parent]: data });
  };
  changeInput = (e, parent, child) => {
    const data = this.state[parent];
    data[child].data.value = e.target.value;
    this.setState({ [parent]: data });
  };
  handleSave = async () => {
    const { cookies, handleUpdateItem } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    const data = this.state;
    let isSave = false;
    let param = "";
    if (!this.state.nameFilter) {
      this.setState({ isErrorName: true });
      return;
    } else {
      this.setState({ isErrorName: false });
    }
    for (var key in data) {
      if (key !== "nameFilter" && key !== "isLoadding") {
        // data[key]: data cấp 1 => lấy data cấp 1 for tiếp
        for (var keyParam in data[key]) {
          if (
            keyParam !== "isCheck" &&
            data[key][keyParam].isCheck &&
            data[key][keyParam].data.isCheck
          ) {
            isSave = true;
            param += keyParam + "=" + data[key][keyParam].data.value + "&";
          }
        }
      }
    }
    if (!isSave || !param) {
      return;
    }
    this.setState({ isLoadding: true });
    param = param.slice(0, param.length - 1);
    let dataInsert = {
      userId: userInfo.userId,
      itemCostBalanceName: this.state.nameFilter,
      content: `${param}`
    };

    try {
      const res = await axios.post(`${apiRoot}/costbalancefilter`, dataInsert);
      if (res.status !== 200) {
        this.setState({ isLoadding: false });
        return;
      }
      if (handleUpdateItem) {
        handleUpdateItem(res.data);
      }
      this.setState({ isLoadding: false });
    } catch (error) {
      this.setState({ isLoadding: false });
    }
  };
  render = () => {
    const { classes, open, handleClose } = this.props;
    const {
      nameFilter,
      isErrorName,
      sales,
      product,
      amountOfMoney,
      billingAddress,
      // col right
      property,
      billingDate,
      depositBalance
    } = this.state;
    return (
      <React.Fragment>
        {/* popup filter */}
        <Dialog
          maxWidth={"md"}
          fullWidth={true}
          open={open}
          classes={{
            paperScrollPaper: classes.dialogBox
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <IconClose />
          </IconButton>
          <DialogContent className={classes.contentDialog}>
            <Typography className={classes.titlePopup}>
              一覧表の表示設定
            </Typography>
            <div className={classes.rowName}>
              <label htmlFor="名称：">名称：</label>
              <TextField
                error={isErrorName}
                helperText={isErrorName ? "必ず入力してください。" : ""}
                className={classes.inputName}
                value={nameFilter}
                margin="normal"
                variant="outlined"
                InputProps={{
                  classes: {
                    root: classes.rootInput,
                    input: classes.thisInput,
                    error: classes.thisInputError
                  }
                }}
                onChange={this.handleChangeName}
                onBlur={this.handleBlurName}
              />
              <Button className={classes.btn} onClick={handleClose}>
                取消（一覧表に戻る）
              </Button>
              <Button className={classes.btn1} onClick={this.handleSave}>
                この設定を保存
              </Button>
            </div>
            <div className={classes.contentFilter}>
              <div className={classes.columFilter}>
                <Typography className={classes.titleFilter}>
                  表示する項目を選んでください。　検索：検索条件
                </Typography>
                <table className={classes.table}>
                  <tbody>
                    {/* tr1 */}
                    <tr>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          checked={sales.isCheck}
                          onChange={e => this.changeCheck(e, 0, "sales", null)}
                        />
                      </td>
                      <td>売上</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!sales.isCheck}
                          checked={sales.sales_number.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 1, "sales", "sales_number")
                          }
                        />
                      </td>
                      <td>売上番号</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!sales.sales_number.isCheck}
                          checked={sales.sales_number.data.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 2, "sales", "sales_number")
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!sales.sales_number.data.isCheck}
                          value={sales.sales_number.data.value}
                          onChange={e =>
                            this.changeInput(e, "sales", "sales_number")
                          }
                        />
                      </td>
                    </tr>
                    {/* tr11 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!sales.isCheck}
                          checked={sales.sales_date.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 1, "sales", "sales_date")
                          }
                        />
                      </td>
                      <td>売上日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!sales.sales_date.isCheck}
                          checked={sales.sales_date.data.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 2, "sales", "sales_date")
                          }
                        />
                      </td>
                      <td>
                        {sales.sales_date.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                sales.sales_date.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate("sales", "sales_date")}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                    {/* tr2 */}
                    <tr>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          checked={product.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 0, "product", null)
                          }
                        />
                      </td>
                      <td>商品</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.isCheck}
                          checked={product.product_name.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 1, "product", "product_name")
                          }
                        />
                      </td>
                      <td>商品名</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.product_name.isCheck}
                          checked={product.product_name.data.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 2, "product", "product_name")
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!product.product_name.data.isCheck}
                          value={product.product_name.data.value}
                          onChange={e =>
                            this.changeInput(e, "product", "product_name")
                          }
                        />
                      </td>
                    </tr>
                    {/* tr22 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.isCheck}
                          checked={product.detailed_description.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "product",
                              "detailed_description"
                            )
                          }
                        />
                      </td>
                      <td>明細摘要</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.detailed_description.isCheck}
                          checked={product.detailed_description.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "product",
                              "detailed_description"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!product.detailed_description.data.isCheck}
                          value={product.detailed_description.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "product",
                              "detailed_description"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr23 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.isCheck}
                          checked={product.survey_date.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 1, "product", "survey_date")
                          }
                        />
                      </td>
                      <td>調査実施日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.survey_date.isCheck}
                          checked={product.survey_date.data.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 2, "product", "survey_date")
                          }
                        />
                      </td>
                      <td>
                        {product.survey_date.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                product.survey_date.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate(
                                "product",
                                "survey_date"
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                    {/* tr24 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.isCheck}
                          checked={product.final_sales_date.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "product",
                              "final_sales_date"
                            )
                          }
                        />
                      </td>
                      <td>売上確定日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.final_sales_date.isCheck}
                          checked={product.final_sales_date.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "product",
                              "final_sales_date"
                            )
                          }
                        />
                      </td>
                      <td>
                        {product.final_sales_date.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                product.final_sales_date.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate(
                                "product",
                                "final_sales_date"
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                    {/* tr25 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.isCheck}
                          checked={product.person_in_charge.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "product",
                              "person_in_charge"
                            )
                          }
                        />
                      </td>
                      <td>担当者</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!product.person_in_charge.isCheck}
                          checked={product.person_in_charge.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "product",
                              "person_in_charge"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!product.person_in_charge.data.isCheck}
                          value={product.person_in_charge.data.value}
                          onChange={e =>
                            this.changeInput(e, "product", "person_in_charge")
                          }
                        />
                      </td>
                    </tr>
                    {/* tr3 */}
                    <tr>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          checked={amountOfMoney.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 0, "amountOfMoney", null)
                          }
                        />
                      </td>
                      <td>金額</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!amountOfMoney.isCheck}
                          checked={amountOfMoney.tax_excluded_amount.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "amountOfMoney",
                              "tax_excluded_amount"
                            )
                          }
                        />
                      </td>
                      <td>税抜金額</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!amountOfMoney.tax_excluded_amount.isCheck}
                          checked={
                            amountOfMoney.tax_excluded_amount.data.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "amountOfMoney",
                              "tax_excluded_amount"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={
                            !amountOfMoney.tax_excluded_amount.data.isCheck
                          }
                          value={amountOfMoney.tax_excluded_amount.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "amountOfMoney",
                              "tax_excluded_amount"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr31 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!amountOfMoney.isCheck}
                          checked={amountOfMoney.consumption_tax.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "amountOfMoney",
                              "consumption_tax"
                            )
                          }
                        />
                      </td>
                      <td>消費税額</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!amountOfMoney.consumption_tax.isCheck}
                          checked={amountOfMoney.consumption_tax.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "amountOfMoney",
                              "consumption_tax"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!amountOfMoney.consumption_tax.data.isCheck}
                          value={amountOfMoney.consumption_tax.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "amountOfMoney",
                              "consumption_tax"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr32 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!amountOfMoney.isCheck}
                          checked={amountOfMoney.tax_included_amount.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "amountOfMoney",
                              "tax_included_amount"
                            )
                          }
                        />
                      </td>
                      <td>税込金額</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!amountOfMoney.tax_included_amount.isCheck}
                          checked={
                            amountOfMoney.tax_included_amount.data.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "amountOfMoney",
                              "tax_included_amount"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={
                            !amountOfMoney.tax_included_amount.data.isCheck
                          }
                          value={amountOfMoney.tax_included_amount.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "amountOfMoney",
                              "tax_included_amount"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr4 */}
                    <tr>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          checked={billingAddress.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 0, "billingAddress", null)
                          }
                        />
                      </td>
                      <td>請求先</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.isCheck}
                          checked={billingAddress.billing_code.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "billingAddress",
                              "billing_code"
                            )
                          }
                        />
                      </td>
                      <td>請求先コード</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.billing_code.isCheck}
                          checked={billingAddress.billing_code.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "billingAddress",
                              "billing_code"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!billingAddress.billing_code.data.isCheck}
                          value={billingAddress.billing_code.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "billingAddress",
                              "billing_code"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr41 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.isCheck}
                          checked={billingAddress.billing_name.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "billingAddress",
                              "billing_name"
                            )
                          }
                        />
                      </td>
                      <td>請求先名</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.billing_name.isCheck}
                          checked={billingAddress.billing_name.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "billingAddress",
                              "billing_name"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!billingAddress.billing_name.data.isCheck}
                          value={billingAddress.billing_name.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "billingAddress",
                              "billing_name"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr42 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.isCheck}
                          checked={billingAddress.collection_method.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "billingAddress",
                              "collection_method"
                            )
                          }
                        />
                      </td>
                      <td>回収方法</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.collection_method.isCheck}
                          checked={
                            billingAddress.collection_method.data.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "billingAddress",
                              "collection_method"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={
                            !billingAddress.collection_method.data.isCheck
                          }
                          value={billingAddress.collection_method.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "billingAddress",
                              "collection_method"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr43 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.isCheck}
                          checked={billingAddress.billing_method.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "billingAddress",
                              "billing_method"
                            )
                          }
                        />
                      </td>
                      <td>請求方法</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.billing_method.isCheck}
                          checked={billingAddress.billing_method.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "billingAddress",
                              "billing_method"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!billingAddress.billing_method.data.isCheck}
                          value={billingAddress.billing_method.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "billingAddress",
                              "billing_method"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr44 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.isCheck}
                          checked={billingAddress.closing_date.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "billingAddress",
                              "closing_date"
                            )
                          }
                        />
                      </td>
                      <td>締日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.closing_date.isCheck}
                          checked={billingAddress.closing_date.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "billingAddress",
                              "closing_date"
                            )
                          }
                        />
                      </td>
                      <td>
                        {billingAddress.closing_date.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                billingAddress.closing_date.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate(
                                "billingAddress",
                                "closing_date"
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                    {/* tr45 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.isCheck}
                          checked={billingAddress.recording.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "billingAddress",
                              "recording"
                            )
                          }
                        />
                      </td>
                      <td>請求方法</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingAddress.recording.isCheck}
                          checked={billingAddress.recording.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "billingAddress",
                              "recording"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!billingAddress.recording.data.isCheck}
                          value={billingAddress.recording.data.value}
                          onChange={e =>
                            this.changeInput(e, "billingAddress", "recording")
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={classes.columFilter}>
                <Typography className={classes.titleFilter}>
                  表示する項目を選んでください。　　　検索：検索条件
                </Typography>
                <table className={classes.table}>
                  <tbody>
                    {/* tr1 */}
                    <tr>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          checked={property.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 0, "property", null)
                          }
                        />
                      </td>
                      <td>物件</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.isCheck}
                          checked={property.property_no.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 1, "property", "property_no")
                          }
                        />
                      </td>
                      <td>物件番号</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.property_no.isCheck}
                          checked={property.property_no.data.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 2, "property", "property_no")
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!property.property_no.data.isCheck}
                          value={property.property_no.data.value}
                          onChange={e =>
                            this.changeInput(e, "property", "property_no")
                          }
                        />
                      </td>
                    </tr>
                    {/* tr12 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.isCheck}
                          checked={property.property_name.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 1, "property", "property_name")
                          }
                        />
                      </td>
                      <td>物件名</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.property_name.isCheck}
                          checked={property.property_name.data.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 2, "property", "property_name")
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!property.property_name.data.isCheck}
                          value={property.property_name.data.value}
                          onChange={e =>
                            this.changeInput(e, "property", "property_name")
                          }
                        />
                      </td>
                    </tr>
                    {/* tr13 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.isCheck}
                          checked={property.property_address.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "property",
                              "property_address"
                            )
                          }
                        />
                      </td>
                      <td>物件住所</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.property_address.isCheck}
                          checked={property.property_address.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "property",
                              "property_address"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!property.property_address.data.isCheck}
                          value={property.property_address.data.value}
                          onChange={e =>
                            this.changeInput(e, "property", "property_address")
                          }
                        />
                      </td>
                    </tr>
                    {/* tr14 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.isCheck}
                          checked={property.business_name.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 1, "property", "business_name")
                          }
                        />
                      </td>
                      <td>事業者名</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.business_name.isCheck}
                          checked={property.business_name.data.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 2, "property", "business_name")
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!property.business_name.data.isCheck}
                          value={property.business_name.data.value}
                          onChange={e =>
                            this.changeInput(e, "property", "business_name")
                          }
                        />
                      </td>
                    </tr>
                    {/* tr15 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.isCheck}
                          checked={
                            property.survey_and_construction_date.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "property",
                              "survey_and_construction_date"
                            )
                          }
                        />
                      </td>
                      <td>調査・工事日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={
                            !property.survey_and_construction_date.isCheck
                          }
                          checked={
                            property.survey_and_construction_date.data.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "property",
                              "survey_and_construction_date"
                            )
                          }
                        />
                      </td>
                      <td>
                        {property.survey_and_construction_date.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                property.survey_and_construction_date.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate(
                                "property",
                                "survey_and_construction_date"
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                    {/* tr16 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.isCheck}
                          checked={property.contact_person.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 1, "property", "contact_person")
                          }
                        />
                      </td>
                      <td>取引先担当者</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.contact_person.isCheck}
                          checked={property.contact_person.data.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 2, "property", "contact_person")
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!property.contact_person.data.isCheck}
                          value={property.contact_person.data.value}
                          onChange={e =>
                            this.changeInput(e, "property", "contact_person")
                          }
                        />
                      </td>
                    </tr>
                    {/* tr17 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.isCheck}
                          checked={property.construction_store_manager.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "property",
                              "construction_store_manager"
                            )
                          }
                        />
                      </td>
                      <td>工事店担当者</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={
                            !property.construction_store_manager.isCheck
                          }
                          checked={
                            property.construction_store_manager.data.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "property",
                              "construction_store_manager"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={
                            !property.construction_store_manager.data.isCheck
                          }
                          value={property.construction_store_manager.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "property",
                              "construction_store_manager"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr18 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.isCheck}
                          checked={property.details.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 1, "property", "details")
                          }
                        />
                      </td>
                      <td>明細</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!property.details.isCheck}
                          checked={property.details.data.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 2, "property", "details")
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={!property.details.data.isCheck}
                          value={property.details.data.value}
                          onChange={e =>
                            this.changeInput(e, "property", "details")
                          }
                        />
                      </td>
                    </tr>
                    {/* tr2 */}
                    <tr>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          checked={billingDate.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 0, "billingDate", null)
                          }
                        />
                      </td>
                      <td>請求日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingDate.isCheck}
                          checked={billingDate.billing_date.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "billingDate",
                              "billing_date"
                            )
                          }
                        />
                      </td>
                      <td>請求日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingDate.billing_date.isCheck}
                          checked={billingDate.billing_date.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "billingDate",
                              "billing_date"
                            )
                          }
                        />
                      </td>
                      <td>
                        {billingDate.billing_date.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                billingDate.billing_date.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate(
                                "billingDate",
                                "billing_date"
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                    {/* tr22 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!billingDate.isCheck}
                          checked={
                            billingDate.scheduled_collection_date.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "billingDate",
                              "scheduled_collection_date"
                            )
                          }
                        />
                      </td>
                      <td>回収予定日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={
                            !billingDate.scheduled_collection_date.isCheck
                          }
                          checked={
                            billingDate.scheduled_collection_date.data.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "billingDate",
                              "scheduled_collection_date"
                            )
                          }
                        />
                      </td>
                      <td>
                        {billingDate.scheduled_collection_date.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                billingDate.scheduled_collection_date.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate(
                                "billingDate",
                                "scheduled_collection_date"
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                    {/* tr3 */}
                    <tr>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          checked={depositBalance.isCheck}
                          onChange={e =>
                            this.changeCheck(e, 0, "depositBalance", null)
                          }
                        />
                      </td>
                      <td>入金残高</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.isCheck}
                          checked={depositBalance.deposit_balance.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "depositBalance",
                              "deposit_balance"
                            )
                          }
                        />
                      </td>
                      <td>入金残高</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.deposit_balance.isCheck}
                          checked={depositBalance.deposit_balance.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "depositBalance",
                              "deposit_balance"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={
                            !depositBalance.deposit_balance.data.isCheck
                          }
                          value={depositBalance.deposit_balance.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "depositBalance",
                              "deposit_balance"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr32 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.isCheck}
                          checked={depositBalance.amount_received.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "depositBalance",
                              "amount_received"
                            )
                          }
                        />
                      </td>
                      <td>前受金額</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.amount_received.isCheck}
                          checked={depositBalance.amount_received.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "depositBalance",
                              "amount_received"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={
                            !depositBalance.amount_received.data.isCheck
                          }
                          value={depositBalance.amount_received.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "depositBalance",
                              "amount_received"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr33 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.isCheck}
                          checked={depositBalance.Date_of_receipt.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "depositBalance",
                              "Date_of_receipt"
                            )
                          }
                        />
                      </td>
                      <td>前受日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.Date_of_receipt.isCheck}
                          checked={depositBalance.Date_of_receipt.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "depositBalance",
                              "Date_of_receipt"
                            )
                          }
                        />
                      </td>
                      <td>
                        {depositBalance.Date_of_receipt.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                depositBalance.Date_of_receipt.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate(
                                "depositBalance",
                                "Date_of_receipt"
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                    {/* tr34 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.isCheck}
                          checked={
                            depositBalance.amount_carried_forward.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "depositBalance",
                              "amount_carried_forward"
                            )
                          }
                        />
                      </td>
                      <td>繰越金額</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={
                            !depositBalance.amount_carried_forward.isCheck
                          }
                          checked={
                            depositBalance.amount_carried_forward.data.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "depositBalance",
                              "amount_carried_forward"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={
                            !depositBalance.amount_carried_forward.data.isCheck
                          }
                          value={
                            depositBalance.amount_carried_forward.data.value
                          }
                          onChange={e =>
                            this.changeInput(
                              e,
                              "depositBalance",
                              "amount_carried_forward"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr35 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.isCheck}
                          checked={depositBalance.carry_forward_date.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "depositBalance",
                              "carry_forward_date"
                            )
                          }
                        />
                      </td>
                      <td>繰越日</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.carry_forward_date.isCheck}
                          checked={
                            depositBalance.carry_forward_date.data.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "depositBalance",
                              "carry_forward_date"
                            )
                          }
                        />
                      </td>
                      <td>
                        {depositBalance.carry_forward_date.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                depositBalance.carry_forward_date.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate(
                                "depositBalance",
                                "carry_forward_date"
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                    {/* tr36 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.isCheck}
                          checked={depositBalance.adjustment_amount.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "depositBalance",
                              "adjustment_amount"
                            )
                          }
                        />
                      </td>
                      <td>調整金額</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.adjustment_amount.isCheck}
                          checked={
                            depositBalance.adjustment_amount.data.isCheck
                          }
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "depositBalance",
                              "adjustment_amount"
                            )
                          }
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.InputTable}
                          disabled={
                            !depositBalance.adjustment_amount.data.isCheck
                          }
                          value={depositBalance.adjustment_amount.data.value}
                          onChange={e =>
                            this.changeInput(
                              e,
                              "depositBalance",
                              "adjustment_amount"
                            )
                          }
                        />
                      </td>
                    </tr>
                    {/* tr37 */}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.isCheck}
                          checked={depositBalance.adjustment_date.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              1,
                              "depositBalance",
                              "adjustment_date"
                            )
                          }
                        />
                      </td>
                      <td>前受金額</td>
                      <td>
                        <Checkbox
                          className={classes.checkbox}
                          disabled={!depositBalance.adjustment_date.isCheck}
                          checked={depositBalance.adjustment_date.data.isCheck}
                          onChange={e =>
                            this.changeCheck(
                              e,
                              2,
                              "depositBalance",
                              "adjustment_date"
                            )
                          }
                        />
                      </td>
                      <td>
                        {depositBalance.adjustment_date.data.isCheck && (
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={jpLocale}
                          >
                            <DatePicker
                              format="yyyy/MM/dd"
                              className={classes.rowInputDate}
                              value={this.formatDate(
                                depositBalance.adjustment_date.data.value
                              )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  root: classes.inputRootDate,
                                  input: classes.inputInputDate
                                }
                              }}
                              onChange={this.changeDate(
                                "depositBalance",
                                "adjustment_date"
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
}

PopupFilterWidget6.propTypes = {
  classes: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool
};

export default withCookies(withRoot(withStyles(styles)(PopupFilterWidget6)));
