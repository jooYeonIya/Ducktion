import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import RectangleButton from '../components/Button/RectangleButton';
import "../styles/pages/ViewItem.css"
import HorizontalRule from '../components/HorizontalRule';
import GodoTitleLabel from '../components/Labels/GodoTitleLabel';
import PreTitleLabel from '../components/Labels/PreTitleLabel';
import PreSubTitleLabel from '../components/Labels/PreSubTitleLabel';
import { getItemDetails, postItemRareScore } from '../services/itemService';
import PriceSummary from '../components/PriceSummary';
import StarRating from '../components/Button/StarRating';
import { useModal } from '../hooks/useModal'
import SubmitBidModalContent from '../components/Modal/SubmitBidModalContent'
import CustomModal from '../components/Modal/CustomModal'

// const ViewItem = ({ itemId }) => {
const ViewItem = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const maxFileSize = 2 * 1024 * 1024; // 2MB
  const maxFileCount = 9; // 최대 파일 개수

  const [data, setData] = useState({
    communityId: 1,
    communityName: "리그오",
    itemId: 1,
    itemName: "상",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8Rj-vULPVGhf-eQyiY5sG2dMcHFQzD6RrQ&s"],
    description: "아아아 하기 싫다ㅏㅏㅏ",
    itemCondition: "LESS_USE",
    rareGrade: "마",
    startingBid: 10000,
    auctionEndDate: "2025-01-07T23:59:59",
    nowPrice: 10000,
    tatalView: 10000,
    totalBidding: 10000,
    exhibitorNickName: "오쿠맨",
    exhibitorRate: 58,
    immediateBid: '',
  }); // 이미지 URL 상태
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 보여지는 이미지 인덱스
  const [rareScore, setRareScore] = useState(null); // 레어 점수 (별점)
  const { isModalOpen, modalContent, openModal, closeModal } = useModal();

  // 컴포넌트가 마운트될 때 get 요청
  useEffect(() => {
    const itemId = 1;

    if (!itemId) {
      console.error("itemId가 전달되지 않았습니다.");
      return;
    }
    // 예: API 호출
    async function fetchItemDetails() {
      try {
        // 실제 API 호출 로직 작성 필요
        const response = await getItemDetails(itemId);
        // const data = await response.json();
        console.log(response);
        // setData(data);
        setData(response);
        // console.log(data.images);
      } catch (error) {
        console.error("아이템 정보를 불러오는 데 실패했습니다:", error);
        alert("아이템 정보를 불러오는 데 실패했습니다");
      }
    }

    fetchItemDetails();
  }, []);

  useEffect(() => {
    setImages(data.images); // 상태가 변경된 후에 데이터를 확인
  }, [data]);

  // communityName 클릭 시 실행될 함수
  const handleCommunityClick = () => {
    if (data?.communityId) {
      navigate(`/community/${data.communityId}`);
    }
  };

  // 왼쪽 화살표 클릭 시 이전 이미지로 이동
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
    );
  };

  // 오른쪽 화살표 클릭 시 다음 이미지로 이동
  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const onBid = () => {
    const probs = {
      itemName: data.itemName, 
      startingBid: data.startingBid, 
      nowPrice: data.nowPrice, 
      immediateBid: data.immediateBid, 
    };

    openModal(<SubmitBidModalContent probs={probs} onClose={closeModal} />);
  };

  const onImmediateBid = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleRareScoreChange = async (value) => {
    const dto = {
      // userId: 1,
      itemId: data.itemId,
      rareScore: value,
    }; // 별점 포함된 dto 생성

    try {
      setRareScore(value);

      const response = await postItemRareScore(dto); // API 요청
      console.log("서버 응답:", response); // 응답 데이터 확인
      console.log(`${response.rareScore}점의 레어 등급 평가가 제출되었습니다.`);
      alert(`${response.rareScore}점의 레어 등급 평가가 제출되었습니다.`);
    } catch (error) {
      console.error("레어 등급 평가 제출 중 오류 발생:", error);
      alert("레어 등급 평가를 제출하는 데 실패했습니다.");
    }
  };

  if (!data) {
    return <p>로딩 중...</p>; // 데이터를 가져오기 전 로딩 상태 표시
  }

  return (
    <div className="view-myinfo-container">
      <CustomModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
      
      {/* 화면 왼쪽 최상단에 communityName 표시 */}
      <div className="community-header" onClick={handleCommunityClick}>
        <GodoTitleLabel text={data.communityName || "커뮤니티 이름 없음"} />
      </div>

      <div className="main-content">
        <div className="slider-container">
          {/* 이미지 슬라이더 */}
          <div className="image-slider">
            <button className="arrow left-arrow" onClick={handlePrevClick}>
              {/* 왼쪽 화살표 */}
              <img src="/src/assets/left_arrow.png" alt="left_arrow" />
            </button>
            <div className="image-wrapper">
              {/* 메인 이미지 */}
              <img
                src={data.images[currentImageIndex]}
                alt={`상품 이미지 ${currentImageIndex + 1}`}
                className="product-image"
              />
            </div>
            <button className="arrow right-arrow" onClick={handleNextClick}>
              {/* 오른쪽 화살표 */}
              <img src="/src/assets/right_arrow.png" alt="right_arrow" />
            </button>

            {/* 썸네일 리스트 */}
            <div className="thumbnail-container">
              {data.images.map((url, index) => {
                // 5장의 썸네일만 보여주는 슬라이딩 로직
                const visibleIndex =
                  Math.max(0, currentImageIndex - 2) + index < data.images.length
                    ? Math.max(0, currentImageIndex - 2) + index
                    : null;

                return (
                  visibleIndex !== null && (
                    <img
                      key={index}
                      src={data.images[visibleIndex]}
                      alt={`썸네일 이미지 ${visibleIndex + 1}`}
                      className={`thumbnail ${visibleIndex === currentImageIndex ? "active" : ""
                        }`}
                      onClick={() => setCurrentImageIndex(visibleIndex)}
                    />
                  )
                );
              })}
            </div>
          </div>

          {/* 버튼 추가 */}
          <div className="slider-buttons">
            <button className="icon-button report-button" onClick={() => alert("신고하기 버튼 클릭!")}>
              <img src="/src/assets/report.png" alt="신고하기" className="icon" />
              <span>신고하기</span>
            </button>
            <button className="icon-button bid-button" onClick={() => alert("입찰 포기 버튼 클릭!")}>
              <img src="/src/assets/give_up.png" alt="입찰 포기" className="icon" />
              <span>입찰 포기</span>
            </button>
          </div>
        </div>


        {/* 상품 정보 */}
        <div className="product-info">
          <h2 className="product-title">{data.itemName}</h2>
          <PriceSummary startingBid={data.startingBid} nowPrice={data.nowPrice} immediateBid={data.immediateBid} />

          {/* 버튼 영역 */}
          <div className="price-button-container">
            <RectangleButton text={"입찰"} onClick={onBid} />
            <RectangleButton text={"즉시 낙찰"} onClick={onImmediateBid} />
          </div>

          <div className="item-details">
            <div className="detail-row">
              <span className="label">남은 시간: </span>
              <span className="value">{data.auctionEndDate}</span>
            </div>
            <div className="detail-row">
              <span className="label">조회수: </span>
              <span className="value">{data.tatalView.toLocaleString()}건</span>
            </div>
            <div className="detail-row">
              <span className="label">입찰 건수: </span>
              <span className="value">{data.totalBidding.toLocaleString()}건</span>
            </div>
            <div className="detail-row">
              <span className="label">상태: </span>
              <span className="value">{data.itemCondition}</span>
            </div>
            <div className="detail-row">
              <span className="label">레어 등급: </span>
              <span className="value">{data.rareGrade}</span>
            </div>
            <div className="detail-row">
              <span className="label">레어 등급 평가:</span>
              <div className="rating-wrapper">
                <StarRating rating={rareScore} onChange={handleRareScoreChange} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div >
  );
};

export default ViewItem;