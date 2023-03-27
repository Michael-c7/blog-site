// components
import HeroSlider from '../components/HeroSlider'
import EditorsChoice from '../components/EditorsChoice'
import TopOfTheWeek from '../components/TopOfTheWeek'
import MoreArticles from '../components/MoreArticles'


const Home = () => {
  return (
    <>
      <div className='outer-width mx-auto'>
        <HeroSlider/>
      </div>

      <div className='outer-width mx-auto'>
        <EditorsChoice/>
      </div>

      <TopOfTheWeek/>

      <div className='outer-width mx-auto'>
        <MoreArticles/>
      </div>
    </>
  )
}

export default Home