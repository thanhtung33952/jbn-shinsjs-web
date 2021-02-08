import React from "react";
// import { HorizontalBar } from "react-chartjs-2";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { Link } from "react-router-dom";
import axios from "axios";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import IconAdd from "@material-ui/icons/Add";
import IconRemove from "@material-ui/icons/Remove";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
// icons
import icon_save from "assets/img/icon_save.png";
// constant
import { apiRoot, folderRoot } from "constant/index.js";

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
  iconLeft: {
    marginRight: 0
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
  contentWG: {
    fontSize: 16,
    color: "#5E5E5E",
    fontWeight: 500,
    transition: "all ease 0.4s",
    position: "absolute",
    width: 310,
    height: 230,
    top: 0,
    left: 0
  },
  fullContent: {
    position: "absolute",
    width: 620,
    height: 540,
    top: 0,
    left: 325,
    padding: 5
  },
  contentDefault: {
    transition: "all ease 0.4s",
    left: 0,
    position: "relative",
    [device.mobileL]: {
      "& *": {
        fontSize: 10
      }
    }
  },
  hiddleAvatar: {
    left: -320
  },
  widget_tb: {
    padding: 0,
    margin: 0,
    width: "100%",
    "& tr": {
      cursor: "pointer"
    },
    "& tr td:first-child": {
      width: "40%",
      textAlign: "right"
    },
    "& tr td": {
      borderBottom: "solid 1px #e8e8e8",
      padding: "3px 0",
      [device.mobileL]: {
        padding: 0
      }
    }
  },
  cardContent: {
    padding: "5px !important"
  },
  progress: {
    width: "100%",
    display: "flex",
    height: 28,
    lineHeight: "26px",
    "& $item": {
      // display: "inline-block"
    },
    [device.mobileL]: {
      height: 15,
      lineHeight: "15px"
    }
  },
  item: {},
  spanEnd: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: "bold",
    minWidth: 25
  },
  titlePopup: {
    padding: 10,
    display: "flex",
    justifyContent: "space-evenly",
    "& p": {
      textAlign: "center",
      flex: "1 auto",
      fontWeight: 600
    },
    "& button": {
      padding: 8,
      position: "absolute",
      right: 5,
      top: 3
    }
  },
  aRedirect: {
    "& a": {
      color: "#222"
    }
  },
  loaddingPopup: {
    margin: "30px auto",
    marginLeft: "calc(50% - 15px)",
    color: "#222"
  },
  emptyData: {
    textAlign: "center",
    padding: "20px 0 30px",
    fontSize: 12
  }
});

