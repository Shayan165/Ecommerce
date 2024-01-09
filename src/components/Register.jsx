import React from "react";
import { useState } from "react";
import { useAuth } from "../context/usercontext";
import { useNavigate, NavLink } from "react-router-dom";
import "./Login_Register_card.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fullname: "",
    dateofbirth: "",
    gender: "",
    country: "",
    receivenewsletters: false,
  });

  let navigate = useNavigate();

  let [countries, setCountries] = useState([
    { id: 1, countryname: "Laos" },
    { id: 2, countryname: "India" },
    { id: 3, countryname: "Nepal" },
    { id: 4, countryname: "Scotland" },
    { id: 5, countryname: "Iceland" },
    { id: 6, countryname: "Mexico" },
    { id: 7, countryname: "Lebanon" },
    { id: 8, countryname: "Russia" },
  ]);

  let handlechanges = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  let handlecheck = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.checked });
  };

  let auth = useAuth();

  // Registration Toast
  const success = () =>
    toast.success("Registration Successfull 😍", {
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
    toast.error("Please Enter Credentials 😓", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  let handleRegister = async () => {
    let response = await fetch("https://ecomm-8w50.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      let responseBody = await response.json();

      auth.setConData({
        ...auth.conData,
        isLoggedIn: true,
        currentUserName: responseBody?.fullname,
        currentUserId: responseBody?.id,
        currentUserRole:responseBody?.role
      });
      success();
      setTimeout(() => {
        navigate("/store");
      }, 4000);
    } else {
      unsuccess();
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-dark mt-4">Register</h2>

            <div className="card my-4">
              <div className="card-body cardbody-color px-5">
                <div className="text-center">
                  <i className="fa-solid fa-user-plus register-user-icon"></i>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Email
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    id="UserEmail"
                    aria-describedby="emailHelp"
                    placeholder="User Email"
                    name="email"
                    value={registerData.email}
                    onChange={handlechanges}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Password
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password1"
                    placeholder="password"
                    name="password"
                    value={registerData.password}
                    onChange={handlechanges}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Username
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="password2"
                    placeholder="Username"
                    name="fullname"
                    value={registerData.fullname}
                    onChange={handlechanges}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    DOB
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="password3"
                    placeholder="Date"
                    name="dateofbirth"
                    value={registerData.dateofbirth}
                    onChange={handlechanges}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Gender
                  </span>
                  <div className="form-check mt-2 mx-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="flexRadioDefault1"
                      value="male"
                      onChange={handlechanges}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Male
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="flexRadioDefault2"
                      value="female"
                      onChange={handlechanges}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      FeMale
                    </label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Country
                  </span>
                  <select
                    className="form-select ms-5"
                    aria-label="Default select example"
                    value={registerData.country}
                    onChange={handlechanges}
                    name="country"
                  >
                    <option>Select Country</option>
                    {countries.map((country) => {
                      return (
                        <option key={country.id} value={country.countryname}>
                          {country.countryname}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-check text-center mb-3">
                  <label
                    className="form-check-label fs-4"
                    htmlFor="flexCheckDefault"
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="receivenewsletters"
                      value={registerData.receivenewsletters}
                      id="flexCheckDefault"
                      checked={registerData.receivenewsletters}
                      onChange={handlecheck}
                    />
                    Receive News Letter
                  </label>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-5 w-100"
                    onClick={handleRegister}
                  >
                    Register
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
                  <NavLink to="/" className="text-dark fw-bold">
                    {" "}
                    Already a user? sign-in
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

export default Register;
