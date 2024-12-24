import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ selected, timeIntervals = 5, onChange, placeholderText = "날짜와 시간을 선택하세요" }) {

  // 현재 날짜와 시간을 계산
  const now = new Date();

  // 시간 필터 함수: 현재 시간 이전은 모두 비활성화
  const filterPassedTime = (time) => {
    const currentDate = new Date(); // 현재 시간
    const selectedDateTime = new Date(time);

    // 선택한 시간이 현재 시간보다 이후인지 확인
    return selectedDateTime.getTime() >= currentDate.getTime();
  };

  return (
    <DatePicker
      selected={selected} // DatePicker의 내부 상태를 제거하고 부모에서 관리
      onChange={onChange} // 날짜가 변경되면 부모로 값을 전달
      showTimeSelect
      timeFormat="HH:mm:ss" // MySQL DATETIME 및 Java LocalDateTime 호환 시간 형식
      timeIntervals={timeIntervals} // 5분 단위로 시간 설정
      dateFormat="yyyy-MM-dd HH:mm:ss"  // MySQL DATETIME 및 Java LocalDateTime 호환 날짜 형식
      placeholderText={placeholderText} // 부모로부터 전달받은 placeholder
      minDate={now} // 현재 날짜 이후만 선택 가능
      filterTime={filterPassedTime} // 시간 필터링 적용
      className="datePicker"
    />
  );
}

export default Calendar;
