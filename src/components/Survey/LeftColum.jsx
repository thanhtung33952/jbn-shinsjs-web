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
    padding: "0 10px 0 10px",
    marginTop: 25,
    "& h3": {
      textAlign: "center",
      color: "#222",
      marginBottom: 15,
      fontSize: 20
    }
  },
  content: {
    color: "#555E69",
    "& dt": {
      marginTop: 12,
      borderBottom: "solid 1px gray"
    },
    "& dd": {
      marginBottom: 4,
      marginTop: 2
    },
    "& $itemSelect": {
      color: "darkred",
      fontWeight: "bold"
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
    const { classes } = this.props;
    return (
      <div className={classes.colLeftSurvey}>
        <div className={classes.blockContentLeft}>
          <Typography component="h3">申込から納品まで</Typography>
          <div className={classes.content}>
            <dt className={classes.itemSelect}>▼ 申込書の作成</dt>
            <dd>必要事項を記入</dd>
            <dd>図、ファイルをアップロード</dd>
            <dt>▼ 地盤調査会社への発注</dt>
            <dd>調査依頼を作成</dd>
            <dd>調査会社へ申込み</dd>
            <dd>調査会社の確定・発注</dd>
            <dt>▼ 地盤調査</dt>
            <dd>調査会社が調査実施</dd>
            <dd>地盤調査報告書</dd>
            <dd>地盤調査の解析・判定</dd>
            <dt>▼ 地盤改良工事（必要な場合）</dt>
            <dd>工事仕様書を作成</dd>
            <dd>工事会社の選定・発注</dd>
            <dd>工事実施・報告</dd>
            <dd>工事の検収</dd>
            <dt>▼ 完了手続き</dt>
            <dd>各種証明書の発行</dd>
            <dd>請求処理</dd>
          </div>
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
