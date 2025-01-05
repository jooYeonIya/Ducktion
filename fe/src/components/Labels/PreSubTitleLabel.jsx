import '@styles/components/Labels.css'

export default function PreSubTitleLabel({text, style}) {
  return (
  <>
    <div className='subTitleLabelPre' style={style}>{text}</div>
  </>)
}