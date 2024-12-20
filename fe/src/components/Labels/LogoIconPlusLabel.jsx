import PreTextLabel from '../Labels/PreTextLabel'
import '@styles/components/Labels.css'

export default function LogoIconPlusLabel({onClick}) {
  return (
    <div className='logoIconPlusLabel' onClick={onClick}>
      <img
        className='logoIconPlusLabel_icon'
        src='/src/assets/test_image.png'
        width={40}
        height={40}
      />
      <PreTextLabel text ={'덕션'}/>
    </div>
  )
}
