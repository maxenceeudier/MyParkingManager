import React, { useEffect, useState } from "react"
import PlaceComponant from "./Place"
import {Place} from "../interface/Place"

function createParking(numNiv: number, numPlaces: number) : Place[]
{
    let parking : Place[] = [];
    let placeNUmber = 1;

    for (let i = 0; i < numNiv; i++)
    {
        for (let j = 0; j < numPlaces; j++)
        {
            parking.push({id: "3", niv: i + 1, num: placeNUmber++, isFree: true});
        }
    }
    return (parking)
}


export default function ParkingComponent(props : {niv: number, name?: string}) {
    const [parking, setParking] = useState<Place[]>([]);
    const [parkingInView, setParkingInView] = useState<Place[]>([]);
    const [places, setPlaces] = useState<JSX.Element[]>([]);

    useEffect(() => {
        //fetch(`parking/places/${name}`)
        setParking([]);
    }, [])

    useEffect(() => {
        let park = createParking(3, 20).filter(e => e.niv == props.niv);
        setParkingInView(park);
    }, [props.niv])

    useEffect(() => {
        if (parkingInView.length)
        {
            let placesTmp  = parkingInView.map((e, i) => {
               return  <PlaceComponant place={e} key={i}/>
            });
            setPlaces(placesTmp)
        }
    }, [parkingInView])

    return (
        <div className="placeContainer center">
            {places}
        </div>
    )
}