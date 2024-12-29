import { useLocation } from "react-router-dom";
import { createCommunity, deleteItem } from "../services/adminService";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import PreSubTitleLabel from "../components/Labels/PreSubTitleLabel";
import RectangleButton from '../components/Button/RectangleButton'

function ViewAdminDetailPage() {
  const location = useLocation();
  const type = location.state.type;
  const data = location.state.data;

  const handleCancel = () => {

  }

  const handleSubmit = async() => {

    if (type === "개설 요청") {
      const message = await createCommunity(data.title, data.requestId);
      alert(message);
      window.history.back();
    } else {
      const message = await deleteItem(data.itemId, data.requestId);
      alert(message);
      window.history.back();
    }
  }

  return (
    <div>
      <div className='postForm_container'>
        <GodoTitleLabel text={type} />

        {type === "삭제 요청" && (
          <div className='postForm_title_container'>
            <PreSubTitleLabel text={"상품명"} />
            <div className='postForm_item'>
              <PreSubTitleLabel text={data.itemName || "상품명 없음"} />
            </div>
          </div>
        )}

        <div className='postForm_title_container'>
          <PreSubTitleLabel text={type === "삭제 요청" ? "제목" : "커뮤니티 이름"} />
          <div className='postForm_title'>
            <input
              type="text"
              value={data.title}
              className="searchTextField_input"
              disabled={true}
            />
          </div>
        </div>

        <div className='postForm_textarea_container'>
        <PreSubTitleLabel text={type === "삭제 요청" ? "이유" : "개설 요청 이유"} />
        <div className='postForm_textarea'>
            <textarea
              value={data.requestReason}
              disabled={true}
            />
          </div>
        </div>

        <div className="bidPointModalContent_buttons">
          <RectangleButton text={"반려"} onClick={handleCancel} />
          <RectangleButton text={"승낙"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ViewAdminDetailPage;
