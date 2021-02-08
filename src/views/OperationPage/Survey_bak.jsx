import React from "react";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { matchPath } from "react-router";
import axios from "axios";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// layout
import Master3Col from "layout/Master3Col.jsx";
import Acoordion1 from "components/Survey/Acoordion1.jsx";
import Acoordion2 from "components/Survey/Acoordion2.jsx";
import Acoordion3 from "components/Survey/Acoordion3.jsx";
import Acoordion4 from "components/Survey/Acoordion4.jsx";
import Acoordion5 from "components/Survey/Acoordion5.jsx";
import Acoordion6 from "components/Survey/Acoordion6.jsx";
import Acoordion7 from "components/Survey/Acoordion7.jsx";
import Acoordion8 from "components/Survey/Acoordion8.jsx";
import Acoordion9 from "components/Survey/Acoordion9.jsx";
import Acoordion10 from "components/Survey/Acoordion10.jsx";
import Acoordion11 from "components/Survey/Acoordion11.jsx";
import Acoordion12 from "components/Survey/Acoordion12.jsx";
import Notification from "components/Notification/Notification.jsx";
import LeftColum from "components/Survey/LeftColum.jsx";
import RightColum from "components/Survey/RightColum.jsx";
import RecordForm from "components/Survey/RecordForm.jsx";
// constant
import { apiRoot, folderRoot } from "constant/index.js";
// redux action
import { updateValidation } from "actions/surveyActions.js";
// jss
import styles from "assets/jss/views/styleSurvey.jsx";
import { th } from "date-fns/esm/locale";

