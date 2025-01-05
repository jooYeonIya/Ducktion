import { useLocation } from "react-router-dom";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import ItemCardList from '../components/ItemCard/ItemCardList'

export default function ViewFavoriteItemList() {
  const location = useLocation();
  const items = location.state.items;
  
  return (
    <>
      <GodoTitleLabel text={"관심 상품"} />
      <ItemCardList itemList={items} />
    </>
  )
}