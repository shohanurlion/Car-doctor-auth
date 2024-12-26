import React, { useContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Providers/AuthProviders';
import {Helmet} from "react-helmet";
import Swal from 'sweetalert2'
const Cheked = () => {
    const {user}=useContext(AuthContext)
    const services = useLoaderData();
    const {_id ,title, img, price}= services;
    const navigate = useNavigate()
    const chekedhandelr = (event)=>{
      event.preventDefault();
      const form = event.target;
      const name = form.firstName.value;
      const date = form.date.value;
      const phone = form.phone.value;
      const email = user?.email;
      const text = form.text.value;
      const booking = {
        customerName: name, 
        email, 
        img,
        date, 
        phone,
        service: title,
        service_id: _id, 
        price: price,
        text,
    }
    // console.log(booking);
    fetch('https://car-doctor-server-five-murex.vercel.app/booking', {
      method: 'POST', 
      headers: {
          'content-type': 'application/json'
      }, 
      body: JSON.stringify(booking)
    })
    .then(res => res.json())
    .then(data =>{
      // console.log(data);
      if(data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        event.target.reset();
        navigate('/')
    }
    })
    
    }
  return (
    <>
<Helmet>
<meta charSet="utf-8" />
<title>ChekOut</title>
</Helmet>
     <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="relative bg-cover bg-center h-64" style={{ backgroundImage: "url('../../../public/images/checkout/checkout.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Check Out</h1>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-500 px-6 py-2 rounded-t-md">
          <span className="text-white">Home/Checkout</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-md mt-8 p-8">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={chekedhandelr}>
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name='firstName'
              placeholder="First Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-4 px-2"
            />
          </div>

          {/* Date Filde */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="date"
              name='date'
              placeholder="Date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-4 px-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Phone</label>
            <input
              type="text"
              name='phone'
              placeholder="Your Phone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-4 px-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              placeholder="Your Email"
              name='email'
              defaultValue={user ?.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-4 px-2"
            />
          </div>

          {/* Message */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea
              name='text'
              placeholder="Your Message"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-red-500 text-white py-2 px-6 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Order Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Cheked