import React from "react";
import axios from "axios";
import { apiRoot, folderRoot } from "constant/index.js";
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
import IconClose from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import DateFnsUtils from "@date-io/date-fns";
import jpLocale from "date-fns/locale/ja";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker} from "@material-ui/pickers";

// component customer
import PopupFilterWidget6 from "components/FilterDashboard/PopupFilterWidget6.jsx";
// icons
import icon_view from "assets/img/icon_view.png";

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
    margin: "15px 0",
    "& label": {
      width: 80,
      fontSize: 16,
      textAlign: "right",
      paddingRight: 25
    }
  },
  listItem: {
    width: "100%",
    height: 245,
    border: "solid 1px #cac9c9",
    overflowY: "auto",
    "& nav": {
      padding: "0 !important"
    }
  },
  scrollListItem: {
    paddingBottom: 20
  },
  itemitem: {
    padding: 0,
    height: 40,
    "&:hover": {
      backgroundColor: "#86BB86 !Important",
      "& $btnDelete": {
        display: "block"
      }
    }
  },
  itemSelect: {
    backgroundColor: "#86BB86 !Important",
    "& $btnDelete": {
      display: "block"
    }
  },
  inlineCol: {
    width: "calc(100% - 100px)",
    display: "flex",
    justifyContent: "space-between"
  },
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
    // marginTop: 20,
    marginRight: 20,
    display: "flex"
  },
  btnSave: {
    backgroundColor: "#5F9EA0",
    color: "#fff",
    margin: "auto",
    padding: "3px 15px",
    fontSize: 15,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#055d05"
    }
  },
  disabledBtn: {
    color: "gray",
    backgroundColor: "#c0c5c5"
  },
  rowInputDate: {
    margin: 0,
    flex: 1,
    "& button": {
      padding: 6,
      "& svg": {
        fontSize: 20
      }
    }
  },
  inputRootDate: {
    border: "solid 1px gray",
    borderRadius: 4,
    // backgroundColor: "#f5c43e",
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
  },
  btnDelete: {
    borderLeft: "solid 2px #fff",
    borderRadius: 0,
    marginRight: 0,
    height: 40,
    lineHeight: "40px",
    padding: "0 12px",
    display: "none"
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
      isLoadingItem: false,
      isNewItem: false,
      itemSelect: null,
      dataItem: [],
      totalSales: 500,
      totalPurchase: 260,
      totalDeposit: 140,
      dateTo: today,
      dateEnd: today
    };
    this.contentWidget = React.createRef();
    this.contentAvatar = React.createRef();
    this.blockContent = React.createRef();
  }
  componentDidMount = () => {
    this.getCostbalancefilter();
  };

  getCostbalancefilter = async () => {
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    if (!userInfo || !userInfo.userId) {
      return;
    }
    try {
      const res = await axios.get(
        `${apiRoot}/costbalancefilters/${userInfo.userId}`
      );
      // console.log(result);
      if (res.status !== 200 || !res.data) {
        return;
      }
      // console.log(res.data);
      this.setState({ dataItem: res.data });
      return;
    } catch (error) {
      return;
    }
  };
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
    if (!e) return;
    let yy = String(e.getFullYear());
    let mm = String(parseInt(e.getMonth()) + 1);
    let dd = String(e.getDate());
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let newDate = yy + "-" + mm + "-" + dd;
    this.setState({ [name]: newDate });
  };

  handleSelectItem = itemID => {
    if (itemID === this.state.itemSelect) {
      this.setState({ itemSelect: null });
    } else {
      this.setState({ itemSelect: itemID });
    }
  };

  handleDoubleClickItem = indexItem => {
    window.open(
      `${folderRoot}cost/balance/${indexItem ? indexItem.id : null}`,
      "_blank"
    ); //to open new page
  };

  closeNewItem = () => {
    this.setState({ isNewItem: false });
  };

  handleUpdateItem = item => {
    if (!item) {
      return;
    }
    this.setState({
      dataItem: this.state.dataItem.concat(item),
      isNewItem: false
    });
  };

  handleDeleteItem = async id => {
    const dataRemove = this.state.dataItem;
    try {
      const res = await axios.delete(`${apiRoot}/costbalancefilter/${id}`);
      // faild
      if (res.status !== 200) {
        return;
      }
      // success
      // remove item
      let index = dataRemove.findIndex(x => x.id === id);
      if (index !== -1) {
        dataRemove.splice(index, 1);
        this.setState({ dataItem: dataRemove });
      }
    } catch (error) {
      return;
    }
  };
  renderView({ style, ...props }) {
    const thumbStyle = {
      paddingRight: 10,
      overflow: "hidden",
      overflowY: "auto",
      marginBottom: 0
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }
  renderThumbScroll({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "rgba(30,30,30,0.2)",
      borderRadius: 5,
      right: -3,
      width: 5
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render = () => {
    const { classes, open } = this.props;
    const { dataItem, itemSelect, isNewItem, dateTo, dateEnd } = this.state;
    // console.log(dateEnd);
    const percentValue = this.renderPercentChart();
    let isOpen = open && open === "widget6" ? true : false;

    let itemRender =
      dataItem &&
      dataItem.length > 0 &&
      dataItem.map((item, i) => {
        return (
          <ListItem
            key={i}
            button
            selected={itemSelect === item.id}
            onClick={() => this.handleSelectItem(item.id)}
            onDoubleClick={() => this.handleDoubleClickItem(item)}
            classes={{
              root: classes.itemitem,
              selected: classes.itemSelect
            }}
          >
            <ListItemText
              primary={`Balance_${i + 1}`}
              style={{ paddingLeft: 20 }}
            />
            <IconButton
              edge="end"
              className={classes.btnDelete}
              onClick={() => this.handleDeleteItem(item.id)}
            >
              <IconClose />
            </IconButton>
          </ListItem>
        );
      });

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
      <React.Fragment>
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
              <Typography className={classes.title}>一覧表の表示</Typography>
              <div className={classes.rowField} style={{ marginTop: 20 }}>
                <label htmlFor="">{/* <IconCalendar /> */}</label>
                <div className={classes.inlineCol}>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={jpLocale}
                  >
                    <KeyboardDatePicker
                      format="yyyy/MM/dd"
                      className={classes.rowInputDate}
                      placeholder={today}
                      value={dateTo}
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        classes: {
                          root: classes.inputRootDate,
                          input: classes.inputInputDate
                        }
                      }}
                      style={{ marginLeft: 0 }}
                      onChange={this.handleChangeDate("dateTo")}
                    />
                  </MuiPickersUtilsProvider>
                  <span
                    style={{
                      lineHeight: "30px",
                      width: 50,
                      textAlign: "center"
                    }}
                  >
                    から
                  </span>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={jpLocale}
                  >
                    <KeyboardDatePicker
                      format="yyyy/MM/dd"
                      className={classes.rowInputDate}
                      placeholder={today}
                      value={dateEnd}
                      minDate={dateTo}
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        classes: {
                          root: classes.inputRootDate,
                          input: classes.inputInputDate
                        }
                      }}
                      onChange={this.handleChangeDate("dateEnd")}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
              <div className={classes.rowField}>
                <label htmlFor="">一覧表 </label>
                <div className={classes.inlineCol}>
                  {dataItem && dataItem.length > 0 && (
                    <div className={classes.listItem}>
                      <List
                        component="nav"
                        style={{ padding: 0, paddingBottom: 20 }}
                      >
                        {itemRender}
                      </List>
                    </div>
                  )}
                </div>
              </div>
              <div className={classes.rowField} style={{ marginTop: 25 }}>
                <label htmlFor=""> </label>
                <div className={classes.rowBtnSave}>
                  <Button
                    className={classes.btnSave}
                    style={{ width: 140 }}
                    // onClick={() => this.setState({ isNewItem: true })}
                    target="_blank"
                    href={`${folderRoot}detailed-search`}
                  >
                    設定の新規作成
                  </Button>
                </div>
                <div className={classes.rowBtnSave}>
                  <Button
                    disabled={!itemSelect}
                    className={`${classes.btnSave} ${
                      !itemSelect ? classes.disabledBtn : ""
                    }`}
                    style={{ width: 140 }}
                    // onClick={() => this.setState({ isNewItem: true })}
                    target="_blank"
                    href={`${folderRoot}detailed-search/${itemSelect}`}
                  >
                    設定の編集
                  </Button>
                </div>
              </div>

              {/* <div className={classes.rowBtnSave}>
                <Button
                  disabled={indexItem ? false : true}
                  className={classes.btnSave}
                  href={`${folderRoot}cost/balance?${
                    indexItem ? indexItem.content : null
                  }`}
                  target="_blank"
                >
                  別ウインドウに表示します
                </Button>
              </div> */}
            </div>
          </CardContent>
        </Card>
        {/* popup filter */}
        {isNewItem && (
          <PopupFilterWidget6
            open={isNewItem}
            handleClose={this.closeNewItem}
            handleUpdateItem={this.handleUpdateItem}
          />
        )}
      </React.Fragment>
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
