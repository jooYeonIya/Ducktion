import { useEffect, useState } from 'react';
import { postExhibitorshipInvoice, getShippingDeadline } from '../../services/shipService'
import { validateItemOk } from "../../services/adminService";
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import DropdownInput from './DropdownInput'
import RectangleButton from '../Button/RectangleButton'
import PreTextLabel from '../Labels/PreTextLabel';
import '@styles/components/modal/BidPointModalContent.css'

export default function InputInvoiceModalContent({ itemId, onClose, role }) {
  const courier = ["롯데택배", "CJ대한통운", "우체국택배", "로젠택배"];

  const [selectedCourier, setSelectedCourier] = useState('');
  const [ivoice, setInvoice] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [isDeadlineValid, setIsDeadlineValid] = useState(false);

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

      if (deadline === 'ADMIN') {
        setIsDeadlineValid(true);
      } else {
        const deadlineDate = parseDateFromKoreanString(deadline);
        const currentDate = new Date();
        setIsDeadlineValid(currentDate <= deadlineDate);
      }
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
      const shipRequest = {
        deliveryId: selectedCourier,
        postNumber: ivoice,
        itemId: itemId
      }

      if (role === "USER") {
        const message = await postExhibitorshipInvoice(shipRequest);
        alert(message)
      } else {
        const message = await validateItemOk(shipRequest);
        alert(message)
      }

      onClose();
    } catch (error) {
      console.error('Failed', error);
    }
  };

  const parseDateFromKoreanString = (dateString) => {
    // "2024년 12월 29일"에서 숫자 부분만 추출
    const dateParts = dateString.match(/\d+/g); // ["2024", "12", "29"]
    if (!dateParts || dateParts.length !== 3) {
      console.error("Invalid Date Format: ", dateString);
      return null;
    }

    const [year, month, day] = dateParts.map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    fetchShippingDeadline();
  }, []);

  return (
    <div className='modal_contaier'>
      <GodoTitleLabel text={"배송 번호 입력"} />
      <PreTextLabel text={`배송 번호 입력 마감일: ${deadlineDate}`} />
      {isDeadlineValid ? (
        <DropdownInput
          dropList={courier}
          title={'택배사 선택'}
          placeholder={'택배 번호 - 없이 입력'}
          selectedList={handleCourierSelected}
          inputed={handleInvoiceInputed}
        />
      ) : (
        <PreTextLabel text="배송 번호 입력 기한이 지났습니다." style={{ color: 'red', textAlign: 'center' }} />
      )}

      <div className='bidPointModalContent_buttons'>
        <RectangleButton text="취소" onClick={onClose} />
        <RectangleButton text="확인" onClick={handleSubmit} />
      </div>

    </div>)
}