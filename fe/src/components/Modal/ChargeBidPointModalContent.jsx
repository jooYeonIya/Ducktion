import { useState } from 'react'
import { postChargeBidPoint } from '../../services/bidService'
import { numericInputValidate } from '../../utils/numericInputValidate'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import RectangleButton from '../Button/RectangleButton'
import BidInputTextField from './BidInputTextField'

import '@styles/components/modal/BidPointModalContent.css'

export default function ChargeBidPointModalContent({ heldBid = 0, usableBid = 0, onClose }) {
  const [bidPoint, setBidPoint] = useState('');

  const handleBidPointChange = (value) => {
    setBidPoint(value); 
  };

  const probs = {
    heldBid: heldBid, 
    usableBid: usableBid, 
    leftTitle: "충전 금액", 
    rightTitle: "만원", 
    placeholder: "금액을 입력해 주세요",
    onChange: handleBidPointChange
  }

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
      <BidInputTextField probs={probs} />
      <div className='bidPointModalContent_buttons'>
        <RectangleButton text="취소" onClick={onClose} />
        <RectangleButton text="확인" onClick={handleSubmit} />
      </div>
    </>
  )
}