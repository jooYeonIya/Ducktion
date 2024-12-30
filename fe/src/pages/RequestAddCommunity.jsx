import { postCreateCommunity } from '../services/adminService';
import PostForm from '../components/PostForm';
import GodoTitleLabel from '../components/Labels/GodoTitleLabel';

const RequestAddCommunity = () => {

  const onsubmit = async (data) => {
    const request = {
      name: data.title,
      requestReason: data.content
    }
    const message = await postCreateCommunity(request);
    alert(message)
    window.history.back();
  };

  return (
    <div>
      <GodoTitleLabel text="커뮤니티 개설 요청" />
      <div className="postForm_container">
        <PostForm
          onSubmit={onsubmit} 
          titlePlaceholder="커뮤니티 이름을 입력해주세요 (30자 이내)"
          contentPlaceholder="개설 요청 이유를 입력해주세요"
          titleLabel="커뮤니티 이름"
          contentLabel="개설 요청 이유"
        />
      </div>
    </div>
  );
};

export default RequestAddCommunity;
