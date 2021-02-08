import React from "react";
import withRoot from "withRoot";
import { Redirect } from "react-router-dom";
import PropTypes, { instanceOf } from "prop-types";
import { Link } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { Scrollbars } from "react-custom-scrollbars";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";

// import ClusterLayer from 'react-leaflet-cluster-layer';
// common function
import { getPostion } from "utils/common.js";
// contant
import { apiGeocode, folderRoot } from "constant/index.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
// component customer
import DoughnutScore from "components/DoughnutScore/DoughnutScore.jsx";
//
import axios from "axios";
import { apiRoot } from "constant/index.js";
// layout
import Master3Col from "layout/Master3Col.jsx";
import { classes } from "istanbul-lib-coverage";

const styles = () => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  colLeft: {
    maxWidth: "80%",
    flexBasis: "80%",
    position: "relative",
    zIndex: 1
  },
  colRight: {
    maxWidth: "20%",
    flexBasis: "20%",
    boxShadow: "-5px -2px 5px 0px #ababab",
    zIndex: 2
  },
  map: {
    height: "calc(100vh - 113px)",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  titleRight: {
    fontSize: 18,
    textAlign: "center",
    margin: "20px 0",
    lineHeight: "24px"
  },
  time: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: "35px",
    marginBottom: 10
  },
  paperDetail: {
    width: "20%",
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: "#00A2FF",
    borderRadius: 0,
    padding: "25px 15px",
    color: "#fff",
    "& p": {
      fontSize: 14,
      margin: "15px 0"
    }
  },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 3,
    padding: 5,
    color: "#fff"
  },
  aRedirect: {
    display: "flex",
    border: "solid 1px #fff",
    borderRadius: 0,
    padding: 5,
    color: "#fff",
    marginTop: 35
  },
  popupMap: {
    padding: 0,
    border: "none",
    marginTop: -12,
    "&:before": {
      border: "12px solid transparent",
      marginBottom: -41,
      borderTopWidth: 41,
      borderBottom: "none",
      left: "calc(50% - 6px)"
    },
    "& $statusMar": {
      position: "absolute",
      fontWeight: "bold",
      top: -20,
      right: 2
    }
  },
  popupMapBlue: {
    backgroundColor: "#1DB100",
    "&:before": {
      borderTopColor: "#1DB100"
    },
    "& $statusMar": {
      color: "#127200"
    }
  },
  popupMapYelow: {
    backgroundColor: "#FF9300",
    "&:before": {
      borderTopColor: "#FF9300"
    },
    "& $statusMar": {
      color: "#CC7600"
    }
  },
  popupMapOran: {
    backgroundColor: "#B61A00",
    "&:before": {
      borderTopColor: "#B61A00"
    },
    "& $statusMar": {
      color: "#B61A00"
    }
  },
  popupMapSelect: {
    backgroundColor: "#00A2FF",
    "&:before": {
      borderTopColor: "#00A2FF"
    },
    "& $statusMar": {
      color: "#00A2FF"
    }
  },
  statusMar: {},
  contentPopupM: {
    padding: 8,
    minWidth: 100,
    cursor: "pointer",
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    "& p": {
      margin: 0
    }
  }
});
// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
let h = String(day.getHours());
let m = String(day.getMinutes());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;
let hours = h.length === 1 ? "0" + h : h;
let minute = m.length === 1 ? "0" + m : m;
let time = hours + ":" + minute;

// const MyMarker = props => {
//   const initMarker = ref => {
//     if (ref) {
//       ref.leafletElement.openPopup();
//     }
//   };

