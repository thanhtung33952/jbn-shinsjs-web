import React from "react";
import { PropTypes } from "prop-types";
import {
  Page,
  Text,
  View,
  Document,
  Font,
  Image,
  StyleSheet
} from "@react-pdf/renderer";
// img
import imgContent from "assets/img/03.jpg";

import fontMplusThin from "assets/fonts/mplus-1-thin-sub.ttf";
import fontMplusBold from "assets/fonts/mplus-2-bold-sub.ttf";
// Register font
Font.register({
  family: "mplusThin",
  src: fontMplusThin
});
Font.register({
  family: "mplusBold",
  src: fontMplusBold
});
// jss
const BORDER_COLOR = "#999";
const BORDER_STYLE = "solid";
const styles = StyleSheet.create({
  document: {
    width: "100%",
    marginTop: 30
  },
  root: {
    // height: "100%",
    position: "relative",
    marginBottom: 80,
    padding: "20pt 15pt",
    width: "100%",
    display: "block",
    boxSizing: "border-box",
    backgroundColor: "#fff"
  },
  line: {
    height: 15,
    backgroundColor: "#213858",
    display: "block"
  },
  lineEnd: {
    height: 15,
    width: "98%",
    backgroundColor: "#213858",
    display: "block",
    position: "absolute",
    bottom: 20,
    left: 15
  },
  grMain: {
    color: "#213858",
    padding: "0px 5%",
    display: "block",
    width: "100%",
    boxSizing: "border-box"
  },
  textTitle: {
    fontSize: 22,
    fontWeight: 900,
    fontFamily: "mplusBold",
    color: "#213858",
    position: "relative",
    lineHeight: "100%",
    display: "block",
    marginTop: 20,
    width: "100%",
    borderBottomStyle: "dashed",
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1
  },
  imgContent: {
    width: "auto"
  }
});
const DocumentPrint = () => (
  <Page size="A4" style={styles.root}>
    <View style={styles.line} />
    <View style={styles.grMain}>
      <Text style={styles.textTitle}>調査方法概要</Text>
      <Image src={imgContent} style={styles.imgContent} />
    </View>
    <View style={styles.lineEnd} />
  </Page>
);
class PrintReportPage3 extends React.Component {
  render() {
    return <DocumentPrint dataRender={this.props.dataRender} />;
  }
}

PrintReportPage3.propTypes = {
  dataRender: PropTypes.object
};
export default PrintReportPage3;
