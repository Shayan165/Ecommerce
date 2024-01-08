import React from "react";

function Product({ product }) {
  return (
    <div className="card" style={{ width: "300px", margin: "10px" }}>
      <h5>
        <i class="fa-solid fa-arrow-right"></i> {product.productName}
      </h5>
      <h2>
        <address>${product.price.toFixed(2)}</address>
      </h2>

      <div className="my-2">
        <h4>#{product.brand?.brandName}</h4>
        <h4>#{product.category?.categoryName}</h4>
      </div>
    </div>
  );
}

export default Product;
