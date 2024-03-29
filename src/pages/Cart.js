import { useAuth } from "../context/auth"
import { useCart } from "../context/cart"
import Jumbotron from "../components/cards/Jumbotron"
import { useNavigate } from "react-router-dom"
import moment from "moment"

export default function Cart() {
// context
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    //hooks
    const navigate = useNavigate();
    const removeFromCart = (productId) => {
        let myCart = [...cart];
        let index = myCart.findIndex((item) => item._id === productId)
        myCart.splice(index, 1)
        setCart(myCart)
        localStorage.setItem("cart", JSON.stringify(myCart))
    };
    const cartTotal = () => {
        let total = 0;  
        cart.map((item)=> {
            total += item.price;
        });
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }

    return (
        <>
            <Jumbotron title={`HELLO ${auth?.token && auth?.user?.name}`} subTilte={ 
                cart?.length > 1
                    ? `your are ${cart.length} items in the cart. ${
                        auth?.token? "" : "please login to checkout"
                    }`
                    : "your cart is empty "
            }
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-17">
                        <div className="p-3 mt-2 mb-2 bg-primary text-center">
                            {cart?.length > 1 ? "My Cart" : <div className="text-center">
                                <button className="btn btn-dark" onClick={() => navigate("/")}>
                                    Continue Shopping
                                </button>
                            </div>}
                        </div>
                   </div> 
                </div>
            </div>

            {cart?.length > 1 && (
                <div className="container">
                    <div className="row">
                       
                        <div className="col-md-8">
                             <div className="row">
                                {cart?.map(p => <div key={p._id} className="card mb-3" style={{ maxWith: 540 }}
                                >
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                                                alt={p.name} 
                                                style={{
                                                    height: "150px",
                                                    width: "150px",
                                                    objectFit: "cover",
                                                    marginLeft: "-12px",
                                                    borderRopRigthRadius: "0px"
                                                }}
                                                /> 
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}
                                                       {p?.price?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency:"USD" })}
                                                </h5>
                                                <p className="card-text">{`${p?.description?.substring(0, 50)}...`}</p>
                                                
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <p className="cart-text">
                                                    <small className="text-muted">
                                                        Listed {moment(p.createAt).fromNow()}
                                                    </small>
                                                </p>
                                            <p className="text-danger mb-2 pointer" onClick={()=> removeFromCart(p._id)}>
                                                Remove
                                            </p>
                                        </div>
                                    </div>
                                    
                                </div>
                                )}
                                 </div>
                        </div>
                       

                        <div className="col-md-4">
                            <h4> your Cart sumary</h4>
                            Total / Adress / Payments
                            <hr/>
                                <h6>Total: { cartTotal()}</h6>
                           
                        </div>
                    </div>
                </div>
           )} 
       </>
    )
}