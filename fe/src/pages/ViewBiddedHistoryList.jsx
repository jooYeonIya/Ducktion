import { useLocation } from "react-router-dom";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";

export default function ViewBiddedHistoryList() {
  const location = useLocation();
  
  return (
    <>
      <GodoTitleLabel text={"출력 이력"} />
    </>
  )
}