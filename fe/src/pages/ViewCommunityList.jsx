import { useState } from "react";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import PreTextLabel from "../components/Labels/PreTextLabel";
import HorizontalRule from "../components/HorizontalRule";

import "@styles/pages/ViewCommunityList.css";

export default function ViewCommunityList() {
  const hangle = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const alphabet = ['전체', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const [selectedTab, setSelectedTab] = useState('가나다순'); 
  const [selectedChar, setSelectedChar] = useState('전체'); 

  const titleItems = selectedTab === '가나다순' ? hangle : alphabet;

  return (
    <>
      <div className="communityList_title">
        <div 
          className={`communityList_title_items ${selectedTab === '가나다순' ? 'selected' : ''}`} 
          onClick={() => {
            setSelectedTab('가나다순');
            setSelectedChar('전체'); 
          }}
        >
          <GodoTitleLabel text="가나다순" />
        </div>
        <div 
          className={`communityList_title_items ${selectedTab === '알파벳순' ? 'selected' : ''}`} 
          onClick={() => {
            setSelectedTab('알파벳순');
            setSelectedChar('전체'); 
          }}
        >
          <GodoTitleLabel text="알파벳순" />
        </div>
        <div 
          className={`communityList_title_items ${selectedTab === 'MY' ? 'selected' : ''}`} 
          onClick={() => {
            setSelectedTab('MY');
            setSelectedChar('전체'); 
          }}
        >
          <img src="/src/assets/duck_selected.png" width={20} height={20} alt="My Icon" />
          <GodoTitleLabel text="MY" />
        </div>
      </div>
      {selectedTab !== 'MY' && (
        <div className="communityList_subTitle">
          {titleItems.map((char, index) => (
            <div 
              key={index} 
              className={`communityList_subTitle_item ${selectedChar === char ? 'selected' : ''}`}
              onClick={() => setSelectedChar(char)}
            >
              <PreTextLabel text={char} />
            </div>
          ))}
        </div>
      )}
      <HorizontalRule type="hr2" />
    </>
  );
}
