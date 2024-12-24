import PreTextLabel from '../Labels/PreTextLabel'
import '@styles/components/Labels.css'

export default function IconPlusLabel({icon, text, onClick}) {
  return (
    <div className='iconPlusLabel' onClick={onClick}>
      <img
        className='iconPlusLabel_icon'
        src={icon} 
        alt={text} 
        width={16}
        height={16}
      />
      <PreTextLabel text ={text} />
    </div>
  )
}
