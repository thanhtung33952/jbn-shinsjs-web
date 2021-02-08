import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// jss
const styles = theme => ({
  dragActive: {
    display: "block",
    textAlign: "center",
    height: 149,
    width: "100%",
    backgroundColor: "#fafafa",
    padding: "40px 15px",
    border: "dashed 2px #eeeeee",
    borderRadius: 3,
    outline: "none",
    transition: "border .24s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#2196f3"
    },
    "& span": {
      position: "relative",
      "&:before": {
        position: "absolute",
        zIndex: 1,
        background: "#767676",
        fontSize: 9,
        fontWeight: "bold",
        padding: "0px 5px",
        top: -25,
        color: "#fff",
        left: 1,
        borderRadius: 1
      },
      "&:nth-child(1)": {
        "&:before": {
          content: `'.CSV'`
        }
      }
    }
  },
  dragSuccess: {
    "& span": {
      "&:before": {
        background: "#456f1b"
      }
    }
  },
  dragError: {
    position: "relative"
  },
  spanError: {
    position: "absolute",
    bottom: 0,
    left: "100%",
    width: 120,
    lineHeight: "18px",
    fontSize: 13,
    color: "#ff6666"
  },
  button: {
    marginRight: 10,
    marginBottom: 10,
    borderColor: theme.palette.secondary.main,
    backgroundColor: "#fff",
    color: theme.palette.secondary.dark,
    borderRadius: 0,
    padding: "0px 5px",
    lineHeight: "34px",
    textTransform: "none",
    minHeight: 34,
    fontSize: 14,
    "&:hover": {
      backgroundColor: theme.palette.pink.main,
      borderColor: theme.palette.pink.dark,
      color: "#fff"
    }
  }
});

class UploadFile extends React.Component {
  onDrop = files => {
    const { handleChangeFile, multiple } = this.props;
    if (files.length === 0) {
      return;
    }
    // callback to parent
    // chỉ 1 file
    if (!multiple) {
      if (handleChangeFile) {
        files[0][`preview`] = URL.createObjectURL(files[0]);
        handleChangeFile(files[0]);
      }
    }

    // nhiều file
    if (multiple) {
      let multipleFile = [];
      files.forEach(file => {
        file[`preview`] = URL.createObjectURL(file);
        multipleFile.push(file);
      });

      if (handleChangeFile) {
        handleChangeFile(multipleFile);
      }
    }
  };

  render = () => {
    const {
      classes,
      accept,
      textButton,
      multiple,
      customStyleRoot
    } = this.props;
    return (
      <React.Fragment>
        <Dropzone
          onDrop={this.onDrop}
          // accept=".csv,text/csv, application/vnd.ms-excel"
          accept={accept}
          multiple={multiple}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject
          }) => (
            <div
              {...getRootProps()}
              className={`${classes.addItem}  ${customStyleRoot}`}
            >
              <input {...getInputProps()} />
              <React.Fragment>
                {!isDragActive && (
                  <Button variant="outlined" className={classes.button}>
                    {textButton}
                  </Button>
                )}
                {isDragAccept && (
                  <Button
                    style={{ borderColor: "#5bad84" }}
                    variant="outlined"
                    className={classes.button}
                  >
                    {textButton}
                  </Button>
                )}
                {isDragReject && (
                  <div className={classes.dragError}>
                    <Button
                      style={{ borderColor: "#ff6666" }}
                      variant="outlined"
                      className={classes.button}
                    >
                      アップロード
                    </Button>
                    <span className={classes.spanError}>
                      ファイル形式が正しくありません。
                    </span>
                  </div>
                )}
              </React.Fragment>
            </div>
          )}
        </Dropzone>
      </React.Fragment>
    );
  };
}

UploadFile.propTypes = {
  classes: PropTypes.object.isRequired,
  customStyleRoot: PropTypes.node,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  textButton: PropTypes.string,
  handleChangeFile: PropTypes.func
};

export default withStyles(styles)(UploadFile);
