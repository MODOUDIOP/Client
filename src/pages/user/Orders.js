

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu"
export default function UserOrders() {
 // context
    const [auth, setAuth] = useAuth();
    return (
        <>
            <Jumbotron
                title={`Salut ${auth?.user?.name}`}
                subTilte="Dashboard"
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-primary" >Orders</div>   
                      User Orders history...
                    </div>
                </div>
            </div>
        
        </>
    );
}