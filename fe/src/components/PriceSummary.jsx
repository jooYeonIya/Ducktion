import React from "react";
import "../styles/components/PriceSummary.css";
import PreCaptionLabel from './Labels/PreCaptionLabel'
import PreSubTitleLabel from './Labels/PreSubTitleLabel'

const PriceSummary = ({ startingBid, nowPrice, immediateBid }) => {
  return (
    <div className="price-summary">
      <div className={"price-item"}>
        <PreCaptionLabel text={"시작가"} style={{paddingBottom: "4px"}}/>
        <PreSubTitleLabel text={startingBid ? `${startingBid.toLocaleString()} 비드` : "-"} style={{fontWeight: "bold"}} />
      </div>
      <div className={'price-item price-item-withBorder'}>
        <PreCaptionLabel text={"현재 입찰가"} style={{paddingBottom: "4px"}}/>
        <PreSubTitleLabel text={nowPrice ? `${nowPrice.toLocaleString()} 비드` : "-"} style={{fontWeight: "bold"}}/>
      </div>
      <div className={"price-item"}>
        <PreCaptionLabel text={"즉시 낙찰가"} style={{paddingBottom: "4px"}}/>
        <PreSubTitleLabel text={immediateBid ? `${immediateBid.toLocaleString()} 비드` : "-"} style={{fontWeight: "bold"}}/>
      </div>
    </div>
  );
};

export default PriceSummary;
