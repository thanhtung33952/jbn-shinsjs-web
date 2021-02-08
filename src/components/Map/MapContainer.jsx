/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
// custom components
import MapContent from "./MapContent.jsx";
// jss
const styles = {};

class MapContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  handleOK = () => {
    // TODO
  };

  render = () => {
    const {
      classes,
      isOpen,
      latitude,
      longitude,
      address,
      handleClose,
      handleChange
    } = this.props;
    return (
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}
      >
        {isOpen && (
          <MapContent
            latitude={latitude}
            longitude={longitude}
            address={address}
            handleClose={handleClose}
            handleOK={handleChange}
          />
        )}
      </Dialog>
    );
  };
}

MapContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  latitude: PropTypes.any,
  longitude: PropTypes.any,
  address: PropTypes.string,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func
};

export default withStyles(styles)(MapContainer);
