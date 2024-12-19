import { useEffect, useState } from 'react';
import { postExhibitorshipInvoice, getShippingDeadline } from '../../services/invoiceService'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import DropdownInput from './DropdownInput'
import RectangleButton from '../Button/RectangleButton'
import PreTextLabel from '../Labels/PreTextLabel';
import '@styles/components/modal/BidPointModalContent.css'

export default function InputInvoiceModalContent({ itemId, onClose }) {
  const courier = ["롯데택배", "CJ대한통운", "우체국택배", "로젠택배"];

  const [selectedCourier, setSelectedCourier] = useState('');
  const [ivoice, setInvoice] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');

  const handleCourierSelected = (value) => {
    setSelectedCourier(value);
  };

  const handleInvoiceInputed = (value) => {
    setInvoice(value);
  };

  const fetchShippingDeadline = async () => {
    try {
      const deadline = await getShippingDeadline(itemId);
      setDeadlineDate(deadline);
    } catch (error) {
      console.error('Failed', error);
    }
  }

  const handleSubmit = async () => {
    if (!selectedCourier) {
      alert('택배사를 선택해주세요.');
      return;
    }

    if (!ivoice) {
      alert('배송 번호를 입력해주세요.');
      return;
    }

    try {
      const invoice = {
        courier: selectedCourier,
        ivoice: ivoice
      }

      const message = await postExhibitorshipInvoice(invoice);
      alert(message)
      onClose();
    } catch (error) {
      console.error('Failed', error);
    }
  };

  useEffect(() => {
    fetchShippingDeadline();
  }, []); 

  return (
    <div className='modal_contaier'>
      <GodoTitleLabel text={"배송 번호 입력"} />
      <PreTextLabel text={`배송 번호 입력 마감일: ${deadlineDate}`} />
      <DropdownInput
        dropList={courier}
        title={'택배사 선택'}
        placeholder={'택배 번호 - 없이 입력'}
        selectedList={handleCourierSelected}
        inputed={handleInvoiceInputed}
      />

      <div className='bidPointModalContent_buttons'>
        <RectangleButton text="취소" onClick={onClose} />
        <RectangleButton text="확인" onClick={handleSubmit} />
      </div>

    </div>)
}