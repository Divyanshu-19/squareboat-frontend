import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import ProductCard from "./components/ProductCard";

const ProductCatalog = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const { data, status } = await axios.get(`${config.URL}/api/v1/product`);
    if (status === 200) {
      setProducts(data.result);
    }
  };

  return (
    <div>
      <div className="container-xl text-center px-5 mt-5">
        <div className="row">
          {products
            ? products.map(({ _id, name, description, image, price }) => {
                return (
                  <div className="col-xs-12 col-md-6 col-lg-4 col-xl-3 pb-5">
                    <ProductCard
                      key={_id}
                      id={_id}
                      name={name}
                      image={image}
                      description={description}
                      price={price}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
