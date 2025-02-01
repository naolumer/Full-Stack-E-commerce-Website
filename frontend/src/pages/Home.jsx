import BestSeller from '../components/BestSeller'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Newsletter from '../components/Newsletter'
import OurPolicy from '../components/OurPolicy'


function Home() {
  return (
    <>
    <Hero/>
    <LatestCollection/>
    <BestSeller/>
    <OurPolicy/>
    <Newsletter/>
    <Footer/>
    </>
    
  )
}

export default Home