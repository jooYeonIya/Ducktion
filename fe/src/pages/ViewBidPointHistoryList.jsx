import '@styles/pages/ViewBidPointHistoryList.css'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import BidPointHistoryCard from '../components/BidPointHistoryCard'
import { useLocation } from 'react-router-dom'
import DateNavigator from '../components/DateNavigator';
import RoundButton from '../components/Button/RoundButton';
import RectangleButton from '../components/Button/RectangleButton';

export default function ViewBidPointHistoryList() {
  const sortOption = [
    {value: "all", title: "전체"},
    {value: "plus", title: "적립"},
    {value: "minus", title: "차감"}
  ];
  const location = useLocation();
  const state = location.state;

  return(
    <>
      <GodoTitleLabel text={"비드 이력"} />

      <div className='bidPointHistory_historyCard'>
        <BidPointHistoryCard heldBid={state.heldBid} usableBid={state.usableBid} />
        <RectangleButton text={"현금화 하기"} />
        <RectangleButton text={"충전하기"} />
      </div>

      <RoundButton options={sortOption} />
      <DateNavigator />
    </>
  )
}