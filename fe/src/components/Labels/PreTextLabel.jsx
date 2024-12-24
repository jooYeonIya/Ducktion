import '@styles/components/Labels.css'

export default function PreTextLabel({text, style}) {
  return (
  <>
    <div className='textLabelPre' style={style}>{text}</div>
  </>)
}