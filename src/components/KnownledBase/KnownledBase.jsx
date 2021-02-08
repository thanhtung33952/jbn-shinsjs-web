import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// api
import { apiRoot } from "constant/index.js";
// images
import IconBook from "assets/img/knowledge.png";
// jss
import styles from "assets/jss/components/styleKnownledBase.jsx";
class KnownledBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagId: 25,
      titleTag: []
    };
  }
  componentDidMount = () => {
    fetch(`${apiRoot}/tag/${this.state.tagId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({ titleTag: result });
      });
  };
  render = () => {
    const { classes } = this.props;
    const { tagId, titleTag } = this.state;
    const renderTitleTag = titleTag.map((item, index) => {
      return (
        <ListItem key={index}>
          <a
            href={`http://sjs2.online/kbase-dev/a/${tagId}/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.textLi}
          >
            {item.title}
          </a>
        </ListItem>
      );
    });
    return (
      <div className={classes.blockKnow}>
        <Typography variant="h5" className={classes.titleSearch}>
          <img className={classes.logo} src={IconBook} alt="ナレッジベース" />
          ナレッジベース
        </Typography>
        {/* <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div> */}
        {/* <Typography className={classes.lableChild}>このページのタグ</Typography> */}
        <div style={{ textAlign: "right" }}>
          <Button variant="outlined" className={classes.btnSjs}>
            取引先の新規登録
          </Button>
        </div>
        <Typography className={classes.lableChild}>
          タイトルをクリックすると、詳細を別ウインドウに表示します。
        </Typography>
        <List className={classes.listSjs}>{renderTitleTag}</List>
      </div>
    );
  };
}
KnownledBase.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRoot(withStyles(styles)(KnownledBase));
