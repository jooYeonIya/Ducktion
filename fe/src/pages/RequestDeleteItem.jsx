import React from 'react';
import PostForm from '../components/PostForm'; // css 임포트
import GodoTitleLabel from '../components/Labels/GodoTitleLabel';
import PreTitleLabel from '../components/Labels/PreTitleLabel';
import { useLocation } from 'react-router-dom'; 

const RequestDeleteItem = () => {
  const location = useLocation(); 
  const { itemName} = location.state || {}; // 이전 페이지에서 전달된 데이터

  const onsubmit = (data) => {
    // 데이터 처리 로직 추가
    console.log('제출된 데이터:', data);
  };

  return (
    <div className="post-form-container">
      <GodoTitleLabel text={"출품상품 삭제 요청"} />
      <PreTitleLabel text= {"상품이름 :"} />
      <PostForm 
        onSubmit={onsubmit} // PostForm에 onSubmit 전달
        titlePlaceholder="삭제 요청 제목을 입력해주세요 (30자 이내)" 
        contentPlaceholder="삭제 요청 이유를 입력해주세요"
        titleLabel="제목"
        contentLabel="이유"
        initialTitle={itemName} // 이전 페이지에서 받은 출품상품 이름
      />
    </div>
  );
};

export default RequestDeleteItem;

