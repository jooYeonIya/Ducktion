import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getBidPointHistories, getUserBidPoint } from '../services/bidPointService';
import { useModal } from '../hooks/useModal';
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import BidPointHistoryCard from '../components/BidPointHistoryCard'
import DateNavigator from '../components/DateNavigator';
import RoundButton from '../components/Button/RoundButton';
import RectangleButton from '../components/Button/RectangleButton';
import PreTextLabel from '../components/Labels/PreTextLabel';
import PreCaptionLabel from '../components/Labels/PreCaptionLabel';
import PreSubTitleLabel from '../components/Labels/PreSubTitleLabel';
import CustomModal from '../components/Modal/CustomModal'
import ChargeBidPointModalContent from '../components/Modal/ChargeBidPointModalContent';
import WithdrwalBidPointModalContent from '../components/Modal/WithdrwalBidPointModalContent';

import '@styles/pages/ViewBidPointHistoryList.css'

export default function ViewBidPointHistoryList() {
  const sortOption = [
    { value: "ALL", title: "전체" },
    { value: "PLUS", title: "적립" },
    { value: "MINUS", title: "차감" }
  ];

  const { isModalOpen, modalContent, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  
  const [bidPoint, setBidPoint] = useState({ heldBid: 0, usableBid: 0 });
  const [histories, setHistories] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState(sortOption[0].value);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const handleSortChange = (value) => {
    setSelectedSortOption(value);
  }

  const handleDateChange = (year, month) => {
    setSelectedDate({ year, month });
  };

  const openChargeBidPointModal = () => {
    openModal(
      <ChargeBidPointModalContent
        heldBid={bidPoint.heldBid}
        usableBid={bidPoint.usableBid}
        onClose={closeModal}
        onComplete={fetchUserBidPoint}
      />)
  }

  const openWithdrwalBidPointModal = () => {
    openModal(
      <WithdrwalBidPointModalContent
        heldBid={bidPoint.heldBid}
        usableBid={bidPoint.usableBid}
        onClose={closeModal}
        onComplete={fetchUserBidPoint}
      />)
  }

  const fetchBidPointHistories = async () => {
    const bidPointHistoriesRequest = {
      year: selectedDate.year,
      month: selectedDate.month,
      sortType: selectedSortOption
    }

    try {
      const data = await getBidPointHistories(bidPointHistoriesRequest);
      setHistories(data);
    } catch (error) {
      console.error('Error fetching bid point histories:', error);
    }
  };

  const fetchUserBidPoint = async () => {
    try {
      const data = await getUserBidPoint();
      setBidPoint(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchUserBidPoint();
  }, []);

  useEffect(() => {
    fetchBidPointHistories();
  }, [selectedSortOption, selectedDate]);

  return (
    <>
      <CustomModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />

      <GodoTitleLabel text={'비드 이력'} />

      <div className="bidPointHistory_historyCard">
        <BidPointHistoryCard heldBid={bidPoint.heldBid} usableBid={bidPoint.usableBid} />
        <div className='bidPointHistory_historyCard_buttons'>
          <RectangleButton text={'현금화 하기'} onClick={openWithdrwalBidPointModal} />
          <RectangleButton text={'충전하기'} onClick={openChargeBidPointModal} />
        </div>
      </div>

      <div className='bidPointHistory_options_date'>
        <RoundButton options={sortOption} onChange={handleSortChange} />
        <DateNavigator onDateChange={handleDateChange} />
      </div>

      <div className="bidPointHistory_historyList">
        {histories && histories.length > 0 ? (
          histories.map((history, index) => (
            <div key={index} className="bidPointHistory_historyList_item">

              <div className="bidPointHistory_historyList_item_left">
                <PreSubTitleLabel text={history.date} />
                <div className='bidPointHistory_historyList_item_leftContent'>
                  {history.itemId ? (
                    <span
                      onClick={() => navigate('/viewItem', { state: { itemId: history.itemId } })}
                      style={{ cursor: 'pointer' }}
                    >
                      <PreTextLabel text={history.itemName} />
                    </span>
                  ) : (
                    <PreTextLabel text={history.itemName} />
                  )}
                  <PreCaptionLabel text={`${history.time} | ${history.type}`} style={{ color: '#bebebe' }} />
                </div>
              </div>

              <div
                className={`bidPointHistory_historyList_item_right ${history.bidAmount > 0 ? 'plus' : 'minus'}`}
              >
                <PreSubTitleLabel
                  text={history.bidAmount > 0
                    ? `+${history.bidAmount.toLocaleString()} 비드`
                    : `${history.bidAmount.toLocaleString()} 비드`} />
              </div>
            </div>
          ))
        ) : (
          <div className="bidPointHistory_noHistory">
            <PreSubTitleLabel text="이력이 없습니다" style={{ color: '#bebebe', textAlign: 'center', paddingTop: "20px" }} />
          </div>
        )}
      </div>
    </>
  );
}