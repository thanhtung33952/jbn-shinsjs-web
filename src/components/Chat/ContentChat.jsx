import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { PropTypes } from "prop-types";
import _map from "lodash/map";
// material component

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
// jss

const styles = {
  blockChat: {
    marginLeft: 15,
    "& $active": {
      border: "solid 1px cadetblue",
      borderBottom: "none"
    }
  },
  active: {},
  card: {
    width: 280,
    height: 320,
    boxShadow: "0 1px 4px rgba(0, 0, 0, .3)",
    borderRadius: "6px 6px 0 0",
    display: "flex",
    flexDirection: "column"
  },
  rootAvatar: {
    marginRight: 10
  },
  avatar: {
    backgroundColor: "#ff6666",
    width: 30,
    height: 30,
    fontSize: 13,
    overflow: "inherit"
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  holderDiv: {
    width: "100%",
    "&:before": {
      content: `"Enter the message"`,
      color: "gray",
      display: "block",
      position: "absolute",
      marginTop: 10,
      marginLeft: 10,
      fontSize: 13
    }
  },
  input: {
    marginLeft: 0,
    padding: 0,
    flex: 1,
    fontSize: 13,
    "& textarea": {
      padding: "12px 8px",
      overflow: "auto !important"
    }
  },
  // iconButton: {
  //   padding: 5,
  //   position: "absolute",
  //   bottom: 4,
  //   right: 5,
  //   "& svg": {
  //     fontSize: 22
  //   }
  // },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  headCart: {
    padding: 5,
    borderBottom: "solid 1px #ddd",
    "&:hover": {
      backgroundColor: "#f2f3f5"
    }
  },
  contentHead: {
    width: "calc(100% - 100px)"
  },
  close: {
    padding: 3,
    margin: "10px 8px 5px",
    "& svg": {
      fontSize: 20
    }
  },
  titleHead: {
    lineHeight: "18px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  subHead: {
    lineHeight: "14px",
    fontSize: 12
  },
  contentCard: {
    padding: 10,
    height: "auto",
    overflow: "auto",
    flex: "1 auto"
  },
  cardAction: {
    borderTop: "solid 1px rgba(0, 0, 0, .1)",
    padding: 0
  },
  styleProfile: {
    display: "flex",
    flexFlow: "row-reverse",
    marginTop: 10
  },
  styleClient: {
    display: "flex",
    flexFlow: "row",
    marginTop: 10,
    "& $styleMess": {
      marginLeft: 5,
      background: "#F1F0F0",
      "& span": {
        color: "#444950"
      }
    }
  },
  styleMess: {
    backgroundColor: "#5F9EA0",
    padding: "5px 10px 7px",
    minHeight: 14,
    borderRadius: 14,
    maxWidth: 160,
    overflow: "hidden",
    display: "block",
    "& span": {
      color: "#ffffff",
      overflowWrap: "break-word",
      whiteSpace: "pre-wrap",
      fontSize: 13,
      display: "block",
      lineHeight: "18px"
    }
  },
  styleLientiep: {
    marginTop: 1
  },
  iconProgress: {
    margin: "auto",
    display: "block",
    zIndex: 999,
    position: "relative",
    top: "45%",
    color: "#aba8a8"
  },
  online: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "rgb(66, 183, 42)",
    position: "absolute",
    zIndex: 9999,
    bottom: -1,
    right: 0,
    border: "solid 2px #fff"
  },
  tyring: {
    position: "relative",
    bottom: -10,
    fontSize: 11,
    fontStyle: "italic",
    color: "#222"
  }
};
class ContentChat extends React.Component {
  constructor(props) {
    super(props);
    // this.inputMess = React.createRef();
    this.state = {
      valInput: "",
      isLoaddingHistory: true
    };
  }

  componentDidMount = () => {
    const { userChat } = this.props;
    if (!userChat) {
      return;
    }

    this.setState({ isLoaddingHistory: false });
  };

  // scroll to bottom block list message
  scrollToBottom = idElement => {
    var elmnt = document.getElementById(idElement);
    if (!elmnt) return;
    elmnt.scrollTop = elmnt.scrollHeight ? elmnt.scrollHeight : 0;
  };

