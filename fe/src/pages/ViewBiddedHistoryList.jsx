import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import RoundButton from '../components/Button/RoundButton'
import DateNavigator from '../components/DateNavigator';

export default function ViewBiddedHistoryList() {
  const sortOptions = [
    { value: "all", title: "전체" },
    { value: "bidding", title: "입찰중" },
    { value: "bidded", title: "낙찰" },
    { value: "biddedCancel", title: "유찰" },
  ];
  
  const [sortOption, setSortOption] = useState(sortOptions[0].value);
  
  const location = useLocation();

  const handleSortChange = (value) => {
    setSortOption(value);
  }

  return (
    <>
      <div className='biddedHistoryList_title'>
        <GodoTitleLabel text={"출력 이력"} />
      </div>

      <div className='biddedHistoryList_date'>
        <DateNavigator />
      </div>

      <div className='biddedHistoryLis_sortOption_container'>
        <div className='biddedHistoryLis_sortOption'>
          <RoundButton options={sortOptions} onChange={handleSortChange} />
        </div>
      </div>
    </>
  )
}