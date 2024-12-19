import { useState } from "react";
import "@styles/components/modal/DropdownInput.css";

export default function DropdownInput({ dropList, title, placeholder }) {
  const [selected, setSelected] = useState('');
  const [inputText, setInputText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectedItem = (bank) => {
    setSelected(bank);
    setIsDropdownOpen(false);
  };

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="dropdownInput_container">
      <div className="dropdownInput_select" onClick={() => setIsDropdownOpen((prev) => !prev)}>
        {selected || title}
      </div>

      {isDropdownOpen && (
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
      />
    </div>
  );
}
