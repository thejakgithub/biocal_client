import "./styles/App.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Activity from "./pages/activity";
import Agency from "./pages/agency";
import Board from "./pages/board";
import Contract from "./pages/contract";
import Objective from "./pages/objective";
import Origin from "./pages/origin";
import Support from "./pages/support";
import { Route, Switch } from "react-router-dom";
import Admin from "./pages/admin";
import Nav from "./components/Nav";
import NotFound from "./pages/notFound";
import ScrollToTop from "./components/ScrollToTop";
import MoreProject from "./pages/moreProject";
import DetailProject from "./pages/detailProject";
import RegisterProject from "./pages/registerProject";
import UserProject from "./pages/userProject";
import MoreNews from "./pages/moreNews";
import MoreArticle from "./pages/moreArticle";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Header />
          <Nav />
          <Carousel />
          <Content />
          <Footer />
        </Route>
        <Route path="/origin">
          <Header />
          <Nav />
          <Origin />
          <Footer />
        </Route>
        <Route path="/objective">
          <Header />
          <Nav />
          <Objective />
          <Footer />
        </Route>
        <Route path="/activity">
          <Header />
          <Nav />
          <Activity />
          <Footer />
        </Route>
        <Route path="/board">
          <Header />
          <Nav />
          <Board />
          <Footer />
        </Route>
        <Route path="/support">
          <Header />
          <Nav />
          <Support />
          <Footer />
        </Route>
        <Route path="/agency">
          <Header />
          <Nav />
          <Agency />
          <Footer />
        </Route>
        <Route path="/contract">
          <Header />
          <Nav />
          <Contract />
          <Footer />
        </Route>
        <Route path="/moreProject">
          <Header />
          <Nav />
          <MoreProject />
          <Footer />
        </Route>
        <Route path="/moreNews">
          <Header />
          <Nav />
          <MoreNews />
          <div className="wrapper-more-footer">
          <Footer />
          </div>
        </Route>
        <Route path="/moreArticle">
          <Header />
          <Nav />
          <MoreArticle />
          <Footer />
        </Route>
        <Route path="/detailProject/:pjID">
          <Header />
          <Nav />
          <DetailProject />
          <Footer />
        </Route>
        <Route path="/registerProject/:pjID">
          <Header />
          <Nav />
          <RegisterProject />
          <Footer />
        </Route>
        <Route path="/userProject/:pjID/:projectName">
          <Header />
          <Nav />
          <UserProject />
          <div className="wrapper-userproject-footer">
          <Footer/> 
          </div>
        </Route>
        <Route path="/admin">
          <Admin />
          <ScrollToTop />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
