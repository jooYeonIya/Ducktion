import '@styles/components/Labels.css'

export default function PreTextLabel({text, style, onClick}) {
  return (
  <>
    <div className='textLabelPre' style={style} onClick={onClick}>{text}</div>
  </>)
}