//   return <Marker ref={initMarker} {...props} />;
// };
class MapSurveyPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isCheck: 0,
      isLoadding: false,
      lat: "35.68089",
      lng: "139.76749",
      zoom: 15,
      isDetail: false,
      surveyMapSelect: null,
      dataSurveyMap: null,
      total: 0,
      totalEstablished: 0
    };

    // reference MAP
    this.mapRef = React.createRef();
  }
  componentDidMount = () => {
    const { cookies } = this.props;
    const userInfo = cookies.get("authUserShinSJS");
    if (userInfo && userInfo.userId) {
      this.getTotalSurveyMap(userInfo.userId);
      this.getSurveyMap(userInfo.userId);
    }
  };

  getTotalSurveyMap = async userId => {
    try {
      const res = await axios.post(`${apiRoot}/totalsurveymap`, {
        userId: userId
      });
      // Failed
      let result = res.data;
      if (result === false || res.status !== 200) {
        return;
      }
      if (
        !result.total ||
        result.total === 0 ||
        !result.totalEstablished ||
        result.totalEstablished === 0
      ) {
        return;
      }
      // success
      this.setState({
        total: result.total,
        totalEstablished: result.totalEstablished
      });
    } catch (error) {
      return;
    }
  };

  getSurveyMap = async userId => {
    try {
      const res = await axios.post(`${apiRoot}/surveymaps`, {
        userId: userId
      });
      // Failed
      let result = res.data;
      if (!result || res.status !== 200) {
        return;
      }
      // success
      this.setState({ dataSurveyMap: result });
    } catch (error) {
      return;
    }
  };

  onZoomEvent = e => {
    this.setState({ zoom: e.target.zoom });
  };
  handleShowDetail = idMapSurvey => () => {
    let itemSelect = this.state.dataSurveyMap.find(x => x.id === idMapSurvey);
    if (!itemSelect) return;
    const latLng =
      itemSelect.location_information &&
      itemSelect.location_information.split(",");
    if (latLng && latLng.length === 2) {
      this.setState({ lat: latLng[0], lng: latLng[1] });
    }
    this.setState({ surveyMapSelect: itemSelect, isDetail: true });
  };

  handleHiddenDetail = () => {
    this.setState({ surveyMapSelect: null, isDetail: false });
  };

  renderClassPopupMap = status => {
    const { classes } = this.props;
    switch (status) {
      case "成立済":
        return classes.popupMapBlue;
      case "募集中":
        return classes.popupMapOran;
      case "交渉中":
        return classes.popupMapYelow;
      default:
        return null;
    }
  };

  // assignPopupProperties = popup => {
  //   if (!popup || !popup.leafletElement) return;
  //   popup.leafletElement.options.autoClose = false;
  //   popup.leafletElement.options.closeOnClick = false;
  // };

  render = () => {
    const { classes } = this.props;
    const {
      lat,
      lng,
      total,
      totalEstablished,
      isDetail,
      surveyMapSelect,
      dataSurveyMap
    } = this.state;
    let centerPosition = getPostion(lat, lng);
    let listMarker =
      dataSurveyMap &&
      dataSurveyMap.map(item => {
        // tách lat, lng
        const latLngMarker =
          item.location_information && item.location_information.split(",");
        if (!item.location_information || !item.statusSurvey) {
          return false;
        }
        // convert lat, lng
        let position = getPostion(latLngMarker[0], latLngMarker[1]);
        let classPopup = this.renderClassPopupMap(item.statusSurvey);
        let classSelect =
          surveyMapSelect && surveyMapSelect.id === item.id
            ? classes.popupMapSelect
            : null;
        if (position && position.length === 2) {
          return (
            <Marker key={`marker-${item.id}`} position={position} opacity={0}>
              <Tooltip
                direction="top"
                interactive
                offset={[0, 0]}
                opacity={1}
                permanent
                className={`${classes.popupMap} ${classPopup} ${classSelect}`}
              >
                <div
                  className={classes.contentPopupM}
                  onClick={this.handleShowDetail(item.id)}
                >
                  <span className={classes.statusMar}>{item.statusSurvey}</span>
                  <p>{item.property_name}</p>
                  <span>{item.update_date}</span>
                </div>
              </Tooltip>
            </Marker>
          );
        }
        return;
      });

    return (
      <Master3Col
        colLeft={null}
        colRight={null}
        maxWidthPage={"100%"}
        titleHeader="地盤調査：受発注マップ"
        subTitleHeader={null}
        breadcrumb="地盤調査申込案件を掲載しています。"
      >
        <div className={classes.container}>
          <div className={classes.colLeft}>
            <Map
              center={centerPosition}
              className={classes.map}
              zoom={12}
              // ondblClick={this.handleDblClick}
            >
              {/* Basic Layer */}
              <TileLayer
                attribution='&copy; <a href="https://osm.org/c	opyright">OpenStreetMap</a> contributors'
                url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              />
              {/* End Basic Layer */}
              {listMarker}
            </Map>
          </div>
          <div className={classes.colRight}>
            <Typography className={classes.titleRight}>
              地盤調査申込案件を <br />
              マッピングしました。
              <br />
              調査可能な案件があれば
              <br />
              申込会社に連絡して下さい
            </Typography>
            <Typography className={classes.time}>
              {today}
              <br />
              {time}
            </Typography>
            <DoughnutScore
              totle={parseInt(total)}
              pieces={parseInt(totalEstablished)}
              labelTotle="掲載件数（全国）"
              labelPieces="成立件数"
              widthD={220}
              cutoutPer={88}
              colorText="#007000"
              sizeText={50}
            />
          </div>
          {surveyMapSelect && (
            <Slide
              direction="left"
              in={isDetail && surveyMapSelect ? true : false}
            >
              <Paper elevation={4} className={classes.paperDetail}>
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={this.handleHiddenDetail}
                >
                  <CloseIcon />
                </IconButton>
                <Typography>物件名：{surveyMapSelect.property_name}</Typography>
                <Typography>
                  会社名：{surveyMapSelect.c_business_name}
                </Typography>
                <Typography>
                  調査希望日：{surveyMapSelect.update_date}
                </Typography>
                <Typography>住所：{surveyMapSelect.street_address}</Typography>
                <Typography>
                  調査方法：{surveyMapSelect.survey_method}
                </Typography>
                <Typography>メモ：{surveyMapSelect.note}</Typography>
                <Button
                  href={`${folderRoot}operation/survey/${surveyMapSelect.id}`}
                  target="_blank"
                  className={classes.aRedirect}
                >
                  物件の詳細画面へ
                </Button>
              </Paper>
            </Slide>
          )}
        </div>
      </Master3Col>
    );
  };
}

MapSurveyPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withCookies(withRoot(withStyles(styles)(MapSurveyPage)));
