import '@styles/components/Labels.css'

export default function PreCaptionLabel({text, style}) {
  return (
  <>
    <div className='captionLabelPre' style={style}>{text}</div>
  </>)
}