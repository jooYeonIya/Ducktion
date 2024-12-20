import React from "react";
import "../styles/components/PriceSummary.css";

const PriceSummary = ({ startingBid, nowPrice, immediateBid }) => {
  return (
    <div className="price-summary">
      <div className="price-item">
        <p className="label">시작가</p>
        <p className="value">{startingBid.toLocaleString()} 비드</p>
      </div>
      <div className="price-item">
        <p className="label">현재 입찰가</p>
        <p className="value">{nowPrice.toLocaleString() || "-"} 비드</p>
      </div>
      <div className="price-item">
        <p className="label">즉시 낙찰가</p>
        <p className="value">{immediateBid.toLocaleString() || "-"}</p>
      </div>
    </div>
  );
};

export default PriceSummary;
