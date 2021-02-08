import React from "react";
import withRoot from "withRoot";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { PropTypes } from "prop-types";
import axios from "axios";
// constant
import { apiRoot } from "constant/index.js";
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
import bgTd from "assets/img/bg-td.png";
import bgTd2 from "assets/img/bg-td2.png";

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
    boxSizing: "border-box",
    marginTop: 30
  },
  root: {
    // height: "100%",
    border: "1px solid gray",
    position: "relative",
    marginBottom: 80,
    padding: "20pt 5pt",
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
    width: "99%",
    backgroundColor: "#213858",
    display: "block",
    position: "absolute",
    bottom: 20,
    left: 15
  },
  grMain: {
    color: "#213858",
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
  tableRow: {
    marginBottom: 10,
    boxSizing: "border-box",
    flexDirection: "row"
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
  tableMain: {
    display: "table",
    width: "100%",
    marginTop: 5,
    borderStyle: BORDER_STYLE,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: BORDER_COLOR
  },
  rowHead1: {
    flexDirection: "row",
    width: "100%",
    boxSizing: "border-box",
    verticalAlign: "inherit",
    margin: "auto"
  },
  colHead11: {
    width: "8%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt"
  },
  colHead12: {
    width: "37%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt"
  },
  colHead13: {
    width: "11%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt"
  },
  colHead14: {
    width: "44%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt"
  },
  rowHead2: {
    flexDirection: "row",
    width: "100%",
    boxSizing: "border-box",
    verticalAlign: "inherit",
    margin: "auto",
    backgroundColor: "#D9E6EE"
  },
  colHead22: {
    width: "10%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt"
  },
  colHead23: {
    width: "13%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt"
  },
  colHead24: {
    width: "14%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt"
  },
  rowHead3: {
    flexDirection: "row",
    width: "100%",
    boxSizing: "border-box",
    verticalAlign: "inherit",
    margin: "auto",
    backgroundColor: "#D9E6EE",
    borderStyle: BORDER_STYLE,
    borderBottomWidth: 1,
    borderColor: "#000"
  },
  colHead32: {
    width: "92%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 2pt"
  },
  rowHead4: {
    flexDirection: "row",
    width: "100%",
    boxSizing: "border-box",
    verticalAlign: "inherit",
    margin: "auto",
    borderStyle: BORDER_STYLE,
    borderBottomWidth: 1,
    borderColor: "#000"
  },
  colHead41: {
    width: "4%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 1pt"
  },
  colHead42: {
    width: "5%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: "0pt 1pt"
  },
  colHead43: {
    width: "22%",
    height: 40,
    position: "relative",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR
  },
  colHead431: {
    width: "100%",
    height: "50%",
    boxSizing: "border-box",
    verticalAlign: "inherit",
    paddingTop: 4,
    borderStyle: BORDER_STYLE,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center"
  },
  colHead432: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    boxSizing: "border-box",
    verticalAlign: "inherit",
    textAlign: "center"
  },
  colHead4311: {
    width: "33.33%",
    textAlign: "center",
    display: "block",
    paddingTop: 4,
    verticalAlign: "inherit",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderColor: BORDER_COLOR
  },
  colHead4312: {
    paddingTop: 4,
    width: "33.33%",
    textAlign: "center"
  },
  colHead44: {
    width: "4%",
    textAlign: "center",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR
  },
  colHead45: {
    width: "7%",
    textAlign: "center",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    position: "relative",
    borderColor: BORDER_COLOR
  },
  colHead46: {
    width: "9%",
    textAlign: "center",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    position: "relative",
    paddingBottom: 10,
    borderColor: BORDER_COLOR
  },
  colHead47: {
    width: "4%",
    textAlign: "center",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    position: "relative",
    borderColor: BORDER_COLOR
  },
  colHead48: {
    width: "31%",
    textAlign: "center",
    verticalAlign: "bottom",
    display: "block",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    position: "relative",
    borderColor: BORDER_COLOR
  },
  rowHeadLoop: {
    flexDirection: "row",
    width: "100%",
    height: 14,
    boxSizing: "border-box",
    margin: "auto"
  },
  rowHeadLoopBorder: {
    flexDirection: "row",
    width: "100%",
    height: 14,
    boxSizing: "border-box",
    borderStyle: BORDER_STYLE,
    borderBottomWidth: 1,
    borderColor: "#000000",
    margin: "auto"
  },
  colHeadLoop3: {
    width: "22%",
    position: "relative",
    flexDirection: "row",
    boxSizing: "border-box",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR
  },
  colHeadLoop31: {
    width: "33.33%",
    textAlign: "center",
    verticalAlign: "bottom",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderColor: BORDER_COLOR
  },
  colHeadLoop32: {
    width: "33.33%",
    textAlign: "center"
  },
  colHeadLoop33: {
    width: "4%",
    textAlign: "center",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR
  },
  imgBgTd1: {
    width: "100%",
    height: "100%"
  },
  imgBgTd2: {
    width: "100%",
    height: "100%"
  },
  colHeadLoop34: {
    width: "7%",
    textAlign: "center",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR
  },
  colHeadLoop35: {
    width: "9%",
    textAlign: "center",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR
  },
  textHeadTable: {
    fontFamily: "mplusThin",
    whiteSpace: "nowrap",
    color: "#000000",
    fontSize: 9
  },
  textHeadMini: {
    textAlign: "center",
    fontFamily: "mplusThin",
    color: "#000000",
    fontSize: 7
  },
  textHeadMini1: {
    textAlign: "center",
    fontFamily: "mplusThin",
    color: "#000000",
    paddingTop: 3,
    display: "flex",
    fontSize: 7
  },
  textHeadMiniSub: {
    position: "absolute",
    bottom: 2,
    left: 0,
    width: "100%",
    display: "block",
    textAlign: "center",
    fontFamily: "mplusThin",
    color: "#000000",
    fontSize: 4
  }
});
const arrayRenderData = [
  "0.25",
  "0.50",
  "0.75",
  "1.00",
  "1.25",
  "1.50",
  "1.75",
  "2.00",
  "2.25",
  "2.50",
  "2.75",
  "3.00",
  "3.25",
  "3.50",
  "3.75",
  "4.00",
  "4.25",
  "4.50",
  "4.75",
  "5.00",
  "5.25",
  "5.50",
  "5.75",
  "6.00",
  "6.25",
  "6.50",
  "6.75",
  "7.00",
  "7.25",
  "7.50",
  "7.75",
  "8.00",
  "8.25",
  "8.50",
  "8.75",
  "9.00",
  "9.25",
  "9.50",
  "9.75",
  "10.00"
];
const DocumentPrintLoadding = data => (
  <Page size="A4" style={styles.root}>
    <Text style={styles.txtLoadding}>{data.message}</Text>
  </Page>
);
const DocumentPrint = data => (
  <Page size="A4" style={styles.root}>
    <View style={styles.line} />
    <View style={styles.grMain}>
      <Text style={styles.textTitle}>スウェーデン式サウンディング試験</Text>
      {/* table */}
      <View style={styles.tableMain}>
        <View style={styles.rowHead1}>
          <View style={styles.colHead11}>
            <Text style={styles.textHeadTable}>調査名</Text>
          </View>
          <View style={styles.colHead12}>
            <Text style={styles.textHeadTable}>
              {data.dataRender && data.dataRender.survey_name}
            </Text>
          </View>
          <View style={styles.colHead13}>
            <Text style={styles.textHeadTable}>測点番号</Text>
          </View>
          <View style={styles.colHead14}>
            <Text style={styles.textHeadTable}>
              {data.dataRender && data.dataRender.station_number}
            </Text>
          </View>
        </View>
        <View style={styles.rowHead1}>
          <View style={styles.colHead11}>
            <Text style={styles.textHeadTable}>調査場所</Text>
          </View>
          <View style={styles.colHead12}>
            <Text style={styles.textHeadTable}>
              {data.dataRender && data.dataRender.survey_location}
            </Text>
          </View>
          <View style={styles.colHead13}>
            <Text style={styles.textHeadTable}>調査年月日</Text>
          </View>
          <View style={styles.colHead14}>
            <Text style={styles.textHeadTable}>
              {data.dataRender && data.dataRender.survey_date}
            </Text>
          </View>
        </View>
        <View style={styles.rowHead1}>
          <View style={styles.colHead11}>
            <Text style={styles.textHeadTable}>孔口標高 </Text>
          </View>
          <View style={styles.colHead12}>
            <Text style={styles.textHeadTable}>
              {data.dataRender && data.dataRender.hole_mouth_elevation}
            </Text>
          </View>
          <View style={styles.colHead13}>
            <Text style={styles.textHeadTable}>最終貫入深さ </Text>
          </View>
          <View style={styles.colHead14}>
            <Text style={styles.textHeadTable}>
              {data.dataRender && data.dataRender.final_penetration_depth}
            </Text>
          </View>
        </View>
        <View style={styles.rowHead2}>
          <View style={styles.colHead11}>
            <Text style={styles.textHeadTable}>孔内水位</Text>
          </View>
          <View style={styles.colHead22}>
            <Text style={styles.textHeadTable}>不明</Text>
          </View>
          <View style={styles.colHead23}>
            <Text style={styles.textHeadTable}>天候</Text>
          </View>
          <View style={styles.colHead24}>
            <Text style={styles.textHeadTable}>曇り</Text>
          </View>
          <View style={styles.colHead13}>
            <Text style={styles.textHeadTable}>試験者</Text>
          </View>
          <View style={styles.colHead14}>
            <Text style={styles.textHeadTable}>
              {data.dataRender && data.dataRender.tester}
            </Text>
          </View>
        </View>
        <View style={styles.rowHead3}>
          <View style={styles.colHead11}>
            <Text style={styles.textHeadTable}>備 考</Text>
          </View>
          <View style={styles.colHead32}>
            <Text style={styles.textHeadTable}>
              {data.dataRender && data.dataRender.remarks}
            </Text>
          </View>
        </View>
        <View style={styles.rowHead4}>
          <View style={styles.colHead41}>
            <Text style={styles.textHeadMini}>荷重</Text>
            <Text style={styles.textHeadMini}>Wsw</Text>
            <Text style={styles.textHeadMini}>(kN)</Text>
          </View>
          <View style={styles.colHead41}>
            <Text style={styles.textHeadMini}>半回 転数</Text>
            <Text style={styles.textHeadMini}>(Na)</Text>
          </View>
          <View style={styles.colHead42}>
            <Text style={styles.textHeadMini}>貫入深さ</Text>
            <Text style={styles.textHeadMini}>D</Text>
            <Text style={styles.textHeadMini}>(m)</Text>
          </View>
          <View style={styles.colHead42}>
            <Text style={styles.textHeadMini}>貫入量</Text>
            <Text style={styles.textHeadMini}>L</Text>
            <Text style={styles.textHeadMini}>(cm)</Text>
          </View>
          <View style={styles.colHead42}>
            <Text style={styles.textHeadMini}>1m 当りの 半回転数</Text>
            <Text style={styles.textHeadMini}>Nsw</Text>
          </View>
          <View style={styles.colHead43}>
            <View style={styles.colHead431}>
              <Text style={styles.textHeadMini}>記 事</Text>
            </View>
            <View style={styles.colHead432}>
              <View style={styles.colHead4311}>
                <Text style={styles.textHeadMini}>音感・感触</Text>
              </View>
              <View style={styles.colHead4311}>
                <Text style={styles.textHeadMini}>貫入状況</Text>
              </View>
              <View style={styles.colHead4312}>
                <Text style={styles.textHeadMini}>土質名</Text>
              </View>
            </View>
          </View>
          <View style={styles.colHead44}>
            <Text style={styles.textHeadMini}>推定 柱状図</Text>
          </View>
          <View style={styles.colHead45}>
            <Text style={styles.textHeadMini}>荷重</Text>
            <Text style={styles.textHeadMini}>Wsw(kN)</Text>
            <Text style={styles.textHeadMiniSub}>0 0.25 0.50 0.75 1.00</Text>
          </View>
          <View style={styles.colHead46}>
            <Text style={styles.textHeadMini}>貫入量 1m 当りの 半回転数</Text>
            <Text style={styles.textHeadMini}>Nsw</Text>
            <Text style={styles.textHeadMiniSub}>50 100 150 200 250</Text>
          </View>
          <View style={styles.colHead47}>
            <Text style={styles.textHeadMini}>換算</Text>
            <Text style={styles.textHeadMini}>N 値</Text>
          </View>
          <View style={styles.colHead48}>
            <Text style={styles.textHeadMini}>許容 支持力</Text>
            <Text style={styles.textHeadMini}>qa</Text>
            <Text style={styles.textHeadMini}>kN/㎡</Text>
          </View>
        </View>
        {arrayRenderData.map((item, i) => {
          let classRow =
            (i + 1) % 4 === 0 ? styles.rowHeadLoopBorder : styles.rowHeadLoop;

          let wsw =
            data.dataRender && data.dataRender[`${item}`]
              ? data.dataRender[`${item}`].wsw
              : "";
          let nws =
            data.dataRender && data.dataRender[`${item}`]
              ? data.dataRender[`${item}`].nws
              : "";
          let half_revolution =
            data.dataRender && data.dataRender[`${item}`]
              ? data.dataRender[`${item}`].half_revolution
              : "";
          let penetration_amount =
            data.dataRender && data.dataRender[`${item}`]
              ? data.dataRender[`${item}`].penetration_amount
              : "";
          let sound_and_feel =
            data.dataRender && data.dataRender[`${item}`]
              ? data.dataRender[`${item}`].sound_and_feel
              : "";

          let intrusion_status =
            data.dataRender && data.dataRender[`${item}`]
              ? data.dataRender[`${item}`].intrusion_status
              : "";
          let soil_name =
            data.dataRender && data.dataRender[`${item}`]
              ? data.dataRender[`${item}`].soil_name
              : "";
          let conversion_N_value =
            data.dataRender && data.dataRender[`${item}`]
              ? data.dataRender[`${item}`].conversion_N_value
              : "";
          let allowable_bearing_capacity =
            data.dataRender && data.dataRender[`${item}`]
              ? data.dataRender[`${item}`].allowable_bearing_capacity
              : "";
          return (
            <View style={classRow} key={item}>
              <View style={styles.colHead41}>
                <Text style={styles.textHeadMini1}>{wsw}</Text>
              </View>
              <View style={styles.colHead41}>
                <Text style={styles.textHeadMini1}>{half_revolution}</Text>
              </View>
              <View style={styles.colHead42}>
                <Text style={styles.textHeadMini1}>{item}</Text>
              </View>
              <View style={styles.colHead42}>
                <Text style={styles.textHeadMini1}>{penetration_amount}</Text>
              </View>
              <View style={styles.colHead42}>
                <Text style={styles.textHeadMini1}>{nws}</Text>
              </View>
              <View style={styles.colHeadLoop3}>
                <View style={styles.colHeadLoop31}>
                  <Text style={styles.textHeadMini1}>{sound_and_feel}</Text>
                </View>
                <View style={styles.colHeadLoop31}>
                  <Text style={styles.textHeadMini1}>{intrusion_status}</Text>
                </View>
                <View style={styles.colHeadLoop32}>
                  <Text style={styles.textHeadMini1}>{soil_name}</Text>
                </View>
              </View>
              <View style={styles.colHeadLoop33}>
                <Image src={bgTd} style={styles.imgBgTd1} />
              </View>
              <View style={styles.colHeadLoop34}>
                <Image src={bgTd2} style={styles.imgBgTd2} />
              </View>
              <View style={styles.colHeadLoop35}>
                <Image
                  src={bgTd2}
                  style={{
                    height: "100%",
                    minWidth: 2,
                    width: `${Math.floor(Math.random() * 100)}%`
                  }}
                />
              </View>
              <View style={styles.colHead47}>
                <Text style={styles.textHeadMini1}>{conversion_N_value}</Text>
              </View>
              <View style={styles.colHead48}>
                <Text style={styles.textHeadMini1}>
                  {allowable_bearing_capacity}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
    <View style={styles.lineEnd} />
  </Page>
);
class PrintReportPage8To17 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRender: [] // -1: api faild, -2 : No không tồn tại By surveyId
    };
  }

  componentDidMount = () => {
    const { surveyId, no } = this.props;
    if (surveyId && no) {
      this.getSurveyInfoBySurveyIdAndNo(surveyId, no);
    }
  };

  // get survey info by id
  getSurveyInfoBySurveyIdAndNo = async (id, no) => {
    try {
      const res = await axios.get(
        `${apiRoot}/groundsurveyreport8to12/${id}?no=${no}`
      );
      // error
      if (res.status !== 200) {
        this.setState({
          dataRender: -1
        });
        return;
      }
      // success
      // nếu không tồn tại ssurveyInfo theo surveyID này

      // console.log(res.data);
      if (res.data === false) {
        this.setState({
          dataRender: -2
        });
        return;
      }
      let data = res.data;
      this.setState({
        dataRender: data
      });
    } catch (error) {
      this.setState({
        dataRender: -1
      });
      return;
    }
  };
  render() {
    const { dataRender } = this.state;
    if (dataRender === -2) {
      return (
        <DocumentPrintLoadding message={"スウェーデン式サウンディング試験"} />
      );
    }
    if (!dataRender || dataRender === -1) {
      return <DocumentPrintLoadding message={"Oops, something went wrong!"} />;
    }
    return <DocumentPrint dataRender={dataRender} />;
  }
}

PrintReportPage8To17.propTypes = {
  surveyId: PropTypes.string,
  no: PropTypes.string
};
export default PrintReportPage8To17;
