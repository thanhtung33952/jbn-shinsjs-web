import React from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import MessageIcon from "@material-ui/icons/Message";
import CloseIcon from "@material-ui/icons/Close";
import io from "socket.io-client";
import _map from "lodash/map";
// marterial-ui
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Fab from '@material-ui/core/Fab';
// constant
import { apiRoot } from "constant/index.js";
// customer component
import ContentChat from "components/Chat/ContentChat.jsx";
import ContentListUser from "components/Chat/ContentListUser.jsx";
// jss
import styles from "assets/jss/components/styleChat.jsx";

class MainChat extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpenList: 0, // 0: open defaul chat , 1: open list user right
      isOpenChat: [], // ['useridChat', '...', '...']
      scrollBottom: 0, // 0: normar , 1: srcoll , 2: wating scroll
      listUser: [],
      userOnline: [],
      messages: [], // [userId: abc, message: []]
      userClient: [], // {}
      userTyring: [], // {list user tyring}
      openQueue: false,
      queueChat: [] // user chat thứ tư được lưu vào đây
    };
    this.socket = null;
  }

  componentDidMount = () => {
    this.getListUser();
  };

  UNSAFE_componentWillMount = () => {
    this.socket = io("https://jibannet-dev.com:6969");
    this.socket.emit("login", this.props.userInfo.userId);
    this.socket.on("updateUesrList", response => {
      // console.log(response);
      this.setState({ userOnline: response });
    });
    this.socket.on("newMessage", response => {
      this.newMessage(response);
    });

    this.socket.on("typing", response => {
      this.checkTyring(response.user);
    });
  };

  getListUser = async () => {
    const res = await axios.get(`${apiRoot}/users`);
    // error
    if (res.status !== 200 || res.data === false) {
      return;
    }
    // success
    this.setState({ listUser: res.data });
  };

  // dùng api lấy lịch sử chat theo 1 user
  getHistoryChatByUser = async userChat => {
    const { userInfo } = this.props;
    if (!userChat) {
      return;
    }
    const res = await axios.get(
      `${apiRoot}/chats?sender=${userInfo.userId}&receiver=${userChat.userId}`
    );
    const result = res.data;
    //success
    // bật scrool block list message child component
    if (result.length > 0) {
      this.setState({ scrollBottom: 1 });
    }
    // end event scroll
    this.setHistoryToMessages(result, userChat);
  };

  // set message history
  setHistoryToMessages = (data, userChat) => {
    const { userInfo } = this.props;
    // tao 1 object message mới cho user đang chat
    let messageUser = { userChatId: userChat.userId, messages: [] };

    let ids = _map(messageUser.messages, "id");
    let max = Math.max(...ids);
    data.forEach(item => {
      let userName =
        item.sender === userInfo.userId
          ? userInfo.lastName + " " + userInfo.firstName
          : userChat.lastName + " " + userChat.firstName;

      messageUser.messages.push({
        id: max + 1,
        userId: item.sender,
        message: item.message,
        userName: userName
      });
    });
    // push mess user đang chat vào state mess (khi close chat cũng phải remove mess chat)
    this.setState({ messages: this.state.messages.concat(messageUser) });
  };

  // change status chat 0: open defaul chat , 1: open list user right
  openPopup = status => {
    this.setState({ isOpenList: status });
  };

  // active popup user ddang cha
  activeFormChat = userId => {
    const { isOpenChat } = this.state;
    let newIsOpenChat = isOpenChat.map(item => {
      if (item.userId === userId) {
        return {
          ...item,
          active: true
        };
      }
      return {
        ...item,
        active: false
      };
    });

    this.setState({ isOpenChat: newIsOpenChat });
  };

  // open popup chat client
  openChatClient = user => {
    const { userClient, isOpenChat } = this.state;
    // check xem user nay có đang chat không
    let isUserOpen = isOpenChat.findIndex(x => x.userId === user.userId);
    if (isUserOpen !== -1) {
      // có tồn tại user này đang chat thì set active (border màu)
      this.activeFormChat(user.userId);
      return;
    }

    // gọi function remove user từ hàng đợi (tự động check tồn tại sẽ remove)
    this.removeQueueByUserId(user.userId);

    // đếm xem đã mở bao nhiêu form chat ( đang chat bao nhiêu người )
    const numberChat = userClient.length;
    // giới hạn không cho mở quá popup chat
    if (numberChat === 2) {
      // chưa thì set user vừa close vào hàng đợi
      this.setState({ queueChat: this.state.queueChat.concat(userClient[0]) });

      // close form chat đầu tiên trong 3 form đang chat đồng thời đưa nó vào hàng đợi tạm ẩn
      this.handleCloseChatClient(userClient[0].userId);
    }

    // set user client chat đồng thời mở popup chat
    this.getHistoryChatByUser(user);
    // push user ddang chat vao mang (khi close cung phai remove user do di trong arr nay)
    this.setState(
      {
        userClient: this.state.userClient.concat(user),
        isOpenChat: this.state.isOpenChat.concat({
          userId: user.userId,
          active: true
        })
      },
      () => this.activeFormChat(user.userId)
    );
  };

  // send message to user chat by id user chat
  sendnewMessageToUser = userId => valInput => {
    const { userOnline } = this.state;
    if (!valInput.trim()) return;
    this.saveHistoryChat(valInput.trim(), userId);

    // get id socket cho client
    let user = userOnline.find(x => x.userId === userId);
    // find user client in list userClient
    let client = this.findClientChatByUserId(userId);

    // if (!client) return;
    this.socket.emit("newMessageToId", {
      data: valInput.trim(),
      userInfo: this.props.userInfo,
      userChat: { ...client, id: user ? user.id : "" }
    });
  };

  // lưu tin nhắn vô db
  saveHistoryChat = async (data, userId) => {
    const { userInfo } = this.props;
    if (!data) return;
    await axios.post(`${apiRoot}/chat`, {
      sender: userInfo.userId,
      receiver: userId,
      userName: userInfo.firstName + " " + userInfo.lastName,
      message: data.trim()
    });
  };

  newMessage = m => {
    const { messages } = this.state;
    const listTyring = this.state.userTyring;
    // check xem messages nay có nằm trong danh sach user đang chat hay không
    let userCheck = m.userInfo.userId;
    if (this.props.userInfo.userId === m.userInfo.userId) {
      userCheck = m.userChat.userId;
    }
    let indexMessage = messages.findIndex(x => x.userChatId === userCheck);

    if (indexMessage === -1) {
      return;
    }
    let messageUser = messages[indexMessage].messages;

    let ids = _map(messageUser, "id");
    let max = Math.max(...ids);
    messageUser.push({
      id: max + 1,
      userId: m.userInfo.userId,
      message: m.data.trim(),
      userName: m.userInfo.lastName + m.userInfo.firstName
    });
    messages[indexMessage].messages = messageUser;
    this.setState({ messages });

    // hủy sự kiện tyring của chính mình sau khi gửi đi message
    // tim user tyring theo id user chat
    let isUserTyring = listTyring.findIndex(
      x => x.userId === m.userInfo.userId
    );

    if (isUserTyring !== -1) {
      listTyring.splice(isUserTyring, 1);
      this.setState({ userTyring: listTyring });
    }
  };

  checkTyring = user => {
    // check xem user tyring nay da co trong list tyring chua
    let isUserTyring = this.state.userTyring.findIndex(
      x => x.userId === user.userId
    );

    if (isUserTyring !== -1) return;
    this.setState({ userTyring: this.state.userTyring.concat(user) });
  };

  // hiển thị dấu 3 chấm khi có người đang nhập
  handleTyping = userId => {
    const { userOnline } = this.state;
    // get id socket cho client
    let user = userOnline.find(x => x.userId === userId);
    this.socket.emit("typing", {
      userInfo: { ...this.props.userInfo, id: this.socket.id },
      userChat: { ...user, id: user ? user.id : "" }
    });
  };

  // close popup chat client
  handleCloseChatClient = userId => {
    const arrOpenChat = this.state.isOpenChat;
    const arrMessagesUer = this.state.messages;
    const arrUserClient = this.state.userClient;

    // remove status open chat by user
    let indexOpenChat = arrOpenChat.findIndex(x => x.userId === userId);
    if (indexOpenChat !== -1) {
      arrOpenChat.splice(indexOpenChat, 1);
    }

    // remove messages chat by user
    // messages : { userChatId: userChat.userId, messages: [] };
    let indexMessage = arrMessagesUer.findIndex(x => x.userChatId === userId);
    if (indexMessage !== -1) {
      arrMessagesUer.splice(indexMessage, 1);
    }

    // remove userClient by user
    let indexUserClient = arrUserClient.findIndex(x => x.userId === userId);
    if (indexUserClient !== -1) {
      arrUserClient.splice(indexUserClient, 1);
    }
    // set state
    this.setState({
      isOpenChat: arrOpenChat,
      messages: arrMessagesUer,
      userClient: arrUserClient
    });
    // tat show more queue
    this.handleClickAway();
  };

  // remove user trong hang doi chat
  removeQueueByUserId = userId => {
    const arrUserQueue = this.state.queueChat;

    // remove user trong queue
    let indexQueue = arrUserQueue.findIndex(x => x.userId === userId);
    if (indexQueue !== -1) {
      arrUserQueue.splice(indexQueue, 1);
      this.setState({ queueChat: arrUserQueue });
    }
  };

  // active form chat lấy user từ queue
  activeChatFromQueue = user => {
    const { userClient } = this.state;
    // tat show more queue
    this.handleClickAway();
    // xóa chính nó trong hàng đợi chat
    this.removeQueueByUserId(user.userId);

    if (userClient.length > 0) {
      // add user chuan bị close vào trong hang đợi
      this.setState({ queueChat: this.state.queueChat.concat(userClient[0]) });
      // close form chat đầu tiên trong 2 form đang chat
      this.handleCloseChatClient(userClient[0].userId);
    }

    // set user client chat đồng thời mở popup chat
    this.getHistoryChatByUser(user);
    // push user này chat vao mang
    this.setState(
      {
        userClient: this.state.userClient.concat(user),
        isOpenChat: this.state.isOpenChat.concat({
          userId: user.userId,
          active: true
        })
      },
      () => this.activeFormChat(user.userId)
    );
  };

  findClientChatByUserId = userId => {
    let client = this.state.userClient.find(x => x.userId === userId);
    if (!client) return null;
    return client;
  };

  findMessageClientChatByUserId = userId => {
    let messageClient = this.state.messages.find(x => x.userChatId === userId);
    if (!messageClient) return null;
    return messageClient.messages;
  };

  findClientTyringByUserId = userId => {
    let tyringUser = this.state.userTyring.find(x => x.userId === userId);
    if (!tyringUser) return null;
    return tyringUser;
  };

  checkOnlineByUserId = userId => {
    let indexUser = this.state.userOnline.findIndex(x => x.userId === userId);
    if (indexUser === -1) return false;
    return true;
  };

  handleShowQueueUser = () => {
    this.setState({ openQueue: !this.state.openQueue });
  };

  handleClickAway = () => {
    this.setState({ openQueue: false });
  };

  render = () => {
    const { classes, userInfo } = this.props;
    const {
      openQueue,
      listUser,
      isOpenList,
      isOpenChat,
      queueChat,
      userClient,
      messages,
      userOnline,
      scrollBottom,
      userTyring
    } = this.state;
    // console.log("message: ", messages);
    // console.log("listOpenChat: ", isOpenChat);
    // console.log("userChat: ", userClient);

    // render form chat
    let renderChat =
      isOpenChat.length > 0 &&
      isOpenChat.map(item => {
        let client = this.findClientChatByUserId(item.userId);
        let messageClient = this.findMessageClientChatByUserId(item.userId);
        let isOnline = this.checkOnlineByUserId(item.userId);
        let tyring = this.findClientTyringByUserId(item.userId);
        return (
          <ContentChat
            key={item.userId}
            isOnline={isOnline}
            activeForm={item.active}
            userChat={client}
            userInfo={userInfo}
            messages={messageClient}
            handleClose={this.handleCloseChatClient}
            handleSendMessage={this.sendnewMessageToUser(item.userId)}
            typing={() => this.handleTyping(item.userId)}
            userTyring={tyring}
          />
        );
      });

    // render hàng đợi chat
    let elQueue =
      queueChat.length > 0 &&
      queueChat.map(item => {
        return (
          <li key={item.userId}>
            <span onClick={() => this.activeChatFromQueue(item)}>
              {item.lastName + " " + item.firstName}
            </span>
            <CloseIcon onClick={() => this.removeQueueByUserId(item.userId)} />
          </li>
        );
      });
    return (
      <React.Fragment>
        {isOpenList === 0 && (
          <Fab onClick={() => this.openPopup(1)} className={classes.blockChat}>
            <MessageIcon />
          </Fab>
        )}
        <ContentListUser
          isOpen={isOpenList === 1 ? true : false}
          listUser={listUser}
          openChat={this.openChatClient}
          handleClose={() => this.setState({ isOpenList: 0 })}
          userInfo={this.props.userInfo}
          userOnline={userOnline}
        />
        {/* render nhieu box chat */}
        <div className={classes.listFormChat}>
          {/* icon hàng đợi */}
          {queueChat.length > 0 && (
            <div className={classes.blockQueue}>
              <ClickAwayListener onClickAway={this.handleClickAway}>
                <div>
                  <MessageIcon
                    onClick={this.handleShowQueueUser}
                    className={classes.iconQueue}
                  />
                  {openQueue ? (
                    <Paper className={classes.paperQueue}>
                      <ul>{elQueue}</ul>
                    </Paper>
                  ) : null}
                </div>
              </ClickAwayListener>
            </div>
          )}
          {/* các form chat */}
          {renderChat}
        </div>
      </React.Fragment>
    );
  };
}

MainChat.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  userInfo: PropTypes.object
};
export default withCookies(withRoot(withStyles(styles)(MainChat)));
