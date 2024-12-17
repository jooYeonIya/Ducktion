import { useLocation } from 'react-router-dom'

export default function ViewSearchResult() {
  const location = useLocation();
  const searchText = location.state.searchText;

  return (
    <>
      <p>{searchText}</p>
    </>
  )
}