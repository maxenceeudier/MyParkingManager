import { Link, useNavigate } from "react-router-dom";
import Tickets from "../pages/TicketsPage";
import "../styles/topBar.scss";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, selectUser } from "../store/UserSlice";

export default function TopBar(props : {focus: string}) {
    const name = useSelector(selectUser).name;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logOut()
    {
        dispatch(removeUser());
        return navigate("/");
    }

    return (
        <div className="containerTopBar">
            <h3>{`Welcome ${name}`}</h3>
            <div className="navButton">
                <Link to="/Home"><div className={`button ${props.focus == "Home" ? "color cardShapeIn" : "cardShapeOut"} small`}>Home</div></Link>
                <Link to="/tickets"><div className={` button  ${props.focus == "Tickets" ? "color cardShapeIn" : "cardShapeOut"} small`}>Tickets</div></Link>
                <div className={` button  cardShapeOut small`} onClick={logOut}>Logout</div>
            </div>
        </div>
    )
}