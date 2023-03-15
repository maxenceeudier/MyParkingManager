import { Place } from "../interface/Place"
import { useEffect, useState } from "react";

export default function PlaceComponant(props: {place : Place, choosePlace: (id: string) => void}) {
    const [isFree, setIsfree] = useState(true);

    useEffect(() => {
        setIsfree(props.place.isFree);
    }, [props.place.isFree]);

    function choosePlace(id : string){
        props.choosePlace(id);
    }

    return (
        <div className="place center" style={{ background: `${isFree? "#bcf7d2" : "#fba1ad"}`}} onClick={() => choosePlace(props.place.id)}>
            {props.place.num}
        </div>
    )
}