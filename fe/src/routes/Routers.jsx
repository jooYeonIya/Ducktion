import {Routes, Route } from 'react-router-dom'
import RequestAddCommunity from '../pages/RequestAddCommunity'
import ViewCommunityList from '../pages/ViewCommunityList';

export default function Routers() {
  return (
    <Routes>
      <Route path='/requestAddCommunity' element={<RequestAddCommunity />} />
      <Route path="/viewCommunityList" element={<ViewCommunityList />} />
    </Routes>
  );
}