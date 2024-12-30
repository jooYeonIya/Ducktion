import { useLocation } from "react-router-dom";
import { createCommunity, deleteItem, postRejectCommunity } from "../services/adminService";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import PreSubTitleLabel from "../components/Labels/PreSubTitleLabel";
import RectangleButton from '../components/Button/RectangleButton'

function ViewAdminDetailPage() {
  const location = useLocation();
  const type = location.state.type;
  const data = location.state.data;

  const handleCancel = async () => {
    if (type === "개설 요청") {
      await handleSendMail();
    }

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

  const handleSendMail = async () => {
    const rejectReasonTextField = prompt("반려 사유를 입력해주세요:", ""); 

    if (rejectReasonTextField !== null && rejectReasonTextField.trim() !== "") {
      const request = {
        requestId: data.requestId,
        title: data.title,
        rejectReason: rejectReasonTextField,
        email: data.email
      }

      const message = await postRejectCommunity(request);
      alert(message)      
      window.history.back();
    
    } else if (rejectReasonTextField !== null) {
      alert("거절 사유를 작성해 주세요");
    }
  };

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
