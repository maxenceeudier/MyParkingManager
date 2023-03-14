import React, { useEffect, useState } from "react";
import PlaceComponant from "./Place";
import {Place} from "../interface/Place";
import refreshIcon from "../../public/refreshIcon.svg";

export default function ParkingComponent(props : {niv: number, name?: string}) {
    const [parking, setParking] = useState<Place[]>([]);
    const [parkingInView, setParkingInView] = useState<Place[]>([]);
    const [places, setPlaces] = useState<JSX.Element[]>([]);
    const [refreshPlaces, setRefreshPlaces] = useState(false);

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
        let park = parking.filter(e => e.niv == props.niv);
        setParkingInView(park);
    }, [parking, props.niv])

    function choosePlace(id : string)
    {
        let tmp = parking;
        tmp[parking.findIndex((e) => e.id === id)].isFree = false;
        setParking(tmp.sort((a, b) => b.num - a.num));
    }

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
        <div style={{position:'relative'}}>
            <div className="cardShapeOut small center refreshIcon">
                <img
                    id="refreshIcon"
                    alt="refresh-icon"
                    src={refreshIcon}
                    width={25}
                    height={25}
                    onClick={(): void => {
                    setRefreshPlaces(!refreshPlaces);
                    const target = document.querySelector('#refreshIcon') as HTMLElement;
                    target.classList.add("rotate");
                    setTimeout(() => {
                        target.classList.remove("rotate");
                    }, 1000);
                    }}
                />
            </div>
            <div className="placeContainer center">
                {places}
            </div>
        </div>
    )
}