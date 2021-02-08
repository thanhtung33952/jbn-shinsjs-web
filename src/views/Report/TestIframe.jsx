import React from "react";
import { PropTypes } from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";
import leafletImage from "leaflet-image";
import tbChildPage2 from "assets/img/tbChildPage2.png";

import logoFooter from "assets/img/logoFooter.PNG";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer
} from "@react-pdf/renderer";
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
// jss
// Create styles
const styles = StyleSheet.create({
  document: {
    width: "100%"
  },
  document1: {
    marginLeft: 20,
    width: "calc(50% - 25px)",
    display: "inline-block",
    height: "100%",
    float: "right"
  }
});
class TestIframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgMap: null
    };
    this.mapRef = React.createRef();
  }
  componentDidMount = () => {
    // func demo dẻ test page 4
    // setTimeout(() => {
    //   this.renderImgMap();
    // }, 500);
  };
  // func demo dẻ test page 4
  // renderImgMap = () => {
  //   this.setState({ imgMap: null });
  //   const map = this.mapRef.current;
  //   let mapAPI = map.leafletElement;
  //   let currentComponent = this;
  //   leafletImage(mapAPI, function(err, canvas) {
  //     var img = document.createElement("img");
  //     var dimensions = mapAPI.getSize();
  //     img.width = dimensions.x;
  //     img.height = dimensions.y;
  //     img.src = canvas.toDataURL();
  //     if (img.src) {
  //       currentComponent.setState({ imgMap: img.src });
  //     }
  //   });
  // };
  render() {
    return (
      <div style={{ height: "95vh", width: "100%", margin: "auto" }}>
        {/* map demo dẻ test page 4 */}
        {/* <Map
          ref={this.mapRef}
          center={["35.68089", "139.76749"]}
          zoom={14}
          minZoom={5}
          doubleClickZoom={false}
          style={{ height: 500, width: 500, position: "fixed", top: -500 }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker draggable={true} position={["35.68089", "139.76749"]} />
        </Map> */}
        <PDFViewer height="100%" width="50%">
          <Document style={styles.document}>
            <PrintReportPage1 dataRender={null} />
          </Document>
        </PDFViewer>
        <Document style={styles.document1}>
          <PrintReportPage1 dataRender={null} />
        </Document>
      </div>
    );
  }
}
TestIframe.propTypes = {
  dataRender: PropTypes.object
};
export default TestIframe;