// end today
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
surveyInfoNew["weather"] = "";
surveyInfoNew["remarks"] = "";
surveyInfoNew["measurement_point_no"] = "";
surveyInfoNew["water_level"] = "";
surveyInfoNew["measurement_content"] = "";
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
class Survey extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaddingPage: true,
      isNewSurveyInfo: true,
      isNew: true,
      permission: null, // phân quyền. R: chỉ đọc .....
      surveyData: null, // -1: error api, -2: api return false,
      surveyInfo: null, // pdf
      isValidationAll: false,
      message: null,
      isLoaddingSave: false,
      isLoaddingChangeStatus: false,
      tabIndex: 0
    };
  }
  componentDidMount = async () => {
    const { cookies } = this.props;

    let currentLocation = this.props.location.pathname;
    let match = matchPath(currentLocation, {
      path: `${folderRoot}operation/survey/:sid`,
      exact: true,
      strict: false
    });

    const userInfo = cookies.get("authUserShinSJS");

    // mode update
    if (match !== null && match.params.sid) {
      const permission = await this.getPermissionUserOnSurvey(
        userInfo.userId,
        match.params.sid
      );
      if (permission) {
        this.setState({ isNew: false, permission: permission });
        this.getSurveyById(match.params.sid);
        this.getSurveyInfoById(match.params.sid);
      } else {
        this.setState({ permission: -1, isLoaddingPage: false });
      }
    } else {
      // mode add new surveyInfo
      this.setState({ surveyInfo: surveyInfoNew });
      this.getDataDefaultAcoor1(userInfo);
    }
  };
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = nextProps => {
    let isValiAll = true;
    nextProps.surveyProps.validation.forEach(item => {
      if (item.isVali === false) {
        isValiAll = false;
      }
    });
    this.setState({ isValidationAll: isValiAll });
  };

  // change tab
  changeTabSurvey = (e, index) => {
    this.setState({ tabIndex: index });
  };

  // get permission user
  getPermissionUserOnSurvey = async (userId, surveyId) => {
    const dataApi = {
      id: surveyId,
      userId: userId
    };
    try {
      const res = await axios.post(`${apiRoot}/permissionsurvey`, dataApi);

      // Failed
      if (res.status !== 200) {
        return false;
      }
      // Success
      return res.data.permission;
    } catch (error) {
      return false;
    }
  };

  // get data từ user info login ráp vào acoo1, acoo2
  getDataDefaultAcoor1 = async userInfo => {
    const { dispatch } = this.props;
    // check khoong co companyId thi set data trống
    if (!userInfo || !userInfo.companyId) {
      this.setState({
        surveyData: {},
        isLoaddingPage: false,
        isValidationAll: false
      });
      return;
    }

    //call api get info company by companyId
    const res = await axios.get(`${apiRoot}/company/${userInfo.companyId}`);
    // error
    if (res.status !== 200 || res.data === false) {
      return;
    } else {
      // success
      const data = res.data;
      let newSurveyData = {};
      newSurveyData[`userId`] = userInfo.userId;
      newSurveyData[`a_company_name`] = data.companyDisplayName;
      newSurveyData[`a_email`] = userInfo.email;
      newSurveyData[`a_contact_name`] =
        userInfo.lastName + " " + userInfo.firstName; // info user login
      newSurveyData[`a_contacts_etc`] = data.contactInformation;
      // bật validation all acoordion1 khi value các field đã đủ (trường hợp không đủ component acoordion sẽ tự check)
      dispatch(updateValidation({ nameAcoor: "acoordion1", isVali: true }));
      this.setState({
        surveyData: newSurveyData,
        isLoaddingPage: false,
        isValidationAll: false
      });
    }
  };
  // get survet by id
  getSurveyById = async id => {
    const { surveyProps, dispatch } = this.props;
    const validation = surveyProps.validation;
    const res = await axios.get(`${apiRoot}/survey/${id}`);
    // error
    if (res.status !== 200 || res.data === false) {
      this.setState({
        isLoaddingPage: false,
        surveyData: -1
      });
      return;
    }
    // success
    // nếu statusPublic của survey === 1 thì mới set validation all === true,
    // vì khi statusPublic === 0 thì vẫn còn là draft

    if (parseInt(res.data.statusPublic) === 1) {
      this.setState({ isValidationAll: true });
      validation.forEach(item => {
        dispatch(updateValidation({ ...item, isVali: true }));
      });
    }

    this.setState({
      surveyData: res.data,
      isLoaddingPage: false
    });
  };

  // get survey info by id
  getSurveyInfoById = async id => {
    const res = await axios.get(`${apiRoot}/surveyinfo/${id}`);
    // error
    if (res.status !== 200) {
      this.setState({
        surveyInfo: -1
      });
      return;
    }
    // success
    // nếu không tồn tại ssurveyInfo theo surveyID này
    if (res.data === false) {
      this.setState({
        isNewSurveyInfo: true,
        surveyInfo: { ...surveyInfoNew, survey_id: id }
      });
      return;
    }
    this.setState({
      surveyInfo: res.data
    });
  };

  // change status survey
  changeStatusSurvey = async status => {
    this.setState({ isLoaddingChangeStatus: true });
    const { surveyData } = this.state;

    if (!surveyData || !surveyData.id) return;

    const res = await axios.put(
      `${apiRoot}/survey/updatestatus/${surveyData.id}`,
      { status: status }
    );
    // error
    if (res.status !== 200 || res.data === false) {
      this.setState({ surveyData: -1, isLoaddingChangeStatus: false });
      return;
    }
    // success
    // reload page khi statusPublic = 1
    window.location.href = `${folderRoot}operation/survey/${surveyData.id}`;
    surveyData.status = res.data.status;
    this.setState({ surveyData, isLoaddingChangeStatus: false });
  };

  handleUpdateField = (name, val) => {
    const { surveyData } = this.state;
    surveyData[name] = val;
    this.setState({
      surveyData: surveyData
    });
  };
  handleUpdateSurveyInfo = (name, val) => {
    const { surveyInfo } = this.state;
    surveyInfo[name] = val;
    this.setState({
      surveyInfo: surveyInfo
    });
  };
  updateCheckboxRightSurveyInfo = (number, name, val) => {
    const { surveyInfo } = this.state;
    if (!surveyInfo[number]) {
      // trường hợp này khi có survey mà không có surveyInfo nào thuộc surveyInfo này
      surveyInfo[number] = {};
    }
    surveyInfo[number][name] = val;
    this.setState({
      surveyInfo: surveyInfo
    });
  };
  // handle upload file to server acoordion 9
  handleUploadFileToServer = async () => {
    const { surveyData } = this.state;
    let dataFile = new FormData();
    let count = 0;
    for (let field in surveyData) {
      // field site_map4 là upload img
      if (
        surveyData[field] &&
        surveyData[field].name &&
        surveyData[field].name !== "site_map4"
      ) {
        count = count + 1;
        dataFile.append(`my_file[${field}]`, surveyData[field]);
        surveyData[field] = surveyData[field].name;
        this.setState({ surveyData });
      }
    }
    // no file upload
    if (count === 0) {
      // true để tiếp tục bước save data
      return true;
    }

    try {
      const res = await axios.post(`${apiRoot}/uploadfile`, dataFile);

      // Failed
      if (res.status !== 200) {
        return false;
      }
      // Success
      return true;
    } catch (error) {
      return false;
    }
  };

  // handle upload images to server acoordion 4 (site_map4)
  handleUploadImageToServer = async () => {
    const { surveyData } = this.state;
    let dataFile = new FormData();
    let countImg = 0;
    let strImages = "";
    // trường hợp site_map4 có file nào upload mới thì tiếp tục
    if (surveyData && surveyData.site_map4 && surveyData.site_map4[0].name) {
      surveyData.site_map4.forEach((file, i) => {
        countImg = countImg + 1;
        dataFile.append(`my_file[${i}]`, file);
        strImages +=
          file.name + (i + 1 === surveyData.site_map4.length ? "" : ",");
      });
    }
    // no file upload
    if (countImg === 0) {
      // true để tiếp tục bước save data
      return true;
    }
    this.handleUpdateField("site_map4", strImages);
    // Upload img to server

    try {
      const res = await axios.post(`${apiRoot}/common/uploadphoto`, dataFile);

      // Failed
      if (res.status !== 200) {
        return false;
      }
      // Success
      return true;
    } catch (error) {
      return false;
    }
  };

  // delete draft
  handleDeleteDraft = async () => {
    const { surveyData } = this.state;
    if (!surveyData || !surveyData.id) {
      return;
    }
    try {
      const res = await axios.delete(`${apiRoot}/survey/${surveyData.id}`);

      // Failed
      if (res.status !== 200) {
        this.setState({
          message: {
            isError: true,
            text: "削除できません"
          }
        });
      }
      // Success
      // redirect to dashboard
      window.location.href = `${folderRoot}dashboard`;
    } catch (error) {
      this.setState({
        message: {
          isError: true,
          text: "削除できません"
        }
      });
    }
  };
  // event save
  handleSaveDraftOrPublic = async mode => {
    this.setState({ isLoaddingSave: true });
    // upload file to server
    const isUpload = await this.handleUploadFileToServer();
    // upload images field site_map4
    const isUploadImages = await this.handleUploadImageToServer();
    // upload faild
    if (!isUpload || !isUploadImages) {
      this.setState({
        message: {
          isError: true,
          text: "ファイルのアップロードに失敗しました"
        },
        isLoaddingSave: false
      });
      return;
    }
    let statusPublic;
    // mode === draft
    if (mode === "draft") {
      statusPublic = 0;
    }
    // mode === public
    if (mode === "public") {
      statusPublic = 1;
    }

    // upload ok, go to save
    if (this.state.isNew) {
      // truyền status = 0, và statusPublic = 1 => luôn như thế
      this.saveInsert(1, statusPublic);
    } else {
      this.saveUpdate(1, statusPublic);
    }
  };
  handleSave = async status => {
    this.setState({ isLoaddingSave: true });
    // upload file to server
    const isUpload = await this.handleUploadFileToServer();
    // upload images field site_map4
    const isUploadImages = await this.handleUploadImageToServer();
    // upload faild
    if (!isUpload || !isUploadImages) {
      this.setState({
        message: {
          isError: true,
          text: "ファイルのアップロードに失敗しました"
        },
        isLoaddingSave: false
      });
      return;
    }
    // upload ok, go to save
    if (status === "default") {
      // trường hợp này khi click button save
      this.saveUpdate(this.state.surveyData.status, 1);
    } else {
      this.saveUpdate(status, 1);
    }
  };
  saveInsert = async (status, statusPublic) => {
    const { surveyData } = this.state;
    let dataInsert = surveyData;
    // delete dataInsert.a_company_name;
    // delete dataInsert.a_contact_name;
    // delete dataInsert.a_email;
    dataInsert[`status`] = status;
    dataInsert[`statusPublic`] = statusPublic;
    try {
      // add new mode
      const res = await axios.post(`${apiRoot}/survey`, dataInsert);

      // Failed
      if (res.status !== 200) {
        // throw "Insert Failed";
        this.setState({
          message: {
            isError: true,
            text: "保存できませんでした。入力項目をすべて記入してください。"
          }
        });
        return;
      }
      // console.log(res.data);
      // Success

      this.setState({
        isNew: false,
        surveyData: {
          ...this.state.surveyData,
          id: res.data.id,
          status: status,
          statusPublic: statusPublic
        },
        message: { isError: false, text: "挿入成功しました。" }
      });

      // reload page khi statusPublic = 1
      if (statusPublic === 1) {
        window.location.href = `${folderRoot}operation/survey/${res.data.id}`;
      }
    } catch (error) {
      this.setState({
        message: {
          isError: true,
          text: "保存できませんでした。入力項目をすべて記入してください。"
        }
      });
    }
    this.setState({ isLoaddingSave: false });
  };

  saveUpdate = async (status, statusPublic) => {
    let dataUpdate = this.state.surveyData;
    // sẽ cải thiện chõ này (truyền xuống là phải bỏ các field dưới)
    // delete dataUpdate.a_company_name;
    // delete dataUpdate.a_contact_name;
    // delete dataUpdate.a_email;
    dataUpdate.status = status;
    dataUpdate.statusPublic = statusPublic;
    try {
      // update mode
      const res = await axios.put(
        `${apiRoot}/survey/${dataUpdate.id}`,
        dataUpdate
      );

      // Failed
      if (res.status !== 200) {
        // throw "Update Failed";
        this.setState({
          message: {
            isError: true,
            text: "アップデートに失敗しました。"
          }
        });
        return;
      }
      // Success

      // console.log(res.data);
      this.setState({
        surveyData: {
          ...this.state.surveyData,
          status: status,
          statusPublic: statusPublic
        },
        message: { isError: false, text: "挿入成功しました。" }
      });

      // reload page khi statusPublic = 1
      if (statusPublic === 1) {
        window.location.href = `${folderRoot}operation/survey/${this.state.surveyData.id}`;
      }
    } catch (error) {
      this.setState({
        message: {
          isError: true,
          text: "アップデートに失敗しました。"
        }
      });
    }
    this.setState({ isLoaddingSave: false });
  };

  handleCloseNotification = () => {
    this.setState({ message: null });
  };
  // customer style scrollbar
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

  render = () => {
    const { classes, cookies } = this.props;
    const {
      surveyData,
      isLoaddingPage,
      message,
      isLoaddingSave,
      isLoaddingChangeStatus,
      permission,
      tabIndex
    } = this.state;
    // get userInfo từ cookies
    console.log(surveyData)
    const userInfo = cookies.get("authUserShinSJS");

    // console.log(surveyData);
    // conver data survey (gồm: acoo2, acoo4) gửi qua col right để send mail
    let status = surveyData ? surveyData.status : null;
    let dataColRight = null;
    if (surveyData) {
      dataColRight = {
        id: surveyData.id,
        statusPublic: surveyData.statusPublic
      };
    }

    if (isLoaddingPage) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          breadcrumb="トップ ＞ ユーザー ＞ 取引先登録"
        >
          <div className={classes.contentTab1}>
            <CircularProgress size={50} className={classes.loaddingPage} />
          </div>
        </Master3Col>
      );
    }

    // permission rỗng
    if (permission === -1) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          breadcrumb="トップ ＞ ユーザー ＞ 取引先登録"
        >
          <div className={classes.contentTab1}>
            <Typography variant="h3" className={classes.notFound}>
              アクセス権がありません!
            </Typography>
          </div>
        </Master3Col>
      );
    }

    // get data survey not found
    if (surveyData === -1) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          breadcrumb="トップ ＞ ユーザー ＞ 取引先登録"
        >
          <div className={classes.blockStep}>
            <Typography variant="h4" className={classes.titleForm}>
              地盤安心住宅の申込み
            </Typography>
            <Typography className={classes.titleSubForm}>基本情報</Typography>
            {/* form survey */}
            <Typography variant="h3" className={classes.notFound}>
              Oops, something went wrong!
            </Typography>
          </div>
        </Master3Col>
      );
    }

    const { isValidationAll } = this.state;

    // điều kiện hiển group button draft
    let displayGroupDraft =
      surveyData &&
      (!surveyData.statusPublic || parseInt(surveyData.statusPublic) < 1)
        ? true
        : false;

    // trường hợp người tạo survey
    let displayBtnSave;
    if (surveyData && surveyData.userId === userInfo.userId) {
      // Survey đang là public + status là 1 -> 11 thì button là: 保存 (kiểu là lưu thay đổi)
      displayBtnSave =
        parseInt(surveyData.statusPublic) === 1 &&
        parseInt(surveyData.status) >= 1
          ? true
          : false;
    } else {
      // trường hợp người khảo sát
      // Survey đang là public + status là 1 thì button là: 保存 (kiểu là lưu thay đổi), 調査実施 (chuyển sang status 2)
      displayBtnSave =
        parseInt(surveyData.statusPublic) === 1 &&
        parseInt(surveyData.status) === 1
          ? true
          : false;
    }

    return (
      <Master3Col
        colLeft={null}
        colRight={null}
        breadcrumb="トップ ＞ ユーザー ＞ 取引先登録"
      >
        <Tabs
          value={tabIndex}
          onChange={this.changeTabSurvey}
          className={classes.rowBtnTab}
          classes={{
            indicator: classes.indicator,
            flexContainer: classes.flexContainer
          }}
        >
          <Tab
            label="申込書"
            classes={{
              selected: classes.select
            }}
          />
          <Tab
            disabled={this.state.isNew}
            label="調査報告書"
            classes={{
              selected: classes.select
            }}
          />
          <Tab
            disabled={this.state.isNew}
            label="解析報告書"
            classes={{
              selected: classes.select
            }}
          />
          <Tab
            disabled={this.state.isNew}
            label="解析・判定"
            classes={{
              selected: classes.select
            }}
          />
        </Tabs>
        {/* content tab 1 */}
        {tabIndex === 0 && (
          <div className={classes.contentTab1}>
            <div className={classes.colLeftSurvey}>
              <Scrollbars
                renderView={this.renderView}
                renderThumbVertical={this.renderThumbScroll}
                renderThumbHorizontal={props => (
                  <div {...props} style={{ display: "none" }} />
                )}
              >
                <LeftColum status={parseInt(status)} />
              </Scrollbars>
            </div>
            <div className={classes.colCenterSurvey}>
              <Scrollbars
                renderView={this.renderView}
                renderThumbVertical={this.renderThumbScroll}
                renderThumbHorizontal={props => (
                  <div {...props} style={{ display: "none" }} />
                )}
              >
                <Typography variant="h4" className={classes.titleForm}>
                  地盤安心住宅の申込み
                </Typography>
                <Typography className={classes.titleSubForm}>基本情報</Typography>
                {/* form survey */}
                <div className={classes.formCompany}>
                  <div className={classes.rowButtonSave}>
                    {/* btn xóa draft */}
                    {displayGroupDraft && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingSave || !surveyData.id}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnDeleteDraft}
                          onClick={() => this.handleDeleteDraft()}
                        >
                          削除
                        </Button>
                        {isLoaddingSave && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                    {/* btn save draft => lưu bản nháp => luôn active */}
                    {displayGroupDraft && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingSave}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnSaveDraft}
                          onClick={() => this.handleSaveDraftOrPublic("draft")}
                        >
                          保存
                        </Button>
                        {isLoaddingSave && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                    {/* btn public => public survey => active khi validation survey ok */}
                    {displayGroupDraft && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingSave || !isValidationAll}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnSave}
                          onClick={() => this.handleSaveDraftOrPublic("public")}
                        >
                          申込
                        </Button>
                        {isLoaddingSave && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                    {/* btn chuyển status === 2: Dc active btn khi survey đang public */}
                    {displayBtnSave && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingChangeStatus}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnSaveDraft}
                          onClick={() => this.changeStatusSurvey(2)}
                        >
                          調査実施
                        </Button>
                        {isLoaddingChangeStatus && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                    {/* btn save, update => active khi validation survey ok */}
                    {displayBtnSave && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingSave}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnSave}
                          onClick={() => this.handleSave("default")}
                        >
                          {/* 保存し、申込む */}
                          保存
                        </Button>
                        {isLoaddingSave && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div style={{ clear: "both" }} />
                  {/* acoordion 1 */}
                  <Acoordion1
                    isNew={this.state.isNew}
                    permission={permission}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 1 */}
                  {/* acoordion 2 */}
                  <Acoordion2
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 2 */}
                  {/* acoordion 3 */}
                  <Acoordion3
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 3 */}
                  {/* acoordion 4 */}
                  <Acoordion4
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 4 */}
                  {/* acoordion 5 */}
                  <Acoordion5
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 5 */}
                  {/* acoordion 6 */}
                  <Acoordion6
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 6 */}
                  {/* acoordion 7 */}
                  <Acoordion7
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 7 */}
                  {/* acoordion 8 */}
                  <Acoordion8
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 8 */}
                  {/* acoordion 9 */}
                  <Acoordion9
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 9 */}
                  {/* acoordion 10 */}
                  <Acoordion10
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 10 */}
                  {/* acoordion 11 */}
                  <Acoordion11
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 11 */}
                  {/* acoordion 12 */}
                  <Acoordion12
                    permission={permission}
                    isNew={this.state.isNew}
                    dataDetail={surveyData}
                    handleUpdate={this.handleUpdateField}
                  />
                  {/* end acoordion 12 */}

                  <div
                    className={classes.rowButtonSave}
                    style={{ margin: "15px 0 30px" }}
                  >
                    {/* btn xóa draft */}
                    {displayGroupDraft && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingSave || !surveyData.id}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnDeleteDraft}
                          onClick={() => this.handleDeleteDraft()}
                        >
                          削除
                        </Button>
                        {isLoaddingSave && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                    {/* btn save draft => lưu bản nháp => luôn active */}
                    {displayGroupDraft && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingSave}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnSaveDraft}
                          onClick={() => this.handleSaveDraftOrPublic("draft")}
                        >
                          保存
                        </Button>
                        {isLoaddingSave && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                    {/* btn public => public survey => active khi validation survey ok */}
                    {displayGroupDraft && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingSave || !isValidationAll}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnSave}
                          onClick={() => this.handleSaveDraftOrPublic("public")}
                        >
                          申込
                        </Button>
                        {isLoaddingSave && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                    {/* btn chuyển status === 2: Dc active btn khi survey đang public */}
                    {displayBtnSave && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingChangeStatus}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnSaveDraft}
                          onClick={() => this.changeStatusSurvey(2)}
                        >
                          調査実施
                        </Button>
                        {isLoaddingChangeStatus && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                    {/* btn save, update => active khi validation survey ok */}
                    {displayBtnSave && (
                      <div style={{ position: "relative" }}>
                        <Button
                          disabled={isLoaddingSave}
                          type="button"
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.btnSave}
                          onClick={() => this.handleSave("default")}
                        >
                          {/* 保存し、申込む */}
                          保存
                        </Button>
                        {isLoaddingSave && (
                          <CircularProgress
                            size={24}
                            className={classes.iconProgress}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Scrollbars>
            </div>
            <div className={classes.colRightSurvey}>
              <Scrollbars
                renderView={this.renderView}
                renderThumbVertical={this.renderThumbScroll}
                renderThumbHorizontal={props => (
                  <div {...props} style={{ display: "none" }} />
                )}
              >
                <RightColum data={dataColRight} userInfo={userInfo} />
              </Scrollbars>
            </div>
          </div>
        )}
        {/* end tab 1 */}
        {/* content tab 2 */}
        {tabIndex === 1 && (
          <div className={classes.contentTab2}>
            <RecordForm
              surveyId={surveyData && surveyData.id ? surveyData.id : null}
            />
          </div>
        )}
        {/* end tab 2 */}

        {/* content tab 2 */}
        {tabIndex === 2 && <span>Todo</span>}
        {/* end tab 2 */}

        {/* content tab 2 */}
        {tabIndex === 3 && <span>Todo</span>}
        {/* end tab 2 */}

        {/* Notification event */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={message ? true : false}
          autoHideDuration={6000}
          onClose={this.handleCloseNotification}
        >
          {message && (
            <Notification
              onClose={this.handleCloseNotification}
              variant={message.isError ? "error" : "success"}
              message={message.text}
            />
          )}
        </Snackbar>
        {/* End Notification event */}
      </Master3Col>
    );
  };
}

Survey.propTypes = {
  classes: PropTypes.object.isRequired,
  surveyProps: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};
const mapStateToProps = state => {
  const { surveyState } = state;
  return {
    surveyProps: surveyState
  };
};
export default withCookies(
  connect(mapStateToProps)(withRoot(withStyles(styles)(Survey)))
);
