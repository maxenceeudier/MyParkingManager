import { Parking } from "../interface/Parking";
import "../styles/parking.scss";
import "../App.css";
import { redirect } from "react-router-dom";

export default function ParkingCard(props : {parking: Parking}) {
    return (
        <div className="parkingCard cardShapeOut">
            <h3>{props.parking.name}</h3>
            <div>
                <h4>Places:</h4>
                <p>{`${props.parking.placeFree} / ${props.parking.placeTotal}`}</p>
            </div>
        </div>
    )
}