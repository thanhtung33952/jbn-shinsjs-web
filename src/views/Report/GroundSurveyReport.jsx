import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import { matchPath } from "react-router";
import { Map, TileLayer, Marker } from "react-leaflet";
import axios from "axios";
import leafletImage from "leaflet-image";
import { getPostion } from "utils/common.js";
import { asyncForEach } from "utils/common.js";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import {
  Document,
  PDFDownloadLink,
  StyleSheet,
  PDFViewer
} from "@react-pdf/renderer";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// icon
import CloseIcon from "@material-ui/icons/Close";
import IconNext from "@material-ui/icons/ArrowRight";
import IconPrev from "@material-ui/icons/ArrowLeft";
// component custommer
import Master3Col from "layout/Master3Col.jsx";
import SurveyReportPage1 from "components/ReportSurvey/SurveyReportPage1.jsx";
import SurveyReportPage2 from "components/ReportSurvey/SurveyReportPage2.jsx";
import SurveyReportPage3 from "components/ReportSurvey/SurveyReportPage3.jsx";
import SurveyReportPage4 from "components/ReportSurvey/SurveyReportPage4.jsx";
import SurveyReportPage5 from "components/ReportSurvey/SurveyReportPage5.jsx";
import SurveyReportPage6 from "components/ReportSurvey/SurveyReportPage6.jsx";
import SurveyReportPage7 from "components/ReportSurvey/SurveyReportPage7.jsx";

// import SurveyReportPage8To17 from "components/ReportSurvey/SurveyReportPage8To17.jsx";
import SurveyReportPage8To17 from "components/ReportSurvey/SwedishSoundingTest.jsx"; // Hieu create new

import SurveyReportPage12 from "components/ReportSurvey/SurveyReportPage12.jsx";
import SurveyReportPage13 from "components/ReportSurvey/SurveyReportPage13.jsx";
import SurveyReportPage14_1 from "components/ReportSurvey/SurveyReportPage14_1.jsx";
import SurveyReportPage14_2 from "components/ReportSurvey/SurveyReportPage14_2.jsx";
import SurveyReportPage14_3 from "components/ReportSurvey/SurveyReportPage14_3.jsx";
import SurveyReportPage14_4 from "components/ReportSurvey/SurveyReportPage14_4.jsx";
// component Print pdf
import PrintReportPage1 from "components/ReportSurveyPrint/PrintReportPage1.jsx";
import PrintReportPage2 from "components/ReportSurveyPrint/PrintReportPage2.jsx";
import PrintReportPage3 from "components/ReportSurveyPrint/PrintReportPage3.jsx";
import PrintReportPage4 from "components/ReportSurveyPrint/PrintReportPage4.jsx";
import PrintReportPage5 from "components/ReportSurveyPrint/PrintReportPage5.jsx";
import PrintReportPage6 from "components/ReportSurveyPrint/PrintReportPage6.jsx";
import PrintReportPage7 from "components/ReportSurveyPrint/PrintReportPage7.jsx";
import PrintReportPage8To17 from "components/ReportSurveyPrint/PrintReportPage8To17.jsx";
import PrintReportPage13 from "components/ReportSurveyPrint/PrintReportPage13.jsx";
import PrintReportPage14 from "components/ReportSurveyPrint/PrintReportPage14.jsx";
// constant
import { apiRoot, folderRoot } from "constant/index.js";
// jss
// import styles from "assets/jss/views/styleSurveyReport.jsx";
const stylesPDF = StyleSheet.create({
  btnDownload: {
    color: "#fff",
    backgroundColor: "#1C1F1F",
    padding: "5px 10px",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "none",
    lineHeight: 1.75,
    borderRadius: 4,
    letterSpacing: "0.02857em",
    textDecoration: "none"
  }
});
const styles = {
  content: {
    padding: "0 20px"
  },
  errorPage: {
    border: "solid 1px darkslategrey",
    height: "calc(100vh - 104px)",
    textAlign: "center",
    "& h2": {
      fontSize: 35,
      marginTop: "100px"
    },
    "& svg": {
      color: "darkslategrey"
    }
  },
  loaddingPage: {
    marginTop: "calc(32% - 20px)"
  },
  pagination: {
    width: "calc(100% - 100px)",
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      // padding: "4px 0px",
      minWidth: 34,
      margin: "2px 0",
      borderRadius: 0
    }
  },
  activePage: {
    color: "#e58300",
    fontWeight: "bold"
  },
  btnExportPDF: {
    backgroundColor: "#292929",
    float: "right",
    color: "#fff",
    padding: "4px 15px !important",
    fontSize: 13,
    "&:hover": {
      backgroundColor: "#443838"
    }
  },
  rowBtnEvent: {
    position: "absolute",
    bottom: 15,
    right: 20,
    padding: 0,
    "& button": {
      padding: "5px 10px",
      fontSize: 12,
      width: 70,
      fontWeight: "bold",
      textTransform: "none"
    }
  },
  contentPDF: {
    height: 600,
    backgroundColor: "#DADCE0",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: "0 50px",
    "& p": {
      margin: "auto",
      textAlign: "center"
    }
  },
  btnSavePDF: {
    backgroundColor: "#2F4F4F",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#213838"
    }
  },
  btnCance: {
    backgroundColor: "#fff",
    color: "#2F4F4F",
    border: "solid 1px #cacaca"
  },
  paperDialog: {
    margin: 10,
    maxHeight: "calc(100% - 20px)"
  },
  contentDialog: {
    padding: 0,
    paddingTop: "0 !important",
    overflow: "hidden"
  },
  contentControl: {
    height: "100%",
    padding: 20
  },
  rowHorizon: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 25,
    "& $item1": {
      width: 150
    },
    "& $item2": {
      width: "100%",
      paddingLeft: 20
    }
  },
  item1: {},
  item2: {
    textAlign: "right"
  },
  formControlSelect: {
    width: "100%",
    "& select": {
      padding: "8px 10px",
      fontSize: 14,
      lineHeight: "15px",
      backgroundColor: "#F1F3F4"
    },
    "& fieldSet": {
      borderColor: "transparent"
    },
    "&:hover fieldSet": {
      borderColor: "#e6e6e6 !important"
    }
  },
  inputCustomPage: {
    backgroundColor: "#F1F3F4",
    marginTop: 8,
    borderRadius: 4,
    "& input": {
      fontSize: 14,
      padding: "8px 10px"
    }
  },
  map: {
    height: "100%",
    width: 602,
    marginTop: 10
  },
  thisInputError: {
    marginLeft: 0
  },
  btnMucluc: {
    backgroundColor: "#007C76",
    padding: "0 20px",
    height: 30,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#01524e"
    }
  },
  btnArrow: {
    backgroundColor: "#007C76",
    padding: 0,
    height: 30,
    color: "#fff",
    minWidth: "20px !important",
    margin: "2px !important",
    "&:hover": {
      backgroundColor: "#01524e"
    },
    "& svg": {
      fontSize: 30
    }
  },
  btnRedirect: {
    backgroundColor: "#007C76",
    padding: "0 20px",
    margin: 2,
    borderRadius: 0,
    height: 30,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#01524e"
    }
  },
  menuOptionLocation: {
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
    "& ul": {
      padding: 0
    }
  },
  headerMenu: {
    display: "flex",
    justifyContent: "space-between",
    "& span": {
      margin: "auto 15px",
      textAlign: "center",
      fontSize: 16,
      width: "100%"
    }
  },
  closeButton: {
    padding: 8,
    width: 40
  },
  btnDeleteNo: {
    padding: 0,
    width: 30,
    marginLeft: 5,
    background: "none !important",
    "& svg": {
      fontSize: 21,
      color: "#ad0000"
    },
    "&:hover svg": {
      color: "#ff0303"
    }
  },
  statusMenu: {
    display: "flex",
    justifyContent: "center",
    "& span": {
      margin: "0 5px",
      padding: "0 15px",
      height: 28,
      lineHeight: "26px",
      border: "solid 1px gray",
      width: 100,
      textAlign: "center",
      fontSize: 13
    },
    "& $activeStatus": {
      backgroundColor: "#00A89D",
      color: "#fff",
      borderColor: "#00A89D"
    }
  },
  activeStatus: {},
  listPage: {
    display: "flex",
    flexDirection: "column",
    margin: "15px 0"
  },
  checkbox: {
    padding: 0,
    marginRight: 10,
    "& *": {
      fontSize: 14
    },
    "& svg": {
      fontSize: 18
    }
  },
  rgCheckbox: {
    padding: "0 15px 0 10px",
    margin: "3px 0"
  },
  labelCheck: {
    fontSize: 13,
    cursor: "pointer"
  }
};

