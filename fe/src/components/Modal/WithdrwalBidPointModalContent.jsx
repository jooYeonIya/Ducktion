import { useState } from 'react'
import { postWithdrwalBidPoint } from '../../services/bidPointService'
import { numericInputValidate } from '../../utils/numericInputValidate'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import RectangleButton from '../Button/RectangleButton'
import DropdownInput from './DropdownInput'
import BidInputTextField from './BidInputTextField'

import '@styles/components/modal/BidPointModalContent.css'

export default function WithdrwalBidPointModalContent({ heldBid = 0, usableBid = 0, onClose, onComplete }) {
  const [bidPoint, setBidPoint] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleBidPointChange = (value) => {
    setBidPoint(value); 
  };

  const handleBankSelected = (value) => {
    setSelectedBank(value);
  };

  const handleAccountNumberInputed = (value) => {
    setAccountNumber(value);
  };

  const banks = ["하나은행", "신한은행", "우리은행", "농협", "카카오뱅크"];

  const probs = {
    heldBid: heldBid, 
    usableBid: usableBid, 
    leftTitle: "현금화 비드", 
    rightTitle: "비드", 
    placeholder: "비드를 입력해 주세요",
    onChange: handleBidPointChange
  }

  const handleSubmit = async () => {
    const errorMessage = numericInputValidate(bidPoint); 
    if (errorMessage) {
      alert(errorMessage); 
      return;
    }

    if (!selectedBank) {
      alert('은행을 선택해주세요.');
      return;
    }

    if (!accountNumber) {
      alert('계좌번호를 입력해주세요.');
      return;
    }

    try {
      const message = await postWithdrwalBidPoint(bidPoint); 
      alert(message);
      onClose(); 
      onComplete();
    } catch (error) {
      console.error('Failed', error);
    }
  };

  return (
    <>
      <GodoTitleLabel text={'비드 현금화'} />
      <BidInputTextField probs={probs} />
      <div>
        <DropdownInput
          dropList={banks}
          title={'은행 선택'}
          placeholder={'계좌 번호 - 없이 입력'}
          selectedList={handleBankSelected}
          inputed={handleAccountNumberInputed}
        />
      </div>

      <div className='bidPointModalContent_buttons'>
        <RectangleButton text="취소" onClick={onClose} />
        <RectangleButton text="확인" onClick={handleSubmit} />
      </div>
    </>
  )
}