import GodoTitleLabel from '../Labels/GodoTitleLabel'
import PreSubTitleLabel from '../Labels/PreSubTitleLabel'
import ItemCard from './ItemCard'
import '@styles/components/ItemCardList.css'

export default function CardItemsList({ title, itemList }) {
  return (
    <div className='cardItemsList_container'>
      <GodoTitleLabel text={title} />
      <div className='cardItemsList'>
        {itemList == null || itemList.length === 0 ? (
          <PreSubTitleLabel text="상품이 아직 없어요" />
        ) : (
          itemList.map((item, index) => (
            <div key={index} className='cardItemsList_item'>
              <ItemCard data={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