// array chỉ sử dụng để kiểm tra xem tại điểm (point no) nào đó có đủ 10 dòng dữ liệu không.
const rowDetailNo = [
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

// survey info by no new (khi click add new page thì thực hiện insert 1 survey info trống data xuống db luôn)
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
  surveyInfoNew[item]["penetration_amount"] = "";
  surveyInfoNew[item]["nws"] = "";
  surveyInfoNew[item]["sound_and_feel"] = "";
  surveyInfoNew[item]["intrusion_status"] = "";
  surveyInfoNew[item]["soil_name"] = "";
  surveyInfoNew[item]["conversion_N_value"] = "";
  surveyInfoNew[item]["allowable_bearing_capacity"] = "";
});
class GroundSurveyReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      resultApiPrint: 0,
      isPrint: false,
      pagePrint: "all",
      pageCustom: false,
      numberPagePrint: "",
      listPageExport: null,
      statusInputSelectPage: {
        error: false,
        message: ""
      },
      imgMapPage4: null,
      dataPage: {
        page1and2: { data: null, isNew: true },
        page3: { data: null, isNew: true },
        page4: { data: null, isNew: true },
        page5: { data: null, isNew: true },
        page6: { data: null, isNew: true },
        page7: { data: null, isNew: true },
        page8: { data: null, isNew: true },
        page131: null,
        page132: null,
        page141: { data: null, isNew: true },
        page142: { data: null, isNew: true },
        page143: { data: null, isNew: true },
        page144: { data: null, isNew: true }
      },
      arrNumberPage: [1, 2, 3, 4, 5, 6, 7],
      pageIndex: 1,
      isLoaddingPage: 0, // 0: loadding, 1: success, -1 : error not survey id
      surveyReportId: null,
      arrNo: [],
      isNew: true,
      statusPage: {
        page1: false,
        page2: false,
        page3: false,
        page4: false,
        page5: false,
        page6: false,
        // page 7 có 1 điểm no là 10 page để check status
        page7: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false
        },
        page131: false, // page chưa array No (hiển thị biểu đồ ngang)
        page132: false, // page chưa array No (hiển thị biểu đồ ngang)
        page141: false, // page hình ảnh đầu tiên trong 4 page cuối trang
        page142: false,
        page143: false,
        page144: false, // page hình ảnh cuối trong 4 page cuối trang
        page151: false, // array No (hiển thị biểu đồ ngang). page tạm thời chưa có chỉ thị xử lý
        page152: false // array No (hiển thị biểu đồ ngang). page tạm thời chưa có chỉ thị xử lý
      }
    };
    this.mapRef = React.createRef();
    // reference Marker
    this.markerRef = React.createRef();
  }
  componentDidMount = () => {
    document.title = "地盤調査報告書";
    let currentLocation = this.props.location.pathname;
    let match = matchPath(currentLocation, {
      path: `${folderRoot}ground-survey-report/:surveyreportid`,
      exact: true,
      strict: false
    });

    if (match !== null && match.params.surveyreportid) {
      this.setState({
        surveyReportId: match.params.surveyreportid
      });
      // kiểm trả xem survey này có tồn tại không
      this.isCheckSurveyById(match.params.surveyreportid);
    } else {
      // khoon ton tai survey id => falid
      this.setState({ surveyReportId: null });
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
      this.getDataSurveyReport(id);
      this.getStatusNoBySurveyId(id);
      this.setState({ isLoaddingPage: 1 });
    } catch (error) {
      this.setState({ isLoaddingPage: -1 });
      return;
    }
  };
  getDataSurveyReport = async id => {
    const { dataPage } = this.state;
    let countResultApi = 0;
    const resPage1and2 = await axios.get(
      `${apiRoot}/groundsurveyreport1and2/${id}`
    );
    const resPage4 = await axios.get(`${apiRoot}/groundsurveyreport4/${id}`);
    const resPage5 = await axios.get(`${apiRoot}/groundsurveyreport5/${id}`);
    const resPage6 = await axios.get(`${apiRoot}/groundsurveyreport6/${id}`);
    const resPage7 = await axios.get(`${apiRoot}/groundsurveyreport7/${id}`);
    const resPage14_1 = await axios.get(
      `${apiRoot}/groundsurveyreport14_1/${id}`
    );
    const resPage14_2 = await axios.get(
      `${apiRoot}/groundsurveyreport14_2/${id}`
    );
    const resPage14_3 = await axios.get(
      `${apiRoot}/groundsurveyreport14_3/${id}`
    );
    const resPage14_4 = await axios.get(
      `${apiRoot}/groundsurveyreport14_4/${id}`
    );

    // data page 1 and 2
    if (resPage1and2.status !== 200 || resPage1and2.data === false) {
      countResultApi++;
      dataPage.page1and2.data = {};
      this.setState({ dataPage }, () => this.checkStatusPage("page1and2"));
    } else {
      countResultApi++;
      dataPage.page1and2.data = resPage1and2.data;
      dataPage.page1and2.isNew = false;
      this.checkStatusPage("page1and2");
      this.setState({ dataPage }, () => this.checkStatusPage("page1and2"));
    }

    // data page 4
    if (resPage4.status !== 200 || resPage4.data === false) {
      countResultApi++;
      dataPage.page4.data = {};
      this.renderImgMapPage4();
      this.setState({ dataPage }, () => this.checkStatusPage("page4"));
    } else {
      countResultApi++;
      dataPage.page4.data = resPage4.data;
      dataPage.page4.isNew = false;
      this.setState({ dataPage }, () => {
        this.renderImgMapPage4();
        this.checkStatusPage("page4");
      });
    }

    // data page 5
    if (resPage5.status !== 200 || resPage5.data === false) {
      countResultApi++;
      dataPage.page5.data = {};
      this.setState({ dataPage }, () => this.checkStatusPage("page5"));
    } else {
      countResultApi++;
      dataPage.page5.data = resPage5.data;
      dataPage.page5.isNew = false;
      this.setState({ dataPage }, () => this.checkStatusPage("page5"));
    }
    // data page 6, 7
    if (
      resPage6.status === 200 &&
      resPage6.data &&
      resPage7.status === 200 &&
      resPage7.data
    ) {
      countResultApi += 2;
      dataPage.page6.data = resPage6.data;
      dataPage.page6.isNew = false;

      dataPage.page7.data = resPage7.data;
      dataPage.page7.isNew = false;
      this.setState({ dataPage }, () => this.checkStatusPage("page6"));
    } else {
      countResultApi += 2;
      dataPage.page6.data = {};

      dataPage.page7.data = {};
      this.setState({ dataPage });
      this.changeStatusPage("page6", false);
    }
    // data page 6
    // if (resPage6.status !== 200 || resPage6.data === false) {
    //   countResultApi++;
    //   dataPage.page6.data = {};
    //   this.setState({ dataPage });
    //   this.changeStatusPage("page6", false);
    // } else {
    //   countResultApi++;
    //   dataPage.page6.data = resPage6.data;
    //   dataPage.page6.isNew = false;
    //   this.setState({ dataPage }, () => this.checkStatusPage("page6"));
    // }

    // // data page 7
    // if (resPage7.status !== 200 || resPage7.data === false) {
    //   countResultApi++;
    //   dataPage.page7.data = {};
    //   this.setState({ dataPage });
    //   this.changeStatusPage("page6", false);
    // } else {
    //   countResultApi++;
    //   dataPage.page7.data = resPage7.data;
    //   dataPage.page7.isNew = false;
    //   this.setState({ dataPage }, () => this.checkStatusPage("page6"));
    // }

    // data page 14_1
    if (resPage14_1.status !== 200 || resPage14_1.data === false) {
      countResultApi++;
      dataPage.page141.data = {};
      this.setState({ dataPage }, () => this.checkStatusPage("page141"));
    } else {
      countResultApi++;
      dataPage.page141.data = resPage14_1.data;
      dataPage.page141.isNew = false;
      this.setState({ dataPage }, () => this.checkStatusPage("page141"));
    }
    // data page 14_2
    if (resPage14_2.status !== 200 || resPage14_2.data === false) {
      countResultApi++;
      dataPage.page142.data = {};
      this.setState({ dataPage }, () => this.checkStatusPage("page142"));
    } else {
      countResultApi++;
      dataPage.page142.data = resPage14_2.data;
      dataPage.page142.isNew = false;
      this.setState({ dataPage }, () => this.checkStatusPage("page142"));
    }
    // data page 14_3
    if (resPage14_3.status !== 200 || resPage14_3.data === false) {
      countResultApi++;
      dataPage.page143.data = {};
      this.setState({ dataPage }, () => this.checkStatusPage("page143"));
    } else {
      countResultApi++;
      dataPage.page143.data = resPage14_3.data;
      dataPage.page143.isNew = false;
      this.setState({ dataPage }, () => this.checkStatusPage("page143"));
    }
    // data page 14_4
    if (resPage14_4.status !== 200 || resPage14_4.data === false) {
      countResultApi++;
      dataPage.page144.data = {};
      this.setState({ dataPage }, () => this.checkStatusPage("page144"));
    } else {
      countResultApi++;
      dataPage.page144.data = resPage14_4.data;
      dataPage.page144.isNew = false;
      this.setState({ dataPage }, () => this.checkStatusPage("page144"));
    }
    setTimeout(() => {
      this.setState({ resultApiPrint: countResultApi });
    }, 1000);
  };
  renderPage13And14ByListNo = async id => {
    const { dataPage } = this.state;

    const checkPage1 = await this.getNoByStt(id, 1);
    const checkPage2 = await this.getNoByStt(id, 6);
    // error
    if (checkPage2) {
      // get data print pdf cho page 132
      let dataPage132 = await this.getSurveyInfoBySurveyIdAndStt(id, 6);
      if (dataPage132 && dataPage132.length > 0) {
        dataPage.page132 = dataPage132;
        this.setState({ dataPage });
      }
    }
    if (checkPage1) {
      // get data print pdf cho page 131
      let dataPage131 = await this.getSurveyInfoBySurveyIdAndStt(id, 1);
      if (dataPage131 && dataPage131.length > 0) {
        dataPage.page131 = dataPage131;
        this.setState({ dataPage });
      }
    } else {
      // set true cho page 131 chỗ này để trường hợp không có point No nào nó vẫn hiện trang 131 nhưng vào trang chỉ có title thôi
      dataPage.page131 = true;
      this.setState({ dataPage });
    }
  };
  getSurveyInfoBySurveyIdAndStt = async (id, stt) => {
    // stt tới đây sẽ là luôn tồn tại ở 2 giá trị (1,6) nên không cần check null
    let arrStt = stt === 1 ? [1, 2, 3, 4, 5] : [6, 7, 8, 9, 10]; // for arrStt này để get surveyInfo theo số thứ tự
    let arrData = [];
    await asyncForEach(arrStt, async item => {
      let dataSurveyInfo = await this.getNoByStt(id, item);
      if (!dataSurveyInfo) {
        return;
      }
      arrData.push(dataSurveyInfo);
    });
    return arrData;
  };
  getNoByStt = async (surveyId, stt) => {
    const res = await axios.get(
      `${apiRoot}/groundsurveyreport13/${surveyId}?number=${stt}`
    );
    // error
    if (!res.data || res.status !== 200) {
      return false;
    }
    return res.data;
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
    // check status page 8-17
    this.checkStatusPage8And17(res.data.details);
    // end check status page 8-17
    let newArrno = [];
    if (parseInt(data.maxNoActive) > 5) {
      for (let i = 1; i <= parseInt(data.maxNoActive); i++) {
        newArrno.push(i);
      }
    } else {
      newArrno = [1, 2, 3, 4, 5];
    }
    this.setState({ arrNo: newArrno }, () =>
      this.renderPage13And14ByListNo(id)
    );

    // if (parseInt(data.maxNoActive) > 5) {
    //   for (let i = 1; i <= parseInt(data.maxNoActive); i++) {
    //     newArrNo.push(i);
    //   }
    // } else {
    //   arrNo = [1, 2, 3, 4, 5];
    // }
    // this.setState({
    //   arrStatusNo: data.details,
    //   maxNoActive: data.maxNoActive,
    //   arrNo: arrNo
    // });

    // let newArrNumberPage = [];
    // // 9 ở đây là : 7(page 1->7) + 1 ( 1 page cuối )
    // for (let i = 1; i <= 8 + parseInt(data.details.length); i++) {
    //   newArrNumberPage.push(i);
    // }
    // this.setState(
    //   {
    //     arrNumberPage: newArrNumberPage
    //     // arrNo: data.details
    //   },
    //   // kiểm tra có bao nhiêu No để chia page13 => nếu totle No > 5 thì có page 14 tương tự page 13
    //   () => this.renderPage13And14ByListNo(id)
    // );
  };

  handleClosePrint = () => {
    this.setState({ isPrint: false });
  };
  handleChangeTypePrintPage = name => event => {
    // const { statusInputSelectPage } = this.state;
    this.setState({ [name]: event.target.value });
    if (event.target.value === "custom") {
      this.setState({ pageCustom: true });
    } else {
      this.setState({ numberPagePrint: "", listPageExport: null });
    }
  };

  handleChangeDataPage = (page, name, value) => {
    const { dataPage } = this.state;
    dataPage[page][`data`][name] = value;
    this.setState({ dataPage });
    if (page === "page4") {
      setTimeout(() => {
        this.renderImgMapPage4();
      }, 500);
    }
    this.checkStatusPage(page);
  };
  updateStatusPageRead = page => {
    this.changeStatusPage([page], true);
  };
  handleChangeModePage = (page, modePage) => {
    const { dataPage } = this.state;
    dataPage[page].isNew = modePage;
    this.setState({ dataPage });
  };
  renderImgMapPage4 = () => {
    this.setState({ imgMapPage4: null });
    const map = this.mapRef.current;
    let mapAPI = map.leafletElement;
    let currentComponent = this;
    leafletImage(mapAPI, function(err, canvas) {
      var img = document.createElement("img");
      var dimensions = mapAPI.getSize();
      img.width = dimensions.x;
      img.height = dimensions.y;
      img.src = canvas.toDataURL();
      if (img.src) {
        currentComponent.setState({ imgMapPage4: img.src });
      }
    });
  };

  getPageRenderPDF = e => {
    const { statusInputSelectPage, pageCustom, arrNumberPage } = this.state;
    let arrPageRender = [];
    let value = e.target.value;
    this.setState({ numberPagePrint: value });
    if (pageCustom && value) {
      let arrPage = value.split(",");
      arrPage.forEach(item => {
        if (isNaN(item)) {
          // khong phải số, có thể là kiểu 1-6
          let arrPageChild = item.split("-");

          if (arrPageChild.length === 2) {
            // tức là phai thuộc dạng 1-5
            if (isNaN(arrPageChild[0]) || isNaN(arrPageChild[1])) {
              // error // vì không phải là 1 số
              statusInputSelectPage.error = true;
              statusInputSelectPage.message = "Invalid data";
              this.setState({ statusInputSelectPage });
              arrPageRender = false;
              return;
            } else if (parseInt(arrPageChild[0]) < parseInt(arrPageChild[1])) {
              // page start phải nhở hơn page end
              for (
                let i = parseInt(arrPageChild[0]);
                i <= parseInt(arrPageChild[1]);
                i++
              ) {
                arrPageRender.push(i);
              }
            } else {
              statusInputSelectPage.error = true;
              statusInputSelectPage.message = "Invalid data";
              this.setState({ statusInputSelectPage });
              arrPageRender = false;
              return;
            }
          } else {
            // error // vì không thuộc dạng 1-5
            statusInputSelectPage.error = true;
            statusInputSelectPage.message = "Invalid data";
            this.setState({ statusInputSelectPage });
            arrPageRender = false;
            return;
          }
        } else {
          // nếu là số có thì có thể nằm trong dạng này 1,2,5,8
          statusInputSelectPage.error = false;
          statusInputSelectPage.message = "";
          this.setState({ statusInputSelectPage });
          arrPageRender.push(parseInt(item));
        }
      });
    }
    if (!arrPageRender || arrPageRender.length === 0) {
      this.setState({ listPageExport: null });
      return;
    }
    // check xem có page nào lớn hơn page đang tồn tại không
    if (Math.max(...arrPageRender) > arrNumberPage.length) {
      statusInputSelectPage.error = true;
      statusInputSelectPage.message = "The page range is invalid";
      this.setState({ statusInputSelectPage });
      arrPageRender = false;
      return;
    } else {
      // xử lý bỏ các page trùng lặp trong arr đã tính toán dc
      let arrPageRenderNew =
        arrPageRender &&
        arrPageRender.filter(
          (item, index) => arrPageRender.indexOf(item) === index
        );
      statusInputSelectPage.error = false;
      statusInputSelectPage.message = "";
      this.setState({ statusInputSelectPage });
      this.setState({ listPageExport: arrPageRenderNew });
    }
  };
  findPage13 = numberPage => {
    const { arrNumberPage } = this.state;
    let isExit = arrNumberPage.findIndex(item => item.idPage === numberPage);
    if (isExit === -1) {
      return false;
    } else return true;
  };

  // show mục lục
  showMucluc = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };
  // close menu mục lục
  handleCloseMucluc = () => {
    this.setState({ anchorEl: null });
  };

  // change status page
  changeStatusPage = (namePage, isStatus) => {
    // console.log(namePage, isStatus);
    const { statusPage } = this.state;
    statusPage[namePage] = isStatus;
    this.setState({ statusPage });
  };
  checkStatusPage = namePage => {
    const { dataPage } = this.state;
    const dataCheck = dataPage[namePage].data;
    // console.log(`${namePage}`, dataCheck);
    // status page 1 and 2
    if (namePage === "page1and2") {
      // page 1
      let isCheck1 = true;
      if (!dataCheck["property_name"] || !dataCheck["survey_date"]) {
        isCheck1 = false;
      }
      this.changeStatusPage("page1", isCheck1);
      // page 2
      let page2fields = [
        "property_name",
        "survey_site",
        "survey_date",
        "survey_equipment",
        "person_in_charge"
      ];
      let isCheck2 = true;
      page2fields.forEach(field => {
        if (!dataCheck[field]) {
          isCheck2 = false;
        }
      });
      this.changeStatusPage("page2", isCheck2);
    }
    // page4
    if (namePage === "page4") {
      let page4fields = ["temporary_address", "final_address", "coordinates"];
      let isCheck4 = true;
      page4fields.forEach(field => {
        if (!dataCheck[field]) {
          isCheck4 = false;
        }
      });
      this.changeStatusPage("page4", isCheck4);
    }
    // page 5
    if (namePage === "page5") {
      let page5fields = [
        "file",
        "e_adjacent_ground_level_difference",
        "e_retaining_wall",
        "e_type",
        "e_distance",
        "w_adjacent_ground_level_difference",
        "w_retaining_wall",
        "w_type",
        "w_distance",
        "s_adjacent_ground_level_difference",
        "s_retaining_wall",
        "s_type",
        "s_distance",
        "n_adjacent_ground_level_difference",
        "n_retaining_wall",
        "n_type",
        "n_distance"
      ];
      let isCheck5 = true;
      page5fields.forEach(field => {
        if (!dataCheck[field]) {
          isCheck5 = false;
        }
      });
      this.changeStatusPage("page5", isCheck5);
    }
    // page 6
    if (namePage === "page6" || namePage === "page7") {
      const dataCheck6 = dataPage.page6.data;
      const dataCheck7 = dataPage.page7.data;
      if (!dataCheck6 || !dataCheck7) {
        this.changeStatusPage("page6", isCheck6);
        return;
      }
      // VALIDATION PAGE 6
      // field này có dạng ["", "", 0, 0, 0, 0, ""] nên check từng item
      let style1FieldP6 = [
        "rivers_and_irrigation_canals_0",
        "rivers_and_irrigation_canals_1",
        "rivers_and_irrigation_canals_2"
      ];
      // field này có dạng [0, 0,... ""] nên check từng item
      let style2FieldP6 = [
        "overview_abnormal_1",
        "overview_abnormal_3",
        "adjacent_land"
      ];
      // field này có dạng "val, val, val"... chỉ cần check field có data là dc
      let style3FieldP6 = [
        "survey_topography",
        "surrounding_buildings",
        "overview_abnormal_0",
        "overview_abnormal_2",
        "crack",
        "deflection",
        "slope",
        "pavement",
        "abnormal"
      ];
      let isCheck6 = true;

      // check điều kiện field loại 3
      style3FieldP6.forEach(field => {
        if (!dataCheck6[field]) {
          isCheck6 = false;
          return;
        }
      });
      // check điều kiện field loại 2  [0, 0,... ""]
      style2FieldP6.forEach(field => {
        if (!dataCheck6[field]) {
          isCheck6 = false;
          return;
        } else {
          let dataChildCheck = dataCheck6[field].split(",");
          //
          let ab = 0;
          if (dataChildCheck[dataChildCheck.length - 1]) {
            ab += 1;
          }
          dataChildCheck.forEach((e, i) => {
            if (
              dataChildCheck[i] &&
              parseInt(dataChildCheck[i]) !== 0 &&
              i !== dataChildCheck.length - 1
            ) {
              ab += 1;
            }
          });
          if (ab > 0) {
            return;
          } else {
            isCheck6 = false;
            return;
          }
        }
      });
      // check điều kiện field loại 1  ["", "", 0, 0, 0, 0, ""]
      style1FieldP6.forEach(field => {
        if (!dataCheck6[field]) {
          isCheck6 = false;
          return;
        } else {
          let dataChildCheck1 = dataCheck6[field].split(",");
          //
          let ab = 0;
          if (dataChildCheck1[0]) {
            ab += 1;
          }
          if (dataChildCheck1[1]) {
            ab += 1;
          }
          if (dataChildCheck1[dataChildCheck1.length - 1]) {
            ab += 1;
          }

          dataChildCheck1.forEach((e, i) => {
            if (
              dataChildCheck1[i] &&
              parseInt(dataChildCheck1[i]) !== 0 &&
              i !== dataChildCheck1.length - 1 &&
              i !== 0 &&
              i !== 1
            ) {
              ab += 1;
            }
          });
          if (ab > 0) {
            return;
          } else {
            isCheck6 = false;
            return;
          }
        }
      });

      // VALIDATION PAGE 7

      let isCheck7 = true;
      let style1FieldP7 = [
        "creation_status",
        "ground_surface",
        "underground_objects",
        "current_situation",
        "existing_building1",
        "existing_building3",
        "carry_in4"
      ];
      let style2FieldP7 = [
        "soil_quality",
        "moisture_content",
        "existing_building0",
        "existing_building2",
        "crack",
        "deflection",
        "slope",
        "carry_in0",
        "carry_in1",
        "carry_in2",
        "carry_in3"
      ];

      // check điều kiện field loại 2
      style2FieldP7.forEach(field => {
        if (!dataCheck7[field]) {
          isCheck7 = false;
          return;
        }
      });
      // check điều kiện field loại 1  [0, 0,... ""]
      style1FieldP7.forEach(field => {
        if (!dataCheck7[field]) {
          isCheck7 = false;
          return;
        } else {
          let dataChildCheck = dataCheck7[field].split(",");
          //
          let ab = 0;
          if (dataChildCheck[dataChildCheck.length - 1]) {
            ab += 1;
          }
          dataChildCheck.forEach((e, i) => {
            if (
              dataChildCheck[i] &&
              parseInt(dataChildCheck[i]) !== 0 &&
              i !== dataChildCheck.length - 1
            ) {
              ab += 1;
            }
          });
          if (ab > 0) {
            return;
          } else {
            isCheck7 = false;
            return;
          }
        }
      });

      // console.log(isCheck6, isCheck7);
      this.changeStatusPage("page6", isCheck6 && isCheck7 ? true : false);
    }
    // page 141
    if (namePage === "page141") {
      let page144fields = [
        "front_road_east_side",
        "front_road_south_side",
        "western_border",
        "east_border",
        "southern_boundary",
        "north_border"
      ];
      let isCheck141 = true;
      page144fields.forEach(field => {
        if (!dataCheck[field]) {
          isCheck141 = false;
        }
      });
      this.changeStatusPage("page141", isCheck141);
    }
    // page 142
    if (namePage === "page142") {
      let page142fields = [
        "south_west",
        "south_east",
        "north_west",
        "north_east",
        "check_direction",
        "TBM"
      ];
      let isCheck142 = true;
      page142fields.forEach(field => {
        if (!dataCheck[field]) {
          isCheck142 = false;
        }
      });
      this.changeStatusPage("page142", isCheck142);
    }
    // page 143
    if (namePage === "page143") {
      let page143fields = [
        "screw_point",
        "station_1",
        "station_2",
        "station_3",
        "station_4",
        "station_5"
      ];
      let isCheck143 = true;
      page143fields.forEach(field => {
        if (!dataCheck[field]) {
          isCheck143 = false;
        }
      });
      this.changeStatusPage("page143", isCheck143);
    }
    // page 144
    if (namePage === "page144") {
      let page144fields = [
        "west_area",
        "around_the_east_side",
        "around_the_south_side",
        "north_side"
      ];
      let isCheck144 = true;
      page144fields.forEach(field => {
        if (!dataCheck[field]) {
          isCheck144 = false;
        }
      });
      this.changeStatusPage("page144", isCheck144);
    }
  };

  // kiểm tra status page 8-17 khi mới vào trang
  checkStatusPage8And17 = async dataNo => {
    const { statusPage } = this.state;
    if (
      !dataNo ||
      dataNo.length === 0 ||
      (dataNo.final_penetration_depth && isNaN(dataNo.final_penetration_depth))
    ) {
      return;
    }
    if (!dataNo || dataNo.length === 0) return;
    // loop qua arrNo => lấy data detail từng No.
    await asyncForEach(dataNo, async no => {
      let dataDetail = await this.getDataDetailByNo(no);
      // console.log(dataDetail)
      // nếu không lấy dc detail No xem như page đó chưa có data
      if (!dataDetail) {
        statusPage.page7[no] = false;
        this.setState({ statusPage });
        return;
      } else {
        // detail No có data => check xem có đủ 10 row có data không

        // arrOut: khi check thì các field này sẽ bị loại trừ khi loop qua detail của No
        let arrOut = [
          "id",
          "survey_name",
          "survey_location",
          "hole_mouth_elevation",
          "remarks",
          "station_number",
          "survey_date",
          "final_penetration_depth",
          "tester"
        ];
        let successRow = 0;
        // Số dòng cần phải check
        let numberRowValidation =
          parseFloat(dataDetail.final_penetration_depth) / 0.25;

        for (let key in dataDetail) {
          // dataDetail[key] là lớp data[0.25], data[0.50]...
          if (arrOut.indexOf(key) === -1 && dataDetail[key]) {
            // nếu dataDetail[key] có data thì tiếp tục loop qua các field bên trong.
            for (let keyChild in dataDetail[key]) {
              // nếu có 1 field có data thì row (0.25 ....) đó sẽ có data
              if (dataDetail[key][keyChild]) {
                successRow = successRow + 1;
                break;
              }
            }
          }
          // nếu đã đủ 10 dòng có dữ liệu thì không cần kiểm tra detail No này
          if (successRow === parseInt(numberRowValidation)) {
            break;
          }
        }
        statusPage.page7[no] =
          successRow === parseInt(numberRowValidation) ? true : false;
        this.setState({ statusPage });
      }
    });
  };

  // update status page 8-17
  updateStatusPageByNo = item => {
    const { statusPage } = this.state;
    if (!item) return;
    statusPage.page7[item.pageByNo] = item.finish;
    this.setState({ statusPage });
  };

  // lấy detail data No để check xem nếu hơn 10 dòng dữ liệu thì status hoàn thành được bật
  getDataDetailByNo = async no => {
    const { surveyReportId } = this.state;
    try {
      const res = await axios.get(
        `${apiRoot}/groundsurveyreport8to12/${surveyReportId}?no=${no}`
      );
      // api faild
      if (res.status !== 200) {
        return null;
      }
      // api success
      return res.data;
    } catch (error) {
      return null;
    }
  };

  // XÓa page point theo No
  handleDeletePointByNo = async No => {
    const { arrNo, surveyReportId } = this.state;
    let arrNoClone = cloneDeep(arrNo);
    let indexNo = arrNoClone.indexOf(No);
    // let indexNoStatus = arrStatusNo.indexOf(no.toString());
    if (!indexNo === -1) return;
    // // show confirm
    let answerDelete = window.confirm(`${No}測定点を削除しますか？`);

    // // select no delete
    if (!answerDelete) return;
    // // yes delete

    // xóa No chưa được save
    let arrNoNew = [];
    arrNoClone.splice(indexNo, 1);
    arrNoClone.map(item => {
      if (item < No) {
        arrNoNew.push(item);
      } else {
        arrNoNew.push(item - 1);
      }
    });
    this.setState({ arrNo: arrNoNew });
    // Xóa no on database
    this.deleteNoBySurveyId(No);
    // console.log(arrNoNew);

    // console.log(Math.max(...arrNo))
    // let newNoSelect = no === Math.max(...arrNo) ? Math.max(...arrNo) - 1 : no;
    // this.setState({ noSelect: newNoSelect });

    // if (no === parseInt(maxNoActive)) {
    //   arrStatusNoClone.splice(indexNoStatus, 1);
    //   arrStatusNoNew = arrStatusNoClone;
    //   // set lại maxNoactive
    //   let maxNoNew = 0;
    //   arrStatusNoNew.map(item => {
    //     if (parseInt(item) > maxNoNew) {
    //       maxNoNew = parseInt(item);
    //     }
    //   });
    //   this.setState({ maxNoActive: maxNoNew });
    // } else {
    //   // console.log("indexNo:" + indexNoStatus)
    //   if (indexNoStatus !== -1) {
    //     arrStatusNoClone.splice(indexNoStatus, 1);
    //   }
    //   arrStatusNoClone.map(item => {
    //     if (parseInt(item) < no) {
    //       arrStatusNoNew.push(item.toString());
    //     } else {
    //       arrStatusNoNew.push((item - 1).toString());
    //     }
    //   });
    // }
    // this.deleteNoBySurveyId(no);
    // end xóa No
    // this.setState({ arrNo: arrNoNew, arrStatusNo: arrStatusNoNew });
    // Xóa no on database
    // this.deleteNoBySurveyId(no, newNoSelect);
  };
  deleteNoBySurveyId = async No => {
    const res = await axios.delete(
      `${apiRoot}/surveyinfo/${this.state.surveyReportId}`,
      {
        data: {
          measurement_point_no: No
        }
      }
    );

    // Failed
    if (res.status !== 200) {
      return;
    }
    // success
    window.location.reload(false);
  };
  // select active page
  selectPage = (page, title) => {
    document.title = "地盤調査報告書 - " + title;
    this.setState({ pageIndex: page, anchorEl: null });
  };

  // add new point no survey
  addNewPoinNo = async () => {
    const { arrNo } = this.state;
    if (arrNo.length >= 10) return;
    // this.setState(prevState => ({
    //   arrNo: [...prevState.arrNo, arrNo.length + 1],
    //   pageIndex: arrNo.length + 1 + 6
    // }));
    this.insertSurveyInfo(arrNo.length + 1);
  };
  insertSurveyInfo = async no => {
    const { surveyReportId, arrNo } = this.state;
    let newSurveyInfoNew = cloneDeep(surveyInfoNew);
    newSurveyInfoNew.measurement_point_no = no;
    if (!surveyReportId) return;

    let dataInsert = { ...newSurveyInfoNew, survey_id: surveyReportId };
    dataInsert.weather = dataInsert.weather.toString();
    dataInsert.measurement_content = dataInsert.measurement_content.toString();

    // console.log(dataInsert);
    try {
      const res = await axios.post(`${apiRoot}/surveyinfo`, dataInsert);

      // Failed
      if (res.status !== 200) {
        return;
      }
      // Success
      this.setState(prevState => ({
        arrNo: [...prevState.arrNo, no],
        pageIndex: arrNo.length + 1 + 6
      }));
      return true;
    } catch (error) {
      return;
    }
  };
  render = () => {
    const { classes } = this.props;
    // console.log(statusPagePoint)
    const {
      statusInputSelectPage,
      dataPage,
      arrNumberPage,
      pageIndex,
      surveyReportId,
      arrNo,
      resultApiPrint,
      isPrint,
      pagePrint,
      listPageExport,
      pageLayout,
      anchorEl,
      statusPage,
      isLoaddingPage
    } = this.state;
    // console.log(dataPage.page131);
    // open menu mục lục
    const openMucluc = Boolean(anchorEl);
    // render map page 4 cho file pdf
    const defaultPosition = getPostion("35.68089", "139.76749");
    // center position
    const latLng =
      dataPage.page4.data && dataPage.page4.data.coordinates
        ? dataPage.page4.data.coordinates.split(",")
        : null;
    let centerPosition = latLng ? getPostion(latLng[0], latLng[1]) : null;
    centerPosition = centerPosition ? centerPosition : defaultPosition;
    // marker position
    let markerPosition = latLng ? getPostion(latLng[0], latLng[1]) : null;
    markerPosition = markerPosition ? markerPosition : defaultPosition;
    // zoom map
    let zoom =
      dataPage.page4.data && dataPage.page4.data.zoom
        ? dataPage.page4.data.zoom
        : 14;
    // end render map page 4 cho file pdf
    // set width pagination
    let arrWidthPage13 = [1, 2, 3, 4, 5, 6, 7, 131, 132, arrNumberPage.length];
    let widthPagina =
      arrWidthPage13.indexOf(
        pageIndex.idPage ? pageIndex.idPage : pageIndex
      ) !== -1
        ? "calc(100% - 100px)"
        : "calc(100% - 230px)";
    // set width all page
    let widthPage = "100%";
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
          maxWidthPage={widthPage}
          breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541 　　▶︎ 調査発注会社：〇〇会社　　▶︎ 発注担当者：〇〇"
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
          maxWidthPage={widthPage}
          titleHeader="地盤調査報告書"
          breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541 　　▶︎ 調査発注会社：〇〇会社　　▶︎ 発注担当者：〇〇"
        >
          <div className={classes.errorPage}>
            <Typography component="h2">Oops, something went wrong!</Typography>
          </div>
        </Master3Col>
      );
    }
    let pageAll = (
      <Document style={styles.document}>
        <PrintReportPage1 dataRender={dataPage.page1and2.data} />
        <PrintReportPage2 dataRender={dataPage.page1and2.data} />
        <PrintReportPage3 />
        <PrintReportPage4
          dataRender={dataPage.page4.data}
          imgMap={this.state.imgMapPage4}
        />
        <PrintReportPage5 dataRender={dataPage.page5.data} />
        <PrintReportPage6 dataRender={dataPage.page6.data} />
        <PrintReportPage7 dataRender={dataPage.page7.data} />
        {arrNo[0] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[0]} />
        )}
        {arrNo[1] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[1]} />
        )}
        {arrNo[2] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[2]} />
        )}
        {arrNo[3] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[3]} />
        )}
        {arrNo[4] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[4]} />
        )}
        {arrNo[5] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[5]} />
        )}
        {arrNo[6] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[6]} />
        )}
        {arrNo[7] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[7]} />
        )}
        {arrNo[8] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[8]} />
        )}
        {arrNo[9] && (
          <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[9]} />
        )}
        {this.findPage13(131) && dataPage.page131.data && (
          <PrintReportPage13 dataRender={dataPage.page131.data} />
        )}
        {this.findPage13(132) && dataPage.page132.data && (
          <PrintReportPage13 dataRender={dataPage.page132.data} />
        )}
        <PrintReportPage14 dataRender={dataPage.page141.data} />
      </Document>
    );
    // console.log(pageAll);
    let pageSelect;
    // let pdfRender = allPage;
    if (listPageExport && !statusInputSelectPage.error) {
      let filterPage = listPageExport.map((numberPage, i) => {
        if (numberPage === 1) {
          return (
            <PrintReportPage1 dataRender={dataPage.page1and2.data} key={i} />
          );
        }
        if (numberPage === 2) {
          return (
            <PrintReportPage1 dataRender={dataPage.page1and2.data} key={i} />
          );
        }
        if (numberPage === 3) {
          return <PrintReportPage3 key={i} />;
        }
        if (numberPage === 4) {
          return (
            <PrintReportPage4
              dataRender={dataPage.page4.data}
              imgMap={this.state.imgMapPage4}
              key={i}
            />
          );
        }
        if (numberPage === 5) {
          return <PrintReportPage5 dataRender={dataPage.page5.data} />;
        }
        if (numberPage === 6) {
          return <PrintReportPage6 dataRender={dataPage.page6.data} />;
        }
        if (numberPage === 7) {
          return <PrintReportPage7 dataRender={dataPage.page7.data} />;
        }
        if (numberPage === 8 && arrNo[0]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[0]} />
          );
        }
        if (numberPage === 9 && arrNo[1]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[1]} />
          );
        }
        if (numberPage === 10 && arrNo[2]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[2]} />
          );
        }
        if (numberPage === 11 && arrNo[3]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[3]} />
          );
        }
        if (numberPage === 12 && arrNo[4]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[4]} />
          );
        }
        if (numberPage === 13 && arrNo[5]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[5]} />
          );
        }
        if (numberPage === 14 && arrNo[6]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[6]} />
          );
        }
        if (numberPage === 15 && arrNo[7]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[7]} />
          );
        }
        if (numberPage === 16 && arrNo[8]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[8]} />
          );
        }
        if (numberPage === 17 && arrNo[9]) {
          return (
            <PrintReportPage8To17 surveyId={surveyReportId} no={arrNo[9]} />
          );
        }
        if (
          (this.findPage13(131) &&
            numberPage === arrNumberPage.length - 1 &&
            !this.findPage13(132)) ||
          (this.findPage13(131) &&
            numberPage === arrNumberPage.length - 2 &&
            this.findPage13(132))
        ) {
          return <PrintReportPage13 dataRender={dataPage.page131.data} />;
        }
        if (
          this.findPage13(132) &&
          numberPage === arrNumberPage.length - 1 &&
          this.findPage13(131)
        ) {
          return <PrintReportPage13 dataRender={dataPage.page132.data} />;
        }
        if (numberPage === arrNumberPage.length) {
          return <PrintReportPage14 dataRender={dataPage.page141.data} />;
        }
        if (numberPage === arrNumberPage.length) {
          return <PrintReportPage14 dataRender={dataPage.page141.data} />;
        }
      });
      pageSelect = <Document style={styles.document}>{filterPage}</Document>;
    }

    let numberPagePrint =
      listPageExport && !statusInputSelectPage.error
        ? listPageExport.length
        : arrNumberPage.length;

    // total page 13, 14 ( page render bieu do )
    let total13 = 0;
    if (dataPage.page131) {
      total13 = total13 + 2; // + 2 là do có 1 page mới gióng page 13 đang để tạm thời chưa có yêu cầu làm chi tiết
    }
    if (dataPage.page131 && dataPage.page132) {
      total13 = 4;
    }
    // status toàn trang
    let isFinishAllPage = true;
    for (let keyS in statusPage) {
      if (!statusPage[keyS]) {
        isFinishAllPage = false;
        break;
      }

      // data status page 7 {1: false, 2: true...}
      if (keyS === "page7") {
        for (let keyS7 in statusPage[keyS]) {
          // keyS7 là number mặc định thứ tự tăng dần bắt đầu từ 1, nên dùng keys7 luôn để kiểm tra xem No theo thứ tự tương ứng (keyS7 -1: ) ->
          // tiếp câu trên: trong arrNo có tồn tại page này không.
          if (arrNo[keyS7 - 1]) {
            // nếu tồn tại page theo No này -> mới check xem status page theo No này đã finish chưa
            if (!statusPage[keyS][keyS7]) {
              isFinishAllPage = false;
              break;
            }
          }
        }
      }
    }

    // render menu page 7-11...
    let menuPage7ZTo11More = arrNo;
    return (
      <React.Fragment>
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={widthPage}
          titleHeader="地盤調査報告書"
          breadcrumb="▶︎ 地盤安心住宅申込ID；s0012541 　　▶︎ 調査発注会社：〇〇会社　　▶︎ 発注担当者：〇〇"
        >
          <div className={classes.content}>
            {/* <Pagination
              limit={1}
              offset={offsetPage}
              total={14}
              onClick={(e, offset, page) => this.handleChangePage(e, offset, page)}
            /> */}
            <div className={classes.pagination} style={{ width: widthPagina }}>
              <div>
                <Button
                  onClick={() =>
                    this.setState({
                      pageIndex:
                        this.state.pageIndex > 1 ? this.state.pageIndex - 1 : 1
                    })
                  }
                  className={classes.btnArrow}
                >
                  <IconPrev />
                </Button>
                <Button onClick={this.showMucluc} className={classes.btnMucluc}>
                  目　次​
                </Button>
                <Button
                  onClick={() =>
                    this.setState({ pageIndex: this.state.pageIndex + 1 })
                  }
                  className={classes.btnArrow}
                >
                  <IconNext />
                </Button>
              </div>
              <Button
                className={classes.btnRedirect}
                href={`${folderRoot}operation/survey/${surveyReportId}`}
              >
                地盤安心住宅の申し込みページへ
              </Button>
              {/* <Button onClick={this.addNewPoinNo} className={classes.btnMucluc}>
                追加
              </Button>} */}
              {/* Page: {renderPagination} */}
              {resultApiPrint === 6 && (
                <Button
                  onClick={() => this.setState({ isPrint: true })}
                  className={classes.btnExportPDF}
                >
                  Export PDF
                </Button>
              )}
            </div>
            {pageIndex === 1 && (
              <SurveyReportPage1
                id={surveyReportId}
                data={dataPage.page1and2.data}
                isNew={dataPage.page1and2.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )}
            {pageIndex === 2 && (
              <SurveyReportPage2
                id={surveyReportId}
                data={dataPage.page1and2.data}
                isNew={dataPage.page1and2.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )}
            {pageIndex === 3 && (
              <SurveyReportPage3 updateStatusPage={this.updateStatusPageRead} />
            )}
            {pageIndex === 4 && (
              <SurveyReportPage4
                id={surveyReportId}
                data={dataPage.page4.data}
                isNew={dataPage.page4.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )}
            {pageIndex === 5 && (
              <SurveyReportPage5
                id={surveyReportId}
                data={dataPage.page5.data}
                isNew={dataPage.page5.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )}
            {pageIndex === 6 && (
              <SurveyReportPage6
                id={surveyReportId}
                data={dataPage.page6.data}
                dataPage7={dataPage.page7.data}
                isNew={dataPage.page6.isNew}
                isNew7={dataPage.page7.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )}
            {/* {pageIndex === 7 && (
              <SurveyReportPage7
                id={surveyReportId}
                data={dataPage.page7.data}
                isNew={dataPage.page7.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )} */}
            {pageIndex === 7 && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[0]}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}

            {pageIndex === 8 && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[1]}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}
            {pageIndex === 9 && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[2]}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}
            {pageIndex === 10 && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[3]}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}
            {pageIndex === 11 && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[4]}
                isEndPoint={arrNo.length === 5 ? true : false}
                handleAddNewNo={this.addNewPoinNo}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}
            {pageIndex === 12 && arrNo[5] && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[5]}
                isEndPoint={arrNo.length === 6 ? true : false}
                handleAddNewNo={this.addNewPoinNo}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}
            {pageIndex === 13 && arrNo[6] && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[6]}
                isEndPoint={arrNo.length === 7 ? true : false}
                handleAddNewNo={this.addNewPoinNo}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}
            {pageIndex === 14 && arrNo[7] && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[7]}
                isEndPoint={arrNo.length === 8 ? true : false}
                handleAddNewNo={this.addNewPoinNo}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}
            {pageIndex === 15 && arrNo[8] && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[8]}
                isEndPoint={arrNo.length === 9 ? true : false}
                handleAddNewNo={this.addNewPoinNo}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}
            {pageIndex === 16 && arrNo[9] && (
              <SurveyReportPage8To17
                id={surveyReportId}
                no={arrNo[9]}
                isEndPoint={arrNo.length === 10 ? true : false}
                handleAddNewNo={this.addNewPoinNo}
                updateStatusPageByNo={this.updateStatusPageByNo}
              />
            )}
            {/* page 12 */}

            {pageIndex === 7 + arrNo.length && (
              <SurveyReportPage12
                id={surveyReportId}
                numberNoStart={1}
                updateStatusPage={this.updateStatusPageRead}
              />
            )}
            {pageIndex === 8 + arrNo.length && dataPage.page132 && (
              <SurveyReportPage12
                id={surveyReportId}
                numberNoStart={6}
                updateStatusPage={this.updateStatusPageRead}
              />
            )}
            {/* page 13 */}
            {pageIndex === 8 + (dataPage.page132 && 1) + arrNo.length && (
              <SurveyReportPage13
                id={surveyReportId}
                numberNoStart={1}
                updateStatusPage={this.updateStatusPageRead}
              />
            )}
            {pageIndex === 10 + arrNo.length && dataPage.page132 && (
              <SurveyReportPage13
                id={surveyReportId}
                numberNoStart={6}
                updateStatusPage={this.updateStatusPageRead}
              />
            )}
            {/* page 14-17 trong tài liệu */}
            {pageIndex === 30 && (
              <SurveyReportPage14_1
                id={surveyReportId}
                data={dataPage.page141.data}
                isNew={dataPage.page141.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )}
            {pageIndex === 31 && (
              <SurveyReportPage14_2
                id={surveyReportId}
                data={dataPage.page142.data}
                isNew={dataPage.page142.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )}
            {pageIndex === 32 && (
              <SurveyReportPage14_3
                id={surveyReportId}
                data={dataPage.page143.data}
                isNew={dataPage.page143.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )}
            {pageIndex === 33 && (
              <SurveyReportPage14_4
                id={surveyReportId}
                data={dataPage.page144.data}
                isNew={dataPage.page144.isNew}
                handleChange={this.handleChangeDataPage}
                handleChangeIsNew={this.handleChangeModePage}
              />
            )}
          </div>
        </Master3Col>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={isPrint}
          classes={{
            paper: classes.paperDialog
          }}
        >
          <DialogContent className={classes.contentDialog}>
            <Grid container className={classes.root}>
              <Grid item xs={8}>
                <div className={classes.contentPDF}>
                  {!listPageExport && (
                    <PDFViewer height="100%" width="100%">
                      {pageAll}
                    </PDFViewer>
                  )}
                  {listPageExport && listPageExport.length > 0 && (
                    <PDFViewer height="100%" width="100%">
                      {pageSelect}
                    </PDFViewer>
                  )}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.contentControl}>
                  {/* row 1 */}
                  <div
                    className={classes.rowHorizon}
                    style={{ fontWeight: 500 }}
                  >
                    <div className={classes.item1}>Print</div>
                    <div className={classes.item2}>{numberPagePrint} Page</div>
                  </div>
                  {/* row 2 */}
                  <div className={classes.rowHorizon}>
                    <div className={classes.item1}>Page</div>
                    <div className={classes.item2}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControlSelect}
                      >
                        <InputLabel htmlFor="select-type-page"></InputLabel>
                        <Select
                          native
                          value={pagePrint}
                          onChange={this.handleChangeTypePrintPage("pagePrint")}
                          inputProps={{
                            name: "all",
                            id: "select-type-page"
                          }}
                        >
                          <option value="all">All</option>
                          <option value="custom">Custom</option>
                        </Select>
                      </FormControl>
                      {pagePrint === "custom" && (
                        <TextField
                          variant="outlined"
                          className={classes.inputCustomPage}
                          placeholder="1-2, 5, 9..."
                          onBlur={this.getPageRenderPDF}
                          error={statusInputSelectPage.error}
                          helperText={
                            statusInputSelectPage.error
                              ? statusInputSelectPage.message
                              : ""
                          }
                          InputProps={{
                            classes: {
                              error: classes.thisInputError
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                  {/* row 3 */}
                  {/* <div className={classes.rowHorizon}>
                    <div className={classes.item1}>Layout</div>
                    <div className={classes.item2}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControlSelect}
                      >
                        <InputLabel htmlFor="select-layout-page"></InputLabel>
                        <Select
                          native
                          value={pageLayout}
                          onChange={this.handleChangeTypePrintPage(
                            "pageLayout"
                          )}
                          inputProps={{
                            name: "layout",
                            id: "select-layout-page"
                          }}
                        >
                          <option value="vertical">Vertical Format</option>
                          <option value="horizontal">Horizontal format</option>
                        </Select>
                      </FormControl>
                    </div>
                  </div> */}
                </div>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.rowBtnEvent}>
            {!listPageExport && (
              <PDFDownloadLink
                document={pageAll}
                fileName="test.pdf"
                style={stylesPDF.btnDownload}
              >
                {({ loading }) => (loading ? "Loading PDF..." : "Download")}
              </PDFDownloadLink>
            )}
            {listPageExport && listPageExport.length > 0 && (
              <PDFDownloadLink
                document={pageSelect}
                fileName="test.pdf"
                style={stylesPDF.btnDownload}
              >
                {({ loading }) => (loading ? "Loading PDF..." : "Download")}
              </PDFDownloadLink>
            )}
            <Button
              onClick={this.handleClosePrint}
              className={classes.btnSavePDF}
            >
              Export
            </Button>
            <Button
              onClick={this.handleClosePrint}
              className={classes.btnCance}
            >
              Exit
            </Button>
          </DialogActions>
        </Dialog>
        {/* map hidden để render cho pdf */}
        <div
          style={{
            height: 700,
            marginTop: 20,
            width: "100%",
            position: "fixed",
            left: "-200%"
          }}
        >
          <Map
            ref={this.mapRef}
            center={centerPosition}
            zoom={zoom}
            minZoom={5}
            doubleClickZoom={false}
            className={classes.map}
          >
            {/* Basic Layer */}
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {/* End Basic Layer */}
            <Marker
              draggable={true}
              ref={this.markerRef}
              position={markerPosition}
              onDrap
            />
          </Map>
        </div>
        {/* menu mục lục */}
        <Menu
          id="option-menu"
          anchorEl={anchorEl}
          open={openMucluc}
          onClose={this.handleCloseMucluc}
          classes={{
            paper: classes.menuOptionLocation
          }}
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <div className={classes.headerMenu}>
            <span>地盤調査報告書​</span>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={this.handleCloseMucluc}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.statusMenu}>
            <span className={`${!isFinishAllPage && classes.activeStatus}`}>
              作成中​
            </span>
            <span className={`${isFinishAllPage && classes.activeStatus}`}>
              作成終了​
            </span>
          </div>
          <div className={classes.listPage}>
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page1}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 1 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(1, "表紙")}
              >
                1:　表紙
              </span>
            </div>
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page2}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 2 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(2, "調査概要​")}
              >
                2:　調査概要​
              </span>
            </div>
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page3}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 3 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(3, "調査方法概要​")}
              >
                3:　調査方法概要​
              </span>
            </div>
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page4}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 4 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(4, "調査場所​")}
              >
                4:　調査場所​
              </span>
            </div>
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page5}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 5 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(5, "調査敷地状況​")}
              >
                5:　調査敷地状況​
              </span>
            </div>
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page6}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 6 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(6, "敷地概要調査・目視調査結果")}
              >
                6:　敷地概要調査・目視調査結果
              </span>
            </div>
            {arrNo.map((item, i) => {
              return (
                <div className={classes.rgCheckbox} key={i}>
                  <Checkbox
                    className={classes.checkbox}
                    checked={statusPage.page7[i + 1]}
                  />
                  <span
                    className={`${classes.labelCheck} ${pageIndex === 7 + i &&
                      classes.activePage}`}
                    onClick={() =>
                      this.selectPage(
                        7 + i,
                        `スウェーデン式サウンディング試験・${i + 1}`
                      )
                    }
                  >
                    {7 + i}:　スウェーデン式サウンディング試験・{i + 1}
                  </span>
                  {i > 4 && (
                    <IconButton
                      aria-label="close"
                      className={classes.btnDeleteNo}
                      onClick={() => this.deleteNoBySurveyId(item)}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </div>
              );
            })}
            {dataPage.page131 && (
              <div className={classes.rgCheckbox}>
                <Checkbox
                  className={classes.checkbox}
                  checked={statusPage.page131}
                />
                <span
                  className={`${classes.labelCheck} ${pageIndex ===
                    7 + arrNo.length && classes.activePage}`}
                  onClick={() =>
                    this.selectPage(7 + arrNo.length, "換算N値柱状図一覧表 1")
                  }
                >
                  {7 + arrNo.length}:　換算N値柱状図一覧表 1
                </span>
              </div>
            )}
            {dataPage.page132 && (
              <div className={classes.rgCheckbox}>
                <Checkbox
                  className={classes.checkbox}
                  checked={statusPage.page132}
                />
                <span
                  className={`${classes.labelCheck} ${pageIndex ===
                    8 + arrNo.length && classes.activePage}`}
                  onClick={() =>
                    this.selectPage(8 + arrNo.length, "換算N値柱状図一覧表 2")
                  }
                >
                  {8 + arrNo.length}:　換算N値柱状図一覧表 2
                </span>
              </div>
            )}
            {dataPage.page131 && (
              <div className={classes.rgCheckbox}>
                <Checkbox
                  className={classes.checkbox}
                  checked={statusPage.page151}
                />
                <span
                  className={`${classes.labelCheck} ${pageIndex ===
                    8 + (dataPage.page132 && 1) + arrNo.length &&
                    classes.activePage}`}
                  onClick={() =>
                    this.selectPage(
                      8 + (dataPage.page132 && 1) + arrNo.length,
                      "サウンディング柱状図一覧表 1"
                    )
                  }
                >
                  {8 + (dataPage.page132 && 1) + arrNo.length}
                  :　サウンディング柱状図一覧表 1
                </span>
              </div>
            )}
            {dataPage.page132 && (
              <div className={classes.rgCheckbox}>
                <Checkbox
                  className={classes.checkbox}
                  checked={statusPage.page152}
                />
                <span
                  className={`${classes.labelCheck} ${pageIndex ===
                    10 + arrNo.length && classes.activePage}`}
                  onClick={() =>
                    this.selectPage(
                      10 + arrNo.length,
                      "サウンディング柱状図一覧表 2"
                    )
                  }
                >
                  {10 + arrNo.length}:　サウンディング柱状図一覧表 2
                </span>
              </div>
            )}
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page141}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 30 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(30, "試験測点写真・1")}
              >
                {7 + arrNo.length + total13}:　試験測点写真・1
              </span>
            </div>
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page142}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 31 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(31, "試験測点写真・2")}
              >
                {8 + arrNo.length + total13}:　試験測点写真・2
              </span>
            </div>
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page143}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 32 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(32, "試験測点写真・3")}
              >
                {9 + arrNo.length + total13}:　試験測点写真・3
              </span>
            </div>
            <div className={classes.rgCheckbox}>
              <Checkbox
                className={classes.checkbox}
                checked={statusPage.page144}
              />
              <span
                className={`${classes.labelCheck} ${pageIndex === 33 &&
                  classes.activePage}`}
                onClick={() => this.selectPage(33, "試験測点写真・4")}
              >
                {10 + arrNo.length + total13}:　試験測点写真・4
              </span>
            </div>
          </div>
        </Menu>
        {/* end menu mục lục */}
      </React.Fragment>
    );
  };
}

GroundSurveyReport.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object
};
export default withRoot(withStyles(styles)(GroundSurveyReport));
