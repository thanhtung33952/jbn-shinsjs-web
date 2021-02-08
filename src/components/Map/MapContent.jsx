import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";
import axios from "axios";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
// common function
import { getPostion } from "utils/common.js";
// contant
import { apiGeocode } from "constant/index.js";
// jss
const styles = {
  title: {
    padding: "5px 20px 20px 20px"
  },
  map: {
    height: "calc(100% - 160px)",
    width: "100%",
    marginTop: 10
  },
  form: {
    width: "100%"
  },
  formItem: {
    width: "49%",
    marginRight: "2%",
    "&:last-child": {
      marginRight: 0
    }
  },
  txtAddress: {
    width: "calc(100% - 200px)"
  },
  formInline: {
    display: "flex"
  },
  wrapperGetAddress: {
    position: "relative",
    marginTop: 11,
    marginLeft: 5
  },
  buttonProgress: {
    position: "absolute",
    top: "43%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};

class CompanyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      lat: "",
      lng: "",
      zoom: 14,
      address: "",
      errorMessage: ""
    };

    this.time = null;

    // reference MAP
    this.mapRef = React.createRef();

    // reference Marker
    this.markerRef = React.createRef();
  }

  componentDidMount = () => {
    const { latitude, longitude, address } = this.props;
    // console.log(latitude, longitude)
    this.setState({
      lat: latitude,
      lng: longitude,
      address: address
    });
  };

  handleChange = name => e => {
    const val = e.target.value;
    this.setState({ [name]: val }, () => {
      if (this.state.latitude && this.state.longitude) {
        this.setState({ errorMessage: "" });
      }
    });
  };

  handleGetCoordinate = async () => {
    const { address } = this.state;

    this.setState({ isLoading: true });

    if (!address) {
      this.setState({
        errorMessage: "住所が必要です。",
        isLoading: false
      });
      return;
    }

    const res = await axios.get(`${apiGeocode}/${address}`);
    if (res.status !== 200) {
      this.setState({
        errorMessage: "おっと、何か問題がありました。",
        isLoading: false
      });
      return;
    }

    const result = res.data;

    // case not found coordinates
    if (result.latitude === 0 || result.longitude === 0) {
      this.setState({
        errorMessage: "一致する座標が見つかりません。",
        isLoading: false
      });

      return;
    }
    this.setState({
      lat: result.latitude,
      lng: result.longitude,
      isLoading: false,
      errorMessage: ""
    });
  };

  handleOK = () => {
    const { handleOK } = this.props;
    const { lat, lng } = this.state;
    if (handleOK) {
      if (!lat && !lng) {
        handleOK("35.68089", "139.76749");
        return;
      }
      handleOK(lat, lng);
    }
  };

  handleDragMarker = () => {
    const marker = this.markerRef.current;
    if (!marker) {
      return;
    }

    const cor = marker.leafletElement.getLatLng();
    this.setState({
      lat: cor.lat,
      lng: cor.lng
    });
  };

  handleDblClick = e => {
    const cor = e.latlng;
    if (cor) {
      this.setState({
        lat: cor.lat,
        lng: cor.lng
      });
    }
  };

  onZoomEvent = e => {
    this.setState({ zoom: e.target._zoom });
  };

  render = () => {
    const { classes, handleClose } = this.props;
    const { lat, lng } = this.state;
    const defaultPosition = getPostion("35.68089", "139.76749");

    // center position
    let centerPosition = getPostion(lat, lng);
    console.log(centerPosition)
    centerPosition = centerPosition ? centerPosition : defaultPosition;

    // marker position
    let markerPosition = getPostion(lat, lng);
    markerPosition = markerPosition ? markerPosition : defaultPosition;

    return (
      <React.Fragment>
        <DialogTitle className={classes.title}>地図</DialogTitle>
        <DialogContent style={{ paddingBottom: 0, height: "65vh" }}>
          <div className={classes.form}>
            {/* Address */}
            <div className={classes.formInline}>
              <TextField
                label="住所"
                className={classes.txtAddress}
                value={this.state.address ? this.state.address : ""}
                onChange={this.handleChange("address")}
                disabled={this.state.isLoading}
                autoFocus={true}
              />

              <div className={classes.wrapperGetAddress}>
                <Button
                  variant="contained"
                  className={classes.btnGetAddress}
                  onClick={this.handleGetCoordinate}
                  disabled={this.state.isLoading}
                >
                  住所から緯度経度を取得
                </Button>
                {this.state.isLoading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>

            <Typography variant="caption" style={{ color: "red" }}>
              {this.state.errorMessage}
            </Typography>
            {/* End Address */}

            {/* Coordinates */}
            <div className={classes.inline}>
              {/* Latitude */}
              <TextField
                className={classes.formItem}
                label="緯度"
                value={lat ? lat : ""}
                onChange={this.handleChange("lat")}
                margin="dense"
                type="number"
              />
              {/* End Latitude */}

              {/* Longitude */}
              <TextField
                className={classes.formItem}
                label="経度"
                value={lng ? lng : ""}
                onChange={this.handleChange("lng")}
                margin="dense"
                type="number"
              />
              {/* End Longitude */}
            </div>
            {/* End Coordinates */}
          </div>
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
              position={markerPosition}
              onDrap
            />
          </Map>
          <Typography variant="caption" style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            位置を変更したいとき、マーカーをドラッグするか地図をダブルクリックしてください。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={this.handleOK}>OK</Button>
        </DialogActions>
      </React.Fragment>
    );
  };
}

CompanyContent.propTypes = {
  classes: PropTypes.object.isRequired,
  latitude: PropTypes.any,
  longitude: PropTypes.any,
  address: PropTypes.string,
  handleOK: PropTypes.func,
  handleClose: PropTypes.func
};

export default withStyles(styles)(CompanyContent);
