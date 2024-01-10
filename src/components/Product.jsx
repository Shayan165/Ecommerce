import { Button } from "bootstrap";
import React from "react";

function Product({ product,onAddToClick }) {
  return (
    <div
      className="card p-4 bg-warning"
      style={{ width: "350px", margin: "10px" }}
    >
      <h5 className="text-center">
        <i className="fa-solid fa-arrow-right"></i> {product.productName}
      </h5>
      <h2  className="text-center">
        <address>${product.price.toFixed(2)}</address>
      </h2>

      <div className="my-2 d-flex justify-content-evenly text-primary">
        <h6>#{product.brand?.brandName}</h6>
        <h6>#{product.category?.categoryName}</h6>
      </div>

      <div className="container-fluid">
        {[...Array(product.rating).keys()].map((n, index) => {
          return <i className="fa-solid fa-star" key={index}></i>;
        })}
        {[...Array(5 - product.rating).keys()].map((n, index) => {
          return <i className="fa-regular fa-star" key={index}></i>;
        })}
      </div>
      <div className="ms-auto">
        {product.isOrdered  ? (
          <p className="text-success fw-bolder">Added To Cart!</p>
        ) : (
          <button onClick={()=>onAddToClick(product)} className="btn btn-info text-white">Add To Cart</button>
        )}
      </div>
    </div>
  );
}

export default Product;
