import React from "react";

function Order({
  productId,
  userId,
  isPaymentCompleted,
  quantity,
  price,
  productName,
  BuynowClick,
  orderId,
  removeItem,
}) {
  return (
    <>
      <div className="card my-4 text-center">
        <div className="card-body cardbody-color px-5">
          <table className="table table-sm table-borderless">
            <thead>
              <tr>
                <th><h5>{productName}</h5></th>
              </tr>
            </thead>
            

            <tbody>
              <tr>
                <td className="py-2">
                  <i
                    style={{ backgroundColor: "#ebf2fa" }}
                    className="fa-solid fa-bag-shopping"
                  ></i>{" "}
                  Quantity = {quantity}
                </td>
              </tr>
              <tr>
                <td className="py-3">
                  <i
                    style={{ backgroundColor: "#ebf2fa" }}
                    className="fa-solid fa-tag"
                  ></i>{" "}
                  Price = ${price}
                </td>
              </tr>
            </tbody>
          </table>
          {isPaymentCompleted === false ? (
            <div className="m-3">
              <button
                onClick={() =>
                  BuynowClick(orderId, userId, productId, quantity)
                }
                className="btn  btn-success"
              >
                Buy Now
              </button>{" "}
              <button
                onClick={() => removeItem(orderId)}
                className="btn  btn-danger"
              >
                Remove
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Order);
