import React from "react";
import withRoot from "withRoot";
import { matchPath } from "react-router";
import { PropTypes } from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import Pagination from "material-ui-flat-pagination";
import axios from "axios";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
// constant
import { apiRoot, folderRoot } from "constant/index.js";

// component custommer
import Master3Col from "layout/Master3Col.jsx";
import SurveyReportPage1 from "components/ReportSurvey/SurveyReportPage1.jsx";
import SurveyReportPage2 from "components/ReportSurvey/SurveyReportPage2.jsx";
import SurveyReportPage3 from "components/ReportSurvey/SurveyReportPage3.jsx";
import SurveyReportPage4 from "components/ReportSurvey/SurveyReportPage4.jsx";
import SurveyReportPage5 from "components/ReportSurvey/SurveyReportPage5.jsx";
import SurveyReportPage6 from "components/ReportSurvey/SurveyReportPage6.jsx";
import SurveyReportPage7 from "components/ReportSurvey/SurveyReportPage7.jsx";
import SurveyReportPage8To17 from "components/ReportSurvey/SurveyReportPage8To17.jsx";
import SurveyReportPage12 from "components/ReportSurvey/SurveyReportPage12.jsx";
import SurveyReportPage14_1 from "components/ReportSurvey/SurveyReportPage14_1.jsx";
//component custom
import Notification from "components/Notification/Notification.jsx";
// jss
import styles from "assets/jss/views/styleJudgement.jsx";

