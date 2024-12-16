import { useEffect, useState } from 'react'
import { getPopularCategories } from '../services/itemsService'
import IconPlusLabel from '../components/Labels/IconPlusLabel'
import GodoTitleLabel from '../components/Labels/GodoTitleLabel'
import '@styles/pages/Home.css'

export default function Home() {
  const [categories, setCategories] = useState([])

  const fetchPopularCategories = async () => {
    try {
      const data = await getPopularCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  useEffect(() => {
    fetchPopularCategories();
  }, [])

  return (
    <>
      <div className='home_main_image'>
        <img src='/src/assets/test_image2.jpg' alt='home image' />
      </div>

      <div className='home_popularCategories'>
        <GodoTitleLabel text={"인기 카테고리"} />
        <div className='home_popularCategories_container'>
          {categories && categories.map((item) => (
            <div className='home_popularCategories_item'>
              <IconPlusLabel text={item.title} icon={item.isFavorited ? "/src/assets/duck_selected.png" : "/src/assets/duck.png"} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}