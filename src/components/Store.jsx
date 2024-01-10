import React, { useEffect, useState } from "react";
import { useAuth } from "../context/usercontext";
import { BrandService, CategoryService, ProductService } from "../utils";
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Store() {
  let [productToShow, setProductToShow] = useState([]);
  let [search, setSearch] = useState("");

  let auth = useAuth();
  const {
    products,
    setProducts,
    brands,
    setBrands,
    categories,
    setCategories,
  } = useAuth();
  const itemAdded = () =>
    toast.success("Added to Cart 🎊", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  useEffect(() => {
    (async () => {
      // get brands from db
      let brandreponse = await BrandService.fetchBrands();
      let brandsResponseBody = await brandreponse.json();
      brandsResponseBody.forEach((brand) => {
        brand.isChecked = true;
      });
      setBrands(brandsResponseBody);

      // get categories from db
      let categoryreponse = await CategoryService.fetchCategories();
      let categoriesResponseBody = await categoryreponse.json();
      categoriesResponseBody.forEach((category) => {
        category.isChecked = true;
      });
      setCategories(categoriesResponseBody);

      //get products
      let productResponse = await fetch(
        `https://ecomm-8w50.onrender.com/products?productName_like=${search}`
      );
      let productResponseBody = await productResponse.json();

      if (productResponse.ok) {
        productResponseBody.forEach((product) => {
          //set brand
          product.brand = brandsResponseBody.find((brand) => {
            return brand.id == product.brandId;
          });

          //set category
          product.category = categoriesResponseBody.find((category) => {
            return category.id == product.categoryId;
          });
          product.isOrdered = false;
        });
        setProducts(productResponseBody);
        setProductToShow(productResponseBody);
        document.title = "Ecommerce Store";
      }
    })();
  }, [search]);

  let updateBrandCheck = (id) => {
    let brandsData = brands.map((brd) => {
      if (brd.id === id) {
        brd.isChecked = !brd.isChecked;
      }
      return brd;
    });
    setBrands(brandsData);
    updateProductsToShow();
  };

  let updateCategoryCheck = (id) => {
    let categoriesData = categories.map((cat) => {
      if (cat.id === id) {
        cat.isChecked = !cat.isChecked;
      }
      return cat;
    });
    setCategories(categoriesData);
    updateProductsToShow();
  };

  let updateProductsToShow = () => {
    setProductToShow(
      products
        .filter((prod) => {
          return (
            categories.filter((category) => {
              return category.id == prod.categoryId && category.isChecked;
            }).length > 0
          );
        })
        .filter((prod) => {
          return (
            brands.filter((brand) => {
              return brand.id === prod.brandId && brand.isChecked;
            }).length > 0
          );
        })
    );
  };

  let onAddToClick = (product) => {
    (async () => {
      let newOrder = {
        productId: product.id,
        userId: auth.conData.currentUserId,
        quantity: 1,
        isPaymentCompleted: false,
      };
      let orderResponse = await fetch(
        `https://ecomm-8w50.onrender.com/orders`,
        {
          method: "POST",
          body: JSON.stringify(newOrder),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (orderResponse.ok) {
        let orderResponsebody = await orderResponse.json();

        setProducts((products) => {
          let currentproduct = products.find((p) => p.id === product.id);
          currentproduct.isOrdered = true;
          return products;
        });
        itemAdded();
      }
    })();
  };

  return (
    <div className="container">
      <div className="header text-bg-info p-3 my-4 d-flex gap-2 align-items-center rounded">
        <h4 className="mt-2">
          <i className="fa-solid text-white  me-2">SEARCH</i>
        </h4>
        <input
          type="text"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row ">
        <div className="col-lg-2 col-md-4 col-sm-12  ps-3">
          <h3>Brands</h3>
          {brands.map((brand) => (
            <div className="form-check my-3" key={brand.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value="true"
                id="formCheckChecked"
                checked={brand.isChecked}
                onChange={() => updateBrandCheck(brand.id)}
              />
              <label className="form-check-label" htmlFor="formCheckChecked">
                {brand.brandName}
              </label>
            </div>
          ))}

          <h3>Categories</h3>
          {categories.map((category) => (
            <div className="form-check my-3" key={category.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value="true"
                id="formCheckChecked"
                checked={category.isChecked}
                onChange={() => updateCategoryCheck(category.id)}
              />
              <label className="form-check-label" htmlFor="formCheckChecked">
                {category.categoryName}
              </label>
            </div>
          ))}
        </div>

        <div className="col-lg-10 col-md-6 col-sm-12">
          <div className="d-flex flex-wrap justify-content-evenly">
            {productToShow.length === 0 ? (
              <div
                className="spinner-border text-info d-flex justify-content-center align-items-center"
                style={{ marginTop: "15rem", width: "5rem", height: "5rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              productToShow.map((prod) => (
                <div key={prod.id} className="">
                  <Product product={prod} onAddToClick={onAddToClick} />
                </div>
              ))
            )}
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
    </div>
  );
}

export default Store;
