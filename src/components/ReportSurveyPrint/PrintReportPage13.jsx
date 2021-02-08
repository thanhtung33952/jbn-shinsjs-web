import React from "react";
import { PropTypes } from "prop-types";

// import { leafletImage } from "leaflet-image";
import { Page, Text, View, Font, Image, StyleSheet } from "@react-pdf/renderer";
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
  textTitleContent: {
    fontSize: 12,
    textAlign: "left",
    fontFamily: "mplusBold",
    color: "#000000",
    margin: "auto",
    marginBottom: 5,
    width: "90%",
    height: 20,
    display: "block",
    borderBottomStyle: BORDER_STYLE,
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
  itemLoop: {
    width: 130,
    marginLeft: 5,
    marginRight: 5,
    height: "auto"
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
  headTopTable: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    boxSizing: "border-box",
    borderStyle: BORDER_STYLE,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR
  },
  textHeadeTop: {
    fontFamily: "mplusThin",
    color: "#000000",
    fontSize: 8,
    width: "50%"
  },
  rowHead1: {
    flexDirection: "row",
    width: "100%",
    boxSizing: "border-box",
    verticalAlign: "inherit",
    margin: "auto"
  },
  colHead11: {
    width: "15%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: 2
  },
  colHead12: {
    width: "17%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: 2
  },
  colHead13: {
    width: "68%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    padding: 2
  },
  textHeadTable: {
    fontFamily: "mplusThin",
    whiteSpace: "nowrap",
    color: "#000000",
    letterSpacing: 2,
    fontSize: 8
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
  },
  rowItemLoop: {
    flexDirection: "row",
    width: "100%",
    height: 10,
    boxSizing: "border-box",
    verticalAlign: "inherit",
    margin: "auto"
  },
  colLoop1: {
    width: "15%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center",
    position: "relative"
  },
  colLoop2: {
    width: "17%",
    height: "100%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center"
  },
  colLoop3: {
    width: "68%",
    height: "100%",
    borderStyle: BORDER_STYLE,
    borderRightWidth: 1,
    borderColor: BORDER_COLOR,
    textAlign: "center"
  },
  imgBgTd2: {
    width: "97%",
    height: "100%"
  },
  gach1phan4: {
    position: "absolute",
    width: "20%",
    height: 1,
    backgroundColor: "#222",
    left: 0,
    bottom: -1
  },
  numberItem: {
    position: "absolute",
    bottom: -5,
    left: 0,
    width: "88%",
    textAlign: "right",
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: -1
  },
  gach1phan2: {
    position: "absolute",
    width: "48%",
    height: 1,
    backgroundColor: "#222",
    bottom: -1,
    left: 0
  },
  hr1: {
    position: "absolute",
    height: "100%",
    width: 1,
    border: "none",
    bottom: -5,
    left: "25%",
    borderStyle: "dashed",
    borderLeftWidth: 1,
    borderColor: BORDER_COLOR,
    zIndex: 99
  },
  hr2: {
    position: "absolute",
    height: "100%",
    width: 1,
    border: "none",
    bottom: -5,
    left: "50%",
    borderStyle: "dashed",
    borderLeftWidth: 1,
    borderColor: BORDER_COLOR,
    zIndex: 99
  },
  hr3: {
    position: "absolute",
    height: "100%",
    width: 1,
    border: "none",
    bottom: -5,
    left: "75%",
    borderStyle: "dashed",
    borderLeftWidth: 1,
    borderColor: BORDER_COLOR,
    zIndex: 99
  },
  contentMain: {
    // height: 760px;
    display: "flex",
    position: "absolute",
    transform: "rotate(-90deg)",
    flexDirection: "colum",
    top: 410,
    right: 200,
    width: 659,
    height: "100%"
  },
  contentItem: {
    width: "100%",
    flexDirection: "row",
    display: "flex"
  },
  txtLoadding: {
    textAlign: "center",
    fontFamily: "mplusThin",
    color: "#000000",
    paddingTop: "40%",
    display: "flex",
    fontSize: 13
  }
});
const arrayRenderTable = [
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
  // "10.25",
  // "10.50",
  // "10.75",
  // "11.00",
  // "11.25",
  // "11.50",
  // "11.75",
  // "12.00",
  // "12.25",
  // "12.50",
  // "12.75",
  // "13.00",
  // "13.25",
  // "13.50",
  // "13.75",
  // "14.00",
  // "14.25",
  // "14.50",
  // "14.75",
  // "15.00",
  // "15.25",
  // "15.50",
  // "15.75",
  // "16.00",
  // "16.25",
  // "16.50",
  // "16.75",
  // "17.00"
];

