import HomePage from "views/HomePage/Home.jsx";
import LoginPage from "views/LoginPage/Login.jsx";
import RegisterPage from "views/RegisterPage/Register.jsx";
import ForgetPage from "views/ForgetPage/ForgetPage.jsx";
import ChangePass from "views/ChangePassword/ChangePassword.jsx";
import UpdateDevice from "views/UpdateDevice/UpdateDevice.jsx";
import CompanyPage from "views/CompanyPage/Company.jsx";
import ProfilePage from "views/ProfilePage/Profile.jsx";
import MapSurvey from "views/MapSurvey/MapSurvey.jsx";
import CompanySetting from "views/CompanySettingPage/CompanySetting.jsx";
import Survey from "views/OperationPage/Survey.jsx";
import SurveyReport from "views/OperationPage/SurveyReport.jsx";
import ConstructionPlan from "views/ConstructionPlanPage/ConstructionPlan.jsx";
import Judgement from "views/JudgementPage/Judgement.jsx";
import SurveySws from "views/SurveySwsPage/SurveySws.jsx";
import Balance from "views/Balance/Balance.jsx";
import DetailedSearch from "views/DetailedSearch/DetailedSearch.jsx";
import GroundSurveyReport from "views/Report/GroundSurveyReport.jsx";
import Dashboard from "views/Dashboard/DashboardMain.jsx";
import Test from "views/Report/TestIframe.jsx";
// constant
import { folderRoot } from "constant/index.js";
var indexRoutes = [
  {
    path: `${folderRoot}dashboard`,
    name: "Dashboard",
    component: Dashboard,
    protected: true
  },
  {
    path: `${folderRoot}forgetpass/:userID`,
    name: "Forget password.",
    component: ForgetPage,
    protected: false
  },
  {
    path: `${folderRoot}forgetpass`,
    name: "Forget password.",
    component: ForgetPage,
    protected: false
  },
  {
    path: `${folderRoot}changepass/:email`,
    name: "Change password.",
    component: ChangePass,
    protected: false
  },
  {
    path: `${folderRoot}updatedevice`,
    name: "Update device.",
    component: UpdateDevice,
    protected: false
  },
  { path: `${folderRoot}register`, name: "Register", component: RegisterPage },
  { path: `${folderRoot}login`, name: "Login", component: LoginPage },
  {
    path: `${folderRoot}company`,
    name: "CompanyPage",
    component: CompanyPage,
    protected: false
  },
  {
    path: `${folderRoot}cost/balance`,
    name: "Balance",
    component: Balance,
    protected: true
  },
  {
    path: `${folderRoot}profile`,
    name: "ProfilePage",
    component: ProfilePage,
    protected: true
  },
  {
    path: `${folderRoot}company-setting`,
    name: "CompanySetting",
    component: CompanySetting,
    protected: true
  },
  {
    path: `${folderRoot}construction-plan`,
    name: "Construction Plan",
    component: ConstructionPlan,
    protected: true
  },
  {
    path: `${folderRoot}judgement`,
    name: "Judgement",
    component: Judgement,
    protected: true
  },
  {
    path: `${folderRoot}detailed-search`,
    name: "Detailed Search",
    component: DetailedSearch,
    protected: true
  },
  {
    path: `${folderRoot}ground-survey-report`,
    name: "Ground Survey report",
    component: GroundSurveyReport,
    protected: true
  },
  {
    path: `${folderRoot}operation/surveyreport`,
    name: "Survey report",
    component: SurveyReport,
    protected: true
  },
  {
    path: `${folderRoot}map-survey`,
    name: "MapSurvey",
    component: MapSurvey,
    protected: true
  },
  {
    path: `${folderRoot}survey/sws`,
    name: "Survey Sws",
    component: SurveySws,
    protected: true
  },
  {
    path: `${folderRoot}operation/survey`,
    name: "Survey",
    component: Survey,
    protected: true
  },
  {
    path: `${folderRoot}`,
    name: "HomePage",
    component: HomePage,
    protected: true
  }
];

export default indexRoutes;
