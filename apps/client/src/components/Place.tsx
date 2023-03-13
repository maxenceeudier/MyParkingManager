import { Place } from "../../interface/Place"

export default function PlaceComponant(props: {place : Place}) {
    return (
        <div className="place" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: "100px", background: `${props.place.isFree? "#03cea4" : "#e22d44"}`, margin: "10px", fontSize: '20px'}}>
            {props.place.num}
        </div>
    )
}