  // handle change input chat
  handleChangeInput = e => {
    const { typing } = this.props;
    this.setState({ valInput: e.target.value });
    if (typing && e.target.value.length > 0) typing();
  };
  // key enter => send mesage
  onKeyPressSendMessage = e => {
    const { handleSendMessage } = this.props;
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();

      if (handleSendMessage) {
        handleSendMessage(this.state.valInput);
        this.setState({ valInput: "" });
      }
    }
  };

  handleCloseChat = userId => () => {
    const { handleClose } = this.props;
    if (handleClose) {
      handleClose(userId);
    }
  };

  render = () => {
    const {
      classes,
      userChat,
      userInfo,
      messages,
      activeForm,
      isOnline,
      userTyring
    } = this.props;

    // console.log("userTyring: ", userTyring);
    // console.log("userChat: ", userChat);
    const { valInput } = this.state;
    setTimeout(() => {
      this.scrollToBottom(userChat.userId);
    }, 100);
    let renderMessage =
      messages &&
      messages.map((item, i) => {
        let classMess =
          item.userId === userInfo.userId
            ? classes.styleProfile
            : classes.styleClient;

        // set style cho mess cùng user liên tiếp
        let idLientiep = userInfo.userId;
        let styleLientiep;
        if (item.userId === idLientiep) {
          styleLientiep = classes.styleLientiep;
        } else {
          idLientiep = item.userId;
          styleLientiep = "";
        }

        return (
          <li key={i} className={`${classMess} ${styleLientiep}`}>
            {userInfo.userId !== item.userId && (
              <Avatar className={classes.avatar}>
                {item.userName.charAt(0)}
              </Avatar>
            )}
            <div className={classes.styleMess}>
              <span>{item.message}</span>
            </div>
          </li>
        );
      });
    const isTyring =
      userTyring && userTyring.userId === userChat.userId ? true : false;

    return (
      <div className={classes.blockChat}>
        <Card className={`${classes.card} ${activeForm ? classes.active : ""}`}>
          <CardHeader
            classes={{
              root: classes.headCart,
              content: classes.contentHead,
              avatar: classes.rootAvatar,
              title: classes.titleHead,
              subheader: classes.subHead
            }}
            avatar={
              <Avatar
                aria-label={userChat.firstName}
                className={classes.avatar}
              >
                {userChat.lastName.charAt(0)}
                {isOnline && <span className={classes.online} />}
              </Avatar>
            }
            action={
              <IconButton
                className={classes.close}
                onClick={this.handleCloseChat(userChat.userId)}
              >
                <CloseIcon />
              </IconButton>
            }
            title={userChat.lastName + " " + userChat.firstName}
            subheader={isOnline ? "Đang hoạt động" : ""}
          />
          <CardContent className={classes.contentCard} id={userChat.userId}>
            {!messages ? (
              <CircularProgress size={24} className={classes.iconProgress} />
            ) : (
              <React.Fragment>
                {renderMessage}
                {isTyring && (
                  <span className={classes.tyring}>
                    {userChat.lastName} is tyring...
                  </span>
                )}
              </React.Fragment>
            )}
          </CardContent>
          <CardActions disableSpacing className={classes.cardAction}>
            <InputBase
              className={classes.input}
              multiline
              autoFocus={true}
              rowsMax="4"
              placeholder="Enter the message"
              value={valInput}
              onChange={this.handleChangeInput}
              onKeyPress={this.onKeyPressSendMessage}
            />
          </CardActions>
        </Card>
      </div>
    );
  };
}

ContentChat.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  activeForm: PropTypes.bool,
  isOnline: PropTypes.bool,
  userChat: PropTypes.object,
  userTyring: PropTypes.object,
  statusScroll: PropTypes.number,
  userInfo: PropTypes.object,
  messages: PropTypes.array,
  handleSendMessage: PropTypes.func,
  handleFocusInput: PropTypes.func,
  typing: PropTypes.func,
  handleClose: PropTypes.func
};

export default withStyles(styles)(ContentChat);
