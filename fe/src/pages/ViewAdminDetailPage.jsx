import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import PreSubTitleLabel from "../components/Labels/PreSubTitleLabel";
import RectangleButton from '../components/Button/RectangleButton'

function ViewAdminDetailPage() {
  const location = useLocation();
  const item = location.state;
  const [requestDetail, setRequestDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCancel = () => {

  }

  const handleSubmit = () => {

  }

  const fetchRequestDetail = async () => {
    try {
      const data = await getViewRequestDetail(item.requestId);
      setRequestDetail(data);
    } catch (error) {
      console.error("Failed to fetch request detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetail();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  if (!requestDetail) {
    return <div>요청 상세 정보를 찾을 수 없습니다.</div>; // 요청 정보가 없을 경우
  }

  return (
    <div>
      <div className='postForm_container'>
        <GodoTitleLabel text={item.requestType} />

        {requestDetail.type === item.requestType && (
          <div className='postForm_title_container'>
            <PreSubTitleLabel text={"상품명"} />
            <div className='postForm_item'>
              <PreSubTitleLabel text={requestDetail.itemName || "상품명 없음"} />
            </div>
          </div>
        )}

        <div className='postForm_title_container'>
          <PreSubTitleLabel text={"요청 이유"} />
          <div className='postForm_title'>
            <input
              type="text"
              value={requestDetail.title}
              className="searchTextField_input"
              disabled={true}
            />
          </div>
        </div>

        <div className='postForm_textarea_container'>
          <PreSubTitleLabel text={"요청 내용"} />
          <div className='postForm_textarea'>
            <textarea
              value={requestDetail.requestdetailstory}
              disabled={true}
            />
          </div>
        </div>

        <div className="bidPointModalContent_buttons">
          <RectangleButton text={"반려"} onClick={handleCancel} />
          <RectangleButton text={"승낙"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ViewAdminDetailPage;
