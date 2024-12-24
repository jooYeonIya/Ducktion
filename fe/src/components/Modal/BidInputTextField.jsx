import { useState } from 'react'
import BidPointHistoryCard from '../BidPointHistoryCard'
import PreTextLabel from '../Labels/PreTextLabel'

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
        <PreTextLabel text={leftTitle} />
        <input type="text" 
          value={bidPoint} 
          onChange={handleChange} 
          placeholder={placeholder} 
        />
        <PreTextLabel text={rightTitle} />
      </div>
    </div>
  )
}