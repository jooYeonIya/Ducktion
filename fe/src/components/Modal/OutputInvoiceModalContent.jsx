import { useEffect, useState } from 'react';
import { getBiddershipInvoice } from '../../services/invoiceService'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import DropdownInput from './DropdownInput'
import RectangleButton from '../Button/RectangleButton'
import PreTextLabel from '../Labels/PreTextLabel';
import '@styles/components/modal/BidPointModalContent.css'

export default function OutputInvoiceModalContent({ itemName, itemId, onClose }) {
  const [invoice, setInvocie] = useState({
    courier: '',
    invoice: ''
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
        title={invoice.courier} 
        placeholder={invoice.invoice}
        isEditable={false} 
      />

      <div className='bidPointModalContent_buttons'>
        <RectangleButton text="취소" onClick={onClose} />
      </div>

    </div>)
}