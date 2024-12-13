import { useState } from 'react';
import '@styles/components/TextField.css'

export default function TextField({ placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      className={`textField ${isFocused ? 'focused' : ''}`}
      placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}
