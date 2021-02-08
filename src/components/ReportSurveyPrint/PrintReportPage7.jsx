import React from "react";
import cloneDeep from "lodash/cloneDeep";
import { PropTypes } from "prop-types";
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
    border: "1pt solid gray",
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
    padding: "0 5%",
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
    marginTop: 5,
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
    marginTop: 3,
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
        <Text style={styles.textDt}>造成状況</Text>
      </View>
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.creation_status[0] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>新しい</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.creation_status[1] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>古い</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.creation_status[2] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>不明</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.creation_status[3] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>切土</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.creation_status[4] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>盛土</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.creation_status[5] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>切盛土</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.creation_status[6] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>盛土の厚さ</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>
            {data.dataRender.creation_status[7]} m
          </Text>
        </View>
      </View>
      {/* row 2 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>地表面</Text>
      </View>
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.ground_surface[0] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>平坦</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.ground_surface[1] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>起伏</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.ground_surface[2] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>傾斜地</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.ground_surface[3] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>雑草</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.ground_surface[4] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>土間コン</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.ground_surface[5] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>アスファルト</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.ground_surface[6] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>その他</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>
            {data.dataRender.ground_surface[7]}
          </Text>
        </View>
      </View>
      {/* row 3 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>土質</Text>
      </View>
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.soil_quality &&
              data.dataRender.soil_quality.indexOf("gravel") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>礫</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.soil_quality &&
              data.dataRender.soil_quality.indexOf("gravel_soil") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>礫質土</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.soil_quality &&
              data.dataRender.soil_quality.indexOf("sand") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>砂</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.soil_quality &&
              data.dataRender.soil_quality.indexOf("sand_soil") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>砂質土</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.soil_quality &&
              data.dataRender.soil_quality.indexOf("clay_soil") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>粘性土</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.soil_quality &&
              data.dataRender.soil_quality.indexOf("organic_soil") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>有機質土</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.soil_quality &&
              data.dataRender.soil_quality.indexOf("black_me") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>黒ボク</Text>
        </View>
      </View>
      {/* row 4 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>含水状況</Text>
      </View>
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.moisture_content &&
              data.dataRender.moisture_content.indexOf("yes") !== -1
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
              data.dataRender.moisture_content &&
              data.dataRender.moisture_content.indexOf("none") !== -1
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
              data.dataRender.moisture_content &&
              data.dataRender.moisture_content.indexOf("unknown") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>不明</Text>
        </View>
      </View>
      {/* row 5 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>地下埋設物</Text>
      </View>
      {/* 5.1 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.underground_objects[0] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>あり</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.underground_objects[1] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>なし</Text>
        </View>
      </View>
      {/* 5.2 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.underground_objects[2] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>井戸</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.underground_objects[3] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>地下構造物</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.underground_objects[4] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>岩砕など</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.underground_objects[5] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>その他</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>
            {data.dataRender.underground_objects[6]}
          </Text>
        </View>
      </View>
      {/* row 6 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>現在の状況</Text>
      </View>
      {/* 6.1 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[0] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>既存あり</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[1] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>造成更地</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[2] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>建物解体跡地</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[3] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>古くからの住宅地</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[4] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>野原</Text>
        </View>
      </View>
      {/* 6.2 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[5] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>田</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[6] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>畑</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[7] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>資材置き場</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[8] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>駐車場</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.current_situation[9] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>その他</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>
            {data.dataRender.current_situation[10]}
          </Text>
        </View>
      </View>
      {/* row 7 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>既存建物</Text>
      </View>
      {/* 7.1 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.existing_building0 &&
              data.dataRender.existing_building0.indexOf("wooden") !== -1
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
              data.dataRender.existing_building0 &&
              data.dataRender.existing_building0.indexOf("steel_frame") !== -1
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
              data.dataRender.existing_building0 &&
              data.dataRender.existing_building0.indexOf("RC") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>RC</Text>
        </View>
      </View>
      {/* 7.2 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.existing_building1[0] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>1F</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.existing_building1[1] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>2F その他</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>
            {data.dataRender.existing_building1[2]} F
          </Text>
        </View>
      </View>
      {/* 7.3 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.existing_building2 &&
              data.dataRender.existing_building2.indexOf("detached_house") !== -1
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
              data.dataRender.existing_building2 &&
              data.dataRender.existing_building2.indexOf("housing_complex") !==
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
              data.dataRenderexisting_building2 &&
              data.dataRenderexisting_building2.indexOf("office_etc") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>事務所など</Text>
        </View>
      </View>
      {/* 7.4 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.existing_building3[0] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>建築中</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.existing_building3[1] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>5年以内</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.existing_building3[2] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>5〜10年程度</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender.existing_building3[3] === "1" ? true : false
            }
          />
          <Text style={styles.textCheck}>その他</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>
            {data.dataRender.existing_building3[4]}
          </Text>
        </View>
      </View>
      {/* 7.5 */}
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
      {/* 7.6 */}
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
      {/* 7.7 */}
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
      {/* row 8 */}
      <View style={styles.colDt}>
        <Text style={styles.textDt}>車両搬入</Text>
      </View>
      {/* 8.1 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>大型車</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.carry_in0 &&
              data.dataRender.carry_in0.indexOf("8t") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>8t</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.carry_in0 &&
              data.dataRender.carry_in0.indexOf("4t") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>4t</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.carry_in0 &&
              data.dataRender.carry_in0.indexOf("Ng") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>ング</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.carry_in0 &&
              data.dataRender.carry_in0.indexOf("4t_short") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>4tショート</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.carry_in0 &&
              data.dataRender.carry_in0.indexOf("3t") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>3t</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.carry_in0 &&
              data.dataRender.carry_in0.indexOf("2t") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>2t</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={
              data.dataRender &&
              data.dataRender.carry_in0 &&
              data.dataRender.carry_in0.indexOf("impossible") !== -1
                ? true
                : false
            }
          />
          <Text style={styles.textCheck}>不可</Text>
        </View>
      </View>
      {/* 8.2 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>進入路</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>{data.dataRender.carry_in1} m</Text>
        </View>
      </View>
      {/* 8.3 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>前面道路</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>{data.dataRender.carry_in2} m</Text>
        </View>
      </View>
      {/* 8.4 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>側溝</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>{data.dataRender.carry_in3} m</Text>
        </View>
      </View>
      {/* 8.5 */}
      <View style={styles.colDd}>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.carry_in4[0] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>段差</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.carry_in4[1] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>擁壁</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.carry_in4[2] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>急スロープ</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.carry_in4[3] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>電線</Text>
        </View>
        <View style={styles.groupCheck}>
          <CheckboxPDF
            checked={data.dataRender.carry_in4[4] === "1" ? true : false}
          />
          <Text style={styles.textCheck}>その他</Text>
        </View>
        <View style={styles.groupCheck}>
          <Text style={styles.textCheck}>{data.dataRender.carry_in4[5]}</Text>
        </View>
      </View>
    </View>
    <View style={styles.lineEnd} />
  </Page>
);
class PrintReportPage7 extends React.Component {
  render() {
    const { dataRender } = this.props;
    let newData = cloneDeep(dataRender);
    newData.creation_status = !newData.creation_status
      ? [0, 0, 0, 0, 0, 0, 0, ""]
      : newData.creation_status.split(",");

    newData.ground_surface = !newData.ground_surface
      ? [0, 0, 0, 0, 0, 0, 0, ""]
      : newData.ground_surface.split(",");

    newData.underground_objects = !newData.underground_objects
      ? [0, 0, 0, 0, 0, 0, ""]
      : newData.underground_objects.split(",");

    newData.current_situation = !newData.current_situation
      ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ""]
      : newData.current_situation.split(",");

    newData.existing_building1 = !newData.existing_building1
      ? [0, 0, ""]
      : newData.existing_building1.split(",");

    newData.existing_building3 = !newData.existing_building3
      ? [0, 0, 0, 0, ""]
      : newData.existing_building3.split(",");

    newData.carry_in4 = !newData.carry_in4
      ? [0, 0, 0, 0, 0, ""]
      : newData.carry_in4.split(",");
    return (
      <React.Fragment>
        <DocumentPrint dataRender={newData} />
      </React.Fragment>
    );
  }
}

PrintReportPage7.propTypes = {
  dataRender: PropTypes.object
};
export default PrintReportPage7;
