import React from 'react'
import HeroSection from './components/HeroSection'
import { useProductContext } from './context/productContext'

const About = () => {
  const {myName}=useProductContext();
  const data={
    name:"amazon Ecommerce"
  }
  return <>
  {myName}
  <HeroSection myData={data}/>
  </>
}

export default About