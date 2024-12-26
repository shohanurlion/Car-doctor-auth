import React, { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard';
import {Helmet} from "react-helmet";
const Services = () => {
  const [service , setservice]=useState([]);
  useEffect(()=>{
    fetch('https://car-doctor-server-five-murex.vercel.app/services')
    .then(res => res.json())
    .then(data => setservice(data))
  },[])
  return (
    <>
<Helmet>
<meta charSet="utf-8" />
<title>Car-Doctor-Home</title>
<link rel="canonical" href="http://mysite.com/example" />
</Helmet>
    <div>
      <div className='text-center py-8'>
        <h2 className='text-[#FF3811] font-bold'>Service</h2>
        <h1 className='text-[45px] font-bold text-black'>Our Service Area</h1>
        <p>the majority have suffered alteration in some form, by injected humour, or randomised<br/> words which don't look even slightly believable. </p>
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          service.map(allServic => <ServiceCard key={allServic._id} allServic={allServic}></ServiceCard>)
        }
      </div>
    </div>
    </>
  )
}

export default Services