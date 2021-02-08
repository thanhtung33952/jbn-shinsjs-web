import React from "react";
import { PropTypes } from "prop-types";
import { Page, Text, View, Image, Font, StyleSheet } from "@react-pdf/renderer";
// img
import bgPagePrint from "assets/img/bg01.png";
import logoFooter from "assets/img/logoFooter.PNG";

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
// Create styles
const styles = StyleSheet.create({
  document: {
    width: "100%"
  },
  body: {
    textAlign: "right",
    border: "1px solid gray",
    position: "relative",
    // marginBottom: 80,
    width: "100%",
    height: "100%",
    display: "block",
    backgroundColor: "#fff"
  },
  imgBg: {
    width: "20%",
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0
  },
  textReport: {
    transform: "rotate(-90deg)",
    color: "#CACCE1",
    fontSize: "20pt",
    position: "absolute",
    right: "20pt",
    bottom: "110pt",
    width: "220pt",
    fontWeight: "heavy",
    textAlign: "left"
  },
  grMain: {
    position: "absolute",
    top: "30vh",
    display: "flex",
    flexDirection: "column",
    left: 40,
    color: "#213858",
    textAlign: "left"
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 900,
    color: "#213858",
    position: "relative",
    textAlign: "left",
    fontFamily: "mplusBold",
    lineHeight: "100%"
  },
  input: {
    marginTop: 20,
    marginLeft: 6,
    border: "solid 1pt rgba(0, 0, 0, 0.23)",
    lineHeight: "100%",
    padding: "2pt 10pt",
    textAlign: "left",
    fontSize: 14,
    color: "#000000",
    fontFamily: "mplusThin"
  },
  gachDoc: {
    width: 10,
    display: "block",
    backgroundColor: "#213858",
    position: "absolute",
    left: -20,
    top: 6,
    height: 85
  },
  footer: {
    position: "absolute",
    left: 30,
    bottom: 10,
    textAlign: "left"
  },
  logoFt: {
    display: "block",
    width: 160
  },
  spanFooter: {
    fontSize: 10,
    color: "#000",
    fontWeight: 600,
    display: "block",
    textAlign: "left",
    fontFamily: "mplusBold"
  },
  spanFooter1: {
    display: "block",
    fontSize: 9,
    fontWeight: 600,
    color: "#000",
    marginBottom: 5,
    fontFamily: "mplusBold"
  }
});
const DocumentPrint = data => (
  <Page size="A4" style={styles.body}>
    <Image src={bgPagePrint} style={styles.imgBg} />
    <Text style={styles.textReport}>Ground Survey Report</Text>
    <View style={styles.grMain}>
      <Text style={styles.textTitle} fixed>
        地盤調査報告書
      </Text>
      <Text style={styles.input}>
        {data.dataRender && data.dataRender.property_name
          ? data.dataRender.property_name
          : "物件名"}
      </Text>
      <Text style={styles.input}>
        {data.dataRender && data.dataRender.survey_date
          ? data.dataRender.survey_date
          : "調査日付 2019年10月10日"}
      </Text>
      <View style={styles.gachDoc}></View>
    </View>
    <View style={styles.footer}>
      <Image src={logoFooter} style={styles.logoFt} />
      <Text style={styles.spanFooter}>地盤ネット株式会社</Text>
      <Text style={styles.spanFooter1}>
        東京都中央区日本橋1-7-9ダヴィンチ日本橋179ビル2F
      </Text>
      <Text style={styles.spanFooter}>TEL 03-6265-1803 FAX 03-6265-1804</Text>
    </View>
  </Page>
);

class PrintReportPage1 extends React.Component {
  render() {
    return <DocumentPrint dataRender={this.props.dataRender} />;
  }
}
PrintReportPage1.propTypes = {
  dataRender: PropTypes.object
};
export default PrintReportPage1;
