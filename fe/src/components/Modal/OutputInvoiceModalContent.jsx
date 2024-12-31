import { useEffect, useState } from 'react';
import { getBiddershipInvoice } from '../../services/shipService'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import DropdownInput from './DropdownInput'
import RectangleButton from '../Button/RectangleButton'
import PreTextLabel from '../Labels/PreTextLabel';
import '@styles/components/modal/BidPointModalContent.css'

export default function OutputInvoiceModalContent({ itemName, itemId, onClose }) {
  const [invoice, setInvocie] = useState({
    delivery: '',
    postNumber: ''
  });

  const fetchBiddershipInvoice = async() => {
    const data = await getBiddershipInvoice(itemId);
    setInvocie(data);
  }

  useEffect(() => {
    fetchBiddershipInvoice();
  }, []); 

  return (
    <div className='modal_contaier'>
      <GodoTitleLabel text={"배송 번호 조회"} />
      <PreTextLabel text={`상품명: ${itemName}`} />
      <DropdownInput
        dropList={[]} 
        title={invoice.delivery || "배송 전"} 
        placeholder={invoice.postNumber || "배송 전"}
        isEditable={false} 
      />

      <div className='bidPointModalContent_buttons'>
        <RectangleButton text="취소" onClick={onClose} />
      </div>
    </div>)
}