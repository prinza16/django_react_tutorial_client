import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const UpdateProductInfo = async (e) => {
    e.preventDefault();

    try {
      const formField = new FormData();
      formField.append("name", name);
      formField.append("price", price);
      formField.append("description", description);
      formField.append("category", category);

      if (image && typeof image !== "string") {
        formField.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:8000/api/${id}/`,
        formField,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("อัปเดตสำเร็จ:", response.data);

      Swal.fire({
        icon: "success",
        title: "อัปเดตสินค้าเรียบร้อยแล้ว!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      if (error.response) {
        const errData = error.response.data;
        console.error("ERROR DATA:", errData);

        if (errData.image) {
          Swal.fire({
            icon: "error",
            title: "รูปภาพไม่ถูกต้อง",
            text: errData.image[0],
          });
        } else if (errData.name) {
          Swal.fire({
            icon: "error",
            title: "ชื่อสินค้าไม่ถูกต้อง",
            text: errData.name[0],
          });
        } else if (isNaN(price) || parseFloat(price) <= 0) {
          Swal.fire({
            icon: "warning",
            title: "ราคาสินค้าไม่ถูกต้อง",
            text: "กรุณาใส่ตัวเลขเท่านั้น และต้องมากกว่า 0",
          });
          return;
        } else if (errData.description) {
          Swal.fire({
            icon: "error",
            title: "คำอธิบายสินค้าไม่ถูกต้อง",
            text: errData.description[0],
          });
        } else if (errData.category) {
          Swal.fire({
            icon: "error",
            title: "หมวดหมู่สินค้าไม่ถูกต้อง",
            text: errData.category[0],
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        });
      }
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/${id}`);
      setImage(data.image);
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setCategory(data.category);
    } catch (error) {
      console.error("โหลดข้อมูลไม่สำเร็จ:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Update Product</h1>
      <div className="container">
        <form onSubmit={UpdateProductInfo} encType="multipart/form-data">
          <div className="form-group mb-3">
            <img
              src={typeof image === "string" ? image : ""}
              height="300"
              width="150"
              alt="Preview"
            />
            <label className="d-flex fs-3 mb-2">Select Image to upload</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="form-control form-control-lg"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="number"
              step="0.01"
              className="form-control form-control-lg"
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <textarea
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
