import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./css/index.css";
import Navigation from "./components/Navigation";
import VerticalList from "./components/VerticalList";
import FilteredPhotos from "./pages/FilteredPhotos";
import MyPhotos from "./pages/MyPhotos";
import PageNotFound from "./pages/PageNotFound";
import UploadPhoto from "./pages/UploadPhoto";

function App() {
  return (
    <div className="app">
      <Navigation />
      <div className="wrapper">
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/myphotos" />} />
          <Route path="/photosinfo" exact component={VerticalList} />
          <Route path="/upload" exact component={UploadPhoto} />
          <Route path="/myphotos/:id" component={FilteredPhotos} />
          <Route path="/myphotos" exact component={MyPhotos} />
          <Route path="/notfound" exact component={PageNotFound} />
          <Route path="*" exact render={() => <Redirect to="/notfound" />} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
