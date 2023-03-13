import { Link } from "react-router-dom";
import Tickets from "../pages/TicketsPage";
import "../styles/topBar.scss";
import "../App.css";

export default function TopBar(props : {focus: string}) {
    return (
        <div className="containerTopBar">
            <h3>Welcome [username]</h3>
            <div className="navButton">
                <Link to="/"><div className={`button ${props.focus == "Home" ? "color cardShapeIn" : "cardShapeOut"} small`}>Home</div></Link>
                <Link to="/tickets"><div className={` button  ${props.focus == "Tickets" ? "color cardShapeIn" : "cardShapeOut"} small`}>Tickets</div></Link>
            </div>
        </div>
    )
}