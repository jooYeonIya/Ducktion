import '@styles/components/BidHistoryCard.css'
import PreSubTitleLabel from './Labels/PreSubTitleLabel'
import PreTitleLabel from './Labels/PreTitleLabel'
import PreTextLabel from './Labels/PreTextLabel'

export default function BidHistoryCard({heldBid, usableBid}) {
  return (
    <div className="bidHistoryCard">
      <PreSubTitleLabel text={"보유 비드"} />
      <div className="bidHistoryCard_heldBid">
        <PreTitleLabel text={`${heldBid} 비드`} />
      </div>
      <div className="bidHistoryCard_usableBid">
        <PreTextLabel text={`사용 가능 비드 ${usableBid} 비드`} />
      </div>
    </div>
  )
}