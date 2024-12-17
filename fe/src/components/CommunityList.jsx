import GodoTitleLabel from './Labels/GodoTitleLabel'
import IconPlusLabel from './Labels/IconPlusLabel'

import '@styles/components/CommunityList.css'

export default function CommunityList({ title, communityList }) {
  return (
    <div className='communityList_container'>
      <GodoTitleLabel text={title} />
      <div className='communityList'>
        {communityList &&
          communityList.map((item, index) => (
            <div key={index} className='communityList_item'>
              <IconPlusLabel
                text={item.title}
                icon={
                  item.isFavorited
                    ? '/src/assets/duck_selected.png'
                    : '/src/assets/duck.png'
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
}
