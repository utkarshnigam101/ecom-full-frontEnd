import React from 'react'
import { useContext } from 'react'
import HeroSection from './components/HeroSection'
import Services from './components/Services'
import Trusted from "./components/Trusted"
import { AppContext } from './context/productContext'
import FeatureProducts from './components/FeatureProducts'


const Home = () => {
  const {myName}=useContext(AppContext)
  
  
  const data={
    name:"Amazon store"

  }
  return <>
  {myName}
  <HeroSection myData={data}/>
  <FeatureProducts/>
  <Services/>
  <Trusted/>
  </>
}


export default Home