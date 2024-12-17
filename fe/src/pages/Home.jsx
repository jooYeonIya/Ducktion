import { useEffect, useState } from 'react'
import { getClosingSoonItems, getMastersCollectorsRare } from '../services/itemsService'
import { getPopularCommunities } from '../services/communityService'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import ItemCard from '../components/ItemCard/ItemCard'
import CommunityList from '../components/CommunityList'
import '@styles/pages/Home.css'

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const [closingSoonItems, setClosingSoonItems] = useState([]);
  const [mastersItems, setMastersItems] = useState([]);

  const fetchPopularCategories = async () => {
    try {
      const data = await getPopularCommunities();
      setCommunities(data);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const fetchClosingSoonItems = async () => {
    try {
      const data = await getClosingSoonItems();
      setClosingSoonItems(data);
    } catch (error) {
      console.error("Faild", error);
    }
  }

  const fetchMastersItems = async () => {
    try {
      const data = await getMastersCollectorsRare();
      setMastersItems(data);
    } catch (error) {
      console.error("Faild", error);
    }
  }

  useEffect(() => {
    fetchPopularCategories();
    fetchClosingSoonItems();    
    fetchMastersItems();
  }, [])

  return (
    <>
      <div className='home_main_image'>
        <img src='/src/assets/test_image2.jpg' alt='home image' />
      </div>

      <div className='home_popularCategories'>
        <CommunityList title={"인기 카테고리"} communityList={communities} />
      </div>

      <div className='home_cardItems'>
        <GodoTitleLabel text={"마감 임박 상품"} />
        <div className='home_cardItems_container'>
          {closingSoonItems && closingSoonItems.map((item) => (
            <div className='home_cardItems_item'>
              <ItemCard data={item} />
            </div>
          ))}
        </div>
      </div>

      <div className='home_cardItems'>
        <GodoTitleLabel text={"마스터즈컬렉션즈레어 상품"} />
        <div className='home_cardItems_container'>
          {mastersItems && mastersItems.map((item) => (
            <div className='home_cardItems_item'>
              <ItemCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}