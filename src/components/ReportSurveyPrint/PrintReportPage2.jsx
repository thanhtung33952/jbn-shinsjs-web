import React from "react";
import withRoot from "withRoot";
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
    marginBottom: 5,
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  rowHeadChild: {
    flexDirection: "row",
    width: "100%",
    verticalAlign: "inherit",
    margin: "auto"
  },
  tableColChild: {
    width: "22%",
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderLeftWidth: 0,
    textAlign: "center",
    padding: "0pt 8pt",
    borderTopWidth: 0
  },
  tableColChild15: {
    width: "6%",
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderLeftWidth: 0,
    textAlign: "center",
    padding: "0pt 8pt",
    borderTopWidth: 0
  },
  textTd: {
    fontFamily: "mplusThin",
    whiteSpace: "nowrap",
    color: "#000000",
    fontSize: 12
  },
  imgTable: {
    width: "50%"
  }
});
const DocumentPrint = data => (
  <Page size="A4" style={styles.root}>
    <View style={styles.line} />
    <View style={styles.grMain}>
      <Text style={styles.textTitle}>調査概要</Text>
      {/* table */}
      <View style={styles.tableMain}>
        {/* row 1 */}
        <View style={styles.tableRow}>
          <View style={styles.colFirst}>
            <Text style={styles.tableCell}>調査件名</Text>
          </View>
          <View style={styles.colSecond}>
            <Text style={styles.tableCell1}>
              {data.dataRender && data.dataRender.property_name
                ? data.dataRender.property_name
                : "調査件名"}
            </Text>
          </View>
        </View>
        {/* row 2 */}
        <View style={styles.tableRow}>
          <View style={styles.colFirst}>
            <Text style={styles.tableCell}>調査場所</Text>
          </View>
          <View style={styles.colSecond}>
            <Text style={styles.tableCell1}>
              {data.dataRender && data.dataRender.survey_site
                ? data.dataRender.survey_site
                : "調査地"}
            </Text>
          </View>
        </View>
        {/* row 3 */}
        <View style={styles.tableRow}>
          <View style={styles.colFirst}>
            <Text style={styles.tableCell}>調査年月日</Text>
          </View>
          <View style={styles.colSecond}>
            <Text style={styles.tableCell1}>
              {data.dataRender && data.dataRender.survey_date
                ? data.dataRender.survey_date
                : "調査日付 2019年10月10日"}
            </Text>
          </View>
        </View>
        {/* row 4 */}
        <View style={styles.tableRow}>
          <View style={styles.colFirst}>
            <Text style={styles.tableCell}>調査目的</Text>
          </View>
          <View style={styles.colSecond}>
            <Text style={styles.tableCellNoneBorder}>
              敷地内の代表される地点で下記内容の調合を行って，地盤の硬軟締まり状況等を予定構造物の基礎設計及び施工に関する資料を得るために実施した。
            </Text>
          </View>
        </View>
        {/* row 5 */}
        <View style={styles.tableRow}>
          <View style={styles.colFirst}>
            <Text style={styles.tableCell}>調査機器</Text>
          </View>
          <View style={styles.colSecond}>
            <Text style={styles.tableCell1}>
              {data.dataRender && data.dataRender.survey_equipment
                ? data.dataRender.survey_equipment
                : "調査機器"}
            </Text>
          </View>
        </View>
        {/* row 6 */}
        <View style={styles.tableRow}>
          <View style={styles.colFirst}>
            <Text style={styles.tableCell}>調査内容</Text>
          </View>
          <View style={styles.colSecond}>
            <Text style={styles.tableCellNoneBorder}>1.スウェーデン式型査</Text>
            <View style={styles.tableChild}>
              <View style={styles.rowHeadChild}>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}>調査深度</Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}>特記事項</Text>
                </View>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}>調査深度</Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}>特記事項</Text>
                </View>
              </View>
              <View style={styles.rowHeadChild}>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}>1</Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}>6</Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
              </View>
              <View style={styles.rowHeadChild}>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}>2</Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
              </View>
              <View style={styles.rowHeadChild}>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}>3</Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
              </View>
              <View style={styles.rowHeadChild}>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}>4</Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
              </View>
              <View style={styles.rowHeadChild}>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}>5</Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
              </View>
              <View style={styles.rowHeadChild}>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}>6</Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild15}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
                <View style={styles.tableColChild}>
                  <Text style={styles.textTd}></Text>
                </View>
              </View>
            </View>
            <Text style={styles.tableCellNoneBorder}>
              2.地形地唇調査，敷地内造成状況調査，目視観察状況調査
            </Text>
          </View>
        </View>
        {/* row 7 */}
        <View style={styles.tableRow}>
          <View style={styles.colFirst}>
            <Text style={styles.tableCell}>調査担当</Text>
          </View>
          <View style={styles.colSecondInline}>
            <Text style={styles.tableCellNoneBorderInline}>担当者</Text>
            <Text style={styles.tableCellBorderInline}>
              {data.dataRender && data.dataRender.person_in_charge
                ? data.dataRender.person_in_charge
                : "担当者"}
            </Text>
          </View>
        </View>
        {/* row 8 */}
        <View style={styles.tableRow}>
          <View style={styles.colFirst}>
            <Text style={styles.tableCell}>使用計算式</Text>
          </View>
          <View style={styles.colSecond}>
            <Text style={styles.tableCellNoneBorderBold}>
              換算N値の計算式は，稲田式を採用しております。3Wsw
              -0.05Nsw（粘性土）許容支持力の計算式は日本建築学会推奨式を採用しております。qa
              = 30Wsw + 0.64Nsw Nswが150以上の場合150とみなしております。
            </Text>
            <Image src={tbChildPage2} style={styles.imgTable} />
          </View>
        </View>
      </View>
    </View>
    <View style={styles.lineEnd} />
  </Page>
);
class PrintReportPage2 extends React.Component {
  render() {
    return <DocumentPrint dataRender={this.props.dataRender} />;
  }
}

PrintReportPage2.propTypes = {
  dataRender: PropTypes.object
};
export default PrintReportPage2;
