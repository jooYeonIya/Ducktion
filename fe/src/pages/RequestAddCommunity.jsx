

import PostForm from '../components/PostForm'; // css 임포트
import React, { useState } from 'react';
import PostForm from '../components/PostForm'; //css 임포트


const RequestAddCommunity = ({ onSubmit }) => {
  return (
    <div className="post-form-container">
      <h1> 커뮤니티 개설 요청 </h1>
      <PostForm 
        onSubmit={onSubmit} // PostForm에 onSubmit 전달
        titlePlaceholder={titlePlaceholder} 
        contentPlaceholder={contentPlaceholder}
        titleLabel={titleLabel}
        contentLabel={contentLabel}
      />
    </div>
  );
};

export default RequestAddCommunity;
