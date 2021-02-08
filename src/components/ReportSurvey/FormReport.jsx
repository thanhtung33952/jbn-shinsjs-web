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
import bgTd from "assets/img/bg-td.png";
import bgTd2 from "assets/img/bg-td2.png";

const styles = () => ({
  recordForm: {
    display: "flex",
    width: "100%"
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
  tableColRight: {
    borderSpacing: 0,
    marginRight: 0,
    border: "solid 1px #000",
    borderRight: 0,
    width: "100%",
    color: "#222",
    fontSize: 13,
    "& thead tr:nth-child(4) th": {
      backgroundColor: "#D9E6EE"
    },
    "& thead tr:nth-child(5) th": {
      borderBottomColor: "#000",
      borderBottomWidth: 2,
      letterSpacing: 0,
      backgroundColor: "#D9E6EE"
    },
    "& thead tr:nth-child(6) th": {
      borderBottomColor: "#000",
      borderBottomWidth: 2,
      fontSize: 11,
      fontWeight: "normal",
      letterSpacing: 0
    },
    "& thead tr:nth-child(7) th": {
      fontSize: 11,
      fontWeight: "normal",
      letterSpacing: 0
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
    backgroundImage: `url(${bgTd})`,
    backgroundSize: "100% 100%"
  },
  bgLuoi: {
    position: "relative",
    "& span": {
      height: "100%",
      maxWidth: "100%",
      position: "absolute",
      left: 0,
      top: 0,
      backgroundImage: `url(${bgTd2})`,
      backgroundSize: "auto 100%"
    }
  },
  td10: {
    position: "relative",
    "& span": {
      fontSize: 8,
      position: "absolute",
      bottom: 0,
      width: "100%",
      left: 0
    }
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
let surveyInfoNew = {};
surveyInfoNew["survey_id"] = null;
surveyInfoNew["site_name"] = "";
surveyInfoNew["weather"] = [0, 0, 0, 0];
surveyInfoNew["remarks"] = "";
surveyInfoNew["measurement_content"] = [0, 0, 0, 0];
surveyInfoNew["water_level"] = "";
surveyInfoNew["measurement_point_no"] = "";
surveyInfoNew["phenol_reaction"] = 0;
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
});
class FormRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: true,
      scroolLeft: 0,
      surveyId: null,
      no: 1,
      surveyInfo: null // -1: api faild, -2 : No không tồn tại By surveyId
    };
  }

  componentDidMount = () => {
    const { surveyId, no } = this.props;
    if (surveyId && no) {
      this.setState({
        surveyId: surveyId,
        no: no
      });
      this.getSurveyInfoBySurveyIdAndNo(surveyId, no);
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!nextProps.surveyId || !nextProps.no) return;
    // check nếu id survey khác thì không cho nó lấy lại data nữa, vì bản chất vòng đời này luôn vào khi props thay đổi
    if (
      nextProps.surveyId !== this.state.surveyId ||
      !nextProps.no !== this.state.no
    ) {
      this.setState({
        surveyId: nextProps.surveyId,
        no: nextProps.no
      });
      this.getSurveyInfoBySurveyIdAndNo(nextProps.surveyId, nextProps.no);
    } else return;
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
          surveyInfo: -1
        });
        return;
      }
      // success

      // thuc hien mode add new
      if (res.data === false) {
        this.setState({
          surveyInfo: -2,
          isNew: 1
        });
        return;
      }
      let data = res.data;
      this.setState({
        surveyInfo: data,
        isNew: 0
      });
    } catch (error) {
      this.setState({
        surveyInfo: -1
      });
      return;
    }
  };

  render = () => {
    const { classes } = this.props;
    const { surveyInfo } = this.state;
    // console.log(surveyInfo);
    if (!surveyInfo) {
      return false;
    }

    // get surveyInfo === -2 ( không có No này )
    if (surveyInfo === -2) {
      return (
        <Typography component="h1" className="abc">
          スウェーデン式サウンディング試験
        </Typography>
      );
    }
    // api faild
    if (surveyInfo === -1) {
      return (
        <div className={classes.errorPage}>
          <Typography component="h2">Oops, something went wrong!</Typography>
        </div>
      );
    }
    let elRender = arrayRenderData.map((item, i) => {
      let wsw =
        surveyInfo && surveyInfo[`${item}`] ? surveyInfo[`${item}`].wsw : "";
      let nws =
        surveyInfo && surveyInfo[`${item}`] ? surveyInfo[`${item}`].nws : "";
      let half_revolution =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].half_revolution
          : "";
      let penetration_amount =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].penetration_amount
          : "";
      let sound_and_feel =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].sound_and_feel
          : "";

      let intrusion_status =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].intrusion_status
          : "";
      let soil_name =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].soil_name
          : "";
      let conversion_N_value =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].conversion_N_value
          : "";
      let allowable_bearing_capacity =
        surveyInfo && surveyInfo[`${item}`]
          ? surveyInfo[`${item}`].allowable_bearing_capacity
          : "";
      return (
        <tr key={i} className={`${(i + 1) % 4 === 0 ? classes.inlineRow : ""}`}>
          <td width={50}>{wsw}</td>
          <td width={50}>{half_revolution}</td>
          <td width={50}>{item}</td>
          <td width={50}>{penetration_amount}</td>
          <td width={50}>{nws}</td>
          <td width={75}>{sound_and_feel}</td>
          <td width={75}>{intrusion_status}</td>
          <td width={75}>{soil_name}</td>
          <td width={45} className={classes.bgGach}></td>
          <td width={90} className={classes.bgLuoi}>
            <span style={{ width: "100%" }}></span>
          </td>
          <td width={100} className={classes.bgLuoi}>
            <span
              style={{ width: `${Math.floor(Math.random() * 100)}%` }}
            ></span>
          </td>
          <td width={40}>{conversion_N_value}</td>
          <td>{allowable_bearing_capacity}</td>
        </tr>
      );
    });
    return (
      <div className={classes.recordForm}>
        <table className={classes.tableColRight}>
          <thead>
            <tr>
              <th colSpan={2}>調査名</th>
              <th colSpan={6}>{surveyInfo && surveyInfo.survey_name} </th>
              <th colSpan={2}>測点番号</th>
              <th colSpan={3}>{surveyInfo && surveyInfo.station_number}</th>
            </tr>
            <tr>
              <th colSpan={2}>調査場所</th>
              <th colSpan={6}>{surveyInfo && surveyInfo.survey_location} </th>
              <th colSpan={2}>調査年月日</th>
              <th colSpan={3}>{surveyInfo && surveyInfo.survey_date}</th>
            </tr>
            <tr>
              <th colSpan={2}>孔口標高 </th>
              <th colSpan={6}>
                {surveyInfo && surveyInfo.hole_mouth_elevation}
              </th>
              <th colSpan={2}>最終貫入深さ</th>
              <th colSpan={3}>
                {surveyInfo && surveyInfo.final_penetration_depth}
              </th>
            </tr>

            <tr>
              <th colSpan={2}>孔内水位</th>
              <th colSpan={2}>不明</th>
              <th colSpan={2}>天候</th>
              <th colSpan={2}>曇り</th>
              <th colSpan={2}>試験者</th>
              <th colSpan={3}>{surveyInfo && surveyInfo.tester}</th>
            </tr>
            <tr>
              <th colSpan={2}>備 考</th>
              <th colSpan={11}>{surveyInfo && surveyInfo.remarks}</th>
            </tr>
            <tr>
              <th rowSpan={2}>
                荷重 <br />
                Wsw <br />
                (kN){" "}
              </th>
              <th rowSpan={2}>
                半回 <br />
                転数 <br />
                (Na){" "}
              </th>
              <th rowSpan={2}>
                貫入深さ <br />D <br />
                (m)
              </th>
              <th rowSpan={2}>
                貫入量 <br />L <br />
                (cm)
              </th>
              <th rowSpan={2}>
                1m 当りの 半回転数 <br />
                Nsw{" "}
              </th>
              <th colSpan={3} style={{ borderBottomWidth: 1 }}>
                記 事
              </th>
              <th rowSpan={2}>
                推定
                <br /> 柱状図
              </th>
              <th rowSpan={2} className={classes.td10}>
                荷重 <br />
                Wsw(kN)
                <br /> <span> 0 0.25 0.50 0.75 1.00</span>
              </th>
              <th rowSpan={2} className={classes.td10}>
                貫入量 1m 当りの 半回転数 <br /> Nsw <br />{" "}
                <span> 50 100 150 200 250</span>
              </th>
              <th rowSpan={2}>
                換算 <br />N 値
              </th>
              <th rowSpan={2}>
                許容 支持力 <br />
                qa <br />
                kN/㎡
              </th>
            </tr>
            <tr>
              <th style={{ borderBottomWidth: 2 }}>音感・感触</th>
              <th style={{ borderBottomWidth: 2 }}>貫入状況</th>
              <th style={{ borderBottomWidth: 2 }}> 土質名</th>
            </tr>
          </thead>
          <tbody>{elRender}</tbody>
        </table>
      </div>
    );
  };
}

FormRecord.propTypes = {
  classes: PropTypes.object.isRequired,
  surveyId: PropTypes.string,
  no: PropTypes.number
};
export default withRoot(withStyles(styles)(FormRecord));
