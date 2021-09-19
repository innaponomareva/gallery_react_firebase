import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Navigation from './components/Navigation';
import VerticalList from './components/VerticalList';
import FilteredPhotos from './pages/FilteredPhotos';
import MyPhotos from './pages/MyPhotos';
import UploadPhoto from './pages/UploadPhoto';


function App() {

  return (
    <div className="App">
      <Navigation />
      <div className="wrapper">
        <Switch>
        <Route path="/gallery_react_firebase/photosinfo/:id" component={VerticalList} />
          <Route path="/gallery_react_firebase/photosinfo" exact component={VerticalList} />
          <Route path="/gallery_react_firebase/upload" exact component={UploadPhoto} />
          <Route path="/gallery_react_firebase/:id" component={FilteredPhotos} />
          <Route path="/gallery_react_firebase" exact component={MyPhotos} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);