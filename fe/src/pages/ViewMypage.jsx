import { useNavigate } from "react-router-dom";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import PreCaptionLabel from "../components/Labels/PreCaptionLabel";
import RectangleButton from "../components/Button/RectangleButton"
import GodoSubTitleLabel from "../components/Labels/GodoSubTitleLabel"
import PreTitleLabel from "../components/Labels/PreTitleLabel"
import IconPlusLabelColumn from "../components/Labels/IconPlusLabelColumn"

import '@styles/pages/ViewMypage.css'
import ProfileImage from "../components/ProfileImage";

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
    navigate('/viewBiddedHistoryList', { state: { sortType: biddedSortOptions[1].value } })
  }

  const handleBiddingItem = () => {
    navigate('/viewBiddingHistoryList', { state: { sortType: biddingSortOptions[1].value } })
  }

  const handleFavoriteItem = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        communityId: i,
        image: "/src/assets/test_image.png",
        favorited: i % 2 == 0,
        name: `${i} 상품`,
        priceInfo: { price: i * 10000, type: "" },
        additionalInfo: null,
        overlayText: false
      });
    }
    navigate('/viewFavoriteItemList', { state: { items: data } })
  }

  return (
    <>
      <GodoTitleLabel text={"마이페이지"} />

      <div className='profile_container'>
        <div className='profile_info_section'>
          <div className='profile_image'>
            <ProfileImage imageUrl={"/src/assets/duck.png"} />
          </div>
          <div className='profile_info'>
            <GodoSubTitleLabel text={"닉네임"} />
            <GodoSubTitleLabel text={"이메일"} />
          </div>
        </div>
        <RectangleButton text='프로필 관리' />
      </div>
      <div className='rate_container'>
        <div className='rate_items'>
          <div className='rate_item'>
            <IconPlusLabelColumn icon={"src/assets/rate.png"} text={"내 점수"} />
            <PreTitleLabel text={"58점"}/>
          </div>
          <hr/>
          <div className='rate_item'>
            <IconPlusLabelColumn icon={"src/assets/heldBid.png"} text={"보유 비드"} />
            <PreTitleLabel text={"58점"}/>
          </div>
          <hr/>
          <div className='rate_item'>
            <IconPlusLabelColumn icon={"src/assets/usableBiid.png"} text={"사용 가능 비드"} />
            <PreTitleLabel text={"58점"}/>
          </div>
        </div>
      </div>

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