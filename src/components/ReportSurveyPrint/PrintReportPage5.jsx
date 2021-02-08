import React from "react";
import { PropTypes } from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import {
  Page,
  Text,
  View,
  Document,
  Font,
  Image,
  StyleSheet
} from "@react-pdf/renderer";
// component customer
import CheckboxPDF from "components/ReportSurveyPrint/CheckboxPDF.jsx";
import fontMplusThin from "assets/fonts/mplus-1-thin-sub.ttf";
import fontMplusBold from "assets/fonts/mplus-2-bold-sub.ttf";
// constant
import { imageRoot } from "constant/index.js";
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
    boxSizing: "border-box",
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
    boxSizing: "border-box",
    width: "100%",
    paddingRight: 10,
    marginTop: 0
  },
  rowHeadChild: {
    flexDirection: "row",
    width: "100%",
    verticalAlign: "inherit",
    margin: "auto"
  },
  tableCol1: {
    width: "5%",
    margin: 1,
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt"
  },
  tableCol2: {
    width: "20%",
    margin: 1,
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  tableCol3: {
    width: "12%",
    margin: 1,
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  tableCol4: {
    width: "56%",
    margin: 1,
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  tableCol5: {
    width: "7%",
    margin: 1,
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt",
    display: "flex"
  },
  textTd: {
    fontFamily: "mplusThin",
    whiteSpace: "nowrap",
    display: "block",
    color: "#000000",
    fontSize: 11
  },
  textTitleSub: {
    fontFamily: "mplusBold",
    width: "100%",
    whiteSpace: "nowrap",
    color: "#000000",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 13
  },
  loaddingMap: {
    marginTop: 20,
    textAlign: "center",
    fontFamily: "mplusBold",
    fontSize: 14,
    color: "#222"
  },
  imgContent: {
    marginTop: 0,
    width: "auto",
    marginBottom: 20,
    maxWidth: "100%",
    maxHeight: 400
  },
  imgLoadding: {
    borderStyle: BORDER_STYLE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    width: "100%",
    fontSize: 12,
    color: "#222",
    height: 300,
    marginBottom: 20,
    textAlign: "center",
    paddingTop: 140
  },
  groupCheck: {
    display: "flex",
    flexDirection: "row",
    marginRight: 10,
    marginTop: 5,
    marginBottom: 2
  },
  textCheck: {
    textAlign: "left",
    fontFamily: "mplusThin",
    fontSize: 9,
    color: "#000"
  }
});
const arrayRenderData = ["東", "西	", "南", "北	"];
const DocumentPrint = data => (
  <Page size="A4" style={styles.root}>
    <View style={styles.line} />
    <View style={styles.grMain}>
      <Text style={styles.textTitle}>調査敷地状況</Text>
      <Text style={styles.textTitleSub}>● 印は調査ポイントを示す</Text>
      {data.dataRender &&
      data.dataRender.file &&
      data.dataRender.file.preview ? (
        <Image src={data.dataRender.file.preview} style={styles.imgContent} />
      ) : data.dataRender && data.dataRender.file ? (
        <Image
          src={`${imageRoot}${data.dataRender.file}`}
          allowDangerousPaths={true}
          cache={true}
          style={styles.imgContent}
        />
      ) : (
        <Text style={styles.imgLoadding}>File selector or drag and drop</Text>
      )}
      {/* table */}
    </View>
    <View style={styles.tableChild}>
      <View style={styles.rowHeadChild}>
        <View style={styles.tableCol1}>
          <Text style={styles.textTd}></Text>
        </View>
        <View style={styles.tableCol2}>
          <Text style={styles.textTd}>隣接地高低差</Text>
        </View>
        <View style={styles.tableCol3}>
          <Text style={styles.textTd}>擁壁</Text>
        </View>
        <View style={styles.tableCol4}>
          <Text style={styles.textTd}>種類</Text>
        </View>
        <View style={styles.tableCol5}>
          <Text style={styles.textTd}>距離</Text>
        </View>
      </View>
      {data.dataRender &&
        arrayRenderData.map((item, index) => {
          let pre;
          if (index === 0) {
            pre = "e";
          }
          if (index === 1) {
            pre = "w";
          }
          if (index === 2) {
            pre = "s";
          }
          if (index === 3) {
            pre = "n";
          }
          let name1 = pre + "_adjacent_ground_level_difference";
          let name2 = pre + "_retaining_wall";
          let name3 = pre + "_type";
          let name4 = pre + "_distance";

          let val_name3 =
            data.dataRender &&
            data.dataRender[name3] &&
            data.dataRender[name3][5]
              ? data.dataRender[name3][5]
              : "";
          let val_name4 =
            data.dataRender && data.dataRender[name4]
              ? data.dataRender[name4]
              : "";
          return (
            <View style={styles.rowHeadChild} key={item}>
              <View style={styles.tableCol1}>
                <Text style={styles.textTd}>{item}</Text>
              </View>
              <View style={styles.tableCol2}>
                <View style={styles.groupCheck}>
                  <CheckboxPDF
                    checked={
                      data.dataRender &&
                      data.dataRender[name1] &&
                      data.dataRender[name1].indexOf("none") !== -1
                        ? true
                        : false
                    }
                  />
                  <Text style={styles.textCheck}>晴</Text>
                </View>
                <View style={styles.groupCheck}>
                  <CheckboxPDF
                    checked={
                      data.dataRender &&
                      data.dataRender[name1] &&
                      data.dataRender[name1].indexOf("yes") !== -1
                        ? true
                        : false
                    }
                  />
                  <Text style={styles.textCheck}>あり（　〜　m）</Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={styles.groupCheck}>
                  <CheckboxPDF
                    checked={
                      data.dataRender &&
                      data.dataRender[name2] &&
                      data.dataRender[name2].indexOf("none") !== -1
                        ? true
                        : false
                    }
                  />
                  <Text style={styles.textCheck}>なし</Text>
                </View>
                <View style={styles.groupCheck}>
                  <CheckboxPDF
                    checked={
                      data.dataRender &&
                      data.dataRender[name2] &&
                      data.dataRender[name2].indexOf("yes") !== -1
                        ? true
                        : false
                    }
                  />
                  <Text style={styles.textCheck}>あり</Text>
                </View>
              </View>
              <View style={styles.tableCol4}>
                <View style={styles.groupCheck}>
                  <CheckboxPDF
                    checked={
                      data.dataRender && data.dataRender[name3][0] === "1"
                        ? true
                        : false
                    }
                  />
                  <Text style={styles.textCheck}>間知</Text>
                </View>
                <View style={styles.groupCheck}>
                  <CheckboxPDF
                    checked={data.dataRender[name3][1] === "1" ? true : false}
                  />
                  <Text style={styles.textCheck}>RC</Text>
                </View>
                <View style={styles.groupCheck}>
                  <CheckboxPDF
                    checked={data.dataRender[name3][2] === "1" ? true : false}
                  />
                  <Text style={styles.textCheck}>CB</Text>
                </View>
                <View style={styles.groupCheck}>
                  <CheckboxPDF
                    checked={data.dataRender[name3][3] === "1" ? true : false}
                  />
                  <Text style={styles.textCheck}>石積・石垣</Text>
                </View>
                <View style={styles.groupCheck}>
                  <CheckboxPDF
                    checked={data.dataRender[name3][5] === "1" ? true : false}
                  />
                  <Text style={styles.textCheck}>
                    土留 その他（{val_name3}）
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol5}>
                <Text style={styles.textTd}>{val_name4}m</Text>
              </View>
            </View>
          );
        })}
    </View>
    <View style={styles.lineEnd} />
  </Page>
);
class PrintReportPage5 extends React.Component {
  render() {
    const { dataRender } = this.props;
    let dataRenderNew = cloneDeep(dataRender);
    dataRenderNew.e_type = dataRender.e_type
      ? dataRender.e_type.split(",")
      : ["0", "0", "0", "0", "0", ""];

    dataRenderNew.w_type = dataRender.w_type
      ? dataRender.w_type.split(",")
      : ["0", "0", "0", "0", "0", ""];
    dataRenderNew.s_type = dataRender.s_type
      ? dataRender.s_type.split(",")
      : ["0", "0", "0", "0", "0", ""];
    dataRenderNew.n_type = dataRender.n_type
      ? dataRender.n_type.split(",")
      : ["0", "0", "0", "0", "0", ""];
    return (
      <React.Fragment>
        <DocumentPrint dataRender={dataRenderNew} />
      </React.Fragment>
    );
  }
}

PrintReportPage5.propTypes = {
  dataRender: PropTypes.object
};
export default PrintReportPage5;
