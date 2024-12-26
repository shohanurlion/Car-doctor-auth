import React from 'react'
import { Link } from "react-router-dom";
const ServiceCard = ({allServic}) => {
    const {_id ,title, img, price}= allServic;
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src={img}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>Price:{price}$</p>
      <div className="card-actions justify-end">
      <Link to={`/cheked/${_id}`}>
      <button className="btn btn-primary">Book Now</button>
      </Link>
      </div>
    </div>
  </div>
  )
}

export default ServiceCard