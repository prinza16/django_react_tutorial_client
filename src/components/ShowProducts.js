import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/");
      setProducts(response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการโหลดสินค้า", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="products-card-info">
        {products.map((product) => (
          <Card
            key={product.id}
            className="m-2 rounded shadow-lg"
            style={{ width: "22rem" }}
          >
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.price}</Card.Text>
              <Card.Text>{product.discription}</Card.Text>
              <Card.Text>{product.category}</Card.Text>
              <Link className="btn btn-primary" to={`/${product.id}/`}>Detail</Link>
            </Card.Body>
          </Card>
        ))}
      </div>



    </div>
  );
};

export default ShowProducts;
