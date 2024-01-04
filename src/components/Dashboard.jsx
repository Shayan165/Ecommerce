import React, { useEffect, useState } from "react";
import { useAuth } from "../context/usercontext";
import emptycart from "../assets/emptycart.png";
import Order from "./Order";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  let [orders, setOrders] = useState([]);
  let auth = useAuth();

  let loadDataFromDatabase = async () => {
    let orderresponse = await fetch(
      `https://ecomm-8w50.onrender.com/orders?userId=${auth.conData?.currentUserId}`,
      { method: "GET" }
    );
    if (orderresponse.ok) {
      let orderresponsebody = await orderresponse.json();

      let productresponse = await fetch(`https://ecomm-8w50.onrender.com/products`, {
        method: "GET",
      });

      if (productresponse.ok) {
        let productbody = await productresponse.json();

        orderresponsebody.forEach((order) => {
          order.product = productbody.find(
            (prod) => prod.id == order.productId
          );
        });
        setOrders(orderresponsebody);
      }
    }
  };

  useEffect(() => {
    loadDataFromDatabase();
  }, [auth.conData?.currentUserId]);

  let previousorders = orders.filter(
    (order) => order.isPaymentCompleted === true
  );

  let getcart = orders.filter((order) => order.isPaymentCompleted === false);

  let BuynowClick = async (orderId, userId, productId, quantity) => {
    if (window.confirm("Do you wnat to place order?")) {
      let updateOrder = {
        id: orderId,
        productId,
        userId,
        quantity,
        isPaymentCompleted: true,
      };

      let orderBuyresponse = await fetch(
        `https://ecomm-8w50.onrender.com/orders/${orderId}`,
        {
          method: "PUT",
          body: JSON.stringify(updateOrder),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      await orderBuyresponse.json();
      if (orderBuyresponse.ok) {
        await loadDataFromDatabase();
        Buy_success();
      } else {
        Buy_unsuccess();
      }
    }
  };
  let removeItem = async (orderId) => {
    if (window.confirm("Do you want to remove this item?")) {
      let removeResponse = await fetch(
        `https://ecomm-8w50.onrender.com/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (removeResponse.ok) {
        await loadDataFromDatabase();
        Remove_success(); 
      } else {
        Remove_unsuccess(); 
      }
    }
  };

  const Buy_success = () =>
    toast.success("Order Successfull 😍", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const Buy_unsuccess = () =>
    toast.error("Uh oh! something went wrong 😓", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const Remove_success = () =>
    toast.success("Successfully removed item 👍", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const Remove_unsuccess = () =>
    toast.error("Uh oh! something went wrong 😓", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      <h2 className="py-3  text-bg-info">
        <i className="fa-sharp fa-solid fa-store me-3 offset-1 "></i>Dashboard{" "}
        <button onClick={loadDataFromDatabase} className="btn btn-info">
          <i className="fa-solid fa-arrows-rotate"></i> Refresh
        </button>
      </h2>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-5">
            <h4 className="text-center text-dark mt-4">
              <i className="fa-sharp fa-solid fa-clock-rotate-left me-2"></i>
              previous orders
              <span className="badge bg-info ms-2">
                {previousorders.length}
              </span>
            </h4>

            {previousorders.length === 0 ? (
              <div
                style={{ marginTop: "5rem" }}
                className="d-flex flex-column align-items-center"
              >
                <h3 className="text-center text-dark mt-4">No items</h3>
                <img width="200" src={emptycart} alt="" />
              </div>
            ) : (
              ""
            )}
            {previousorders.map((order, index) => (
              <Order
                key={index}
                orderId={order.id}
                productId={order.productId}
                userId={order.userId}
                isPaymentCompleted={order.isPaymentCompleted}
                quantity={order.quantity}
                price={order.product.price}
                productName={order.product.productName}
              />
            ))}
          </div>
          <div className="col-md-6 mb-5">
            <h4 className="text-center text-dark mt-4">
              <i className="fa-sharp fa-solid fa-cart-shopping me-2"></i>My Cart
              <span className="badge bg-info ms-2">{getcart.length}</span>
            </h4>
            {getcart.length === 0 ? (
              <div
                style={{ marginTop: "5rem" }}
                className="d-flex flex-column align-items-center"
              >
                <h3 className="text-center text-dark mt-4">No items</h3>
                <img width="200" src={emptycart} alt="" />
              </div>
            ) : (
              ""
            )}
            {getcart.map((order, index) => (
              <Order
                key={index}
                orderId={order.id}
                productId={order.productId}
                userId={order.userId}
                isPaymentCompleted={order.isPaymentCompleted}
                quantity={order.quantity}
                price={order.product.price}
                productName={order.product.productName}
                BuynowClick={BuynowClick}
                removeItem={removeItem}
              />
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Dashboard;
