import React from "react";
import { PropTypes } from "prop-types";
import { View, StyleSheet } from "@react-pdf/renderer";
// jss
const styles = StyleSheet.create({
  boxCheckboxTrue: {
    width: 11,
    height: 11,
    borderStyle: "solid",
    borderColor: "#9e9e9e",
    backgroundColor: "#9e9e9e",
    borderWidth: 1,
    borderRadius: 1,
    position: "relative",
    marginRight: 2,
    display: "block"
  },
  boxCheckboxFalse: {
    width: 11,
    height: 11,
    borderStyle: "solid",
    borderColor: "#9e9e9e",
    borderWidth: 1,
    borderRadius: 1,
    position: "relative",
    marginRight: 2,
    display: "block"
  },
  iconCheck1: {
    position: "absolute",
    transform: "rotate(46deg)",
    height: 8,
    width: 2,
    backgroundColor: "#fff",
    right: 2,
    top: 0
  },
  iconCheck2: {
    position: "absolute",
    transform: "rotate(-45deg)",
    height: 4,
    width: 2,
    backgroundColor: "#fff",
    left: 2,
    top: 4
  }
});
const checkBoxTrue = (
  <View style={styles.boxCheckboxTrue}>
    <View style={styles.iconCheck1}></View>
    <View style={styles.iconCheck2}></View>
  </View>
);
const checkBoxFalse = <View style={styles.boxCheckboxFalse}></View>;
class CheckboxPDF extends React.Component {
  render() {
    const { checked } = this.props;
    return (
      <React.Fragment>{checked ? checkBoxTrue : checkBoxFalse}</React.Fragment>
    );
  }
}
CheckboxPDF.propTypes = {
  checked: PropTypes.bool
};
export default CheckboxPDF;
