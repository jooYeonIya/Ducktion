import { useNavigate } from 'react-router-dom';

import GodoTitleLabel from './Labels/GodoTitleLabel'
import IconPlusLabel from './Labels/IconPlusLabel'

import '@styles/components/CommunityList.css'

export default function CommunityList({ title, communityList }) {
  const navigate = useNavigate();

  const navigateToItemList = (communityId) => {
    navigate('/viewItemList', {state: {communityId: communityId}});
  }

  return (
    <div className='communityList_container'>
      <GodoTitleLabel text={title} />
      <div className='communityList'>
        {communityList &&
          communityList.map((item, index) => (
            <div key={index} className='communityList_item' onClick={() => navigateToItemList(item.communityId)}>
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
