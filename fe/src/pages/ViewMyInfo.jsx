import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RectangleButton from '../components/Button/RectangleButton';
import '../styles/pages/ViewMyInfo.css';
import HorizontalRule from '../components/hr/HorizontalRule';
import GodoTitleLabel from '../components/Labels/GodoTitleLabel';
import PreTitleLabel from '../components/Labels/PreTitleLabel';
import PreSubTitleLabel from '../components/Labels/PreSubTitleLabel';

const ViewMyInfo = () => {
  const location = useLocation();

  const { nickname, phoneNumber, address } = location.state || {
    
  };

  const [nicknameNew, setNicknameNew] = useState(nickname);
  const [phoneNumberNew, setPhoneNumberNew] = useState(phoneNumber);
  const [addressNew, setAddressNew] = useState(address);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (!nicknameNew || !phoneNumberNew || !addressNew) {
      window.alert('모든 필드를 채워주세요.'); // 오류 메시지 alert
      return;
    }

    if (phoneNumberNew.replace(/-/g, '').length !== 11) {
      window.alert('전화번호는 11자리여야 합니다.'); // 오류 메시지 alert
      return;
    }

    if (!validatePhoneNumber(phoneNumberNew)) {
      window.alert('전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)'); // 오류 메시지 alert
      return;
    }

    // 수정된 정보를 저장하기 전에 사용자에게 확인 요청
    const confirmSave = window.confirm("저장하시겠습니까?");
    if (!confirmSave) {
      return; // 사용자가 취소하면 함수 종료
    }

    // 에러가 없을 경우
    setIsEditing(false);
    window.alert('저장되었습니다!'); // 성공 알림
    // 추가적인 저장 로직을 여기에 구현
  };

  const validatePhoneNumber = (number) => {
    const regex = /^\d{3}-\d{4}-\d{4}$/; // 전화번호 형식
    return regex.test(number);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // 숫자만 남기기
    if (value.length > 11) return; // 11자리값 입력 시 종료

    let formattedValue = '';
    if (value.length > 6) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
    } else if (value.length > 3) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      formattedValue = value;
    }

    setPhoneNumberNew(formattedValue); // 상태 업데이트
  };

  return (
    <div className="view-myinfo-container">
      <GodoTitleLabel text="마이페이지" />
      <div>
        <PreTitleLabel text="내 정보" />
        <HorizontalRule type="hr1" />
      </div>
      <div>
        <PreSubTitleLabel text="프로필 사진" />
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#ccc' }} />
        <button>사진 변경</button>
        <button>사진 삭제</button>
      </div>
      <HorizontalRule type="hr2" />

      <div className="nickname-wrapper">
        <PreSubTitleLabel text="닉네임" />
        <div className="TextField_container">
          {isEditing ? (
            <input
              type="text"
              value={nicknameNew}
              onChange={(e) => setNicknameNew(e.target.value)}
              className="searchTextField_input"
            />
          ) : (
            <span>{nicknameNew}</span>
          )}
        </div>
      </div>
      <HorizontalRule type="hr2" />

      <div className="phone-wrapper">
        <PreSubTitleLabel text="휴대폰 번호" />
        <div className="TextField_container">
          {isEditing ? (
            <input
              type="text"
              value={phoneNumberNew}
              onChange={handlePhoneChange}
              placeholder="숫자만 입력해주세요. (01012345678)"
              className="searchTextField_input"
            />
          ) : (
            <span>{phoneNumberNew}</span>
          )}
        </div>
      </div>
      <HorizontalRule type="hr2" />

      <div className="address-wrapper">
        <PreSubTitleLabel text="주소" />
        <div className="TextField_container">
          {isEditing ? (
            <input
              type="text"
              value={addressNew}
              onChange={(e) => setAddressNew(e.target.value)}
              className="searchTextField_input"
            />
          ) : (
            <span>{addressNew}</span>
          )}
        </div>
      </div>
      <HorizontalRule type="hr2" />

      {alert && <p style={{ color: 'red' }}>{alert}</p>} {/* 오류 메시지 표시 */}
      <div>
        <RectangleButton text={isEditing ? "저장" : "변경"} onClick={isEditing ? handleSave : handleEditToggle} />
      </div>
    </div>
  );
};

export default ViewMyInfo;
