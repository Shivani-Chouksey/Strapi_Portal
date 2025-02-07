export const All_Product_BaseUrl =
  "http://localhost:1337/api/products?populate=*";

// const pagination query =&pagination[page]=2&pagination[pageSize]=1

export const All_Categories_BaseUrl =
  "http://localhost:1337/api/categories?populate[products][populate][0]=product_images&populate=cover_image";

export const All_Sub_Categories_BaseUrl =
  "http://localhost:1337/api/sub-categories?populate=products.product_images&populate=categories&populate=cover_image";
