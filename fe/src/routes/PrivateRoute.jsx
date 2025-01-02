import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const jwt = localStorage.getItem('jwt');

  // JWT가 없으면 로그인 페이지로 리다이렉트
  if (!jwt) {
    alert('로그인 후 이용 가능합니다.');
    return <Navigate to="/" />;
  }

  return <Outlet />;  // 인증된 사용자만 하위 경로를 렌더링
};

export default PrivateRoute;
