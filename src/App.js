import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import MainLandingPage from "./components/Pages/MainLandingPage/MainLandingPage";
import ListOverview from "./components/Pages/ListOverview";
import ListDetailPage from "./components/Pages/ListDetailPage/ListDetailPage";
import CreateList from "./components/Pages/NewList/CreateList";
import ItemDetailPages from "./components/Pages/ItemDetailPages";
import CreateItem from "./components/Pages/NewList/CreateItem";
import MyProfil from "./components/Pages/MyProfil";
import Signing from "./components/Pages/SignIn/Signing";
import Login from "./components/Pages/SignIn/Login";
import NotFound from "./components/Pages/NotFound";
import Test from "./components/Pages/Test";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="box-border">
      <Header />
      <div className="">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/main_landing_page" />
          </Route>
          <Route path="/main_landing_page">
            <MainLandingPage />
          </Route>
          <Route path="/lists" exact>
            <ListOverview />
          </Route>
          <Route path="/lists/detailpage/:listId">
            <ListDetailPage />
          </Route>
          <Route path="/lists/create">
            <CreateList />
          </Route>
          <Route path="/items" exact>
            <ItemDetailPages />
          </Route>
          <Route path="/items/create">
            <CreateItem />
          </Route>
          <Route path="/my_profil">
            <MyProfil />
          </Route>
          <Route path="/signup">
            <Signing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
