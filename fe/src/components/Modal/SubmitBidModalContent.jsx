import { useEffect, useState } from 'react'
import { getUserBidPoint } from '../../services/bidService'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import PreTextLabel from '../Labels/PreTextLabel'
import PreCaptionLabel from '../Labels/PreCaptionLabel'
import RectangleButton from '../Button/RectangleButton'
import RoundButton from '../Button/RoundButton'
import PriceSummary from '../PriceSummary'
import '@styles/components/modal/BidPointModalContent.css'

export default function SubmitBidModalContent({ probs, onClose }) {
  const { itemName, startingBid, nowPrice, immediateBid } = probs
  const [bidPoint, setCBidPoint] = useState(0);
  const [usableBid, setUsableBid] = useState(0);

  const handlePlusIcon = () => {
    const newBind = bidPoint + 1;
    setCBidPoint(newBind);
  };

  const handleMinusIcon = () => {
    const newBind = bidPoint > 0 ? bidPoint - 1 : 0;
    setCBidPoint(newBind);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setCBidPoint(value);
  };

  const fetchUserBidPoint = async() => {
    const data = await getUserBidPoint();
    setUsableBid(data.usableBid);
  };

  useEffect(() => {
    fetchUserBidPoint();  
  }, [])

  return (
    <div className='modal_contaier'>
      <GodoTitleLabel text={'입찰하기'} />
      <PreTextLabel text={itemName} />
      <RoundButton options={[{vlaue: "", title: `사용 가능한 비드 ${usableBid}`}]} />

      <PriceSummary startingBid={startingBid} nowPrice={nowPrice} immediateBid={immediateBid} />
      <PreCaptionLabel text={"*즉시 낙찰가를 초과하는 입찰은 불가합니다."} style={{ color: "#bebebe" }} />

      <div className='bidInput_container'>
        <button className='bidInput_button' onClick={handleMinusIcon}>
        <img src="/src/assets/minus.png" width={20} height={20}/>
        </button>
        <input
          type='text'
          className='bidInput_field'
          value={bidPoint}
          onChange={handleChange}
        />
        <button className='bidInput_button' onClick={handlePlusIcon}>
          <img src="/src/assets/plus.png" width={20} height={20}/>
        </button>
      </div>

      <div className='bidPointModalContent_buttons'>
        <RectangleButton text="취소" onClick={onClose} />
        <RectangleButton text="확인" />
      </div>
    </div>
  )
}