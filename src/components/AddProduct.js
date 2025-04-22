import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const AddProduct = () => {

    const [image, setImage] = useState(null)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")

    const navigate = useNavigate()

    const AddProductInfo = async () => {
        try {
            let formField = new FormData()

            formField.append("name", name)
            formField.append("price", price)
            formField.append("description", description)
            formField.append("category", category)

            if (image !== null) {
                formField.append("image", image)
            }

            const response = await axios.post("http://localhost:8000/api/", formField)

            console.log("Upload Success:", response.data)

            Swal.fire({
                icon: 'success',
                title: 'เพิ่มสินค้าเรียบร้อยแล้ว!',
                showConfirmButton: false,
                timer: 1500
            })

            navigate("/")

        } catch (error) {
            console.error("Upload Failed:", error)

            if (error.response) {
                const errData = error.response.data

                if (errData.image) {
                    Swal.fire({
                        icon: 'error',
                        title: 'รูปภาพไม่ถูกต้อง',
                        text: 'กรุณาอัฟโหลดไฟล์รูปภาพที่ถูกต้อง เช่น .jpg หรือ .png'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: 'กรุณาตรวจสอบข้อมูลอีกครั้ง'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
                })
            }
        }
    }

  return (
    <div>
      <h1>Add Product</h1>

        <div className="container">
            <div className="form-group">
                <div className="form-group mb-2">
                    <label className="d-flex fs-3 mb-2">Select Image to upload</label>
                    <input 
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        className="form-control form-control-lg"
                        name="image"
                        src={image}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="form-group mb-2">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Product Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group mb-2">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Product Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                
                <div className="form-group mb-2">
                    <textarea 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Product Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                
                <div className="form-group mb-2">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Product Category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                <button className="btn btn-success" onClick={AddProductInfo}>Add Product</button>

            </div>
        </div>

    </div>
  )
}

export default AddProduct
