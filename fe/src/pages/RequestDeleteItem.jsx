import React from 'react';
import PostForm from '../components/PostForm';
import GodoTitleLabel from '../components/Labels/GodoTitleLabel';
import PreSubTitleLabel from '../components/Labels/PreSubTitleLabel';
import { useLocation } from 'react-router-dom';
import { postDeleteItemData } from '../services/adminService';

const RequestDeleteItem = () => {
  const location = useLocation();
  const item = location.state.item

  const onsubmit = async (data) => {
    const request = {
      title: data.title,
      requestReason: data.content,
      itemId: item.itemId
    }
    const message = await postDeleteItemData(request);
    alert(message)
    window.history.back();
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