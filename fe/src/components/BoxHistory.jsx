import PreCaptionLabel from './Labels/PreCaptionLabel'
import PreSubTitleLabel from './Labels/PreSubTitleLabel'

import '@styles/components/BoxHistory.css'

export default function BoxHistory({ items, onClick }) {
  return (
    <div className='historybox'>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onClick(item.value)}
          className={`historybox_item ${index !== items.length - 1 ? 'withBorder' : ''}`}
        >
          <PreCaptionLabel text={item.title} style={{paddingBottom: "4px"}}/>
          <PreSubTitleLabel text={item.count} />
        </div>
      ))}
    </div>
  );
}
