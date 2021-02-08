import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { PropTypes } from "prop-types";
// marterial-ui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
// customer component
// jss
import styles from "assets/jss/components/styleChat.jsx";

class ContentListUser extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render = () => {
    const { user, messages, classes } = this.props;

    const renderMessage = messages.map((item, i) => {
      let classMess = item.userName === this.props.user.name ? "message right appeared" : "message left appeared";
      return (
        <li key={i} className={classMess}>
            <div className="avatar"></div>
            <div className="text_wrapper">
                <div className="text"><b>{item.userName}</b><br></br>{item.message}</div>
            </div>
        </li>
      );
    });
    return (
      <div className={classes.messages}>
        <List className={classes.rootList}>{renderMessage}</List>
      </div>
    )
  };
}

ContentListUser.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  listUser: PropTypes.array,
  openChat: PropTypes.func
};

export default withStyles(styles)(ContentListUser);
