import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RectangleButton from '../components/Button/RectangleButton';
import '../styles/pages/ViewMyInfo.css';
import HorizontalRule from '../components/HorizontalRule';
import GodoTitleLabel from '../components/Labels/GodoTitleLabel';
import PreTitleLabel from '../components/Labels/PreTitleLabel';
import PreSubTitleLabel from '../components/Labels/PreSubTitleLabel';
import defaultProfileImage from '../assets/test_image.png';
import { validateImageFile } from '../utils/ImageFileValidators';
import { putUserProfileImage, deleteUserProfileImage, putUserInfo, deleteUser } from '../services/uesrService';

const ViewMyInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 기본값 설정 (location.state가 비어 있을 경우 대비)
  const userInfo = location.state?.userInfo || {
    userId: '',
    nickname: '',
    profileImage: '',
    phoneNumber: '',
    address: ''
  };

  const [nicknameNew, setNicknameNew] = useState(userInfo.nickname);
  const [profileImageNew, setProfileImageNew] = useState(userInfo.profileImage);
  const [phoneNumberNew, setPhoneNumberNew] = useState(userInfo.phone);
  const [addressNew, setAddressNew] = useState(userInfo.address);
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);

  const maxFileSize = 2 * 1024 * 1024; // 2MB
  const maxFileCount = 9; // 최대 파일 개수

  // 컴포넌트가 마운트될 때 userInfo.profileImage 값 확인 및 초기화
  useEffect(() => {
    console.log(userInfo.userId);
    if (!userInfo.profileImage) {
      setProfileImageNew(defaultProfileImage);
    }
  }, []);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택 창 열기
    }
  };

  // '사진 변경' 클릭 시 새로운 이미지를 설정
  const handleChangeImage = async (event) => {
    try {
      if (userInfo.userId === '' || userInfo.userId < 1) {
        console.log('userId가 없습니다.');
        alert("userId가 없습니다.");
        return;
      }

      const files = Array.from(event.target.files);

      console.log(files);

      // 이미지 파일 필터링 (유효성 검사)
      const validImages = files.filter((file) =>
        validateImageFile(file, maxFileSize) // 유틸리티 함수 호출
      );

      // 유효한 이미지 파일의 URL 생성 및 상태 업데이트
      // 추후 S3에 업로드 된 이미지 
      const newImageUrl = validImages.map((file) => URL.createObjectURL(file));

      const response = await putUserProfileImage(newImageUrl);

      setProfileImageNew(response);
    } catch (error) {
      console.error("프로필 사진 변경에 실패했습니다:", error);
      alert("프로필 사진 변경 중 문제가 발생했습니다.");
    }
  };

  // '사진 삭제' 클릭 시 기본 이미지로 초기화
  const handleDeleteImage = async () => {
    const confirmDelete = window.confirm('프로필 사진을 삭제하시겠습니까?'); // 사용자 확인
    if (confirmDelete) {
      try {
        await deleteUserProfileImage(userInfo.userId);

        setProfileImageNew(defaultProfileImage); // 기본 이미지로 설정
      } catch (error) {
        console.error("프로필 사진 삭제에 실패했습니다:", error);
        alert("프로필 사진 삭제 중 문제가 발생했습니다.");
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    // 입력값 확인
    if (!nicknameNew || !phoneNumberNew || !addressNew) {
      window.alert('모든 필드를 채워주세요.');
      return;
    }

    // 전화번호 11자리 확인
    if (phoneNumberNew.length !== 11) {
      window.alert('전화번호는 11자리여야 합니다.');
      return;
    }

    const confirmSave = window.confirm("저장하시겠습니까?");
    if (!confirmSave) {
      return;
    }

    try {
      const dto = {
        profileImage: nicknameNew,
        phoneNumber: phoneNumberNew,
        address: addressNew
      };

      const response = await putUserInfo(dto);

      // setNicknameNew();
      // setPhoneNumberNew();
      // setProfileImageNew();

      setIsEditing(false);

      console.log(response);
      window.alert('저장되었습니다!'); // window.alert로 변경
    } catch (error) {
      console.error("프로필 사진 삭제에 실패했습니다:", error);
      alert("프로필 사진 삭제 중 문제가 발생했습니다.");
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;

    // 입력값에서 숫자만 남기기
    const digitsOnly = inputValue.replace(/[^\d]/g, '');

    // 최대 11자리 숫자만 허용
    if (digitsOnly.length > 11) return;

    setPhoneNumberNew(digitsOnly); // 상태 업데이트
  };

  const handleLeaveAccount = async () => {
    const confirmLeave = window.confirm('정말 회원 탈퇴를 진행하시겠습니까?');

    if (confirmLeave) {
      try {
        await deleteUser(userInfo.userId); // 회원 탈퇴 API 호출
        alert('회원 탈퇴가 완료되었습니다.');
        navigate('/'); // 탈퇴 후 메인 페이지로 이동
      } catch (error) {
        console.error('회원 탈퇴에 실패했습니다:', error);
        alert('회원 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="view-myinfo-container">
      <GodoTitleLabel text="마이페이지" />
      <div>
        <PreTitleLabel text="내 정보" />
        <HorizontalRule type="hr1" />
      </div>

      {/* 프로필 사진 */}
      <div>
        <PreSubTitleLabel text="프로필 사진" />
        <div className="profile-section">
          <div className="profile-image-container">
            <img src={profileImageNew} alt="프로필 사진" className="profile-image" />
          </div>
          <div className="profile-buttons-container">
            <button onClick={handleImageClick} className="profile-button edit-button">사진 변경</button>
            <button onClick={handleDeleteImage} className="profile-button delete-button">사진 삭제</button>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChangeImage}
        multiple
        style={{ display: 'none' }}
      />
      <HorizontalRule type="hr2" />

      {/* 닉네임 */}
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

      {/* 휴대폰 번호 */}
      <div className="phone-wrapper">
        <PreSubTitleLabel text="휴대폰 번호" />
        <div className="TextField_container">
          {isEditing ? (
            <input
              type="text" // 여전히 type="text"를 사용 (number는 음수나 소수 입력 가능성을 배제하기 위해)
              value={phoneNumberNew}
              onChange={handlePhoneChange}
              placeholder="전화번호를 입력해주세요.(- 제외) ex) 01012345678"
              className="searchTextField_input"
              inputMode="numeric" // 모바일 기기에서 숫자 키패드 표시
              pattern="\d*" // 숫자만 입력 가능하도록 설정 (HTML 속성 레벨)
            />
          ) : (
            <span>{phoneNumberNew}</span>
          )}
        </div>
      </div>
      <HorizontalRule type="hr2" />

      {/* 주소 */}
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

      {/* 저장 버튼 */}
      <div className="button-container">
        <RectangleButton text={isEditing ? "저장" : "변경"} onClick={isEditing ? handleSave : handleEditToggle} />
      </div>

      {/* 회원 탈퇴 */}
      <div className="leave-account-container">
        <span className="leave-account-text" onClick={handleLeaveAccount}>
          회원 탈퇴
        </span>
      </div>
    </div>
  );
};

export default ViewMyInfo; 