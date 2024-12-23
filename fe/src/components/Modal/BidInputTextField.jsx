import { useState } from 'react'
import BidPointHistoryCard from '../BidPointHistoryCard'
import PreSubTitleLabel from '../Labels/PreSubTitleLabel'

import '@styles/components/modal/BidInputTextField.css'

export default function BidInputTextField({ probs }) {
  const {heldBid, usableBid, leftTitle, rightTitle, placeholder, onChange} = probs
  const [bidPoint, setBidPoint] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setBidPoint(value); 
    if (onChange) onChange(value);
  };

  return (
    <div className='bidInputTextField'>
      <div className='bidInputTextField_info'>
        <BidPointHistoryCard heldBid={heldBid} usableBid={usableBid} />
      </div>
      <div className='bidInputTextField_input'>
        <PreSubTitleLabel text={leftTitle} />
        <input type="text" value={bidPoint} onChange={handleChange} placeholder={placeholder} />
        <PreSubTitleLabel text={rightTitle} />
      </div>
    </div>
  )
}