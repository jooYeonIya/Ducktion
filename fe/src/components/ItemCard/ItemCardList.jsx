import GodoTitleLabel from '../Labels/GodoTitleLabel'
import ItemCard from './ItemCard'
import '@styles/components/ItemCardList.css'

export default function CardItemsList({ title, itemList }) {
  return (
    <div className='cardItemsList_container'>
      <GodoTitleLabel text={title} />
      <div className='cardItemsList'>
        {itemList &&
          itemList.map((item, index) => (
            <div key={index} className='cardItemsList_item'>
              <ItemCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
}
