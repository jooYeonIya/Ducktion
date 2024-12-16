import '@styles/components/Buttons.css'

export default function RectangleButton({text, onClick}) {
  return (
    <div>
      <button className='buttonBase rectangleButton' onClick={onClick}>{text}</button>
    </div>
  )
}