class Widget2 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.contentWidget = React.createRef();
    this.contentAvatar = React.createRef();
    this.blockContent = React.createRef();
    this.state = {
      userId: null,
      openPopup: false,
      totalSurvey: 0,
      oneHourElapsed: 36,
      threeHoursElapsed: 18,
      sixHoursElapsed1: 18,
      sixHoursElapsed2: 54,
      oneDayOrMore: 18,
      holdMatter: 1.5,
      isLoaddingPopup: false,
      listDetailSurvey: null
    };
  }

  componentDidMount = () => {
    const { userInfo } = this.props;
    if (userInfo) {
      this.setState({ userId: userInfo.userId });
      this.getTotalSurveyByUser(userInfo);
    }
  };
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    if (nextProps.userInfo && nextProps.userInfo.userId !== this.state.userId) {
      this.getTotalSurveyByUser(nextProps.userInfo);
    }
    // set style cho mobile
    let isOpen = nextProps.open && nextProps.open === "widget2" ? true : false;
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

  // lấy tổng  survey theo status 0 : draft
  getTotalSurveyByUser = async userInfo => {
    const dataApi = { userId: userInfo.userId };
    const res = await axios.post(`${apiRoot}/totalnotifyinbox`, dataApi);
    // error
    if (res.status !== 200 || res.data === false) return;
    // success
    this.setState({ totalSurvey: parseInt(res.data.total) });
  };
  // lấy list detail survey theo status 0 : draft
  getListDetailSurveyByUser = async () => {
    const { userInfo } = this.props;
    const dataApi = { userId: userInfo.userId };
    const res = await axios.post(`${apiRoot}/detailnotifyinbox`, dataApi);
    // error
    if (res.status !== 200 || res.data === false) return;
    // success
    this.setState({ listDetailSurvey: res.data, isLoaddingPopup: false });
  };
  handleExpandClick = () => {
    const { handleExpanded } = this.props;
    if (handleExpanded) {
      handleExpanded();
    }
  };

  openPopupSurvey = () => {
    this.setState({ openPopup: true, isLoaddingPopup: true });
    // lấy toàn bộ survey theo user
    this.getListDetailSurveyByUser();
  };
  closePopupSurvey = () => {
    this.setState({ openPopup: false });
  };

  // tính toán phần trăm thông số để render chart
  renderPercentChart = () => {
    const {
      totalSurvey,
      oneHourElapsed,
      threeHoursElapsed,
      sixHoursElapsed1,
      sixHoursElapsed2,
      oneDayOrMore,
      holdMatter
    } = this.state;
    let objData = {
      totalSurvey: totalSurvey,
      oneHourElapsed: oneHourElapsed,
      threeHoursElapsed: threeHoursElapsed,
      sixHoursElapsed1: sixHoursElapsed1,
      sixHoursElapsed2: sixHoursElapsed2,
      oneDayOrMore: oneDayOrMore,
      holdMatter: holdMatter
    };
    // let arrData = [1, 2, 5, 236, 39, 12];
    // tìm max number
    let numberMax = 0;
    for (let x in objData) {
      if (parseInt(objData[x]) > numberMax) numberMax = objData[x];
    }
    // làm tròn số lên hàng chục phần nguyên
    if (numberMax % 10 !== 0) {
      for (let i = 1; i <= 10; i++) {
        if ((numberMax + i) % 10 === 0) {
          numberMax = numberMax + i;
          break;
        }
      }
    }
    // tính phần trăm các value
    for (let x in objData) {
      objData[x] = (objData[x] / numberMax) * 100;
    }
    return objData;
  };

  render = () => {
    const { classes, open } = this.props;
    const {
      totalSurvey,
      openPopup,
      listDetailSurvey,
      isLoaddingPopup
    } = this.state;
    const percentValue = this.renderPercentChart();
    let isOpen = open && open === "widget2" ? true : false;
    // img đại diện widget
    const avatar = (
      <div className={classes.contentWG} ref={this.contentAvatar}>
        <table className={classes.widget_tb}>
          <tbody>
            <tr onClick={this.openPopupSurvey}>
              <td>地盤調査申込：</td>
              <td>
                <div className={classes.progress}>
                  <span
                    style={{
                      width: `${percentValue.totalSurvey}%`,
                      backgroundColor: "#EE230B"
                    }}
                  />
                  <span className={classes.spanEnd}>{totalSurvey}件</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>1時間経過：</td>
              <td>
                <div className={classes.progress}>
                  <span
                    style={{
                      width: `${percentValue.oneHourElapsed}%`,
                      backgroundColor: "#00A2FF"
                    }}
                  />
                  <span className={classes.spanEnd}>2件</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>3時間経過：</td>
              <td>
                <div className={classes.progress}>
                  <span
                    style={{
                      width: `${percentValue.threeHoursElapsed}%`,
                      backgroundColor: "#61D935"
                    }}
                  />
                  <span className={classes.spanEnd}>1件</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>6時間経過：</td>
              <td>
                <div className={classes.progress}>
                  <span
                    style={{
                      width: `${percentValue.sixHoursElapsed1}%`,
                      backgroundColor: "#EE230B",
                      fontSize: 11,
                      textAlign: "center",
                      color: "#fff"
                    }}
                  >
                    促促
                  </span>
                  <span
                    style={{
                      width: `${percentValue.sixHoursElapsed2}%`,
                      backgroundColor: "#F8BA00"
                    }}
                  />
                  <span className={classes.spanEnd}>4停</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>1日以上経過：</td>
              <td>
                <div className={classes.progress}>
                  <div className={classes.progress}>
                    <span
                      style={{
                        width: `${percentValue.oneDayOrMore}%`,
                        backgroundColor: "#EF5FA7"
                      }}
                    />
                    <span className={classes.spanEnd}>1件</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>保留案件：</td>
              <td>
                <div className={classes.progress}>
                  <div className={classes.progress}>
                    <span
                      style={{
                        width: `${percentValue.holdMatter}%`,
                        backgroundColor: "#00A2FF"
                      }}
                    />
                    <span className={classes.spanEnd}>なし</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
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
                <img src={icon_save} alt="Save" />
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
            title="受信箱"
          />
          <CardContent
            className={`${classes.contentDefault} ${isOpen &&
              classes.hiddleAvatar}`}
            ref={this.contentWidget}
          >
            {avatar}
            <Typography className={classes.fullContent} ref={this.blockContent}>
              すぐにすべき事の詳細を表示します。
            </Typography>
          </CardContent>
        </Card>

        {/* Popup show list survey by statusPublic */}
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openPopup}
          onClose={this.closePopupSurvey}
          aria-labelledby="count-survey-draft"
          style={{ minWidth: 500 }}
        >
          <MuiDialogTitle disableTypography className={classes.titlePopup}>
            <Typography>未完成申込書</Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={this.closePopupSurvey}
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent style={{ padding: 0, paddingBottom: 10 }}>
            {isLoaddingPopup ? (
              <CircularProgress size={30} className={classes.loaddingPopup} />
            ) : listDetailSurvey && listDetailSurvey.length > 0 ? (
              <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ paddingLeft: 20 }}>ID</TableCell>
                    <TableCell align="left">Date Update</TableCell>
                    <TableCell align="left">Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDetailSurvey.map(row => (
                    <TableRow key={row.id}>
                      <TableCell align="left" style={{ paddingLeft: 20 }}>
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left" className={classes.aRedirect}>
                        <Link to={`${folderRoot}operation/survey/${row.id}`}>
                          Detail
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography className={classes.emptyData}>
                データが空です
              </Typography>
            )}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
}

Widget2.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExpanded: PropTypes.func,
  open: PropTypes.string,
  userInfo: PropTypes.object,
  reponsive: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(Widget2)));
