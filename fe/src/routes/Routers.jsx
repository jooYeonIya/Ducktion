import {Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import RequestAddCommunity from '../pages/RequestAddCommunity'

export default function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/requestAddCommunity' element={<RequestAddCommunity />} />
    </Routes>
  );
}