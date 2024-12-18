import {Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import RequestAddCommunity from '../pages/RequestAddCommunity'
import ViewItemList from '../pages/ViewItemList'
import ViewCommunityList from '../pages/ViewCommunityList'
import ViewSearchResult from '../pages/ViewSearchResult'
import ViewFavoriteItemList from '../pages/ViewFavoriteItemList'
import ViewMypage from '../pages/ViewMypage'
import ViewBiddedHistoryList from '../pages/ViewBiddedHistoryList'
import ViewBiddingHistoryList from '../pages/ViewBiddingHistoryList'

export default function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/requestAddCommunity' element={<RequestAddCommunity />} />
      <Route path='/viewItemList' element={<ViewItemList />} />
      <Route path="/viewCommunityList" element={<ViewCommunityList />} />
      <Route path='/viewSearchResult' element={<ViewSearchResult />} />
      <Route path='/viewFavoriteItemList' element={<ViewFavoriteItemList/>} />
      <Route path='/viewMypage' element={<ViewMypage/>} />
      <Route path='/viewBiddedHistoryList' element={<ViewBiddedHistoryList/>} />
      <Route path='/viewBiddingHistoryList' element={<ViewBiddingHistoryList/>} />
    </Routes>
  );
}