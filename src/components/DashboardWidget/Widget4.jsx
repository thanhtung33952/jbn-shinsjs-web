import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import axios from "axios";
import { Link } from "react-router-dom";
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
import icon_right from "assets/img/icon_right.png";
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
    top: 0,
    left: 5
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
        fontSize: 11
      }
    }
  },
  hiddleAvatar: {
    left: -320
  },
  widget_tb: {
    padding: 0,
    margin: 0,
    width: "100%"
  },
  cardContent: {
    padding: "5px !important"
  },
  progress: {
    width: "95%",
    display: "flex",
    height: 36,
    lineHeight: "26px",
    "& span": {
      cursor: "pointer"
    },
    "& $item": {
      // display: "inline-block"
    },
    [device.mobileL]: {
      height: 18,
      lineHeight: "18px"
    }
  },
  item: {},
  cricleScore: {
    width: 60,
    paddingTop: 60,
    borderRadius: "50%",
    border: "solid 3px #01A89D",
    margin: "auto 15px",
    display: "inline-block",
    position: "relative",
    boxSizing: "content-box",
    [device.mobileL]: {
      width: 30,
      paddingTop: 30
    },
    "& span": {
      position: "absolute",
      fontSize: "30px !Important",
      width: "100%",
      textAlign: "center",
      color: "#222",
      left: 0,
      fontWeight: 400,
      top: "12%",
      [device.mobileL]: {
        fontSize: "15px !Important"
      }
    },
    "& p": {
      position: "absolute",
      width: "100%",
      margin: 0,
      bottom: 20,
      fontSize: 13
    }
  },
  col1WG4: {
    display: "inline-block",
    width: "55%",
    verticalAlign: "top",
    "& span": {
      display: "block",
      fontSize: 13,
      lineHeight: "20px",
      "&:nth-child(2)": {
        paddingLeft: 10
      },
      "&:nth-child(3)": {
        paddingLeft: 20
      },
      "&:nth-child(4)": {
        paddingLeft: 30
      },
      [device.mobileL]: {
        fontSize: 9,
        lineHeight: "11px"
      }
    }
  },
  col2WG4: {
    display: "inline-block",
    width: "43%",
    textAlign: "center",
    "& span": {
      fontSize: 14,
      [device.mobileL]: {
        fontSize: 9
      }
    }
  },
  r3: {
    "& $col1WG4": {
      width: "100%",
      paddingLeft: "50%",
      marginTop: 10,
      [device.mobileL]: {
        paddingLeft: "40%",
        marginTop: 2
      }
    }
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

class Widget4 extends React.Component {
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
      listDetailSurvey: null,
      totalSurveyByStatus: 0,
      openPopup: false,
      titlePopup: "",
      isLoaddingPopup: false,
      // làm mẫu data để demo chart
      total1: 40,
      total2: 20,
      total3: 10,
      total4: 10,
      total5: 8,
      total6: 6,
      total7: 6,
      total8: 10,
      total9: 2
    };
  }
  componentDidMount = () => {
    // get total survey draft (statusPublic: 1)
    //status: 1, statusPublic: 1
    const { userInfo } = this.props;
    if (userInfo) {
      this.getTotalSurveyByStatus(userInfo);
    }
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    if (nextProps.userInfo && nextProps.userInfo.userId !== this.state.userId) {
      this.getTotalSurveyByStatus(nextProps.userInfo);
    }
    // set style cho mobile
    let isOpen = nextProps.open && nextProps.open === "widget4" ? true : false;
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

  // lấy tổng  survey theo status 1, stausPublic 1
  getTotalSurveyByStatus = async userInfo => {
    const dataApi = {
      userId: userInfo.userId
    };
    const res = await axios.post(`${apiRoot}/totalsurveybystatus`, dataApi);
    // error
    if (res.status !== 200 || res.data === false) return;
    // success
    this.setState({ totalSurveyByStatus: res.data.total });
  };

  // lấy list detail survey theo status 1, stausPublic 1
  getListDetailSurveyByStatus = async status => {
    const { userInfo } = this.props;
    const dataApi = {
      userId: userInfo.userId,
      status: status
    };
    const res = await axios.post(`${apiRoot}/detailssurveybystatus`, dataApi);
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

  openPopupSurveyDetail = (status, titlePopup) => {
    this.setState({
      openPopup: true,
      isLoaddingPopup: true,
      titlePopup: titlePopup
    });
    // lấy toàn bộ survey theo status
    this.getListDetailSurveyByStatus(status);
  };

  closePopupSurveyDetail = () => {
    this.setState({ openPopup: false });
  };

  // tính toán phần trăm thông số để render chart
  renderPercentChart = () => {
    const {
      total1,
      total2,
      total3,
      total4,
      total5,
      total6,
      total7,
      total8,
      total9
    } = this.state;
    let objData = {
      total1: total1,
      total2: total2,
      total3: total3,
      total4: total4,
      total5: total5,
      total6: total6,
      total7: total7,
      total8: total8,
      total9: total9
    };
    let arrData = [
      total1,
      total2,
      total3,
      total4,
      total5,
      total6,
      total7,
      total8,
      total9
    ];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    // tính phần trăm các value
    for (let x in objData) {
      objData[x] = (objData[x] / arrData.reduce(reducer)) * 100;
    }
    return objData;
  };
  render = () => {
    const { classes, open } = this.props;
    const { isLoaddingPopup, openPopup, listDetailSurvey } = this.state;
    let isOpen = open && open === "widget4" ? true : false;
    const percentValue = this.renderPercentChart();
    const avatar = (
      <div className={classes.contentWG} ref={this.contentAvatar}>
        <div className={classes.rowContent}>
          <div className={classes.col1WG4}>
            <span>調査手配中</span>
            <span>調査結果待ち</span>
            <span>判定中</span>
            <span>補償確認待ち</span>
          </div>
          <div className={classes.col2WG4}>
            <span>進行中の物件</span>
            <div className={classes.cricleScore}>
              <span>24</span>
            </div>
          </div>
        </div>
        <div className={classes.rowContent}>
          <div className={classes.progress}>
            <span
              onClick={() => this.openPopupSurveyDetail(1, "調査手配中")}
              style={{
                width: `${percentValue.total1}%`,
                backgroundColor: "#00A2FF"
              }}
            />
            <span
              onClick={() => this.openPopupSurveyDetail(2, "調査結果待ち")}
              style={{
                width: `${percentValue.total2}%`,
                backgroundColor: "#61D935"
              }}
            />
            <span
              style={{
                width: `${percentValue.total3}%`,
                backgroundColor: "#F8BA00"
              }}
            />
            <span
              style={{
                width: `${percentValue.total4}%`,
                backgroundColor: "#FF2600"
              }}
            />
            <span
              style={{
                width: `${percentValue.total5}%`,
                backgroundColor: "#C24885"
              }}
            />
            <span
              style={{
                width: `${percentValue.total6}%`,
                backgroundColor: "#5F5F5F"
              }}
            />
            <span
              style={{
                width: `${percentValue.total7}%`,
                backgroundColor: "#22AEFF"
              }}
            />
            <span
              style={{
                width: `${percentValue.total8}%`,
                backgroundColor: "#73DE4E"
              }}
            />
            <span
              style={{
                width: `${percentValue.total9}%`,
                backgroundColor: "#F8BA00"
              }}
            />
          </div>
        </div>
        <div className={classes.r3}>
          <div className={classes.col1WG4}>
            <span>部分転圧確認中</span>
            <span>改良工事確認中</span>
            <span>証明書発行待ち</span>
            <span>郵送待ち</span>
          </div>
        </div>
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
                <img src={icon_right} alt="Widget 4" />
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
            title="進捗状況"
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
          onClose={this.closePopupSurveyDetail}
          aria-labelledby="count-survey-draft"
          style={{ minWidth: 500 }}
        >
          <MuiDialogTitle disableTypography className={classes.titlePopup}>
            <Typography>{this.state.titlePopup}</Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={this.closePopupSurveyDetail}
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
                      <TableCell align="left">{row.update_date}</TableCell>
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

Widget4.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExpanded: PropTypes.func,
  open: PropTypes.string,
  userInfo: PropTypes.object,
  reponsive: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(Widget4)));
