import { useLocation } from 'react-router-dom'

export default function AuctionItemsPage() {
  const location = useLocation();
  const communityId = location.state.communityId;
  
  return (
    <>
      <p>{communityId}</p>
    </>
  )
}