import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCommunitySearchResults } from '../services/communityService'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import CommunityList from '../components/CommunityList'

export default function ViewSearchResult() {
  const [communities, setCommunities] = useState([]);

  const location = useLocation();
  const searchText = location.state.searchText;

  const fetchCommunitySearchResults = async () => {
      const data = await getCommunitySearchResults(searchText);
      setCommunities(data);
  }

  useEffect(() => {
    fetchCommunitySearchResults();
  }, [searchText])

  return (
    <>
      <div className='viewSearchResult_title'>
        <GodoTitleLabel text={"검색 결과"} />
      </div>

      <div className='viewSearchResult_community_container'>
        <CommunityList title={"커뮤니티"} communityList={communities} />
      </div>

      <div className='viewSearchResult_item_container'>
        <GodoTitleLabel text={"출품 상품"} />
      </div>
    </>
  )
}