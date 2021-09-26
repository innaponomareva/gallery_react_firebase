import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Navigation from './components/Navigation';
import VerticalList from './components/VerticalList';
import FilteredPhotos from './pages/FilteredPhotos';
import MyPhotos from './pages/MyPhotos';
import Start from './pages/Start';
import UploadPhoto from './pages/UploadPhoto';


function App() {

  return (
    <div className="App">
      <Navigation />
      <div className="wrapper">
        <Switch>
          {/* <Route path="/photosinfo/:id" component={VerticalList} /> */}
          <Route path="/photosinfo" exact component={VerticalList} />
          <Route path="/upload" exact component={UploadPhoto} />
          <Route path="/myphotos/:id" component={FilteredPhotos} />
          <Route path="/myphotos" exact component={MyPhotos} />
          <Route path="/" exact component={Start} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);