import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  body: {
    padding: 10,
    display: "flex"
  },
  colLeft: {
    fontSize: 16,
    marginRight: 30,
    width: 180
  },
  colRight: {},
  table: {
    width: "100%",
    display: "table",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    display: "table-row",
    verticalAlign: "inherit",
    borderColor: "inherit"
  },
  tableColHeader: {
    display: "table-cell",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol: {
    display: "table-cell",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    display: "table-cell",
    fontSize: 12,
    fontWeight: 500
  },
  tableCell: {
    display: "table-cell",
    fontSize: 10
  },
  boxCheckboxTrue: {
    width: 16,
    height: 16,
    borderStyle: "solid",
    borderColor: "#9e9e9e",
    backgroundColor: "#9e9e9e",
    borderWidth: 1,
    borderRadius: 1,
    position: "relative",
    margin: 5,
    display: "block"
  },
  boxCheckboxFalse: {
    width: 16,
    height: 16,
    borderStyle: "solid",
    borderColor: "#9e9e9e",
    borderWidth: 1,
    borderRadius: 1,
    position: "relative",
    margin: 5,
    display: "block"
  },
  iconCheck1: {
    position: "absolute",
    transform: "rotate(46deg)",
    height: 12,
    width: 2,
    backgroundColor: "#fff",
    right: 4,
    top: 0
  },
  iconCheck2: {
    position: "absolute",
    transform: "rotate(-45deg)",
    height: 4,
    width: 2,
    backgroundColor: "#fff",
    left: 2,
    top: 5
  }
});

const checkBoxTrue = (
  <Text style={styles.boxCheckboxTrue}>
    <Text style={styles.iconCheck1}></Text>
    <Text style={styles.iconCheck2}></Text>
  </Text>
);
const checkBoxFalse = <Text style={styles.boxCheckboxFalse}></Text>;
// export default function PrintRecordForm(props) {

class PrintRecordForm extends React.Component {
  render = props => {
    const { dataDetail } = this.props;
    return (
      <Document>
        <Page style={styles.body}>
          <View style={styles.colLeft}>
            {/* table 1 */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>現場名</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>
                    {dataDetail.site_name}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>天候</Text>
                </View>
                <View style={styles.tableColHeader}>
                  {checkBoxTrue}晴
                  <Text style={styles.tableCellHeader}>
                    {dataDetail.weather[0]}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>天候</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>
                    {dataDetail.weather[0]}
                  </Text>
                  <Text style={styles.tableCellHeader}>
                    {dataDetail.weather[1]}
                  </Text>
                  <Text style={styles.tableCellHeader}>
                    {dataDetail.weather[2]}
                  </Text>
                  <Text style={styles.tableCellHeader}>
                    {dataDetail.weather[3]}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>備考</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>
                    {dataDetail.remarks}
                  </Text>
                </View>
              </View>
            </View>
            {/* end table 1 */}
          </View>
          <View style={styles.colRight}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Product</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Type</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Period</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Price</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>React-PDF</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>3</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>5€</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Another row</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    Capítulo I: Que trata de la condición y ejercicio del famoso
                    hidalgo D. Quijote de la Mancha
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>2019-05-20 - 2020-07-19</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>25€</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  };
}
PrintRecordForm.propTypes = {
  dataDetail: PropTypes.object
};
export default PrintRecordForm;
