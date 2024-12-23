import '@styles/components/BidHistoryCard.css'
import PreSubTitleLabel from './Labels/PreSubTitleLabel'
import PreTitleLabel from './Labels/PreTitleLabel'
import PreTextLabel from './Labels/PreTextLabel'

export default function BidHistoryCard({heldBid, usableBid}) {
  return (
    <div className='bidHistoryCard'>
      <div className='bidHistoryCard_heldBid'>
        <PreTitleLabel text={`보유 ${heldBid} 비드`} />
      </div>
      <div className='bidHistoryCard_usableBid'>
        <PreTextLabel text={`사용 가능 ${usableBid} 비드`} />
      </div>
    </div>
  )
}