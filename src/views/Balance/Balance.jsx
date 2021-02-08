import React from "react";
import withRoot from "withRoot";
import { PropTypes } from "prop-types";
import { matchPath } from "react-router";
import axios from "axios";
// @material-ui components
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
// constant
import { folderRoot } from "constant/index.js";
// layout
import Master3Col from "layout/Master3Col.jsx";
// constant
import { apiRoot } from "constant/index.js";
// jss
const styles = {
  content: {
    padding: "20px 0px 0px",
    overflow: "auto",
    height: "calc(100vh - 114px)"
  },
  tableContent: {
    borderSpacing: "2px",
    fontSize: "0.8rem",
    color: "#003366",
    fontWeight: "normal",
    "& thead tr th": {
      fontWeight: "normal",
      whiteSpace: "nowrap",
      padding: 5
    },
    "& thead tr:nth-child(1) th": {
      borderBottom: "1px solid darkred",
      borderLeft: "2px dotted darkred"
    },
    "& tbody tr td": {
      height: 20,
      whiteSpace: "nowrap",
      padding: 5
    },
    "& tbody tr:nth-child(2n+1)": {
      backgroundColor: "#e6e1d1"
    },
    "& tfoot tr th": {
      fontWeight: "normal"
    }
  },
  boderLeft: {
    borderLeft: "2px dotted darkred"
  },
  select: {
    backgroundColor: "#007c77 !important",
    color: "#fff !important"
  },
  errorPage: {
    textAlign: "center",
    "& h2": {
      fontSize: 35,
      marginTop: "10%"
    },
    "& svg": {
      color: "darkslategrey"
    }
  },
  loaddingPage: {
    marginTop: "10%"
  }
};

