import PreTextLabel from '../Labels/PreTextLabel'
import '@styles/components/Labels.css'

export default function IconPlusLabel({icon, text, onImageClick, onTextClick}) {
  return (
    <div className='iconPlusLabel'>
      <img
        className='iconPlusLabel_icon'
        src={icon} 
        alt={text} 
        width={16}
        height={16}
        onClick={onImageClick}
      />
      <PreTextLabel text ={text} onClick={onTextClick}/>
    </div>
  )
}