// const DocumentPrintLoadding = () => (
//   <Page size="A4" style={styles.root}>
//     <Text style={styles.txtLoadding}>Loadding...</Text>
//   </Page>
// );
const DocumentPrint = data => (
  <Page size="A4" style={styles.root}>
    <View style={styles.line} />
    <View style={styles.grMain}>
      <Text style={styles.textTitle}>スウェーデン式サウンディング試験</Text>
      {/* content */}
      <View style={styles.contentMain}>
        <View style={styles.titleDiv}>
          <Text style={styles.textTitleContent}>
            調査件名：小林　裕二　様邸
          </Text>
        </View>
        {/* {console.log(data.dataRender)} */}
        {data.dataRender.length > 0 ? (
          <View style={styles.contentItem}>
            {/* tb1 */}
            {data.dataRender[0] && (
              <View style={styles.itemLoop}>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>測点位置</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[0].measurement_point_no}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>最終貫入深さ</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[0].final_penetration_depth}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>孔口標高</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[0].hole_mouth_elevation}
                  </Text>
                </View>
                <View style={styles.tableMain}>
                  <View style={styles.rowHead1}>
                    <View style={styles.colHead11}>
                      <Text style={styles.textHeadTable}>縮</Text>
                      <Text style={styles.textHeadTable}>尺</Text>
                      <Text style={styles.textHeadTable}>ｍ</Text>
                    </View>
                    <View style={styles.colHead12}>
                      <Text style={styles.textHeadTable}>推定</Text>
                      <Text style={styles.textHeadTable}>柱状図</Text>
                    </View>
                    <View style={styles.colHead13}>
                      <Text style={styles.textHeadTable}>1m当りの半回転数</Text>
                      <Text style={styles.textHeadTable}>Nsw</Text>
                      <Text style={styles.textHeadTable}>
                        50 100 150 200 250
                      </Text>
                    </View>
                  </View>
                  {/* loop row */}
                  {arrayRenderTable.map(item => {
                    let wNsw1 = data.dataRender[0][item]
                      ? parseInt(data.dataRender[0][item].nsw)
                      : 0;
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <View style={styles.rowItemLoop} key={item}>
                        <View style={styles.colLoop1}>
                          {item % 0.5 === 0 && item % 1 !== 0 ? (
                            <View style={styles.gach1phan4}></View>
                          ) : (
                            <Text></Text>
                          )}
                          {item % 1 === 0 ? (
                            <React.Fragment>
                              <Text style={styles.numberItem}>
                                {parseInt(item)}
                              </Text>
                              <View style={styles.gach1phan2}></View>
                            </React.Fragment>
                          ) : (
                            <Text></Text>
                          )}
                        </View>
                        <View style={styles.colLoop2}>
                          <Image src={bgTd} style={styles.imgBgTd2} />
                        </View>
                        <View style={styles.colLoop3}>
                          <Image
                            src={bgTd2}
                            style={{
                              height: "100%",
                              minWidth: 2,
                              width: `${wNsw1}%`
                            }}
                          />
                          <View style={styles.hr1} />
                          <View style={styles.hr2} />
                          <View style={styles.hr3} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {data.dataRender[1] && (
              <View style={styles.itemLoop}>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>測点位置</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[1].measurement_point_no}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>最終貫入深さ</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[1].final_penetration_depth}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>孔口標高</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[1].hole_mouth_elevation}
                  </Text>
                </View>
                <View style={styles.tableMain}>
                  <View style={styles.rowHead1}>
                    <View style={styles.colHead11}>
                      <Text style={styles.textHeadTable}>縮</Text>
                      <Text style={styles.textHeadTable}>尺</Text>
                      <Text style={styles.textHeadTable}>ｍ</Text>
                    </View>
                    <View style={styles.colHead12}>
                      <Text style={styles.textHeadTable}>推定</Text>
                      <Text style={styles.textHeadTable}>柱状図</Text>
                    </View>
                    <View style={styles.colHead13}>
                      <Text style={styles.textHeadTable}>1m当りの半回転数</Text>
                      <Text style={styles.textHeadTable}>Nsw</Text>
                      <Text style={styles.textHeadTable}>
                        50 100 150 200 250
                      </Text>
                    </View>
                  </View>
                  {/* loop row */}
                  {arrayRenderTable.map(item => {
                    let wNsw2 = data.dataRender[1][item]
                      ? parseInt(data.dataRender[1][item].nsw)
                      : 0;
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <View style={styles.rowItemLoop} key={item}>
                        <View style={styles.colLoop1}>
                          {item % 0.5 === 0 && item % 1 !== 0 ? (
                            <View style={styles.gach1phan4}></View>
                          ) : (
                            <Text></Text>
                          )}
                          {item % 1 === 0 ? (
                            <React.Fragment>
                              <Text style={styles.numberItem}>
                                {parseInt(item)}
                              </Text>
                              <View style={styles.gach1phan2}></View>
                            </React.Fragment>
                          ) : (
                            <Text></Text>
                          )}
                        </View>
                        <View style={styles.colLoop2}>
                          <Image src={bgTd} style={styles.imgBgTd2} />
                        </View>
                        <View style={styles.colLoop3}>
                          <Image
                            src={bgTd2}
                            style={{
                              height: "100%",
                              minWidth: 2,
                              width: `${wNsw2}%`
                            }}
                          />
                          <View style={styles.hr1} />
                          <View style={styles.hr2} />
                          <View style={styles.hr3} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {data.dataRender[2] && (
              <View style={styles.itemLoop}>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>測点位置</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[2].measurement_point_no}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>最終貫入深さ</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[2].final_penetration_depth}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>孔口標高</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[2].hole_mouth_elevation}
                  </Text>
                </View>
                <View style={styles.tableMain}>
                  <View style={styles.rowHead1}>
                    <View style={styles.colHead11}>
                      <Text style={styles.textHeadTable}>縮</Text>
                      <Text style={styles.textHeadTable}>尺</Text>
                      <Text style={styles.textHeadTable}>ｍ</Text>
                    </View>
                    <View style={styles.colHead12}>
                      <Text style={styles.textHeadTable}>推定</Text>
                      <Text style={styles.textHeadTable}>柱状図</Text>
                    </View>
                    <View style={styles.colHead13}>
                      <Text style={styles.textHeadTable}>1m当りの半回転数</Text>
                      <Text style={styles.textHeadTable}>Nsw</Text>
                      <Text style={styles.textHeadTable}>
                        50 100 150 200 250
                      </Text>
                    </View>
                  </View>
                  {/* loop row */}
                  {arrayRenderTable.map(item => {
                    let wNsw3 = data.dataRender[2][item]
                      ? parseInt(data.dataRender[2][item].nsw)
                      : 0;
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <View style={styles.rowItemLoop} key={item}>
                        <View style={styles.colLoop1}>
                          {item % 0.5 === 0 && item % 1 !== 0 ? (
                            <View style={styles.gach1phan4}></View>
                          ) : (
                            <Text></Text>
                          )}
                          {item % 1 === 0 ? (
                            <React.Fragment>
                              <Text style={styles.numberItem}>
                                {parseInt(item)}
                              </Text>
                              <View style={styles.gach1phan2}></View>
                            </React.Fragment>
                          ) : (
                            <Text></Text>
                          )}
                        </View>
                        <View style={styles.colLoop2}>
                          <Image src={bgTd} style={styles.imgBgTd2} />
                        </View>
                        <View style={styles.colLoop3}>
                          <Image
                            src={bgTd2}
                            style={{
                              height: "100%",
                              minWidth: 2,
                              width: `${wNsw3}%`
                            }}
                          />
                          <View style={styles.hr1} />
                          <View style={styles.hr2} />
                          <View style={styles.hr3} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {data.dataRender[3] && (
              <View style={styles.itemLoop}>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>測点位置</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[3].measurement_point_no}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>最終貫入深さ</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[3].final_penetration_depth}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>孔口標高</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[3].hole_mouth_elevation}
                  </Text>
                </View>
                <View style={styles.tableMain}>
                  <View style={styles.rowHead1}>
                    <View style={styles.colHead11}>
                      <Text style={styles.textHeadTable}>縮</Text>
                      <Text style={styles.textHeadTable}>尺</Text>
                      <Text style={styles.textHeadTable}>ｍ</Text>
                    </View>
                    <View style={styles.colHead12}>
                      <Text style={styles.textHeadTable}>推定</Text>
                      <Text style={styles.textHeadTable}>柱状図</Text>
                    </View>
                    <View style={styles.colHead13}>
                      <Text style={styles.textHeadTable}>1m当りの半回転数</Text>
                      <Text style={styles.textHeadTable}>Nsw</Text>
                      <Text style={styles.textHeadTable}>
                        50 100 150 200 250
                      </Text>
                    </View>
                  </View>
                  {/* loop row */}
                  {arrayRenderTable.map(item => {
                    let wNsw4 = data.dataRender[3][item]
                      ? parseInt(data.dataRender[3][item].nsw)
                      : 0;
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <View style={styles.rowItemLoop} key={item}>
                        <View style={styles.colLoop1}>
                          {item % 0.5 === 0 && item % 1 !== 0 ? (
                            <View style={styles.gach1phan4}></View>
                          ) : (
                            <Text></Text>
                          )}
                          {item % 1 === 0 ? (
                            <React.Fragment>
                              <Text style={styles.numberItem}>
                                {parseInt(item)}
                              </Text>
                              <View style={styles.gach1phan2}></View>
                            </React.Fragment>
                          ) : (
                            <Text></Text>
                          )}
                        </View>
                        <View style={styles.colLoop2}>
                          <Image src={bgTd} style={styles.imgBgTd2} />
                        </View>
                        <View style={styles.colLoop3}>
                          <Image
                            src={bgTd2}
                            style={{
                              height: "100%",
                              minWidth: 2,
                              width: `${wNsw4}%`
                            }}
                          />
                          <View style={styles.hr1} />
                          <View style={styles.hr2} />
                          <View style={styles.hr3} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {data.dataRender[4] && (
              <View style={styles.itemLoop}>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>測点位置</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[4].measurement_point_no}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>最終貫入深さ</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[4].final_penetration_depth}
                  </Text>
                </View>
                <View style={styles.headTopTable}>
                  <Text style={styles.textHeadeTop}>孔口標高</Text>
                  <Text style={styles.textHeadeTop}>
                    {data.dataRender[4].hole_mouth_elevation}
                  </Text>
                </View>
                <View style={styles.tableMain}>
                  <View style={styles.rowHead1}>
                    <View style={styles.colHead11}>
                      <Text style={styles.textHeadTable}>縮</Text>
                      <Text style={styles.textHeadTable}>尺</Text>
                      <Text style={styles.textHeadTable}>ｍ</Text>
                    </View>
                    <View style={styles.colHead12}>
                      <Text style={styles.textHeadTable}>推定</Text>
                      <Text style={styles.textHeadTable}>柱状図</Text>
                    </View>
                    <View style={styles.colHead13}>
                      <Text style={styles.textHeadTable}>1m当りの半回転数</Text>
                      <Text style={styles.textHeadTable}>Nsw</Text>
                      <Text style={styles.textHeadTable}>
                        50 100 150 200 250
                      </Text>
                    </View>
                  </View>
                  {/* loop row */}
                  {arrayRenderTable.map(item => {
                    let wNsw5 = data.dataRender[4][item]
                      ? parseInt(data.dataRender[4][item].nsw)
                      : 0;
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <View style={styles.rowItemLoop} key={item}>
                        <View style={styles.colLoop1}>
                          {item % 0.5 === 0 && item % 1 !== 0 ? (
                            <View style={styles.gach1phan4}></View>
                          ) : (
                            <Text></Text>
                          )}
                          {item % 1 === 0 ? (
                            <React.Fragment>
                              <Text style={styles.numberItem}>
                                {parseInt(item)}
                              </Text>
                              <View style={styles.gach1phan2}></View>
                            </React.Fragment>
                          ) : (
                            <Text></Text>
                          )}
                        </View>
                        <View style={styles.colLoop2}>
                          <Image src={bgTd} style={styles.imgBgTd2} />
                        </View>
                        <View style={styles.colLoop3}>
                          <Image
                            src={bgTd2}
                            style={{
                              height: "100%",
                              minWidth: 2,
                              width: `${wNsw5}%`
                            }}
                          />
                          <View style={styles.hr1} />
                          <View style={styles.hr2} />
                          <View style={styles.hr3} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.textTitleContent}>Loadding...</Text>
        )}
      </View>
    </View>
    <View style={styles.lineEnd} />
  </Page>
);
class PrintReportPage13 extends React.Component {
  render() {
    const { dataRender } = this.props;
    return <DocumentPrint dataRender={dataRender} />;
  }
}

PrintReportPage13.propTypes = {
  dataRender: PropTypes.array
};
export default PrintReportPage13;
