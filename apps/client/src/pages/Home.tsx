import { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import { Parking } from "../interface/Parking";
import ParkingCard from '../components/ParkingCard';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/UserSlice';

export default function Home(){
    const [listOfParking, setListOfParking] = useState<JSX.Element[]>([]);
    const User = useSelector(selectUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (User && User.name.length === 0)
            return navigate("/");
    }, [User])

    useEffect(() => {
        //fetch('/parking')
        let parkList : Parking[] = [
            {name: "Annecy Centre", numOfNiv: 3, placeFree: 10, placeTotal: 30},
            {name: "Seynod Centre", numOfNiv: 5, placeFree:3, placeTotal: 50},
        ]
        setListOfParking(parkList.map((e, i) => <Link to={`/parking/${e.name}/${e.numOfNiv}`} key={i} ><ParkingCard parking={e} /></Link>))
    }, [])

    return (
        <div style={{width: "100vw"}}>
            <TopBar focus={"Home"} />
            <div className='cardShapeOut soixanteVinght homeContainer'>
                <div className="cardShapeIn small soixanteVinght" style={{padding: '10px'}}>
                    <h1>Parking Manager</h1>
                </div>
                <h2>Choose a Parking</h2>
                <div className='soixanteVinght center listOfParking'>
                    {listOfParking}
                </div>
            </div>
        </div>
    )
}