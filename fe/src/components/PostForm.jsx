import React, { useState } from 'react';
import GodoTitleLabel from './Labels/GodoTitleLabel';
import RectangleButton from './Button/RectangleButton'
import PreSubTitleLabel from './Labels/PreSubTitleLabel';

import '@styles/components/PostForm.css'; // CSS 파일 임포트

const PostForm = ({
  onSubmit,
  titleName,
  titlePlaceholder,
  contentPlaceholder,
  titleLabel,
  contentLabel
}) => {

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !content) {
      alert('제목과 내용을 입력해주세요.'); // 둘 다 비어있을 때
    } else if (!title) {
      alert('제목을 입력해주세요.'); // 제목만 비어있을 때
    } else if (!content) {
      alert('내용을 입력해주세요.'); // 내용만 비어있을 때
    } else {
      onSubmit({ title, content });
      setTitle(''); // 입력 필드 초기화
      setContent(''); // 입력 필드 초기화
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className='postForm_container'>
      <GodoTitleLabel text={titleName} />

      <div className='postForm_title_container'>
        <PreSubTitleLabel text={titleLabel} />
        <div className='postForm_title'>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={titlePlaceholder}
            className="searchTextField_input"
            required
            maxLength={30}
          />
        </div>
      </div>

      <div className='postForm_textarea_container'>
        <PreSubTitleLabel text={contentLabel} />
        <div className='postForm_textarea'>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={contentPlaceholder}
            required
          />
        </div>
      </div>

      <div className="bidPointModalContent_buttons">
        <RectangleButton text={"취소"} onClick={handleCancel} />
        <RectangleButton text={"확인"} onClick={handleSubmit} />
      </div>

    </div>
  );
};

export default PostForm;