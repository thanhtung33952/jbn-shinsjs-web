import React from "react";
import withRoot from "withRoot";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { PropTypes } from "prop-types";
// constant
import { imageRoot } from "constant/index.js";
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
  content: {
    padding: "0px 5pt",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    boxSizing: "border-box"
  },
  box: {
    width: "49%",
    boxSizing: "border-box",
    marginTop: 5,
    marginBottom: 5
  },
  titleBox: {
    fontSize: 12,
    padding: 3,
    fontWeight: 900,
    fontFamily: "mplusBold",
    color: "#fff",
    width: "100%",
    backgroundColor: "#006400",
    textAlign: "center"
  },
  imgBox: {
    width: "auto",
    margin: "auto",
    height: "100%",
    maxWidth: "100%"
  },
  boxImage: {
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    width: "100%",
    height: 180,
    padding: 5
  },
  imgLoadding: {
    borderStyle: "dotted ",
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
    height: "100%",
    fontSize: 12,
    color: "#222",
    textAlign: "center",
    paddingTop: 70
  }
});
const DocumentPrint = data => (
  <Page size="A4" style={styles.root}>
    <View style={styles.line} />
    <View style={styles.grMain}>
      <Text style={styles.textTitle}>試験測点写真</Text>
    </View>
    <View style={styles.content}>
      {/* box 1 */}
      <View style={styles.box}>
        <Text style={styles.titleBox}>前面道路：東側</Text>
        <View style={styles.boxImage}>
          {data.dataRender.front_road_east_side &&
          data.dataRender.front_road_east_side.preview ? (
            <Image
              cache={false}
              src={data.dataRender.front_road_east_side.preview}
              style={styles.imgBox}
            />
          ) : data.dataRender.front_road_east_side ? (
            <Image
              src={`${imageRoot}${data.dataRender.front_road_east_side}`}
              allowDangerousPaths={true}
              cache={true}
              style={styles.imgBox}
            />
          ) : (
            <Text style={styles.imgLoadding}>
              File selector or drag and drop
            </Text>
          )}
        </View>
      </View>
      {/* box 2 */}
      <View style={styles.box}>
        <Text style={styles.titleBox}>前面道路：南側</Text>
        <View style={styles.boxImage}>
          {/* image */}
          {data.dataRender.front_road_south_side &&
          data.dataRender.front_road_south_side.preview ? (
            <Image
              cache={false}
              src={data.dataRender.front_road_south_side.preview}
              style={styles.imgBox}
            />
          ) : data.dataRender.front_road_south_side ? (
            <Image
              cache={false}
              allowDangerousPaths={true}
              src={`${imageRoot}${data.dataRender.front_road_south_side}`}
              style={styles.imgBox}
            />
          ) : (
            <Text style={styles.imgLoadding}>
              File selector or drag and drop
            </Text>
          )}
        </View>
      </View>
      {/* box 3 */}
      <View style={styles.box}>
        <Text style={styles.titleBox}>西側境界</Text>
        <View style={styles.boxImage}>
          {/* image */}
          {data.dataRender.western_border &&
          data.dataRender.western_border.preview ? (
            <Image
              cache={false}
              src={data.dataRender.western_border.preview}
              style={styles.imgBox}
            />
          ) : data.dataRender.western_border ? (
            <Image
              cache={false}
              allowDangerousPaths={true}
              src={`${imageRoot}${data.dataRender.western_border}`}
              style={styles.imgBox}
            />
          ) : (
            <Text style={styles.imgLoadding}>
              File selector or drag and drop
            </Text>
          )}
        </View>
      </View>
      {/* box 4 */}
      <View style={styles.box}>
        <Text style={styles.titleBox}>東側境界</Text>
        <View style={styles.boxImage}>
          {/* image */}
          {data.dataRender.east_border &&
          data.dataRender.east_border.preview ? (
            <Image
              cache={false}
              src={data.dataRender.east_border.preview}
              style={styles.imgBox}
            />
          ) : data.dataRender.east_border ? (
            <Image
              cache={false}
              allowDangerousPaths={true}
              src={`${imageRoot}${data.dataRender.east_border}`}
              style={styles.imgBox}
            />
          ) : (
            <Text style={styles.imgLoadding}>
              File selector or drag and drop
            </Text>
          )}
        </View>
      </View>
      {/* box 5 */}
      <View style={styles.box}>
        <Text style={styles.titleBox}>南側境界</Text>
        <View style={styles.boxImage}>
          {/* image */}
          {data.dataRender.southern_boundary &&
          data.dataRender.southern_boundary.preview ? (
            <Image
              cache={false}
              src={data.dataRender.southern_boundary.preview}
              style={styles.imgBox}
            />
          ) : data.dataRender.southern_boundary ? (
            <Image
              cache={false}
              allowDangerousPaths={true}
              src={`${imageRoot}${data.dataRender.southern_boundary}`}
              style={styles.imgBox}
            />
          ) : (
            <Text style={styles.imgLoadding}>
              File selector or drag and drop
            </Text>
          )}
        </View>
      </View>
      {/* box 6 */}
      <View style={styles.box}>
        <Text style={styles.titleBox}>北側境界</Text>
        <View style={styles.boxImage}>
          {/* image */}
          {data.dataRender.north_border &&
          data.dataRender.north_border.preview ? (
            <Image
              cache={false}
              src={data.dataRender.north_border.preview}
              style={styles.imgBox}
            />
          ) : data.dataRender.north_border ? (
            <Image
              cache={false}
              allowDangerousPaths={true}
              src={`${imageRoot}${data.dataRender.north_border}`}
              style={styles.imgBox}
            />
          ) : (
            <Text style={styles.imgLoadding}>
              File selector or drag and drop
            </Text>
          )}
        </View>
      </View>
    </View>
    <View style={styles.lineEnd} />
  </Page>
);
class PrintReportPage14 extends React.Component {
  render() {
    const { dataRender } = this.props;
    return (
      <React.Fragment>
        <DocumentPrint dataRender={dataRender} />
      </React.Fragment>
    );
  }
}

PrintReportPage14.propTypes = {
  dataRender: PropTypes.object
};
export default PrintReportPage14;
