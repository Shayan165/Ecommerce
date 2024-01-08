import React, { useEffect, useState } from "react";
import { useAuth } from "../context/usercontext";
import { BrandService, CategoryService, ProductService } from "../utils";
import Product from "./Product";
function Store() {
  let [brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  let auth = useAuth();
  console.log(products);
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
      let productResponse = await ProductService.fetchProducts();
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
      }
    })();
  }, []);

  let updateBrandCheck = (id) => {
    let brandsData = brands.map((brd) => {
      if (brd.id === id) {
        brd.isChecked = !brd.isChecked;
      }
      return brd;
    });
    setBrands(brandsData);
  };

  let updateCategoryCheck = (id) => {
    let categoriesData = categories.map((cat) => {
      if (cat.id === id) {
        cat.isChecked = !cat.isChecked;
      }
      return cat;
    });
    setCategories(categoriesData);
  };

  return (
    <div className="container-fluid">
      <div className="header text-bg-secondary p-3 my-4 d-flex gap-2 align-items-center">
        <h4 className="mt-2">
          <i class="fa-solid fa-box-open"></i> STORE
        </h4>
        <input type="text" className="form-control" />
      </div>
      <div className="row container g-1">
        <div className="col-md-2 col-sm-12 border border-success ps-3">
          <h3>Brands</h3>
          {brands.map((brand) => (
            <div class="form-check my-3 key={brand.id}">
              <input
                class="form-check-input"
                type="checkbox"
                value="true"
                id="formCheckChecked"
                checked={brand.isChecked}
                onChange={() => updateBrandCheck(brand.id)}
              />
              <label class="form-check-label" for="formCheckChecked">
                {brand.brandName}
              </label>
            </div>
          ))}

          <h3>Categories</h3>
          {categories.map((category) => (
            <div class="form-check my-3 key={category.id}">
              <input
                class="form-check-input"
                type="checkbox"
                value="true"
                id="formCheckChecked"
                checked={category.isChecked}
                onChange={() => updateCategoryCheck(category.id)}
              />
              <label class="form-check-label" for="formCheckChecked">
                {category.categoryName}
              </label>
            </div>
          ))}
        </div>
        <div className="col-md-9 col-sm-12 border border-primary">
          {/* {JSON.stringify(brands)} */}
          {/* {JSON.stringify(categories)} */}
          {/* {JSON.stringify(products)} */}

          <div className="d-flex flex-wrap">
            {products.map((prod) => (
              <Product key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
