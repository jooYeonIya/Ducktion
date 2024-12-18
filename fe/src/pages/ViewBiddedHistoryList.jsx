import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getBiddedHistory } from '../services/itemsService'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import RoundButton from '../components/Button/RoundButton'
import DateNavigator from '../components/DateNavigator'
import ItemCard from '../components/ItemCard/ItemCard'

import '@styles/pages/ViewBiddedHistory.css'
import RectangleButton from '../components/Button/RectangleButton'

export default function ViewBiddedHistoryList() {
  const sortOptions = [
    { value: "all", title: "전체" },
    { value: "bidding", title: "입찰중" },
    { value: "bidded", title: "낙찰" },
    { value: "biddedCancel", title: "유찰" },
  ];

  const location = useLocation();
  const sortType = location.state.sortType;

  const [selectedSortOption, setSelectedSortOption] = useState(sortType);
  const [biddedHistory, setBiddedHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const fetchBiddedHisory = async () => {
    const biddedHistoryRequest = {
      sortType: selectedSortOption,
      date: selectedDate
    }

    try {
      const data = await getBiddedHistory(biddedHistoryRequest);
      setBiddedHistory(data);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const handleSortChange = (value) => {
    setSelectedSortOption(value);
  }

  const handleDateChange = (year, month) => {
    setSelectedDate({ year, month });
  };

  useEffect(() => {
    fetchBiddedHisory();
  }, [selectedSortOption, selectedDate])

  return (
    <>
      <div className='biddedHistoryList_title'>
        <GodoTitleLabel text={"출품 이력"} />
      </div>

      <div className='biddedHistoryList_date'>
        <DateNavigator onDateChange={handleDateChange} />
      </div>

      <div className='biddedHistoryList_sortOption_container'>
        <div className='biddedHistoryList_sortOption'>
          <RoundButton options={sortOptions} onChange={handleSortChange} selectedOption={selectedSortOption} />
        </div>
      </div>

      <div className='biddedHistoryList_cardItems'>
        {biddedHistory && biddedHistory.map((item, index) => (
          <div className='biddedHistoryList_cardItems_item' key={index}>
            <ItemCard key={index} data={item} />
            <div className='biddedHistoryList_cardItems_bottons'>
              <RectangleButton text={"수정"}/>
              <RectangleButton text={"삭제"}/>
            </div>
            <div className='biddedHistoryList_cardItems_botton'>
                <RectangleButton text={"배송 번호 입력"} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}