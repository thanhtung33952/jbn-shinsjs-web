import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";
import { connect } from "react-redux";

// common function
import { getPostion } from "utils/common.js";
// contant
import { apiGeocode } from "constant/index.js";
// redux action
import { updateValidation } from "actions/surveyActions.js";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// icon material
import DoneIcon from "@material-ui/icons/Done";
import CreateIcon from "@material-ui/icons/Create";

// icon img
import ExpandCloseIcon from "assets/img/icon_close_survey.png";
import ExpandOpenIcon from "assets/img/icon_open_survey.png";
// custom component
import MapContainer from "components/Map/MapContainer";
import TextFieldSjsAcoor from "components/TextFieldSjsAcoordion/TextFieldSjsAcoordion.jsx";
// jss
import { device } from "assets/jss/responsive/device.jsx";
const styles = theme => ({
  // acoordion
  acoordion: {
    margin: "10px 0"
  },
  expansionPanelSummary: {
    padding: "5px 10px"
  },
  expansionContent: {
    justifyContent: "space-between"
  },
  headingAcoordion: {
    color: theme.palette.greenDark.dark,
    fontWeight: "400 !important",
    "& img": {
      verticalAlign: "bottom",
      marginRight: 10,
      height: 25
    }
  },
  headingAcoordionRight: {
    color: "#192928",
    fontWeight: "400 !important",
    "& span": {
      fontWeight: "400 !important",
      color: "#192928"
    }
  },
  iconDone: {
    color: theme.palette.pink.main
  },
  acoordionDetail: {
    paddingRight: 60,
    paddingLeft: 60,
    display: "flex",
    flexDirection: "column",
    [device.tablet]: {
      paddingRight: 5,
      paddingLeft: 5
    }
  },
  formGroup: {
    display: "flex",
    justifyContent: "flex-start",
    margin: "8px 0",
    color: theme.palette.secondary.dark,
    fontSize: 14,
    width: "100%",
    "& label": {
      textAlign: "right",
      width: "20%",
      paddingRight: 15,
      lineHeight: "42px",
      "& svg": {
        height: "100%",
        color: theme.palette.primary.dark
      },
      [device.tablet]: {
        lineHeight: "22px"
      }
    }
  },
  lineForm: {
    borderStyle: "inset",
    borderWidth: 1,
    clear: "both",
    marginTop: 0,
    marginBottom: 0,
    width: "80%",
    marginLeft: "20%"
  },
  labEndRow: {
    width: "auto",
    paddingRight: "0 !important",
    paddingLeft: 15,
    textAlign: "left !important"
  },
  rowInputForm: {
    margin: "0 0",
    minWidth: "80%"
  },
  rowInputFormInline40: {
    margin: "0 0",
    minWidth: "40%"
  },
  rowInputFormInlineButton: {
    margin: "0 0",
    minWidth: "calc(50% - 15px)"
  },
  textAreaForm: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 6,
    margin: 0,
    "& fieldset": {
      borderColor: theme.palette.secondary.main + `${"!important"}`
    }
  },
  btnDefault: {
    width: "30%",
    backgroundColor: theme.palette.green.light,
    border: "none",
    color: "#fff",
    borderRadius: 4,
    padding: "0px 10px",
    textTransform: "none",
    minHeight: 42,
    fontSize: "1rem",
    marginLeft: 15,
    fontFamily: "'M PLUS 1p', sans-serif",
    fontWeight: 300,
    "&:hover": {
      backgroundColor: theme.palette.pink.main,
      "&:after": {
        borderLeftColor: theme.palette.pink.main
      }
    }
  },
  styleRead: {
    "& $formGroup": {
      "& label": {
        // lineHeight: "20px"
      },
      "& span": {
        // lineHeight: "20px",
        fontWeight: 500
      }
    },
    "& $lineForm": {
      // display: "none"
    },
    "& $labEndRow": {
      // position: "relative !important"
    }
  },
  map: {
    height: 400,
    width: "100%",
    marginBottom: 5,
    border: "solid 1px gray"
  }
});
class Acoordion3 extends React.Component {
  constructor(props) {
    super(props);
    this.noticeAcoor10 = React.createRef();
    this.state = {
      expanded: false,
      isOpenMap: false,
      zoom: 14,
      isLoadingSearchCompany: false,
      listCompany: [],
      data: {
        property_name: {
          isVali: 0, // 1: ok, 0: norma , -1: error
          isRequire: true
        },
        furigana: {
          isVali: 0,
          isRequire: false
        },
        number_of_applications: {
          isVali: 0,
          isRequire: true
        },
        division: {
          isVali: 0,
          isRequire: false
        },
        location_prefecture: {
          isVali: 0,
          isRequire: true
        },
        city_or_county: {
          isVali: 0,
          isRequire: true
        },
        street_address: {
          isVali: 0,
          isRequire: true
        },
        location_information: {
          isVali: 0,
          isRequire: true
        },
        construction_number: {
          isVali: 0,
          isRequire: false
        }
      }
    };

    // reference MAP
    this.mapRef = React.createRef();
    // reference Marker
    this.markerRef = React.createRef();
  }

