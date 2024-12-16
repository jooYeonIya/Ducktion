import {Routes, Route } from 'react-router-dom'
import RequestAddCommunity from '../pages/RequestAddCommunity'

export default function Routers() {
  return (
    <Routes>
      <Route path='/requestAddCommunity' element={<RequestAddCommunity />} />
    </Routes>
  );
}