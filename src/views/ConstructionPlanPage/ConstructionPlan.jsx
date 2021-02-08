import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import { matchPath } from "react-router";
import axios from "axios";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
// img
import imgPlan from "assets/img/img-plan.png";
import imgPile from "assets/img/pile.png";

// component custommer
import Master3Col from "layout/Master3Col.jsx";
import SurveyReportPage8To17 from "components/ReportSurvey/SurveyReportPage8To17.jsx";
// constant
import { apiRoot, folderRoot } from "constant/index.js";
// jss
import styles from "assets/jss/views/styleConstructionPlan.jsx";

class ConstructionPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNumberPage: [],
      arrNo: [],
      pageIndex: 1,
      isLoaddingPage: 0,
      surveyId: null,
      data: null,
      isNew: true,
      statusSave: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      }
    };
  }
  componentDidMount = () => {
    document.title = "改良工事　設計支援システム";
    let currentLocation = this.props.location.pathname;
    let match = matchPath(currentLocation, {
      path: `${folderRoot}construction-plan/:id`,
      exact: true,
      strict: false
    });

    if (match !== null && match.params.id) {
      // kiểm trả xem survey này có tồn tại không
      this.isCheckSurveyById(match.params.id);
    } else {
      // khoon ton tai survey id => falid
      this.setState({ surveyId: null });
      setTimeout(() => {
        this.setState({ isLoaddingPage: -1 });
      }, 800);
    }
  };
  isCheckSurveyById = async id => {
    try {
      const res = await axios.get(`${apiRoot}/checksurvey/${id}`);
      // Failed
      if (res.status !== 200) {
        this.setState({ isLoaddingPage: -1 });
        return;
      }
      // survey id tồn tại
      this.getStatusNoBySurveyId(id);
      this.getDataConstructionPlan(id);
    } catch (error) {
      this.setState({ isLoaddingPage: -1 });
      return;
    }
  };
  getDataConstructionPlan = async id => {
    try {
      const res = await axios.get(`${apiRoot}/constructionplan/${id}`);
      // console.log(res);
      // Failed
      console.log(res);
      if (res.status !== 200 || res.data === false) {
        let dataDefault = {
          creation_status: "",
          ground_surface: "",
          status: "",
          surrounding_situation: "",
          survey_data_topography: ""
        };
        this.setState({
          data: dataDefault,
          isLoaddingPage: 1,
          surveyId: id,
          isNew: true
        });
        return false;
      }
      // Success
      this.setState({
        data: res.data,
        isLoaddingPage: 1,
        surveyId: id,
        isNew: false
      });
    } catch (error) {
      this.setState({ isLoaddingPage: -1 });
      return;
    }
  };

  // get survey info by id
  getStatusNoBySurveyId = async id => {
    const res = await axios.get(`${apiRoot}/statussurveyinfo/${id}`);
    // error
    if (res.status !== 200) {
      return;
    }
    // success
    let data = res.data;
    let newArrNumberPage = [];
    // 9 ở đây là : 7(page 1->7) + 1 ( 1 page cuối )
    for (let i = 1; i <= parseInt(data.details.length); i++) {
      newArrNumberPage.push(i);
    }
    this.setState({
      arrNumberPage: newArrNumberPage,
      arrNo: data.details
    });
  };
  render = () => {
    const { classes } = this.props;
    const {
      data,
      isLoaddingPage,
      surveyId,
      arrNumberPage,
      arrNo,
      pageIndex
    } = this.state;

    // phan trang
    let renderPagination = arrNumberPage.map((item, i) => {
      return (
        <Button
          key={i}
          onClick={() => this.setState({ pageIndex: item })}
          className={`${pageIndex === item ? classes.activePage : ""}`}
        >
          {item}
        </Button>
      );
    });
    // end phan trang
    if (isLoaddingPage === 0) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={"100%"}
          titleHeader="地盤調査　解析・判定"
          breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541 　　▶︎ 調査発注会社：〇〇会社　　▶︎ 発注担当者：〇〇　　▶︎ 調査発注日：2019年10月24日"
        >
          <div className={classes.errorPage}>
            <CircularProgress size={50} className={classes.loaddingPage} />
          </div>
        </Master3Col>
      );
    }
    if (isLoaddingPage === -1) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={"100%"}
          titleHeader="地盤調査　解析・判定"
          breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541 　　▶︎ 調査発注会社：〇〇会社　　▶︎ 発注担当者：〇〇　　▶︎ 調査発注日：2019年10月24日"
        >
          <div className={classes.errorPage}>
            <Typography component="h2">Oops, something went wrong!</Typography>
          </div>
        </Master3Col>
      );
    }
    return (
      <Master3Col
        colLeft={null}
        colRight={null}
        maxWidthPage={"100%"}
        titleHeader="改良工事　設計支援システム"
        breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541 　　▶︎ 調査発注会社：〇〇会社　　▶︎ 発注担当者：〇〇　　▶︎ 調査発注日：2019年10月24日"
      >
        <div className={classes.contentPage}>
          <Typography className={classes.titleForm} component="h1">
            設計条件
          </Typography>
          <div className={classes.contentForm}>
            <Typography className={classes.subTitlle}>
              以下のデータは、地盤安心住宅申込内容、地盤調査報告書、解析・判定を基にしています。
            </Typography>
            <div className={classes.wid1}>
              <Typography>建築物の概要</Typography>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td>建物構造</td>
                    <td>{data.building_structure}</td>
                  </tr>
                  <tr>
                    <td>階数</td>
                    <td>{data.number_of_floors}</td>
                  </tr>
                  <tr>
                    <td>基礎形状</td>
                    <td>{data.foundation_shape}</td>
                  </tr>
                  <tr>
                    <td>基礎面積 (Af)</td>
                    <td>
                      {data.foundation_area}m<sup>2</sup>
                    </td>
                  </tr>
                  <tr>
                    <td>必要地耐力</td>
                    <td>
                      {data.necessary_ground_strength} kN/m<sup>2</sup>
                    </td>
                  </tr>
                  <tr>
                    <td>建物総重量</td>
                    <td>{data.total_building_weight} kN</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={classes.wid2}>
              <Typography>地盤の概要</Typography>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td>測点番号</td>
                    <td>{data.station_number}</td>
                  </tr>
                  <tr>
                    <td>中間層土質</td>
                    <td>{data.middle_layer_soil}</td>
                  </tr>
                  <tr>
                    <td>先端部土質名</td>
                    <td>{data.soil_name_at_the_tip}</td>
                  </tr>
                  <tr>
                    <td>改良体先端深度</td>
                    <td>{data.improved_body_tip_depth} GL-m</td>
                  </tr>
                  <tr>
                    <td>改良地盤短辺幅</td>
                    <td>{data.improved_ground_short_side_width} m</td>
                  </tr>
                  <tr>
                    <td>改良地盤の外周</td>
                    <td>{data.outer_circumference} m</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={classes.wid3}>
              <div className={classes.pagination}>Page: {renderPagination}</div>
              {arrNo[0] && pageIndex === 1 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[0] ? arrNo[0] : null}
                />
              )}
              {arrNo[1] && pageIndex === 2 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[1] ? arrNo[1] : null}
                />
              )}
              {arrNo[2] && pageIndex === 3 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[2] ? arrNo[2] : null}
                />
              )}
              {arrNo[3] && pageIndex === 4 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[3] ? arrNo[3] : null}
                />
              )}
              {arrNo[4] && pageIndex === 5 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[4] ? arrNo[4] : null}
                />
              )}
              {arrNo[5] && pageIndex === 6 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[5] ? arrNo[5] : null}
                />
              )}
              {arrNo[6] && pageIndex === 7 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[6] ? arrNo[6] : null}
                />
              )}
              {arrNo[7] && pageIndex === 8 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[7] ? arrNo[7] : null}
                />
              )}
              {arrNo[8] && pageIndex === 9 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[8] ? arrNo[8] : null}
                />
              )}
              {arrNo[9] && pageIndex === 10 && (
                <SurveyReportPage8To17
                  customerCss={classes.boxParentSws}
                  id={surveyId}
                  no={arrNo[9] ? arrNo[9] : null}
                />
              )}
            </div>
          </div>
          {/* form 2 */}
          <div className={classes.rowForm2}>
            <div className={classes.form21}>
              <Typography className={classes.titleForm} component="h1">
                改良体の仕様
              </Typography>
              <div className={classes.contentForm}>
                <Typography className={classes.subTitlle}>
                  ▶︎ 直径、本数を入力し、右欄で計算してください。
                </Typography>
                <div className={classes.wid21}>
                  <dt>
                    <span>1</span>
                    <p>改良体の直径</p>
                    <InputBase className={classes.input} placeholder="φ" />
                    <p>mm</p>
                  </dt>
                  <dt>
                    <img src={imgPlan} alt="" style={{ marginLeft: 140 }} />
                  </dt>
                  <dt>
                    <span>2</span>
                    <p>改良体の本数</p>
                    <InputBase className={classes.input} placeholder="n" />
                    <p>本</p>
                  </dt>
                  <dt>
                    <span>3</span>
                    <p>計算結果</p>
                  </dt>
                </div>
              </div>
            </div>
            <div className={classes.form22}>
              <Typography className={classes.titleForm} component="h1">
                工事設計計算
              </Typography>
              <div className={classes.contentForm}>
                <Typography className={classes.subTitlle}>
                  ▶︎
                  設計基準強度：最低値を計算しますので、それ以上の値を設定してください。
                </Typography>
                <div className={classes.wid22}>
                  <Button
                    variant="contained"
                    className={classes.btnWid22}
                    style={{ width: "100%" }}
                  >
                    計算開始
                  </Button>
                  <ol className={classes.calc}>
                    <li>改良地盤の許容鉛直支持力 </li>
                    <li>
                      改良体の設計基準強度
                      <br />
                      <span style={{ color: "#691919" }}>
                        最低設計基準強度を計算します
                      </span>
                      <br />
                      <InputBase
                        className={classes.input}
                        placeholder="設計基準強度"
                      />{" "}
                      <span style={{ margin: "0 10px" }}>
                        kN/m<sup>2</sup>
                      </span>
                      <Button
                        variant="contained"
                        className={classes.btnWid22}
                        style={{ marginLeft: 25 }}
                      >
                        計算を続ける ↓
                      </Button>
                    </li>
                    <li>中地震時の許容鉛直支持力</li>
                    <li>中地震時の圧縮応力度</li>
                    <li>中地震時の縁応力度と許容応力度</li>
                    <li>中地震時の最大せん断応力度</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* form 3 */}
          <div className={classes.form3}>
            <Typography className={classes.titleForm} component="h1">
              工事施工図
            </Typography>
            <div className={classes.contentForm}>
              <div className={classes.wid33}>
                <div className={classes.conLeft}>
                  <Typography className={classes.subTitlle}>
                    改良工事仕様
                  </Typography>
                  <img
                    src={imgPile}
                    alt=""
                    style={{ width: 50, marginTop: 100 }}
                  />
                </div>
                <div className={classes.conRight}></div>
              </div>
            </div>
          </div>
          <Button variant="contained" className={classes.btnEnd}>
            印刷
          </Button>
        </div>
      </Master3Col>
    );
  };
}

ConstructionPlan.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object
};
export default withRoot(withStyles(styles)(ConstructionPlan));
