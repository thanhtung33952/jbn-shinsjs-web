import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import axios from "axios";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconAdd from "@material-ui/icons/Add";
import IconRemove from "@material-ui/icons/Remove";
import icon_create from "assets/img/icon_create.png";

import { device } from "assets/jss/responsive/device.jsx";
// constant
// constant
import { apiRoot, folderRoot } from "constant/index.js";
// jss
const styles = theme => ({
  card: {
    width: "100%",
    height: "100%"
  },
  cardHeader: {
    backgroundColor: "#6B7DB9",
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
    padding: "0 10px",
    position: "absolute",
    width: 310,
    top: 0,
    left: 0,
    [device.mobileL]: {
      top: 0,
      padding: "0 10px"
    },
    "& a": {
      display: "block",
      textAlign: "left",
      color: "#5E5E5E",
      fontWeight: 500,
      textDecoration: "none",
      padding: "3px 6px",
      fontSize: 14,
      "&:hover": {
        backgroundColor: "#82A790",
        color: "#fff"
      },
      "&:nth-child(1)": {
        color: "#B2001C",
        marginTop: 5,
        "& hr": {
          marginBottom: 0,
          marginTop: 10,
          border: "none",
          background: "none",
          borderBottom: "dashed 2px #5E5E5E"
        },
        "&:hover": {
          backgroundColor: "#fff",
          color: "#5E5E5E"
        }
      },
      [device.mobileL]: {
        marginTop: 5,
        fontSize: 11,
        height: 25,
        lineHeight: "25px"
      }
    },
    "& li": {
      display: "block",
      textAlign: "left",
      listStyle: "none",
      cursor: "pointer",
      color: "#5E5E5E",
      fontWeight: 500,
      textDecoration: "none",
      padding: "3px 6px",
      fontSize: 14,
      "&:hover": {
        backgroundColor: "#82A790",
        color: "#fff"
      },
      "&:nth-child(1)": {
        color: "#B2001C",
        marginTop: 5,
        "& hr": {
          marginBottom: 0,
          marginTop: 10,
          border: "none",
          background: "none",
          borderBottom: "dashed 2px #5E5E5E"
        },
        "&:hover": {
          backgroundColor: "#fff",
          color: "#5E5E5E"
        }
      },
      [device.mobileL]: {
        marginTop: 5,
        fontSize: 11,
        height: 25,
        lineHeight: "25px"
      }
    }
  },
  fullContent: {
    position: "absolute",
    width: 630,
    height: 510,
    top: 0,
    left: 320,
    padding: "0 10px 10px",
    overflowY: "auto"
  },
  itemSur: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "solid 1px red",
    padding: "11px 0 4px"
  },
  table: {
    width: "100%",
    color: "#5E5E5E",
    borderSpacing: 0,
    fontSize: 13,
    "& tr:nth-child(even)": {
      backgroundColor: "#DFDFDF"
    },
    "& td": {
      padding: 10
    }
  },
  btnTable: {
    backgroundColor: "#1EA69B",
    boxShadow: "none",
    color: "#fff",
    fontSize: 13,
    padding: "0 15px",
    height: 28,
    borderRadius: 0,
    border: "none",
    "&:hover": {
      backgroundColor: "#138c82"
    }
  },
  contentDefault: {
    transition: "all ease 0.4s",
    left: 0,
    position: "relative",
    padding: 0,
    [device.mobileL]: {
      padding: "0 !important",
      "& *": {
        fontSize: 11
      }
    }
  },
  hiddleAvatar: {
    left: -320
  }
});

