import { useState } from 'react'
import { postChargeBidPoint } from '../../services/bidPointService'
import { numericInputValidate } from '../../utils/numericInputValidate'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import RectangleButton from '../Button/RectangleButton'
import BidInputTextField from './BidInputTextField'

import '@styles/components/modal/BidPointModalContent.css'

export default function ChargeBidPointModalContent({ heldBid = 0, usableBid = 0, onClose, onComplete }) {
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

    const { IMP } = window; // 포트원 전역 객체
    IMP.init(''); // 가맹점 식별코드 입력 -> git에는 안 올리고 차후, git 환경 변수를 사용
  
    const paymentData = {
      pg: 'kakaopay.TC0ONETIME', // 카카오페이
      // pg: 'html5_inicis.INIpayTest', // 이니시스 실제 결제 주의
      pay_method: 'card', // 결제수단
      merchant_uid: `charge_${new Date().getTime()}`, // 고유 주문번호
      name: '비드 충전',
      amount: bidPoint, 
      buyer_email: 'test@example.com', 
      buyer_name: '홍길동', // 구매자 정보
    };

    IMP.request_pay(paymentData, async (response) => {
      if (response.success) {
         const message = await postChargeBidPoint(bidPoint);
        alert(message); 
        onClose();
        onComplete(); 
      } else {
        alert(`결제 실패: ${response.error_msg}`);
      }
    });
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