import { useLocation } from 'react-router-dom'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'

export default function ViewSearchResult() {
  const location = useLocation();
  const searchText = location.state.searchText;

  return (
    <>
      <div className='viewSearchResult_title'>
        <GodoTitleLabel text={"검색 결과"} />
      </div>

      <div className='viewSearchResult_community_container'>
        <GodoTitleLabel text={"커뮤니티"} />
      </div>

      <div className='viewSearchResult_item_container'>
        <GodoTitleLabel text={"출품 상품"} />
      </div>
    </>
  )
}