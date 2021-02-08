import React from "react";
import { PropTypes } from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import { Page, Text, View, Font, StyleSheet } from "@react-pdf/renderer";
// component customer
import CheckboxPDF from "components/ReportSurveyPrint/CheckboxPDF.jsx";
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
  textTitleSub: {
    fontFamily: "mplusBold",
    width: "100%",
    whiteSpace: "nowrap",
    color: "#000000",
    marginTop: 15,
    fontSize: 13
  },
  textTitleSub2: {
    fontFamily: "mplusBold",
    width: "100%",
    whiteSpace: "nowrap",
    color: "#ffffff",
    backgroundColor: "#696969",
    marginTop: 5,
    marginBottom: 10,
    lineHeight: "100%",
    fontSize: 12,
    padding: "0 5pt"
  },
  colDt: {
    marginTop: 15,
    width: "100%"
  },
  colDd: {
    width: "96%",
    marginBottom: 5,
    marginLeft: "6%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  textDt: {
    color: "#1b6f2b",
    fontFamily: "mplusBold",
    lineHeight: "100%",
    fontSize: 11
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
    color: "#003366"
  }
});
const DocumentPrint = data => (
  <Page size="A4" style={styles.root}>
    <View style={styles.line} />
    <View style={styles.grMain}>
      <Text style={styles.textTitle}>敷地概要調査。目視調査結果</Text>
      <Text style={styles.textTitleSub}>她形地層調査チェックリスト</Text>
      <Text style={styles.textTitleSub2}>周辺状況</Text>
      {/* content */}
      {/* row 1 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>隣接地高低差</Text>
      </View>
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.survey_topography &&
              data.dataRender.survey_topography.indexOf("mountains") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>山地（頂上、中腹、据地）</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.survey_topography &&
              data.dataRender.survey_topography.indexOf("hills_plateaus") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>丘陵・台地</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.survey_topography &&
              data.dataRender.survey_topography.indexOf("lowland") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>低地</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.survey_topography &&
              data.dataRender.survey_topography.indexOf("sand_dunes") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>砂丘</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.survey_topography &&
              data.dataRender.survey_topography.indexOf("landfill") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>埋立地</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.survey_topography &&
              data.dataRender.survey_topography.indexOf(
                "artificial_terrain"
              ) !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>人工地形</Text>
        </View>
      </View>
      {/* row 2 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>河川・用水路</Text>
      </View>
      {[
        "rivers_and_irrigation_canals_0",
        "rivers_and_irrigation_canals_1",
        "rivers_and_irrigation_canals_2"
      ].map(item => {
        let valRiversIrrigationCanals_0 =
          data.dataRender && data.dataRender[item][0]
            ? data.dataRender[item][0]
            : "";
        let valRiversIrrigationCanals_1 =
          data.dataRender && data.dataRender[item][1]
            ? data.dataRender[item][1]
            : "";
        let valRiversIrrigationCanals_6 =
          data.dataRender && data.dataRender[item][6]
            ? data.dataRender[item][6]
            : "";
        return (
          <View style={styles.colDd} key={item}>
            <View style={styles.groupCheck}>
              <Text style={styles.textCheck}>
                調査地より {valRiversIrrigationCanals_0} の方向{" "}
                {valRiversIrrigationCanals_1} m 付近に
              </Text>
            </View>
            <View style={styles.groupCheck}>
              <CheckboxPDF
                checked={data.dataRender[item][2] === "1" ? true : false}
              />
              <Text style={styles.textCheck}>河川</Text>
            </View>
            <View style={styles.groupCheck}>
              <CheckboxPDF
                checked={data.dataRender[item][3] === "1" ? true : false}
              />
              <Text style={styles.textCheck}>小川</Text>
            </View>
            <View style={styles.groupCheck}>
              <CheckboxPDF
                checked={data.dataRender[item][4] === "1" ? true : false}
              />
              <Text style={styles.textCheck}>水路</Text>
            </View>
            <View style={styles.groupCheck}>
              <CheckboxPDF
                checked={data.dataRender[item][5] === "1" ? true : false}
              />
              <Text style={styles.textCheck}>その他</Text>
            </View>
            <View style={styles.groupCheck}>
              <Text style={styles.textCheck}>
                その他 {valRiversIrrigationCanals_6}
              </Text>
            </View>
          </View>
        );
      })}
      {/* row 3 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>周辺建物</Text>
      </View>
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.surrounding_buildings &&
              data.dataRender.surrounding_buildings.indexOf("many") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>多い</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.surrounding_buildings &&
              data.dataRender.surrounding_buildings.indexOf("few") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>少ない</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.surrounding_buildings &&
              data.dataRender.surrounding_buildings.indexOf("none") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>なし</Text>
        </View>
      </View>
      {/* row 4 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>異常・障害建築物の概要</Text>
      </View>
      {/* 4.1 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.overview_abnormal_0 &&
              data.dataRender.overview_abnormal_0.indexOf("wooden") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>木造</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.overview_abnormal_0 &&
              data.dataRender.overview_abnormal_0.indexOf("steel_frame") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>鉄骨</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.overview_abnormal_0 &&
              data.dataRender.overview_abnormal_0.indexOf("RC") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>RC</Text>
        </View>
      </View>
      {/* 4.2 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.overview_abnormal_1[0] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>1F</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.overview_abnormal_1[1] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>2F</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>
            {data.dataRender.overview_abnormal_1[2]} F
          </Text>
        </View>
      </View>
      {/* 4.3 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.overview_abnormal_2 &&
              data.dataRender.overview_abnormal_2.indexOf("detached_house") !==
                -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>戸建</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.overview_abnormal_2 &&
              data.dataRender.overview_abnormal_2.indexOf("housing_complex") !==
                -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>集合住宅</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.overview_abnormal_2 &&
              data.dataRender.overview_abnormal_2.indexOf("office_etc") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>事務所など</Text>
        </View>
      </View>
      {/* 4.4 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.overview_abnormal_3[0] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>建築中</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.overview_abnormal_3[1] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>5年以内</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.overview_abnormal_3[2] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>5〜10年程度</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.overview_abnormal_3[3] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>その他</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>
            {data.dataRender.overview_abnormal_3[4]}
          </Text>
        </View>
      </View>
      {/* 4.5 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>クラック</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.crack &&
              data.dataRender.crack.indexOf("big") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>大</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.crack &&
              data.dataRender.crack.indexOf("small") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>小</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.crack &&
              data.dataRender.crack.indexOf("many") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>多</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.crack &&
              data.dataRender.crack.indexOf("less") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>少</Text>
        </View>
      </View>
      {/* 4.6 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>たわみ</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.deflection &&
              data.dataRender.deflection.indexOf("big") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>大</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.deflection &&
              data.dataRender.deflection.indexOf("small") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>小</Text>
        </View>
      </View>
      {/* 4.7 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>傾斜</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.slope &&
              data.dataRender.slope.indexOf("big") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>大</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.slope &&
              data.dataRender.slope.indexOf("small") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>小</Text>
        </View>
      </View>
      {/* row 5 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>路面状況</Text>
      </View>
      {/* 5.1 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>舗装</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.pavement &&
              data.dataRender.pavement.indexOf("yes") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>あり</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.pavement &&
              data.dataRender.pavement.indexOf("none") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>なし</Text>
        </View>
      </View>
      {/* 5.2 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>異常</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.abnormal &&
              data.dataRender.abnormal.indexOf("yes") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>あり</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.abnormal &&
              data.dataRender.abnormal.indexOf("none") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>なし</Text>
        </View>
      </View>
      {/* row 6 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>隣接地</Text>
      </View>
      {/* 6.1 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[0] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>宅地</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[1] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>田</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[2] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>畑</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[3] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>駐車場</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[4] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>山</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[5] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>野原</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[6] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>雑木林</Text>
        </View>
      </View>
      {/* 6.2 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[7] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>池沼</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[8] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>水路</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.adjacent_land[9] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>その他</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>
            {data.dataRender.adjacent_land[10]}
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.lineEnd} />
  </Page>
);
class PrintReportPage6 extends React.Component {
  render() {
    const { dataRender } = this.props;
    let newData = cloneDeep(dataRender);
    newData.rivers_and_irrigation_canals_0 = !newData.rivers_and_irrigation_canals_0
      ? ["", "", 0, 0, 0, 0, ""]
      : newData.rivers_and_irrigation_canals_0.split(",");
    newData.rivers_and_irrigation_canals_1 = !newData.rivers_and_irrigation_canals_1
      ? ["", "", 0, 0, 0, 0, ""]
      : newData.rivers_and_irrigation_canals_1.split(",");
    newData.rivers_and_irrigation_canals_2 = !newData.rivers_and_irrigation_canals_2
      ? ["", "", 0, 0, 0, 0, ""]
      : newData.rivers_and_irrigation_canals_2.split(",");
    newData.overview_abnormal_1 = !newData.overview_abnormal_1
      ? [0, 0, ""]
      : newData.overview_abnormal_1.split(",");
    newData.overview_abnormal_3 = !newData.overview_abnormal_3
      ? [0, 0, 0, 0, ""]
      : newData.overview_abnormal_3.split(",");
    newData.adjacent_land = !newData.adjacent_land
      ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ""]
      : newData.adjacent_land.split(",");
    return (
      <React.Fragment>
        <DocumentPrint dataRender={newData} />
      </React.Fragment>
    );
  }
}

PrintReportPage6.propTypes = {
  dataRender: PropTypes.object
};
export default PrintReportPage6;
