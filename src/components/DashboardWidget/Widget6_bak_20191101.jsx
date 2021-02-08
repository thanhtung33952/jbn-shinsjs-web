import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import IconAdd from "@material-ui/icons/Add";
import IconRemove from "@material-ui/icons/Remove";

import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
// icons
import icon_view from "assets/img/icon_view.png";
// constant
import { folderRoot } from "constant/index.js";

import { device } from "assets/jss/responsive/device.jsx";
// jss
const styles = theme => ({
  card: {
    width: "100%",
    height: "100%",
    boxShawdow: "none"
  },
  cardHeader: {
    backgroundColor: "#5F9EA0",
    padding: 5,
    color: "#fff",
    textAlign: "center",
    "& img": {
      width: 30,
      opacity: 0.7,
      [device.mobileL]: {
        width: 15
      }
    },
    [device.mobileL]: {
      padding: "2px 5px"
    }
  },
  media: {
    backgroundSize: "auto",
    height: "calc(100% - 40px)"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    padding: 0,
    margin: 0,
    "& svg": {
      fontSize: "1.9rem",
      borderRadius: "50%",
      border: "solid 2px",
      opacity: 0.6,
      background: "#fff",
      [device.mobileL]: {
        fontSize: "1.1rem",
        marginTop: -4
      }
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    height: "auto",
    width: "auto",
    background: "none",
    borderRadius: 0
  },
  action: {
    padding: 0,
    margin: 0
  },
  headSpan: {
    "& span": {
      fontWeight: "bold",
      fontSize: 16,
      [device.mobileL]: {
        fontSize: 11
      }
    }
  },
  iconLeft: {
    marginRight: 0
  },
  contentWG: {
    fontSize: 16,
    color: "#5E5E5E",
    fontWeight: 500,
    transition: "all ease 0.4s",
    padding: 5,
    position: "absolute",
    width: 310,
    top: 8,
    left: 0,
    [device.mobileL]: {
      top: 0
    }
  },
  fullContent: {
    position: "absolute",
    width: 620,
    height: 540,
    top: 0,
    left: 325,
    padding: 10
  },
  contentDefault: {
    transition: "all ease 0.4s",
    left: 0,
    position: "relative",
    [device.mobileL]: {
      padding: "0 !important",
      "& *": {
        fontSize: 11
      }
    }
  },
  hiddleAvatar: {
    left: -320
  },
  widget_tb: {
    padding: 0,
    margin: "auto",
    width: "90%",
    fontSize: 12,
    color: "#5E5E5E",
    fontWeight: 500,
    borderSpacing: 0,
    "& tfoot tr th": {
      paddingTop: 10,
      fontSize: 14
    },
    "& tr td": {
      borderBottom: "solid 1px #ddd",
      height: 28,
      position: "relative",
      padding: "0 12px"
    },
    "& tbody tr:nth-last-child(1) td": {
      borderBottomColor: "#222"
    },
    "& tr td:nth-child(1)": {
      borderBottomColor: "transparent !important",
      position: "relative",
      padding: 0,
      "& span": {
        position: "absolute",
        bottom: -8,
        color: "#222",
        fontWeight: "bold"
      }
    },
    [device.mobileL]: {
      marginTop: 5
    }
  },
  spanData: {
    position: "absolute",
    width: "calc(100% - 24px)",
    background: "#00a2ff",
    bottom: 0
  },
  cardContent: {
    padding: "5px !important"
  },
  progress: {
    width: "100%",
    display: "flex",
    height: 32,
    lineHeight: "32px",
    marginBottom: 10,
    color: "#fff",
    "& span": {
      textAlign: "center"
    },
    [device.mobileL]: {
      height: 16,
      lineHeight: "15px",
      marginBottom: 0
    }
  },
  rowBtn: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 5,
    "& button": {
      boxShadow: "none",
      background: "none",
      border: "solid 1px #c1c0c0",
      borderRadius: 0,
      padding: "3px 28px",
      color: "#b1b1b1",
      fontSize: 13,
      [device.mobileL]: {
        padding: "2px 0",
        minWidth: 50
      }
    }
  },
  title: {
    textAlign: "center",
    color: "darkgreen",
    marginBottom: 10,
    fontSize: "1.2em"
  },
  rowField: {
    display: "flex",
    borderBottom: "1px solid gray",
    padding: "10px 0",
    "& label": {
      width: 100,
      fontSize: 16
    }
  },
  inlineButton: {},
  button: {
    border: "solid 1px gray",
    padding: "4px 8px",
    margin: "0 5px",
    minWidth: 35,
    "&:hover": {
      backgroundColor: "aquamarine"
    }
  },
  selectBtn: {
    backgroundColor: "#f5c43e",
    "&:hover": {
      backgroundColor: "#f5c43e"
    }
  },
  rowBtnSave: {
    marginTop: 20,
    display: "flex"
  },
  btnSave: {
    backgroundColor: "green",
    color: "#fff",
    margin: "auto",
    padding: "8px 15px",
    fontSize: 15,
    "&:hover": {
      backgroundColor: "#055d05"
    }
  },
  rowInputDate: {
    margin: "0 5px"
  },
  inputRootDate: {
    border: "solid 1px gray",
    borderRadius: 4,
    backgroundColor: "#f5c43e",
    "&:after": {
      content: "none"
    },
    "&:before": {
      content: "none"
    }
  },
  inputInputDate: {
    padding: 7,
    fontSize: "0.875rem",
    fontWeight: 500
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
class Widget6 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoadingSearchCompany: false,
      listCompany: [],
      totalSales: 500,
      totalPurchase: 260,
      totalDeposit: 140,
      data: {
        display: "",
        detailView: "",
        periodFrom: today,
        periodTo: today,
        companyType: "",
        companyName: "",
        personInCharge: ""
      }
    };
    this.contentWidget = React.createRef();
    this.contentAvatar = React.createRef();
    this.blockContent = React.createRef();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    // set style cho mobile
    let isOpen = nextProps.open && nextProps.open === "widget6" ? true : false;
    if (!nextProps.reponsive) return;
    // style left khối bao avatar và nội dụng khi open, close widget
    this.contentWidget.current.style.left = isOpen
      ? -nextProps.reponsive.width + "px"
      : 0;

    // set width avatar theo widget bên trên tính được truyền xuống
    this.contentAvatar.current.style.width = nextProps.reponsive.width + "px";

    // set width, height, left cho khối nội dung dựa vào width bên trên truyền xuống
    this.blockContent.current.style.width =
      nextProps.reponsive.width * 2 + 10 + "px";
    this.blockContent.current.style.height =
      nextProps.reponsive.width * 2 - 40 + "px";
    this.blockContent.current.style.left = nextProps.reponsive.width + "px";
  };

  handleExpandClick = () => {
    const { handleExpanded } = this.props;
    if (handleExpanded) {
      handleExpanded();
    }
  };

  isSelect = (name, value) => {
    const { data } = this.state;
    if (!data || !data[name]) return false;
    if (data[name].indexOf(value) !== -1) {
      return true;
    }
    return false;
  };
  handleSelectData = (name, value) => {
    const { data } = this.state;
    if (data[name] === value) {
      data[name] = "";
    } else {
      data[name] = value;
    }
    this.setState({ data });
  };

  // tính toán phần trăm thông số để render chart
  renderPercentChart = () => {
    const { totalSales, totalPurchase, totalDeposit } = this.state;
    let objData = {
      totalSales: totalSales,
      totalPurchase: totalPurchase,
      totalDeposit: totalDeposit
    };
    // tìm max number (lấy thang numbermax làm chuẩn 100%)
    let numberMax = 0;
    for (let x in objData) {
      if (parseInt(objData[x]) > numberMax) numberMax = objData[x];
    }
    // tính phần trăm các value
    for (let x in objData) {
      objData[x] = (objData[x] / numberMax) * 100;
    }
    return objData;
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
  handleChangeDate = name => e => {
    const { data } = this.state;
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let newDate = yy + "-" + mm + "-" + dd;
    data[`${name}`] = newDate;
    this.setState({ data });
  };

  render = () => {
    const { classes, open } = this.props;
    const { data } = this.state;

    const percentValue = this.renderPercentChart();
    let isOpen = open && open === "widget6" ? true : false;

    let paramUrl = "";
    if (data.display) {
      paramUrl += `display=${data.display}&`;
    }
    if (data.detailView) {
      paramUrl += `detailview=${data.detailView}&`;
    }
    if (data.periodFrom) {
      paramUrl += `periodfrom=${data.periodFrom}&`;
    }
    if (data.periodTo) {
      paramUrl += `periodto=${data.periodTo}&`;
    }
    if (data.companyType) {
      paramUrl += `companytype=${data.companyType}&`;
    }
    if (data.companyName) {
      paramUrl += `companyname=${data.companyName}&`;
    }
    if (data.personInCharge) {
      paramUrl += `personincharge=${data.personInCharge}&`;
    }
    paramUrl = paramUrl.slice(0, paramUrl.length - 1);
    // console.log(data);
    const avatar = (
      <div className={classes.contentWG} ref={this.contentAvatar}>
        <div className={classes.rowBtn}>
          <Button variant="contained" className={classes.button}>
            先月
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            style={{ backgroundColor: "#00A2FF", color: "#fff" }}
          >
            今月
          </Button>
          <Button variant="contained" className={classes.btnActive}>
            来月
          </Button>
        </div>
        <table className={classes.widget_tb}>
          <tbody>
            <tr>
              <td>
                <span>100</span>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <span>75</span>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <span>50</span>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <span>25</span>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <span>0</span>
              </td>
              <td>
                <span
                  className={classes.spanData}
                  style={{
                    height: `calc(${percentValue.totalSales * 4}% + 4px)`
                  }}
                ></span>
              </td>
              <td>
                <span
                  className={classes.spanData}
                  style={{
                    height: `calc(${percentValue.totalPurchase * 4}% + 4px)`
                  }}
                ></span>
              </td>
              <td>
                <span
                  className={classes.spanData}
                  style={{
                    height: `calc(${percentValue.totalDeposit * 4}% + 4px)`
                  }}
                ></span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th style={{ width: 50 }}></th>
              <th style={{ width: "29%" }}>売上</th>
              <th style={{ width: "29%" }}>仕入</th>
              <th style={{ width: "29%" }}>入金</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          classes={{
            action: classes.action,
            content: classes.headSpan,
            avatar: classes.iconLeft
          }}
          avatar={
            <Avatar className={classes.avatar}>
              <img src={icon_view} alt="Widget 6" />
            </Avatar>
          }
          action={
            <IconButton
              className={classes.expand}
              onClick={this.handleExpandClick}
            >
              {isOpen ? <IconRemove /> : <IconAdd />}
            </IconButton>
          }
          title="仕入・請求管理"
        />
        <CardContent
          className={`${classes.contentDefault} ${isOpen &&
            classes.hiddleAvatar}`}
          ref={this.contentWidget}
        >
          {avatar}
          <div className={classes.fullContent} ref={this.blockContent}>
            {/* すぐにすべき事の詳細を表示します。 */}
            <Typography className={classes.title}>フィルター</Typography>
            <div
              className={classes.rowField}
              style={{
                justifyContent: "flex-end",
                fontWeight: "bold",
                color: "darkgreen"
              }}
            >
              ▼ この設定を保存　　　▶︎ 保存されたフィルター
            </div>
            <div
              className={classes.rowField}
              style={{ borderBottomColor: "transparent" }}
            >
              <label htmlFor="">表示</label>
              <div className={classes.inlineButton}>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("display", "売上一覧")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() => this.handleSelectData("display", "売上一覧")}
                >
                  売上一覧
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("display", "仕入一覧")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() => this.handleSelectData("display", "仕入一覧")}
                >
                  仕入一覧
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("display", "バランス")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() => this.handleSelectData("display", "バランス")}
                >
                  バランス
                </Button>
              </div>
            </div>
            <div className={classes.rowField}>
              <label htmlFor="">詳細表示</label>
              <div className={classes.inlineButton}>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("detailView", "未入金")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() => this.handleSelectData("detailView", "未入金")}
                >
                  未入金
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("detailView", "前受") ? classes.selectBtn : ""
                  }`}
                  onClick={() => this.handleSelectData("detailView", "前受")}
                >
                  前受
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("detailView", "売掛") ? classes.selectBtn : ""
                  }`}
                  onClick={() => this.handleSelectData("detailView", "売掛")}
                >
                  売掛
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("detailView", "繰越") ? classes.selectBtn : ""
                  }`}
                  onClick={() => this.handleSelectData("detailView", "繰越")}
                >
                  繰越
                </Button>
              </div>
            </div>
            <div className={classes.rowField}>
              <label htmlFor="">期間</label>
              <div className={classes.inlineButton}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
                  <DatePicker
                    value={this.formatDate(data.periodFrom)}
                    format="yyyy/MM/dd"
                    className={classes.rowInputDate}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.inputRootDate,
                        input: classes.inputInputDate
                      }
                    }}
                    onChange={this.handleChangeDate("periodFrom")}
                  />
                </MuiPickersUtilsProvider>
                から
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jpLocale}>
                  <DatePicker
                    value={this.formatDate(data.periodTo)}
                    format="yyyy/MM/dd"
                    minDate={data.periodFrom}
                    className={classes.rowInputDate}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.inputRootDate,
                        input: classes.inputInputDate
                      }
                    }}
                    onChange={this.handleChangeDate("periodTo")}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className={classes.rowField}>
              <label htmlFor="">会社種別</label>
              <div className={classes.inlineButton}>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("companyType", "すべて")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() => this.handleSelectData("companyType", "すべて")}
                >
                  すべて
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("companyType", "代理店")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() => this.handleSelectData("companyType", "代理店")}
                >
                  代理店
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("companyType", "調査会社")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() =>
                    this.handleSelectData("companyType", "調査会社")
                  }
                >
                  調査会社
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("companyType", "工事会社")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() =>
                    this.handleSelectData("companyType", "工事会社")
                  }
                >
                  工事会社
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("companyType", "取次店")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() => this.handleSelectData("companyType", "取次店")}
                >
                  取次店
                </Button>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("companyType", "その他")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() => this.handleSelectData("companyType", "その他")}
                >
                  その他
                </Button>
              </div>
            </div>
            <div className={classes.rowField}>
              <label htmlFor="">会社名</label>
              <div className={classes.inlineButton}>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("companyName", "すべて")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() => this.handleSelectData("companyName", "すべて")}
                >
                  すべて
                </Button>
                <Button className={`${classes.button}`}>+</Button>
              </div>
            </div>
            <div className={classes.rowField}>
              <label htmlFor="">担当者</label>
              <div className={classes.inlineButton}>
                <Button
                  className={`${classes.button} ${
                    this.isSelect("personInCharge", "指定なし")
                      ? classes.selectBtn
                      : ""
                  }`}
                  onClick={() =>
                    this.handleSelectData("personInCharge", "指定なし")
                  }
                >
                  指定なし
                </Button>
                <Button className={`${classes.button}`}>+</Button>
              </div>
            </div>
            <div className={classes.rowBtnSave}>
              <Button
                className={classes.btnSave}
                href={`${folderRoot}cost/balance?${paramUrl}`}
                target="_blank"
              >
                この条件で別ウインドウに表示します
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
}

Widget6.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExpanded: PropTypes.func,
  open: PropTypes.string,
  reponsive: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(Widget6)));
