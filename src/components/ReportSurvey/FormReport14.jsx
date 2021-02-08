import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import axios from "axios";
// constant
import { apiRoot } from "constant/index.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// img
import bgChambi from "assets/img/bg-cbi.png";
import bgGachNgang from "assets/img/bg-td.png";
import bgLuoiDen from "assets/img/bg-luoi-den.png";
import bgDatSoi from "assets/img/dat-soi.png";
// common function
import { asyncForEach } from "utils/common.js";

const styles = () => ({
  recordForm: {
    color: "#222",
    width: "100%",
    margin: "20px 0",
    paddingRight: 20,
    display: "flex",
    flexDirection: "column",
    "& h3": {
      fontSize: 13,
      fontWeight: 600,
      borderBottom: "solid 1px",
      marginBottom: 15,
      marginLeft: 30,
      "& b": {
        fontSize: 16
      }
    }
  },
  colLeftForm: {
    fontSize: 16,
    marginTop: 23,
    marginRight: 30
  },
  colRightForm: {
    width: "100%"
  },
  lineBlack: {
    width: "100%",
    height: 3,
    backgroundColor: "#000",
    zIndex: 9999
  },
  gach1phan2: {
    position: "absolute",
    width: "20%",
    height: 1,
    backgroundColor: "#222",
    left: 0,
    bottom: -1
  },
  numberItem: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 14,
    width: "90%",
    textAlign: "right",
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: -1,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "50%",
      height: 1,
      backgroundColor: "#222",
      bottom: 0,
      left: 0
    },
    "& i": {
      position: "absolute",
      right: 2,
      bottom: -6,
      fontStyle: "normal"
    }
  },
  tableContent: {
    borderSpacing: 0,
    marginRight: 0,
    border: "solid 1px #000",
    borderRight: 0,
    width: "100%",
    color: "#222",
    fontSize: 9,
    "& tbody tr td:nth-child(1)": {
      borderColor: "transparent",
      borderRightColor: "#222",
      position: "relative"
    },
    "& thead th": {
      padding: "5px 0px",
      letterSpacing: 2
    },
    "& th, td": {
      border: "1px solid #000",
      borderLeft: 0,
      borderTop: 0,
      padding: "4px 0",
      verticalAlign: "middle",
      textAlign: "center"
    },
    "& tbody td": {
      fontWeight: "bold",
      fontSize: 11
    },
    "& $formText1": {
      width: 60
    },
    "& $formText": {
      width: 60
    }
    // "&& td:nth-child(3), th:nth-child(3)": {
    //   color: "#0178BE",
    //   fontWeight: 600
    // },
    // "&& td:nth-child(9), th:nth-child(9)": {
    //   backgroundColor: "#EBF1EC"
    // },
    // "&& td:nth-last-child(1), th:nth-last-child(1), td:nth-last-child(2), th:nth-last-child(2), td:nth-last-child(3), th:nth-last-child(3)": {
    //   backgroundColor: "#FFE4CB"
    // }
  },
  inlineRow: {
    "& td": {
      borderBottomColor: "#000",
      borderBottomWidth: 2
    }
  },
  errorPage: {
    textAlign: "center",
    "& h2": {
      fontSize: 35,
      marginTop: 100
    }
  },
  loaddingPage: {
    marginTop: "calc(32% - 20px)"
  },
  bgGach: {
    backgroundSize: "100% 100%"
  },
  bgLuoi: {
    position: "relative",
    borderBottomColor: "transparent !important",
    "& hr": {
      position: "absolute",
      height: "100%",
      width: 2,
      border: "none",
      bottom: -5,
      borderLeft: "dashed 1px #ababab"
    },
    "& hr:nth-child(1)": {
      left: "calc(16.6% - 1px)"
    },
    "& hr:nth-child(2)": {
      left: "calc(33.2% - 1px)"
    },
    "& hr:nth-child(3)": {
      left: "calc(49.8% - 1px)"
    },
    "& hr:nth-child(4)": {
      left: "calc(66.6% - 1px)"
    },
    "& hr:nth-child(5)": {
      left: "calc(83% - 1px)"
    },
    "& span": {
      height: "100%",
      maxWidth: "100%",
      position: "absolute",
      left: 0,
      top: 0,
      backgroundImage: `url(${bgLuoiDen})`,
      backgroundSize: "auto 100%"
    }
  },
  colNetDut1: {
    position: "relative",
    borderBottomColor: "transparent !important",
    "& hr": {
      position: "absolute",
      height: "100%",
      width: 3,
      border: "none",
      bottom: -5,
      borderLeft: "dashed 1px #ababab"
    },
    "& hr:nth-child(1)": {
      left: "calc(25% - 1px)"
    },
    "& hr:nth-child(2)": {
      left: "calc(50% - 1px)"
    },
    "& hr:nth-child(3)": {
      left: "calc(75% - 1px)"
    },
    "& span": {
      height: "100%",
      maxWidth: "100%",
      position: "absolute",
      left: 0,
      top: 0,
      backgroundImage: `url(${bgLuoiDen})`,
      backgroundSize: "auto 100%"
    }
  },
  divInth: {
    left: 0,
    width: "100%",
    bottom: 0,
    position: "absolute",
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
    "& span": {
      width: "25%",
      textAlign: "left",
      fontSize: 8
    }
  },
  divInth1: {
    left: 0,
    width: "100%",
    bottom: 0,
    position: "absolute",
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
    "& span": {
      width: "25%",
      textAlign: "left",
      fontSize: 5
    }
  },
  td3: {
    position: "relative"
    // "& span": {
    //   fontSize: 8,
    //   position: "absolute",
    //   bottom: 0,
    //   width: "100%",
    //   left: 0
    // }
  },
  contentForm: {
    display: "flex",
    flex: 1,
    overflow: "auto"
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    width: "20%",
    minWidth: 250,
    padding: 5
  },
  tableFirst: {
    borderSpacing: 0,
    fontSize: 10,
    "& tr td": {
      borderBottom: "solid 1px #222",
      padding: "2px 0",
      letterSpacing: 0.6
    }
  }
});

