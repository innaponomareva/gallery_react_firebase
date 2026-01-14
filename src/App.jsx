import { Routes, Route, Navigate } from 'react-router';
import './css/index.css';
import Navigation from './components/Navigation';
import VerticalList from './components/VerticalList';
import FilteredPhotos from './pages/FilteredPhotos';
import MyPhotos from './pages/MyPhotos';
import PageNotFound from './pages/PageNotFound';
import UploadPhoto from './pages/UploadPhoto';

export default function App() {
  return (
    <div className="app">
      <Navigation />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/myphotos" replace />} />
          <Route path="/photosinfo" element={<VerticalList />} />
          <Route path="/upload" element={<UploadPhoto />} />
          <Route path="/myphotos/:id" element={<FilteredPhotos />} />
          <Route path="/myphotos" element={<MyPhotos />} />
          <Route path="/notfound" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
      </div>
    </div>
  );
}
