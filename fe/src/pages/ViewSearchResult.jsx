import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCommunitySearchResults } from '../services/communityService'
import { getItemSearchResults } from '../services/itemsService'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import CommunityList from '../components/CommunityList'
import CardItemsList from '../components/ItemCard/ItemCardList'
import PreCaptionLabel from '../components/Labels/PreCaptionLabel'

import '@styles/pages/ViewSearchResult.css'

export default function ViewSearchResult() {
  const [communities, setCommunities] = useState([]);
  const [items, setItems] = useState([]);

  const location = useLocation();
  const searchText = location.state.searchText;

  const fetchCommunitySearchResults = async () => {
    const data = await getCommunitySearchResults(searchText);
    setCommunities(data);
  }

  const fetchItemSearchResults = async () => {
    const data = await getItemSearchResults(searchText);
    setItems(data);
  }

  const handleMoreCommunity = () => {

  }

  const handleMoreItem = () => {

  }

  useEffect(() => {
    fetchCommunitySearchResults();
    fetchItemSearchResults();
  }, [searchText])

  return (
    <>
      <div className='viewSearchResult_title'>
        <GodoTitleLabel text={"검색 결과"} />
      </div>

      <div className='viewSearchResult_community_container'>
        <div className='viewSearchResult_subTitle'>
          <GodoTitleLabel text={"커뮤니티"} />
          <button onClick={handleMoreCommunity}><PreCaptionLabel text={"더보기"} /></button>
        </div>
        <CommunityList communityList={communities} />
      </div>

      <div className='viewSearchResult_item_container'>
        <div className='viewSearchResult_subTitle'>
          <GodoTitleLabel text={"커뮤니티"} />
          <button onClick={handleMoreItem}><PreCaptionLabel text={"더보기"} /></button>
        </div>
        <CardItemsList itemList={items} />
      </div>
    </>
  )
}