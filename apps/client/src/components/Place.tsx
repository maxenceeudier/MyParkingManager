import { Place } from "../interface/Place"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Lock, selectUser } from "../store/UserSlice";

export default function PlaceComponant(props: {place : Place}) {
    const [isFree, setIsfree] = useState(true);
    const {lock} = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsfree(props.place.isFree);
    }, [props.place]);

    function choosePlace(){
        if (!lock)
        {
            //fetch(`/place/update/${props.place.id}`)
            dispatch(Lock());
            setIsfree(false);
        }
    }

    return (
        <div className="place center" style={{ background: `${isFree? "#03cea4" : "#e22d44"}`}} onClick={() => choosePlace()}>
            {props.place.num}
        </div>
    )
}