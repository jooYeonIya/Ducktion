import PostForm from '../components/PostForm'; 
import React from 'react';
import GodoTitleLabel from '../components/Labels/GodoTitleLabel';
import { useLocation } from 'react-router-dom';

const RequestAddCommunity = () => {
  const location = useLocation();
  console.log(location);

  const onsubmit = (data) => {
    // 데이터 처리 로직 추가
    console.log('제출된 데이터:', data);
  };

  return (
    <div className="post-form-container">
      <GodoTitleLabel text="커뮤니티 개설 요청" />
      <PostForm
        onSubmit={onsubmit} // PostForm에 onSubmit 전달
        titlePlaceholder="커뮤니티 이름을 입력해주세요 (30자 이내)"
        contentPlaceholder="개설 요청 이유를 입력해주세요"
        titleLabel="커뮤니티 이름"
        contentLabel="개설 요청 이유"
      />
    </div>
  );
};

export default RequestAddCommunity;
