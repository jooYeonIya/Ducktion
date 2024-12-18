import PreTextLabel from './Labels/PreTextLabel'
import PreTitleLabel from './Labels/PreTitleLabel';

import '@styles/components/Historybox.css'

export default function Historybox({ items, onClick }) {
  return (
    <div className='historybox'>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onClick(item.value)}
          className={`historybox_item ${index !== items.length - 1 ? 'withBorder' : ''}`}
        >
          <PreTextLabel text={item.title} />
          <PreTitleLabel text={item.count} />
        </div>
      ))}
    </div>
  );
}
