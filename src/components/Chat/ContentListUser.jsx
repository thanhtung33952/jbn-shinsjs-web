import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { PropTypes } from "prop-types";
// marterial-ui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Slide from '@material-ui/core/Slide';
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import CloseIcon from "@material-ui/icons/Close";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreHoriz";
// customer component
// jss
import styles from "assets/jss/components/styleChat.jsx";

class ContentListUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMore: null,
      valSearch: ""
    };
  }
  handleShowMore = () => {
    this.setState({ openMore: !this.state.openMore });
  };

  handleClickAway = () => {
    this.setState({ openMore: false });
  };
  openChatClient = user => {
    // open popup chat
    const { openChat } = this.props;
    if (openChat) {
      openChat(user);
    }
  };

  handleCloseList = () => {
    const { handleClose } = this.props;
    if (handleClose) {
      this.handleClickAway();
      handleClose();
    }
  };

  checkUserOnline = userId => {
    const { userOnline } = this.props;
    let isUserOnline = userOnline.find(x => x.userId === userId);
    if (isUserOnline) {
      return true;
    } else return false;
  };

  handleSearchUser = e => {
    this.setState({ valSearch: e.target.value });
  };

  render = () => {
    const { classes, isOpen, listUser, userInfo } = this.props;

    const renderListUser = listUser.map(user => {
      if (user.userId !== userInfo.userId) {
        return (
          <ListItem
            key={user.userId}
            onClick={() => this.openChatClient(user)}
            className={classes.itemUser}
          >
            <ListItemAvatar style={{ minWidth: 45 }}>
              <Avatar className={classes.avatar}>
                <ImageIcon />
                {this.checkUserOnline(user.userId) && (
                  <span className={classes.online}></span>
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.lastName + " " + user.firstName}
              className={classes.textName}
            />
          </ListItem>
        );
      }
    });
    return (
      <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
        <div className={classes.listUserChat}>
          <div className={classes.headList}>
            <ListItem className={classes.infoUser}>
              <Avatar className={classes.avatar}>
                <ImageIcon />
                <span className={classes.online}></span>
              </Avatar>
              <ListItemText
                primary={userInfo.lastName + " " + userInfo.firstName}
                className={classes.textName}
              />
            </ListItem>
            <ClickAwayListener onClickAway={this.handleClickAway}>
              <div className={classes.optionBlock}>
                <MoreIcon
                  onClick={this.handleShowMore}
                  className={classes.iconMore}
                />
                {this.state.openMore ? (
                  <Paper className={`${classes.paperQueue} ${classes.paperMore}`}>
                    <ul>
                      <li>
                        <span onClick={this.handleCloseList}>Close list</span>
                      </li>
                      <li>
                        <span onClick={this.handleCloseList}>Log out</span>
                      </li>
                    </ul>
                  </Paper>
                ) : null}
              </div>
            </ClickAwayListener>
          </div>
          <List className={classes.rootList}>{renderListUser}</List>
          <div className={classes.blockControlList}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                value={this.state.valSearch}
                inputProps={{ "aria-label": "search" }}
                onChange={this.handleSearchUser}
              />
            </div>
            <CloseIcon
              className={classes.iconSetting}
              onClick={() => this.setState({ valSearch: "" })}
            />
          </div>
        </div>
      </Slide>
    );
  };
}

ContentListUser.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  isOpen: PropTypes.bool,
  userInfo: PropTypes.object,
  listUser: PropTypes.array,
  userOnline: PropTypes.array,
  openChat: PropTypes.func,
  handleClose: PropTypes.func
};

export default withStyles(styles)(ContentListUser);