  componentDidMount = () => {
    const { dataDetail } = this.props;
    const { data } = this.state;
    if (!dataDetail) {
      return;
    }
    data.property_name.isVali = dataDetail.property_name ? 1 : 0;
    data.furigana.isVali = dataDetail.furigana ? 1 : 0;
    data.number_of_applications.isVali = dataDetail.number_of_applications
      ? 1
      : 0;
    data.division.isVali = dataDetail.division ? 1 : 0;
    data.location_prefecture.isVali = dataDetail.location_prefecture ? 1 : 0;
    data.city_or_county.isVali = dataDetail.city_or_county ? 1 : 0;
    data.street_address.isVali = dataDetail.street_address ? 1 : 0;
    data.location_information.isVali = dataDetail.location_information ? 1 : 0;
    data.construction_number.isVali = dataDetail.construction_number ? 1 : 0;
    this.setState({ data: data }, () => this.validationAllAcoordion());
  };
  // event validation blur field text thông qua component TextFieldSjsAcoor
  handleUpdate = name => (isVali, value) => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    data[name].isVali = isVali;

    this.setState({ data }, () => this.validationAllAcoordion());
    if (handleUpdate) {
      handleUpdate(name, value);
    }
  };

  // handle change location
  handleChangeCoordinates = (lat, lng) => {
    const { handleUpdate } = this.props;
    const { data } = this.state;
    let location = lat + "," + lng;
    data.location_information.isVali = 1;
    if (handleUpdate) {
      handleUpdate("location_information", location);
    }
    this.setState({ data, isOpenMap: false }, () =>
      this.validationAllAcoordion()
    );
  };

  // validation All acoordion
  validationAllAcoordion = () => {
    const { dispatch } = this.props;
    const { data } = this.state;
    //console.log(itemArrCoor);
    let isValidationAcoor = true; // validation ok.
    // vòng for sẽ ckeck isVali từng field nếu field nào isVali === false sẽ dừng ngay.
    for (let name in data) {
      if (data[name].isVali === -1 && data[name].isRequire) {
        // nếu field nào false thì cả acoordition === faild, và out ngay
        isValidationAcoor = false;
        break;
      } else if (data[name].isVali === 0 && data[name].isRequire) {
        // nếu field nào chưa làm gì cả (isVali==0)
        // + trường mode isnew == true thì cả acoord === faild
        // + trường mode isnew == false thì cả acoord === ok (vì trường hợp đã có data sẵn trên từng field)
        isValidationAcoor = false;
        break;
      }
    }
    dispatch(
      updateValidation({
        nameAcoor: "acoordion3",
        isVali: isValidationAcoor
      })
    );
  };

  // find acoordion có validation chưa
  findValitionAcoordion = nameAcoor => {
    const { surveyProps } = this.props;
    const validation = surveyProps.validation;
    let isValidation = validation.find(x => x.nameAcoor === nameAcoor).isVali;
    return isValidation;
  };

  handleDragMarker = () => {
    const marker = this.markerRef.current;
    if (!marker) {
      return;
    }

    const cor = marker.leafletElement.getLatLng();
    this.handleChangeCoordinates(cor.lat, cor.lng);
  };

  handleDblClick = e => {
    const cor = e.latlng;
    if (cor) {
      this.handleChangeCoordinates(cor.lat, cor.lng);
    }
  };

  onZoomEvent = e => {
    this.setState({ zoom: e.target._zoom });
  };
  toggleExpand = (event, expanded) => {
    this.setState({
      expanded: expanded
    });
  };

  render = () => {
    const { classes, dataDetail, permission } = this.props;
    const { data, expanded } = this.state;
    const latLng =
      dataDetail &&
      dataDetail.location_information &&
      dataDetail.location_information.split(","); // lat, lng
    const defaultPosition = getPostion("35.68089", "139.76749");
    let centerPosition;
    // center position;
    if (latLng && latLng.length > 0) {
      centerPosition = getPostion(latLng[0], latLng[1]);
    }
    centerPosition = centerPosition ? centerPosition : defaultPosition;

    let openExpan = this.findValitionAcoordion("acoordion2");
    return (
      <React.Fragment>
        {/* acoordion 1 */}
        <ExpansionPanel
          disabled={!openExpan}
          className={classes.acoordion}
          style={{ marginTop: 0 }}
          expanded={expanded}
          onChange={this.toggleExpand}
        >
          <ExpansionPanelSummary
            className={classes.expansionPanelSummary}
            classes={{
              root: classes.expansionPanelSummary,
              content: classes.expansionContent
            }}
          >
            <Typography className={classes.headingAcoordion}>
              {expanded ? (
                <img src={ExpandOpenIcon} />
              ) : (
                <img src={ExpandCloseIcon} />
              )}
              3. 物件情報
            </Typography>
            <Typography className={classes.headingAcoordionRight}>
              {this.findValitionAcoordion("acoordion3") ? (
                <span>ご記入ください</span>
              ) : (
                <span style={{ color: "#B40D26" }}>記入済み</span>
              )}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={`${classes.acoordionDetail} ${
              permission === "R" ? classes.styleRead : ""
            }`}
          >
            <div className={classes.formGroup}>
              <label htmlFor="物件名:" style={{ color: "#AA041B" }}>
                物件名:
              </label>
              <TextFieldSjsAcoor
                permission={permission}
                placeholder="物件名"
                required={data.property_name.isRequire}
                customStyleRoot={classes.rowInputForm}
                isVali={data.property_name.isVali}
                handleUpdate={this.handleUpdate("property_name")}
                value={dataDetail.property_name}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="フリガナ:">フリガナ:</label>
              <TextFieldSjsAcoor
                permission={permission}
                placeholder="フリガナ"
                required={data.furigana.isRequire}
                customStyleRoot={classes.rowInputForm}
                isVali={data.furigana.isVali}
                handleUpdate={this.handleUpdate("furigana")}
                value={dataDetail.furigana}
              />
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={classes.formGroup} style={{ position: "relative" }}>
              <label htmlFor="申込棟数:" style={{ color: "#AA041B" }}>
                申込棟数:
              </label>
              <TextFieldSjsAcoor
                permission={permission}
                required={true}
                isNumber={true}
                customStyleRoot={classes.rowInputForm}
                isVali={data.number_of_applications.isVali}
                handleUpdate={this.handleUpdate("number_of_applications")}
                value={dataDetail.number_of_applications}
              />
              <label
                className={classes.labEndRow}
                style={{ position: "absolute", width: "auto", right: 10 }}
              >
                棟
              </label>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="区割り:">区割り:</label>
              <TextFieldSjsAcoor
                permission={permission}
                placeholder="例：A区画"
                required={data.division.isRequire}
                customStyleRoot={classes.rowInputForm}
                isVali={data.division.isVali}
                handleUpdate={this.handleUpdate("division")}
                value={dataDetail.division}
              />
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={classes.formGroup}>
              <label
                htmlFor="所在地　都道府県:"
                style={{
                  width: "40%",
                  marginLeft: "-20%",
                  color: "#AA041B"
                }}
              >
                所在地　都道府県:
              </label>
              <TextFieldSjsAcoor
                permission={permission}
                placeholder="都道府県"
                required={true}
                customStyleRoot={classes.rowInputForm}
                isVali={data.location_prefecture.isVali}
                handleUpdate={this.handleUpdate("location_prefecture")}
                value={dataDetail.location_prefecture}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="市区郡:" style={{ color: "#AA041B" }}>
                市区郡:
              </label>
              <TextFieldSjsAcoor
                permission={permission}
                placeholder="市区郡"
                required={true}
                customStyleRoot={classes.rowInputForm}
                isVali={data.city_or_county.isVali}
                handleUpdate={this.handleUpdate("city_or_county")}
                value={dataDetail.city_or_county}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="地名番地:" style={{ color: "#AA041B" }}>
                地名番地:
              </label>
              <TextFieldSjsAcoor
                permission={permission}
                placeholder="地名番地"
                required={true}
                customStyleRoot={classes.rowInputForm}
                isVali={data.street_address.isVali}
                handleUpdate={this.handleUpdate("street_address")}
                value={dataDetail.street_address}
              />
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={classes.formGroup}>
              <label htmlFor="位置情報:" style={{ color: "#AA041B" }}>
                位置情報:
              </label>
              <TextFieldSjsAcoor
                permission={permission}
                placeholder="緯度経度"
                required={true}
                customStyleRoot={classes.rowInputFormInlineButton}
                isVali={data.location_information.isVali}
                handleUpdate={this.handleUpdate("location_information")}
                value={dataDetail.location_information}
              />
              {permission !== "R" && (
                <Button
                  variant="contained"
                  className={classes.btnDefault}
                  onClick={() => this.setState({ isOpenMap: true })}
                >
                  地図を別ウインドウで表示
                </Button>
              )}
            </div>
            <div className={classes.formGroup}>
              <label htmlFor=""></label>
              <div className={classes.rowInputForm}>
                <Map
                  ref={this.mapRef}
                  onZoomend={this.onZoomEvent}
                  center={centerPosition}
                  zoom={this.state.zoom}
                  minZoom={5}
                  doubleClickZoom={false}
                  className={classes.map}
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
                    position={centerPosition}
                    onDrap
                  />
                </Map>
                <Typography
                  variant="caption"
                  align="left"
                  style={{ display: "block" }}
                >
                  位置の変更は、マーカーを移動させるか、地図上をダブルクリックして下さい
                </Typography>
              </div>
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
            <div className={classes.formGroup}>
              <label htmlFor="工事番号:">工事番号:</label>
              <TextFieldSjsAcoor
                permission={permission}
                placeholder="工事番号"
                required={data.construction_number.isRequire}
                customStyleRoot={classes.rowInputForm}
                isVali={data.construction_number.isVali}
                handleUpdate={this.handleUpdate("construction_number")}
                value={dataDetail.construction_number}
              />
            </div>
            <Divider
              classes={{
                root: classes.lineForm
              }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* end acoordion 1 */}
        {/* Map Container */}
        {/* <MapContainer
          isOpen={this.state.isOpenMap}
          latitude={latLng && latLng[0]}
          longitude={latLng && latLng[1]}
          address={null}
          handleChange={this.handleChangeCoordinates}
          handleClose={() => this.setState({ isOpenMap: false })}
        /> */}
        {/* End Map Container */}
      </React.Fragment>
    );
  };
}

Acoordion3.propTypes = {
  classes: PropTypes.object.isRequired,
  dataDetail: PropTypes.object,
  permission: PropTypes.string,
  isNew: PropTypes.bool,
  surveyProps: PropTypes.object,
  handleUpdate: PropTypes.func,
  dispatch: PropTypes.func
};
const mapStateToProps = state => {
  const { surveyState } = state;
  return {
    surveyProps: surveyState
  };
};
export default connect(mapStateToProps)(
  withRoot(withStyles(styles)(Acoordion3))
);
