import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getViewAdmin } from "../services/adminService"; // 기존 함수 사용
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import PreSubTitleLabel from "../components/Labels/PreSubTitleLabel";

function ViewAdminDetailPage() {
  const { id } = useParams();
  console.log("Request ID from URL:", id); // ID 확인  
  const [requestDetail, setRequestDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestDetail = async () => {
      try {
        const data = await getViewAdmin(); // 모든 요청 목록 가져오기
        console.log("Fetched data:", data); // 데이터 확인
        const request = data.find(req => req.id === id); // ID로 필터링
        console.log("Found request:", request); // 요청 확인
        setRequestDetail(request);
      } catch (error) {
        console.error("Failed to fetch request detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  if (!requestDetail) {
    return <div>요청 상세 정보를 찾을 수 없습니다.</div>; // 요청 정보가 없을 경우
  }

  return (
    <div className="request-detail-container">
      <GodoTitleLabel text="개설 요청 상세" />
      <div className="request-add-title style={{ display: 'flex', alignItems: 'center' }}>">
        <PreSubTitleLabel text="커뮤니티 이름" />
        <PreSubTitleLabel text={requestDetail.communitytitle} style={{ marginLeft: '8px' }} /> {/* 커뮤니티 이름 표시 */}
      </div>
      <div className="request-detail-story style={{ display: 'flex', alignItems: 'center' }}>">
        <PreSubTitleLabel text="개설 요청 이유" />
        <PreSubTitleLabel text={requestDetail.requestdetailstory} style={{ marginLeft: '8px' }} /> {/* 커뮤니티 이름 표시 */}
      </div>
      <div className="request-user">
        <PreSubTitleLabel text="요청자" />
        <PreSubTitleLabel text={requestDetail.user} />
      </div>
      <div className="request-date">
        <PreSubTitleLabel text="요청일시" />
        <PreSubTitleLabel text={new Date(requestDetail.date).toLocaleString()} />
      </div>
    </div>
  );
}

export default ViewAdminDetailPage;
