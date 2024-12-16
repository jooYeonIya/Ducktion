import React from 'react';
import '../styles/PostForm.css'; // CSS 파일 임포트
import PostForm from '../components/PostForm'; // PostForm 컴포넌트 임포트

const RequestDeleteItem = ({ onSubmit, ItemName }) => {

  const handlePostSubmit = (data) => {
    // 상품 삭제 요청을 처리하는 로직
    onSubmit(data); // 부모 컴포넌트에 데이터 전달
  };

  return (
    <div className="post-form-container">
      <h1> 출품상품 삭제요청 </h1>
      {ItemName && <h2>상품이름: {ItemName}</h2>} {/* 상품명 표시 */}
      <PostForm 
        onSubmit={handlePostSubmit} // PostForm에 onSubmit 전달
        titlePlaceholder="삭제요청 제목을 입력해주세요 (30자 이내)" 
        contentPlaceholder="삭제요청 이유를 입력해주세요"
        titleLabel="제목"
        contentLabel="이유"
      />
    </div>
  );
};

export default RequestDeleteItem;
