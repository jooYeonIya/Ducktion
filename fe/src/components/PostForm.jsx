import React, { useState } from 'react';
import '../styles/PostForm.css'; // CSS 파일 임포트

const PostForm = ({ onSubmit, titlePlaceholder, contentPlaceholder, titleLabel, contentLabel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
    <div className="post-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">{titleLabel}</label> {/* titleLabel prop 사용 */}
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={titlePlaceholder} 
            required
            maxLength={30} // 최대 글자 수 제한
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">{contentLabel}</label> {/* contentLabel prop 사용 */}
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={contentPlaceholder} 
            required
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleCancel}>취소</button>
          <button type="submit">확인</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

