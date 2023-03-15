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
        fetch('/api/parking')
        .then(res => {
            if (res.ok)
            {
                return res.json().then(data => {
                    setListOfParking(data.map((e : Parking, i : number) => <Link to={`/parking/${e.name}/${e.numOfNiv}`} key={i} ><ParkingCard parking={e} /></Link>))
                })
            }
        }
        )
        .catch(error => console.log(error.message));
    }, [])

    return (
        <div style={{width: "100vw"}}>
            <TopBar focus={"Home"} />
            <div className='cardShapeOut soixanteVinght homeContainer' style={{padding: '30px'}}>
                <div className="cardShapeIn small soixanteVinght">
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