import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { getBiddingHistory } from '../services/itemsService';
import RoundButton from '../components/Button/RoundButton'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import DateNavigator from '../components/DateNavigator'

export default function ViewBiddingHistoryList() {
  const sortOptions = [
    { value: "all", title: "전체" },
    { value: "bidding", title: "입찰중" },
    { value: "bidded", title: "낙찰" },
    { value: "biddedFail", title: "패찰" },
  ];

  const location = useLocation();
  const sortType = location.state.sortType;

  const [selectedSortOption, setSelectedSortOption] = useState(sortType);
  const [biddingHistory, setBiddingHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const fetchBiddingHisory = async () => {
    const biddedHistoryRequest = {
      sortType: selectedSortOption,
      date: selectedDate
    }

    try {
      const data = await getBiddingHistory(biddedHistoryRequest);
      setBiddingHistory(data);
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
    fetchBiddingHisory();
  }, [selectedSortOption, selectedDate])

  return (
    <>
      <div className='biddingHistoryList_title'>
        <GodoTitleLabel text={"입찰 이력"} />
      </div>

      <div className='biddingHistoryList_date'>
        <DateNavigator onDateChange={handleDateChange} />
      </div>

      <div className='biddingHistoryList_sortOption_container'>
        <div className='biddingHistoryList_sortOption'>
          <RoundButton options={sortOptions} onChange={handleSortChange} selectedOption={selectedSortOption} />
        </div>
      </div>
    </>
  )
}