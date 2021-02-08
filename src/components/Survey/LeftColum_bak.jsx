import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const arrStatus = [
  "申込書作成",
  "地盤調査報告",
  "一次地盤解析",
  "二次地盤解析",
  "設計・見積",
  "工事発注",
  "工事実施",
  "工事結果報告",
  "工事確認",
  "証明書発行",
  "完了"
];
const styles = theme => ({
  colLeftSurvey: {
    "& h2": {
      marginLeft: 10,
      color: "#253b3a",
      fontSize: 14
    }
  },
  blockContentLeft: {
    padding: "0 10px 0 20px",
    marginTop: 30,
    "& h3": {
      textAlign: "center",
      fontWeight: "bold",
      color: "#222",
      marginBottom: 15,
      fontSize: 17
    }
  },
  listItemRight: {
    color: "#fff",
    padding: 0,
    marginBottom: 30,
    "& $itemSelect": {
      backgroundColor: "##a5a5a5",
      color: "#fff",
      "&:hover": {
        backgroundColor: "##a5a5a5"
      }
    },
    "& $itemActive": {
      backgroundColor: "#56C1FF"
    }
  },
  itemActive: {
    backgroundColor: "#56C1FF !important"
  },
  itemSelect: {
    backgroundColor: "##a5a5a5",
    color: "#fff"
  },
  itemRoot: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#929292",
    color: "#fff",
    marginBottom: 1,
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#929292"
    },
    "& span": {
      fontWeight: 600,
      fontSize: "1rem"
    }
  }
});
class LeftColum extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render = () => {
    const { classes, status } = this.props;
    const statusSurvey = !status ? 1 : parseInt(status);
    const itemTextStatus = arrStatus.map((item, key) => {
      let classActive = key + 1 === statusSurvey ? classes.itemActive : "";
      let classSelect = key + 1 < statusSurvey ? classes.itemSelect : "";
      let disabled = key + 1 > statusSurvey ? true : false;
      return (
        <ListItem
          disabled={disabled}
          button
          key={key}
          className={`${classes.itemRoot} ${classActive} ${classSelect}`}
        >
          <ListItemText primary={item} />
        </ListItem>
      );
    });
    return (
      <div className={classes.colLeftSurvey}>
        <Typography component="h2">地盤安心住宅</Typography>

        <div className={classes.blockContentLeft}>
          <Typography component="h3">ステータス</Typography>
          <List className={classes.listItemRight}>{itemTextStatus}</List>
        </div>
      </div>
    );
  };
}

LeftColum.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.number
};
export default withRoot(withStyles(styles)(LeftColum));
