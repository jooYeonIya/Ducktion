import React from 'react';
import PostForm from '../components/PostForm';
import GodoTitleLabel from '../components/Labels/GodoTitleLabel';
import { useLocation } from 'react-router-dom';
import PreSubTitleLabel from '../components/Labels/PreSubTitleLabel';

const RequestDeleteItem = () => {
  const location = useLocation();
  const item = location.state.item

  const onsubmit = (data) => {
    // 데이터 처리 로직 추가
    console.log('제출된 데이터:', data);
  };

  return (
    <div>
      <GodoTitleLabel text="출품 상품 삭제 요청" />
      <div className="postForm_container">
        <div className='postForm_title_container'>
          <PreSubTitleLabel text={"상품명"} />
          <div className='postForm_item'>
            <PreSubTitleLabel text={item.name} />
          </div>
        </div>
        <PostForm
          onSubmit={onsubmit}
          titlePlaceholder="제목을 입력해 주세요 (30자 이내)"
          contentPlaceholder="삭제 요청 이유를 입력해 주세요"
          titleLabel="제목"
          contentLabel="이유"
        />
      </div>
    </div>
  );
};

export default RequestDeleteItem;