import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import { PDFDownloadLink, PdfDocument } from "@react-pdf/renderer";
// constant
import { apiRoot } from "constant/index.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from "@material-ui/icons/Add";
import Deletecon from "@material-ui/icons/Close";

// component project
import Notification from "components/Notification/Notification.jsx";
import TextFieldRecordForm from "components/CommonRecordForm/TextFieldRecordForm.jsx";
import PrintRecordForm from "components/Survey/PrintRecordForm.jsx";

const styles = theme => ({
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
  formCheckbox: {},
  table1: {
    borderSpacing: 0,
    border: "solid 1px #737373",
    width: 180,
    "&& td": {
      border: "1px solid #737373",
      padding: 0,
      verticalAlign: "top"
    },
    "&& td:nth-child(1)": {
      width: 60,
      padding: 5
    },
    "&& $formCheckbox": {
      width: "50%",
      margin: "5px 0px",
      paddingLeft: 5
    }
  },
  table2: {
    marginTop: 30,
    "&& $formCheckbox": {
      width: "100%"
    }
  },
  blockBoxLeft: {
    width: 180,
    marginTop: 150,
    marginBottom: 50
  },
  groupBox: {
    display: "flex",
    flexDirection: "column"
  },
  box: {
    border: "solid 1px #c3c1c1",
    marginBottom: -1,
    padding: 5,
    fontSize: 14,
    color: "#222"
  },
  titleBox: {
    fontWeight: "500",
    marginBottom: 5,
    display: "block"
  },
  contentBox: {
    paddingLeft: 20,
    color: "#444",
    "&& $formCheckbox": {
      marginBottom: 10
    },
    "&& $formCheckbox *": {
      fontSize: 13
    },
    "&& $formCheckbox svg": {
      fontSize: 18
    }
  },
  formText: {},
  formText1: {
    "&& *": {
      backgroundColor: "#FFE4CB"
    }
  },
  formCheckbox1: {
    width: "100%",
    margin: "6px 0px",
    paddingLeft: 0,
    "&& svg": {
      fontSize: 20
    }
  },
  formCheckbox2: {
    width: "100%",
    margin: "5px 0px",
    paddingLeft: 0,
    "&& *": {
      fontSize: 15
    },
    "&& svg": {
      fontSize: 20
    }
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
    border: "solid 1px #737373",
    width: "100%",
    "&& thead tr:nth-child(2) th": {
      borderBottomColor: "#000",
      borderBottomWidth: 2
    },
    "&& thead th": {
      padding: 5
    },
    "&& th, td": {
      border: "1px solid #737373",
      padding: 0,
      verticalAlign: "middle",
      textAlign: "center"
    },
    "&& $formText1": {
      width: 60
    },
    "&& $formText": {
      width: 60
    },
    "&& td:nth-child(3), th:nth-child(3)": {
      color: "#0178BE",
      fontWeight: 600
    },
    "&& td:nth-child(9), th:nth-child(9)": {
      backgroundColor: "#EBF1EC"
    },
    "&& td:nth-last-child(1), th:nth-last-child(1), td:nth-last-child(2), th:nth-last-child(2), td:nth-last-child(3), th:nth-last-child(3)": {
      backgroundColor: "#FFE4CB"
    }
  },
  inlineRow: {
    "&& td": {
      borderBottomColor: "#f35d48",
      borderBottomWidth: 2
    }
  },
  groupRadio: {
    "&& *": {
      fontSize: 14
    },
    "&& svg": {
      fontSize: 22
    }
  },
  checkboxTb3: {
    "&& svg": {
      fontSize: 20
    },
    "&& input": {
      width: 40
    }
  },
  checkboxLabelTb3: {
    padding: 0,
    marginRight: 2,
    "&& *": {
      fontSize: 14
    },
    "&& svg": {
      fontSize: 20
    }
  },
  InputTable: {
    padding: "0 5px",
    width: "60px !important"
  },
  checkboxLabelTbleft: {
    padding: 0,
    margin: 0
  },
  titleStatus: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: "20px"
  },
  btnSave: {
    border: "none !important",
    color: "#fff !important",
    borderRadius: 0,
    padding: "0px 30px",
    textTransform: "none",
    minHeight: 45,
    fontSize: 14,
    margin: 0,
    marginLeft: 5,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    backgroundColor: theme.palette.green.light + "!important",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.green.light
    },
    "&:disabled": {
      opacity: 0.3
    }
  },
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  itemStatus: {
    display: "flex",
    backgroundColor: "#B2B6BF",
    marginBottom: 4,
    padding: 0,
    height: 40,
    cursor: "pointer"
  },
  number: {
    height: 40,
    width: 40,
    backgroundColor: "#00978C",
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    lineHeight: "40px"
  },
  checkStatus: {
    "& svg": {
      color: "#222",
      fontSize: 22
    },
    "& span": {
      fontWeight: 500
    }
  },
  iconRight: {
    color: "#00978c",
    position: "absolute",
    right: 4,
    top: 5,
    borderTop: "solid 15px transparent",
    borderBottom: "solid 15px transparent",
    borderLeft: "solid 16px"
  },
  selectedNo: {
    "& $number": {
      backgroundColor: "#E58300"
    }
  },
  btnAddNo: {
    marginBottom: 20,
    width: "100%",
    border: "solid 2px #00978c",
    borderRadius: 0,
    padding: 0,
    "& svg": {
      fontSize: 34,
      color: "#00978c"
    },
    "&:hover": {
      backgroundColor: "#00978c",
      "& svg": {
        color: "#fff"
      }
    }
  },
  iconDelete: {
    borderRadius: "50%",
    background: "#222222",
    marginLeft: 6,
    padding: 3,
    fontSize: 20,
    color: "#fff",
    opacity: 0.6,
    "&:hover": {
      opacity: 1
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
class RecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroolLeft: 0,
      arrNo: null,
      arrStatusNo: null,
      maxNoActive: null,
      noSelect: 1,
      isLoaddingPage: true,
      isNew: true,
      surveyId: null,
      no: 1,
      surveyInfo: null,
      weather: [0, 0, 0, 0],
      measurement_content: [0, 0, 0, 0],
      inputTemp: {
        row: "",
        name: "",
        value: ""
      },
      statusSave: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      }
    };
  }

  componentDidMount = () => {
    const { surveyId } = this.props;
    // mode update
    if (surveyId) {
      this.setState({
        isNew: false,
        surveyId: surveyId,
        isLoaddingPage: true
      });
      this.getSurveyInfoById(surveyId, 1);
      this.getStatusNoBySurveyId(surveyId);
    }
    // mode add new

    let newSurveyInfoNew = cloneDeep(surveyInfoNew);
    newSurveyInfoNew.measurement_point_no = this.state.noSelect;
    this.setState({ surveyInfo: newSurveyInfoNew, isLoaddingPage: false });
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!nextProps.surveyId) return;
    // check nếu id survey khác thì không cho nó lấy lại data nữa, vì bản chất vòng đời này luôn vào khi props thay đổi
    if (nextProps.surveyId !== this.state.surveyId) {
      this.setState(
        {
          surveyId: nextProps.surveyId,
          no: nextProps.no,
          isLoaddingPage: false,
          isNew: false
        },
        () => {
          this.getSurveyInfoById(nextProps.surveyId, 1);
          this.getStatusNoBySurveyId(nextProps.surveyId);
        }
      );
    } else return;
  };

  // get survey info by id
  getSurveyInfoById = async (id, no) => {
    const res = await axios.get(`${apiRoot}/surveyinfo/${id}?no=${no}`);
    // error
    if (res.status !== 200) {
      this.setState({
        surveyInfo: -1
      });
      return;
    }
    // success
    // nếu không tồn tại ssurveyInfo theo surveyID này

    // console.log(res.data);
    if (res.data === false) {
      let newSurveyInfoNew = cloneDeep(surveyInfoNew);
      newSurveyInfoNew.measurement_point_no = no;
      this.setState({
        isNew: true,
        surveyInfo: { ...newSurveyInfoNew, survey_id: id },
        isLoaddingPage: false
      });
      return;
    }
    let data = res.data;
    data.weather = data.weather.split(",");
    data.measurement_content = data.measurement_content.split(",");
    this.setState({
      surveyInfo: data,
      isLoaddingPage: false
    });
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
    let arrNo = [];
    if (parseInt(data.maxNoActive) > 5) {
      for (let i = 1; i <= parseInt(data.maxNoActive); i++) {
        arrNo.push(i);
      }
    } else {
      arrNo = [1, 2, 3, 4, 5];
    }
    this.setState({
      arrStatusNo: data.details,
      maxNoActive: data.maxNoActive,
      arrNo: arrNo
    });
  };

  handleSave = () => {
    const { statusSave, surveyId } = this.state;
    if (!surveyId) {
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = -1;
      statusSave.message = "SurveyID not available";
      this.setState({ statusSave });
    }

    statusSave.isLoadding = true;
    this.setState({ statusSave });
    if (this.state.isNew) {
      this.insertSurveyInfo();
    } else {
      this.updateSurveyInfo();
    }
  };

  insertSurveyInfo = async () => {
    const {
      surveyId,
      surveyInfo,
      statusSave,
      noSelect,
      maxNoActive
    } = this.state;
    if (!surveyId) return;
    this.setState({
      surveyInfo: { ...surveyInfo, survey_id: surveyId }
    });
    let dataInsert = { ...surveyInfo, survey_id: surveyId };
    dataInsert.weather = dataInsert.weather.toString();
    dataInsert.measurement_content = dataInsert.measurement_content.toString();

    console.log(dataInsert)
    try {
      const res = await axios.post(`${apiRoot}/surveyinfo`, dataInsert);

      // Failed
      if (res.status !== 200) {
        statusSave.open = true;
        statusSave.isLoadding = false;
        statusSave.isError = -1;
        statusSave.message = "Insert survey info faild";
        this.setState({ statusSave });
      }
      // Success
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = 1;
      statusSave.message = "Insert survey info success";
      this.setState({
        statusSave,
        isNew: false,
        arrStatusNo: this.state.arrStatusNo.concat(
          this.state.noSelect.toString()
        ),
        maxNoActive: noSelect > parseInt(maxNoActive) ? noSelect : maxNoActive
      });
      return true;
    } catch (error) {
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = -1;
      statusSave.message = "Insert survey info faild";
      this.setState({ statusSave });
    }
  };

  updateSurveyInfo = async () => {
    const { surveyId, surveyInfo, statusSave } = this.state;
    let dataUpdate = cloneDeep(surveyInfo);
    dataUpdate.weather = dataUpdate.weather.toString();
    dataUpdate.measurement_content = dataUpdate.measurement_content.toString();
    console.log(dataUpdate)
    try {
      const res = await axios.put(
        `${apiRoot}/surveyinfo/${surveyId}`,
        dataUpdate
      );

      // Failed
      if (res.status !== 200) {
        statusSave.open = true;
        statusSave.isLoadding = false;
        statusSave.isError = -1;
        statusSave.message = "Update survey info faild";
        this.setState({ statusSave });
      }
      // Success
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = 1;
      statusSave.message = "Update survey info success";
      this.setState({ statusSave });
    } catch (error) {
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = -1;
      statusSave.message = "Update survey info faild";
      this.setState({ statusSave });
    }
  };

  handleCloseNotification = () => {
    const { statusSave } = this.state;
    statusSave.open = false;
    statusSave.isLoadding = false;
    statusSave.isError = 0;
    statusSave.message = "";
    this.setState({ statusSave });
  };
  // update value field
  handleUpdateText = name => value => {
    this.handleUpdateField(name, value);
  };
  // handle update value check đơn
  handleUpdateCheckOnlyOne = (e, name) => {
    let val = e.target.checked ? 1 : 0;
    this.handleUpdateField(name, val);
  };

  handleUpdateRadio = name => e => {
    let val = e.target.value;
    this.handleUpdateField(name, val);
  };

  handleChangeCheckBoxArr = (e, name, stt) => {
    const { surveyInfo } = this.state;
    let data = surveyInfo[name];
    data[stt] = e.target.checked ? 1 : 0;
    surveyInfo[name] = data;
    this.setState({ surveyInfo });
  };

  handleChangeCheckBoxRight = (e, number, name) => {
    let val = e.target.checked ? 1 : 0;
    this.handleUpdateFieldTableRight(val, number, name);
  };
  handleChangeInputTable = (e, number, name) => {
    const { inputTemp } = this.state;
    let val = e.target.value;
    inputTemp.name = name;
    inputTemp.row = number;
    inputTemp.value = val;
    this.setState({ inputTemp });
    // this.handleUpdateFieldTableRight(val, number, name);
  };
  updateValue = () => {
    const { inputTemp } = this.state;
    this.handleUpdateFieldTableRight(
      inputTemp.value,
      inputTemp.row,
      inputTemp.name
    );
    inputTemp.name = "";
    inputTemp.row = "";
    inputTemp.value = "";
    this.setState({ inputTemp });
  };

  // common update
  handleUpdateField = (name, val) => {
    const { surveyInfo } = this.state;
    surveyInfo[name] = val;
    this.setState({
      surveyInfo: surveyInfo
    });
  };
  // comon update field table right
  handleUpdateFieldTableRight = (val, number, name) => {
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

  handleAddNewNo = () => {
    const { surveyId, arrNo } = this.state;
    if (arrNo.length >= 10) return;
    let newNo = arrNo.length + 1;
    this.setState(
      {
        arrNo: this.state.arrNo.concat(newNo),
        noSelect: newNo
      },
      () => this.getSurveyInfoById(surveyId, newNo)
    );
  };

  handleDeleteNo = (e, no) => {
    e.stopPropagation();
    const { arrNo, arrStatusNo, maxNoActive } = this.state;
    let arrNoClone = cloneDeep(arrNo);
    let arrStatusNoClone = cloneDeep(arrStatusNo);
    let indexNo = arrNo.indexOf(no);
    let indexNoStatus = arrStatusNo.indexOf(no.toString());
    if (!indexNo === -1) return;
    // show confirm
    let answerDelete = window.confirm(`${no}測定点を削除しますか？`);

    // select no delete
    if (!answerDelete) return;
    // yes delete

    // xóa No chưa được save
    let arrNoNew = [];
    let arrStatusNoNew = [];
    // if (no === arrNoClone.length) {
    //   this.setState({ noSelect: arrNoClone.length - 1 });
    // }
    arrNoClone.splice(indexNo, 1);
    arrNoClone.map(item => {
      if (item < no) {
        arrNoNew.push(item);
      } else {
        arrNoNew.push(item - 1);
      }
    });

    // console.log(Math.max(...arrNo))
    let newNoSelect = no === Math.max(...arrNo) ? Math.max(...arrNo) - 1 : no;
    this.setState({ noSelect: newNoSelect });

    if (no === parseInt(maxNoActive)) {
      arrStatusNoClone.splice(indexNoStatus, 1);
      arrStatusNoNew = arrStatusNoClone;
      // set lại maxNoactive
      let maxNoNew = 0;
      arrStatusNoNew.map(item => {
        if (parseInt(item) > maxNoNew) {
          maxNoNew = parseInt(item);
        }
      });
      this.setState({ maxNoActive: maxNoNew });
    } else {
      // console.log("indexNo:" + indexNoStatus)
      if (indexNoStatus !== -1) {
        arrStatusNoClone.splice(indexNoStatus, 1);
      }
      arrStatusNoClone.map(item => {
        if (parseInt(item) < no) {
          arrStatusNoNew.push(item.toString());
        } else {
          arrStatusNoNew.push((item - 1).toString());
        }
      });
    }
    // this.deleteNoBySurveyId(no);
    // end xóa No
    this.setState({ arrNo: arrNoNew, arrStatusNo: arrStatusNoNew });
    // Xóa no on database
    this.deleteNoBySurveyId(no, newNoSelect);
  };
  deleteNoBySurveyId = async (no, newNoSelect) => {
    const { surveyId, statusSave } = this.state;
    const res = await axios.delete(`${apiRoot}/surveyinfo/${surveyId}`, {
      data: {
        measurement_point_no: no
      }
    });

    // Failed
    if (res.status !== 200) {
      statusSave.open = true;
      statusSave.isLoadding = false;
      statusSave.isError = -1;
      statusSave.message = "Delete survey info by No faild";
      this.setState({ statusSave });
    }
    // console.log(newNoSelect);
    this.getSurveyInfoById(surveyId, newNoSelect);
    // this.getStatusNoBySurveyId(surveyId);
    // this.getSurveyInfoById(surveyId, no);
  };
  handleSelectNo = no => {
    this.setState({ noSelect: no });
    this.getSurveyInfoById(this.state.surveyId, no);
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
        id="contentRecordForm"
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }
  renderThumbVertical({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "#A5A5A5",
      borderRadius: 3,
      right: 0,
      width: 10,
      cursor: "pointer"
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }
  renderThumbHorizontal({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "#A5A5A5",
      borderRadius: 3,
      right: 0,
      cursor: "pointer"
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }
  renderTrackHorizontal({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "#f3f3f3",
      width: "100%",
      height: 10,
      bottom: 0
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }
  renderTrackVertical({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "#f3f3f3",
      width: 10,
      height: "100%",
      right: 0
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }
  onScroll = e => {
    this.setState({ scroolLeft: e.target.scrollLeft });
  };

  convertPdf = () => {
    let elRender = document.getElementById("printTable");
    // console.log(elRender.outerHTML)

    fetch("https://v2018.api2pdf.com/chrome/html", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "cc6e29ae-2d0f-4cc3-abb8-19c94297767a"
      },
      body: JSON.stringify({
        html: `${elRender.outerHTML}`,
        inlinePdf: true,
        fileName: "test.pdf"
      })
    })
      .then(res => res.json())
      .then(res => console.log(res.pdf));
  };
  render = () => {
    const { classes } = this.props;
    const {
      surveyInfo,
      statusSave,
      isLoaddingPage,
      inputTemp,
      arrNo,
      arrStatusNo,
      noSelect
    } = this.state;
    // console.log(arrNo, arrStatusNo);
    // render status
    let renderStatus =
      arrStatusNo &&
      arrNo &&
      arrNo.map(item => {
        let check = false;
        if (arrStatusNo.indexOf(item.toString()) !== -1) {
          check = true;
        }
        return (
          <ListItem
            key={item}
            className={`${classes.itemStatus} ${
              noSelect === item ? classes.selectedNo : ""
            }`}
            onClick={() => this.handleSelectNo(item)}
          >
            <span className={classes.number}>{item}</span>
            <div className={classes.checkStatus}>
              <Checkbox checked={check} disabled={true} />
              <span>入力済</span>
            </div>
            {item > 5 && (
              <Deletecon
                className={classes.iconDelete}
                onClick={e => this.handleDeleteNo(e, item)}
              />
            )}
            <div className={classes.iconRight} />
          </ListItem>
        );
      });

    // console.log(surveyInfo)
    if (isLoaddingPage) {
      return (
        <div className={classes.blockStep}>
          <CircularProgress size={50} className={classes.loaddingPage} />
        </div>
      );
    }

    // console.log(surveyInfo);
    let isCheckPhenol_reaction =
      surveyInfo && surveyInfo.phenol_reaction
        ? surveyInfo.phenol_reaction
        : "0";
    // render mutilipe tr table right
    let elRender = arrayRenderData.map((item, i) => {
      let wsw =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["wsw"]
          ? surveyInfo[`${item}`]["wsw"]
          : "";
      let half_revolution =
        surveyInfo &&
        surveyInfo[`${item}`] &&
        surveyInfo[`${item}`]["half_revolution"]
          ? surveyInfo[`${item}`]["half_revolution"]
          : "";
      let shari =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["shari"]
          ? surveyInfo[`${item}`]["shari"]
          : "";
      let jari =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["jari"]
          ? surveyInfo[`${item}`]["jari"]
          : "";
      let gully =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["gully"]
          ? surveyInfo[`${item}`]["gully"]
          : "";
      let excavation =
        surveyInfo &&
        surveyInfo[`${item}`] &&
        surveyInfo[`${item}`]["excavation"]
          ? surveyInfo[`${item}`]["excavation"]
          : "";
      let ston =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["ston"]
          ? surveyInfo[`${item}`]["ston"]
          : "";
      let sursul =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["sursul"]
          ? surveyInfo[`${item}`]["sursul"]
          : "";
      let yukuri =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["yukuri"]
          ? surveyInfo[`${item}`]["yukuri"]
          : "";
      let jinwali =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["jinwali"]
          ? surveyInfo[`${item}`]["jinwali"]
          : "";
      let number_of_hits =
        surveyInfo &&
        surveyInfo[`${item}`] &&
        surveyInfo[`${item}`]["number_of_hits"]
          ? surveyInfo[`${item}`]["number_of_hits"]
          : "";
      let idling =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["idling"]
          ? surveyInfo[`${item}`]["idling"]
          : "";
      let sandy_soil =
        surveyInfo &&
        surveyInfo[`${item}`] &&
        surveyInfo[`${item}`]["sandy_soil"]
          ? surveyInfo[`${item}`]["sandy_soil"]
          : "";
      let clay_soil =
        surveyInfo &&
        surveyInfo[`${item}`] &&
        surveyInfo[`${item}`]["clay_soil"]
          ? surveyInfo[`${item}`]["clay_soil"]
          : "";
      let other =
        surveyInfo && surveyInfo[`${item}`] && surveyInfo[`${item}`]["other"]
          ? surveyInfo[`${item}`]["other"]
          : "";
      return (
        <tr key={i} className={`${(i + 1) % 4 === 0 ? classes.inlineRow : ""}`}>
          <td>
            <InputBase
              className={classes.InputTable}
              multiline
              rowsMax="10"
              value={
                inputTemp.row === item && inputTemp.name === "wsw"
                  ? inputTemp.value
                  : wsw
              }
              onChange={e => this.handleChangeInputTable(e, item, "wsw")}
              onBlur={this.updateValue}
            />
          </td>
          <td>
            <InputBase
              className={classes.InputTable}
              multiline
              rowsMax="10"
              value={
                inputTemp.row === item && inputTemp.name === "half_revolution"
                  ? inputTemp.value
                  : half_revolution
              }
              onChange={e =>
                this.handleChangeInputTable(e, item, "half_revolution")
              }
              onBlur={this.updateValue}
            />
          </td>
          <td>{item}</td>
          <td>
            <Checkbox
              className={classes.checkboxTb3}
              checked={parseInt(shari) === 1 ? true : false}
              onChange={e => this.handleChangeCheckBoxRight(e, item, "shari")}
            />
          </td>
          <td>
            <Checkbox
              className={classes.checkboxTb3}
              checked={parseInt(jari) === 1 ? true : false}
              onChange={e => this.handleChangeCheckBoxRight(e, item, "jari")}
            />
          </td>
          <td>
            <Checkbox
              className={classes.checkboxTb3}
              checked={parseInt(gully) === 1 ? true : false}
              onChange={e => this.handleChangeCheckBoxRight(e, item, "gully")}
            />
          </td>
          <td>
            <Checkbox
              className={classes.checkboxTb3}
              checked={parseInt(excavation) === 1 ? true : false}
              onChange={e =>
                this.handleChangeCheckBoxRight(e, item, "excavation")
              }
            />
          </td>
          <td>
            <Checkbox
              className={classes.checkboxTb3}
              checked={parseInt(ston) === 1 ? true : false}
              onChange={e => this.handleChangeCheckBoxRight(e, item, "ston")}
            />
          </td>
          <td>
            <Checkbox
              className={classes.checkboxTb3}
              checked={parseInt(sursul) === 1 ? true : false}
              onChange={e => this.handleChangeCheckBoxRight(e, item, "sursul")}
            />
          </td>
          <td>
            <Checkbox
              className={classes.checkboxTb3}
              checked={parseInt(yukuri) === 1 ? true : false}
              onChange={e => this.handleChangeCheckBoxRight(e, item, "yukuri")}
            />
          </td>
          <td>
            <Checkbox
              className={classes.checkboxTb3}
              checked={parseInt(jinwali) === 1 ? true : false}
              onChange={e => this.handleChangeCheckBoxRight(e, item, "jinwali")}
            />
          </td>
          <td>
            <InputBase
              className={classes.InputTable}
              multiline
              rowsMax="10"
              value={
                inputTemp.row === item && inputTemp.name === "number_of_hits"
                  ? inputTemp.value
                  : number_of_hits
              }
              onChange={e =>
                this.handleChangeInputTable(e, item, "number_of_hits")
              }
              onBlur={this.updateValue}
            />
          </td>
          <td>
            <Checkbox
              className={classes.checkboxTb3}
              checked={parseInt(idling) === 1 ? true : false}
              onChange={e => this.handleChangeCheckBoxRight(e, item, "idling")}
            />
          </td>
          <td>
            <FormControlLabel
              style={{ margin: 0 }}
              control={
                <Checkbox
                  className={classes.checkboxLabelTb3}
                  onChange={e =>
                    this.handleChangeCheckBoxRight(e, item, "sandy_soil")
                  }
                  checked={parseInt(sandy_soil) === 1 ? true : false}
                />
              }
              label="砂"
            />
          </td>
          <td>
            <FormControlLabel
              style={{ margin: 0 }}
              control={
                <Checkbox
                  className={classes.checkboxLabelTb3}
                  onChange={e =>
                    this.handleChangeCheckBoxRight(e, item, "clay_soil")
                  }
                  checked={parseInt(clay_soil) === 1 ? true : false}
                />
              }
              label="粘"
            />
          </td>
          <td>
            <InputBase
              className={classes.InputTable}
              multiline
              rowsMax="10"
              value={
                inputTemp.row === item && inputTemp.name === "other"
                  ? inputTemp.value
                  : other
              }
              onChange={e => this.handleChangeInputTable(e, item, "other")}
              onBlur={this.updateValue}
            />
          </td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        {/* <PrintRecordForm dataDetail={surveyInfo} /> */}
        {/* <PDFDownloadLink
          document={<PrintRecordForm dataDetail={surveyInfo} />}
          fileName="movielist.pdf"
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a"
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Pdf"
          }
        </PDFDownloadLink> */}
        {/* <Button
          type="button"
          variant="contained"
          color="primary"
          size="large"
          className={classes.btnSave}
          onClick={() => this.convertPdf()}
        >
          Convert Pdf
        </Button> */}
        <div
          className="btnSave"
          style={{
            display: "inline-flex",
            position: "relative",
            float: "right"
          }}
        >
          <Button
            disabled={statusSave.isLoadding}
            type="button"
            variant="contained"
            color="primary"
            size="large"
            className={classes.btnSave}
            onClick={() => this.handleSave()}
          >
            保存
          </Button>
          {statusSave.isLoadding && (
            <CircularProgress size={24} className={classes.iconProgress} />
          )}
        </div>
        <div className={classes.recordForm} id="printTable">
          <div className={classes.colLeftForm}>
            {/* col status */}
            <div className={classes.blockStatus}>
              <Typography component="h2" className={classes.titleStatus}>
                測定点{" "}
              </Typography>
              <List className={classes.rootList}>{renderStatus}</List>
              {arrNo && arrNo.length < 10 && (
                <Button
                  className={classes.btnAddNo}
                  onClick={() => {
                    return this.handleAddNewNo();
                  }}
                >
                  <AddIcon />
                </Button>
              )}
            </div>
            {/* end col status */}
            {/* table 1 */}
            <table className={classes.table1}>
              <tbody>
                <tr>
                  <td>現場名</td>
                  <td>
                    <TextFieldRecordForm
                      handleUpdate={this.handleUpdateText("site_name")}
                      value={surveyInfo && surveyInfo.site_name}
                      multiline={true}
                      rows={4}
                      rowsMax={14}
                    />
                  </td>
                </tr>
                <tr>
                  <td>天候</td>
                  <td style={{ paddingLeft: 5 }}>
                    <FormControlLabel
                      style={{ margin: "5px 0", width: "50%" }}
                      control={
                        <Checkbox
                          className={classes.checkboxLabelTbleft}
                          onChange={e =>
                            this.handleChangeCheckBoxArr(e, "weather", 0)
                          }
                          checked={
                            parseInt(surveyInfo.weather[0]) === 1 ? true : false
                          }
                        />
                      }
                      label="晴"
                    />
                    <FormControlLabel
                      style={{ margin: "5px 0", width: "50%" }}
                      control={
                        <Checkbox
                          className={classes.checkboxLabelTbleft}
                          onChange={e =>
                            this.handleChangeCheckBoxArr(e, "weather", 1)
                          }
                          checked={
                            parseInt(surveyInfo.weather[1]) === 1 ? true : false
                          }
                        />
                      }
                      label="曇"
                    />
                    <FormControlLabel
                      style={{ margin: "5px 0", width: "50%" }}
                      control={
                        <Checkbox
                          className={classes.checkboxLabelTbleft}
                          onChange={e =>
                            this.handleChangeCheckBoxArr(e, "weather", 2)
                          }
                          checked={
                            parseInt(surveyInfo.weather[2]) === 1 ? true : false
                          }
                        />
                      }
                      label="雨"
                    />
                    <FormControlLabel
                      style={{ margin: "5px 0", width: "50%" }}
                      control={
                        <Checkbox
                          className={classes.checkboxLabelTbleft}
                          onChange={e =>
                            this.handleChangeCheckBoxArr(e, "weather", 3)
                          }
                          checked={
                            parseInt(surveyInfo.weather[3]) === 1 ? true : false
                          }
                        />
                      }
                      label="雪"
                    />
                  </td>
                </tr>
                <tr>
                  <td>備考</td>
                  <td>
                    <TextFieldRecordForm
                      handleUpdate={this.handleUpdateText("remarks")}
                      value={surveyInfo && surveyInfo.remarks}
                      multiline={true}
                      rows={4}
                      rowsMax={14}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {/* end table 1 */}

            {/* table 2 */}
            <table className={`${classes.table1} ${classes.table2}`}>
              <tbody>
                {/* <tr>
                  <td>測定点No</td>
                  <td
                    style={{
                      textAlign: "center",
                      fontSize: 30,
                      color: "#007c77",
                      fontWeight: 500,
                      verticalAlign: "middle"
                    }}
                  >
                    {surveyInfo.measurement_point_no}
                  </td>
                </tr> */}
                <tr>
                  <td>水位</td>
                  <td>
                    <FormControlLabel
                      style={{ margin: 5 }}
                      control={
                        <Checkbox
                          className={classes.checkboxLabelTbleft}
                          onChange={e =>
                            this.handleUpdateCheckOnlyOne(e, "water_level")
                          }
                          checked={
                            parseInt(surveyInfo.water_level) === 1
                              ? true
                              : false
                          }
                        />
                      }
                      label="不明・"
                    />
                  </td>
                </tr>
                <tr>
                  <td>測定内容</td>
                  <td>
                    <FormControlLabel
                      style={{ margin: 5 }}
                      control={
                        <Checkbox
                          className={classes.checkboxLabelTbleft}
                          onChange={e =>
                            this.handleChangeCheckBoxArr(
                              e,
                              "measurement_content",
                              0
                            )
                          }
                          checked={
                            parseInt(surveyInfo.measurement_content[0]) === 1
                              ? true
                              : false
                          }
                        />
                      }
                      label="新規"
                    />
                    <FormControlLabel
                      style={{ margin: 5 }}
                      control={
                        <Checkbox
                          className={classes.checkboxLabelTbleft}
                          onChange={e =>
                            this.handleChangeCheckBoxArr(
                              e,
                              "measurement_content",
                              1
                            )
                          }
                          checked={
                            parseInt(surveyInfo.measurement_content[1]) === 1
                              ? true
                              : false
                          }
                        />
                      }
                      label="再調査"
                    />
                    <FormControlLabel
                      style={{ margin: 5 }}
                      control={
                        <Checkbox
                          className={classes.checkboxLabelTbleft}
                          onChange={e =>
                            this.handleChangeCheckBoxArr(
                              e,
                              "measurement_content",
                              2
                            )
                          }
                          checked={
                            parseInt(surveyInfo.measurement_content[2]) === 1
                              ? true
                              : false
                          }
                        />
                      }
                      label="部分転圧"
                    />
                    <FormControlLabel
                      style={{ margin: 5 }}
                      control={
                        <Checkbox
                          className={classes.checkboxLabelTbleft}
                          onChange={e =>
                            this.handleChangeCheckBoxArr(
                              e,
                              "measurement_content",
                              3
                            )
                          }
                          checked={
                            parseInt(surveyInfo.measurement_content[3]) === 1
                              ? true
                              : false
                          }
                        />
                      }
                      label="補足点"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {/* end table 2 */}

            {/* form left */}
            <div className={classes.blockBoxLeft}>
              <Typography style={{ fontSize: 16, marginBottom: 5 }}>
                GP 作業チェックシート
              </Typography>
              <div className={classes.groupBox}>
                {/* box 1 */}
                <div className={classes.box}>
                  <span className={classes.titleBox}>貫入不能</span>
                  <div className={classes.contentBox}>
                    打撃をしても入らない状態
                  </div>
                </div>
                {/* box 2 */}
                <div className={classes.box}>
                  <span className={classes.titleBox}>障害物当たり</span>
                  <div className={classes.contentBox}>
                    コンクリガラ等の埋設 物がある場合。埋立地
                    の割栗や擁壁ベース当 たりはこれに入らな い。
                  </div>
                </div>
                {/* box 3 */}
                {/* <div className={classes.box}>
                  <span className={classes.titleBox}>フェノール反応</span>
                  <div className={classes.contentBox}>
                    フェノール反応は記録 用紙の備考欄に記載。
                  </div>
                </div> */}
                {/* box 4 */}
                <div className={classes.box}>
                  <span className={classes.titleBox}>フェノール反応</span>
                  <div className={classes.contentBox}>
                    <RadioGroup
                      className={classes.groupRadio}
                      value={isCheckPhenol_reaction}
                      onChange={this.handleUpdateRadio("phenol_reaction")}
                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="なし "
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="貫入不能"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="モーターストール"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="障害物当たり"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="擁壁ベース当たり"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="打撃打抜"
                      />
                    </RadioGroup>
                  </div>
                </div>
                {/* box 5 */}
                <div className={classes.box}>
                  <span className={classes.titleBox}>備考欄</span>
                  <div className={classes.contentBox}>
                    測点の移動状況・フェ ノール反応・その他表
                    記すべきものを記入。
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.colRightForm}>
            <Typography style={{ textAlign: "center" }}>
              スウェーデン式サウンディング試験記録用紙
            </Typography>
            {/* table col right */}
            <table className={classes.tableColRight}>
              <thead>
                <tr>
                  <th>荷重</th>
                  <th>半回転数</th>
                  <th>貫入深度</th>
                  <th colSpan={3} style={{ background: "none" }}>
                    音感触
                  </th>
                  <th colSpan={7} style={{ background: "none" }}>
                    貫入状況
                  </th>
                  <th colSpan={3}>土質名</th>
                </tr>
                <tr>
                  <th>wsw</th>
                  <th>Na</th>
                  <th>m</th>
                  <th>シャリ</th>
                  <th>ジャリ</th>
                  <th>ガリ</th>
                  <th>掘削</th>
                  <th>ストン</th>
                  <th>スルスル</th>
                  <th>ユックリ</th>
                  <th>ジンワリ</th>
                  <th>打撃回数</th>
                  <th>空転</th>
                  <th>砂質土</th>
                  <th>粘性土</th>
                  <th>その他</th>
                </tr>
              </thead>
              <tbody>{elRender}</tbody>
            </table>
            {/* end table 1 */}
          </div>
        </div>
        <div
          className="btnSave"
          style={{
            marginTop: 20,
            display: "inline-flex",
            position: "relative",
            float: "right"
          }}
        >
          <Button
            disabled={statusSave.isLoadding}
            type="button"
            variant="contained"
            color="primary"
            size="large"
            className={classes.btnSave}
            onClick={() => this.handleSave()}
          >
            保存
          </Button>
          {statusSave.isLoadding && (
            <CircularProgress size={24} className={classes.iconProgress} />
          )}
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
              variant={statusSave.isError === -1 ? "error" : "success"}
              message={statusSave.message}
            />
          )}
        </Snackbar>
        {/* End Notification event */}
      </React.Fragment>
    );
  };
}

RecordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  surveyId: PropTypes.string,
  no: PropTypes.number
};
export default withRoot(withStyles(styles)(RecordForm));