const paramDefault = {
  /* table 1 */
  // colum 売上
  sales_number: "売上番号",
  sales_date: "売上日",
  categories: "商品区分",
  product_name: "商品名",
  // colum 物件
  property_no: "物件番号",
  quality_certification_company: "品質証明事業者",
  property_name: "物件名",
  property_address: "物件住所",

  // table 2
  // colum 請求
  billing_code: "請求先コード",
  billing_name: "請求先名",
  sales_approval_date: "売上承認日",
  sales_staff: "営業担当",
  branch_name: "支社名",
  excluding_tax: "税抜金額",
  tax_included: "税込金額",
  billing_method: "請求方法",
  closing_date: "請求締日",
  billing_date: "請求日",
  scheduled_collection_date: "回収予定日",
  // colum 入金
  deposit_number: "入金番号",
  payment_day: "入金日",
  deposit_type_1: "入金種別１",
  deposit_1: "入金額１",
  deposit_type_2: "入金種別２",
  deposit_2: "入金額２",
  commission: "手数料",
  cooperation_fee: "協力会費等",
  deposit_total: "入金額合計",
  // colum 入金２
  advance_payment: "前受金",
  uncollected_balance: "未回収残高",
  deposit: "預り金",

  // table 3
  // colum 仕入
  purchase_number: "仕入番号",
  purchase_date: "仕入日",
  survey_construction_date: "調査・工事日",
  description: "明細摘要",
  payee_code: "支払先コード",
  payee_name: "支払先名",
  purchase_approval_date: "仕入承認日",
  excluding_tax_1: "税抜金額",
  tax_included_1: "税込金額",
  payment_closing_date: "支払締日",
  payment_due_date: "支払予定日",
  payment_number: "支払番号",
  payment_date: "支払日",
  payment_type_1: "支払種別１",
  payment_amount_1: "支払額１",
  payment_type_2: "支払種別２",
  payment_amount_2: "支払額２",
  total_payment_amount: "支払額合計",
  unpaid_balance: "未払残高"
};
class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaddingPage: 0,
      arrParams: [],
      data: null,
      surveyId: null
    };
  }
  componentDidMount = () => {
    document.title = "売上一覧";
    // let queryParam = new URLSearchParams(this.props.location.search);
    // this.getDataBalance(queryParam);
    let currentLocation = this.props.location.pathname;
    let match = matchPath(currentLocation, {
      path: `${folderRoot}cost/balance/:id`,
      exact: true,
      strict: false
    });

    if (match !== null && match.params.id) {
      // get data theo id sql
      this.getDataBalance(match.params.id);
    } else {
      // khoon ton tai id sql thì không vào dc
      this.setState({ isLoaddingPage: -1 });
    }
  };
  getDataBalance = async idSQL => {
    try {
      const res = await axios.get(`${apiRoot}/costbalance/${idSQL}`);
      // Failed
      if (res.status !== 200) {
        this.setState({ isLoaddingPage: -1 });
        return;
      }
      console.log(res.data);
      this.setState({ isLoaddingPage: 1, data: res.data });
    } catch (error) {
      this.setState({ isLoaddingPage: -1 });
      return;
    }
  };
  // format date
  formatDate = date => {
    if (date) {
      let arrDay = new Date(date);
      let yy = String(arrDay.getFullYear());
      let mm = String(parseInt(arrDay.getMonth()) + 1);
      let dd = String(arrDay.getDate());
      mm = mm.length === 1 ? "0" + mm : mm;
      dd = dd.length === 1 ? "0" + dd : dd;
      return yy + "-" + mm + "-" + dd;
    }
    return;
  };
  render = () => {
    const { classes } = this.props;
    const { data, isLoaddingPage, arrParams } = this.state;
    let breadcrumb = "";
    arrParams.forEach(item => {
      breadcrumb += "▶︎ " + paramDefault[`${item[0]}`] + "：" + item[1] + " 　";
    });
    // render tr name field
    // render tr td table
    let elRender =
      data &&
      data.map((item, key) => {
        return (
          <tr key={key}>
            {/* 売上 */}
            <td className={classes.boderLeft}>{item.sales_number}</td>
            <td>{this.formatDate(item.sales_date)}</td>
            <td>{item.categories}</td>
            <td>{item.product_name}</td>
            {/* 物件 */}
            <td className={classes.boderLeft}>{item.property_no}</td>
            <td>{item.quality_certification_company}</td>
            <td>{item.property_name}</td>
            <td>{item.property_address}</td>
            {/* 請求 */}
            <td className={classes.boderLeft}>{item.billing_code}</td>
            <td>{item.billing_name}</td>
            <td>{this.formatDate(item.sales_approval_date)}</td>
            <td>{item.sales_staff}</td>
            <td>{item.branch_name}</td>
            <td>{item.excluding_tax}</td>
            <td>{item.tax_included}</td>
            <td>{item.billing_method}</td>
            <td>{this.formatDate(item.closing_date)}</td>
            <td>{this.formatDate(item.billing_date)}</td>
            <td>{this.formatDate(item.scheduled_collection_date)}</td>
            {/* 入金 */}
            <td className={classes.boderLeft}>{item.deposit_number}</td>
            <td>{this.formatDate(item.payment_day)}</td>
            <td>{item.deposit_type_1}</td>
            <td>{item.deposit_1}</td>
            <td>{item.deposit_type_2}</td>
            <td>{item.deposit_2}</td>
            <td>{item.commission}</td>
            <td>{item.cooperation_fee}</td>
            <td>{item.deposit_total}</td>
            {/* 入金２	 */}
            <td>{item.advance_payment}</td>
            <td>{item.uncollected_balance}</td>
            <td>{item.deposit}</td>
            {/* 仕入	 */}
            <td className={classes.boderLeft}>{item.purchase_number}</td>
            <td>{this.formatDate(item.purchase_date)}</td>
            <td>{this.formatDate(item.survey_construction_date)}</td>
            <td>{item.description}</td>
            <td>{item.payee_code}</td>
            <td>{item.payee_name}</td>
            <td>{this.formatDate(item.purchase_approval_date)}</td>
            <td>{item.excluding_tax_1}</td>
            <td>{item.tax_included_1}</td>
            <td>{this.formatDate(item.payment_closing_date)}</td>
            <td>{this.formatDate(item.payment_due_date)}</td>
            <td>{item.payment_number}</td>
            <td>{this.formatDate(item.payment_date)}</td>
            <td>{item.payment_type_1}</td>
            <td>{item.payment_amount_1}</td>
            <td>{item.payment_type_2}</td>
            <td>{item.payment_amount_2}</td>
            <td>{item.total_payment_amount}</td>
            <td>{item.unpaid_balance}</td>
          </tr>
        );
      });
    // end render tr td table

    if (isLoaddingPage === 0) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={"100%"}
          titleHeader="売上一覧"
          breadcrumb={breadcrumb}
        >
          <div className={classes.errorPage}>
            <CircularProgress size={50} className={classes.loaddingPage} />
          </div>
        </Master3Col>
      );
    }
    if (isLoaddingPage === -1) {
      return (
        <Master3Col
          colLeft={null}
          colRight={null}
          maxWidthPage={"100%"}
          titleHeader="売上一覧"
          breadcrumb={breadcrumb}
        >
          <div className={classes.errorPage}>
            <Typography component="h2">Oops, something went wrong!</Typography>
          </div>
        </Master3Col>
      );
    }

    return (
      <Master3Col
        colLeft={null}
        colRight={null}
        maxWidthPage={"100%"}
        titleHeader="売上一覧"
        breadcrumb={breadcrumb}
      >
        <div className={classes.content}>
          <table className={classes.tableContent}>
            <thead>
              <tr>
                <th colSpan={4}>売上</th>
                <th colSpan={4}>物件</th>
                <th colSpan={11}>請求</th>
                <th colSpan={9}>入金</th>
                <th colSpan={3}>入金２</th>
                <th colSpan={19}>仕入</th>
              </tr>
              <tr>
                {/* 売上 */}
                <th>▼ 売上番号</th>
                <th>▼ 売上日</th>
                <th>▼ 商品区分</th>
                <th>▼ 商品名</th>
                {/* 物件 */}
                <th>▼ 物件番号</th>
                <th>▼ 品質証明事業者</th>
                <th>▼ 物件名</th>
                <th>▼ 物件住所</th>
                {/* 請求	 */}
                <th>▼ 請求先コード</th>
                <th>▼ 請求先名</th>
                <th>▼ 売上承認日</th>
                <th>▼ 営業担当</th>
                <th>▼ 支社名</th>
                <th>▼ 税抜金額</th>
                <th>▼ 税込金額</th>
                <th>▼ 請求方法</th>
                <th>▼ 請求締日</th>
                <th>▼ 請求日</th>
                <th>▼ 回収予定日</th>
                {/* 入金	 */}
                <th>▼ 入金番号</th>
                <th>▼ 入金日</th>
                <th>▼ 入金種別１</th>
                <th>▼ 入金額１</th>
                <th>▼ 入金種別２</th>
                <th>▼ 入金額２</th>
                <th>▼ 手数料</th>
                <th>▼ 協力会費等</th>
                <th>▼ 入金額合計</th>
                {/* 入金２	 */}
                <th>▼ 前受金</th>
                <th>▼ 未回収残高</th>
                <th>▼ 預り金</th>
                {/* 仕入 */}
                <th>▼ 仕入番号</th>
                <th>▼ 仕入日</th>
                <th>▼ 調査・工事日</th>
                <th>▼ 明細摘要</th>
                <th>▼ 支払先コード</th>
                <th>▼ 支払先名</th>
                <th>▼ 仕入承認日</th>
                <th>▼ 税抜金額</th>
                <th>▼ 税込金額</th>
                <th>▼ 支払締日</th>
                <th>▼ 支払予定日</th>
                <th>▼ 支払番号</th>
                <th>▼ 支払日</th>
                <th>▼ 支払種別１</th>
                <th>▼ 支払額１</th>
                <th>▼ 支払種別２</th>
                <th>▼ 支払額２</th>
                <th>▼ 支払額合計</th>
                <th>▼ 未払残高</th>
              </tr>
            </thead>
            <tbody>{elRender}</tbody>
            <tfoot>
              <tr>
                <th>合計</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>sum</th>
                <th>sum</th>
                <th>sum</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>sum</th>
                <th>sum</th>
                <th></th>
                <th>sum</th>
                <th></th>
                <th>sum</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Master3Col>
    );
  };
}

Balance.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object
};
export default withRoot(withStyles(styles)(Balance));