class Judgement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNumberPage: [1, 2, 3, 4, 5, 6, 7],
      pageIndex: 1,
      isLoaddingPage: 0,
      surveyId: null,
      arrNo: [],
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
    document.title = "地盤調査　解析・判定";
    let currentLocation = this.props.location.pathname;
    let match = matchPath(currentLocation, {
      path: `${folderRoot}judgement/:id`,
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
      this.getDataJudgement(id);
    } catch (error) {
      this.setState({ isLoaddingPage: -1 });
      return;
    }
  };
  renderPage13And14ByListNo = async id => {
    const { arrNumberPage } = this.state;

    const checkPage1 = await this.getNoByStt(id, 1);
    const checkPage2 = await this.getNoByStt(id, 6);
    // error
    let totlePage = this.state.arrNumberPage.length;
    if (checkPage2) {
      arrNumberPage.splice(totlePage - 1, 0, {
        idPage: 132
      });
    }
    if (checkPage1) {
      arrNumberPage.splice(totlePage - 1, 0, {
        idPage: 131
      });
    }
    this.setState({
      arrNumberPage: arrNumberPage
    });
  };
  getNoByStt = async (surveyId, stt) => {
    const res = await axios.get(
      `${apiRoot}/groundsurveyreport13/${surveyId}?number=${stt}`
    );
    // error
    if (!res.data || res.status !== 200) {
      return false;
    }
    return true;
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
    for (let i = 1; i <= 8 + parseInt(data.details.length); i++) {
      newArrNumberPage.push(i);
    }
    this.setState(
      {
        arrNumberPage: newArrNumberPage,
        arrNo: data.details
      },
      // kiểm tra có bao nhiêu No để chia page13 => nếu totle No > 5 thì có page 14 tương tự page 13
      () => this.renderPage13And14ByListNo(id)
    );
  };

  getDataJudgement = async id => {
    try {
      const res = await axios.get(`${apiRoot}/judgement/${id}`);
      // console.log(res);
      // Failed
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

  handleChangePage = (e, offset, page) => {
    this.setState({ offsetPage: offset, pageIndex: page });
  };
  changeCheckBoxYesNo = (value, name) => {
    const { data } = this.state;
    data[name] = value;
    this.setState({ data });
  };
  // check is checked
  isChecked = (field, name) => {
    const { data } = this.state;
    if (!data || !data[name]) return false;
    if (data[name].indexOf(field) !== -1) {
      return true;
    }
    return false;
  };
  handleSave = async () => {
    const { isNew, statusSave } = this.state;
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    if (isNew) {
      // insert
      this.insertJudgement();
    } else {
      this.updateSurveyReport();
    }
  };
  insertJudgement = async () => {
    const { data, surveyId, statusSave } = this.state;
    let dataInsert = { ...data, survey_id: surveyId };
    // console.log(dataInsert);
    const res = await axios.post(`${apiRoot}/judgement`, dataInsert);

    // faild
    if (res.status !== 200 || res.data === false) {
      statusSave.isLoadding = false;
      statusSave.open = true;
      statusSave.message = "Insert data error";
      statusSave.status = -1;
      this.setState({ statusSave });
    }

    // success
    statusSave.isLoadding = false;
    statusSave.open = true;
    statusSave.message = "Insert data success";
    statusSave.status = 1;
    this.setState({ statusSave });
  };

  updateSurveyReport = async () => {
    const { data, surveyId, statusSave } = this.state;
    let dataUpdate = { ...data };
    // console.log(dataUpdate);
    const res = await axios.put(`${apiRoot}/judgement/${surveyId}`, dataUpdate);

    // faild
    if (res.status !== 200 || res.data === false) {
      statusSave.isLoadding = false;
      statusSave.open = true;
      statusSave.message = "Update data error";
      statusSave.status = -1;
      this.setState({ statusSave });
    }

    // success
    statusSave.isLoadding = false;
    statusSave.open = true;
    statusSave.message = "Update data success";
    statusSave.status = 1;
    this.setState({ statusSave });
  };
  renderView({ style, ...props }) {
    const thumbStyle = {
      paddingRight: 10,
      overflow: "hidden",
      overflowY: "auto",
      marginBottom: 0
    };
    return (
      <div
        id="contentRightSrcoll"
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }
  renderThumbScroll({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "rgba(30,30,30,0.2)",
      borderRadius: 5,
      right: -3,
      width: 5
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }
  
  handleCloseNotification = () => {
    const { statusSave } = this.state;
    statusSave.open = false;
    statusSave.isLoadding = false;
    statusSave.isError = 0;
    statusSave.message = "";
    this.setState({ statusSave });
  };
  render = () => {
    const { classes } = this.props;
    const {
      data,
      arrNumberPage,
      pageIndex,
      arrNo,
      isLoaddingPage,
      surveyId,
      statusSave
    } = this.state;
    console.log(data);
    let arrWidthPage13 = [1, 2, 3, 4, 5, 6, 7, 131, 132, arrNumberPage.length];
    let widthPagina =
      arrWidthPage13.indexOf(
        pageIndex.idPage ? pageIndex.idPage : pageIndex
      ) !== -1
        ? "calc(100% - 100px)"
        : "calc(100% - 230px)";
    let renderPagination = arrNumberPage.map((item, i) => {
      return (
        <Button
          key={i}
          onClick={() =>
            this.setState({ pageIndex: item.idPage ? item : i + 1 })
          }
          className={`${pageIndex === item ? classes.activePage : ""}`}
        >
          {i + 1}
        </Button>
      );
    });
    if (isLoaddingPage === 0) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
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
        titleHeader="地盤調査　解析・判定"
        breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541 　　▶︎ 調査発注会社：〇〇会社　　▶︎ 発注担当者：〇〇　　▶︎ 調査発注日：2019年10月24日"
      >
        <div className={classes.contentPage}>
          <div className={classes.colLeft}>
            <Scrollbars
              renderView={this.renderView}
              renderThumbVertical={this.renderThumbScroll}
              renderThumbHorizontal={props => (
                <div {...props} style={{ display: "none" }} />
              )}
            >
              <div className={classes.contentLeft}>
                <div className={classes.rowTitle}>
                  <Typography className={classes.titleLeft} component="h2">
                    解析チェックリスト
                  </Typography>
                  {/* button save/insert */}
                  <div className={classes.rowBtnOption}>
                    <Button
                      disabled={statusSave.isLoadding}
                      variant="contained"
                      className={classes.btnSave}
                      onClick={() => this.handleSave()}
                    >
                      保存
                    </Button>
                    {statusSave.isLoadding && (
                      <CircularProgress
                        size={24}
                        className={classes.iconProgress}
                      />
                    )}
                  </div>
                  {/* end button save */}
                </div>
                <div className={classes.rowBtn}>
                  <Button
                    variant="contained"
                    className={`${
                      this.isChecked("1", "status") ? classes.btnActive : ""
                    }`}
                    onClick={() => this.changeCheckBoxYesNo("1", "status")}
                  >
                    未着手
                  </Button>
                  <Button
                    variant="contained"
                    className={`${
                      this.isChecked("2", "status") ? classes.btnActive : ""
                    }`}
                    onClick={() => this.changeCheckBoxYesNo("2", "status")}
                  >
                    チェック中
                  </Button>
                  <Button
                    variant="contained"
                    className={`${
                      this.isChecked("3", "status") ? classes.btnActive : ""
                    }`}
                    onClick={() => this.changeCheckBoxYesNo("3", "status")}
                  >
                    終了
                  </Button>
                </div>
                <div className={classes.titleCat}>
                  <span>1</span>
                  <Typography component="h2">周辺状況</Typography>
                </div>
                <div className={classes.contentCat}>
                  <dt>
                    <span>調査値の地形・地層</span>
                    <span>該当ページ　→</span>
                  </dt>
                  <dd>
                    <FormControlLabel
                      classes={{
                        root: classes.rgCheckbox,
                        label: classes.labelCheck
                      }}
                      control={
                        <Checkbox
                          className={classes.checkbox}
                          onChange={() =>
                            this.changeCheckBoxYesNo(
                              "no_problem",
                              "survey_data_topography"
                            )
                          }
                          checked={this.isChecked(
                            "no_problem",
                            "survey_data_topography"
                          )}
                        />
                      }
                      label="問題なし"
                    />
                  </dd>
                  <dd>
                    <FormControlLabel
                      classes={{
                        root: classes.rgCheckbox,
                        label: classes.labelCheck
                      }}
                      control={
                        <Checkbox
                          className={classes.checkbox}
                          onChange={() =>
                            this.changeCheckBoxYesNo(
                              "need_attention",
                              "survey_data_topography"
                            )
                          }
                          checked={this.isChecked(
                            "need_attention",
                            "survey_data_topography"
                          )}
                        />
                      }
                      label="注意が必要"
                    />
                  </dd>
                  <dt>
                    <span>周辺の状況</span>
                    <span>該当ページ　→</span>
                  </dt>
                  <dd>
                    <FormControlLabel
                      classes={{
                        root: classes.rgCheckbox,
                        label: classes.labelCheck
                      }}
                      control={
                        <Checkbox
                          className={classes.checkbox}
                          onChange={() =>
                            this.changeCheckBoxYesNo(
                              "no_problem",
                              "surrounding_situation"
                            )
                          }
                          checked={this.isChecked(
                            "no_problem",
                            "surrounding_situation"
                          )}
                        />
                      }
                      label="問題なし"
                    />
                  </dd>
                  <dd>
                    <FormControlLabel
                      classes={{
                        root: classes.rgCheckbox,
                        label: classes.labelCheck
                      }}
                      control={
                        <Checkbox
                          className={classes.checkbox}
                          onChange={() =>
                            this.changeCheckBoxYesNo(
                              "need_attention",
                              "surrounding_situation"
                            )
                          }
                          checked={this.isChecked(
                            "need_attention",
                            "surrounding_situation"
                          )}
                        />
                      }
                      label="注意が必要"
                    />
                  </dd>
                </div>
                <div className={classes.titleCat}>
                  <span>2</span>
                  <Typography component="h2">調査敷地</Typography>
                </div>
                <div className={classes.contentCat}>
                  <dt>
                    <span>造成状況</span>
                    <span>該当ページ　→</span>
                  </dt>
                  <dd>
                    <FormControlLabel
                      classes={{
                        root: classes.rgCheckbox,
                        label: classes.labelCheck
                      }}
                      control={
                        <Checkbox
                          onChange={() =>
                            this.changeCheckBoxYesNo(
                              "no_problem",
                              "creation_status"
                            )
                          }
                          checked={this.isChecked(
                            "no_problem",
                            "creation_status"
                          )}
                        />
                      }
                      label="問題なし"
                    />
                  </dd>
                  <dd>
                    <FormControlLabel
                      classes={{
                        root: classes.rgCheckbox,
                        label: classes.labelCheck
                      }}
                      control={
                        <Checkbox
                          onChange={() =>
                            this.changeCheckBoxYesNo(
                              "there_is_embankment",
                              "creation_status"
                            )
                          }
                          checked={this.isChecked(
                            "there_is_embankment",
                            "creation_status"
                          )}
                        />
                      }
                      label="盛土がある"
                    />
                  </dd>
                  <dt>
                    <span>地表面</span>
                    <span>該当ページ　→</span>
                  </dt>
                  <dd>
                    <FormControlLabel
                      classes={{
                        root: classes.rgCheckbox,
                        label: classes.labelCheck
                      }}
                      control={
                        <Checkbox
                          onChange={() =>
                            this.changeCheckBoxYesNo("good", "ground_surface")
                          }
                          checked={this.isChecked("good", "ground_surface")}
                        />
                      }
                      label="良好"
                    />
                  </dd>
                  <dd>
                    <FormControlLabel
                      classes={{
                        root: classes.rgCheckbox,
                        label: classes.labelCheck
                      }}
                      control={
                        <Checkbox
                          onChange={() =>
                            this.changeCheckBoxYesNo(
                              "work_required",
                              "ground_surface"
                            )
                          }
                          checked={this.isChecked(
                            "work_required",
                            "ground_surface"
                          )}
                        />
                      }
                      label="作業が必要"
                    />
                  </dd>
                </div>
              </div>
            </Scrollbars>
          </div>
          <div className={classes.colRight}>
            <Scrollbars
              renderView={this.renderView}
              renderThumbVertical={this.renderThumbScroll}
              renderThumbHorizontal={props => (
                <div {...props} style={{ display: "none" }} />
              )}
            >
              <div style={{padding: "0 10px"}}>
                <div
                  className={classes.pagination}
                  style={{ width: widthPagina }}
                >
                  Page: {renderPagination}
                </div>
                {pageIndex === 1 && <SurveyReportPage1 id={surveyId} />}
                {pageIndex === 2 && <SurveyReportPage2 id={surveyId} />}
                {pageIndex === 3 && <SurveyReportPage3 />}
                {pageIndex === 4 && <SurveyReportPage4 id={surveyId} />}
                {pageIndex === 5 && <SurveyReportPage5 id={surveyId} />}
                {pageIndex === 6 && <SurveyReportPage6 id={surveyId} />}
                {pageIndex === 7 && <SurveyReportPage7 id={surveyId} />}
                {arrNo[0] && pageIndex === 8 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[0] ? arrNo[0] : null}
                  />
                )}

                {arrNo[1] && pageIndex === 9 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[1] ? arrNo[1] : null}
                  />
                )}
                {arrNo[2] && pageIndex === 10 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[2] ? arrNo[2] : null}
                  />
                )}
                {arrNo[3] && pageIndex === 11 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[3] ? arrNo[3] : null}
                  />
                )}
                {arrNo[4] && pageIndex === 12 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[4] ? arrNo[4] : null}
                  />
                )}
                {arrNo[5] && pageIndex === 13 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[5] ? arrNo[5] : null}
                  />
                )}
                {arrNo[6] && pageIndex === 14 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[6] ? arrNo[6] : null}
                  />
                )}
                {arrNo[7] && pageIndex === 15 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[7] ? arrNo[7] : null}
                  />
                )}
                {arrNo[8] && pageIndex === 16 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[8] ? arrNo[8] : null}
                  />
                )}
                {arrNo[9] && pageIndex === 17 && (
                  <SurveyReportPage8To17
                    id={surveyId}
                    no={arrNo[9] ? arrNo[9] : null}
                  />
                )}
                {pageIndex.idPage && pageIndex.idPage === 131 && (
                  <SurveyReportPage12 id={surveyId} numberNoStart={1} />
                )}
                {pageIndex.idPage && pageIndex.idPage === 132 && (
                  <SurveyReportPage12 id={surveyId} numberNoStart={6} />
                )}
                {pageIndex === arrNumberPage.length && (
                  <SurveyReportPage14_1 id={surveyId} />
                )}
              </div>
            </Scrollbars>
          </div>
        </div>
        {/* Notification event */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={statusSave.open}
          autoHideDuration={6000}
          onClose={this.handleCloseNotification}
        >
          {statusSave.open && (
            <Notification
              onClose={this.handleCloseNotification}
              variant={statusSave.status === -1 ? "error" : "success"}
              message={statusSave.message}
            />
          )}
        </Snackbar>
        {/* End Notification event */}
      </Master3Col>
    );
  };
}

Judgement.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object
};
export default withRoot(withStyles(styles)(Judgement));
