/* eslint-disable no-undef */
import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
// jss
import styles from "assets/jss/components/styleDoughnutScore.jsx";
// eslint-disable-next-line no-undef
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);
    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;
    var cutoutPer = chart.config.data.textCenter.cutoutPer;
    if (chart.config.data.textCenter.type !== "chartScore") {
      return;
    }
    // fontsize
    var fontSize = chart.config.data.textCenter.size;
    if (fontSize === undefined) {
      fontSize = (height / 60).toFixed(2);
    }
    // fontweight
    var fontWeight = chart.config.data.textCenter.fontWeight;
    if (fontWeight === undefined) {
      fontWeight = "bold";
    }
    ctx.font = `${fontWeight} ${fontSize}px arial, sans-serif`;
    // font color
    ctx.fillStyle = chart.config.data.textCenter.color;
    ctx.textBaseline = "middle";

    //labelTotle
    ctx.font = `13px arial, sans-serif`;
    var textTotle = chart.config.data.textCenter.labelTotle,
      textTotleX = Math.round((width - ctx.measureText(textTotle).width) / 2),
      textTotleY = height - 40;
    ctx.fillText(textTotle, textTotleX, textTotleY);
    //labelPieces
    ctx.font = `13px arial, sans-serif`;
    var textPieces = chart.config.data.textCenter.labelPieces,
      textPiecesX = Math.round((width - ctx.measureText(textPieces).width) / 2),
      textPiecesY = 40;
    ctx.fillText(textPieces, textPiecesX, textPiecesY);

    //Totle
    ctx.fillStyle = "gray";
    ctx.font = `${fontSize}px arial, sans-serif`;
    var totle = chart.config.data.textCenter.totle,
      totleX = Math.round((width - ctx.measureText(totle).width) / 2),
      totleY = height / 1.5;
    ctx.fillText(totle, totleX, totleY);
    // gach ngang
    ctx.beginPath();
    ctx.moveTo(100 - cutoutPer + 20, height / 1.95);
    ctx.lineTo(width - (100 - cutoutPer + 20), height / 1.95);
    ctx.stroke();
    //Pieces
    ctx.font = `${fontSize}px arial, sans-serif`;
    var pieces = chart.config.data.textCenter.pieces,
      piecesX = Math.round((width - ctx.measureText(pieces).width) / 2),
      piecesY = height / 2.5;
    ctx.fillText(pieces, piecesX, piecesY);
  }
});

class DoughnutScore extends React.Component {
  render = () => {
    const {
      classes,
      totle,
      pieces,
      labelTotle,
      labelPieces,
      widthD,
      cutoutPer,
      colorText,
      sizeText,
      fontWeight
    } = this.props;
    let ratioPieces = (parseInt(pieces) / parseInt(totle)) * 100;
    const data = {
      datasets: [
        {
          data: [ratioPieces, 100 - ratioPieces],
          borderWidth: 0,
          backgroundColor: ["#007000", "#8EB588"]
        }
      ],
      textCenter: {
        type: "chartScore",
        totle: totle,
        pieces: pieces,
        labelTotle: labelTotle,
        labelPieces: labelPieces,
        color: colorText,
        cutoutPer: cutoutPer,
        size: sizeText,
        fontWeight: fontWeight
      }
    };
    return (
      <div
        className={`${classes.blockChart}  ${this.props.customStyleRoot}`}
        style={{ width: widthD, height: widthD }}
      >
        <Doughnut
          data={data}
          width={40}
          height={40}
          options={{
            maintainAspectRatio: false,
            cutoutPercentage: cutoutPer,
            tooltips: { enabled: false }
          }}
        />
      </div>
    );
  };
}
DoughnutScore.propTypes = {
  classes: PropTypes.object.isRequired,
  customStyleRoot: PropTypes.node,
  totle: PropTypes.number,
  pieces: PropTypes.number,
  labelTotle: PropTypes.string,
  labelPieces: PropTypes.string,
  widthD: PropTypes.number,
  heightD: PropTypes.number,
  cutoutPer: PropTypes.number,
  colorText: PropTypes.string,
  sizeText: PropTypes.number,
  fontWeight: PropTypes.string
};
export default withRoot(withStyles(styles)(DoughnutScore));
