import React, { useState } from "react";
import { useAuth } from "../context/usercontext";
import { useNavigate, NavLink, Await } from "react-router-dom";
import "./Login_Register_card.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loginData, setLoginData] = useState({
    useremail: "",
    password: "",
  });
  let auth = useAuth();
  let navigate = useNavigate();

  let handlechange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Registration Toast
  const success = () =>
    toast.success("Login Successfull 😍", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const unsuccess = () =>
    toast.error("Please Enter Valid Credentials 😓", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  let handleLogin = async () => {
    let response = await fetch(
      `https://ecomm-8w50.onrender.com/users?email=${loginData.useremail}&password=${loginData.password}`,
      { method: "GET" }
    );
    if (response.ok) {
      let responsebody = await response.json();
      if (responsebody.length > 0) {
        auth.setConData({
          ...auth.conData,
          isLoggedIn: true,
          currentUserName: responsebody[0]?.fullname,
          currentUserId: responsebody[0]?.id,
        });
        success();
        setTimeout(() => {
          navigate("/store");
        }, 4000);
      } else {
        unsuccess();
      }
    } else {
      unsuccess();
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-dark mt-4">Login</h2>

            <div className="card my-4">
              <div className="card-body cardbody-color px-5">
                <div className="text-center">
                  <i className="fa-regular fa-user login-user-icon"></i>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="UserEmail"
                    aria-describedby="emailHelp"
                    placeholder="User Email"
                    name="useremail"
                    value={loginData.useremail}
                    onChange={handlechange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    name="password"
                    value={loginData.password}
                    onChange={handlechange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-5 w-100"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
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
                </div>
                <div
                  id="emailHelp"
                  className="form-text text-center mb-5 text-dark"
                >
                  Not Registered?{" "}
                  <NavLink to="/register" className="text-dark fw-bold">
                    {" "}
                    Create an Account
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
