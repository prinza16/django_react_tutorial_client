import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const ProductDetail = () => {

    const [product, setProduct] = useState("")

    const { id } = useParams()

    const navigate = useNavigate()

    const getSingleProduct = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/${id}/`)
        console.log(data)
        setProduct(data)
    }

    useEffect(() => {
        getSingleProduct()
    }, [])

    const deleteProduct = async (id) => {
        const result = await Swal.fire({
          title: 'คุณแน่ใจไหม?',
          text: 'คุณต้องการลบสินค้านี้หรือไม่',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'ใช่, ลบเลย!',
          cancelButtonText: 'ยกเลิก'
        });
      
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:8000/api/${id}/`);
      
            Swal.fire({
              icon: 'success',
              title: 'ลบสินค้าเรียบร้อยแล้ว!',
              showConfirmButton: false,
              timer: 1500
            });
      
            navigate("/");
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถลบสินค้าได้'
            });
          }
        }
      };

  return (
    <div>
        <h1>Product Detail</h1>
        <div className="single-product-info">
            <img src={product.image} height="400" width="250" />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <p>{product.category}</p>

            <Link className="btn btn-primary m-2" to={`/${product.id}/update`}>Update</Link>
            <Link className="btn btn-danger m-2" onClick={() => deleteProduct(product.id)}>Delete</Link>
        </div>
    </div>
  )
}

export default ProductDetail