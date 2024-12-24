import { useNavigate } from 'react-router-dom'
import PreTextLabel from '../Labels/PreTextLabel'

import '@styles/components/ItemCardRow.css'

export default function ItemCardRow({image, texts, itemId}) {
  const navigate = useNavigate();

  const cardOnClick = () => {
    navigate("/viewItem", { state: {itemId: itemId} });
  };

  return (
    <div className='itemCardRow_contaier' onClick={cardOnClick}>
      <div className='itemCardRow_leftSection'>
        <img src={image}/>
      </div>
      <div className='itemCardRow_rightSection'>
        {texts.map((text) =>(
          <PreTextLabel text={text} />
        ))}
      </div>
    </div>
    )
}