import PreTextLabel from './Labels/PreTextLabel'

import '@styles/components/BiddingHistoryList.css'

export default function BiddingHistoryList({ histories }) {
  return (
    <>
      {histories && histories.length > 0 ? (
        histories.map((history, index) => (
          <div key={index} className='historyItem'>
            <PreTextLabel text={history.date} />
            <PreTextLabel text={history.price} />
          </div>
        ))
      ) : (
        <PreTextLabel text={'입찰 이력이 없습니다'} />
      )}
    </>
  );
}

