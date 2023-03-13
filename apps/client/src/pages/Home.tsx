import { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import { Parking } from "../../interface/Parking";
import ParkingCard from '../components/ParkingCard';
import "../App.css";
import { Link } from 'react-router-dom';

export default function Home(){
    const [listOfParking, setListOfParking] = useState<JSX.Element[]>([]);

    useEffect(() => {
        let parkList : Parking[] = [
            {name: "Annecy Centre", numOfNiv: 3, placeFree: 10, placeTotal: 30},
            {name: "Seynod Centre", numOfNiv: 5, placeFree:3, placeTotal: 50},
        ]
        setListOfParking(parkList.map((e, i) => <Link to={`/parking/${e.name}`} key={i} ><ParkingCard parking={e} /></Link>))
    }, [])

    return (
        <div style={{width: "100vw"}}>
            <TopBar focus={"Home"} />
            <div className='cardShapeOut' style={{width: '60%', height: '50vh' , marginLeft: '20%', paddingTop: '20px'}}>
                <div className="cardShapeIn small" style={{width:'60%', marginLeft: '20%', padding: '10px'}}>
                    <h1>Parking Manager</h1>
                </div>
                <h2>Choose a Parking</h2>
                <div style={{display: 'flex', flexWrap: 'wrap', width: '60%', marginLeft: '20%', justifyContent: 'space-around'}}>
                    {listOfParking}
                </div>
            </div>
        </div>
    )
}