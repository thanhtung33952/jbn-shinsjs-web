import React from "react";
import withRoot from "withRoot";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// constant
import { apiRoot } from "constant/index.js";

const styles = () => ({
  colRightSurvey: {
    textAlign: "center",
    margin: "0 0px 50px 5px",
    backgroundColor: "#F0F0F0",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "& h3": {
      fontSize: 20,
      margin: "25px 0"
    }
  },
  blockContentTop: {
    backgroundColor: "#DCE7E0",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    "& h2": {
      color: "#222",
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 20
    },
    "& p": {
      color: "#222",
      fontSize: 17,
      marginTop: 0,
      marginBottom: 15,
      textAlign: "left"
    }
  },
  content: {
    height: 200
  },
  btnSend: {
    background: "none",
    borderRadius: 0,
    padding: "0 20px",
    fontSize: 17,
    color: "#222",
    margin: "0 20px",
    border: "solid 2px #474B48",
    boxShadow: "none",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#5bad84",
      borderColor: "#389667"
    }
  },
  blockContentBottom: {
    padding: "0 20px",
    marginTop: 20
  },
  rowSubmit: {
    position: "relative",
    margin: "20px 0"
  },
  iconProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  rootCheck: {
    display: "block",
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 20,
    textAlign: "left",
    "& svg": {
      fontSize: 20,
      marginTop: -5
    },
    "& *": {
      color: "#222"
    }
  },
  listComment: {
    color: "#222",
    "& ul": {
      padding: 0,
      margin: 0,
      "& li": {
        padding: 10,
        listStyle: "none",
        textAlign: "left",
        fontSize: 14,
        display: "flex",
        flexDirection: "row",
        borderBottom: "solid 1px #bce4d0",
        "&:hover": {
          "& $iconMore": {
            display: "block"
          }
          // "& $iconExpan": {
          //   display: "block"
          // }
        }
      }
    }
  },
  date: {
    fontSize: 10,
    fontStyle: "italic",
    marginTop: -4,
    marginBottom: 5
  },
  inputComment: {
    border: "none",
    backgroundColor: "#ffffff",
    borderRadius: 0,
    fontSize: 14,
    marginRight: 5,
    padding: 0,
    "& textarea": {
      padding: 8,
      overflow: "hidden !important"
    }
  },
  txtComment: {
    display: "flex",
    flexDirection: "column",
    "& span": {
      whiteSpace: "pre-wrap",
      overflowWrap: "break-word",
      overflow: "hidden"
    }
  },
  optionBlock: {
    position: "absolute",
    right: 15,
    top: 0,
    width: 18,
    flex: "none"
  },
  iconMore: {
    color: "#606770",
    cursor: "pointer",
    height: 18,
    width: 18,
    position: "absolute",
    top: 2,
    opacity: 0.3,
    "&:hover": {
      opacity: 1
    }
    // display: "none"
  },
  paperQueue: {
    position: "relative",
    bottom: 45,
    left: "calc(-100% + 44px)",
    width: "auto",
    "& ul": {
      margin: 0,
      padding: "4px 0",
      "& li": {
        listStyle: "none",
        height: 24,
        lineHeight: "24px",
        display: "flex",
        padding: "0 25px 0  20px",
        fontSize: 11,
        fontWeight: 500,
        cursor: "pointer",
        position: "relative",
        margin: 0,
        "&:hover": {
          backgroundColor: "#e9ebee",
          "& svg": {
            display: "block"
          }
        },
        "& span": {
          marginRight: 10,
          whiteSpace: "inherit"
        },
        "& svg": {
          position: "absolute",
          right: 5,
          fontSize: 14,
          top: 6,
          cursor: "pointer",
          borderRadius: "50%",
          background: "#a7a6a6",
          color: "#fff",
          padding: 1,
          display: "none"
        }
      }
    }
  },
  paperMore: {
    top: 24,
    left: "auto",
    right: -5,
    bottom: "auto",
    zIndex: 99,
    position: "absolute",
    background: "#f3f3f3",
    "& ul": {
      padding: 0,
      "& li": {
        padding: "0 10px",
        whiteSpace: "nowrap",
        "& span": {
          marginRight: 0
        }
      }
    },
    "&:before": {
      content: "''",
      position: "absolute",
      top: -6,
      right: 10,
      borderBottom: "solid 7px #f3f3f3",
      borderRight: "solid 8px transparent",
      borderLeft: "solid 8px transparent"
    }
  },
  cancel: {
    float: "right",
    fontStyle: "initial",
    fontWeight: "bold",
    marginRight: 7,
    cursor: "pointer"
  },
  showMore: {
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 500,
    color: "#000",
    textDecoration: "underline",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    display: "block"
  },
  rowSendComment: {
    display: "flex",
    backgroundColor: "#beffd6",
    padding: 10,
    paddingRight: 0
  },
  avatar: {
    width: 33,
    height: 33,
    fontSize: 13
  },
  thisComment: {
    "& $avatar": {
      backgroundColor: "#5bad84"
    },
    backgroundColor: "#beffd6"
  },
  grInput: {
    position: "relative",
    width: "100%",
    marginLeft: 5,
    marginRight: 10,
    "& $inputComment": {
      marginRight: 0,
      width: "100%"
    }
  },
  iconButton: {
    opacity: 0.4,
    backgroundColor: "#ff6666 !important",
    width: 100,
    padding: 2,
    marginTop: 5,
    borderRadius: 7,
    color: "#fff",
    fontSize: 12,
    "& svg": {
      fontSize: 16,
      marginLeft: 5,
      marginTop: -2
    }
  },
  activeSend: {
    pointerEvents: "auto",
    opacity: 1
  },
  iconExpan: {
    color: "#606770",
    fontSize: 18,
    cursor: "pointer",
    right: -5,
    top: 2,
    position: "absolute",
    opacity: 0.4,
    "&:hover": {
      opacity: 1
    }
  },
  rowInfoComment: {
    display: "flex",
    flexDirection: "column"
  },
  rowIconEdit: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    fontSize: 10,
    "& svg": {
      fontSize: 16,
      marginRight: 10,
      cursor: "pointer",
      "&:hover": {
        color: "#377dde"
      }
    }
  },
  scrollInpComment: {
    border: "solid 1px #cecece",
    borderRadius: 15,
    background: "#fff"
  }
});

