import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GodoTextLabel from '../Labels/GodoTextLabel'
import PreTextLabel from '../Labels/PreTextLabel'
import PreCaptionLabel from '../Labels/PreCaptionLabel'

import '@styles/components/ItemCard.css'

function ItemCard({ data, badgeClick }) {
  const {itemId, image, favorited, name, priceInfo, additionalInfo, overlayText} = data
  const [isFavorited, setIsFavorited] = useState(favorited);
  const navigate = useNavigate();

  const toggleBadge = () => {
    setIsFavorited(!isFavorited);
    if (badgeClick) badgeClick();
  };

  const cardOnClick = () => {
    navigate("/viewItem", { state: {itemId: itemId} });
  };

  return (
    <div className='itemCard' onClick={cardOnClick}>

      {/* 상단: 이미지와 뱃지 */}
      <div className='itemCard_imageContainer'>
        <img src={image} alt='ItemImage' className='itemCard_imageContainer_image' />
        <button className='itemCard_imageContainer_badge' onClick={(e) => {
          // 카드 클릭 이벤트와 구분
          e.stopPropagation(); 
          toggleBadge();
        }}>
          <img
            src={isFavorited ? 'src/assets/duck_selected.png' : 'src/assets/duck.png'}
            alt='Badge'
            className='itemCard_imageContainer_badgeImage'
          />
        </button>
      </div>

      {/* 하단: 아이템 정보 */}
      <div className='itemCard_infoContainer'>
        <div className='itemCard_infoContainer_name'>
          <GodoTextLabel text={name} />
        </div>
        {priceInfo && <div className='itemCard_infoContainer_price'>
          <PreTextLabel text={priceInfo.price} />
          <PreCaptionLabel text={priceInfo.type} />
        </div>}
        {additionalInfo && <div className='itemCard_infoContainer_additional_info'>
          {typeof additionalInfo === "string" ? (
            <PreTextLabel text={`출품 일시 ${additionalInfo}`} />
          ) : (
            <>
              <PreTextLabel text={`입찰 ${additionalInfo.bids} 건`} />
              <PreTextLabel text={`종료 ${additionalInfo.days}`} />
            </>
          )}
        </div>}
      </div>

      {/* 오버레이 */}
      {overlayText && (
        <div className='overlay'>
          <div className='overlay_circle'>
            <PreTextLabel text={overlayText} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCard;
