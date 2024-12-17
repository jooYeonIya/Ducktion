import React from 'react';
import PostForm from '../components/PostForm'; // css 임포트

const RequestDelteItem = ({ ItemName }) => {
  const onSubmit = () => {
  return (
    <div className="post-form-container">
      <GodoTitleLabel> 출품상품 삭제 요청 </GodoTitleLabel>
      <h2>상품이름 : {ItemName}</h2>
      <PostForm 
        onSubmit={onSubmit} // PostForm에 onSubmit 전달
        titlePlaceholder="삭제 요청 제목을 입력해주세요 (30자 이내)" 
        contentPlaceholder="삭제 요청 이유를 입력해주세요"
        titleLabel="제목"
        contentLabel="이유"
      />
    </div>
  );
};
};

export default RequestDelteItem;

