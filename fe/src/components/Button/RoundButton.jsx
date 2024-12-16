import { useState } from 'react'

import '@styles/components/Buttons.css'

export default function RoundButton({text, onClick}) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected); 
    if (onClick) onClick(); 
  };

  return (
    <div>
      <button 
        className={`buttonBase roundButton ${selected ? 'selected' : ''}`}
        onClick={handleClick}>
          {text}
        </button>
    </div>
  )
}
