import React, { useState } from "react";

function NumericInput({ value, onChange, placeholder = "숫자만 입력하세요" }) {
  const handleChange = (e) => {
    const inputValue = e.target.value;

    // 숫자인 경우에만 상태 업데이트
    if (!isNaN(inputValue)) {
      if (onChange) {
        onChange(inputValue); // 부모 컴포넌트로 전달
      }
    }
  };

  return (
    <input
      type="text" // type="text"로 설정하여 유연하게 제어
      value={value} // 부모 컴포넌트로부터 전달받은 value 사용
      onChange={handleChange}
      placeholder= {placeholder} // props로 전달된 placeholder 사용
    />
  );
}

export default NumericInput;
