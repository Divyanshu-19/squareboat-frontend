import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/config";
import { useAuth } from "../../context/AuthContext";

const ProductDescription = () => {
  const { id } = useParams();
  const { authState } = useAuth();

  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const getSingleProduct = async () => {
    try {
      const { status, data } = await axios.get(
        `${config.URL}/api/v1/product/${id}`
      );
      if (status === 200) {
        setProduct(data.result);
      }
    } catch (err) {
      console.log("err::", err);
    }
  };

  const handleBuyProduct = async () => {
    if (!authState.isAuthenticated) {
      setError("Must be logged in to purchase Item");
      setTimeout(() => {
        setError("");
      }, 6000);
    } else {
      console.log(authState);
      const response = await axios.post(
        `${config.URL}/api/v1/user/buy`,
        {
          email: authState.user.email,
          productId: id,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setMsg("Product bought successfully");
        setTimeout(() => {
          setMsg("");
        }, 6000);
      }
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);
  return (
    <div className="container-lg mx-5 my-5">
      <div className="row">
        <div className="col align-self-center">
          <img
            src={product ? product.image : null}
            style={{ maxHeight: "70vh", maxWidth: "40vw" }}
          />
        </div>
        <div className="col">
          <div className="display-5">{product ? product.name : null}</div>

          <div className="h3 mt-4">Rs. {product ? product.price : null}</div>
          <div className="lead mt-4">
            {product ? product.description : null}
          </div>
          <ul className="mt-4 mb-4">
            {product
              ? product.features?.map((feature, index) => {
                  return <li key={index}>{feature}</li>;
                })
              : null}
          </ul>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleBuyProduct}
          >
            Buy Product
          </button>
          {error ? <div>{`*${error}`}</div> : null}
          {msg ? <div className="text-bg-success p-3">{`*${msg}`}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