class Widget7 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      listSurveyByUser: null
    };
    this.contentWidget = React.createRef();
    this.contentAvatar = React.createRef();
    this.blockContent = React.createRef();
  }
  componentDidMount = () => {
    const { userInfo } = this.props;
    if (userInfo && userInfo.userId) {
      this.getSurveyByUserID(userInfo.userId);
    }
  };
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    // set style cho mobile
    let isOpen = nextProps.open && nextProps.open === "widget7" ? true : false;
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

  getSurveyByUserID = async userID => {
    const res = await axios.get(`${apiRoot}/surveys?userId=${userID}`);
    // error
    if (res.status !== 200 || res.data === false) return;
    // success
    this.setState({ listSurveyByUser: res.data });
  };
  handleExpandClick = () => {
    const { handleExpanded } = this.props;
    if (handleExpanded) {
      handleExpanded();
    }
  };
  formatDateRead = date => {
    if (date) {
      let arrDay = new Date(date);
      return (
        arrDay.getFullYear() +
        "年" +
        (arrDay.getMonth() + 1) +
        "月" +
        arrDay.getDate() +
        "日"
      );
    }
    return "データが空です";
  };
  convertTitleStepSurvey = status => {
    switch (parseInt(status)) {
      case 1:
        return "お申込者";
      case 2:
        return "地盤品質証明事業者";
      case 3:
        return "物件情報";
      case 4:
        return "建物概要";
      case 5:
        return "予定基礎";
      case 6:
        return "搬入条件、高さ障害";
      case 7:
        return "地盤調査申込";
      default:
        return null;
    }
  };

  render = () => {
    const { classes, open } = this.props;
    const { listSurveyByUser } = this.state;
    let isOpen = open && open === "widget7" ? true : false;

    // img đại diện widget
    const avatar = (
      <div className={classes.contentWG} ref={this.contentAvatar}>
        <li onClick={this.handleExpandClick}>
          ○ 申込中の案件：{listSurveyByUser && listSurveyByUser.length}件　　▶
          <hr />
        </li>
        <li onClick={this.handleExpandClick}>
          ○ 地震 eye （＋地盤安心住宅） ▶︎
        </li>
        <Link to={`${folderRoot}operation/survey`}>○ 地盤安心住宅　▶</Link>
        <li onClick={this.handleExpandClick}>○ 地盤調査　▶</li>
        <li onClick={this.handleExpandClick}>○ ボーリング調査　▶</li>
        <li onClick={this.handleExpandClick}>○ 地盤セカンドオピニオン　▶</li>
        <li onClick={this.handleExpandClick}>○ 既存住宅地盤補償　▶</li>
        <li onClick={this.handleExpandClick}>○ 改良工事設計審査補償　▶</li>
      </div>
    );

    let renderSurvey =
      listSurveyByUser &&
      listSurveyByUser.length > 0 &&
      listSurveyByUser.map(item => {
        let titleStepEnd = this.convertTitleStepSurvey(item.status);
        return (
          <div className={classes.itemSur} key={item.id}>
            <span style={{ color: "red" }}>
              {item.property_name ? item.property_name : ""}
              <br />
              {this.formatDateRead(item.final_survey_date)}、
              {titleStepEnd && titleStepEnd}
            </span>
            <Button
              variant="outlined"
              className={classes.btnTable}
              href={`${folderRoot}operation/survey/${item.id}`}
            >
              申込書を表示
            </Button>
          </div>
        );
      });

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
              <img src={icon_create} alt="Widget 7" />
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
          title="新規調査などの申し込み"
        />
        <CardContent
          className={`${classes.contentDefault} ${isOpen &&
            classes.hiddleAvatar}`}
          ref={this.contentWidget}
        >
          {avatar}
          <div className={classes.fullContent} ref={this.blockContent}>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td>
                    <span style={{ color: "red" }}>
                      申込中の案件：
                      {listSurveyByUser && listSurveyByUser.length}件　▶︎
                    </span>
                  </td>
                  <td style={{ display: "flex", flexDirection: "column" }}>
                    {renderSurvey}
                  </td>
                </tr>
                <tr>
                  <td>地震 eye （＋地盤安心住宅） ▶︎</td>
                  <td>
                    地震eyeの申込はこちらから
                    <br />
                    併せて地盤安心住宅も申込ます
                  </td>
                </tr>
                <tr>
                  <td>地盤安心住宅　▶</td>
                  <td>
                    改良工事及び地盤（地盤調査、地盤解析、地盤安心住宅補償）
                  </td>
                </tr>
                <tr>
                  <td>地盤調査　▶</td>
                  <td>測量のみをご希望の方はこちらから</td>
                </tr>
                <tr>
                  <td>ボーリング調査　▶</td>
                  <td>ボーリング調査の依頼はこちらをご利用ください</td>
                </tr>
                <tr>
                  <td>地盤セカンドオピニオン　▶</td>
                  <td>地盤調査のセカンドオピニオンをご希望の方</td>
                </tr>
                <tr>
                  <td>既存住宅地盤補償　▶</td>
                  <td>
                    既存の住宅で地盤補償のみご希望の方、
                    <br />
                    申込はこちらから
                  </td>
                </tr>
                <tr>
                  <td>改良工事設計審査補償　▶</td>
                  <td>改良工事設計における審査補償を行います</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };
}

Widget7.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExpanded: PropTypes.func,
  open: PropTypes.string,
  userInfo: PropTypes.object,
  reponsive: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(Widget7)));
