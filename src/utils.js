export const ProductService = {
  fetchProducts() {
    return fetch(`https://ecomm-8w50.onrender.com/products`, {
      method: "GET",
    });
  },
};

export const BrandService = {
  fetchBrands() {
    return fetch(`https://ecomm-8w50.onrender.com/brands`, {
      method: "GET",
    });
  },
  getBrandByBrandId(brands, brandId) {
    return brands.find((brand) => {
      return brand.id == brandId;
    });
  },
};
export const CategoryService = {
  fetchCategories() {
    return fetch(`https://ecomm-8w50.onrender.com/categories`, {
      method: "GET",
    });
  },
  getCategoryByCategoryId(categories, categoryId) {
    return categories.find((category) => {
      return category.id == categoryId;
    });
  }
};
