import React from "react";
import withRoot from "withRoot";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { PropTypes } from "prop-types";
// import { leafletImage } from "leaflet-image";
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
import tbChildPage2 from "assets/img/tbChildPage2.png";

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
    border: "1px solid gray",
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
  tableMain: {
    display: "table",
    width: "100%",
    textAlign: "left",
    marginTop: 20
  },
  tableRow: {
    marginBottom: 10,
    flexDirection: "row"
  },
  colFirst: {
    textAlign: "left",
    marginTop: 0,
    width: "20%"
  },
  colSecond: {
    textAlign: "left",
    width: "80%"
  },
  colSecondInline: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left"
  },
  tableCell: {
    marginTop: 0,
    verticalAlign: "top",
    fontFamily: "mplusBold",
    textAlign: "left",
    color: "#213858",
    letterSpacing: 6,
    fontSize: 12,
    fontWeight: 600
  },
  tableCell1: {
    borderWidth: 1,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    fontFamily: "mplusThin",
    textAlign: "left",
    whiteSpace: "nowrap",
    lineHeight: "100%",
    padding: "0pt 8pt",
    verticalAlign: "bottom",
    display: "block",
    color: "#000000",
    fontSize: 12
  },
  tableCellBorderInline: {
    borderWidth: 1,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    fontFamily: "mplusThin",
    textAlign: "left",
    whiteSpace: "nowrap",
    lineHeight: "100%",
    padding: "0pt 8pt",
    verticalAlign: "bottom",
    color: "#000000",
    width: 200,
    fontSize: 12
  },
  tableCellNoneBorderInline: {
    fontFamily: "mplusThin",
    textAlign: "left",
    whiteSpace: "nowrap",
    lineHeight: "100%",
    paddingRight: 8,
    verticalAlign: "bottom",
    color: "#000000",
    fontSize: 12
  },
  tableCellNoneBorderBold: {
    fontFamily: "mplusBold",
    textAlign: "left",
    whiteSpace: "nowrap",
    lineHeight: "100%",
    paddingRight: 8,
    verticalAlign: "bottom",
    color: "#222222",
    fontSize: 12
  },
  tableCellNoneBorder: {
    fontFamily: "mplusThin",
    textAlign: "left",
    // whiteSpace: "nowrap",
    lineHeight: "100%",
    verticalAlign: "bottom",
    display: "block",
    color: "#000000",
    fontSize: 12
  },
  tableChild: {
    display: "table",
    width: "100%",
    marginTop: 20
  },
  rowHeadChild: {
    flexDirection: "row",
    width: "100%",
    verticalAlign: "inherit",
    margin: "auto"
  },
  tableColFirst: {
    width: "20%",
    margin: 1,
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 8pt"
  },
  tableColSecond: {
    width: "80%",
    margin: 1,
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 8pt"
  },
  textTd: {
    fontFamily: "mplusThin",
    whiteSpace: "nowrap",
    color: "#000000",
    textAlign: "left",
    fontSize: 12
  },
  loaddingMap: {
    marginTop: 20,
    textAlign: "center",
    fontFamily: "mplusBold",
    fontSize: 14,
    color: "#222"
  },
  imgMap: {
    marginTop: 20,
    width: "100%"
  }
});
const DocumentPrint = data => (
  <Page size="A4" style={styles.root}>
    <View style={styles.line} />
    <View style={styles.grMain}>
      <Text style={styles.textTitle}>調査場所</Text>
      {/* map */}
      {/* {console.log(data.imgMap)} */}
      {data.imgMap ? (
        <Image src={data.imgMap} style={styles.imgMap} />
      ) : (
        <Text style={styles.loaddingMap}>Loadding Map...</Text>
      )}
      {/* table */}
      <View style={styles.tableChild}>
        <View style={styles.rowHeadChild}>
          <View style={styles.tableColFirst}>
            <Text style={styles.textTd}>仮住所</Text>
          </View>
          <View style={styles.tableColSecond}>
            <Text style={styles.textTd}>
              {data.dataRender && data.dataRender.temporary_address
                ? data.dataRender.temporary_address
                : ""}
            </Text>
          </View>
        </View>
        <View style={styles.rowHeadChild}>
          <View style={styles.tableColFirst}>
            <Text style={styles.textTd}>確定住所</Text>
          </View>
          <View style={styles.tableColSecond}>
            <Text style={styles.textTd}>
              {data.dataRender && data.dataRender.final_address
                ? data.dataRender.final_address
                : ""}
            </Text>
          </View>
        </View>
        <View style={styles.rowHeadChild}>
          <View style={styles.tableColFirst}>
            <Text style={styles.textTd}>緯度、経度</Text>
          </View>
          <View style={styles.tableColSecond}>
            <Text style={styles.textTd}>
              {data.dataRender && data.dataRender.coordinates
                ? data.dataRender.coordinates
                : ""}
            </Text>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.lineEnd} />
  </Page>
);
class PrintReportPage4 extends React.Component {
  render() {
    const { dataRender, imgMap } = this.props;
    return (
      <React.Fragment>
        <DocumentPrint dataRender={dataRender} imgMap={imgMap} />
      </React.Fragment>
    );
  }
}

PrintReportPage4.propTypes = {
  dataRender: PropTypes.object,
  imgMap: PropTypes.string
};
export default PrintReportPage4;
