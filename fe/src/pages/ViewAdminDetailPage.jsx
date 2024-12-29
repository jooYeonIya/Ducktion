import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import PreSubTitleLabel from "../components/Labels/PreSubTitleLabel";
import RectangleButton from '../components/Button/RectangleButton'

function ViewAdminDetailPage() {
  const location = useLocation();
  const type = location.state.type;
  const data = location.state.data;
  const [requestDetail, setRequestDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCancel = () => {

  }

  const handleSubmit = () => {

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
          <PreSubTitleLabel text={"요청 이유"} />
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
          <PreSubTitleLabel text={"요청 내용"} />
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
