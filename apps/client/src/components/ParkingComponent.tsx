import { useEffect, useState } from "react";
import PlaceComponant from "./Place";
import {Place} from "../interface/Place";
import refreshIcon from "../../public/refreshIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/UserSlice";
import { Lock } from "../store/UserSlice";

export default function ParkingComponent(props : {niv: number, name?: string}) {
    const [parking, setParking] = useState<Place[]>([]);
    const [parkingInView, setParkingInView] = useState<Place[]>([]);
    const [places, setPlaces] = useState<JSX.Element[]>([]);
    const [refreshPlaces, setRefreshPlaces] = useState(false);
    const [placeIdToTake, setPlaceIdToTake] = useState("");
    const {lock, token} = useSelector(selectUser);
    const dispatch = useDispatch();

    function takePlace(id : string)
    {
        const data = {placeId: id, userToken: token}
        fetch(`/api/place/taken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .catch(error => console.log(error.message));
    }

    function choosePlace(id : string)
    {
        setPlaceIdToTake(id);
        setRefreshPlaces(!refreshPlaces);
    }

    useEffect(() => {
        if (props.name)
        {
            fetch(`/api/parking/${props.name}`)
            .then(res => {
                if (res.ok)
                {
                    return res.json().then(data => {
                        setParking(data);
                    })
                }
            }
            )
            .catch(error => console.log(error.message));
        }
    }, [props.name, refreshPlaces])

    useEffect(() => {
        const index = parking.findIndex(e => e.id === placeIdToTake);
        if ( !lock && index >= 0 && parking[index].isFree)
        {
            let tmp = [...parking];
            tmp[parking.findIndex(e => e.id === placeIdToTake)].isFree = false;
            setParking(tmp);
            takePlace(placeIdToTake);
            setPlaceIdToTake("");
            dispatch(Lock());
        }
        else
        {
            let park = parking.filter(e => e.niv == props.niv).sort((a, b) => a.num - b.num);
            setParkingInView(park);
        }
    }, [parking, props.niv])

    useEffect(() => {
        if (parkingInView.length)
        {
            let placesTmp  = parkingInView.map((e, i) => {
               return  <PlaceComponant place={e} key={i} choosePlace={choosePlace}/>
            });
            setPlaces(placesTmp)
        }
    }, [parkingInView])

    return (
        <div style={{position: 'relative', width:'100%'}}>
            <div className="cardShapeOut small center refreshIcon"
            onClick={(): void => {
                setRefreshPlaces(!refreshPlaces);
                const target = document.querySelector('#refreshIcon') as HTMLElement;
                target.classList.add("rotate");
                setTimeout(() => {
                    target.classList.remove("rotate");
                }, 1000);
                }}>
                <img
                    id="refreshIcon"
                    alt="refresh-icon"
                    src={refreshIcon}
                    width={25}
                    height={25}
                />
            </div>
            <div className="placeContainer center">
                {places}
            </div>
        </div>
    )
}