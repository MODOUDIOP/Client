import { useState, useEffect } from "react"
import  moment from "moment";
import axios from "axios"
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import {
    FaDollarSign  ,
   FaProjectDiagram,
    FaRegClock,
    FaCheck,
    FaTimes,
    FaTruckMoving,
    FaWarehouse,
    FaRocket
} from "react-icons/fa"
 import { useCart } from "../context/cart";

export default function ProductView() {
    const [cart, setCart] = useCart()
    const [product, setProduct] = useState({});
    //hooks

    const params = useParams();
    useEffect(() => {
     if(params?.slug) loadProduct()
        
    }, [params?.slug])
    const loadProduct = async (req, res) => {
        try {
            const { data } = await axios.get(`/product/${params?.slug}`);
            setProduct(data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
       
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                     <div className="card mb-3 " >
            <Badge.Ribbon text ={`${product?.sold} sold`} color="red">
                <Badge.Ribbon text={`${product?.quantity >= 1 ? `${product?.quantity - product?.sold} In Stock` : "Out of Stock"}`}
                    placement ="start"  
                    color ="primary"
                >
                    <img
                        className="card-img-top"
                src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                alt={product.name} 
                style = {{height: "600px", objectFit: "cover"}}
                
            />
                </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body">
                <h1 className="fw-bold">{product?.name}</h1>
              
                <p className="card-text lead">{product?.description}</p>
            </div>
                        <div className="d-flex justify-content-between lead p-5 bg-primary fw-bold">
                            <div>
                                <p ><FaDollarSign/>Price:  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                  currency:"USD"
                    })}
                                </p>
                                <p>< FaProjectDiagram />Category:{product?.category?.name}</p>
                                <p><FaRegClock />Added: {moment(product.createdAt).fromNow()}</p> 
                                <p>{product?.quantity > 0 ? <FaCheck /> : <FaTimes />} {product?.quantity > 0 ? "in Stock" : "out stock"}</p>
                                <p>< FaWarehouse />Available: {product.quantity - product?.sold}</p>
                                <p><FaRocket /> Sold: { product.sold}</p>
                    </div>
                </div>
               

                <button className="btn btn-outline-primary col card-button"
                            style={{ borderBottomRightRaduis: "5px" }}
                            onClick={()=> setCart([...cart,product])}
                        >
                             
                    Add to Cart
                </button>
            


        </div>
                </div>
                <div className="col-md-3">
                    {/* <h2>Related Product</h2> */}
                </div>
            </div>
       </div>
    )
}