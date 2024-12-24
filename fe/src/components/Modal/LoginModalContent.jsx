import IconPlusLabel from '../Labels/IconPlusLabel'
import PreTextLabel from '../Labels/PreTextLabel'
import PreCaptionLabel from '../Labels/PreCaptionLabel'

import '@styles/components/modal/LoginModalContent.css'

export default function LoginModalContent({ onClose }) {
  const handleLogin = () => {
    alert("나중에 로그인 로직 추가하기")
    onClose();
  }

  return (
    <div className='loginModal_container'>
      <div className='loginModal_container_top'>
        <img src="/src/assets/duckiton_logo.png" />
        <PreTextLabel text={"로그인이 필요한 서비스입니다."} />
      </div>
      <div className='loginModal_container_bottom'>
        <PreCaptionLabel text={"간편 로그인/회원가입"} style={{color: '#bebebe'}} />
        <img src='/src/assets/kakaoLoginButton.png' onClick={handleLogin}/>
      </div>
    </div>
  );
}
