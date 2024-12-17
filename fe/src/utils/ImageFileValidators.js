// 이미지 파일 여부 확인
export const isImageFile = (file) => {
  if (!file.type.startsWith("image/")) {
    alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
    return false;
  }
  return true;
};

// 파일 크기 제한 확인 (default: 2MB)
export const isWithinSizeLimit = (file, maxFileSize = 2 * 1024 * 1024) => {
  if (file.size > maxFileSize) {
    alert(`${file.name} 파일의 크기가 2MB를 초과합니다.`);
    return false;
  }
  return true;
};

// 전체 검증 함수
export const validateImageFile = (file, maxFileSize) => {
  return isImageFile(file) && isWithinSizeLimit(file, maxFileSize);
};
