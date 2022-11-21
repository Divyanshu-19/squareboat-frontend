import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, name, description, price, image }) => {
  const navigate = useNavigate();

  const handleProductSelect = () => {
    navigate(`/na/products/${id}`);
  };

  return (
    <div
      className="card"
      style={{ width: "18rem" }}
      onClick={handleProductSelect}
    >
      <img
        src={image}
        className="card-img-top"
        alt={name}
        style={{ maxWidth: "150px", alignSelf: "center" }}
      />
      <div className="card-body">
        <h5 className="card-title h6">{name}</h5>
        <p className="card-text">
          <div className="mb-3 h5">Rs. {price}</div>
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>
        <a href="#" className="btn btn-primary">
          Check Item
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