// today
let day = new Date();
let yy = String(day.getFullYear());
let mm = String(parseInt(day.getMonth()) + 1);
let dd = String(day.getDate());
mm = mm.length === 1 ? "0" + mm : mm;
dd = dd.length === 1 ? "0" + dd : dd;
let today = yy + "-" + mm + "-" + dd;
let time = day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();

class RightColum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idSurvey: null,
      dataComment: [],
      totalComment: 0,
      valInputCom: "",
      valInputEdit: "",
      idEditCom: null,
      idOpenMore: null,
      openMore: false,
      isLoaddingComment: false,
      statusSendmail: 0, // 0: nomar, 1: ok, -1: error
      isCheck: false
    };
  }

  componentDidMount = () => {
    const { data } = this.props;
    if (data && data.id) {
      this.setState({ idSurvey: data.id });
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!nextProps.data || !nextProps.data.statusPublic) return;
    // check nếu id survey khác thì không cho nó lấy lại comment nữa, vì bản chất vòng đời này luôn vào khi props thay đổi
    if (nextProps.data.id !== this.state.idSurvey) {
      this.setState(
        { idSurvey: nextProps.data.id },
        () => this.getDataComment(5, 0) // 5: limnit, 0: ofset
      );
    } else return;
  };
  // find acoordion có validation chưa
  findValitionAllSurvey = () => {
    const { surveyProps } = this.props;
    const validation = surveyProps.validation;

    let isValiAll = true;
    validation.forEach(item => {
      if (item.isVali === false) {
        isValiAll = false;
      }
    });
    return isValiAll;
  };

  // show more option comment
  handleShowMore = id => {
    this.setState({ openMore: true, idOpenMore: id });
  };
  // close option comment
  handleClickAway = () => {
    this.setState({ openMore: false, idOpenMore: null });
  };
  // handle change input comment
  handleChangeInput = e => {
    this.setState({ valInputCom: e.target.value });
  };

  handleChangeInputEdit = e => {
    this.setState({ valInputEdit: e.target.value });
  };

  // key enter => send mesage
  onKeyPressSendMessage = mode => e => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      if (mode === "update") {
        this.updateComment();
      } else {
        this.sendComment();
      }
    }
  };

  // handle click btn send comment
  handleClickButtonSendComment = mode => {
    if (mode === "update") {
      this.updateComment();
    } else {
      this.sendComment();
    }
  };

  // get data coment theo id survey
  getDataComment = async (limit, offset) => {
    const { idSurvey } = this.state;
    // trường hợp add new thì chưa có id survey nên không lấy dc comment, đồng thời khóa comment
    if (!idSurvey) return;
    this.setState({ isLoaddingComment: true });
    const res = await axios.get(
      `${apiRoot}/commentsurveys?surveyId=${idSurvey}&limit=${limit}&offset=${offset}`
    );
    // error
    if (res.status !== 200) {
      return;
    }
    // success
    this.setState({
      isLoaddingComment: false,
      dataComment: this.state.dataComment.concat(res.data.details),
      totalComment: parseInt(res.data.total)
    });
  };

  // get info user
  getInfoUserComment = async userID => {
    const res = await axios.get(`${apiRoot}/account/infouser/${userID}`);
    // error
    if (res.status !== 200) {
      return;
    }
    // success
    return res.data.firstName + " " + res.data.lastName;
  };

  // post comment
  sendComment = async () => {
    const { data, userInfo } = this.props;
    const { valInputCom } = this.state;

    // không tồn tại id survey, comment rỗng => return
    if (!data || !data.id || !valInputCom.trim() || !userInfo) return;
    // add comment
    const res = await axios.post(`${apiRoot}/commentsurvey`, {
      surveyId: data.id,
      userId: userInfo.userId,
      comment: valInputCom.trim()
    });

    // error
    if (res.status !== 200 || res.data === false) return;
    // success
    let newComment = [
      { ...res.data, created: today + " " + time, name: userInfo.lastName }
    ];
    this.setState({
      dataComment: newComment.concat(this.state.dataComment),
      totalComment: this.state.totalComment + 1,
      valInputCom: ""
    });
  };

  // update comment
  updateComment = async () => {
    const { userInfo } = this.props;
    const { idEditCom, valInputEdit } = this.state;
    const listComment = this.state.dataComment;

    // không tồn tại id survey, comment rỗng => return
    if (!idEditCom || !valInputEdit.trim() || !userInfo) return;
    // add comment
    const res = await axios.put(`${apiRoot}/commentsurvey/${idEditCom}`, {
      userId: userInfo.userId,
      comment: valInputEdit.trim()
    });

    // error
    if (res.status !== 200 || res.data === false) return;
    // success
    let newListComment = listComment.map(com => {
      if (com.id === idEditCom) {
        return {
          ...com,
          comment: valInputEdit,
          created: today + " " + time
        };
      }
      return com;
    });
    this.setState({
      dataComment: newListComment,
      idEditCom: null,
      valInputEdit: ""
    });
  };
  // delete comment
  deleteComment = async id => {
    const listComment = this.state.dataComment;
    // delete comment
    const res = await axios.delete(`${apiRoot}/commentsurvey/${id}`);

    // error
    if (res.status !== 200 || res.data === false) return;
    // success
    // xóa comment trong data
    let indexComment = listComment.findIndex(
      x => parseInt(x.id) === parseInt(id)
    );
    if (indexComment !== -1) {
      listComment.splice(indexComment, 1);
    }

    this.setState({
      dataComment: listComment,
      totalComment: this.state.totalComment - 1,
      openMore: false,
      idOpenMore: null
    });
  };

  // handle edit comment
  handleEditComment = async id => {
    this.setState({ openMore: false, idOpenMore: null });

    let comEdit = this.state.dataComment.find(x => x.id === id);
    if (!comEdit) return null;

    this.setState({ idEditCom: id, valInputEdit: comEdit.comment });
  };
  // event show more comment
  showmoreComment = () => {
    const { dataComment } = this.state;
    let limit = 5; // lấy thêm 5 comment
    let offset = dataComment.length; // vị trí từ đây lấy comment trở đi
    this.getDataComment(limit, offset);
  };
  // event show more text comment
  handleShowMoreThisComment = index => () => {
    this.setState({ [index]: !this.state[index] });
  };
  renderView({ style, ...props }) {
    const thumbStyle = {
      paddingRight: 10,
      overflow: "hidden",
      overflowY: "auto",
      marginBottom: 0
    };
    return (
      <div
        id="contentRightSrcoll"
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }
  renderThumbScroll({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: "rgba(30,30,30,0.2)",
      borderRadius: 5,
      right: -3,
      width: 5
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render = () => {
    const { classes } = this.props;
    return (
      <div className={classes.colRightSurvey}>
        <Typography component="h3">「地盤安心住宅」について...</Typography>
        <div className={classes.content}>
          <Scrollbars
            renderView={this.renderView}
            renderThumbVertical={this.renderThumbScroll}
            renderThumbHorizontal={props => (
              <div {...props} style={{ display: "none" }} />
            )}
          >
            <Link to="https://jibannet.online/develop/application/app_newLayout.pdf">
              レイアウト変更の説明
            </Link>
          </Scrollbars>
        </div>
      </div>
    );
  };
}

RightColum.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  userInfo: PropTypes.object,
  surveyProps: PropTypes.object
};
const mapStateToProps = state => {
  const { surveyState } = state;
  return {
    surveyProps: surveyState
  };
};
export default connect(mapStateToProps)(
  withRoot(withStyles(styles)(RightColum))
);