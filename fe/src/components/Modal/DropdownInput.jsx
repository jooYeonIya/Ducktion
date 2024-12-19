import { useState } from "react";
import "@styles/components/modal/DropdownInput.css";

export default function DropdownInput({ dropList, title, placeholder, selectedList, inputed, isEditable = true }) {
  const [selected, setSelected] = useState('');
  const [inputText, setInputText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectedItem = (bank) => {
    setSelected(bank);
    setIsDropdownOpen(false);
    if (selectedList) selectedList(bank);
  };

  const handleInputTextChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    if (inputed) inputed(value);
  };

  return (
    <div className="dropdownInput_container">
      <div
        className={`dropdownInput_select ${!isEditable ? 'disabled' : ''}`} 
        onClick={() => isEditable && setIsDropdownOpen((prev) => !prev)}
      >
        {selected || title}
      </div>

      {isEditable && isDropdownOpen && (
        <div className="dropdownInput_selectDropdown">
          {dropList.map((item, index) => (
            <div
              key={index}
              className="dropdownInput_option"
              onClick={() => handleSelectedItem(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      <input
        type="text"
        value={inputText}
        onChange={handleInputTextChange}
        className="dropdownInput_input"
        placeholder={placeholder}
        disabled={!isEditable}
      />
    </div>
  );
}
