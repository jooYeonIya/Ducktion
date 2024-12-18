import { useNavigate } from "react-router-dom";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import PreCaptionLabel from "../components/Labels/PreCaptionLabel";

import '@styles/pages/ViewMypage.css'

export default function ViewMypage() {
  const biddedSortOptions = [
    { value: "all", title: "전체" },
    { value: "bidding", title: "입찰중" },
    { value: "bidded", title: "낙찰" },
    { value: "biddedCancel", title: "유찰" },
  ];

  const biddingSortOptions = [
    { value: "all", title: "전체" },
    { value: "bidding", title: "입찰중" },
    { value: "bidded", title: "낙찰" },
    { value: "biddedFail", title: "패찰" },
  ];

  const navigate = useNavigate();

  const handleBiddedItem = () => {
    navigate('/viewBiddedHistoryList', {state: {sortType: biddedSortOptions[1].value} })  
  }

  const handleBiddingItem = () => {
    navigate('/viewBiddingHistoryList', {state: {sortType: biddingSortOptions[1].value} })  
  }

  const handleFavoriteItem = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        communityId: i,
        image: "/src/assets/test_image.png",
        favorited: i%2 == 0,
        name: `${i} 상품`,
        priceInfo: {price: i*10000, type: ""},
        additionalInfo: null,
        overlayText: false
      });
    }
    navigate('/viewFavoriteItemList', { state: {items: data} })  
  }
  
  return (
    <>
      <GodoTitleLabel text={"마이페이지"} />

      <div className='biddingItem_container'>
        <div className='biddingItem_container_title'>
          <GodoTitleLabel text={"입찰 이력"} />
          <button onClick={handleBiddingItem}><PreCaptionLabel text={"입찰 이력"} /></button>
        </div>
      </div>

      <div className='biddedItem_container'>
        <div className='biddedItem_container_title'>
          <GodoTitleLabel text={"출품 이력"} />
          <button onClick={handleBiddedItem}><PreCaptionLabel text={"출품 이력"} /></button>
        </div>
      </div>

      <div className='favoriteItem_container'>
        <div className='favoriteItem_container_title'>
          <GodoTitleLabel text={"관심 상품"} />
          <button onClick={handleFavoriteItem}><PreCaptionLabel text={"더보기"} /></button>
        </div>
      </div>
    </>
  )
}