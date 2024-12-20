import { useState } from 'react'
import { postRatingUser } from '../../services/uesrService'
import GodoTitleLabel from '../Labels/GodoTitleLabel'
import PreSubTitleLabel from '../Labels/PreSubTitleLabel'
import RectangleButton from '../Button/RectangleButton'

import '@styles/components/modal/RatingInputModal.css'

export default function UserRatingModalContent({ userId, onClose }) {
  const [rating, setRating] = useState(50);

  const handleSliderChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = async() => {
    const ratingRequest = {
      exhibitorId: userId,
      evaluatorsId: "asdf", // 이거 어디서 받아와야 하는데 말이지 
      rating: rating
    }
    await postRatingUser(ratingRequest);
    onClose(); 
  };

  return (
    <div className='ratingInputModal'>
      <GodoTitleLabel text={'평가 점수를 입력해 주세요'} />
      
      <div className='ratingInputModal_slider'>
        <label htmlFor='slider'>1</label>
        <input
          type='range'
          min='1'
          max='100'
          value={rating}
          onChange={handleSliderChange}
        />
        <label htmlFor='slider'>100</label>
      </div>
      
      <PreSubTitleLabel text={rating} />
      
      <div className='ratingInputModal_buttons'>
        <RectangleButton text='취소' onClick={onClose} />
        <RectangleButton text='확인' onClick={handleSubmit} />
      </div>
    </div>
  );
}
