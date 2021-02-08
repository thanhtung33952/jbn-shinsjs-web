import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import axios from "axios";
import io from "socket.io-client";
import _map from "lodash/map";
import { connect } from "react-redux";
// contant
// import { folderRoot } from "constant/index.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
// constant
import { apiRoot } from "constant/index.js";
import { ConsoleView } from "react-device-detect";

const styles = () => ({
  contentChat: {
    height: "100%",
    width: "100%",
    display: "flex",
    position: "relative",
    flexDirection: "column"
  },
  builderName: {
    backgroundColor: "#8080FF",
    position: "absolute",
    padding: "2px 20px",
    color: "#fff",
    fontSize: 13,
    left: 0,
    top: 0,
    zIndex: 9
  },
  comName: {
    backgroundColor: "#FF8080",
    position: "absolute",
    padding: "2px 20px",
    color: "#fff",
    fontSize: 13,
    right: 0,
    top: 0,
    zIndex: 9
  },

  bottomChat: {
    // display: "flex",
    // flexDirection: "row",
    // height: 60,
    overflow: "hidden",
    padding: "0 6px 25px",
    marginTop: 10
  },
  messChat: {
    height: "100%",
    flex: "1 auto",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    borderBotton: "solid 2px gray",
    position: "relative"
  },
  iconLoadding: {
    color: "#c7c7c7",
    position: "absolute",
    top: "50%",
    left: "50%"
  },
  inputMess: {
    color: "#222",
    margin: 0,
    width: "calc(100% - 58px)",
    float: "left",
    padding: "0px !important",
    height: "auto",
    fontSize: 14,
    lineHeight: "16px",
    borderRadius: 2,
    backgroundColor: "#E2EBFF",
    "& textarea": {
      padding: 8
    }
  },
  btnSend: {
    float: "right",
    backgroundColor: "#6D997E",
    padding: 0,
    textTransform: "none",
    minHeight: 33,
    height: 33,
    fontSize: 13,
    minWidth: 30,
    width: 55,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 500,
    margin: "0",
    boxShadow: "none",
    borderRadius: 0,
    color: "#fff",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#6D997E"
    }
  },
  userLeft: {
    color: "#222",
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    maxWidth: "80%",
    backgroundColor: "#D1D8FA",
    borderRadius: 6,
    margin: "auto",
    marginLeft: 2,
    marginTop: 4,
    marginBottom: 4,
    padding: "10px 6px"
  },
  userRight: {
    color: "#222",
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    maxWidth: "80%",
    backgroundColor: "#FFBEBC",
    borderRadius: 6,
    margin: "auto",
    marginRight: 2,
    marginTop: 4,
    marginBottom: 4,
    padding: "10px 6px",
    "& $avatar": {
      backgroundColor: "#178002"
    }
  },
  message: {
    fontFamily: "'M PLUS 1p', sans-serif",
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    fontSize: 14,
    "& span": {
      fontSize: 14
    },
    "& p": {
      margin: 0,
      marginTop: 3,
      padding: 0
    }
  }
});
// component customer
class ChatSurvey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaddingContentMessage: false,
      historyMessage: null,
      listMessage: [],
      isEndChat: false,
      valInput: ""
    };
    this.socket = null;
  }
  componentDidMount = () => {
    const { data } = this.props;
    if (!data.survey_id) return;
    this.getHistoryChat(data.survey_id);
  };
  UNSAFE_componentWillMount = () => {
    // connect socket
    this.socket = io("https://jibannet-dev.com:6969");
    // new message
    this.socket.on("newMessageSurvey", response => {
      this.newMessage(response);
    });
  };

  newMessage = response => {
    const { data } = this.props;
    const { listMessage } = this.state;
    if (response.survey_id !== data.survey_id) return;
    // time
    let day = new Date();
    let yy = String(day.getFullYear());
    let mm = String(parseInt(day.getMonth()) + 1);
    let dd = String(day.getDate());
    let h = String(day.getHours());
    let m = String(day.getMinutes());
    h = h.length === 1 ? "0" + h : h;
    m = m.length === 1 ? "0" + m : m;
    mm = mm.length === 1 ? "0" + mm : mm;
    dd = dd.length === 1 ? "0" + dd : dd;
    let today = yy + "-" + mm + "-" + dd + "  " + h + ":" + m;
    listMessage.push({ ...response, time: today });
    this.setState({ listMessage });
    // cuộn tới nơi message mới
    this.scrollToBottom();
  };

  handleChangeInput = e => {
    this.setState({ valInput: e.target.value });
  };

  onKeyPressSendMessage = e => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();

      this.handleSendMessage();
    }
  };
  // sent message
  handleSendMessage = async () => {
    const { data } = this.props;
    if (!this.state.valInput.trim()) return;
    let isSaveMessage = await this.saveHistoryChat(this.state.valInput.trim());
    if (!isSaveMessage) return;
    this.socket.emit("newMessageSurvey", {
      survey_id: data.survey_id,
      user_id: data.userInfo.userId,
      sender_name: data.userInfo.firstName + " " + data.userInfo.lastName,
      is_builder: data.userInfo.companyId === data.survey_company_id ? 0 : 1,
      text: this.state.valInput
    });
    this.setState({ valInput: "" });
  };
  // lưu tin nhắn vô db
  saveHistoryChat = async txtMessage => {
    const { data } = this.props;
    const res = await axios.post(`${apiRoot}/surveychat`, {
      survey_id: data.survey_id,
      sender: data.userInfo.userId,
      is_builder: data.userInfo.companyId === data.survey_company_id ? 0 : 1,
      message: txtMessage
    });
    if (res.status !== 200) {
      return false;
    }
    return true;
  };
  // lấy detail chat cho client theo theme id (hiển thị col 2)
  getHistoryChat = async survey_id => {
    if (!survey_id) return;
    this.setState({
      isLoaddingContentMessage: true
    });
    try {
      const res = await axios.get(
        `${apiRoot}/surveychats?survey_id=${survey_id}`
      );
      // false
      if (!res.data || res.status !== 200) {
        this.setState({
          historyMessage: null,
          isLoaddingContentMessage: false
        });
        return;
      }
      this.setState({
        historyMessage: res.data,
        isLoaddingContentMessage: false
      });
      // cuộn tới nơi message mới
      this.scrollToBottom();
    } catch (error) {
      this.setState({
        historyMessage: null,
        isLoaddingContentMessage: false
      });
      return;
    }
  };
  // scroll to bottom block list message
  scrollToBottom = () => {
    var elmnt = document.getElementById("contentMess");
    if (!elmnt) return;
    elmnt.scrollTop = elmnt.scrollHeight ? elmnt.scrollHeight : 0;
  };
  render = () => {
    const { classes, data } = this.props;
    const {
      valInput,
      listMessage,
      historyMessage,
      isLoaddingContentMessage
    } = this.state;
    // render message history
    let renderMessHist =
      historyMessage &&
      historyMessage.map((item, i) => {
        if (parseInt(item.is_builder) === 1) {
          return (
            <div className={classes.userLeft} key={i}>
              <div className={classes.message}>
                <span>
                  {item.created} {item.firstName + " " + item.firstName}
                </span>
                <p>{item.message}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div className={classes.userRight} key={i}>
              <div className={classes.message}>
                <span>
                  {item.created} {item.firstName + " " + item.firstName}
                </span>
                <p>{item.message}</p>
              </div>
            </div>
          );
        }
      });
    // render message chat
    let renderMess =
      listMessage &&
      listMessage.map((item, i) => {
        if (item.is_builder === 1) {
          return (
            <div className={classes.userLeft} key={i}>
              <div className={classes.message}>
                <span>
                  {item.time} {item.sender_name}
                </span>
                <p>{item.text}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div className={classes.userRight} key={i}>
              <div className={classes.message}>
                <span>
                  {item.time} {item.sender_name}
                </span>
                <p>{item.text}</p>
              </div>
            </div>
          );
        }
      });
    return (
      <React.Fragment>
        <div className={classes.contentChat}>
          <span className={classes.builderName}>ビルダー名</span>
          <span className={classes.comName}>調査会社名</span>
          {/* content chat */}
          <div className={classes.messChat} id="contentMess">
            {isLoaddingContentMessage ? (
              <CircularProgress size={28} className={classes.iconLoadding} />
            ) : (
              renderMessHist
            )}
            {renderMess}
          </div>
          {/* bototm chat */}
          <div className={classes.bottomChat}>
            <InputBase
              disabled={!data.survey_company_id ? true : false}
              className={classes.inputMess}
              multiline
              placeholder="新規メッセージ"
              autoFocus={true}
              rows={3}
              rowsMax={4}
              value={valInput}
              onChange={this.handleChangeInput}
              onKeyPress={this.onKeyPressSendMessage}
            />
            <Button
              disabled={!data.survey_company_id ? true : false}
              variant="contained"
              className={classes.btnSend}
              onClick={this.handleSendMessage}
            >
              送信
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  };
}

ChatSurvey.propTypes = {
  classes: PropTypes.object.isRequired,
  socketProps: PropTypes.object,
  data: PropTypes.object
};

const mapStateToProps = state => {
  const { socketState } = state;
  return {
    socketProps: socketState
  };
};
export default connect(mapStateToProps)(
  withRoot(withStyles(styles)(ChatSurvey))
);
