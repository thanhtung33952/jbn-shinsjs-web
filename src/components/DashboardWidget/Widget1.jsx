import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { Link } from "react-router-dom";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import IconAdd from "@material-ui/icons/Add";
import IconRemove from "@material-ui/icons/Remove";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
// icons
import icon_sms from "assets/img/icon_sms.png";
import icon_check from "assets/img/check.PNG";
import icon_right from "assets/img/arrow_right.PNG";
// import imgAvatar from "assets/img/p61.png";
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
    backgroundColor: "#D82424",
    padding: 5,
    color: "#fff",
    textAlign: "center",
    "& img": {
      width: 30,
      opacity: 0.7,
      [device.mobileL]: {
        width: 15,
        marginRight: 0
      }
    },
    [device.mobileL]: {
      padding: "2px 5px"
    }
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
        fontSize: "1.1rem"
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
    borderRadius: 0,
    [device.mobileL]: {
      marginTop: -4
    }
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
    fontSize: 18,
    padding: "0 10px",
    color: "#5E5E5E",
    fontWeight: 500,
    transition: "all ease 0.4s",
    position: "absolute",
    width: 310,
    top: 0,
    left: 0,
    "& img": {
      width: "100%"
    },
    [device.mobileL]: {
      top: 0,
      left: 5,
      fontSize: 11,
      padding: 0,
      "& *": {
        padding: 0
      }
    }
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
    padding: "0 !important"
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
    "& $icon": {
      width: 26,
      verticalAlign: "text-top",
      [device.mobileL]: {
        width: 15
      }
    },
    "& $iconArrow": {
      width: 32,
      [device.mobileL]: {
        width: 15
      }
    }
  },
  icon: {},
  iconArrow: {},
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

class Widget1 extends React.Component {
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
      totalSurveyDraft: 0,
      isLoaddingPopup: false,
      listDetailSurvey: null
    };
  }

  componentDidMount = () => {
    const { userInfo } = this.props;
    // get total survey draft (statusPublic: 0)
    if (userInfo) {
      this.setState({ userId: userInfo.userId });
      this.getTotalSurveyByStatus(0, userInfo);
    }
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    // get total survey draft (statusPublic: 0)
    if (nextProps.userInfo && nextProps.userInfo.userId !== this.state.userId) {
      this.getTotalSurveyByStatus(0, nextProps.userInfo);
    }
    // set style cho mobile
    let isOpen = nextProps.open && nextProps.open === "widget1" ? true : false;
    if (!nextProps.reponsive) return;
    // style left khối bao avatar và nội dụng khi open, close widget
    this.contentWidget.current.style.left = isOpen
      ? -nextProps.reponsive.width + "px"
      : 0;

    // set width avatar theo widget bên trên tính được truyền xuống
    this.contentAvatar.current.style.width =
      nextProps.reponsive.width - 10 + "px";

    // set width, height, left cho khối nội dung dựa vào width bên trên truyền xuống
    this.blockContent.current.style.width =
      nextProps.reponsive.width * 2 + 10 + "px";
    this.blockContent.current.style.height =
      nextProps.reponsive.width * 2 - 40 + "px";
    this.blockContent.current.style.left = nextProps.reponsive.width + "px";
  };

  // lấy tổng  survey theo status 0 : draft
  getTotalSurveyByStatus = async (status, userInfo) => {
    const dataApi = {
      userId: userInfo.userId,
      statusPublic: status
    };
    const res = await axios.post(`${apiRoot}/applicant/totalsurvey`, dataApi);
    // error
    if (res.status !== 200 || res.data === false) return;
    // success
    this.setState({ totalSurveyDraft: res.data.total });
  };
  // lấy list detail survey theo status 0 : draft
  getListDetailSurveyByStatus = async status => {
    const { userInfo } = this.props;
    const dataApi = {
      userId: userInfo.userId,
      statusPublic: status
    };
    const res = await axios.post(`${apiRoot}/applicant/detailssurvey`, dataApi);
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

  openPopupSurveyDraft = () => {
    this.setState({ openPopup: true, isLoaddingPopup: true });
    // lấy toàn bộ survey theo status 0 : draft
    this.getListDetailSurveyByStatus(0);
  };
  closePopupSurveyDraft = () => {
    this.setState({ openPopup: false });
  };

  render = () => {
    const { classes, open } = this.props;
    const {
      openPopup,
      totalSurveyDraft,
      listDetailSurvey,
      isLoaddingPopup
    } = this.state;
    let isOpen = open && open === "widget1" ? true : false;
    // img đại diện widget
    const avatar = (
      <div className={`${classes.contentWG}`} ref={this.contentAvatar}>
        <table className={classes.widget_tb}>
          <tbody>
            <tr onClick={this.openPopupSurveyDraft}>
              <td>
                <img
                  src={icon_check}
                  alt="未完成申込書"
                  className={classes.icon}
                />
              </td>
              <td>未完成申込書: {totalSurveyDraft}件</td>
              <td>
                <img
                  src={icon_right}
                  className={classes.iconArrow}
                  alt="未完成申込書"
                />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src={icon_check}
                  alt="承認依頼の処理"
                  className={classes.icon}
                />
              </td>
              <td>承認依頼の処理：1件</td>
              <td>
                <img
                  src={icon_right}
                  className={classes.iconArrow}
                  alt="承認依頼の処理"
                />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src={icon_check}
                  alt="保留案件の処理"
                  className={classes.icon}
                />
              </td>
              <td>保留案件の処理：9件</td>
              <td>
                <img
                  src={icon_right}
                  className={classes.iconArrow}
                  alt="保留案件の処理"
                />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src={icon_check}
                  alt="調査依頼の督促"
                  className={classes.icon}
                />
              </td>
              <td>調査依頼の督促：3件</td>
              <td>
                <img
                  src={icon_right}
                  className={classes.iconArrow}
                  alt="調査依頼の督促"
                />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src={icon_check}
                  alt="見積作成の督促"
                  className={classes.icon}
                />
              </td>
              <td>見積作成の督促：1件</td>
              <td>
                <img
                  src={icon_right}
                  className={classes.iconArrow}
                  alt="見積作成の督促"
                />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src={icon_check}
                  alt="請求書作成"
                  className={classes.icon}
                />
              </td>
              <td>請求書作成：2件</td>
              <td>
                <img
                  src={icon_right}
                  className={classes.iconArrow}
                  alt="請求書作成"
                />
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
                <img src={icon_sms} alt="SMS" />
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
            title="すぐにすべき事"
          />
          <CardContent
            className={`${classes.contentDefault} ${isOpen &&
              classes.hiddleAvatar}`}
            ref={this.contentWidget}
          >
            {avatar}
            {/* <div className={`${classes.contentWG}`} ref={this.contentAvatar}>
              <img src={imgAvatar} alt="avatar" />
            </div> */}
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
          onClose={this.closePopupSurveyDraft}
          aria-labelledby="count-survey-draft"
          style={{ minWidth: 500 }}
        >
          <MuiDialogTitle disableTypography className={classes.titlePopup}>
            <Typography>未完成申込書</Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={this.closePopupSurveyDraft}
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

Widget1.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExpanded: PropTypes.func,
  open: PropTypes.string,
  userInfo: PropTypes.object,
  reponsive: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(Widget1)));
