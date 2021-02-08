import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from "withRoot";
import { PropTypes, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
// customer component
import Widget1 from "components/DashboardWidget/Widget1.jsx";
import Widget2 from "components/DashboardWidget/Widget2.jsx";
import Widget3 from "components/DashboardWidget/Widget3.jsx";
import Widget4 from "components/DashboardWidget/Widget4.jsx";
import Widget5 from "components/DashboardWidget/Widget5.jsx";
import Widget6 from "components/DashboardWidget/Widget6.jsx";
import Widget7 from "components/DashboardWidget/Widget7.jsx";
import Widget8 from "components/DashboardWidget/Widget8.jsx";
import Widget9 from "components/DashboardWidget/Widget9.jsx";
// jss
import styles from "assets/jss/views/styleDashboard.jsx";

const ArrWidgetID = [
  "widget1",
  "widget2",
  "widget3",
  "widget4",
  "widget5",
  "widget6",
  "widget7",
  "widget8",
  "widget9"
];
// arr vị trí mặc định (top, left) các widget (1...9)
const positionArray = [
  [0, 0],
  [320, 0],
  [640, 0],
  [0, 280],
  [320, 280],
  [640, 280],
  [0, 560],
  [320, 560],
  [640, 560],
  [0, 840],
  [320, 840],
  [640, 840],
  [0, 1120],
  [320, 1120],
  [640, 1120]
];

class DashboardDesktop extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.mainContent = React.createRef();
    this.widget1 = React.createRef();
    this.widget2 = React.createRef();
    this.widget3 = React.createRef();
    this.widget4 = React.createRef();
    this.widget5 = React.createRef();
    this.widget6 = React.createRef();
    this.widget7 = React.createRef();
    this.widget8 = React.createRef();
    this.widget9 = React.createRef();

    this.state = {
      timeOutRender: [],
      open: null // value open giống với id widget để check bên component children
    };
  }

  componentDidMount = () => {
    // document.body.style.background =
    //   "linear-gradient(rgb(216, 216, 216) 0%, rgb(254, 254, 253) 100%)";
    const arrTime = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];
    arrTime.map(item => {
      setTimeout(() => {
        this.setState({ timeOutRender: this.state.timeOutRender.concat(item) });
      }, item);
    });
  };
  handleExpanded = widgetID => () => {
    // click open widget mới. => change data children component
    setTimeout(() => {
      if (this.state.open !== widgetID) {
        this.setState({ open: widgetID });
      } else this.setState({ open: null });
    }, 700);
    // end

    // get width
    let WidthThis = this[widgetID].current.offsetWidth;
    if (parseInt(WidthThis) < 400) {
      // kiểm tra có widget nào đang mở thì đóng lại
      for (var j = 0; j < ArrWidgetID.length; j++) {
        let widthItem = this[ArrWidgetID[j]].current.offsetWidth;
        if (parseInt(widthItem) > 400) {
          this.closeMe(ArrWidgetID[j]);
        }
      }
      // sau khi đóng tất cả widget thì mở chính nó ra.
      this.openMe(widgetID);
      // }
    } else {
      this.closeMe(widgetID);
    }
  };

  // close các widget đang mở
  closeMe = widgetID => {
    // lấy vị trí của widgetID trong positionArray
    this.moveMe("widget1", 0);
    this.moveMe("widget2", 1);
    this.moveMe("widget3", 2);
    this.moveMe("widget4", 3);
    this.moveMe("widget5", 4);
    this.moveMe("widget6", 5);
    this.moveMe("widget7", 6);
    this.moveMe("widget8", 7);
    this.moveMe("widget9", 8);
    setTimeout(() => {
      this[widgetID].current.style.width = 310 + "px";
      this[widgetID].current.style.height = 270 + "px";
      this.mainContent.current.style.height =
        this.mainContent.current.offsetHeight - 280 + "px";
    }, 500);
  };

  // mở widget by ID
  openMe = widgetID => {
    switch (widgetID) {
      case "widget1":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 2);
        this.moveMe("widget3", 5);
        this.moveMe("widget4", 6);
        this.moveMe("widget5", 7);
        this.moveMe("widget6", 8);
        this.moveMe("widget7", 9);
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget2":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 3);
        this.moveMe("widget4", 6);
        this.moveMe("widget5", 7);
        this.moveMe("widget6", 8);
        this.moveMe("widget7", 9);
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget3":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 3);
        this.moveMe("widget3", 1);
        this.moveMe("widget4", 6);
        this.moveMe("widget5", 7);
        this.moveMe("widget6", 8);
        this.moveMe("widget7", 9);
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget4":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
        this.moveMe("widget4", 3);
        this.moveMe("widget5", 5);
        this.moveMe("widget6", 8);
        this.moveMe("widget7", 9);
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget5":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
        this.moveMe("widget4", 3);
        this.moveMe("widget5", 4);
        this.moveMe("widget6", 6);
        this.moveMe("widget7", 9);
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget6":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
        this.moveMe("widget4", 3);
        this.moveMe("widget5", 6);
        this.moveMe("widget6", 4);
        this.moveMe("widget7", 9);
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget7":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
        this.moveMe("widget4", 3);
        this.moveMe("widget5", 4);
        this.moveMe("widget6", 5);
        this.moveMe("widget7", 6);
        this.moveMe("widget8", 8);
        this.moveMe("widget9", 11);
        break;
      case "widget8":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
        this.moveMe("widget4", 3);
        this.moveMe("widget5", 4);
        this.moveMe("widget6", 5);
        this.moveMe("widget7", 6);
        this.moveMe("widget8", 7);
        this.moveMe("widget9", 9);
        break;
      case "widget9":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
        this.moveMe("widget4", 3);
        this.moveMe("widget5", 4);
        this.moveMe("widget6", 5);
        this.moveMe("widget7", 6);
        this.moveMe("widget8", 9);
        this.moveMe("widget9", 7);
        break;
      default:
        break;
    }
    setTimeout(() => {
      this[widgetID].current.style.width = 630 + "px";
      this[widgetID].current.style.height = 550 + "px";
      this.mainContent.current.style.height =
        this.mainContent.current.offsetHeight + 280 + "px";
    }, 400);
  };

  // di chuyển các widget theo vị trí đã sắp đặt sẵn
  moveMe = (boxID, posID) => {
    this[boxID].current.style.left = positionArray[posID][0] + "px";
    this[boxID].current.style.top = positionArray[posID][1] + "px";
  };
  render = () => {
    const { classes, userInfo } = this.props;
    const { open, timeOutRender } = this.state;
    return (
      <main className={classes.mainContaner} ref={this.mainContent}>
        {timeOutRender.indexOf(4500) === -1 && (
          <div className={classes.override} />
        )}
        {/* widget 1 */}
        {timeOutRender.indexOf(500) !== -1 && (
          <div
            ref={this.widget1}
            className={`${classes.blockWidget} ${classes.w1}`}
          >
            <Widget1
              handleExpanded={this.handleExpanded("widget1")}
              open={open}
              userInfo={userInfo}
            />
          </div>
        )}
        {/* widget 2 */}
        {timeOutRender.indexOf(1000) !== -1 && (
          <div
            ref={this.widget2}
            className={`${classes.blockWidget} ${classes.w2}`}
          >
            <Widget2
              handleExpanded={this.handleExpanded("widget2")}
              open={open}
              userInfo={userInfo}
            />
          </div>
        )}
        {/* widget 3 */}
        {timeOutRender.indexOf(1500) !== -1 && (
          <div
            ref={this.widget3}
            className={`${classes.blockWidget} ${classes.w3}`}
          >
            <Widget3
              handleExpanded={this.handleExpanded("widget3")}
              open={open}
            />
          </div>
        )}
        {/* widget 4 */}
        {timeOutRender.indexOf(2000) !== -1 && (
          <div
            ref={this.widget4}
            className={`${classes.blockWidget} ${classes.w4}`}
          >
            <Widget4
              handleExpanded={this.handleExpanded("widget4")}
              open={open}
              userInfo={userInfo}
            />
          </div>
        )}
        {/* widget 5 */}
        {timeOutRender.indexOf(2500) !== -1 && (
          <div
            ref={this.widget5}
            className={`${classes.blockWidget} ${classes.w5}`}
          >
            <Widget5
              handleExpanded={this.handleExpanded("widget5")}
              open={open}
            />
          </div>
        )}
        {/* widget 6 */}
        {timeOutRender.indexOf(3000) !== -1 && (
          <div
            ref={this.widget6}
            className={`${classes.blockWidget} ${classes.w6}`}
          >
            <Widget6
              handleExpanded={this.handleExpanded("widget6")}
              open={open}
            />
          </div>
        )}
        {/* widget 7 */}
        {timeOutRender.indexOf(3500) !== -1 && (
          <div
            ref={this.widget7}
            className={`${classes.blockWidget} ${classes.w7}`}
          >
            <Widget7
              handleExpanded={this.handleExpanded("widget7")}
              open={open}
              userInfo={userInfo}
            />
          </div>
        )}
        {/* widget 8 */}
        {timeOutRender.indexOf(4000) !== -1 && (
          <div
            ref={this.widget8}
            className={`${classes.blockWidget} ${classes.w8}`}
          >
            <Widget8
              handleExpanded={this.handleExpanded("widget8")}
              open={open}
              userInfo={userInfo}
            />
          </div>
        )}
        {/* widget 9 */}
        {timeOutRender.indexOf(4500) !== -1 && (
          <div
            ref={this.widget9}
            className={`${classes.blockWidget} ${classes.w9}`}
          >
            <Widget9
              handleExpanded={this.handleExpanded("widget9")}
              open={open}
            />
          </div>
        )}
      </main>
    );
  };
}

DashboardDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  match: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(DashboardDesktop)));
