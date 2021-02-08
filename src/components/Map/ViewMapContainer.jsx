/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
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
    padding: "5px 20px 0px 20px"
  },
  map: {
    height: "calc(100% - 35px)",
    width: "100%",
    marginTop: 10
  },
  buttonProgress: {
    position: "absolute",
    top: "43%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};

class ViewMapContainer extends React.Component {
  constructor(props) {
    super(props);
    // reference MAP
    this.mapRef = React.createRef();

    // reference Marker
    this.markerRef = React.createRef();
  }

  handleOK = () => {
    // TODO
  };

  render = () => {
    const { classes, isOpen, latitude, longitude, handleClose } = this.props;
    const defaultPosition = getPostion("35.68089", "139.76749");

    // center position
    let centerPosition = getPostion(latitude, longitude);
    centerPosition = centerPosition ? centerPosition : defaultPosition;

    // marker position
    let markerPosition = getPostion(latitude, longitude);
    markerPosition = markerPosition ? markerPosition : defaultPosition;

    return (
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}
      >
        {isOpen && (
          <React.Fragment>
            <DialogTitle className={classes.title}>地図</DialogTitle>
            <DialogContent style={{ paddingBottom: 0, height: "65vh" }}>
              <Map
                ref={this.mapRef}
                onZoomend={this.onZoomEvent}
                center={centerPosition}
                zoom={14}
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
                  draggable={false}
                  ref={this.markerRef}
                  position={markerPosition}
                />
              </Map>
              <Typography
                variant="caption"
                style={{ color: "rgba(0, 0, 0, 0.5)" }}
              >
                位置を変更したいとき、マーカーをドラッグするか地図をダブルクリックしてください。
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>閉じる</Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    );
  };
}

ViewMapContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  latitude: PropTypes.any,
  longitude: PropTypes.any,
  address: PropTypes.string,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func
};

export default withStyles(styles)(ViewMapContainer);
