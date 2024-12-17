import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { getCommunityInfo } from '../services/communityService';
import GodoTitelLabe from '../components/Labels/GodoTitleLabel'

// DT-01-02 출품 상품 목록 보기
export default function AuctionItemsPage() {
  const [communityInfo, setCommunityInfo] = useState('');
  const location = useLocation();
  const communityId = location.state.communityId;

  const fetchCommunityInfo = async() => {
    try {
      const data = await getCommunityInfo(communityId);
      setCommunityInfo(data);
    } catch (error) {
      console.error("Faild", error);
    }
  }

  useEffect(() => {
    fetchCommunityInfo();
  }, [])
  
  return (
    <>
      <GodoTitelLabe text={communityInfo.name} />
    </>
  )
}