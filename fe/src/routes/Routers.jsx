import {Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import RequestAddCommunity from '../pages/RequestAddCommunity'
import AuctionItemsPage from '../pages/AuctionItemsPage'

export default function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/requestAddCommunity' element={<RequestAddCommunity />} />
      <Route path='/auctionItems' element={<AuctionItemsPage />} />
    </Routes>
  );
}