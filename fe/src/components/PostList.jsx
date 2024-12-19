import React, { useState } from "react";
import GodoTitleLabel from "./Labels/GodoTitleLabel";
import HorizontalRule from "./HorizontalRule"; // HorizontalRule 컴포넌트
import PropertyDefaultWrapper from "./PropertyDefaultWrapper"; // 필요 시

const PostList = () => {
  const [type, setType] = useState("신고"); // 초기 타입 설정

  // 예시 데이터 (실제 데이터는 props로 받아올 수 있음)
  const requestData = [
    { id: 1, category: "개설", title: "닌텐도", nickname: "홍길동", date: "2024-12-19" },
    { id: 2, category: "삭제", title: "해리포터", nickname: "김철수", date: "2024-12-18" },
  ];

  const reportData = [
    { id: 1, title: "닌텐도", reportCount: 100 },
    { id: 2, title: "분노의 질주 DVD 한정판", reportCount: 20 },
  ];

  const reviewData = [
    { id: 1, title: "해리포터", date: "2024-12-19" },
    { id: 2, title: "분노의 질주 DVD 한정판", date: "2024-12-18" },
  ];

  // 버튼 클릭 시 호출되는 함수
  const handleButtonClick = (newType) => {
    setType(newType);
  };

  // 현재 타입에 따라 표시할 데이터 결정
  const currentPosts = type === "신고" ? reportData : type === "요청" ? requestData : reviewData;

  return (
    <div className="postlist-container">
      <GodoTitleLabel text={`${type} 목록`} />

      <div className="Buttons">
        {["요청", "신고", "검수"].map((buttonType) => (
          <button
            key={buttonType}
            className={type === buttonType ? "selected" : "default"}
            onClick={() => handleButtonClick(buttonType)}
          >
            {buttonType}
          </button>
        ))}
      </div>

      <div className="text-wrapper-2">No</div>
      <div className="text-wrapper-3">
        {type === "신고" ? "상품명" : type === "요청" ? "분류" : "상품명"}
      </div>
      <div className="text-wrapper-4">
        {type === "신고" ? "신고 횟수" : type === "요청" ? "제목" : "요청일시"}
      </div>

      {currentPosts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        currentPosts.map((post, index) => (
          <div key={post.id} className="post-item">
            <div className="text-wrapper-5">{index + 1}</div>
            <div className="text-wrapper-6">
              {type === "신고" ? post.title : type === "요청" ? post.title : post.title}
            </div>
            <div className="text-wrapper-7">
              {type === "신고" ? `${post.reportCount}회` : type === "요청" ? post.nickname : post.date}
            </div>
            <HorizontalRule />
          </div>
        ))
      )}

      <PropertyDefaultWrapper
        className="view-2"
        divClassName="view-3"
        property1="rect"
        text1="반려"
      />
      <PropertyDefaultWrapper
        className="view-4"
        divClassName="view-3"
        property1="rect"
        text1="승낙"
      />
      {/* 추가적인 PropertyDefaultWrapper 컴포넌트들 */}
    </div>
  );
};

export default PostList;
