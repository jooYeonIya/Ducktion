import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getBiddingHistory } from '../services/itemsService'
import { useModal } from '../hooks/useModal'
import RoundButton from '../components/Button/RoundButton'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import DateNavigator from '../components/DateNavigator'
import ItemCardRow from '../components/ItemCard/ItemCardRow'
import BiddingHistoryList from '../components/BiddingHistoryList'
import RectangleButton from '../components/Button/RectangleButton'
import CustomModal from '../components/Modal/CustomModal'
import OutputInvoiceModalContent from '../components/Modal/OutputInvoiceModalContent'
import UserRatingModalContent from '../components/Modal/UserRatingModalContent'

import '@styles/pages/ViewBiddingHistory.css'

export default function ViewBiddingHistoryList() {
  const sortOptions = [
    { value: "all", title: "전체" },
    { value: "bidding", title: "입찰중" },
    { value: "bidded", title: "낙찰" },
    { value: "biddedFail", title: "패찰" },
  ];

  const location = useLocation();
  const sortType = location.state.sortType;
  const { isModalOpen, modalContent, openModal, closeModal } = useModal();
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

  const openInvoiceModal = (item) => {
    openModal(<OutputInvoiceModalContent itemId={item.itemId} itemName={item.itemName} onClose={closeModal} />);
  };

  const openUserRatiangModal = (item) => {
    openModal(<UserRatingModalContent userId={item.userId} onClose={closeModal} />);
  }

  useEffect(() => {
    fetchBiddingHisory();
  }, [selectedSortOption, selectedDate])

  return (
    <>
      <CustomModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />

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

      {biddingHistory.map((item, index) => (
        <div className='biddingHistoryList_item_container'>
          <div className='biddingHistoryList_item_info'>
            <ItemCardRow
              image={item.info.image}
              texts={[item.info.name, item.info.biddingCount, item.info.rareTier]} />
          </div>
          <div className='biddingHistoryList_item_histories'>
            <BiddingHistoryList histories={item.histories} />
          </div>
          <div className='biddingHistoryList_item_buttons'>
            <RectangleButton text={"배송 번호 조회"} onClick={() => openInvoiceModal(item.info)} />
            <RectangleButton text={"출품자 평가"} onClick={() => openUserRatiangModal(item.info)} />
          </div>
        </div>
      ))}
    </>
  )
}