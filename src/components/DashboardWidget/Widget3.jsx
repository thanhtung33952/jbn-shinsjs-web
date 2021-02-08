import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
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
// icons
import icon_uptop from "assets/img/icon_uptop.png";

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
  }
});

class Widget3 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      totalUrgent: 18,
      totalOneHourElapsed: 2,
      totalThreeHourElapsed: 18,
      totalSixHourElapsed: 36,
      totalOneDayOrMore1: 18,
      totalOneDayOrMore2: 36,
      totalDraft: 1
    };
    this.contentWidget = React.createRef();
    this.contentAvatar = React.createRef();
    this.blockContent = React.createRef();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    // set style cho mobile
    let isOpen = nextProps.open && nextProps.open === "widget3" ? true : false;
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

  // tính toán phần trăm thông số để render chart
  renderPercentChart = () => {
    const {
      totalUrgent,
      totalOneHourElapsed,
      totalThreeHourElapsed,
      totalSixHourElapsed,
      totalOneDayOrMore1,
      totalOneDayOrMore2,
      totalDraft
    } = this.state;
    let objData = {
      totalUrgent: totalUrgent,
      totalOneHourElapsed: totalOneHourElapsed,
      totalThreeHourElapsed: totalThreeHourElapsed,
      totalSixHourElapsed: totalSixHourElapsed,
      totalOneDayOrMore1: totalOneDayOrMore1,
      totalOneDayOrMore2: totalOneDayOrMore2,
      totalDraft: totalDraft
    };
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
    let isOpen = open && open === "widget3" ? true : false;
    const percentValue = this.renderPercentChart();

    // img đại diện widget
    const avatar = (
      <div className={classes.contentWG} ref={this.contentAvatar}>
        <table className={classes.widget_tb}>
          <tbody>
            <tr>
              <td>至急：</td>
              <td>
                <div className={classes.progress}>
                  <span style={{ width: `${percentValue.totalUrgent}%`, backgroundColor: "#EE230B" }} />
                  <span className={classes.spanEnd}>1件</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>1時間経過：</td>
              <td>
                <div className={classes.progress}>
                  <span style={{ width: `${percentValue.totalOneHourElapsed}%`, backgroundColor: "#00A2FF" }} />
                  <span className={classes.spanEnd}>なし</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>3時間経過：</td>
              <td>
                <div className={classes.progress}>
                  <span style={{ width: `${percentValue.totalThreeHourElapsed}%`, backgroundColor: "#61D935" }} />
                  <span className={classes.spanEnd}>1件</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>6時間経過：</td>
              <td>
                <div className={classes.progress}>
                  <span style={{ width: `${percentValue.totalSixHourElapsed}%`, backgroundColor: "#F8BA00" }} />
                  <span className={classes.spanEnd}>2件</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>1日以上経過：</td>
              <td>
                <div className={classes.progress}>
                  <span
                    style={{
                      width: `${percentValue.totalOneDayOrMore1}%`,
                      backgroundColor: "#EE230B",
                      fontSize: 11,
                      textAlign: "center",
                      color: "#fff"
                    }}
                  >
                    促促
                  </span>
                  <span style={{ width: `${percentValue.totalOneDayOrMore2}%`, backgroundColor: "#EF5FA7" }} />
                  <span className={classes.spanEnd}>1件</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>下書き中：</td>
              <td>
                <div className={classes.progress}>
                  <span style={{ width: `${percentValue.totalDraft}%`, backgroundColor: "#00A2FF" }} />
                  <span className={classes.spanEnd}>なし</span>
                </div>
              </td>
            </tr>
          </tbody>
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
              <img src={icon_uptop} alt="Widget 3" />
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
          title="送信箱"
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
    );
  };
}

Widget3.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExpanded: PropTypes.func,
  open: PropTypes.string,
  reponsive: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(Widget3)));
