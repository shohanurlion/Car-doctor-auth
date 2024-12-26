import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Roote = () => {
  return (
   <>
   <Navbar></Navbar>
   <Outlet></Outlet>
   <Footer></Footer>
   </>
  )
}

export default Roote