import React from "react";
import { useState } from "react";
import { useAuth } from "../context/usercontext";
import { useNavigate, NavLink } from "react-router-dom";
import "./Login_Register_card.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  fullname: Yup.string()
    .min(3, "Full Name must be at least 3 characters")
    .required("Full Name is required"),
  dateofbirth: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
  receivenewsletters: Yup.bool(),
});

function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fullname: "",
    dateofbirth: "",
    gender: "",
    country: "",
    receivenewsletters: false,
    role: "user",
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

  let handleRegister = async (values, { setSubmitting }) => {
    let response = await fetch("https://ecomm-8w50.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(values),
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
        currentUserRole: responseBody?.role,
      });
      success();
      setTimeout(() => {
        navigate("/store");
      }, 4000);
    } else {
      unsuccess();
    }

    setSubmitting(false);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center text-dark mt-4">Register</h2>

            <div className="card my-4">
              <div className="card-body cardbody-color px-5">
                <div className="text-center user-add-icon">
                  <i className="fa-solid fa-user-plus register-user-icon"></i>
                </div>

                <Formik
                  initialValues={registerData}
                  validationSchema={validationSchema}
                  onSubmit={handleRegister}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            Email
                          </span>

                          <Field
                            type="text"
                            className="form-control"
                            id="UserEmail"
                            aria-describedby="emailHelp"
                            placeholder="User Email"
                            name="email"
                          />
                        </div>
                        {errors.email && touched.email && (
                          <div className="error">{errors.email}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            Password
                          </span>

                          <Field
                            type="password"
                            className="form-control"
                            id="password1"
                            placeholder="password"
                            name="password"
                          />
                        </div>
                        {errors.password && touched.password && (
                          <div className="error">{errors.password}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            Username
                          </span>

                          <Field
                            type="text"
                            className="form-control"
                            id="password2"
                            placeholder="Username"
                            name="fullname"
                          />
                        </div>
                        {errors.fullname && touched.fullname && (
                          <div className="error">{errors.fullname}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            DOB
                          </span>

                          <Field
                            type="date"
                            className="form-control"
                            id="password3"
                            placeholder="Date"
                            name="dateofbirth"
                          />
                        </div>
                        {errors.dateofbirth && touched.dateofbirth && (
                          <div className="error">{errors.dateofbirth}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            Gender
                          </span>

                          <div className="form-check mt-2 mx-3">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="flexRadioDefault1"
                              value="male"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              Male
                            </label>
                          </div>

                          <div className="form-check mt-2">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="flexRadioDefault2"
                              value="female"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              FeMale
                            </label>
                          </div>
                        </div>
                        {errors.gender && touched.gender && (
                          <div className="error">{errors.gender}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            Country
                          </span>

                          <Field
                            as="select"
                            className="form-select ms-5"
                            aria-label="Default select example"
                            name="country"
                          >
                            <option>Select Country</option>
                            {countries.map((country) => (
                              <option
                                key={country.id}
                                value={country.countryname}
                              >
                                {country.countryname}
                              </option>
                            ))}
                          </Field>
                        </div>
                        {errors.country && touched.country && (
                          <div className="error">{errors.country}</div>
                        )}
                      </div>

                      <div className="form-check text-center mb-3">
                        <label
                          className="form-check-label fs-4"
                          htmlFor="flexCheckDefault"
                        >
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            name="receivenewsletters"
                            id="flexCheckDefault"
                          />
                          Receive News Letter
                        </label>
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-color px-5 mb-5 w-100"
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
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
