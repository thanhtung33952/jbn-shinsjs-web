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
import icon_list from "assets/img/icon_list.png";

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
  iconLeft: {
    marginRight: 0
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
    fontSize: 18,
    color: "#5E5E5E",
    fontWeight: 500,
    transition: "all ease 0.4s",
    position: "absolute",
    textAlign: "center",
    width: 310,
    top: 0,
    left: 0,
    "& $cricleScore:nth-last-child(1)": {
      marginTop: -6
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
    padding: "0 !important"
  },
  hiddleAvatar: {
    left: -320
  },
  cardContent: {
    padding: 10
  },
  cricleScore: {
    width: "31%",
    paddingTop: "31%",
    borderRadius: "50%",
    border: "solid 4px #01A89D",
    margin: "4px 15px",
    display: "inline-block",
    position: "relative",
    boxSizing: "content-box",
    [device.mobileL]: {
      width: "30%",
      paddingTop: "30%",
      margin: "2px 8px"
    },
    "& span": {
      position: "absolute",
      fontSize: 44,
      width: "100%",
      textAlign: "center",
      color: "#222",
      left: 0,
      top: "5%",
      [device.mobileL]: {
        fontSize: 18,
        top: 2
      }
    },
    "& p": {
      position: "absolute",
      width: "100%",
      margin: 0,
      bottom: 20,
      fontSize: 13,
      [device.mobileL]: {
        bottom: 3,
        fontSize: 10,
        lineHeight: "11px"
      }
    }
  }
});

class Widget5 extends React.Component {
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
    let isOpen = nextProps.open && nextProps.open === "widget5" ? true : false;
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
    let isOpen = open && open === "widget5" ? true : false;

    // img đại diện widget
    const avatar = (
      <div className={classes.contentWG} ref={this.contentAvatar}>
        <div className={classes.cricleScore}>
          <span>87</span>
          <p>自社物件総数</p>
        </div>
        <div className={classes.cricleScore}>
          <span>24</span>
          <p>進行中の物件</p>
        </div>
        <div className={classes.cricleScore}>
          <span>9</span>
          <p>登録社員数</p>
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
              <img src={icon_list} alt="Widget 5" />
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
          title="物件管理"
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

Widget5.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExpanded: PropTypes.func,
  open: PropTypes.string,
  reponsive: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(Widget5)));
