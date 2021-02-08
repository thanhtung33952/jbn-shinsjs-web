import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";
import leafletImage from "leaflet-image";
import axios from "axios";
// img
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
// constant
import { apiRoot } from "constant/index.js";
// component customer
import Notification from "components/Notification/Notification.jsx";
import TextFieldSjsAcoor from "components/TextFieldSjsAcoordion/TextFieldSjsAcoordion.jsx";
// common function
import { getPostion } from "utils/common.js";

// jss
const styles = theme => ({
  root: {
    // height: "100%",
    border: "1px solid gray",
    position: "relative",
    marginBottom: 80,
    padding: "20px 15px"
  },
  line: {
    height: 28,
    backgroundColor: "#213858"
  },
  grMain: {
    color: "#213858",
    padding: "0 80px",
    width: "100%",
    "& h1": {
      fontSize: 30,
      fontWeight: 900,
      letterSpacing: 1,
      color: "#213858",
      position: "relative",
      lineHeight: "48px",
      display: "block",
      borderBottom: "dashed 1px #777",
      marginTop: 30,
      width: "100%"
    }
  },
  table: {
    borderSpacing: 1,
    color: "gray",
    marginTop: 30,
    marginBottom: 120,
    width: "100%",
    fontSize: 15,
    "& tr th, tr td": {
      border: "1px solid gray",
      textAlign: "center"
    },
    "& tr td:nth-child(1)": {
      color: "#213858",
      width: 110,
      letterSpacing: 1,
      fontSize: 15,
      verticalAlign: "top"
    },
    "& tr td:nth-child(2)": {
      textAlign: "left",
      padding: "px 10px"
    }
  },
  map: {
    height: "100%",
    width: 602,
    marginTop: 10
  },
  rowBtnOption: {
    position: "absolute",
    top: -34,
    right: 0
  },
  input: {
    width: "100%",
    "& input": {
      padding: "4px 10px"
    },
    "& fieldset": {
      borderRadius: 0,
      border: "none"
    }
  },
  btnSave: {
    border: "none !important",
    color: "#fff !important",
    borderRadius: 0,
    padding: "0px 30px",
    textTransform: "none",
    minHeight: 30,
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
  }
});
class SurveyReportPage4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 14,
      isValidationAll: false, // isValidationAll: true => ok active btn save
      surveyId: null,
      data: {
        temporary_address: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          isRequire: true,
          val: ""
        },
        final_address: {
          isVali: 0,
          isRequire: true,
          val: ""
        },
        coordinates: {
          isVali: 0,
          isRequire: true,
          val: ""
        }
      },
      statusSave: {
        open: false,
        message: "",
        status: 0, // 1: succes, -1 error
        isLoadding: false
      }
    };
    this.mapRef = React.createRef();
    // reference Marker
    this.markerRef = React.createRef();
  }
  componentDidMount = () => {
    const { id, data } = this.props;
    // if (id) {
    //   this.setState({ surveyId: id });
    //   this.getDataSurveyReport(id);
    // }
    this.convertDataPage(data);
  };
  UNSAFE_componentWillReceiveProps = nextProps => {
    // if (!nextProps.id) return;
    // // check nếu id survey khác thì không cho nó lấy lại data nữa, vì bản chất vòng đời này luôn vào khi props thay đổi
    // if (nextProps.id !== this.state.surveyId) {
    //   this.setState({ surveyId: nextProps.id });
    //   this.getDataSurveyReport(nextProps.id);
    // } else return;
    this.convertDataPage(nextProps.data);
  };

  convertDataPage = async dataParent => {
    const { data } = this.state;
    if (!dataParent) {
      return false;
    }
    data.temporary_address.val = dataParent.temporary_address;
    data.temporary_address.isVali = dataParent.temporary_address ? 1 : 0;
    data.final_address.val = dataParent.final_address;
    data.final_address.isVali = dataParent.final_address ? 1 : 0;
    data.coordinates.val = dataParent.coordinates;
    data.coordinates.isVali = dataParent.coordinates ? 1 : 0;
    this.setState({ data }, () => this.validationAllPage());
  };

  // getDataSurveyReport = async id => {
  //   const { data } = this.state;
  //   const res = await axios.get(`${apiRoot}/groundsurveyreport4/${id}`);
  //   // Failed
  //   if (res.status !== 200 || res.data === false) {
  //     return false;
  //   }
  //   // Success
  //   let result = res.data;
  //   data.temporary_address.val = result.temporary_address;
  //   data.temporary_address.isVali = result.temporary_address ? 1 : 0;
  //   data.final_address.val = result.final_address;
  //   data.final_address.isVali = result.final_address ? 1 : 0;
  //   data.coordinates.val = result.coordinates;
  //   data.coordinates.isVali = result.coordinates ? 1 : 0;
  //   this.setState({ data }, () => this.validationAllPage());
  // };

  // event validation blur field text thông qua component TextFieldSjsAcoor
  handleChangeValue = name => (isVali, value) => {
    const { handleChange } = this.props;
    // const { data } = this.state;
    // data[name].isVali = isVali;
    // data[name].val = value;

    if (handleChange) {
      handleChange("page4", name, value);
    }
    // this.setState({ data }, () => this.validationAllPage());
  };

  // validation All page
  validationAllPage = () => {
    const { data } = this.state;
    let isValidationPage = true; // validation ok.
    // vòng for sẽ ckeck isVali từng field nếu field nào isVali === false sẽ bỏ qua.
    for (let name in data) {
      if (!data[name] || (data[name].isVali === -1 && data[name].isRequire)) {
        // nếu field nào false thì cả acoordition === faild, và out ngay
        isValidationPage = false;
        break;
      } else if (
        !data[name] ||
        (data[name].isVali === 0 && data[name].isRequire)
      ) {
        isValidationPage = false;
        break;
      }
    }
    this.setState({ isValidationAll: isValidationPage });
  };
  handleDragMarker = () => {
    const { handleChange } = this.props;
    // const { data } = this.state;
    const marker = this.markerRef.current;
    if (!marker) {
      return;
    }
    const cor = marker.leafletElement.getLatLng();
    let latLng = cor.lat + "," + cor.lng;
    // data.coordinates.val = latLng;
    // data.coordinates.isVali = 1;
    // this.setState({ data }, () => this.validationAllPage());
    if (handleChange) {
      handleChange("page4", "coordinates", latLng);
    }
  };

  handleCloseNotification = () => {
    const { statusSave } = this.state;
    statusSave.open = false;
    statusSave.isLoadding = false;
    statusSave.status = 0;
    statusSave.message = "";
    this.setState({ statusSave });
  };
  handleDblClick = e => {
    const { handleChange } = this.props;
    // const { data } = this.state;
    const cor = e.latlng;
    if (cor) {
      let latLng = cor.lat + "," + cor.lng;
      // data.coordinates.val = latLng;
      // data.coordinates.isVali = 1;
      // this.setState({ data }, () => this.validationAllPage());
      if (handleChange) {
        handleChange("page4", "coordinates", latLng);
      }
    }
  };

  onZoomEvent = e => {
    const { handleChange } = this.props;
    this.setState({ zoom: e.target._zoom });
    if (handleChange) {
      handleChange("page4", "zoom", e.target._zoom);
    }
  };
  handleSave = () => {
    const { isNew } = this.props;
    if (isNew) {
      // insert
      this.insertSurveyReport();
    } else {
      this.updateSurveyReport();
    }
  };
  insertSurveyReport = async () => {
    const { handleChangeIsNew } = this.props;
    const { data, statusSave } = this.state;
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataInsert = {
      id_ground_survey_report: this.props.id,
      temporary_address: data.temporary_address.val,
      final_address: data.final_address.val,
      coordinates: data.coordinates.val
    };
    const res = await axios.post(`${apiRoot}/groundsurveyreport4`, dataInsert);

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
    handleChangeIsNew("page4", false);
  };

  updateSurveyReport = async () => {
    const { data, statusSave } = this.state;
    statusSave.isLoadding = true;
    this.setState({ statusSave });
    let dataUpdate = {
      temporary_address: data.temporary_address.val,
      final_address: data.final_address.val,
      coordinates: data.coordinates.val
    };
    const res = await axios.put(
      `${apiRoot}/groundsurveyreport4/${this.props.id}`,
      dataUpdate
    );

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
  render = () => {
    const { classes } = this.props;
    const { data, isValidationAll, statusSave } = this.state;
    const defaultPosition = getPostion("35.68089", "139.76749");
    // center position
    const latLng = data.coordinates.val
      ? data.coordinates.val.split(",")
      : null;
    let centerPosition = latLng ? getPostion(latLng[0], latLng[1]) : null;
    centerPosition = centerPosition ? centerPosition : defaultPosition;

    // marker position
    let markerPosition = latLng ? getPostion(latLng[0], latLng[1]) : null;
    markerPosition = markerPosition ? markerPosition : defaultPosition;
    return (
      <Paper className={classes.root}>
        {/* button save/insert */}
        <div className={classes.rowBtnOption}>
          <Button
            disabled={!isValidationAll}
            variant="contained"
            className={classes.btnSave}
            onClick={() => this.handleSave()}
          >
            保存
          </Button>
          {statusSave.isLoadding && (
            <CircularProgress size={24} className={classes.iconProgress} />
          )}
        </div>
        {/* end button save */}
        <Divider className={classes.line} />
        <div className={classes.grMain}>
          <Typography component="h1">調査場所</Typography>
          <div style={{ height: 700, marginTop: 20, width: "100%" }}>
            <Map
              ref={this.mapRef}
              center={centerPosition}
              zoom={this.state.zoom}
              minZoom={5}
              doubleClickZoom={false}
              className={classes.map}
              onZoomend={this.onZoomEvent}
              ondblClick={this.handleDblClick}
            >
              {/* Basic Layer */}
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              {/* End Basic Layer */}
              <Marker
                draggable={true}
                onDragend={this.handleDragMarker}
                ref={this.markerRef}
                position={markerPosition}
                onDrap
              />
            </Map>
          </div>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td>仮住所 </td>
                <td>
                  <TextFieldSjsAcoor
                    permission={null}
                    placeholder=""
                    required={data.temporary_address.isRequire}
                    customStyleRoot={classes.input}
                    isVali={data.temporary_address.isVali}
                    handleUpdate={this.handleChangeValue("temporary_address")}
                    value={data.temporary_address.val}
                  />
                </td>
              </tr>
              <tr>
                <td>確定住所 </td>
                <td>
                  <TextFieldSjsAcoor
                    permission={null}
                    placeholder=""
                    required={data.final_address.isRequire}
                    customStyleRoot={classes.input}
                    isVali={data.final_address.isVali}
                    handleUpdate={this.handleChangeValue("final_address")}
                    value={data.final_address.val}
                  />
                </td>
              </tr>
              <tr>
                <td>緯度、経度 </td>
                <td>
                  <TextFieldSjsAcoor
                    permission={null}
                    placeholder=""
                    required={data.coordinates.isRequire}
                    customStyleRoot={classes.input}
                    isVali={data.coordinates.isVali}
                    handleUpdate={this.handleChangeValue("coordinates")}
                    value={data.coordinates.val}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Divider className={classes.line} style={{ height: 15 }} />
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
      </Paper>
    );
  };
}

SurveyReportPage4.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  isNew: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeIsNew: PropTypes.func
};
export default withRoot(withStyles(styles)(SurveyReportPage4));