const arrayRenderData = [];
for (let index = 0.25; index <= 17; index += 0.25) {
  arrayRenderData.push(String(index.toFixed(2)));
}
let surveyInfoNew = {};
surveyInfoNew["survey_id"] = null;
surveyInfoNew["survey_name"] = "";
surveyInfoNew["measurement_point_no"] = "";
surveyInfoNew["survey_location"] = "";
surveyInfoNew["survey_date"] = null;
surveyInfoNew["hole_mouth_elevation"] = "";
surveyInfoNew["final_penetration_depth"] = "";
surveyInfoNew["tester"] = "";
surveyInfoNew["water_level"] = "";
surveyInfoNew["weather"] = "";
surveyInfoNew["site_name"] = "";
surveyInfoNew["remarks"] = "";
surveyInfoNew["measurement_content"] = "";
surveyInfoNew["phenol_reaction"] = 0;
surveyInfoNew["survey_equipment"] = "";
// map render field in table
arrayRenderData.forEach(item => {
  surveyInfoNew[item] = {};
  surveyInfoNew[item]["wsw"] = "";
  surveyInfoNew[item]["half_revolution"] = "";
  surveyInfoNew[item]["shari"] = 0;
  surveyInfoNew[item]["jari"] = 0;
  surveyInfoNew[item]["gully"] = 0;
  surveyInfoNew[item]["excavation"] = 0;
  surveyInfoNew[item]["ston"] = 0;
  surveyInfoNew[item]["sursul"] = 0;
  surveyInfoNew[item]["yukuri"] = 0;
  surveyInfoNew[item]["jinwali"] = 0;
  surveyInfoNew[item]["number_of_hits"] = "";
  surveyInfoNew[item]["idling"] = 0;
  surveyInfoNew[item]["sandy_soil"] = 0;
  surveyInfoNew[item]["clay_soil"] = 0;
  surveyInfoNew[item]["other"] = "";
  surveyInfoNew[item]["penetration_amount"] = "";
  surveyInfoNew[item]["nws"] = "";
  surveyInfoNew[item]["sound_and_feel"] = "";
  surveyInfoNew[item]["intrusion_status"] = "";
  surveyInfoNew[item]["soil_name"] = "";
  surveyInfoNew[item]["conversion_N_value"] = "";
  surveyInfoNew[item]["allowable_bearing_capacity"] = "";
});
class FormRecord14 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroolLeft: 0,
      surveyId: null,
      surveyInfo: [] // -1: api faild, tồn tại dạng arr json (gôm list No theo số thứ tự)
    };
  }

  componentDidMount = () => {
    const { surveyId, numberNoStart } = this.props;
    if (surveyId && numberNoStart) {
      this.setState({
        surveyId: surveyId
      });
      this.getSurveyInfoBySurveyIdAndStt(surveyId, numberNoStart);
    }
  };

  // get survey info by id
  getSurveyInfoBySurveyIdAndStt = async (id, stt) => {
    // stt tới đây sẽ là luôn tồn tại ở 2 giá trị (1,6) nên không cần check null
    let arrStt = stt === 1 ? [1, 2, 3, 4, 5] : [6, 7, 8, 9, 10]; // for arrStt này để get surveyInfo theo số thứ tự
    await asyncForEach(arrStt, async item => {
      let dataSurveyInfo = await this.getNoByStt(id, item);
      // console.log(dataSurveyInfo);
      if (!dataSurveyInfo) {
        // luôn hiển thị tạm thời 5 table
        this.setState({
          surveyInfo: this.state.surveyInfo.concat(surveyInfoNew)
        });
        return;
      }
      // ngược lại set data vào state
      this.setState({
        surveyInfo: this.state.surveyInfo.concat(dataSurveyInfo)
      });
    });
  };
  getNoByStt = async (surveyId, stt) => {
    const res = await axios.get(`${apiRoot}/surveyinfo/${surveyId}?no=${stt}`);
    // error
    if (res.status !== 200 || res.status !== 200) {
      return false;
    }
    return res.data;
  };
  render = () => {
    const { classes } = this.props;
    const { surveyInfo } = this.state;
    // console.log(surveyInfo);
    if (!surveyInfo) {
      return false;
    }
    let elRenderTb1 =
      surveyInfo[0] &&
      arrayRenderData.map((item, i) => {
        // chỉ render với số dòng bằng field final_penetration_depth
        // Math.ceil làm tròn lên số nguyên
        // let isContinute =
        //   surveyInfo[0].final_penetration_depth &&
        //   Math.ceil(parseFloat(surveyInfo[0].final_penetration_depth)) >=
        //     parseFloat(item)
        //     ? true
        //     : false;
        let isContinute = 17 >= parseFloat(item) ? true : false;
        // render bg col 2
        let soil_name = surveyInfo[0][`${item}`]
          ? surveyInfo[0][`${item}`].soil_name
          : "";
        let bgCol2 =
          soil_name === "砂質土"
            ? bgChambi
            : soil_name === "粘性土"
            ? bgGachNgang
            : soil_name === "礫質土"
            ? bgDatSoi
            : "";
        // wsw
        let wsw =
          surveyInfo[0] && surveyInfo[0][`${item}`]
            ? surveyInfo[0][`${item}`].wsw
            : "";
        // nws
        let nws =
          surveyInfo[0] && surveyInfo[0][`${item}`]
            ? surveyInfo[0][`${item}`].nws
            : "";

        if (isContinute) {
          return (
            <tr key={i}>
              <td>
                {item % 0.5 === 0 && item % 1 !== 0 ? (
                  <span className={classes.gach1phan2}></span>
                ) : (
                  ""
                )}
                {item % 1 === 0 ? (
                  <span className={classes.numberItem}>
                    <i>{parseInt(item)}</i>
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td
                style={{
                  backgroundImage: `url(${bgCol2})`,
                  backgroundSize: "100% auto",
                  borderBottom: "none"
                }}
              ></td>
              <td className={classes.colNetDut1}>
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(wsw * 100)}%` }}></span>
              </td>
              <td className={classes.bgLuoi}>
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(nws / 3)}%` }}></span>
              </td>
            </tr>
          );
        }
      });

    let elRenderTb2 =
      surveyInfo[1] &&
      arrayRenderData.map((item, i) => {
        // chỉ render với số dòng bằng field final_penetration_depth
        // Math.ceil làm tròn lên số nguyên
        let isContinute = 17 >= parseFloat(item) ? true : false;
        // render bg col 2
        let soil_name = surveyInfo[1][`${item}`]
          ? surveyInfo[1][`${item}`].soil_name
          : "";
        let bgCol2 =
          soil_name === "砂質土"
            ? bgChambi
            : soil_name === "粘性土"
            ? bgGachNgang
            : "";
        // wsw
        let wsw =
          surveyInfo[1] && surveyInfo[1][`${item}`]
            ? surveyInfo[1][`${item}`].wsw
            : "";
        // nws
        let nws =
          surveyInfo[1] && surveyInfo[1][`${item}`]
            ? surveyInfo[1][`${item}`].nws
            : "";

        if (isContinute) {
          return (
            <tr key={i}>
              <td>
                {item % 0.5 === 0 && item % 1 !== 0 ? (
                  <span className={classes.gach1phan2}></span>
                ) : (
                  ""
                )}
                {item % 1 === 0 ? (
                  <span className={classes.numberItem}>
                    <i>{parseInt(item)}</i>
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td
                style={{
                  backgroundImage: `url(${bgCol2})`,
                  backgroundSize: "100% auto",
                  borderBottom: "none"
                }}
              ></td>
              <td width={50} className={classes.colNetDut1}>
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(wsw * 100)}%` }}></span>
              </td>
              <td className={classes.bgLuoi}>
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(nws / 3)}%` }}></span>
              </td>
            </tr>
          );
        }
      });

    let elRenderTb3 =
      surveyInfo[2] &&
      arrayRenderData.map((item, i) => {
        // chỉ render với số dòng bằng field final_penetration_depth
        // Math.ceil làm tròn lên số nguyên
        let isContinute = 17 >= parseFloat(item) ? true : false;
        // render bg col 2
        let soil_name = surveyInfo[2][`${item}`]
          ? surveyInfo[2][`${item}`].soil_name
          : "";
        let bgCol2 =
          soil_name === "砂質土"
            ? bgChambi
            : soil_name === "粘性土"
            ? bgGachNgang
            : "";
        // wsw
        let wsw =
          surveyInfo[2] && surveyInfo[2][`${item}`]
            ? surveyInfo[2][`${item}`].wsw
            : "";
        // nws
        let nws =
          surveyInfo[2] && surveyInfo[2][`${item}`]
            ? surveyInfo[2][`${item}`].nws
            : "";

        if (isContinute) {
          return (
            <tr key={i}>
              <td>
                {item % 0.5 === 0 && item % 1 !== 0 ? (
                  <span className={classes.gach1phan2}></span>
                ) : (
                  ""
                )}
                {item % 1 === 0 ? (
                  <span className={classes.numberItem}>
                    <i>{parseInt(item)}</i>
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td
                style={{
                  backgroundImage: `url(${bgCol2})`,
                  backgroundSize: "100% auto",
                  borderBottom: "none"
                }}
              ></td>
              <td width={50} className={classes.colNetDut1}>
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(wsw * 100)}%` }}></span>
              </td>
              <td className={classes.bgLuoi}>
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(nws / 3)}%` }}></span>
              </td>
            </tr>
          );
        }
      });

    let elRenderTb4 =
      surveyInfo[3] &&
      arrayRenderData.map((item, i) => {
        // chỉ render với số dòng bằng field final_penetration_depth
        // Math.ceil làm tròn lên số nguyên
        let isContinute = 17 >= parseFloat(item) ? true : false;
        // render bg col 2
        let soil_name = surveyInfo[3][`${item}`]
          ? surveyInfo[3][`${item}`].soil_name
          : "";
        let bgCol2 =
          soil_name === "砂質土"
            ? bgChambi
            : soil_name === "粘性土"
            ? bgGachNgang
            : "";
        // wsw
        let wsw =
          surveyInfo[3] && surveyInfo[3][`${item}`]
            ? surveyInfo[3][`${item}`].wsw
            : "";
        // nws
        let nws =
          surveyInfo[3] && surveyInfo[3][`${item}`]
            ? surveyInfo[3][`${item}`].nws
            : "";

        if (isContinute) {
          return (
            <tr key={i}>
              <td>
                {item % 0.5 === 0 && item % 1 !== 0 ? (
                  <span className={classes.gach1phan2}></span>
                ) : (
                  ""
                )}
                {item % 1 === 0 ? (
                  <span className={classes.numberItem}>
                    <i>{parseInt(item)}</i>
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td
                style={{
                  backgroundImage: `url(${bgCol2})`,
                  backgroundSize: "100% auto",
                  borderBottom: "none"
                }}
              ></td>
              <td width={50} className={classes.colNetDut1}>
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(wsw * 100)}%` }}></span>
              </td>
              <td className={classes.bgLuoi}>
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(nws / 3)}%` }}></span>
              </td>
            </tr>
          );
        }
      });

    let elRenderTb5 =
      surveyInfo[4] &&
      arrayRenderData.map((item, i) => {
        // chỉ render với số dòng bằng field final_penetration_depth
        // Math.ceil làm tròn lên số nguyên
        let isContinute = 17 >= parseFloat(item) ? true : false;
        // render bg col 2
        let soil_name = surveyInfo[4][`${item}`]
          ? surveyInfo[4][`${item}`].soil_name
          : "";
        let bgCol2 =
          soil_name === "砂質土"
            ? bgChambi
            : soil_name === "粘性土"
            ? bgGachNgang
            : "";
        // wsw
        let wsw =
          surveyInfo[4] && surveyInfo[4][`${item}`]
            ? surveyInfo[4][`${item}`].wsw
            : "";
        // nws
        let nws =
          surveyInfo[4] && surveyInfo[4][`${item}`]
            ? surveyInfo[4][`${item}`].nws
            : "";

        if (isContinute) {
          return (
            <tr key={i}>
              <td>
                {item % 0.5 === 0 && item % 1 !== 0 ? (
                  <span className={classes.gach1phan2}></span>
                ) : (
                  ""
                )}
                {item % 1 === 0 ? (
                  <span className={classes.numberItem}>
                    <i>{parseInt(item)}</i>
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td
                style={{
                  backgroundImage: `url(${bgCol2})`,
                  backgroundSize: "100% auto",
                  borderBottom: "none"
                }}
              ></td>
              <td width={50} className={classes.colNetDut1}>
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(wsw * 100)}%` }}></span>
              </td>
              <td className={classes.bgLuoi}>
                <hr />
                <hr />
                <hr />
                <hr />
                <hr />
                <span style={{ width: `${parseFloat(nws / 3)}%` }}></span>
              </td>
            </tr>
          );
        }
      });
    return (
      <div className={classes.recordForm}>
        <Typography component="h3">
          {/* 調査件名：<b>小林　裕二　様邸</b> */}
          サウンディング柱状図一覧表
        </Typography>
        <div className={classes.contentForm}>
          <div style={{ display: "flex", width: "100%" }}>
            {/* table 1 */}
            {surveyInfo[0] && (
              <div className={classes.contentBox}>
                <table className={classes.tableFirst}>
                  <tr>
                    <td>測点位置</td>
                    <td>{surveyInfo[0].measurement_point_no}</td>
                  </tr>
                  <tr>
                    <td>最終貫入深さ</td>
                    <td>{surveyInfo[0].final_penetration_depth} m</td>
                  </tr>
                  <tr>
                    <td>孔口標高</td>
                    <td>{surveyInfo[0].water_level}</td>
                  </tr>
                </table>

                <table className={classes.tableContent}>
                  <thead>
                    <tr>
                      <th width={25}>
                        縮<br /> 尺<br /> ｍ
                      </th>
                      <th width={35}>
                        推定
                        <br />
                        柱状図
                      </th>
                      <th className={classes.td3}>
                        荷重 <br />
                        Wsw
                        <div className={classes.divInth1}>
                          <span>0</span>
                          <span>0.25</span>
                          <span>0.5</span>
                          <span>0.75</span>
                        </div>
                      </th>
                      <th className={classes.td3}>
                        換算N値 柱状図
                        <div className={classes.divInth}>
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                          <span>150</span>
                          <span>200</span>
                          <span>250</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{elRenderTb1}</tbody>
                </table>
              </div>
            )}
            {/* end table 1 */}

            {/* table 2 */}
            {surveyInfo[1] && (
              <div className={classes.contentBox}>
                <table className={classes.tableFirst}>
                  <tr>
                    <td>測点位置</td>
                    <td>{surveyInfo[1].measurement_point_no}</td>
                  </tr>
                  <tr>
                    <td>最終貫入深さ</td>
                    <td>{surveyInfo[1].final_penetration_depth} m</td>
                  </tr>
                  <tr>
                    <td>孔口標高</td>
                    <td>{surveyInfo[1].water_level}</td>
                  </tr>
                </table>

                <table className={classes.tableContent}>
                  <thead>
                    <tr>
                      <th width={25}>
                        縮<br /> 尺<br /> ｍ
                      </th>
                      <th width={35}>
                        推定
                        <br />
                        柱状図
                      </th>
                      <th className={classes.td3}>
                        荷重 <br />
                        Wsw
                        <div className={classes.divInth1}>
                          <span>0</span>
                          <span>0.25</span>
                          <span>0.5</span>
                          <span>0.75</span>
                        </div>
                      </th>
                      <th className={classes.td3}>
                        換算N値 柱状図
                        <div className={classes.divInth}>
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                          <span>150</span>
                          <span>200</span>
                          <span>250</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{elRenderTb2}</tbody>
                </table>
              </div>
            )}
            {/* end table 2 */}

            {/* table 3 */}
            {surveyInfo[2] && (
              <div className={classes.contentBox}>
                <table className={classes.tableFirst}>
                  <tr>
                    <td>測点位置</td>
                    <td>{surveyInfo[2].measurement_point_no}</td>
                  </tr>
                  <tr>
                    <td>最終貫入深さ</td>
                    <td>{surveyInfo[2].final_penetration_depth} m</td>
                  </tr>
                  <tr>
                    <td>孔口標高</td>
                    <td>{surveyInfo[2].water_level}</td>
                  </tr>
                </table>

                <table className={classes.tableContent}>
                  <thead>
                    <tr>
                      <th width={25}>
                        縮<br /> 尺<br /> ｍ
                      </th>
                      <th width={35}>
                        推定
                        <br />
                        柱状図
                      </th>
                      <th className={classes.td3}>
                        荷重 <br />
                        Wsw
                        <div className={classes.divInth1}>
                          <span>0</span>
                          <span>0.25</span>
                          <span>0.5</span>
                          <span>0.75</span>
                        </div>
                      </th>
                      <th className={classes.td3}>
                        換算N値 柱状図
                        <div className={classes.divInth}>
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                          <span>150</span>
                          <span>200</span>
                          <span>250</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{elRenderTb3}</tbody>
                </table>
              </div>
            )}
            {/* end table 3 */}

            {/* table 4 */}
            {surveyInfo[3] && (
              <div className={classes.contentBox}>
                <table className={classes.tableFirst}>
                  <tr>
                    <td>測点位置</td>
                    <td>{surveyInfo[3].measurement_point_no}</td>
                  </tr>
                  <tr>
                    <td>最終貫入深さ</td>
                    <td>{surveyInfo[3].final_penetration_depth} m</td>
                  </tr>
                  <tr>
                    <td>孔口標高</td>
                    <td>{surveyInfo[3].water_level}</td>
                  </tr>
                </table>

                <table className={classes.tableContent}>
                  <thead>
                    <tr>
                      <th width={25}>
                        縮<br /> 尺<br /> ｍ
                      </th>
                      <th width={35}>
                        推定
                        <br />
                        柱状図
                      </th>
                      <th className={classes.td3}>
                        荷重 <br />
                        Wsw
                        <div className={classes.divInth1}>
                          <span>0</span>
                          <span>0.25</span>
                          <span>0.5</span>
                          <span>0.75</span>
                        </div>
                      </th>
                      <th className={classes.td3}>
                        換算N値 柱状図
                        <div className={classes.divInth}>
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                          <span>150</span>
                          <span>200</span>
                          <span>250</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{elRenderTb4}</tbody>
                </table>
              </div>
            )}
            {/* end table 4 */}

            {/* table 5 */}
            {surveyInfo[4] && (
              <div className={classes.contentBox}>
                <table className={classes.tableFirst}>
                  <tr>
                    <td>測点位置</td>
                    <td>{surveyInfo[4].measurement_point_no}</td>
                  </tr>
                  <tr>
                    <td>最終貫入深さ</td>
                    <td>{surveyInfo[4].final_penetration_depth} m</td>
                  </tr>
                  <tr>
                    <td>孔口標高</td>
                    <td>{surveyInfo[4].water_level}</td>
                  </tr>
                </table>

                <table className={classes.tableContent}>
                  <thead>
                    <tr>
                      <th width={25}>
                        縮<br /> 尺<br /> ｍ
                      </th>
                      <th width={35}>
                        推定
                        <br />
                        柱状図
                      </th>
                      <th className={classes.td3}>
                        荷重 <br />
                        Wsw
                        <div className={classes.divInth1}>
                          <span>0</span>
                          <span>0.25</span>
                          <span>0.5</span>
                          <span>0.75</span>
                        </div>
                      </th>
                      <th className={classes.td3}>
                        換算N値 柱状図
                        <div className={classes.divInth}>
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                          <span>150</span>
                          <span>200</span>
                          <span>250</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{elRenderTb5}</tbody>
                </table>
              </div>
            )}
            {/* end table 5 */}
          </div>
        </div>
      </div>
    );
  };
}

FormRecord14.propTypes = {
  classes: PropTypes.object.isRequired,
  surveyId: PropTypes.string,
  numberNoStart: PropTypes.number
};
export default withRoot(withStyles(styles)(FormRecord14));
