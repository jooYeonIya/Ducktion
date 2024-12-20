import { useEffect, useState } from 'react'
import { getClosingSoonItems, getMastersCollectorsRare } from '../services/itemService'
import { getPopularCommunities } from '../services/communityService'
import CommunityList from '../components/CommunityList'
import CardItemsList from '../components/ItemCard/ItemCardList'

import '@styles/pages/Home.css'

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const [closingSoonItems, setClosingSoonItems] = useState([]);
  const [mastersItems, setMastersItems] = useState([]);

  const fetchPopularCommunitie = async () => {
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
    fetchPopularCommunitie();
    fetchClosingSoonItems();    
    fetchMastersItems();
  }, [])

  return (
    <>
      <div className='home_main_image'>
        <img src='/src/assets/test_image2.jpg' alt='home image' />
      </div>

      <div className='home_popularCommunitie'>
        <CommunityList title={"인기 커뮤니티"} communityList={communities} />
      </div>

      <div className='home_cardItems'>
        <CardItemsList title={"마감 임박 상품"} itemList={closingSoonItems} />
      </div>

      <div className='home_cardItems'>
        <CardItemsList title={"마스터즈컬렉션즈레어 상품"} itemList={mastersItems} />  
      </div>
    </>
  )
}