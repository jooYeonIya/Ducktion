import PostForm from '../components/PostForm'; // css 임포트
import React from 'react';

const RequestAddCommunity = ({  }) => {
  const onsubmit = () => {
  }

  return (
    <div className="post-form-container">
      <GodoTitleLabel> 커뮤니티 개설 요청 </GodoTitleLabel>
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
