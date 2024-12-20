import { useState } from 'react'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import PreTextLabel from '../Labels/PreTextLabel'
import PreCaptionLabel from '../Labels/PreCaptionLabel'
import RectangleButton from '../Button/RectangleButton'
import RoundButton from '../Button/RoundButton'
import '@styles/components/modal/BidPointModalContent.css'

export default function SubmitBidModalContent({ itemName, usableBid, onClose }) {
  const [bidPoint, setCBidPoint] = useState(0);

  const handlePlusIcon = () => {
    const newBind = bidPoint + 1;
    setCBidPoint(newBind);
  };

  const handleMinusIcon = () => {
    const newBind = bidPoint > 0 ? bidPoint - 1 : 0;
    setCBidPoint(newBind);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setCBidPoint(value);
  };

  return (
    <div className='modal_contaier'>
      <GodoTitleLabel text={'입찰하기'} />
      <PreTextLabel text={itemName} />
      <RoundButton options={[{vlaue: "", title: `사용 가능한 비드 ${usableBid}`}]} />

      {/* 가격 부분 */}
      <PreCaptionLabel text={"*즉시 낙찰가를 초과하는 입찰은 불가합니다."} style={{ color: "#bebebe" }} />

      <div className='bidInput_container'>
        <button className='bidInput_button' onClick={handleMinusIcon}>
        <img src="/src/assets/minus.png" width={20} height={20}/>
        </button>
        <input
          type='text'
          className='bidInput_field'
          value={bidPoint}
          onChange={handleChange}
        />
        <button className='bidInput_button' onClick={handlePlusIcon}>
          <img src="/src/assets/plus.png" width={20} height={20}/>
        </button>
      </div>

      <div className='bidPointModalContent_buttons'>
        <RectangleButton text="취소" onClick={onClose} />
        <RectangleButton text="확인" />
      </div>
    </div>
  )
}