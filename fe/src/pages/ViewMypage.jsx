import { useNavigate } from "react-router-dom";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import PreCaptionLabel from "../components/Labels/PreCaptionLabel";

import '@styles/pages/ViewMypage.css'

export default function ViewMypage() {

  const navigate = useNavigate();

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

      <div className='favoriteItem_container'>
        <div className='favoriteItem_container_title'>
          <GodoTitleLabel text={"관심 상품"} />
          <button onClick={handleFavoriteItem}><PreCaptionLabel text={"더보기"} /></button>
        </div>
      </div>
    </>
  )
}