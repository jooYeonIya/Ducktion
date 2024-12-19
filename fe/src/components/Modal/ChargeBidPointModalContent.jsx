import { useState } from 'react'
import { postChargeBidPoint } from '../../services/bidService'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import RectangleButton from '../Button/RectangleButton'
import PreSubTitleLabel from '../Labels/PreSubTitleLabel'
import BidPointHistoryCard from '../BidPointHistoryCard'
import { numericInputValidate } from '../../utils/numericInputValidate'

import '@styles/components/modal/ChargeBidPointModalContent.css'

export default function ChargeBidPointModalContent({ heldBid = 0, usableBid = 0, onClose, text }) {
  const [bidPoint, setBidPoint] = useState('');

  const handleChange = (e) => {
    setBidPoint(e.target.value);
  };

  const handleSubmit = async () => {
    const errorMessage = numericInputValidate(bidPoint); 
    if (errorMessage) {
      alert(errorMessage); 
      return;
    }

    try {
      const message = await postChargeBidPoint(bidPoint); 
      alert(message); 
      onClose(); 
    } catch (error) {
      console.error('Failed', error);
    }
  };

  return (
    <>
      <GodoTitleLabel text={'비드 충전'} />

      <div className='chargeBidPointModalContent'>
        <BidPointHistoryCard heldBid={heldBid} usableBid={usableBid} />
        <div className='chargeBidPointModalContent_input'>
          <PreSubTitleLabel text={text} />
          <input type="text" value={bidPoint} onChange={handleChange} placeholder='금액을 입력해 주세요'/>
          <PreSubTitleLabel text={'만원'} />
        </div>
      </div>

      <div className='chargeBidPointModalContent_buttons'>
        <RectangleButton text="취소" onClick={onClose} />
        <RectangleButton text="확인" onClick={handleSubmit} />
      </div>
    </>
  )
}