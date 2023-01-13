
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
//  import Search from "../../components/forms/Search"
import { useCart } from "../../context/cart";
import { Badge } from "antd";
export default function Menu() {
  //hooks
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/");
  }
  return (
    <>
        
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-dark" >
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/">
            HOME
          </NavLink>
        </li>

         <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/shop">
            SHOP
          </NavLink>
        </li>
        {/* <Search/>  */}
        
        <li className="nav-item mt-1">
          <Badge count={cart?.length >= 1 ? cart.length : 0} offset={[-5,13]} showZero ="true">
            <NavLink className="nav-link " aria-current="page" to="/cart">
            CART
          </NavLink>

          </Badge>
        </li>
      

        {!auth?.user ? (
        <>
          <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            LOGIN
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            REGISTER
          </NavLink>
        </li>
        </>
        ) : (
            <div className="dropdown">
              <li>
                <a className="nav-link pointer dropdown-toggle" data-bs-toggle="dropdown">
                  {auth?.user?.name?.toUpperCase()}
                </a>

                <ul className="dropdown-menu ">
                <li>
                  <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                Dashboard
                  </NavLink>
                </li>
                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
        
            </li>
              </ul>
              </li>
              
              
            </div>
             
        )}
        

       
      </ul>
    
 
    </>
  );
  
  }
