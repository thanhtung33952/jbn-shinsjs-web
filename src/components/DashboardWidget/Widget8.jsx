import React from "react";
import { Link } from "react-router-dom";
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
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconAdd from "@material-ui/icons/Add";
import IconRemove from "@material-ui/icons/Remove";
// icons
import icon_onoff from "assets/img/icon_onoff.png";
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
        fontSize: 11,
        whiteSpace: "nowrap",
        overflow: "hidden"
      }
    }
  },
  iconLeft: {
    marginRight: 0
  },
  contentWG: {
    fontSize: 14,
    color: "#5E5E5E",
    fontWeight: 500,
    transition: "all ease 0.4s",
    padding: 10,
    position: "absolute",
    width: 310,
    top: 8,
    left: 0,
    [device.mobileL]: {
      top: 0,
      padding: 5
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
  titleContentW8: {
    display: "flex",
    justifyContent: "space-between",
    "& span": {
      backgroundColor: "#718FE1",
      display: "inline-block",
      padding: "4px 10px",
      fontSize: 12,
      color: "#fff",
      [device.mobileL]: {
        fontSize: 10,
        padding: "2px 8px"
      }
    },
    "& a": {
      backgroundColor: "#ffffff",
      display: "inline-block",
      padding: "4px 20px",
      fontSize: 12,
      color: "grey",
      textDecoration: "none",
      borderTop: "solid 1px #e6e6e6",
      boxShadow:
        "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
      [device.mobileL]: {
        fontSize: 10,
        padding: "2px 8px"
      }
    }
  },
  conW8: {
    display: "block",
    padding: "10px 0",
    fontWeight: "bold",
    fontSize: 13,
    "& a": {
      textDecoration: "none",
      marginLeft: 30,
      color: "#5E5E5E"
    },
    [device.mobileL]: {
      padding: "2px 0 2px 10px",
      fontSize: 10,
      lineHeight: "14px"
    }
  },
  search: {
    position: "relative",
    borderRadius: 7,
    backgroundColor: "#fff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 8,
    border: "solid 1px #a7a2a2"
  },
  searchIcon: {
    width: theme.spacing(5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fontSize: 18
    }
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(0.8, 0.8, 0.8, 5),
    width: "100%",
    fontSize: 13,
    lineHeight: "20px"
  }
});

class Widget8 extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.contentWidget = React.createRef();
    this.contentAvatar = React.createRef();
    this.blockContent = React.createRef();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    // set style cho mobile
    let isOpen = nextProps.open && nextProps.open === "widget8" ? true : false;
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

  render = () => {
    const { classes, open } = this.props;
    let isOpen = open && open === "widget8" ? true : false;

    // img đại diện widget
    const avatar = (
      <div className={classes.contentWG} ref={this.contentAvatar}>
        <div className={classes.rowContent}>
          <div className={classes.titleContentW8}>
            <span>登録ユーザー・登録情報</span>
            <Link to={`${folderRoot}company`} target="_blank">
              新規登録
            </Link>
          </div>
          <div className={classes.conW8}>
            <Link to={`${folderRoot}profile`} target="_blank">
              〇〇（サインオンのユーザー名）
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder=""
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
        </div>
        <div className={classes.rowContent}>
          <div className={classes.titleContentW8}>
            <span>登録企業・登録情報</span>
          </div>
          <div className={classes.conW8}>
            <Link to={`${folderRoot}company-setting`} target="_blank">
              地盤ネット株式会社
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder=""
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
        </div>
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
              <img src={icon_onoff} alt="Widget 8" />
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
          title="SJS 登録管理"
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

Widget8.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExpanded: PropTypes.func,
  open: PropTypes.string,
  reponsive: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(Widget8)));
