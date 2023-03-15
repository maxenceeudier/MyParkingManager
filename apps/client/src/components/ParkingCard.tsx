import { Parking } from "../interface/Parking";
import "../styles/parking.scss";
import "../App.css";

export default function ParkingCard(props : {parking: Parking}) {
    return (
        <div className="parkingCard cardShapeOut">
            <h2>{props.parking.name}</h2>
            <div>
                <h4>Places free:</h4>
                <p>{`${props.parking.placeFree} / ${props.parking.placeTotal}`}</p>
            </div>
        </div>
    )
}