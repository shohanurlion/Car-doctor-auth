import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Providers/AuthProviders"
import chekeddetals from "../../../public/images/checkout/checkout.png"
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";
import axios from "axios";
import Swal from 'sweetalert2'
const Booking = () => {
    const {user}= useContext(AuthContext);
    const [booking , setbooking]= useState([]);
    const url = `https://car-doctor-server-five-murex.vercel.app/booking?email=${user.email}`;
    useEffect(()=>{
      axios.get(url, {withCredentials: true})
      .then(res => {
        setbooking(res.data);
      })
    }, []);
    const handleDelete = id => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://car-doctor-server-five-murex.vercel.app/booking/${id}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(data => {
              if (data.deletedCount > 0) {
                Swal.fire(
                  "Deleted!",
                  "Your booking has been deleted.",
                  "success"
                );
                const remaining = booking.filter(booking => booking._id !== id);
                setbooking(remaining);
              } else {
                Swal.fire(
                  "Error!",
                  "Failed to delete the booking. Please try again.",
                  "error"
                );
              }
            })
            .catch(error => {
              Swal.fire(
                "Error!",
                "Something went wrong. Please try again later.",
                "error"
              );
              console.error("Error deleting booking:", error);
            });
        }
      });
    };
    

  const handleBookingConfirm = id => {
    fetch(`https://car-doctor-server-five-murex.vercel.app/booking/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ status: 'confirm' })
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if (data.modifiedCount > 0) {
                // update state
                const remaining = booking.filter(booking => booking._id !== id);
                const updated = booking.find(booking => booking._id === id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining];
                setbooking(newBookings);
            }
        })
}
  return (
    <>
<Helmet>
<meta charSet="utf-8" />
<title>Booking</title>
</Helmet>
     <div className="bg-gray-100 min-h-screen p-4">
    {/* Header Section */}
    <div className="relative bg-gray-900 text-white rounded-lg overflow-hidden mb-6">
      <img
        src={chekeddetals}
        alt="Cart Details"
        className="w-full h-48 object-cover opacity-70"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Cart Details</h1>
        <p className="text-sm">Home &rarr; Product Details</p>
      </div>
    </div>

    {/* Cart Items */}
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-1 gap-4">
        {booking.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
          >
            <div className="flex items-center gap-4">
              <button className="text-red-500 text-xl" onClick={()=>handleDelete(item._id)}>&times;</button>
              <img
                src={item.img}
                alt="Product"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-bold">{item.service}</h2>
                <p className="text-sm text-gray-600">Email:-{item.email}</p>
                <p className="text-sm text-gray-600">Service-Id:-{item.service_id}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <p className="text-lg font-bold">${item.price}</p>
              <p className="text-sm text-gray-600">{item.date}</p>
              {
                    item.status === 'confirm' ? <span className="font-bold text-primary">Confirmed</span> : <button onClick={()=>handleBookingConfirm(item._id)} className="px-4 py-1 text-sm bg-red-100 text-red-500 rounded-full">Pending</button>}
             
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Footer */}
    <div className="flex justify-between items-center mt-6">
      <Link to='/'>
      <button className="flex items-center gap-2 text-gray-600">
        <span>&larr;</span>
        <span>Continue Shopping</span>
      </button>
      </Link>
      <button className="flex items-center gap-2 text-gray-600">
        <span>&#128465;</span>
        <span>Clear Shopping Cart</span>
      </button>
    </div>
  </div>
    </>
   
  )
}

export default Booking