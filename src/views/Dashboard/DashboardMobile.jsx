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
import styles from "assets/jss/views/styleDashboardMobile.jsx";

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
let arrPosition = [];

class DashboardMobile extends React.Component {
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
      widthDefault: 0,
      heightDefault: 0,
      open: null // value open giống với id widget để check bên component children
    };
  }

  componentDidMount = () => {
    const arrTime = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];
    arrTime.map((item, i) => {
      setTimeout(() => {
        this.setState({ timeOutRender: this.state.timeOutRender.concat(item) });

        // set height cho widget (do các thiết bị khác nhau nên set height tương đối)
        let widthDefault = this["widget1"].current.offsetWidth;
        this[`widget${i + 1}`].current.style.height = widthDefault - 30 + "px";

        // set position left, top cho cac widget khác widget 1 ( vì widget1 hiển nhiên nằm đầu tiên)
        if (i !== 0) {
          this[`widget${i + 1}`].current.style.top = arrPosition[i][1] + "px";
          this[`widget${i + 1}`].current.style.left = arrPosition[i][0] + "px";
        }
      }, item);
    });

    // lấy giá trị width, height sau khi widget 1 được render,  lưu lại default , height default của widget để bên dưới dùng sử lý event
    // timeout 600 ( do phải sau khi widget1 render xong.  widge1 timeout 500 )
    setTimeout(() => {
      let w = this["widget1"].current.offsetWidth;
      let h = this["widget1"].current.offsetHeight;
      // set height block main (khối bao tất cả widget)
      this.mainContent.current.style.height = h * 5 + 100 + "px";
      // render position widget auto
      // [left, top] => có tính khoảng cách margin
      let left = w + 10;
      let top = h;
      arrPosition = [
        [0, 0],
        [left, 0],
        [0, top + 10],
        [left, top + 10],
        [0, top * 2 + 20],
        [left, top * 2 + 20],
        [0, top * 3 + 30],
        [left, top * 3 + 30],
        [0, top * 4 + 40],
        [left, top * 4 + 40],

        [0, top * 5 + 50],
        [left, top * 5 + 50],

        [0, top * 6 + 60],
        [left, top * 6 + 60]
      ];
      this.setState({ widthDefault: w, heightDefault: h });
    }, 600);
  };

  handleExpanded = widgetID => () => {
    const { widthDefault } = this.state;
    // click open widget mới. => change data children component
    setTimeout(() => {
      if (this.state.open !== widgetID) {
        this.setState({ open: widgetID });
      } else this.setState({ open: null });
    }, 1000);
    // end

    // get width
    let WidthThis = this[widgetID].current.offsetWidth;
    if (parseInt(WidthThis) === widthDefault) {
      // kiểm tra có widget nào đang mở thì đóng lại
      for (var j = 0; j < ArrWidgetID.length; j++) {
        let widthItem = this[ArrWidgetID[j]].current.offsetWidth;
        if (parseInt(widthItem) > widthDefault) {
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
    const { widthDefault, heightDefault } = this.state;
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
      this[widgetID].current.style.width = widthDefault + "px";
      this[widgetID].current.style.height = heightDefault + "px";
      this.mainContent.current.style.height =
        this.mainContent.current.offsetHeight - heightDefault + "px";
    }, 500);
  };

  // mở widget by ID
  openMe = widgetID => {
    const { widthDefault, heightDefault } = this.state;
    switch (widgetID) {
      case "widget1":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 4);
        this.moveMe("widget3", 5);
        this.moveMe("widget4", 6);
        this.moveMe("widget5", 7);
        this.moveMe("widget6", 8);
        this.moveMe("widget7", 9);
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget2":
        this.moveMe("widget1", 4);
        this.moveMe("widget2", 0);
        this.moveMe("widget3", 5);
        this.moveMe("widget4", 6);
        this.moveMe("widget5", 7);
        this.moveMe("widget6", 8);
        this.moveMe("widget7", 9);
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget3":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
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
        this.moveMe("widget3", 6);
        this.moveMe("widget4", 2);
        this.moveMe("widget5", 7);
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
        this.moveMe("widget6", 8);
        this.moveMe("widget7", 9);
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget6":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
        this.moveMe("widget4", 3);
        this.moveMe("widget5", 8);
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
        this.moveMe("widget8", 10);
        this.moveMe("widget9", 11);
        break;
      case "widget8":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
        this.moveMe("widget4", 3);
        this.moveMe("widget5", 4);
        this.moveMe("widget6", 5);
        this.moveMe("widget7", 10);
        this.moveMe("widget8", 6);
        this.moveMe("widget9", 11);
        break;
      case "widget9":
        this.moveMe("widget1", 0);
        this.moveMe("widget2", 1);
        this.moveMe("widget3", 2);
        this.moveMe("widget4", 3);
        this.moveMe("widget5", 4);
        this.moveMe("widget6", 5);
        this.moveMe("widget7", 6);
        this.moveMe("widget8", 7);
        this.moveMe("widget9", 8);
        break;
      default:
        break;
    }
    setTimeout(() => {
      this[widgetID].current.style.width = widthDefault * 2 + 10 + "px";
      this[widgetID].current.style.height = heightDefault * 2 + "px";
      this.mainContent.current.style.height =
        this.mainContent.current.offsetHeight + heightDefault + "px";
    }, 500);
  };

  // di chuyển các widget theo vị trí đã sắp đặt sẵn
  moveMe = (boxID, posID) => {
    this[boxID].current.style.left = arrPosition[posID][0] + "px";
    this[boxID].current.style.top = arrPosition[posID][1] + "px";
  };
  render = () => {
    const { classes } = this.props;
    const { open, widthDefault, timeOutRender } = this.state;
    const dataResponsive = { width: widthDefault ? widthDefault : 0 };
    return (
      <main className={classes.mainContaner} ref={this.mainContent}>
        {/* widget 1 */}
        {timeOutRender.indexOf(500) !== -1 && (
          <div
            ref={this.widget1}
            className={`${classes.blockWidget} ${classes.w1}`}
          >
            <Widget1
              handleExpanded={this.handleExpanded("widget1")}
              open={open}
              reponsive={dataResponsive}
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
              reponsive={dataResponsive}
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
              reponsive={dataResponsive}
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
              reponsive={dataResponsive}
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
              reponsive={dataResponsive}
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
              reponsive={dataResponsive}
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
              reponsive={dataResponsive}
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
              reponsive={dataResponsive}
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
              reponsive={dataResponsive}
            />
          </div>
        )}
      </main>
    );
  };
}

DashboardMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withCookies(withRoot(withStyles(styles)(DashboardMobile)));
